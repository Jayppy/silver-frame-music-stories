import { createFileRoute } from "@tanstack/react-router";
import { VideoEditingPage } from "@/components/studio";

export const Route = createFileRoute("/video-editing")({
  head: () => ({ meta: [
    { title: "Short-Form Video Editing | 74 Studio" },
    { name: "description", content: "Cinematic short-form edits, Reels, TikToks, Shorts, teasers, captions, and artist social content by 74 STUDIO." },
    { property: "og:title", content: "Short-Form Video Editing | 74 Studio" },
    { property: "og:description", content: "Create, cut, captivate. Social-first editing for artists, creators, and brands." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/video-editing" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/video-editing" }] }),
  component: VideoEditingPage,
});