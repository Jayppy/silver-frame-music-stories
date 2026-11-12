import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/studio";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About 74 Studio | Independent Creative Studio" },
    { name: "description", content: "Meet 74 STUDIO, an independent creative production studio founded by John Peter in 2026." },
    { property: "og:title", content: "About 74 Studio | Independent Creative Studio" },
    { property: "og:description", content: "Independent in spirit. Cinematic in execution. Get to know 74 STUDIO." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/about" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/about" }] }),
  component: AboutPage,
});