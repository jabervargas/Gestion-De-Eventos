# Guía de configuración de entorno — Felipe (Base de Datos)

Esta guía te deja listo para trabajar en la base de datos del proyecto (PostgreSQL + modelos de Django). Sigue los pasos **en orden**, no te saltes ninguno. Cada paso trae cómo verificar que quedó bien.

No te preocupes si nunca has usado nada de esto — está escrito para que lo puedas seguir sin experiencia previa. Si algo falla, copia el mensaje de error tal cual y pregúntale a Andrés o a Clara antes de intentar "arreglarlo" a ciegas.

---

## 1. Instalar Git

Git es la herramienta que usamos para compartir el código entre todos sin pisarnos el trabajo.

1. Entra a https://git-scm.com/downloads y descarga la versión para Windows.
2. Instálalo dejando todas las opciones por defecto (dale "Next" a todo).
3. Abre el programa **"Git Bash"** (búscalo en el menú de inicio de Windows).
4. En la ventana negra que se abre, escribe esto y presiona Enter (cambia el nombre y el correo por los tuyos):
   ```
   git config --global user.name "Felipe Bernal"
   git config --global user.email "tu_correo@ejemplo.com"
   ```
5. **Verificación**: escribe `git --version`. Si te muestra un número de versión (ej. `git version 2.45.0`), quedó bien instalado.

---

## 2. Crear cuenta en GitHub (si no tienes)

1. Entra a https://github.com y crea una cuenta gratuita si no tienes.
2. Avísale a Andrés o Clara tu usuario para que te agreguen al repositorio del equipo.

---

## 3. Instalar Visual Studio Code (el editor de código)

1. Descárgalo de https://code.visualstudio.com/ (botón grande de descarga).
2. Instálalo con las opciones por defecto.
3. Ábrelo. Ve al ícono de los cuadraditos en la barra izquierda (Extensiones) y busca e instala:
   - **Python** (de Microsoft)
   - **SQLTools** (para ver la base de datos desde el editor)

---

## 4. Instalar Python

1. Entra a https://www.python.org/downloads/ y descarga la versión más reciente (3.11 o superior).
2. **Muy importante**: en la primera pantalla del instalador, marca la casilla que dice **"Add python.exe to PATH"** antes de darle a "Install Now". Si no la marcas, tendrás que reinstalar.
3. **Verificación**: abre "Git Bash" (o el símbolo del sistema/PowerShell) y escribe `python --version`. Debe mostrarte algo como `Python 3.12.x`.

---

## 5. Instalar PostgreSQL (la base de datos)

1. Entra a https://www.postgresql.org/download/windows/ y descarga el instalador.
2. Ejecútalo. Durante la instalación te va a pedir:
   - Una **contraseña para el usuario `postgres`** — elige una fácil de recordar (ej. `sgde2026`) y **anótala en algún lado**, la vas a necesitar todo el proyecto.
   - Puerto: deja el que viene por defecto, **5432**.
   - Al final te preguntará si quieres abrir "Stack Builder" — puedes decir que no.
3. **Verificación**: busca en el menú de inicio "pgAdmin 4" y ábrelo (se instala junto con Postgres). Te va a pedir la contraseña maestra de pgAdmin (invéntala) y luego la contraseña de `postgres` que pusiste en el paso anterior. Si logras entrar y ves un árbol de "Servers" a la izquierda, quedó instalado correctamente.

### 5.1 Crear la base de datos del proyecto

1. Dentro de pgAdmin, en el árbol de la izquierda: click derecho sobre "Databases" → "Create" → "Database".
2. Nómbrala `sgde_db` y dale "Save".
3. **Verificación**: debe aparecer `sgde_db` en la lista de bases de datos.

---

## 6. Preparar el entorno de Python del proyecto

Estos comandos van en Git Bash, dentro de la carpeta del proyecto (una vez Andrés comparta el repositorio y tú lo clones):

```bash
git clone <URL-del-repositorio-que-te-pase-Andrés>
cd sgde/backend
python -m venv venv
source venv/Scripts/activate      # en Windows con Git Bash
pip install django djangorestframework psycopg2-binary python-dotenv
```

**Verificación**: si al activar el entorno ves `(venv)` al inicio de la línea en la terminal, está funcionando.

---

## 7. Tu tarea principal en esta fase: los modelos

Una vez el entorno esté listo (y Andrés ya haya creado la base del proyecto Django), tu trabajo es crear los **modelos** (las tablas, pero escritas como código Python) para: `Usuario`, `Cliente`, `Empresa`, `Ciudad`. Esto lo vas a hacer junto con Andrés cuando arranque el Sprint 1 — por ahora solo necesitas tener el entorno listo.

Trabajarás de la mano con **Clara**, quien te va a ayudar a revisar que los campos coincidan con lo que pidió el cliente y a cargar los datos de ciudades.

---

## 8. Checklist final — marca cuando lo tengas listo

- [ ] Git instalado y configurado con tu nombre y correo
- [ ] Cuenta de GitHub creada y agregada al repo del equipo
- [ ] VS Code instalado con extensión de Python
- [ ] Python instalado (`python --version` funciona)
- [ ] PostgreSQL instalado, con la contraseña anotada en un lugar seguro
- [ ] Base de datos `sgde_db` creada en pgAdmin
- [ ] Sabes activar el entorno virtual de Python (`venv`)

Cuando tengas todo marcado, avísale al equipo — con eso empezamos el Sprint 1.
