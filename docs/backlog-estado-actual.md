# Backlog SGDE — Estado actual (11 epics, 20 historias)

Organizado por **prioridad real de construcción**, no por número de Jira (los números reflejan el orden en que se crearon, no el orden en que se construyen).

---

## 🟢 Grupo 1 — Cimientos (Sprint 1, próxima entrega en 15 días)

Sin esto no se puede construir nada más. Es lo que se le muestra al profesor en el próximo checkpoint.

| Jira | Historia | Epic |
|---|---|---|
| SGDE-27 | Login con JWT | SGDE-24 Autenticación y roles |
| SGDE-28 | Registrar usuario con rol y hotel asignado | SGDE-24 Autenticación y roles |
| SGDE-29 | Registrar hotel | SGDE-25 Gestión de hoteles |

---

## 🔵 Grupo 2 — Clientes, empresas y salones (base del flujo comercial)

Ya con login y hotel funcionando, esto es lo siguiente: quién cotiza y dónde.

| Jira | Historia | Epic |
|---|---|---|
| SGDE-9 | Registrar cliente (natural o jurídica) | SGDE-1 Gestión de clientes y empresas |
| SGDE-10 | Consultar y buscar clientes registrados | SGDE-1 Gestión de clientes y empresas |
| SGDE-11 | Registrar y parametrizar empresas | SGDE-1 Gestión de clientes y empresas |
| SGDE-12 | Registrar salón (ahora amarrado a un hotel) | SGDE-2 Gestión de salones y montajes |
| SGDE-13 | Configurar tipos de montaje y aforo | SGDE-2 Gestión de salones y montajes |

---

## 🟡 Grupo 3 — El flujo simplificado que pidió el profesor (núcleo de la beta)

Esto es lo que el profesor definió como "el proceso sencillo": solicitar salón → bloquear → cotizar → aprobar/rechazar.

| Jira | Historia | Epic |
|---|---|---|
| SGDE-14 | Consultar disponibilidad en calendario | SGDE-3 Disponibilidad y bloqueo temporal |
| SGDE-15 | Bloquear temporalmente un salón *(actualizada: sin pasarela de pago para la beta)* | SGDE-3 Disponibilidad y bloqueo temporal |
| SGDE-16 | Registrar conceptos con precio e impuesto | SGDE-4 Catálogo de conceptos y precios |
| SGDE-17 | Editar precios de conceptos | SGDE-4 Catálogo de conceptos y precios |
| SGDE-18 | Generar cotización | SGDE-5 Cotizaciones |
| SGDE-19 | Definir vigencia de cotización | SGDE-5 Cotizaciones |

---

## 🟠 Grupo 4 — Proveedores y stock (nuevo, del 28/08)

Necesario para que la cotización tenga elementos reales que ofrecer (sillas, cristalería, etc.), no solo precios fijos.

| Jira | Historia | Epic |
|---|---|---|
| SGDE-30 | Proveedor actualiza su stock de elementos | SGDE-26 Gestión de proveedores y stock |
| SGDE-31 | Comparar precios entre proveedores y solicitar elementos | SGDE-26 Gestión de proveedores y stock |

---

## 🔴 Grupo 5 — Cierre del ciclo (aprobación, garantías, cancelación, histórico)

Lo que pasa después de que el cliente pide el evento: aprobar, confirmar, o cerrar el caso.

| Jira | Historia | Epic |
|---|---|---|
| SGDE-20 | Registrar aceptación y garantía | SGDE-6 Confirmación, garantías y aceptación |
| SGDE-21 | Confirmar evento | SGDE-6 Confirmación, garantías y aceptación |
| SGDE-22 | Registrar cancelación con penalización | SGDE-7 Cancelaciones y políticas |
| SGDE-23 | Consultar histórico de eventos | SGDE-8 Histórico de eventos |

---

## Mapa completo de epics (11)

| Epic | Qué cubre | Grupo |
|---|---|---|
| SGDE-1 | Clientes y empresas | 2 |
| SGDE-2 | Salones y montajes | 2 |
| SGDE-3 | Disponibilidad y bloqueo temporal | 3 |
| SGDE-4 | Catálogo de conceptos y precios | 3 |
| SGDE-5 | Cotizaciones | 3 |
| SGDE-6 | Confirmación, garantías y aceptación | 5 |
| SGDE-7 | Cancelaciones y políticas | 5 |
| SGDE-8 | Histórico de eventos | 5 |
| SGDE-24 | Autenticación y gestión de usuarios/roles *(nuevo)* | 1 |
| SGDE-25 | Gestión de hoteles (multi-tenant) *(nuevo)* | 1 |
| SGDE-26 | Gestión de proveedores y stock *(nuevo, RF-13)* | 4 |

---

## Lo que NO cambió

- El stack (React + Django + PostgreSQL), la estructura del repositorio y el flujo de ramas siguen igual — ver `guia-arranque-proyecto.md`.
- Los 6 roles del equipo y sus responsabilidades siguen igual — ver `contexto-proyecto-sgde.md`.

## Lo que sí cambió respecto a la primera versión del backlog

1. Se agregaron 3 epics y 5 historias nuevas (Grupo 1 y Grupo 4).
2. SGDE-15 (bloqueo temporal) se simplificó: sin pasarela de pago en la beta.
3. El Sprint 1 ya no arranca con "Cliente + Empresa" (Grupo 2) sino con "Login + Usuario + Hotel" (Grupo 1) — es lo que comprometieron con el profesor para la próxima entrega.
4. El modelo de dominio necesita 3 entidades nuevas: `Hotel`, `Proveedor`, `Stock/Elemento` (pendiente de actualizar el diagrama).
