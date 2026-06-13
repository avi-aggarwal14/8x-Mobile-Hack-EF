# Google Calendar API — setup guide (Goose)

What you picked: **read + write events** (`calendar.events`), **client-side in the browser** (no backend, no secret), and — as of **June 13** — **Published to Production so anyone can connect** (with an "unverified app" warning; see **Part F**). The **Connect Google Calendar** button is now live on the **landing page and the app's start screen** — not just `calendar.html`.

Two columns of work:

| You do (Google Cloud Console — needs your Google login) | I do (code) |
|---|---|
| A. Create a project + enable the Calendar API | ✅ Built `config.js`, `gcal.js`, `calendar.html` |
| B. Configure the consent screen (Testing + test users) | ✅ Wired the connect button + read/write test |
| C. Create an **OAuth Client ID** (Web app) | ⏳ I paste your Client ID + deploy |
| D. Send me the Client ID | ⏳ You verify on the live page |

> ⏱️ ~10 minutes. You only ever copy **one value** out of Google: the **Client ID** (it's public — safe to share/commit; there is **no client secret** in this flow).

---

## Part A — Project + enable the API

1. Go to **https://console.cloud.google.com** and sign in with the Google account that will own this (e.g. avi.aggarwal2011@gmail.com).
2. Top bar → **project dropdown** → **New Project**. Name it **`Goose`** → **Create**. Wait a few seconds, then make sure that project is selected in the top bar.
3. Left menu (☰) → **APIs & Services → Library**.
4. Search **`Google Calendar API`** → click it → **Enable**. (If it's slow to take effect, give it ~1 minute.)

---

## Part B — Consent screen (who's allowed + what they grant)

> Google recently renamed this area to **"Google Auth Platform"**. Menu: ☰ → **APIs & Services → OAuth consent screen** (it may forward you to *Google Auth Platform → Overview*). If it asks you to "Get started", do that first.

1. **User type / Audience:** choose **External** (it's the only option on a personal account). 
2. **Branding / App info:**
   - **App name:** `Goose`
   - **User support email:** your email
   - **Developer contact email:** your email
   - (Logo/links optional — skip for now.) Save.
3. **Audience → Publishing status:** to let **everyone** connect, **Publish to Production** — see **Part F** below. (Fine to stay on Testing while you set up, but production is required for anyone who isn't on your test-user list.)
4. **Test users:** click **+ Add users** and add **every Google account that will connect a calendar today** — your own, plus any teammates/testers (up to 100). 
   > ⚠️ In Testing mode, **only these emails can connect.** Anyone not on the list gets blocked. Add yourself first.
5. **Data access / Scopes** (optional but tidy): **Add or remove scopes** → **Manually add** this scope, then Update:
   ```
   https://www.googleapis.com/auth/calendar.events
   ```
   (Even if you skip this, the app still requests the scope at sign-in time — adding it here just makes the consent screen list it explicitly.)

---

## Part C — Create the OAuth Client ID

1. ☰ → **APIs & Services → Credentials**.
2. **+ Create credentials → OAuth client ID**.
3. **Application type: `Web application`**.
4. **Name:** `Goose web`.
5. **Authorized JavaScript origins** → **+ Add URI** for each of these (origin only — no path, no trailing slash):
   ```
   https://goose-lockin.vercel.app
   http://localhost:3000
   ```
   - The first is your **live public site** (`goose-lockin.vercel.app` — where testers will use it). ⚠️ Use this, **not** `goose-8x.vercel.app` (that alias has Vercel login protection and returns 401). If you ever turn that protection off, add `https://goose-8x.vercel.app` here too.
   - The second is for local testing (see "Testing locally" below). Add the exact port you use.
6. **Authorized redirect URIs:** leave **blank**. (The browser/popup token flow uses JavaScript origins, not redirect URIs.)
7. **Create**. A dialog shows your **Client ID** (ends in `.apps.googleusercontent.com`). **Copy it.** Ignore the client secret — we don't use it.

---

## Part D — Give me the Client ID (the only handoff)

Paste the Client ID back to me and I'll drop it into `config.js`, commit, and redeploy. (Or do it yourself: open `config.js`, replace the `PASTE_YOUR_CLIENT_ID_HERE...` string, save, and redeploy.)

It looks like:
```
1234567890-abc123def456ghi789.apps.googleusercontent.com
```

---

## Part E — Verify it works

1. Open **https://goose-lockin.vercel.app/calendar.html** on your phone or laptop.
2. Tap **🔗 Connect Google Calendar** → a Google popup appears.
3. Because the app is in Testing, you'll see **"Google hasn't verified this app"** → click **Advanced → Go to Goose (unsafe) → Continue**. (This is normal/expected for an unverified test app; only your test users can get past it.)
4. Grant the calendar permission.
5. You should see **status → Connected** and **today's events** listed. ✅ read works.
6. Tap **🦢 Drop a test event** → check your Google Calendar for a "Goose was here" event 10 min out. ✅ write works. (Delete it whenever.)

When both are green, tell me and I'll fold the connection into the real Goose flow.

---

## Part F — Publish to Production (let EVERYONE connect)

By default the app is in **Testing**, where only your added test users can connect. To open it to anyone:

1. ☰ → **APIs & Services → OAuth consent screen** (a.k.a. **Google Auth Platform → Audience**).
2. Under **Publishing status: Testing**, click **PUBLISH APP** → confirm **Push to production**.
3. Status now reads **In production**. ✅ Any Google user can connect — no test-user list needed.

**What users will see:** because `calendar.events` is a *sensitive* scope and we haven't done Google's full verification (it takes days), every user still gets a **"Google hasn't verified this app"** screen → **Advanced → Go to Goose (unsafe) → Continue**. That's expected and safe — Goose's connect buttons tell users to do exactly this. Removing the warning needs full verification (privacy policy + homepage + domain verification + Google review) — a later step, not for today.

> No code or Client ID change is needed to publish — it's purely the console toggle above.

---

## Testing locally (optional)

`file://` won't work — Google needs a real `http://localhost` origin. From the project folder:
```bash
npx serve -l 3000      # then open http://localhost:3000/calendar.html
```
Make sure `http://localhost:3000` is in your Authorized JavaScript origins (Part C, step 5).

---

## Troubleshooting (the usual suspects)

| Symptom | Fix |
|---|---|
| **`Error 400: redirect_uri_mismatch`** or **"origin is not allowed"** | The page's origin isn't in **Authorized JavaScript origins**. It must match exactly — `https` vs `http`, no trailing slash, correct port. Make sure you're on `https://goose-lockin.vercel.app/calendar.html`, not a long hashed Vercel **preview** URL or the protected `goose-8x.vercel.app`. |
| **"Google hasn't verified this app"** | Expected in Testing. **Advanced → Go to Goose (unsafe)**. If you *can't* get past it, the account isn't a **test user** — add it in Part B step 4. |
| **403 / `accessNotConfigured`** | Calendar API isn't enabled (Part A) — or you enabled it on a *different* project than the Client ID. Wait ~1 min after enabling. |
| **`Error 401: invalid_client`** | Wrong/typo'd Client ID in `config.js`, or it's from a different project. |
| **Popup never appears** | Browser blocked it — allow popups for the site and retry. |
| **"No Client ID set" warning on the page** | `config.js` still has the placeholder — do Part D. |

---

## Why this is safe to commit

In the **client-side** flow there is **no secret**. The Client ID is meant to be public (it ships in the browser). Access is gated by (1) the Authorized JavaScript origins you set, and (2) your Testing-mode test-user list. So `config.js` with the real Client ID is fine to push to the public repo.

> ✅ **Done June 13:** we **published to Production** (Part F) so the public can connect — users just click through the "unverified app" warning (full Google verification to remove it is a later step). Note: true *proactive* nagging while the app is closed still needs the **server-side** flow (refresh token + a tiny backend) — a later upgrade.
