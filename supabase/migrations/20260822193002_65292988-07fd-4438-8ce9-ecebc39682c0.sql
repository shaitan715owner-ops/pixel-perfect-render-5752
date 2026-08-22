CREATE TABLE public.collaborator_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  role text NOT NULL CHECK (char_length(role) BETWEEN 2 AND 60),
  contact text NOT NULL CHECK (char_length(contact) BETWEEN 3 AND 120),
  building text NOT NULL CHECK (char_length(building) BETWEEN 10 AND 600),
  help_needed text NOT NULL CHECK (char_length(help_needed) BETWEEN 10 AND 600),
  skills text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.collaborator_requests TO anon, authenticated;
GRANT SELECT (id, name, role, building, help_needed, skills, created_at, is_published) ON public.collaborator_requests TO anon, authenticated;
GRANT ALL ON public.collaborator_requests TO service_role;

ALTER TABLE public.collaborator_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published requests"
  ON public.collaborator_requests FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Anyone can post a request"
  ON public.collaborator_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (is_published = true AND array_length(skills, 1) IS NOT DISTINCT FROM array_length(skills, 1) AND coalesce(array_length(skills, 1), 0) <= 6);

CREATE INDEX collaborator_requests_created_at_idx ON public.collaborator_requests (created_at DESC);