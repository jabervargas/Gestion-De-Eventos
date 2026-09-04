# Guía de configuración de entorno — Clara (apoyo en Base de Datos)

Tu entorno va a ser más liviano que el de tus compañeros de backend, porque tu rol es apoyar a Felipe: revisar que los datos y modelos coincidan con lo que pidió el cliente, y cargar información de catálogos (como ciudades). Aun así necesitas poder ver y tocar la base de datos.

Sigue los pasos en orden. Si algo falla, copia el error tal cual y pregúntale a Felipe o Andrés.

---

## 1. Instalar Git

1. Entra a https://git-scm.com/downloads, descarga la versión para Windows e instálala dejando todo por defecto.
2. Abre "Git Bash" desde el menú de inicio y configura tu identidad:
   ```
   git config --global user.name "Clara Isabel Vitoria Gran"
   git config --global user.email "tu_correo@ejemplo.com"
   ```
3. **Verificación**: escribe `git --version`. Debe mostrarte un número de versión.

---

## 2. Crear cuenta en GitHub (si no tienes)

1. Crea tu cuenta gratuita en https://github.com.
2. Pásale tu usuario a Andrés para que te agregue al repositorio del equipo.

---

## 3. Instalar Visual Studio Code

1. Descárgalo de https://code.visualstudio.com/.
2. Instálalo con las opciones por defecto.
3. Abre la pestaña de Extensiones (ícono de cuadraditos a la izquierda) e instala:
   - **SQLTools** (te permite ver las tablas de la base de datos directamente desde el editor, sin abrir otro programa)

---

## 4. Instalar pgAdmin (para ver la base de datos)

No necesitas instalar el servidor completo de PostgreSQL (eso ya lo hace Felipe) — solo el programa para **consultar** los datos, ya que van a trabajar conectados a la misma base.

1. Entra a https://www.pgadmin.org/download/pgadmin-4-windows/ y descarga el instalador.
2. Instálalo con las opciones por defecto. Al abrirlo te pedirá crear una contraseña maestra — invéntala y guárdala.
3. Pídele a Felipe los datos de conexión a la base de datos compartida: host, puerto, usuario y contraseña.
4. Dentro de pgAdmin: click derecho en "Servers" → "Register" → "Server". En la pestaña "Connection" pon los datos que te dio Felipe.
5. **Verificación**: si al conectar ves la base `sgde_db` con sus tablas dentro, quedó todo bien.

---

## 5. Instalar Python (versión básica, para entender lo que hace Felipe)

No vas a programar mucho, pero te sirve para poder correr comandos junto a Felipe y entender qué está pasando.

1. Entra a https://www.python.org/downloads/ y descarga la versión más reciente.
2. En el instalador, marca la casilla **"Add python.exe to PATH"** antes de instalar.
3. **Verificación**: en Git Bash, escribe `python --version`. Debe mostrar algo como `Python 3.12.x`.

---

## 6. Tu tarea principal en esta fase

Cuando arranque el Sprint 1, tu trabajo junto a Felipe va a ser:

1. **Revisar los modelos** (`Cliente`, `Empresa`) contra el documento de requerimientos beta — que los campos que Felipe defina realmente cubran lo que pidió el cliente en la reunión (tipo natural/jurídica, observaciones internas, forma de pago, etc.).
2. **Cargar el catálogo inicial de ciudades** (Cartagena=CTG, Bogotá=BOG, Santa Marta=SMR, San Andrés=ADZ) una vez la tabla exista — Felipe te va a indicar cómo, es simple.

Por ahora, con el entorno instalado ya estás lista para cuando arranque el sprint.

---

## 7. Checklist final

- [ ] Git instalado y configurado
- [ ] Cuenta de GitHub creada y agregada al repo
- [ ] VS Code instalado con extensión SQLTools
- [ ] pgAdmin instalado y conectado a la base de datos compartida (con ayuda de Felipe)
- [ ] Python instalado (`python --version` funciona)

Avísale al equipo cuando lo tengas todo listo.
