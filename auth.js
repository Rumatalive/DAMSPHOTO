/* DAM client-side auth (demo-only) using localStorage */

const AUTH = {
  usersKey: "dam_users",
  sessionKey: "dam_session",
};

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH.usersKey) || "[]");
  } catch {
    return [];
  }
}

function setUsers(users) {
  localStorage.setItem(AUTH.usersKey, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH.sessionKey) || "null");
  } catch {
    return null;
  }
}

function setSession(email) {
  localStorage.setItem(AUTH.sessionKey, JSON.stringify({ email, at: Date.now() }));
}

function clearSession() {
  localStorage.removeItem(AUTH.sessionKey);
}

function currentUserEmail() {
  const s = getSession();
  return s && s.email ? String(s.email) : null;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', '"')
    .replaceAll("'", "&#039;");
}

function renderAuthUI() {
  const email = currentUserEmail();
  const statusEl = document.getElementById("auth-status");

  if (!statusEl) return;

  if (!email) {
    statusEl.innerHTML =
      'Not signed in. <a href="login.html" style="color: var(--accent); text-decoration:none;">Login</a>';
    return;
  }

  statusEl.innerHTML =
    'Signed in as <strong>' +
    escapeHtml(email) +
    '</strong>. <a href="signout.html" style="color: var(--accent); text-decoration:none;">Sign out</a>';
}

function initAuthPage() {
  // Setup nav visibility if developer added elements with these IDs
  const loginLink = document.getElementById("auth-login-link");
  const signupLink = document.getElementById("auth-signup-link");
  const signoutLink = document.getElementById("auth-signout-link");

  const email = currentUserEmail();

  if (email) {
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (signoutLink) signoutLink.style.display = "";
  } else {
    if (loginLink) loginLink.style.display = "";
    if (signupLink) signupLink.style.display = "";
    if (signoutLink) signoutLink.style.display = "none";
  }

  renderAuthUI();
}

window.DAM_AUTH = {
  getUsers,
  setUsers,
  getSession,
  setSession,
  clearSession,
  currentUserEmail,
  initAuthPage,
};

document.addEventListener("DOMContentLoaded", () => {
  // If page includes auth markup, initialize
  initAuthPage();
});

