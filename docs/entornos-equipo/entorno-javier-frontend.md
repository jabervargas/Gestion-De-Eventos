# Guía de configuración de entorno — Javier (Frontend)

Vas a trabajar con React y JavaScript. Este entorno es distinto al de tus compañeros de backend — no necesitas Python ni PostgreSQL, sino Node.js.

---

## 1. Instalar Git

1. Descarga Git desde https://git-scm.com/downloads e instálalo con opciones por defecto.
2. Abre "Git Bash" y configura tu identidad:
   ```
   git config --global user.name "Javier Vargas"
   git config --global user.email "tu_correo@ejemplo.com"
   ```
3. **Verificación**: `git --version` debe mostrar un número de versión.

---

## 2. Cuenta de GitHub

1. Crea tu cuenta en https://github.com si no tienes.
2. Pásale tu usuario a Andrés para que te agregue al repositorio `sgde`.
3. Acepta la invitación cuando te llegue por correo.

---

## 3. Instalar Visual Studio Code

1. Descárgalo de https://code.visualstudio.com/.
2. Instala las extensiones:
   - **ES7+ React/Redux/React-Native snippets** (te da atajos para escribir componentes de React más rápido)
   - **Prettier - Code formatter** (ordena el código automáticamente)

---

## 4. Instalar Node.js

Node.js es lo que necesitas para correr y construir el proyecto de React.

1. Entra a https://nodejs.org/ y descarga la versión **LTS** (la que dice "Recommended for most users").
2. Instálala con las opciones por defecto.
3. **Verificación**: abre Git Bash y escribe:
   ```
   node --version
   npm --version
   ```
   Ambos comandos deben mostrarte un número de versión (ej. `v20.x.x` y `10.x.x`).

---

## 5. Clonar el repositorio y crear el proyecto de React

Una vez Andrés te comparta la URL del repositorio:

```bash
git clone <URL-del-repositorio>
cd sgde
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

**Verificación**: el último comando debe mostrarte una URL como `http://localhost:5173/`. Ábrela en el navegador — si ves una página con el logo de React y Vite dando vueltas, quedó funcionando.

---

## 6. Instalar la extensión de React para el navegador (opcional pero útil)

1. En Chrome, busca en la Chrome Web Store **"React Developer Tools"** e instálala.
2. Te va a servir para inspeccionar los componentes de React directamente en el navegador cuando algo no se vea como esperas.

---

## 7. Tu tarea principal en esta fase

Cuando arranque el Sprint 1, tu trabajo va a ser:
1. Armar la estructura de carpetas del proyecto (`src/api`, `src/components`, `src/pages`).
2. Construir la pantalla de login simple.
3. Armar el layout base (menú lateral con el link de "Clientes").
4. Conectar Axios para que la app pueda hablar con la API que están construyendo Andrés y Lebron.

Trabajarás muy de cerca con **Brian**, quien construirá la pantalla de clientes sobre la base que tú dejes lista.

---

## 8. Checklist final

- [ ] Git instalado y configurado
- [ ] Cuenta de GitHub creada y aceptaste la invitación al repo `sgde`
- [ ] VS Code instalado con extensiones de React y Prettier
- [ ] Node.js instalado (`node --version` y `npm --version` funcionan)
- [ ] Proyecto de React creado con Vite y corriendo (`npm run dev` abre la página)
- [ ] (Opcional) React Developer Tools instalado en el navegador

Avísale al equipo cuando lo tengas todo listo.
