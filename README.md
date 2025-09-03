# The Plant — Crop Yield Prediction

An AI-first web application for agriculture. The project highlights a machine learning model that predicts crop yield based on climate and agronomic signals, presented through a modern, responsive UI with authentication, dashboard, history, and profile management.

## Features
- Modern landing page with services and testimonials
- Authentication (Sign up / Sign in) using Firebase Auth
- User profile: name, avatar upload, password update
- Dashboard with welcome card and last history section
- Prediction page (UI) for crop yield
- Contact form integration (Web3Forms)
- Responsive UI with accessible design

### Machine Learning
- Production-focused ML: A trained model for crop yield prediction with high accuracy.
- Feature signals (examples):
  - Weather and climate: temperature, rainfall/precipitation, humidity, seasonality
  - Agronomy and inputs: pesticide/fertilizer usage, planting/harvest cycles
  - Geography and context: country/region, crop type, soil proxies
- Integration: The web UI integrates with the ML service (API or embedded runtime) to serve real‑time/near real‑time predictions.
- Notes: Include data normalization, feature engineering, and model evaluation (e.g., train/validation split, cross‑validation).

## Tech Stack
- HTML, CSS, JavaScript (no framework)
- Firebase (Auth, Firestore, Storage)
- SweetAlert, Ionicons
- Deployed via GitHub Pages (recommended)

## Project Structure
```
src/
  index.html
  pages/
  css/
  js/
  img/
```

Key files:
- `pages/sign-up.html` + `js/sign-up/auth.js`: signup, validation, Firebase write
- `pages/dashbourd.html` + `js/display_info.js`: dashboard, user info and avatar fallback
- `js/my info/myinfo.js`: profile + update password/name/avatar

## Run Locally
Requirements: Python 3 (for a simple static server) or any static server.

Using Python:
```
cd src
python -m http.server 8000
```
Open: `http://localhost:8000`

Alternatively, use any static server (e.g., VS Code Live Server, `npx serve`).

## Firebase Configuration
The app uses Firebase Auth, Firestore, and Storage via CDN modules in the browser.
- Update Firebase config in:
  - `js/sign-up/auth.js`
  - `js/my info/myinfo.js`
  - `js/display_info.js`

Security notes:
- Do not store plain text passwords in Firestore. Currently the code persists `password` in the `users` document — remove that field for production.
- Restrict Firebase Security Rules appropriately.

## Validation & UX Notes
- Strong password policy (lowercase, uppercase, digit, special char, min length)
- Disallow using email (or its local-part) as password
- Require acceptance of Privacy Policy & Terms to sign up
- Friendly error styling with white background and subtle accent border
- Avatar fallback image if user image is missing or fails to load

## Data & Assumptions (AI Context)
- Inputs emphasize climate/weather factors as primary drivers of yield variability.
- Historical yield data informs baseline trends; current season weather refines short‑term predictions.
- Data quality matters: missing values are handled via imputation; outliers are treated cautiously.
- Limitations: Micro‑climate effects, soil heterogeneity, and management practices may not be fully captured without richer local data.

## Deploy (GitHub Pages)
This is a static site. The simplest way is GitHub Pages:
1) Push `src/` contents to the repository
2) In GitHub → Settings → Pages
3) Build and deployment → Source: Deploy from a branch
4) Branch: `main` — Folder: `/src`
5) Save. Your site will be available at the GitHub Pages URL

Tip: If you prefer root, move files from `src/` to repo root and set Folder: `/root`.

## Contributing
Issues and PRs are welcome. Please use clear commit messages and follow the existing code style.

## License
This project is for educational purposes. Add a license file if you plan to open-source formally.