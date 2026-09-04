# Guía de configuración de entorno — Andrés (Backend + Coordinación)

Tu entorno es el más completo del equipo porque vas a levantar el proyecto base de Django y también vas a coordinar el tablero de Jira. Tómate tu tiempo con cada paso — una vez esté listo tu entorno, sirve de referencia para Lebron.

---

## 1. Instalar Git

1. Descarga Git desde https://git-scm.com/downloads e instálalo con las opciones por defecto.
2. Abre "Git Bash" y configura tu identidad:
   ```
   git config --global user.name "Andres Camilo Florez Bustamante"
   git config --global user.email "tu_correo@ejemplo.com"
   ```
3. **Verificación**: `git --version` debe mostrar un número de versión.

---

## 2. Crear el repositorio del equipo en GitHub

Como tú vas a coordinar, este paso te toca a ti:

1. Crea una cuenta en https://github.com si no tienes.
2. Crea un repositorio nuevo, público o privado, llamado `sgde` (Sistema de Gestión de Eventos).
3. Dentro, crea la estructura de carpetas de la guía técnica: `backend/`, `frontend/`, `database/`, `docs/`.
4. Invita a los demás como colaboradores: Settings → Collaborators → agrega a Felipe, Clara, Lebron, Javier y Brian (con su usuario de GitHub, pídeselos por chat).

---

## 3. Instalar Visual Studio Code

1. Descárgalo de https://code.visualstudio.com/ e instálalo con las opciones por defecto.
2. Instala las extensiones: **Python** (Microsoft), **Django** (Baptiste Darthenay), **GitLens** (para ver el historial de cambios más claro).

---

## 4. Instalar Python

1. Descarga desde https://www.python.org/downloads/ (versión 3.11 o superior).
2. Marca **"Add python.exe to PATH"** antes de instalar.
3. **Verificación**: `python --version` en la terminal.

---

## 5. Instalar cliente de PostgreSQL

No necesitas instalar el servidor (lo hace Felipe), pero sí el cliente para conectarte:

1. Instala pgAdmin desde https://www.pgadmin.org/download/pgadmin-4-windows/.
2. Pídele a Felipe los datos de conexión a `sgde_db` (host, puerto, usuario, contraseña) y regístralos en pgAdmin (click derecho en "Servers" → "Register" → "Server").

---

## 6. Crear el proyecto Django

Una vez tengas el repo clonado (`git clone <URL>`):

```bash
cd sgde/backend
python -m venv venv
source venv/Scripts/activate
pip install django djangorestframework psycopg2-binary python-dotenv django-cors-headers djangorestframework-simplejwt
django-admin startproject config .
```

Crea un archivo `.env` (en `backend/`, y agrégalo a un archivo `.gitignore` para que **nunca** se suba a GitHub) con:
```
DB_NAME=sgde_db
DB_USER=postgres
DB_PASSWORD=<la que definió Felipe>
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=<inventa una cadena larga y aleatoria>
```

**Verificación**: corre `python manage.py runserver`. Si ves un mensaje que dice que el servidor está corriendo en `http://127.0.0.1:8000/`, funcionó. Ábrelo en el navegador — deberías ver la página de bienvenida de Django (un cohete).

---

## 7. Instalar Postman (para probar la API)

1. Descárgalo de https://www.postman.com/downloads/.
2. Instálalo. No necesitas crear cuenta para usarlo local, aunque te la puede pedir — puedes usarla gratis.

---

## 8. Configurar Jira (tu parte de coordinación)

Ya tienen el proyecto `SGDE` creado en Jira con el backlog completo. Tu trabajo cuando arranque el sprint será:

1. Familiarizarte con el tablero: Backlog (donde están las historias) y Board (donde se mueven de "To Do" a "Done").
2. Cuando definamos empezar el Sprint 1, crear el sprint desde el Backlog y mover ahí las tareas correspondientes.
3. Invitar a los 5 compañeros a Jira si aún no tienen acceso (Configuración → Gestión de usuarios).

---

## 9. Checklist final

- [ ] Git instalado y configurado
- [ ] Repositorio `sgde` creado en GitHub con las 4 carpetas base
- [ ] Los 5 compañeros invitados como colaboradores en GitHub
- [ ] VS Code instalado con extensiones de Python/Django/GitLens
- [ ] Python instalado
- [ ] pgAdmin instalado y conectado a la base de Felipe
- [ ] Proyecto Django creado y corriendo (`python manage.py runserver` funciona)
- [ ] Archivo `.env` creado y agregado a `.gitignore`
- [ ] Postman instalado
- [ ] Los 5 compañeros con acceso a Jira

Cuando tengas todo esto, tu entorno queda como referencia para que Lebron levante el suyo igual — con eso arrancamos el Sprint 1.
