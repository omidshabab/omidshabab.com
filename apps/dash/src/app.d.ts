// app.d.ts
/// <reference types="lucia" />

import { roleEnums } from "./lib/db/schema/auth";

declare namespace Lucia {
  type Auth = import("@/lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
    name: string;
    email: string;
    phone: string;
    role: "user" | "admin" | "manager";
  };
  type DatabaseSessionAttributes = {};
}
