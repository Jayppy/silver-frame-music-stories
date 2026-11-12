import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "@/lib/inquiry-schema";

export const submitProjectInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("project_inquiries").insert({
      name: data.name,
      email: data.email,
      artist_project: data.artistProject,
      service_required: data.serviceRequired,
      project_deadline: data.projectDeadline || null,
      desired_runtime: data.desiredRuntime || null,
      music_link: data.musicLink || null,
      creative_references: data.creativeReferences || null,
      project_description: data.projectDescription,
    });

    if (error) {
      console.error("Project inquiry could not be saved.", error.code);
      throw new Error("We couldn’t save your inquiry just now. Please try again.");
    }

    return { success: true };
  });