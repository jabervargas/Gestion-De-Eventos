const API_BASE_URL = "/api";
const SESSION_KEY = "sgde_session";

async function authRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.detail || data.message || "La solicitud no pudo completarse.");
    }

    return data;
}

async function loginRequest(credentials) {
    return authRequest("/auth/login/", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

async function registerRequest(payload) {
    return authRequest("/auth/register/", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
        return null;
    }
}

function getStoredUser() {
    return getSession()?.user || null;
}

function isAuthenticated() {
    return Boolean(getSession()?.accessToken);
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}
