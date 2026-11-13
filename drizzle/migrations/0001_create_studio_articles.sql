CREATE TABLE public.studio_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  body text NOT NULL,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.studio_articles TO anon, authenticated;
GRANT ALL ON public.studio_articles TO service_role;
ALTER TABLE public.studio_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published studio articles" ON public.studio_articles FOR SELECT TO anon, authenticated USING (is_published = true);