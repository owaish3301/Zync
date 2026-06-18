import { z } from "zod";

export const emailSchema = z.string().email().toLowerCase();
export type EmailType = z.infer<typeof emailSchema>;
