import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/studio";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "74 Studio | Music Videos & Creative Production" },
    { name: "description", content: "74 STUDIO creates cinematic music videos, animation, and short-form content for independent artists." },
    { property: "og:title", content: "74 Studio | Music Videos & Creative Production" },
    { property: "og:description", content: "We turn sound into something you can see. Cinematic visuals for independent artists." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: HomePage,
});
