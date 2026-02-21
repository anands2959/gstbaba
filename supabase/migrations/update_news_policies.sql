
-- Drop existing policies to be sure
DROP POLICY IF EXISTS "Anyone can read news" ON public.gst_news;
DROP POLICY IF EXISTS "Anyone can insert news" ON public.gst_news;
DROP POLICY IF EXISTS "Anyone can update news" ON public.gst_news;
DROP POLICY IF EXISTS "Anyone can delete news" ON public.gst_news;

-- Re-create permissive policies for ALL operations
CREATE POLICY "Anyone can read news" ON public.gst_news FOR SELECT USING (true);
CREATE POLICY "Anyone can insert news" ON public.gst_news FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update news" ON public.gst_news FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete news" ON public.gst_news FOR DELETE USING (true);

-- Same for fetch log
DROP POLICY IF EXISTS "Admin can read fetch log" ON public.news_fetch_log;
DROP POLICY IF EXISTS "Anyone can insert fetch log" ON public.news_fetch_log;

CREATE POLICY "Admin can read fetch log" ON public.news_fetch_log FOR SELECT USING (true);
CREATE POLICY "Anyone can insert fetch log" ON public.news_fetch_log FOR INSERT WITH CHECK (true);
