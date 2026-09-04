# Guía de configuración de entorno — Lebron (Backend)

Tu entorno es igual al de Andrés, porque van a trabajar juntos en el backend. La diferencia es que él ya va a tener el proyecto Django creado — tú te conectas a ese mismo repositorio.

---

## 1. Instalar Git

1. Descarga Git desde https://git-scm.com/downloads e instálalo con opciones por defecto.
2. Abre "Git Bash" y configura tu identidad:
   ```
   git config --global user.name "Lebron De La Rosa Castro"
   git config --global user.email "tu_correo@ejemplo.com"
   ```
3. **Verificación**: `git --version` debe mostrar un número de versión.

---

## 2. Cuenta de GitHub

1. Crea tu cuenta en https://github.com si no tienes.
2. Pásale tu usuario a Andrés para que te agregue como colaborador del repositorio `sgde`.
3. Cuando te llegue la invitación por correo, acéptala.

---

## 3. Instalar Visual Studio Code

1. Descárgalo de https://code.visualstudio.com/.
2. Instala las extensiones: **Python** (Microsoft) y **Django** (Baptiste Darthenay).

---

## 4. Instalar Python

1. Descarga desde https://www.python.org/downloads/ (3.11 o superior).
2. Marca **"Add python.exe to PATH"** en el instalador.
3. **Verificación**: `python --version`.

---

## 5. Instalar cliente de PostgreSQL

1. Instala pgAdmin desde https://www.pgadmin.org/download/pgadmin-4-windows/.
2. Pídele a Felipe los datos de conexión a `sgde_db` y regístralos en pgAdmin.

---

## 6. Clonar el proyecto y preparar tu entorno

Una vez Andrés te comparta la URL del repositorio:

```bash
git clone <URL-del-repositorio>
cd sgde/backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
```

(Si Andrés no ha subido un `requirements.txt` todavía, instala manualmente:)
```bash
pip install django djangorestframework psycopg2-binary python-dotenv django-cors-headers djangorestframework-simplejwt
```

Pídele a Andrés el archivo `.env` con las variables de conexión (o los valores para armarlo tú mismo) — **no se sube a GitHub**, te lo debe pasar por chat.

**Verificación**: corre `python manage.py runserver`. Debe abrir en `http://127.0.0.1:8000/` sin errores.

---

## 7. Instalar Postman (para probar la API)

1. Descárgalo de https://www.postman.com/downloads/ e instálalo.

---

## 8. Tu tarea principal en esta fase

Cuando arranque el Sprint 1, tu trabajo va a ser construir el endpoint de clientes (`GET`/`POST /api/clientes/`) usando el modelo que arme Felipe. Por ahora, con el entorno funcionando y el proyecto corriendo en tu máquina, ya estás listo.

---

## 9. Checklist final

- [ ] Git instalado y configurado
- [ ] Cuenta de GitHub creada y aceptaste la invitación al repo `sgde`
- [ ] VS Code instalado con extensiones de Python/Django
- [ ] Python instalado
- [ ] pgAdmin instalado y conectado a la base de Felipe
- [ ] Repositorio clonado en tu máquina
- [ ] Entorno virtual (`venv`) activado e instalados los paquetes
- [ ] `python manage.py runserver` corre sin errores
- [ ] Postman instalado

Avísale al equipo cuando lo tengas todo listo.
