import { createFileRoute } from "@tanstack/react-router";
import { MusicVideosPage } from "@/components/studio";

export const Route = createFileRoute("/music-videos")({
  head: () => ({ meta: [
    { title: "Music Video Production | 74 Studio" },
    { name: "description", content: "AI-assisted, 2D animated, 3D cinematic, and lyric video production for independent musicians at 74 STUDIO." },
    { property: "og:title", content: "Music Video Production | 74 Studio" },
    { property: "og:description", content: "From AI-assisted visuals to custom animation, bring your sound to life with 74 STUDIO." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/music-videos" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/music-videos" }] }),
  component: MusicVideosPage,
});