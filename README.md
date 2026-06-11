# Wellnessify Website

Static marketing site for [Wellnessify](https://wellnessify.app), hosted on GitHub Pages.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** (or **master**) and folder **`/docs`**.
5. Save. Your site will be live at `https://<username>.github.io/<repo>/`.

For a custom domain (e.g. `wellnessify.app`):

1. Add a `CNAME` file in `docs/` containing your domain.
2. Configure DNS with your registrar (A/CNAME records per GitHub Pages docs).

## Local preview

```bash
cd docs
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Before launch

- Replace the App Store URL in `index.html` (`id0000000000` placeholder).
- Point App Store Connect privacy/terms URLs to `privacy.html` and `terms.html` (or your custom domain).

## Structure

```
docs/
├── index.html      Landing page
├── privacy.html    Privacy policy
├── terms.html      Terms of service
├── css/styles.css  Styles
├── js/main.js      Nav + scroll animations
└── assets/         App icons
```
