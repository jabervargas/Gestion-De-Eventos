# Guía de configuración de entorno — Brian (Frontend)

Tu entorno es igual al de Javier, porque van a trabajar juntos en el frontend. La diferencia es que él va a dejar armada la base del proyecto (login, layout) y tú vas a construir la pantalla de clientes sobre esa base.

---

## 1. Instalar Git

1. Descarga Git desde https://git-scm.com/downloads e instálalo con opciones por defecto.
2. Abre "Git Bash" y configura tu identidad:
   ```
   git config --global user.name "Brian Federosa"
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
   - **ES7+ React/Redux/React-Native snippets**
   - **Prettier - Code formatter**

---

## 4. Instalar Node.js

1. Entra a https://nodejs.org/ y descarga la versión **LTS**.
2. Instálala con las opciones por defecto.
3. **Verificación**: en Git Bash:
   ```
   node --version
   npm --version
   ```
   Ambos deben mostrar un número de versión.

---

## 5. Clonar el repositorio y correr el proyecto

Cuando Javier ya haya creado el proyecto de React y lo suba al repositorio:

```bash
git clone <URL-del-repositorio>
cd sgde/frontend
npm install
npm run dev
```

**Verificación**: debe abrirte una URL como `http://localhost:5173/` y ver la app corriendo en el navegador.

Si Javier todavía no ha subido nada cuando tú ya tengas el entorno listo, no hay problema — puedes dejar este paso pendiente y avanzar con el resto de la guía; solo repite el `npm install` cuando el proyecto ya exista en el repositorio.

---

## 6. Instalar la extensión de React para el navegador (opcional pero útil)

1. En Chrome, busca **"React Developer Tools"** en la Chrome Web Store e instálala.
2. Te ayuda a inspeccionar componentes de React cuando algo no se comporte como esperas.

---

## 7. Tu tarea principal en esta fase

Cuando arranque el Sprint 1, tu trabajo va a ser, sobre la base que deje lista Javier:
1. Construir la página de lista de clientes (tabla que consuma el endpoint de la API).
2. Construir el formulario para crear un cliente nuevo.
3. Mostrar los mensajes de error si falta algún campo obligatorio.
4. Probar que el flujo completo funcione: crear un cliente desde la pantalla y verlo aparecer en la lista.

---

## 8. Checklist final

- [ ] Git instalado y configurado
- [ ] Cuenta de GitHub creada y aceptaste la invitación al repo `sgde`
- [ ] VS Code instalado con extensiones de React y Prettier
- [ ] Node.js instalado (`node --version` y `npm --version` funcionan)
- [ ] Sabes correr el proyecto con `npm run dev` (lo confirmarás cuando Javier suba su parte)
- [ ] (Opcional) React Developer Tools instalado en el navegador

Avísale al equipo cuando lo tengas todo listo.
