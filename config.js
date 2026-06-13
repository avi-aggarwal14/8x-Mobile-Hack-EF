/* Goose public config — safe to commit & deploy.
 *
 * In the client-side (browser) Google flow, the OAuth **Client ID is PUBLIC by design**.
 * There is NO client secret here — nothing to hide. Paste your Client ID below.
 *
 * How to get it: see CALENDAR_SETUP.md → "Part B: create the OAuth Client ID".
 */
window.GOOSE_CONFIG = {
  // Looks like: "1234567890-abc123def456.apps.googleusercontent.com"
  GOOGLE_CLIENT_ID: "PASTE_YOUR_CLIENT_ID_HERE.apps.googleusercontent.com"
};
