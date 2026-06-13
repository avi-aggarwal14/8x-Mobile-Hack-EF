/* Goose × Google Calendar — client-side connector (Google Identity Services token model).
 *
 * No backend, no client secret. Needs only a PUBLIC OAuth Client ID (see config.js).
 * Scope: calendar.events  → read AND write events on the user's calendars.
 *
 * Exposes window.GooseCal with:
 *   connect()        -> Promise<accessToken>   (pops Google consent the first time)
 *   listToday()      -> Promise<Event[]>       (today's events on the primary calendar)
 *   addTestEvent()   -> Promise<Event>         (creates a throwaway event 10 min from now — proves write)
 *   disconnect()     -> void                   (revokes the token)
 *   isConnected()    -> bool
 *   isConfigured()   -> bool   (is a real Client ID set?)
 *   isLibReady()     -> bool   (has Google's gsi/client script loaded?)
 */
(function () {
  "use strict";

  var SCOPE = "https://www.googleapis.com/auth/calendar.events";
  var API   = "https://www.googleapis.com/calendar/v3";

  var tokenClient = null;
  var accessToken = null;
  var tokenExpiry = 0;

  function clientId() {
    return (window.GOOSE_CONFIG && window.GOOSE_CONFIG.GOOGLE_CLIENT_ID) || "";
  }
  function libReady() {
    return typeof google !== "undefined" && google.accounts && !!google.accounts.oauth2;
  }
  function configured() {
    var id = clientId();
    return !!id && id.indexOf("PASTE") === -1 && /\.apps\.googleusercontent\.com$/.test(id);
  }
  function hasValidToken() {
    return !!accessToken && Date.now() < tokenExpiry - 60000; // 60s safety margin
  }

  function connect() {
    return new Promise(function (resolve, reject) {
      if (!configured()) {
        return reject(new Error("No Google Client ID set yet — paste yours into config.js (see CALENDAR_SETUP.md, Part B)."));
      }
      if (!libReady()) {
        return reject(new Error("Google sign-in library hasn't loaded yet. Check your connection / that the gsi/client script tag is present, then retry."));
      }
      try {
        if (!tokenClient) {
          tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: clientId(),
            scope: SCOPE,
            callback: function () {},        // replaced per-request below
            error_callback: function () {}   // replaced per-request below
          });
        }
        tokenClient.callback = function (resp) {
          if (resp && resp.error) {
            return reject(new Error(resp.error_description || resp.error));
          }
          accessToken = resp.access_token;
          tokenExpiry = Date.now() + ((resp.expires_in || 3600) * 1000);
          resolve(accessToken);
        };
        tokenClient.error_callback = function (err) {
          reject(new Error((err && (err.type || err.message)) || "Google sign-in was closed or blocked."));
        };
        // prompt: "consent" the first time so the user explicitly grants; "" afterwards to avoid re-asking.
        tokenClient.requestAccessToken({ prompt: accessToken ? "" : "consent" });
      } catch (e) {
        reject(e);
      }
    });
  }

  function ensureToken() {
    return hasValidToken() ? Promise.resolve(accessToken) : connect();
  }

  function apiFetch(path, opts) {
    opts = opts || {};
    return ensureToken().then(function (tok) {
      var headers = { "Authorization": "Bearer " + tok };
      if (opts.body) headers["Content-Type"] = "application/json";
      return fetch(API + path, {
        method: opts.method || "GET",
        headers: headers,
        body: opts.body || undefined
      });
    }).then(function (res) {
      if (res.status === 401) {
        accessToken = null;
        throw new Error("Calendar session expired (401). Tap Connect again.");
      }
      if (res.status === 403) {
        return res.json().catch(function () { return {}; }).then(function (j) {
          var msg = (j.error && j.error.message) || "Is the Google Calendar API enabled on the project, and was the calendar permission granted?";
          throw new Error("Calendar API refused (403): " + msg);
        });
      }
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error("Calendar API " + res.status + ": " + String(t).slice(0, 300));
        });
      }
      return res.status === 204 ? null : res.json();
    });
  }

  function listToday() {
    var start = new Date(); start.setHours(0, 0, 0, 0);
    var end   = new Date(); end.setHours(23, 59, 59, 999);
    var q = "?timeMin=" + encodeURIComponent(start.toISOString()) +
            "&timeMax=" + encodeURIComponent(end.toISOString()) +
            "&singleEvents=true&orderBy=startTime&maxResults=25";
    return apiFetch("/calendars/primary/events" + q).then(function (data) {
      return (data && data.items) || [];
    });
  }

  function addTestEvent() {
    var start = new Date(Date.now() + 10 * 60000);       // 10 min from now
    var end   = new Date(start.getTime() + 30 * 60000);  // 30 min long
    var body = JSON.stringify({
      summary: "🦢 Goose was here — write access works",
      description: "Test event created by Goose to confirm Calendar write access. Safe to delete.",
      start: { dateTime: start.toISOString() },
      end:   { dateTime: end.toISOString() }
    });
    return apiFetch("/calendars/primary/events", { method: "POST", body: body });
  }

  function disconnect() {
    if (accessToken && libReady()) {
      try { google.accounts.oauth2.revoke(accessToken, function () {}); } catch (e) {}
    }
    accessToken = null;
    tokenExpiry = 0;
  }

  window.GooseCal = {
    connect: connect,
    listToday: listToday,
    addTestEvent: addTestEvent,
    disconnect: disconnect,
    isConnected: hasValidToken,
    isConfigured: configured,
    isLibReady: libReady,
    scope: SCOPE
  };
})();
