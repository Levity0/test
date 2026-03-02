import handler from "../api/send-email.js"; // <-- adjust path

// mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

import nodemailer from "nodemailer";

function mockRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe("Email handler", () => {

  test("rejects non-POST requests", async () => {
    const req = { method: "GET" };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      error: "Use POST",
    });
  });

  test("returns 400 if missing fields", async () => {
    const req = {
      method: "POST",
      body: { to: "", subject: "", message: "" },
    };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      error: "Missing fields",
    });
  });

  test("sends email successfully", async () => {
    const sendMailMock = jest.fn().mockResolvedValue({ messageId: "123" });

    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    const req = {
      method: "POST",
      body: {
        to: "test@example.com",
        subject: "Hello",
        message: "Test message",
      },
    };
    const res = mockRes();

    await handler(req, res);

    expect(sendMailMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      messageId: "123",
    });
  });

  test("returns 500 if nodemailer throws", async () => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error("fail")),
    });

    const req = {
      method: "POST",
      body: {
        to: "test@example.com",
        subject: "Hello",
        message: "Test message",
      },
    };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      error: "fail",
    });
  });

});