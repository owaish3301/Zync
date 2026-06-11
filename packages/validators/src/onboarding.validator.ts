import { z } from "zod";

export const emailSchema = z.email().toLowerCase();
export type EmailType = z.infer<typeof emailSchema>;
