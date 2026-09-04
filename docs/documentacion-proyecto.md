# Documentación del Proyecto: Software de Gestión de Eventos y Salones

**Fuente:** Reunión de levantamiento de requerimientos (19 ago 2026), grabaciones "audio #1" y "audio #2".
**Participantes:** Cliente (Roger Agresor, coordinador del programa de Administración de Empresas Turísticas y Hoteleras / gestión de eventos), profesor Jorge, y el equipo de desarrollo (6 estudiantes: Clara Isabel Vitoria Gran, Felipe Bernal, Javier Vargas, Andrés Camilo Flores, Brian Federosa, Lebron De La Rosa Castro).

---

## 1. Contexto del proyecto

El proyecto nace como una necesidad identificada en la industria hotelera y de turismo de reuniones, congresos e incentivos (turismo MICE) de la ciudad de Cartagena. El cliente representa el sector de congresos y convenciones, que gestiona distintos recintos donde se desarrollan eventos académicos, corporativos y sociales (Centro de Convenciones de Cartagena de Indias, Centro de Convenciones del Hotel Las Américas, Casa 1537, Los Baluartes, hoteles 5 estrellas, entre otros).

Actualmente estos procesos se manejan de forma manual o informal (llamadas a proveedores, cotizaciones sin estandarizar, hoteles pequeños y casas de eventos sin ningún sistema). Existe un software de referencia en el mercado local llamado **"Asiste"**, usado por el proveedor del Centro de Convenciones del Hotel Las Américas, que resuelve un problema similar.

**Objetivo del software:** ayudar a las casas de eventos y hoteles a organizar todo el ciclo de un evento — desde la cotización inicial hasta la confirmación, ejecución y cierre — de forma ágil, trazable y estandarizada. El software **no** debe generar facturación (eso ya lo cubren los sistemas propios de los hoteles); su función es la gestión comercial y operativa del recinto.

**Justificación de negocio:** el cliente insiste en que es "una necesidad ya creada" en el mercado de Cartagena, y que un producto así "se vende como pan caliente" dado el volumen de eventos en la ciudad.

**Plazo mencionado:** el patrocinador/programa académico espera tener el proyecto listo en aproximadamente 6 meses.

---

## 2. Actores / usuarios del sistema

- **Ejecutivo(a) comercial**: cotiza, bloquea espacios, da seguimiento a clientes, tiene metas de ventas.
- **Director financiero / jefe contable / director comercial**: definen y aprueban actualizaciones de precios anualmente.
- **Administrador del sistema**: gestiona parametrización (ciudades, empresas, conceptos, precios, salones).
- **Cliente final** (persona natural o jurídica): recibe cotizaciones, firma aceptación, hace el evento.
- Cada usuario debe tener **usuario y contraseña propios**, y el sistema debe registrar qué usuario hizo cada movimiento (trazabilidad / log de auditoría).

---

## 3. Requerimientos funcionales

### 3.1 Gestión de salones y montajes
- Registrar salones con sus características: aforo por tipo de montaje (auditorio, parqué/escuela, espina de pescado, imperial, coctel, etc.), medidas (altura, ancho, aforo).
- Cada tipo de montaje cambia la capacidad máxima de personas (ej.: un salón cabe 200 personas en auditorio pero solo 60 en escuela).
- Permitir subir **fotos** por salón y por tipo de montaje (fotos en escuela, en auditorio, en espina de pescado, fotos de producto en banquete, etc.).
- Adjuntar planos de los salones con las medidas.

### 3.2 Cotización de eventos
- Generar cotizaciones dependiendo del tipo de montaje elegido.
- Incluir en la cotización: salón, montaje, requerimientos adicionales (menaje, cristalería, cena, meseros, orquesta/grupo musical/solista, tarima, traducción simultánea y cabinas, computador, mantelería, maestro de ceremonias, buqué, escarapelas, transporte, personal de apoyo, catering externo, etc.).
- Discriminar impuestos en la cotización: **IVA 19%** e **impoconsumo 8%** (aplicado sobre alimentos y bebidas).
- Definir **vigencia/validez de la oferta** (fecha límite de la cotización, después de la cual el precio puede cambiar).
- El formato de la cotización debe ser visualmente cuidado ("muy estético").
- La cotización debe poder incluir una sección de **aceptación de la propuesta** con firma del cliente.
- La cotización puede servir como inventario de lo entregado al cliente (no se maneja un inventario aparte).

### 3.3 Kit de banquetes / parametrización de precios
- Crear un **"kit de banquetes"**: catálogo de proveedores y precios precargados, para no tener que llamar a cotizar cada vez.
- Parametrizar **conceptos** (ítems cotizables) con su precio e impuesto asociado: cerveza, salón, meseros, cristalería, amplificación, video beam, mantelería (de lujo, forros de silla), tarima (2 o 3 módulos), traducción simultánea, radios, etc.
- Los precios se actualizan normalmente **una vez al año** (según IPC y negociación con proveedores), definidos por una reunión entre director financiero, jefe contable y director comercial.
- Debe existir control de **quién puede modificar precios** (roles/permisos).
- Cuando se cotiza para un evento con mucha anticipación (hasta un año) y el precio del año siguiente aún no está definido, se debe poder aplicar un incremento estimado (ej. 5%) mientras se actualiza el precio real.

### 3.4 Rack de disponibilidad / estados del evento
- Debe existir un **"rack de fechas"** que muestre disponibilidad de salones por día, con código de colores:
  - **Amarillo**: cotizado, no confirmado.
  - **Rojo**: confirmado (el primero que garantiza con pago, gana el espacio).
- Todos los ejecutivos comerciales deben poder ver el rack desde su usuario para cotizar y bloquear espacios.
- Debe permitir **bloqueo temporal** de un espacio (ej. hasta el día siguiente al mediodía) mientras el cliente confirma; si no confirma en el plazo, el espacio se libera automáticamente.
- Estados del evento: **Cotizado → Confirmado → Cancelado**, con posibilidad de mantener un **histórico** aunque el evento desaparezca del rack activo.
- Alertas de **sobreventa** (overbooking) de salones: el sistema no debe permitir bloquear el mismo espacio/fecha para dos eventos confirmados; debe alertar si se intenta.

### 3.5 Garantías, pagos y cancelaciones
- Tipos de garantía/pago: transferencia, tarjeta de crédito, tarjeta débito, consignación nacional, efectivo (cheque es opcional/poco usado).
- Registro de **depósitos/anticipos** del cliente (ej. $10.000.000).
- Reglas de garantía configurables (ej. 50% o 30% según el tipo de evento; para bodas se maneja hasta con un año de anticipación).
- Políticas de **cancelación** configurables, incluyendo **penalización** (porcentaje retenido, ej. 20% o el que se pacte contractualmente).
- Políticas de caso fortuito.
- Al cambiar de estado (cotizado → confirmado), el color/estado del evento en el rack debe actualizarse.

### 3.6 Parametrización general
- **Ciudades**: catálogo con códigos según nomenclatura de turismo (ej. Cartagena = CTG, San Andrés = ADZ, Santa Marta = SMR, Bogotá = BOG).
- **Empresas / clientes**: creación y parametrización de empresa (razón social, contacto, persona encargada de la reserva), diferenciando **persona jurídica** (empresas) y **persona natural** (eventos sociales tipo quinceañeros, matrimonios).
- Histórico de cliente: forma de pago, consumos anteriores.
- Campo de **observaciones internas** (no visibles para el cliente) sobre requerimientos o particularidades del cliente.
- Catálogo de **tipos de eventos permitidos/no permitidos** según políticas de la empresa (ej. rechazo a eventos de connotación ilícita, prohibición de ingreso de armas o estupefacientes, restricciones sobre alimentos y bebidas externas).
- Parametrización de **proveedores**: se recomienda manejar mínimo 3 proveedores por tipo de servicio (no depender de uno solo).
- Duración de eventos: jornada completa, media jornada, horarios límite (ej. hasta las 6pm entre semana, hasta las 2am si es fiesta), dependiente de la ubicación (quejas de vecinos).

### 3.7 Contratos y políticas
- El sistema debe apoyar/reflejar políticas contractuales: política de daños al mobiliario/inmueble, responsabilidad del cliente por daños causados durante el evento.
- Debe existir constancia de entrega/recepción del salón antes y después del evento (posible checklist o referencia a la cotización como inventario).

### 3.8 Catering externo
- Debe permitir cotizar servicio de **catering a domicilio** (el evento se realiza fuera del recinto del proveedor), con costos diferenciados según el requerimiento y volumen de personas.

### 3.9 Reportería y estadísticas
- Estadísticas generales de ventas/eventos.
- **Producción por ejecutivo comercial** vs. **meta asignada** (ej. meta de $800.000.000 por ejecutivo).
- Relación de **cotizado vs. cerrado** (ratio de conversión) por ejecutivo, para medir desempeño comercial.
- **Producción por sede** (si el hotel/empresa tiene varias sedes: Cartagena, Bogotá, Barranquilla, etc.), con filtro por sede y por ejecutivo.
- Salón(es) con mayor rotación / más vendido(s).
- (Nota: el módulo de inscripción/acreditación de asistentes a eventos y escarapelas **no** hace parte del alcance; eso lo gestionan otras plataformas externas como "Copievento" o "Eventos 1A").

### 3.10 Seguridad y trazabilidad
- Autenticación por usuario y contraseña.
- Registro (log) de qué usuario realizó cada movimiento/edición sobre un evento o cotización ("lock" de auditoría).

---

## 4. Fuera de alcance (explícitamente mencionado por el cliente)

- **Facturación**: no es necesario, ya que los hoteles/casas de eventos usan su propio sistema de facturación.
- **Inscripción/acreditación de asistentes** (escarapelas, registro de invitados a congresos): lo maneja el cliente directamente o plataformas externas (Copievento, Eventos 1A).
- Aspectos legales del contrato se manejan aparte (aunque el software debe reflejar y apoyar las políticas del contrato).

---

## 5. Reglas de negocio clave (resumen)

| Regla | Detalle |
|---|---|
| Impuestos | IVA 19% general; impoconsumo 8% sobre alimentos y bebidas |
| Actualización de precios | Anual, basada en IPC y negociación con proveedores; aprobada por financiero + contable + comercial |
| Garantía mínima típica | 30%–50% del valor del evento, según política |
| Penalización por cancelación | Porcentaje pactado contractualmente (ejemplo dado: 20%) |
| Bloqueo temporal de espacio | Configurable (ejemplo: hasta el mediodía del día siguiente) |
| Proveedores por servicio | Mínimo 3, para evitar dependencia de un solo proveedor |
| Estados del evento | Cotizado (amarillo) → Confirmado (rojo) → Cancelado (con histórico) |

---

## 6. Preguntas abiertas / puntos a validar con el cliente

- ¿Qué campos exactos debe tener el contrato generado o referenciado desde el sistema?
- ¿Se requiere checklist formal de entrega/recepción del salón (pre y post evento), o basta con la cotización como respaldo?
- ¿Cómo se gestionan los roles y permisos exactos (qué puede ver/editar cada tipo de usuario)?
- ¿El sistema debe soportar múltiples sedes/empresas desde un inicio (multi-tenant) o se diseña para un solo cliente/recinto por implementación?
- ¿Qué reportes estadísticos adicionales, además de los mencionados, son prioritarios para el cliente?
- Definir el catálogo inicial completo de "tipos de montaje" y "conceptos" para la primera parametrización.
- Confirmar el modelo de bloqueo temporal: ¿notificación automática al ejecutivo cuando vence el plazo?

---

## 7. Glosario

- **MICE**: turismo de reuniones, incentivos, congresos y exposiciones (Meetings, Incentives, Conferences, Exhibitions).
- **Montaje**: disposición física del mobiliario en un salón (auditorio, escuela/parqué, imperial, coctel, espina de pescado).
- **Rack de eventos**: calendario/tablero de disponibilidad de salones por fecha.
- **Kit de banquetes**: catálogo precargado de precios y proveedores para agilizar cotizaciones.
- **Validez de la oferta**: plazo durante el cual una cotización mantiene el precio ofrecido.
- **Catering**: servicio de banquetes prestado fuera del recinto propio, a domicilio.

---

## 8. Próximos pasos sugeridos para el equipo de desarrollo

1. Validar y priorizar los módulos anteriores con el cliente (siguiente reunión mencionada para presentar la "logística del negocio").
2. Definir el modelo de datos inicial: Empresas/Clientes, Salones, Montajes, Conceptos/Precios, Cotizaciones, Eventos, Usuarios/Roles, Proveedores.
3. Diseñar el flujo de estados del evento (cotizado → confirmado → cancelado) y las reglas de transición.
4. Diseñar el rack de disponibilidad con su lógica de colores y bloqueo temporal.
5. Definir el modelo de reportería (metas, producción por ejecutivo/sede, conversión).
6. Repartir frentes de trabajo según los roles ya mencionados en la reunión: base de datos (Felipe Bernal), frontend (Javier Vargas, Brian Federosa), backend (Andrés Camilo Flores, Lebron De La Rosa Castro), y coordinación general/análisis (Clara Isabel Vitoria Gran).
