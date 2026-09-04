# Contexto del Proyecto — Sistema de Gestión de Eventos (SGDE)

> Archivo de contexto compacto para continuar este trabajo en otro chat. Resume todo lo definido hasta ahora: negocio, backlog, stack, entorno y plan del Sprint 1.

---

## 1. El proyecto

Software de gestión de eventos y salones para el sector de congresos y convenciones de Cartagena (hoteles, centros de convenciones, casas de eventos tipo Casa 1537, Los Baluartes, etc.). Es un **proyecto académico** (Unicolombo) con un cliente real del sector (Roger Agresor, coordinador de eventos/turismo). Plazo objetivo: **beta funcional en ~4 meses**.

**Qué resuelve**: todo el ciclo comercial de un evento — desde la cotización hasta la confirmación, ejecución y cierre — de forma trazable. **No** incluye facturación (la hacen los sistemas propios de los hoteles) ni inscripción/acreditación de asistentes (lo cubren plataformas externas como Copievento).

Existe un documento de requerimientos completo levantado a partir de grabaciones de la reunión con el cliente (contexto, actores, RF, reglas de negocio, glosario) — fue el primer entregable de esta conversación. Después el equipo subió su propia versión formal: **`Requerimientos_Proyecto_Gestion_De_Eventos.docx`**, con requerimientos numerados **RF-01 a RF-12** y **RNF-01 a RNF-08**. Ese documento es la fuente oficial del alcance de la **beta** (se acordó explícitamente construir solo lo que está ahí, nada más, por ahora).

---

## 2. Equipo y roles

| Persona | Rol |
|---|---|
| Clara Isabel Vitoria Gran | Apoyo en base de datos (trabaja con Felipe: valida modelos contra requerimientos, carga catálogos). Deliberadamente con poca carga. |
| Felipe Bernal | Base de datos (modelos, migraciones) |
| Andrés Camilo Flores Bustamante | Backend + coordinación general (asumió el rol de coordinación que originalmente iba a ser de Clara) |
| Lebron De La Rosa Castro | Backend |
| Javier Vargas | Frontend |
| Brian Federosa | Frontend |

Son **desarrolladores junior, primera vez usando estas tecnologías** — toda instrucción técnica debe ser paso a paso, con comandos exactos y verificación de cada paso, sin dar por sentado conocimiento previo.

---

## 3. Stack tecnológico (decidido, no volver a proponer alternativas salvo que se pida)

- **Frontend**: React + JavaScript (Vite para crear el proyecto). Se evaluaron librerías extra (React Router, Axios, Tailwind, react-hook-form, react-big-calendar) pero el equipo decidió **quedarse solo con lo esencial/original** por ahora — no añadir librerías salvo necesidad puntual futura.
- **Backend**: Python — **Django + Django REST Framework** (se recomendó sobre FastAPI porque el proyecto es mayormente CRUD de catálogos con roles/trazabilidad, y Django trae ORM, migraciones, admin y auth de fábrica).
- **Base de datos**: **PostgreSQL**.
- **Autenticación**: JWT (`djangorestframework-simplejwt`).
- **Control de versiones**: Git + GitHub. Repo sugerido con carpetas `backend/`, `frontend/`, `database/`, `docs/` (monorepo). Ramas tipo `feature/SGDE-XX-nombre-corto` ligadas al número de issue de Jira.

---

## 4. Modelo de dominio (entidades acordadas)

`CIUDAD`, `EMPRESA`, `CLIENTE` (natural/jurídica), `USUARIO` (roles: ejecutivo/administrador/financiero), `SALON`, `MONTAJE`, `SALON_MONTAJE` (tabla intermedia con aforo por combinación salón+montaje), `CONCEPTO` (productos/servicios cotizables con precio e impuesto), `COTIZACION` (con estado: cotizado/bloqueado/confirmado/cancelado, bloqueo temporal, garantía, penalización), `COTIZACION_ITEM`.

Regla técnica clave ya definida: evitar sobreventa de salones con un **índice único parcial en Postgres** sobre `(salon_id, fecha_evento) WHERE estado='confirmado'`, no solo validación en backend.

El DDL de referencia completo y el diagrama ER están en el archivo `guia-arranque-proyecto.md` ya generado (ver sección 7).

---

## 5. Backlog en Jira (ya creado y funcionando)

- **Sitio**: `unicolombo-team-pepy5oek.atlassian.net` (cloudId `df0642e9-236f-43fb-ac8f-9534da1f913e`), conectado vía Atlassian Rovo.
- **Proyecto**: key **`SGDE`**, plantilla Scrum. (Cuidado: en este sitio "Proyectos" en la barra lateral lleva a Atlas/Home, que es otro producto — el proyecto real de Jira Software se crea/gestiona desde Configuración ⚙️ → "Espacio").
- **Tipos de issue disponibles**: Epic, Historia, Error, Tarea, Subtask.
- **8 Epics creados**: SGDE-1 Gestión de clientes y empresas · SGDE-2 Gestión de salones y montajes · SGDE-3 Disponibilidad y bloqueo temporal · SGDE-4 Catálogo de conceptos y precios · SGDE-5 Cotizaciones · SGDE-6 Confirmación, garantías y aceptación · SGDE-7 Cancelaciones y políticas · SGDE-8 Histórico de eventos.
- **15 Historias creadas** (SGDE-9 a SGDE-23), cada una con criterios de aceptación en la descripción y label del RF correspondiente (RF-01 a RF-12). Mapeo completo:
  - SGDE-9 Registrar cliente (RF-01) — bajo SGDE-1
  - SGDE-10 Consultar y buscar clientes (RF-01) — bajo SGDE-1
  - SGDE-11 Registrar y parametrizar empresas (RF-02) — bajo SGDE-1
  - SGDE-12 Registrar salón (RF-03) — bajo SGDE-2
  - SGDE-13 Configurar tipos de montaje (RF-04) — bajo SGDE-2
  - SGDE-14 Consultar disponibilidad en calendario (RF-05) — bajo SGDE-3
  - SGDE-15 Bloquear temporalmente un salón (RF-08) — bajo SGDE-3
  - SGDE-16 Registrar conceptos con precio e impuesto (RF-06) — bajo SGDE-4
  - SGDE-17 Editar precios de conceptos (RF-06) — bajo SGDE-4
  - SGDE-18 Generar cotización (RF-07) — bajo SGDE-5
  - SGDE-19 Definir vigencia de cotización (RF-07) — bajo SGDE-5
  - SGDE-20 Registrar aceptación y garantía (RF-09) — bajo SGDE-6
  - SGDE-21 Confirmar evento (RF-10) — bajo SGDE-6
  - SGDE-22 Registrar cancelación con penalización (RF-11) — bajo SGDE-7
  - SGDE-23 Consultar histórico de eventos (RF-12) — bajo SGDE-8
- Aún **no** se han creado subtareas granulares por persona dentro de Jira, ni se ha iniciado ningún Sprint — eso quedó pendiente hasta que el equipo termine de configurar su entorno local.

---

## 6. Roadmap general (4 sprints de 15 días, orden por dependencias)

1. **Sprint 1 — Cimientos**: usuarios/auth + clientes/empresas (SGDE-1)
2. **Sprint 2 — Catálogos**: salones/montajes (SGDE-2) + conceptos (SGDE-4)
3. **Sprint 3 — Núcleo del negocio**: cotizaciones (SGDE-5) + disponibilidad/bloqueo (SGDE-3) — mayor riesgo técnico
4. **Sprint 4 — Cierre del ciclo**: confirmación/garantías (SGDE-6), cancelaciones (SGDE-7), histórico (SGDE-8)

(Con 4 meses y sprints de 15 días hay 8 sprints en total — los 4 listados arriba son los "temas" principales, se pueden repartir en más sprints si hace falta más margen).

---

## 7. Archivos ya entregados en esta conversación

1. `documentacion-proyecto.md` — documentación de contexto y requerimientos extraída de las grabaciones de la reunión con el cliente.
2. `guia-arranque-proyecto.md` — guía técnica completa: justificación Django vs FastAPI, DDL de referencia de PostgreSQL, estructura de carpetas backend/frontend, tabla de endpoints mapeada a las HU de Jira, manejo del vencimiento de bloqueos (Celery o validación al leer), roadmap de sprints, flujo de Git, checklist de arranque.
3. Diagrama ER del modelo de dominio (widget visual, no archivo descargable).
4. `entorno-andres-backend-coord.md`, `entorno-felipe-basedatos.md`, `entorno-clara-apoyo-bd.md`, `entorno-lebron-backend.md`, `entorno-javier-frontend.md`, `entorno-brian-frontend.md` — guías individuales de configuración de entorno, paso a paso para junior devs (Git, GitHub, VS Code, Python/Node, PostgreSQL/pgAdmin, Django/Vite según el rol).

---

## 8. Plan del Sprint 1 (definido, pendiente de crear en Jira e iniciar)

**Alcance**: SGDE-9 (Registrar cliente) + SGDE-11 (Registrar empresas) — un cliente jurídico necesita una empresa, así que ambas historias van juntas para que el flujo cierre de extremo a extremo (React → Django → PostgreSQL).; SGDE-10 (buscar clientes) se deja para el Sprint 2 a propósito, para mantener el sprint corto.

**Tareas por persona**:

- **Felipe (DB)**: modelo `Ciudad` (codigo, nombre) → modelo `Empresa` (razon_social, identificacion, contacto, ciudad FK) → modelo `Cliente` (tipo, nombre, empresa FK opcional, forma_pago, observaciones_internas) → generar y correr migraciones.
- **Clara (apoyo DB)**: validar que el modelo `Cliente` cuadre con lo pedido en la reunión con el cliente; cargar ciudades semilla (CTG, BOG, SMR, ADZ) una vez exista la tabla.
- **Andrés (BE)**: login con JWT (usuario de prueba); endpoint `GET/POST /api/empresas/` (SGDE-11); probar con Postman.
- **Lebron (BE)**: endpoint `GET/POST /api/clientes/` (SGDE-9); validaciones (tipo y nombre obligatorios, empresa obligatoria si es jurídica); probar con Postman.
- **Javier (FE)**: pantalla de login (consume el login de Andrés, guarda el token); layout base con link a "Clientes"; conectar Axios (`api/client.js`).
- **Brian (FE)**: pantalla de lista de clientes (consume `GET /api/clientes/`); formulario de creación (con selector natural/jurídica y selector de empresa si aplica); probar el flujo completo end-to-end.

**Orden de dependencias**: Felipe primero (modelos, días 1–4) → Andrés y Lebron en paralelo (endpoints, días 3–9) → Javier y Brian (frontend, días 6–13, empiezan login/layout en paralelo con backend pero necesitan el endpoint probado para conectar el CRUD real) → últimos 2 días de integración y demo.

**Pendiente de decidir/ejecutar en el próximo chat**:
- Crear estas tareas como subtareas en Jira bajo SGDE-9 y SGDE-11.
- Armar (sin iniciar) el Sprint 1 en el tablero de Jira.
- Confirmar que los 6 integrantes terminaron su checklist de entorno antes de darle "Start sprint".
