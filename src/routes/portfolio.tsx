import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/studio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [
    { title: "Creative Portfolio | 74 Studio" },
    { name: "description", content: "Explore original music video, animation, and editing concept studies from 74 STUDIO." },
    { property: "og:title", content: "Creative Portfolio | 74 Studio" },
    { property: "og:description", content: "A collection of visuals, stories, and creative experiments produced at 74 STUDIO." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/portfolio" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/portfolio" }] }),
  component: PortfolioPage,
});