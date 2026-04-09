# ⏳ Evergreen Countdown

A premium, automated, and truly dynamic countdown system for your GitHub profile and web pages.

<div align="center">
  <img src="https://evergreen-countdown.vercel.app/api/countdown" alt="Live Countdown" />
  <br />
  <p><i>Real-time dynamic SVG powered by Vercel Serverless Functions.</i></p>
</div>

---

## 🌟 Features

- **Truly Dynamic**: Uses Vercel Serverless Functions to serve a "Live" SVG that updates accurately to the second upon refresh.
- **Premium Web App**: A bespoke, glassmorphic full-page countdown hosted on **GitHub Pages**.
- **Zero Commit Clutter**: No more automated robot commits filling up your Git history.
- **Next-Year Rollover**: Automatically targets the next January 1st if no target is specified.

---

## 🚀 Quick Setup

### 1. Profile README Integration
Add the following to your main profile README:

```markdown
![Live Countdown](https://evergreen-countdown.vercel.app/api/countdown)
```

### 2. Web Countdown (GitHub Pages)
1. Enable **GitHub Pages** in your repository settings.
2. Visit `https://your-username.github.io/Evergreen-Countdown/` to see the full-page bespoke experience.

### 3. Deploying to Vercel
To host your own live API endpoint:
1. Fork this repository.
2. Connect your repository to [Vercel](https://vercel.com/).
3. Vercel will automatically detect the `vercel.json` and `api/` directory.
4. Deploy and replace the URL in your README with your new Vercel deployment URL.

---

## 🛠️ Personalizing Your Date

To change the countdown target, you can pass parameters to the Vercel URL:

`https://evergreen-countdown.vercel.app/api/countdown?year=2030&label=Vision+2030`

- `year`: The target year.
- `label`: Supporting text shown in the header.

---

## 💻 Tech Stack

- **Frontend**: Vanilla JS, HTML, CSS (Inter & JetBrains Mono fonts).
- **Backend**: Node.js Serverless Function (Vercel).
- **Automation**: GitHub Actions (for repository sync).

---

## 📝 Note on GitHub Pages
Your **GitHub Pages** site will work perfectly alongside the Vercel dynamic SVG. 
- **GitHub Pages** serves the static web files (`index.html`, `style.css`).
- **Vercel** serves the live API endpoint for the image.
