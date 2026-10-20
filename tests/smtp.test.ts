import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import {
  sendEnquirerAcknowledgement,
  sendEnquiryNotification,
} from "../src/lib/email";

const REFERENCE_ID = "AG-261020-SMTP";

interface CapturedMessage {
  envelopeTo: string[];
  raw: string;
}

function createFakeSmtpServer(messages: CapturedMessage[]) {
  return net.createServer((socket) => {
    let buffer = "";
    let inData = false;
    let data = "";
    let currentRecipients: string[] = [];

    socket.setEncoding("utf8");
    socket.write("220 localhost ESMTP test\r\n");

    const processLines = (lines: string[]) => {
      for (const line of lines) {
        if (!line) continue;
        const upper = line.toUpperCase();

        if (upper.startsWith("EHLO")) {
          socket.write("250-localhost\r\n250-AUTH PLAIN LOGIN\r\n250 OK\r\n");
        } else if (upper.startsWith("HELO")) {
          socket.write("250 localhost\r\n");
        } else if (upper.startsWith("AUTH")) {
          socket.write("235 Authentication successful\r\n");
        } else if (upper.startsWith("MAIL FROM")) {
          currentRecipients = [];
          socket.write("250 OK\r\n");
        } else if (upper.startsWith("RCPT TO")) {
          const match = line.match(/<([^>]+)>/);
          if (match) currentRecipients.push(match[1]);
          socket.write("250 OK\r\n");
        } else if (upper.startsWith("DATA")) {
          inData = true;
          data = "";
          socket.write("354 End data with <CR><LF>.<CR><LF>\r\n");
        } else if (upper.startsWith("QUIT")) {
          socket.write("221 Bye\r\n");
          socket.end();
        } else if (upper.startsWith("RSET")) {
          socket.write("250 OK\r\n");
        } else {
          socket.write("250 OK\r\n");
        }
      }
    };

    socket.on("data", (chunk: string) => {
      if (inData) {
        data += chunk;
        const end = data.indexOf("\r\n.\r\n");
        if (end !== -1) {
          const raw = data.slice(0, end);
          messages.push({ envelopeTo: currentRecipients, raw });
          data = "";
          inData = false;
          socket.write("250 OK queued\r\n");
        }
        return;
      }

      buffer += chunk;
      const lines = buffer.split("\r\n");
      buffer = lines.pop() || "";
      processLines(lines);
    });
  });
}

function decodeOneMimeWord(encoded: string): string {
  const match = encoded.match(/^=\?UTF-8\?([BQ])\?([^?]+)\?=$/i);
  if (!match) return encoded;

  const [, encoding, text] = match;
  if (encoding.toUpperCase() === "B") {
    return Buffer.from(text, "base64").toString("utf8");
  }

  return text
    .replace(/_/g, " ")
    .replace(/=([0-9A-F]{2})/gi, (_hex, code: string) =>
      String.fromCharCode(parseInt(code, 16))
    );
}

function decodeMimeWords(value: string): string {
  // Folded subjects can contain multiple adjacent encoded words. RFC 2047
  // says whitespace between adjacent encoded words is not significant.
  return value.replace(
    /(?:=\?UTF-8\?[BQ]\?[^?]+\?=)(?:\s+=\?UTF-8\?[BQ]\?[^?]+\?=)*/gi,
    (run) => {
      const words = run.match(/=\?UTF-8\?[BQ]\?[^?]+\?=/gi) || [];
      return words.map(decodeOneMimeWord).join("");
    }
  );
}

function unfoldHeaders(raw: string): string {
  return raw.split("\r\n\r\n")[0].replace(/\r\n[ \t]+/g, " ");
}

function header(raw: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = unfoldHeaders(raw).match(
    new RegExp(`^${escaped}:\\s*(.+)$`, "im")
  );
  return decodeMimeWords(match?.[1]?.trim() || "");
}

test("SMTP transport sends both emails with correct recipients and headers", async () => {
  const messages: CapturedMessage[] = [];
  const server = createFakeSmtpServer(messages);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object");
  const port = address.port;

  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    EMAIL_TO: process.env.EMAIL_TO,
    EMAIL_FROM: process.env.EMAIL_FROM,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  };

  const mutableEnv = process.env as Record<string, string | undefined>;
  mutableEnv.NODE_ENV = "test";
  mutableEnv.SMTP_HOST = "127.0.0.1";
  mutableEnv.SMTP_PORT = String(port);
  mutableEnv.SMTP_USER = "test@example.com";
  mutableEnv.SMTP_PASS = "test-app-password";
  mutableEnv.EMAIL_TO = "team@example.com";
  mutableEnv.EMAIL_FROM = "ANVARD GLOBAL Website <test@example.com>";
  delete mutableEnv.RESEND_API_KEY;

  const params = {
    referenceId: REFERENCE_ID,
    fullName: "Ankit Sharma",
    email: "enquirer@example.com",
    phoneNumber: "+91 80104 16869",
    serviceInterestedIn: "Business Strategy",
    query: "We are exploring a growth plan for a new vertical.",
    submittedAt: new Date("2026-10-20T05:00:00.000Z"),
  };

  try {
    const admin = await sendEnquiryNotification(params);
    assert.equal(admin.success, true);
    assert.equal(admin.mode, "smtp");

    const acknowledgement = await sendEnquirerAcknowledgement(params);
    assert.equal(acknowledgement.success, true);
    assert.equal(acknowledgement.mode, "smtp");

    assert.equal(messages.length, 2);

    const [adminMessage, ackMessage] = messages;

    assert.deepEqual(adminMessage.envelopeTo, ["team@example.com"]);
    assert.equal(header(adminMessage.raw, "To"), "team@example.com");
    assert.equal(header(adminMessage.raw, "Reply-To"), "enquirer@example.com");
    assert.ok(header(adminMessage.raw, "Subject").includes(REFERENCE_ID));
    assert.ok(header(adminMessage.raw, "From").includes("test@example.com"));
    assert.ok(adminMessage.raw.includes(REFERENCE_ID));

    assert.deepEqual(ackMessage.envelopeTo, ["enquirer@example.com"]);
    assert.equal(header(ackMessage.raw, "To"), "enquirer@example.com");
    assert.equal(header(ackMessage.raw, "Reply-To"), "team@example.com");
    assert.ok(header(ackMessage.raw, "Subject").includes(REFERENCE_ID));
    assert.equal(
      header(ackMessage.raw, "Auto-Submitted").toLowerCase(),
      "auto-replied"
    );
    assert.ok(ackMessage.raw.includes(REFERENCE_ID));
    assert.ok(!ackMessage.raw.includes(params.query));
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete mutableEnv[key];
      } else {
        mutableEnv[key] = value;
      }
    }

    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
