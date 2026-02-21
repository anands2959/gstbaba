-- Run this in your Supabase SQL Editor to promote a user to admin

-- Replace 'your_email@example.com' with the email of the user you want to promote
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'anand@gstbaba.in';

-- To check if it worked:
SELECT * FROM public.profiles WHERE role = 'admin';
