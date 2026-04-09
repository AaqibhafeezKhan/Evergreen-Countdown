# ⬛ YOUR NAME

![Countdown](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/countdown.svg)

---

> Replace `YOUR_USERNAME` and `YOUR_REPO` above with your actual GitHub username and repository name.

---

## Setup Instructions

### 1 — Create the repository

This countdown lives in a **public** GitHub repository. It can be:

- Your profile README repo (`username/username`) — embeds directly on your GitHub profile page.
- Any public repo — link the raw SVG from any README.

### 2 — Add the files

Copy these three files into the repo root:

```
your-repo/
├── .github/
│   └── workflows/
│       └── update-countdown.yml
├── generate-countdown.js
└── README.md
```

### 3 — Push and let Actions run

On first push the workflow runs immediately.
After that it runs automatically every 5 minutes via cron.

GitHub Actions will:

1. Run `node generate-countdown.js`
2. Commit the new `countdown.svg` back to the repo
3. The raw SVG URL in your README reflects the latest version

### 4 — Customise

Open `.github/workflows/update-countdown.yml` and edit the `env` block:

```yaml
env:
  TARGET_YEAR: 2027
  TARGET_LABEL: "2027"
```

Alternatively, `generate-countdown.js` will automatically target Jan 1st of the next year if no environment variables are provided.

That's it. No npm install, no dependencies — pure Node.js built-ins only.

---

## How it works

```
GitHub Cron (*/5 * * * *)
        │
        ▼
  generate-countdown.js
        │
        ▼
  git commit countdown.svg
        │
        ▼
  README embeds raw SVG URL
```

The SVG is a static file served by GitHub's raw CDN.
It updates every 5 minutes.

---

## Notes

- GitHub sanitises `<script>` tags inside SVGs served via `raw.githubusercontent.com`, so client-side JS countdowns don't work in profile READMEs. The GitHub Actions approach is the correct workaround.
- The workflow uses `[skip ci]` in its commit message to avoid triggering itself recursively.
- Seconds shown in the SVG reflect the exact moment the Action ran.
