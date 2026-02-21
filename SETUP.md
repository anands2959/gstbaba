# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd gst-baba-website
npm install
```

## Step 2: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your website!

## Step 3: Build for Production

```bash
npm run build
npm start
```

## Common Issues

### Port Already in Use
If port 3000 is already in use, run:
```bash
npm run dev -- -p 3001
```

### Module Not Found
Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Customization Tips

1. **Change Colors**: Edit `tailwind.config.ts`
2. **Update Content**: Edit component files in `components/`
3. **Add Pages**: Create new files in `app/` directory
4. **Add Images**: Place in `public/` directory

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

All support Next.js out of the box!
