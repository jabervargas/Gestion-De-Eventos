const form = document.getElementById("loginForm");
const alertBox = document.getElementById("authAlert");
const submitBtn = document.getElementById("loginSubmit");
const togglePasswordBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

function setFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = field.querySelector("[data-error-for]");
    if (message) {
        field.classList.add("has-error");
        errorEl.textContent = message;
    } else {
        field.classList.remove("has-error");
        errorEl.textContent = "";
    }
}

function hideAlert() {
    alertBox.classList.remove("is-visible");
    alertBox.textContent = "";
}

function showAlert(message) {
    alertBox.textContent = message;
    alertBox.classList.add("is-visible");
}

togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.textContent = isHidden ? "Ocultar" : "Ver";
});

document.getElementById("forgotPasswordBtn").addEventListener("click", () => {
    alert("Funcionalidad de recuperación pendiente de integrar.");
});

function validate() {
    let valid = true;
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    if (!email) {
        setFieldError("fieldEmail", "Ingresa tu usuario o correo.");
        valid = false;
    } else {
        setFieldError("fieldEmail", "");
    }

    if (!password) {
        setFieldError("fieldPassword", "Ingresa tu contraseña.");
        valid = false;
    } else {
        setFieldError("fieldPassword", "");
    }

    return valid;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert();
    if (!validate()) return;

    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    try {
        const { accessToken, refreshToken, user } = await loginRequest({ email, password });
        saveSession({ accessToken, refreshToken, user });
        window.location.href = "home.html";
    } catch (err) {
        showAlert(err.message || "No fue posible iniciar sesión.");
    } finally {
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;
    }
});

["email", "password"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
        setFieldError(id === "email" ? "fieldEmail" : "fieldPassword", "");
        hideAlert();
    });
});
