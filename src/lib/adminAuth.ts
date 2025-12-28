import { Buffer } from "node:buffer";

import { NextRequest } from "next/server";

export function getAdminUserFromRequest(request: NextRequest): string {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Admin auth is not configured");
  }

  const authorization = request.headers.get("authorization");
  if (!authorization || !authorization.startsWith("Basic ")) {
    throw new Error("Authentication required");
  }

  const encoded = authorization.slice("Basic ".length);

  let decoded = "";
  try {
    decoded = Buffer.from(encoded, "base64").toString("utf8");
  } catch {
    throw new Error("Invalid authorization header");
  }

  const [user, pass] = decoded.split(":");
  if (user !== username || pass !== password) {
    throw new Error("Invalid credentials");
  }

  return user;
}
