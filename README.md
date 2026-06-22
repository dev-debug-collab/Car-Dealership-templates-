# Lahore Motors — Car Dealership Website

A single-page React + Tailwind site for a Lahore-based used car dealership (Home, About, Inventory, Contact views).

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs static files to `dist/`, which you can deploy anywhere static (Vercel, Netlify, GitHub Pages).

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Lahore Motors site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Deploy

- **Vercel**: import the GitHub repo at vercel.com/new — it auto-detects Vite, no config needed.
- **Netlify**: import repo, build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then deploy the `dist/` folder using a tool like `gh-pages`, or GitHub Actions.

## Notes

- Car images are placeholder stock photos from Unsplash — replace with real inventory photos before launch.
- Prices, address, and team names are placeholders.
- Google Maps embed in the Contact page uses a generic Gulberg III query — replace with your exact address/place ID.
