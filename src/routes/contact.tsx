import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/studio";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Start a Project | 74 Studio" },
    { name: "description", content: "Tell 74 STUDIO what you are imagining. Share your project details to start a personalized music video or editing inquiry." },
    { property: "og:title", content: "Start a Project | 74 Studio" },
    { property: "og:description", content: "Let's discuss how 74 STUDIO can bring your music and creative direction to life." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/contact" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/contact" }] }),
  component: ContactPage,
});