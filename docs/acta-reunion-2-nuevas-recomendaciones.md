# Acta de reunión — 28/08/2026 (Revisión de requerimientos y planeación)

**Contexto**: reunión de seguimiento con el profesor/asesor del proyecto de aula, para revisar los requerimientos funcionales levantados y definir el alcance real de la beta.

---

## 1. Decisiones sobre alcance

- Del listado original de ~30 requerimientos funcionales, el equipo ya había reducido a un conjunto más manejable. En esta reunión se confirma que quedan **13 RF** (los 12 ya documentados + 1 nuevo de proveedores).
- El profesor plantea una decisión de fondo para el equipo: **¿entregan solo la versión beta, o llevan el proyecto hasta la entrega de grado (Ingeniería)?** Ventaja mencionada de ir más allá de la beta: posibilidad de vinculación laboral en el sector (en la parte de sistemas, no turística) y eventual comercialización de la plataforma, con el equipo encargado del despliegue.
- **Recomendación explícita del profesor para la beta**: simplificar a un **proceso único, sencillo y monolítico** — no tratar de amarrar los 13 RF completos en 2–3 meses. Priorizar que el flujo principal funcione de punta a punta.

## 2. Nuevo requerimiento: gestión de proveedores (RF-13, nuevo)

- Se identifica que la cotización necesita apoyarse en un **stock real de elementos de montaje** (sillas, cristalería, cubiertos, etc.), no solo en precios fijos como se tenía planteado.
- Los elementos de montaje se consiguen a través de **proveedores externos**. Cada proveedor:
  - Sube/actualiza su propio stock disponible: elemento, cantidad, valor.
  - Puede tener relación con varios hoteles (no exclusivo de uno).
- El **administrador** actúa como comprador: compara precios entre proveedores para un mismo elemento y le hace la solicitud directamente al que ofrezca mejor precio (ej. "necesito 10 sillas").
- **Fuera de alcance para la beta** (aclarado en la reunión): la cotización formal del proveedor hacia el administrador, y la automatización de ese proceso de compra — por ahora es un stock consultable + contacto directo/manual.

## 3. Nueva entidad: Hotel (multi-tenant)

- Todo el sistema debe quedar **amarrado a un hotel**: salones, usuarios y operaciones pertenecen a un hotel específico.
- Un administrador puede gestionar **varios hoteles** dentro del sistema, pero un usuario tipo cliente/operativo debe quedar restringido a operar solo dentro de su hotel.
- Implica crear el CRUD de Hotel **antes** que el de Salón (el salón depende del hotel).

## 4. Roles y permisos (ajuste importante)

- **Para la beta, 3 roles**: **Cliente**, **Administrador**, **Proveedor**.
- A futuro (no en la beta) se plantea un **módulo de permisos flexible**: el administrador podría crear roles adicionales (ejemplo mencionado: "supervisor logístico") y asignarles permisos por función/pantalla, en vez de tener roles fijos en el código.
- Aclaración de responsabilidades por rol (visión cliente vs. visión administrativa, que antes no estaba clara):
  - **Cliente**: solicitud de salón, cancelación de la solicitud, solicitud de cotización, ejecución del evento (incluye la devolución/cierre del salón que apartó).
  - **Administrador**: recibe y aprueba/rechaza solicitudes, gestiona el bloqueo del salón, gestiona hoteles, usuarios y (a futuro) permisos.
  - **Proveedor**: sube y mantiene su stock de elementos disponibles.
- **Tarea pendiente para el equipo**: armar una matriz o "cruce de usuarios" — qué RF le corresponde a cada rol — como documentación a entregar.

## 5. Ajuste al bloqueo temporal (RF-08)

- Se confirma la definición: bloquear un salón evita que otra persona lo reserve para la misma fecha mientras hay una solicitud en curso.
- **Decisión sobre el abono/pago anticipado**: el profesor plantea dos caminos —
  1. Bloquear solo cuando se confirma un abono real (requeriría integrar una pasarela de pago y verificar que el dinero efectivamente entró).
  2. Bloquear el salón directamente, sin depender de una pasarela de pago, simulando o dejando de lado el abono por ahora.
- **Se decide la opción 2 para la beta**: bloquear el salón sin pasarela de pago. La verificación real de abonos/pagos y la liberación automática ligada a eso quedan para una versión futura.

## 6. Flujo simplificado priorizado para la beta

Proceso único a construir primero, de punta a punta:

1. Cliente hace una **solicitud de salón** (fecha, hotel).
2. El sistema valida disponibilidad: si el salón **ya está bloqueado/apartado** para esa fecha, no deja avanzar.
3. Si está disponible, el cliente **arma la cotización**: selecciona el montaje y los elementos que necesita (sillas, cristalería, etc., según el stock disponible vía proveedores).
4. El **administrador aprueba o rechaza** la solicitud.
5. Si se aprueba, el evento queda activo; al finalizar, el cliente puede **devolver/cerrar** el salón que apartó.
6. Se debe poder **descargar un documento** (tipo acta/checklist de acuerdo) que las partes puedan firmar como respaldo — mencionado explícitamente por el profesor.

Este es el hilo que debe quedar funcionando primero; el resto de RF (histórico, cancelaciones con penalización, catálogo completo de conceptos, etc.) se construye después sobre esta base.

## 7. Diccionario / glosario de términos

- El profesor recomienda mantener un **diccionario de términos** del proyecto para evitar ambigüedad entre el equipo, el cliente y el asesor (ej. qué es exactamente un "concepto" vs. un "montaje"). El glosario ya existente en la documentación de requerimientos debe mantenerse y ampliarse con los términos nuevos (Hotel, Proveedor, Stock, Solicitud).

## 8. Tecnología y arquitectura

- **Frontend**: se ratifica **React** (JavaScript). *(Nota: en la reunión se mencionó "Angular" como respuesta al profesor, pero el equipo confirmó después que la decisión real sigue siendo React.)*
- **Backend**: Python con Django, confirmado.
- Interés del profesor en que el salón se pueda visualizar con **planos, fotos, e idealmente un diagrama 3D con dimensiones**, incluyendo posible interacción tipo drag-and-drop para ubicar elementos — se menciona como algo alcanzable con componentes de Python, pero **no es prioridad de la beta**, es una mejora futura.
- **Pregunta técnica abierta** (a resolver con apoyo de "John", el asesor técnico mencionado, no responsable de construir el software pero sí de acompañar decisiones de arquitectura): ¿cómo manejar el almacenamiento de archivos (fotos, planos, PDF) asociados a un salón? Se sugiere explorar el uso de un **campo JSON/JSONB en PostgreSQL** para guardar información estructurada de forma flexible en vez de crear muchas tablas rígidas.
- Se descarta desarrollo móvil para la beta: el equipo no tiene la tecnología aprendida todavía. Se sugiere dejarlo para una fase posterior, posiblemente como 2-3 módulos pequeños migrados a móvil una vez esté listo el proceso web.

## 9. Plan de trabajo y siguiente entrega

- **Cadencia confirmada**: reuniones/planning cada 15 días con el profesor (coincide con la cadencia de sprint ya definida por el equipo).
- **Próxima entrega en 15 días**: **Login + creación de Hotel + creación de Usuario**. Se sugiere simular primero en HTML/Figma antes de conectar el backend real, para mostrar avance rápido y validar la expectativa del cliente/profesor.
- **Orden de construcción sugerido por el profesor**:
  1. Diseñar y estructurar bien la **base de datos** primero (entidades, relaciones).
  2. Definir las **entidades** en un diagrama (asignar 2–3 personas a esto).
  3. En paralelo, 2–3 personas trabajan el **diagrama de proceso** (el flujo simplificado de la sección 6).
  4. Construir los **CRUDs base** primero (Usuario, luego Hotel/Empresa) — sirven de plantilla reutilizable para los demás CRUDs (mismo patrón, distintas entidades/variables).
  5. Backend: empezar por un servicio completo (ej. login) antes de expandir a los demás.
  6. Frontend puede avanzar en paralelo una vez la base de datos esté estable, y se conecta a los servicios cuando estén listos.
- El profesor no impone decisiones visuales (colores, diseño de interfaz) — quedan a criterio del equipo.

## 10. Pendientes que salen de esta reunión

- [ ] Definir el nuevo RF-13 (gestión de proveedores/stock) con el mismo formato que los RF-01 a RF-12 existentes.
- [ ] Agregar la entidad **Hotel** al modelo de dominio (y su relación con Salón, Usuario).
- [ ] Agregar la entidad **Proveedor** y **Stock/Elemento de montaje** al modelo de dominio.
- [ ] Revisar y simplificar el alcance de la beta al **flujo único** descrito en la sección 6, en vez de las 15 historias completas ya cargadas en Jira.
- [ ] Armar la matriz de permisos por rol (Cliente / Administrador / Proveedor).
- [ ] Ajustar el Sprint 1: la primera entrega comprometida con el profesor es **Login + Hotel + Usuario**, no "Cliente + Empresa" como se había planeado inicialmente.
- [ ] Actualizar/ampliar el glosario del proyecto con los términos nuevos.
- [ ] Consultar con "John" (asesor técnico) el manejo de archivos (fotos/planos) en la base de datos.
