if (!isAuthenticated()) {
    window.location.href = "login.html";
}

const user = getStoredUser() || { name: "Usuario", email: "", role: "cliente" };

function initialsOf(name) {
    return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

document.getElementById("userInitials").textContent = initialsOf(user.name || "US");
document.getElementById("userName").textContent = user.name || "Usuario";
document.getElementById("userRole").textContent = user.role || "cliente";

if (user.name) {
    const firstName = user.name.split(" ")[0];
    document.getElementById("welcomeTitle").textContent =
        `Bienvenido al Sistema de Gestión de Eventos y Salones, ${firstName}`;
}

const profileMenu = document.getElementById("profileMenu");
const profileTrigger = document.getElementById("profileTrigger");

profileTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle("is-open");
});

document.addEventListener("click", () => {
    profileMenu.classList.remove("is-open");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    clearSession();
    window.location.href = "login.html";
});
