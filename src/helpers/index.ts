import crypto from "crypto";

export const random = () => crypto.randomBytes(8).toString("hex");