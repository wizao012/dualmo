/// <reference types="@cloudflare/workers-types" />

import type { ApplicationPayload } from "../app/application-types";

const MAX_BODY_BYTES = 32 * 1024;
type EmailProvider = "resend" | "gmail";

type OutboundEmail = {
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

export type ApplicationMailEnv = {
  EMAIL_PROVIDER?: string;
  EMAIL_FROM?: string;
  EMAIL_REPLY_TO?: string;
  LEAD_NOTIFICATION_RECIPIENTS?: string;
  RESEND_API_KEY?: string;
  GMAIL_CLIENT_ID?: string;
  GMAIL_CLIENT_SECRET?: string;
  GMAIL_REFRESH_TOKEN?: string;
  GMAIL_FROM?: string;
};

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function readLimitedJson(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("EMPTY_BODY");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) throw new Error("BODY_TOO_LARGE");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

function stringField(record: Record<string, unknown>, key: keyof ApplicationPayload, max: number, optional = false): string {
  const value = record[key];
  if (typeof value !== "string") throw new Error(`INVALID_${String(key).toUpperCase()}`);
  const normalized = value.trim();
  if ((!optional && !normalized) || normalized.length > max) throw new Error(`INVALID_${String(key).toUpperCase()}`);
  return normalized;
}

export function validateApplication(value: unknown): ApplicationPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("INVALID_PAYLOAD");
  const record = value as Record<string, unknown>;
  const payload: ApplicationPayload = {
    carrier: stringField(record, "carrier", 40),
    device: stringField(record, "device", 80),
    familyName: stringField(record, "familyName", 40),
    givenName: stringField(record, "givenName", 40),
    familyNameKana: stringField(record, "familyNameKana", 40),
    givenNameKana: stringField(record, "givenNameKana", 40),
    birthDate: stringField(record, "birthDate", 10),
    postalCode: stringField(record, "postalCode", 8),
    prefecture: stringField(record, "prefecture", 4),
    address: stringField(record, "address", 120),
    address2: stringField(record, "address2", 120, true),
    tel: stringField(record, "tel", 14),
    email: stringField(record, "email", 160).toLowerCase(),
    website: typeof record.website === "string" ? record.website.trim() : "",
  };

  if (payload.website) throw new Error("SPAM_DETECTED");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.birthDate)) throw new Error("INVALID_BIRTHDATE");
  if (!/^\d{3}-?\d{4}$/.test(payload.postalCode)) throw new Error("INVALID_POSTALCODE");
  if (!/^0\d{9,10}$/.test(payload.tel.replace(/-/g, ""))) throw new Error("INVALID_TEL");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) throw new Error("INVALID_EMAIL");
  return payload;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] || character);
}

function detailsText(payload: ApplicationPayload): string {
  return [
    "お申し込みプラン：DUALMO",
    "月額料金：2,490円（税抜）／2,739円（税込）",
    "初期費用：0円",
    "初月料金：無料",
    `現在の携帯キャリア：${payload.carrier}`,
    `ご利用予定のスマートフォン：${payload.device}`,
    `お名前：${payload.familyName} ${payload.givenName}`,
    `フリガナ：${payload.familyNameKana} ${payload.givenNameKana}`,
    `生年月日：${payload.birthDate}`,
    `郵便番号：${payload.postalCode}`,
    `住所：${payload.prefecture}${payload.address}${payload.address2 ? ` ${payload.address2}` : ""}`,
    `電話番号：${payload.tel}`,
    `メールアドレス：${payload.email}`,
  ].join("\n");
}

function detailsHtml(payload: ApplicationPayload): string {
  const rows = [
    ["お申し込みプラン", "DUALMO"],
    ["月額料金", "2,490円（税抜）／2,739円（税込）"],
    ["初期費用", "0円"],
    ["初月料金", "無料"],
    ["現在の携帯キャリア", payload.carrier],
    ["ご利用予定のスマートフォン", payload.device],
    ["お名前", `${payload.familyName} ${payload.givenName}`],
    ["フリガナ", `${payload.familyNameKana} ${payload.givenNameKana}`],
    ["生年月日", payload.birthDate],
    ["郵便番号", payload.postalCode],
    ["住所", `${payload.prefecture}${payload.address}${payload.address2 ? ` ${payload.address2}` : ""}`],
    ["電話番号", payload.tel],
    ["メールアドレス", payload.email],
  ];
  return `<table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="padding:10px;border-bottom:1px solid #dbe6f5;text-align:left;color:#49627e">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #dbe6f5">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
}

function emailFrame(content: string): string {
  return `<div style="margin:0;padding:32px 16px;background:#f2f7ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#071a3a"><div style="max-width:640px;margin:0 auto;padding:32px;border-radius:20px;background:#fff;border:1px solid #dbe6f5"><div style="font-size:24px;font-weight:900;color:#1356f6">DUALMO</div>${content}<p style="margin:28px 0 0;color:#6a7d96;font-size:12px">株式会社どこよりも</p></div></div>`;
}

function isEmailAddress(value: string | undefined): value is string {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value));
}

function configuredProvider(env: ApplicationMailEnv | undefined): EmailProvider | null {
  if (!env) return null;
  const requested = env.EMAIL_PROVIDER?.trim().toLowerCase();
  const resendReady = Boolean(env.RESEND_API_KEY && isEmailAddress(env.EMAIL_FROM));
  const gmailReady = Boolean(env.GMAIL_CLIENT_ID && env.GMAIL_CLIENT_SECRET && env.GMAIL_REFRESH_TOKEN && isEmailAddress(env.GMAIL_FROM));

  if (requested === "resend") return resendReady ? "resend" : null;
  if (requested === "gmail") return gmailReady ? "gmail" : null;
  if (requested) return null;
  if (resendReady) return "resend";
  if (gmailReady) return "gmail";
  return null;
}

function notificationRecipients(env: ApplicationMailEnv): string[] {
  return (env.LEAD_NOTIFICATION_RECIPIENTS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(isEmailAddress);
}

function sender(address: string): string {
  return `DUALMO（株式会社どこよりも） <${address}>`;
}

async function sendWithResend(env: ApplicationMailEnv, message: OutboundEmail, idempotencyKey: string): Promise<void> {
  if (!env.RESEND_API_KEY || !isEmailAddress(env.EMAIL_FROM)) throw new Error("RESEND_NOT_CONFIGURED");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from: sender(env.EMAIL_FROM),
      to: message.to,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });

  if (!response.ok) {
    response.body?.cancel();
    throw new Error(`RESEND_${response.status}`);
  }
  response.body?.cancel();
}

function base64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 16_384) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 16_384));
  }
  return btoa(binary);
}

function wrapBase64(value: string): string {
  return value.match(/.{1,76}/g)?.join("\r\n") || "";
}

function gmailRawMessage(from: string, message: OutboundEmail): string {
  const boundary = `dualmo_${crypto.randomUUID().replace(/-/g, "")}`;
  const headers = [
    `From: ${sender(from)}`,
    `To: ${message.to.join(", ")}`,
    ...(message.replyTo ? [`Reply-To: ${message.replyTo}`] : []),
    `Subject: =?UTF-8?B?${base64Utf8(message.subject)}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const mime = [
    ...headers,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(base64Utf8(message.text)),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(base64Utf8(message.html)),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  return base64Utf8(mime).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function gmailAccessToken(env: ApplicationMailEnv): Promise<string> {
  if (!env.GMAIL_CLIENT_ID || !env.GMAIL_CLIENT_SECRET || !env.GMAIL_REFRESH_TOKEN) throw new Error("GMAIL_NOT_CONFIGURED");
  const body = new URLSearchParams({
    client_id: env.GMAIL_CLIENT_ID,
    client_secret: env.GMAIL_CLIENT_SECRET,
    refresh_token: env.GMAIL_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) {
    response.body?.cancel();
    throw new Error(`GMAIL_TOKEN_${response.status}`);
  }
  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || !("access_token" in data) || typeof data.access_token !== "string") throw new Error("GMAIL_TOKEN_INVALID");
  return data.access_token;
}

async function sendWithGmail(accessToken: string, from: string, message: OutboundEmail): Promise<void> {
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: gmailRawMessage(from, message) }),
  });
  if (!response.ok) {
    response.body?.cancel();
    throw new Error(`GMAIL_SEND_${response.status}`);
  }
  response.body?.cancel();
}

async function sendApplicationEmails(provider: EmailProvider, env: ApplicationMailEnv, messages: readonly OutboundEmail[], submissionId: string): Promise<void> {
  if (provider === "resend") {
    await Promise.all(messages.map((message, index) => sendWithResend(env, message, `dualmo-application/${submissionId}/${index + 1}`)));
    return;
  }

  if (!isEmailAddress(env.GMAIL_FROM)) throw new Error("GMAIL_NOT_CONFIGURED");
  const accessToken = await gmailAccessToken(env);
  await Promise.all(messages.map((message) => sendWithGmail(accessToken, env.GMAIL_FROM!, message)));
}

export async function handleApplicationRequest(request: Request, env?: ApplicationMailEnv): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, message: "Method not allowed" }, 405);
  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return json({ ok: false, message: "送信元を確認できませんでした。" }, 403);
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) return json({ ok: false, message: "送信形式が正しくありません。" }, 415);
  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ ok: false, message: "入力内容が大きすぎます。" }, 413);

  let payload: ApplicationPayload;
  try {
    payload = validateApplication(await readLimitedJson(request));
  } catch {
    return json({ ok: false, message: "入力内容をご確認ください。" }, 400);
  }

  const provider = configuredProvider(env);
  if (!provider || !env) return json({ ok: false, code: "EMAIL_NOT_CONFIGURED", message: "メール送信設定の準備中です。" }, 503);
  const leadRecipients = notificationRecipients(env);
  if (leadRecipients.length === 0) return json({ ok: false, code: "EMAIL_NOT_CONFIGURED", message: "メール送信設定の準備中です。" }, 503);

  const submissionId = crypto.randomUUID();
  const textDetails = detailsText(payload);
  const htmlDetails = detailsHtml(payload);
  const customerReplyTo = isEmailAddress(env.EMAIL_REPLY_TO) ? env.EMAIL_REPLY_TO : undefined;
  const messages: OutboundEmail[] = [
    {
      to: [payload.email],
      ...(customerReplyTo ? { replyTo: customerReplyTo } : {}),
      subject: "【DUALMO】お申し込みありがとうございます",
      text: `${payload.familyName} ${payload.givenName} 様\n\nこの度はDUALMOへお申し込みいただき、ありがとうございます。\n以下の内容でお申し込みを受け付けました。\n\n${textDetails}\n\n受付番号：${submissionId}\n\n株式会社どこよりも`,
      html: emailFrame(`<h1 style="margin:24px 0 12px;font-size:22px">お申し込みありがとうございます。</h1><p>${escapeHtml(`${payload.familyName} ${payload.givenName}`)} 様</p><p style="line-height:1.8">この度はDUALMOへお申し込みいただき、ありがとうございます。<br>以下の内容でお申し込みを受け付けました。</p>${htmlDetails}<p style="margin-top:22px">受付番号：<strong>${submissionId}</strong></p>`),
    },
    {
      to: leadRecipients,
      replyTo: payload.email,
      subject: `【DUALMO 新規リード】受付番号 ${submissionId}`,
      text: `DUALMO LPから新規リードが発生しました。\n\n${textDetails}\n\n受付番号：${submissionId}`,
      html: emailFrame(`<h1 style="margin:24px 0 12px;font-size:22px">DUALMO 新規リード通知</h1><p>LPフォームから新しいお申し込みがありました。</p>${htmlDetails}<p style="margin-top:22px">受付番号：<strong>${submissionId}</strong></p>`),
    },
  ];

  try {
    await sendApplicationEmails(provider, env, messages, submissionId);
    console.log(JSON.stringify({ event: "dualmo_application_sent", submissionId, provider }));
    return json({ ok: true, submissionId });
  } catch (error) {
    console.error(JSON.stringify({ event: "dualmo_application_email_failed", submissionId, provider, error: error instanceof Error ? error.message : "unknown" }));
    return json({ ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" }, 502);
  }
}
