import { z } from "zod";

const services = [
  "AI Music Video",
  "2D Animation",
  "3D Music Video",
  "Lyric Video",
  "Short-Form Editing",
  "Custom Project",
] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(500, "Keep links under 500 characters.")
  .refine((value) => value === "" || /^https:\/\//i.test(value), "Use a secure https:// link.")
  .refine((value) => {
    if (!value) return true;
    try {
      const parsed = new URL(value);
      return parsed.protocol === "https:" && parsed.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Enter a valid secure link.")
  .optional()
  .or(z.literal(""));

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  artistProject: z.string().trim().min(1, "Please enter an artist or project name.").max(120),
  serviceRequired: z.enum(services, { error: "Choose a service." }),
  projectDeadline: z.string().trim().max(10).optional().or(z.literal("")),
  desiredRuntime: z.string().trim().max(100).optional().or(z.literal("")),
  musicLink: optionalUrl,
  creativeReferences: z.string().trim().max(2000).optional().or(z.literal("")),
  projectDescription: z.string().trim().min(20, "Add a little more detail (at least 20 characters). ").max(4000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;