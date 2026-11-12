import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Disc3, Instagram, Linkedin,
  Menu, Play, X, Youtube,
} from "lucide-react";
import monogram from "@/assets/74-studio-monogram.jpg.asset.json";
import lockup from "@/assets/74-studio-lockup.jpg.asset.json";
import nocturne from "@/assets/concept-nocturne.jpg";
import tide from "@/assets/concept-tide.jpg";
import orbit from "@/assets/concept-orbit.jpg";
import verticalFrame from "@/assets/concept-frame.jpg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useServerFn } from "@tanstack/react-start";
import { inquirySchema } from "@/lib/inquiry-schema";
import { submitProjectInquiry } from "@/lib/inquiries.functions";

const navLinks = [
  ["HOME", "/"], ["MUSIC VIDEOS", "/music-videos"], ["VIDEO EDITING", "/video-editing"],
  ["PORTFOLIO", "/portfolio"], ["ABOUT", "/about"], ["CONTACT", "/contact"],
] as const;

const socials = [
  { label: "YouTube", href: "https://youtube.com/@prodby74", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/prod.by.74/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prodby74/", icon: Linkedin },
  { label: "Discord", href: "https://discord.gg/EaAaSaGe", icon: Disc3 },
];

const projects = [
  { title: "AFTER THE LAST LIGHT", type: "AI", medium: "AI music video", image: nocturne, imageAlt: "Singer silhouette in a dark industrial performance hall", ratio: "aspect-[16/10]" },
  { title: "THE TIDE BETWEEN US", type: "2D", medium: "2D animation", image: tide, imageAlt: "Illustrated traveler looking across a moonlit sea", ratio: "aspect-[16/10]" },
  { title: "ORBIT / 01", type: "3D", medium: "3D music video", image: orbit, imageAlt: "Reflective figure in a monumental chrome hall beneath an eclipse", ratio: "aspect-[16/10]" },
  { title: "VOICE IN THE DARK", type: "LYRIC VIDEOS", medium: "Lyric video concept", image: verticalFrame, imageAlt: "Monochrome microphone and hand under a spotlight", ratio: "aspect-[4/5]" },
  { title: "ONE FRAME AT A TIME", type: "VIDEO EDITING", medium: "Short-form edit concept", image: verticalFrame, imageAlt: "Vertical monochrome microphone concept frame", ratio: "aspect-[4/5]" },
];

const services = [
  { number: "01", title: "AI MUSIC VIDEOS", text: "AI-assisted cinematic worlds, concept-led storytelling, and release visuals built around your sound.", href: "/music-videos" },
  { number: "02", title: "2D ANIMATION", text: "Custom illustration, animated artwork, and hand-shaped motion that feels distinctly yours.", href: "/music-videos" },
  { number: "03", title: "3D MUSIC VIDEOS", text: "Immersive environments, expressive characters, and cinematic three-dimensional worlds.", href: "/music-videos" },
  { number: "04", title: "SHORT-FORM EDITING", text: "Precise, platform-ready edits that give every release moment a reason to stop scrolling.", href: "/video-editing" },
];

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "flex items-center gap-2" : "flex flex-wrap gap-3"}>
    {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground">
      <Icon aria-hidden="true" className="size-4" />
    </a>)}
  </div>;
}

function ProjectDetail({ project }: { project: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`View concept presentation: ${project.title}`} className="group block w-full text-left">
      <span className={`relative block overflow-hidden border border-border bg-card ${project.ratio}`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-[1.025]" />
        <span className="absolute inset-0 grid place-items-center bg-background/10 opacity-0 transition group-hover:opacity-100"><span className="grid size-14 place-items-center rounded-full border border-foreground/60 bg-background/60 backdrop-blur-sm"><Play className="ml-1 size-5" aria-hidden="true" /></span></span>
        <span className="absolute left-3 top-3 border border-border bg-background/85 px-2 py-1 font-sans text-[0.6rem] font-bold tracking-[0.16em] text-foreground">CONCEPT STUDY</span>
      </span>
      <span className="mt-4 flex items-start justify-between gap-4">
        <span><span className="block font-display text-lg font-semibold leading-tight text-foreground">{project.title}</span><span className="mt-1 block studio-kicker">{project.medium}</span></span>
        <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
      </span>
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-4xl">
        <DialogHeader><DialogTitle className="font-display text-2xl">{project.title}</DialogTitle><DialogDescription className="studio-kicker">74 STUDIO · {project.medium} · CONCEPT STUDY</DialogDescription></DialogHeader>
        <img src={project.image} alt={project.imageAlt} className="max-h-[62vh] w-full border border-border object-cover" />
        <p className="font-sans text-sm leading-7 text-muted-foreground">An original concept study created to show the visual direction and production approach of 74 STUDIO. This is not a commissioned artist project or a client endorsement.</p>
        <Button asChild className="w-fit rounded-none"><Link to="/contact">Discuss a project <ArrowRight aria-hidden="true" /></Link></Button>
      </DialogContent>
    </Dialog>
  </>;
}

function ProjectGrid({ limit }: { limit?: number }) {
  const visible = projects.slice(0, limit ?? projects.length);
  return <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{visible.map((project) => <ProjectDetail key={project.title} project={project} />)}</div>;
}

function SectionHeading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className="mb-9 max-w-2xl"><p className="studio-kicker">{label}</p><h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{title}</h2>{text && <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-muted-foreground">{text}</p>}</div>;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
    <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between sm:px-8 lg:px-12">
      <Link to="/" aria-label="74 STUDIO home" className="flex min-w-0 items-center gap-3">
        <img src={monogram.url} alt="74 STUDIO metallic monogram" width="48" height="48" className="size-10 shrink-0 object-cover sm:size-11" />
        <span className="min-w-0"><span className="block truncate font-display text-sm font-bold tracking-[0.12em] text-foreground">74 STUDIO</span><span className="block studio-kicker text-[0.55rem]">INDEPENDENT · EST. 2026</span></span>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
        {navLinks.map(([label, href]) => <Link key={href} to={href} activeProps={{ className: "text-foreground" }} inactiveProps={{ className: "text-muted-foreground" }} activeOptions={{ exact: true }} className="font-sans text-[0.65rem] font-bold tracking-[0.12em] transition hover:text-foreground">{label}</Link>)}
      </nav>
      <div className="flex items-center justify-self-end gap-2">
        <Button asChild size="sm" className="hidden rounded-none px-4 font-sans text-[0.65rem] tracking-[0.12em] sm:inline-flex"><Link to="/contact">START A PROJECT <ArrowUpRight aria-hidden="true" /></Link></Button>
        <Button type="button" variant="outline" size="icon" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-none lg:hidden">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
      </div>
    </div>
    {open && <nav aria-label="Mobile navigation" className="border-t border-border px-5 py-4 lg:hidden"><div className="grid gap-1">{navLinks.map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="border-b border-border py-3 font-sans text-xs font-bold tracking-[0.16em] text-muted-foreground transition hover:text-foreground">{label}</Link>)}<Button asChild className="mt-4 w-full rounded-none"><Link to="/contact" onClick={() => setOpen(false)}>START A PROJECT <ArrowUpRight aria-hidden="true" /></Link></Button></div></nav>}
  </header>;
}

function SiteFooter() {
  return <footer className="border-t border-border bg-card/60">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-12 lg:py-16">
      <div><img src={lockup.url} alt="74 STUDIO · Creative Studio · Est. 2026" width="400" height="400" loading="lazy" className="mb-4 h-20 w-56 object-contain object-left" /><p className="max-w-sm font-sans text-sm leading-7 text-muted-foreground">CREATING VISUALS THAT MOVE WITH THE MUSIC.</p><a className="mt-4 inline-flex font-sans text-sm text-foreground underline decoration-border underline-offset-4" href="mailto:inquire@74-studio.com">inquire@74-studio.com</a></div>
      <div><p className="studio-kicker">EXPLORE</p><div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">{navLinks.map(([label, href]) => <Link key={href} to={href} className="font-sans text-xs text-muted-foreground transition hover:text-foreground">{label}</Link>)}</div></div>
      <div><p className="studio-kicker">FOLLOW THE STUDIO</p><p className="mt-4 mb-4 font-sans text-sm leading-6 text-muted-foreground">Creative work, process, and new ideas from 74 STUDIO.</p><SocialLinks /><a href="mailto:inquire@74-studio.com" className="mt-5 inline-flex items-center gap-2 font-sans text-xs text-foreground">INQUIRE <ArrowUpRight aria-hidden="true" className="size-3" /></a></div>
    </div>
    <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-border px-5 py-4 font-sans text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© 2026 74 STUDIO. ALL RIGHTS RESERVED.</span><span>INDEPENDENT IN SPIRIT. CINEMATIC IN EXECUTION.</span></div>
  </footer>;
}

function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader />{children}<SiteFooter /></div>;
}

function ClosingCta({ title = "LET'S CREATE SOMETHING THAT MOVES PEOPLE.", button = "START YOUR PROJECT" }: { title?: string; button?: string }) {
  return <section className="border-y border-border bg-card/50"><div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-14 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:px-12 lg:py-20"><div><p className="studio-kicker">74 STUDIO · OPEN FOR PROJECTS</p><h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{title}</h2></div><Button asChild className="w-fit rounded-none"><Link to="/contact">{button} <ArrowUpRight aria-hidden="true" /></Link></Button></div></section>;
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return <section className="relative overflow-hidden border-b border-border"><div className="mx-auto max-w-[1440px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24"><p className="studio-kicker">{eyebrow}</p><h1 className="studio-metal mt-4 max-w-5xl font-display text-5xl font-bold leading-[0.98] sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-6 max-w-2xl font-sans text-base leading-7 text-muted-foreground sm:text-lg">{text}</p></div></section>;
}

function ServiceList({ rows }: { rows: { number: string; title: string; text: string; href: string }[] }) {
  return <div className="border-t border-border">{rows.map((item) => <Link key={item.number} to={item.href} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-4 border-b border-border py-5 transition hover:bg-card/60 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-6 sm:py-7"><span className="studio-kicker pt-1">{item.number}</span><span className="min-w-0"><span className="block font-display text-lg font-semibold text-foreground sm:text-xl">{item.title}</span><span className="mt-2 block max-w-2xl font-sans text-sm leading-6 text-muted-foreground">{item.text}</span></span><ArrowUpRight aria-hidden="true" className="mt-1 size-5 text-muted-foreground" /></Link>)}</div>;
}

export function HomePage() {
  return <SiteLayout>
    <main>
      <section className="relative isolate min-h-[80svh] overflow-hidden border-b border-border sm:min-h-[84svh]">
        <img src={nocturne} alt="Singer standing under a shaft of light on a dark industrial stage" width="1920" height="1104" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-[64%_center]" />
        <div className="studio-image-shade absolute inset-0 -z-10" />
        <div className="mx-auto flex min-h-[80svh] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[84svh] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="studio-reveal studio-kicker">INDEPENDENT CREATIVE PRODUCTION · EST. 2026</p>
          <h1 className="studio-reveal studio-metal mt-5 max-w-5xl font-display text-6xl font-bold leading-[0.89] sm:text-8xl lg:text-[7.5rem]">YOUR MUSIC.<br />OUR VISUALS.</h1>
          <p className="studio-reveal mt-6 font-display text-xl font-medium text-foreground sm:text-2xl">We turn sound into something you can see.</p>
          <p className="mt-3 max-w-xl font-sans text-sm leading-7 text-muted-foreground sm:text-base">74 STUDIO is an independent creative studio producing cinematic music videos, animated visuals, and digital content for artists who want their music to stand out.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button asChild className="rounded-none"><Link to="/portfolio">EXPLORE OUR WORK <ArrowDown aria-hidden="true" /></Link></Button><Button asChild variant="outline" className="rounded-none border-foreground/40 bg-background/30 text-foreground hover:bg-accent"><Link to="/contact">START A PROJECT <ArrowUpRight aria-hidden="true" /></Link></Button></div>
          <div className="mt-12 flex items-center gap-3"><span className="h-px w-10 bg-primary" /><span className="studio-kicker">SCROLL TO EXPLORE</span></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"><div className="mb-8 flex items-end justify-between gap-4"><SectionHeading label="A FEW WORLDS, BUILT FROM SOUND" title="SELECTED WORKS" /><Button asChild variant="outline" className="mb-9 hidden shrink-0 rounded-none sm:inline-flex"><Link to="/portfolio">VIEW ALL PROJECTS <ArrowRight aria-hidden="true" /></Link></Button></div><ProjectGrid limit={3} /><Button asChild variant="outline" className="mt-8 w-full rounded-none sm:hidden"><Link to="/portfolio">VIEW ALL PROJECTS <ArrowRight aria-hidden="true" /></Link></Button></section>
      <section className="border-y border-border bg-card/40"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-20"><div><SectionHeading label="FROM THE FIRST FRAME TO THE FINAL CUT" title="WHAT WE CREATE" text="A focused creative practice for artists shaping a sound, a story, and a world of their own." /><Link to="/music-videos" className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-[0.13em] text-foreground">EXPLORE MUSIC VIDEOS <ArrowRight aria-hidden="true" className="size-4" /></Link></div><ServiceList rows={services} /></div></section>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24"><div className="studio-kicker">A NOTE FROM THE STUDIO</div><div><h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl">EVERY TRACK HAS A VISUAL STORY.</h2><p className="mt-5 max-w-2xl font-sans text-sm leading-7 text-muted-foreground sm:text-base">We transform music into visual experiences through animation, cinematic storytelling, and creative editing. Every project begins with the sound, the artist, and the story they want to tell.</p><Link to="/about" className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold tracking-[0.13em] text-foreground">MEET THE STUDIO <ArrowRight aria-hidden="true" className="size-4" /></Link></div></section>
      <ClosingCta />
    </main>
  </SiteLayout>;
}

const musicServices = [
  { number: "01", title: "AI MUSIC VIDEOS", text: "AI-assisted cinematic music videos, conceptual storytelling, and promotional visuals. Deliverables are shaped around your release: a primary visual, selected cutdowns, and export formats discussed for your platforms.", href: "/portfolio" },
  { number: "02", title: "2D ANIMATION", text: "Custom illustrated animation, animated artwork, and music-synchronized visuals, developed from early visual direction through a finished animated piece.", href: "/portfolio" },
  { number: "03", title: "3D MUSIC VIDEOS", text: "Cinematic 3D environments, character-driven storytelling, and immersive animation. Each direction is developed to support the mood and identity of your track.", href: "/portfolio" },
  { number: "04", title: "LYRIC VIDEOS", text: "Typography-driven lyric videos and animated lyrics, designed to give every line and every beat its own visual rhythm.", href: "/portfolio" },
];

export function MusicVideosPage() {
  const featureImages = [nocturne, tide, orbit, verticalFrame];
  return <SiteLayout><main><PageIntro eyebrow="MUSIC VIDEO PRODUCTION · 74 STUDIO" title={<>YOUR SOUND.<br />YOUR WORLD.</>} text="From AI-powered visuals to custom 2D animation and cinematic 3D environments, we create music videos that bring your artistic vision to life." />
    <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"><div className="grid gap-10">{musicServices.map((item, index) => <article key={item.number} className="grid gap-6 border-b border-border pb-10 last:border-b-0 md:grid-cols-2 md:items-center md:gap-10 md:pb-14"><div className={`relative overflow-hidden border border-border ${index === 3 ? "aspect-[4/3]" : "aspect-[16/10]"}`}><img src={featureImages[index]} alt={`${item.title.toLowerCase()} visual concept`} loading="lazy" className="size-full object-cover" /><span className="absolute left-3 top-3 border border-border bg-background/85 px-2 py-1 studio-kicker">CONCEPT STUDY</span></div><div><p className="studio-kicker">{item.number} / MUSIC VIDEOS</p><h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{item.title}</h2><p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">{item.text}</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="outline" className="rounded-none"><Link to={item.href}>EXPLORE PORTFOLIO <ArrowRight aria-hidden="true" /></Link></Button><Button asChild className="rounded-none"><Link to="/contact">START A PROJECT <ArrowUpRight aria-hidden="true" /></Link></Button></div></div></article>)}</div></section>
    <section className="border-y border-border bg-card/40"><div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><SectionHeading label="MUSIC VIDEO CONCEPTS" title="SELECTED VISUAL STUDIES" text="Original concept studies developed by 74 STUDIO. Each piece is presented as a visual direction exercise, not commissioned client work." /><ProjectGrid limit={4} /></div></section>
    <ClosingCta title="HAVE A CONCEPT IN MIND?" button="REQUEST A MUSIC VIDEO" /></main></SiteLayout>;
}

const editTypes = [
  ["ARTIST CONTENT", "Performance clips, studio sessions, music promos, and artist branding content."],
  ["SOCIAL MEDIA REELS", "Instagram Reels, TikTok videos, and YouTube Shorts shaped for vertical viewing."],
  ["BEHIND THE SCENES", "Studio footage, interviews, documentary clips, and creative process videos."],
  ["PROMOTIONAL CONTENT", "Release teasers, announcements, music campaigns, and promotional edits."],
] as const;
const editCapabilities = ["Cinematic pacing", "Dynamic cuts", "Captions and subtitles", "Motion graphics", "Music synchronization", "Sound design", "Color correction", "Platform-ready exports"];

export function VideoEditingPage() {
  return <SiteLayout><main><PageIntro eyebrow="SHORT-FORM VIDEO EDITING · SOCIAL CONTENT PRODUCTION" title={<>CREATE.<br />CUT.<br />CAPTIVATE.</>} text="Professional short-form video editing for artists, creators, and brands that want their content to stand out. From music release teasers to engaging Reels and Shorts, we transform raw footage into polished, compelling content." />
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-20"><div><SectionHeading label="EDITING FOR THE WAY YOU SHARE" title="WHAT WE EDIT" text="Focused short-form content for artists, creators, and releases. Bring the footage; we’ll shape the story and finish." /><div className="border-t border-border">{editTypes.map(([title, text], index) => <div key={title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-border py-5"><span className="studio-kicker">0{index + 1}</span><span><span className="font-display text-lg font-semibold">{title}</span><span className="mt-2 block font-sans text-sm leading-6 text-muted-foreground">{text}</span></span></div>)}</div></div><div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] items-center gap-3 sm:gap-5"><img src={verticalFrame} alt="Vertical editing concept still with a microphone and dramatic spotlight" width="1088" height="1600" className="aspect-[9/14] w-full border border-border object-cover" /><div className="space-y-3"><img src={nocturne} alt="Wide music video concept used for social edit direction" width="1920" height="1104" loading="lazy" className="aspect-[4/3] w-full border border-border object-cover" /><p className="studio-kicker">9:16 · SOCIAL CUT CONCEPT</p><p className="font-sans text-xs leading-6 text-muted-foreground">Concept frames only. Actual edit previews will be added as commissioned work is approved for sharing.</p></div></div></section>
    <section className="border-y border-border bg-card/40"><div className="mx-auto grid max-w-[1440px] gap-9 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:px-12"><div><SectionHeading label="THE CRAFT OF THE CUT" title="EDITING CAPABILITIES" /></div><div className="grid gap-x-8 sm:grid-cols-2">{editCapabilities.map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-border py-4"><span className="studio-kicker">0{index + 1}</span><span className="font-sans text-sm text-foreground">{item}</span></div>)}</div></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><SectionHeading label="EDITING PORTFOLIO" title="EDITED TO MAKE EVERY FRAME COUNT." text="A vertical 9:16 concept gallery. The artwork here is an original studio study, not a client commission." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{projects.filter((item) => item.type === "VIDEO EDITING" || item.type === "AI" || item.type === "LYRIC VIDEOS").map((project) => <ProjectDetail key={project.title} project={project} />)}</div></section>
    <section className="border-y border-border bg-card/40"><div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><SectionHeading label="A CLEAR, COLLABORATIVE PROCESS" title="HOW IT WORKS" /><div className="grid gap-8 sm:grid-cols-3">{[["01", "SHARE YOUR FOOTAGE", "Send your footage, music, and creative references."], ["02", "CREATIVE EDITING", "We edit your content according to your direction and intended platform."], ["03", "FINAL DELIVERY", "Receive polished, platform-ready videos." ]].map(([n, title, text]) => <div key={n} className="border-t border-border pt-4"><p className="studio-kicker">{n}</p><h3 className="mt-4 font-display text-xl font-semibold">{title}</h3><p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{text}</p></div>)}</div></div></section>
    <ClosingCta title="HAVE CONTENT THAT NEEDS A CREATIVE TOUCH?" button="REQUEST AN EDITING QUOTE" /></main></SiteLayout>;
}

function PortfolioContent() {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", "AI", "2D", "3D", "LYRIC VIDEOS", "VIDEO EDITING"];
  const visible = filter === "ALL" ? projects : projects.filter((project) => project.type === filter);
  return <SiteLayout><main><PageIntro eyebrow="THE 74 STUDIO PORTFOLIO" title="SELECTED WORKS" text="A collection of visuals, stories, and creative experiments produced at 74 STUDIO. Every project currently shown is clearly identified as a studio concept study." />
    <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"><div className="mb-9 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio projects">{categories.map((category) => <Button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)} variant={filter === category ? "default" : "outline"} size="sm" className="rounded-none text-[0.65rem] tracking-[0.11em]">{category}</Button>)}</div><p aria-live="polite" className="mb-5 studio-kicker">{visible.length} {visible.length === 1 ? "STUDY" : "STUDIES"} · CONCEPT WORK</p><div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{visible.map((project) => <ProjectDetail key={project.title} project={project} />)}</div><p className="mt-10 max-w-2xl border-l border-primary pl-4 font-sans text-xs leading-6 text-muted-foreground">These are original 74 STUDIO concept studies, not commissioned client projects. Artist names, client identities, and testimonials are not included.</p></section>
    <ClosingCta title="HAVE A SOUND YOU WANT TO SEE?" button="START A PROJECT" /></main></SiteLayout>;
}

export function PortfolioPage() { return <PortfolioContent />; }

export function AboutPage() {
  return <SiteLayout><main><PageIntro eyebrow="ABOUT 74 STUDIO · INDEPENDENT SINCE 2026" title={<>INDEPENDENT IN SPIRIT.<br />CINEMATIC IN EXECUTION.</>} text="74 STUDIO is an independent creative studio focused on transforming music and artistic identity into compelling visual experiences." />
    <section className="mx-auto grid max-w-[1440px] gap-9 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-20"><div><p className="studio-kicker">THE STUDIO MARK</p><img src={lockup.url} alt="The 74 STUDIO metallic identity, portrait, and 2026 mark" width="1408" height="1408" loading="lazy" className="mt-4 w-full border border-border object-cover" /><p className="mt-3 studio-kicker">74 STUDIO · EST. 2026</p></div><div className="space-y-9"><div><p className="studio-kicker">01 / PHILOSOPHY</p><h2 className="mt-3 font-display text-3xl font-semibold">THE MUSIC LEADS.</h2><p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">A strong visual begins by listening. We look for the emotion, texture, and point of view already present in a track, then build a visual language around it.</p></div><div><p className="studio-kicker">02 / CREATIVE DIRECTION</p><h2 className="mt-3 font-display text-3xl font-semibold">MAKE IT FEEL LIKE YOU.</h2><p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">From a first reference to a final frame, each project is approached as a collaboration. The goal is not to follow a template, but to create a world that belongs to the artist.</p></div><div><p className="studio-kicker">03 / PRODUCTION APPROACH</p><h2 className="mt-3 font-display text-3xl font-semibold">INTENT IN EVERY FRAME.</h2><p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">We bring animation, cinematic image-making, and thoughtful editing together with a clear direction and a considered process, from early concept through delivery.</p></div><div className="border-t border-border pt-6"><p className="studio-kicker">FOUNDER / CREATIVE DIRECTOR</p><h2 className="mt-3 font-display text-2xl font-semibold">JOHN PETER</h2><p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">Building an independent creative practice for musicians and artists with a story to tell.</p></div></div></section>
    <ClosingCta title="YOUR MUSIC ALREADY HAS A WORLD. LET'S FIND IT." /></main></SiteLayout>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid gap-2"><Label className="studio-kicker">{label}</Label>{children}</div>;
}

const initialForm = { name: "", email: "", artistProject: "", serviceRequired: "" as const | string, projectDeadline: "", desiredRuntime: "", musicLink: "", creativeReferences: "", projectDescription: "" };

export function ContactPage() {
  const submit = useServerFn(submitProjectInquiry);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const update = (key: keyof typeof initialForm, value: string) => setForm((previous) => ({ ...previous, [key]: value }));
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setStatus("idle");
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => { const key = issue.path[0]; if (typeof key === "string" && !nextErrors[key]) nextErrors[key] = issue.message; });
      setErrors(nextErrors);
      document.getElementById(Object.keys(nextErrors)[0] ?? "contact-name")?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submit({ data: result.data });
      setStatus("success");
      setForm(initialForm);
    } catch {
      setFormError("We couldn’t save your inquiry just now. Please try again.");
      setStatus("error");
    }
  }
  const inputClass = "min-h-11 rounded-none border-border bg-card text-sm placeholder:text-muted-foreground focus-visible:ring-primary";
  return <SiteLayout><main><PageIntro eyebrow="PROJECT INQUIRIES · 74 STUDIO" title={<>TELL US WHAT<br />YOU'RE IMAGINING.</>} text="Whether you're releasing a single, planning an album, or creating promotional content, let's discuss how 74 STUDIO can bring your vision to life." />
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-12 lg:py-20"><aside><p className="studio-kicker">START A CONVERSATION</p><a href="mailto:inquire@74-studio.com" className="mt-3 inline-flex items-center gap-2 font-display text-xl font-semibold text-foreground">inquire@74-studio.com <ArrowUpRight aria-hidden="true" className="size-4" /></a><p className="mt-4 max-w-sm font-sans text-sm leading-7 text-muted-foreground">Tell us a little about the sound, the idea, and what you’re hoping to make. We’ll review your details and follow up about your project.</p><div className="mt-8 border-t border-border pt-6"><p className="studio-kicker">FIND THE STUDIO</p><div className="mt-4"><SocialLinks /></div><p className="mt-4 font-sans text-xs leading-6 text-muted-foreground">YouTube · Instagram · LinkedIn · Discord</p></div><div className="mt-8 border-t border-border pt-6"><p className="studio-kicker">PERSONALIZED PROJECT QUOTES</p><p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">Every project is different. Share your direction and we’ll discuss a tailored approach with you directly.</p></div></aside>
      <form onSubmit={handleSubmit} noValidate className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="NAME"><Input id="contact-name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "error-name" : undefined} maxLength={100} placeholder="Your name" className={inputClass} />{errors.name && <span id="error-name" className="font-sans text-xs text-destructive">{errors.name}</span>}</Field>
        <Field label="EMAIL"><Input id="contact-email" type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} maxLength={254} placeholder="you@example.com" className={inputClass} />{errors.email && <span id="error-email" className="font-sans text-xs text-destructive">{errors.email}</span>}</Field>
        <Field label="ARTIST / PROJECT NAME"><Input id="contact-artistProject" value={form.artistProject} onChange={(event) => update("artistProject", event.target.value)} aria-invalid={Boolean(errors.artistProject)} maxLength={120} placeholder="Artist or working title" className={inputClass} />{errors.artistProject && <span className="font-sans text-xs text-destructive">{errors.artistProject}</span>}</Field>
        <Field label="SERVICE REQUIRED"><select id="contact-serviceRequired" value={form.serviceRequired} onChange={(event) => update("serviceRequired", event.target.value)} aria-invalid={Boolean(errors.serviceRequired)} className={`${inputClass} w-full px-3`}><option value="">Choose a service</option>{["AI Music Video", "2D Animation", "3D Music Video", "Lyric Video", "Short-Form Editing", "Custom Project"].map((option) => <option key={option} value={option}>{option}</option>)}</select>{errors.serviceRequired && <span className="font-sans text-xs text-destructive">{errors.serviceRequired}</span>}</Field>
        <Field label="PROJECT DEADLINE"><Input id="contact-projectDeadline" type="date" value={form.projectDeadline} onChange={(event) => update("projectDeadline", event.target.value)} className={inputClass} /></Field>
        <Field label="DESIRED RUNTIME"><Input id="contact-desiredRuntime" value={form.desiredRuntime} onChange={(event) => update("desiredRuntime", event.target.value)} maxLength={100} placeholder="e.g. 30-second teaser, full track" className={inputClass} /></Field>
        <Field label="MUSIC LINK"><Input id="contact-musicLink" type="url" value={form.musicLink} onChange={(event) => update("musicLink", event.target.value)} aria-invalid={Boolean(errors.musicLink)} maxLength={500} placeholder="https://..." className={inputClass} />{errors.musicLink && <span className="font-sans text-xs text-destructive">{errors.musicLink}</span>}</Field>
        <Field label="CREATIVE REFERENCES"><Input id="contact-creativeReferences" value={form.creativeReferences} onChange={(event) => update("creativeReferences", event.target.value)} aria-invalid={Boolean(errors.creativeReferences)} maxLength={2000} placeholder="Links or references" className={inputClass} />{errors.creativeReferences && <span className="font-sans text-xs text-destructive">{errors.creativeReferences}</span>}</Field>
        <div className="sm:col-span-2"><Field label="PROJECT DESCRIPTION"><Textarea id="contact-projectDescription" value={form.projectDescription} onChange={(event) => update("projectDescription", event.target.value)} aria-invalid={Boolean(errors.projectDescription)} maxLength={4000} rows={6} placeholder="Tell us about the music, the story, and what you imagine seeing." className={`${inputClass} min-h-36 resize-y py-3`} />{errors.projectDescription && <span className="mt-2 block font-sans text-xs text-destructive">{errors.projectDescription}</span>}</Field></div>
        <div className="sm:col-span-2"><Button type="submit" disabled={status === "sending"} className="min-h-12 w-full rounded-none sm:w-auto">{status === "sending" ? "SENDING…" : "SEND PROJECT INQUIRY"} {status === "success" ? <Check aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}</Button>{status === "success" && <p role="status" className="mt-4 flex items-start gap-2 font-sans text-sm text-foreground"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" /> Your inquiry has been securely saved. We’ll review your project details. Email notifications are not configured.</p>}{formError && <p role="alert" className="mt-4 font-sans text-sm text-destructive">{formError}</p>}<p className="mt-4 font-sans text-xs leading-6 text-muted-foreground">Your inquiry is stored for the studio to review. This form does not send an email.</p></div>
      </form>
    </section>
    <ClosingCta title="LET'S MAKE YOUR NEXT RELEASE IMPOSSIBLE TO MISS." button="START YOUR PROJECT" /></main></SiteLayout>;
}