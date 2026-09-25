// PAVA Track - Sistema de Control y Telemetría Logística México
// Base de Datos Centralizada de Flota y Operaciones

const body = document.body;
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// -------------------------------------------------------------
// BASE DE DATOS DE UNIDADES Y EMBARQUES (FLOTA MÉXICO)
// -------------------------------------------------------------
// -------------------------------------------------------------
// BASE DE DATOS DE UNIDADES Y EMBARQUES (FLOTA FORD F-350 MÉXICO)
// -------------------------------------------------------------
const vehiclesData = {
  'MX-752069247': {
    id: 'MX-752069247',
    model: 'Ford F-350 Super Duty 2024 · 3.5T Caja Seca',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'CDMX → Monterrey',
    origin: 'CDMX (Vallejo)',
    destination: 'Monterrey (Apodaca)',
    corridor: 'Autopista 57D (Troncal Nacional México-Querétaro-NL)',
    status: 'On route',
    statusText: 'En ruta',
    statusClass: 'onroute',
    capacity: 59,
    eta: '10h 45m',
    departureTime: '02:35 CST',
    remainingTime: '01:25:35',
    remainingKm: '28 km restantes',
    speed: '84 km/h',
    fuel: 78,
    odometer: '142,850 km',
    plates: '72-AB-9F (SCT Federal Carga)',
    vin: '1FT8W3BT9REC82910',
    engine: 'Ford 7.3L V8 Godzilla 350 HP · TorqShift 10 vel.',
    tempBrakes: '138 °C (Normal)',
    tirePressure: '80 PSI (Doble Rodado Trasero Óptimo)',
    coords: {
      origin: [19.4890, -99.1620],
      destination: [25.7785, -100.1870],
      current: [20.3712, -99.9921],
      highway: 'Autopista 57D México-Querétaro · KM 148',
      casetas: [
        { name: 'Caseta Tepotzotlán (IAVE)', lat: 19.7150, lng: -99.2210, cost: '$102 MXN' },
        { name: 'Caseta Palmillas (IAVE)', lat: 20.3210, lng: -99.9410, cost: '$102 MXN' },
        { name: 'Caseta Chichimequillas', lat: 20.7620, lng: -100.3210, cost: '$120 MXN' }
      ],
      routePoints: [
        [19.4890, -99.1620],
        [19.6800, -99.2000],
        [19.7150, -99.2210],
        [19.9800, -99.5300],
        [20.3210, -99.9410],
        [20.3712, -99.9921],
        [20.5900, -100.3900],
        [21.1500, -100.7500],
        [22.1500, -100.9800],
        [23.6300, -100.6400],
        [25.4300, -100.9700],
        [25.7785, -100.1870]
      ]
    },
    driver: {
      name: 'Juan Carlos Méndez',
      phone: '+52 55 4192 8831',
      license: 'Lic. Federal Tipo B (Servicio de Carga General)',
      licenseExp: '14/Nov/2027',
      medicalExp: 'Vigente (Apto SCT)',
      rating: '4.9 ★',
      trips: 412
    },
    cargo: {
      type: 'Abarrotes, Insumos y Paquetería Consolidada',
      weight: '2.85 Toneladas',
      pallets: '6 Tarimas E-Track',
      sealNumber: 'SAT-MX-883921',
      tempReefer: 'Caja Seca 3.5T con Copete Aerodinámico',
      client: 'Grupo Femsa / Oxxo Logística',
      declaredValue: '$480,000.00 MXN'
    },
    billing: {
      subtotal: '$24,500.00',
      iva: '$3,920.00',
      retention: '-$980.00',
      total: '$27,440.00 MXN',
      status: 'Timbrado SAT / Crédito 30 días',
      uuid: '8B4F2A19-92C1-4D3E-A591-D18293C89B1A',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte Digital CFDI 4.0', type: 'PDF / XML', folio: 'CP-2024-88492', status: 'Timbrado SAT' },
      { name: 'Póliza de Seguro Quálitas Carga', type: 'PDF Oficial', folio: 'POL-QUA-772910', status: 'Vigente' },
      { name: 'Dictamen Físico-Mecánica NOM-068', type: 'SCT Aprobado', folio: 'SCT-FM-2024-09', status: 'Vigente' },
      { name: 'Verificación Ambiental de Humos', type: 'Holograma 00', folio: 'VERIF-2024-B', status: 'Vigente' }
    ]
  },
  'MX-93633762': {
    id: 'MX-93633762',
    model: 'Ford F-350 Chasis Cabina 2023 · Caja Seca Copete',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'Manzanillo → Guadalajara',
    origin: 'Manzanillo (Puerto Contecon)',
    destination: 'Guadalajara (El Salto)',
    corridor: 'Autopista 54D Corredor Pacífico Puerto-Occidente',
    status: 'Watching',
    statusText: 'Monitoreo',
    statusClass: 'watch',
    capacity: 74,
    eta: '04h 30m',
    departureTime: '05:20 CST',
    remainingTime: '02:10:15',
    remainingKm: '115 km restantes',
    speed: '78 km/h',
    fuel: 85,
    odometer: '98,420 km',
    plates: '91-BA-3K (SCT Carga)',
    vin: '1FT8W3BT7PEC48190',
    engine: 'Ford 6.7L Power Stroke V8 Turbo Diésel 330 HP',
    tempBrakes: '145 °C (Normal)',
    tirePressure: '80 PSI (Doble Rodado Trasero)',
    coords: {
      origin: [19.0540, -104.3160],
      destination: [20.5210, -103.3180],
      current: [19.4120, -103.6210],
      highway: 'Autopista 54D Colima-Guadalajara · KM 82',
      casetas: [
        { name: 'Caseta Cuyutlán', lat: 18.9500, lng: -104.1100, cost: '$165 MXN' },
        { name: 'Caseta San Marcos (IAVE)', lat: 19.4200, lng: -103.5800, cost: '$180 MXN' },
        { name: 'Caseta Acatlán de Juárez', lat: 20.4100, lng: -103.5900, cost: '$110 MXN' }
      ],
      routePoints: [
        [19.0540, -104.3160],
        [19.1200, -104.1800],
        [19.2400, -103.7300],
        [19.4120, -103.6210],
        [19.6800, -103.5100],
        [19.9800, -103.5500],
        [20.3500, -103.5800],
        [20.5210, -103.3180]
      ]
    },
    driver: {
      name: 'Gabriel Soto Villalobos',
      phone: '+52 33 1892 4490',
      license: 'Lic. Federal Tipo B',
      licenseExp: '20/Ene/2026',
      medicalExp: 'Vigente',
      rating: '4.8 ★',
      trips: 340
    },
    cargo: {
      type: 'Electrónicos de Consumo y Componentes de Importación',
      weight: '3.10 Toneladas',
      pallets: '8 Tarimas de Alta Densidad',
      sealNumber: 'CONTECON-MZ-4921',
      tempReefer: 'Seco / Sello Fiscal Aduanal',
      client: 'Samsung Electronics México',
      declaredValue: '$1,450,000.00 MXN'
    },
    billing: {
      subtotal: '$18,000.00',
      iva: '$2,880.00',
      retention: '-$720.00',
      total: '$20,160.00 MXN',
      status: 'Timbrado SAT / Contra Entrega',
      uuid: '4A12B980-6C23-45F1-9988-E102934812AB',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte Complemento 3.0', type: 'PDF / XML', folio: 'CP-2024-91024', status: 'Timbrado SAT' },
      { name: 'Pedimento Aduanal de Importación', type: 'SAT Aduanas', folio: 'PED-24-16-3921-0012', status: 'Desaduanado' },
      { name: 'Póliza GNP Transporte', type: 'Seguro Cobertura Amplia', folio: 'GNP-88192-01', status: 'Vigente' }
    ]
  },
  'MX-113949207': {
    id: 'MX-113949207',
    model: 'Ford F-350 Super Duty 2024 · Caja Reparto 3.5T',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'CDMX → Toluca',
    origin: 'CDMX (Azcapotzalco)',
    destination: 'Toluca (Parque Toluca 2000)',
    corridor: 'Autopista 15D Metropolitano Valle de Toluca',
    status: 'Moving',
    statusText: 'En tránsito',
    statusClass: 'moving',
    capacity: 42,
    eta: '01h 15m',
    departureTime: '02:55 CST',
    remainingTime: '00:28:40',
    remainingKm: '19 km restantes',
    speed: '68 km/h',
    fuel: 62,
    odometer: '45,120 km',
    plates: 'LC-92-811 (Edomex Carga Federal)',
    vin: '1FT8W3BT6REC28491',
    engine: 'Ford 7.3L V8 Godzilla 350 HP · 10 vel.',
    tempBrakes: '95 °C (Frío)',
    tirePressure: '80 PSI',
    coords: {
      origin: [19.4920, -99.1820],
      destination: [19.3410, -99.5620],
      current: [19.3520, -99.3010],
      highway: 'Autopista 15D México-Toluca (La Marquesa) · KM 24',
      casetas: [
        { name: 'Caseta La Venta (IAVE)', lat: 19.3480, lng: -99.2890, cost: '$105 MXN' }
      ],
      routePoints: [
        [19.4920, -99.1820],
        [19.4200, -99.2400],
        [19.3520, -99.3010],
        [19.2900, -99.3700],
        [19.2850, -99.4600],
        [19.3410, -99.5620]
      ]
    },
    driver: {
      name: 'Héctor Daniel Rivas',
      phone: '+52 55 7712 9011',
      license: 'Lic. Tipo C / Federal B',
      licenseExp: '05/May/2026',
      medicalExp: 'Vigente',
      rating: '5.0 ★',
      trips: 620
    },
    cargo: {
      type: 'Paquetería Express y E-Commerce Especializado',
      weight: '1.45 Toneladas',
      pallets: '4 Tarimas con Fleje',
      sealNumber: 'PAVA-F350-112',
      tempReefer: 'Caja Seca Copete Reparto',
      client: 'Mercado Libre México',
      declaredValue: '$340,000.00 MXN'
    },
    billing: {
      subtotal: '$6,800.00',
      iva: '$1,088.00',
      retention: '-$272.00',
      total: '$7,616.00 MXN',
      status: 'Pagado Electrónico SPEI',
      uuid: 'F81920AA-1290-4882-BCA1-998811223344',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Guía de Tránsito Local', type: 'PDF Digital', folio: 'GL-2024-4412', status: 'Activo' },
      { name: 'Carta Porte Simplificada', type: 'SAT CFDI', folio: 'CP-2024-1182', status: 'Timbrado SAT' }
    ]
  },
  'MX-118945307': {
    id: 'MX-118945307',
    model: 'Ford F-350 Chasis Cabina 2024 · Caja Seca Bajío',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'Querétaro → León',
    origin: 'Querétaro (El Marqués)',
    destination: 'León (Puerto Interior Silao)',
    corridor: 'Autopista 45D Corredor Industrial del Bajío',
    status: 'On route',
    statusText: 'En ruta',
    statusClass: 'onroute',
    capacity: 68,
    eta: '02h 10m',
    departureTime: '03:14 CST',
    remainingTime: '00:54:10',
    remainingKm: '62 km restantes',
    speed: '88 km/h',
    fuel: 70,
    odometer: '38,900 km',
    plates: 'SS-44-192 (Querétaro Carga)',
    vin: '1FT8W3BT5REC18293',
    engine: 'Ford 6.7L Power Stroke V8 Turbo Diésel',
    tempBrakes: '110 °C (Normal)',
    tirePressure: '80 PSI',
    coords: {
      origin: [20.5920, -100.3890],
      destination: [20.9850, -101.5540],
      current: [20.7120, -100.8210],
      highway: 'Autopista 45D Querétaro-Irapuato · KM 45',
      casetas: [
        { name: 'Caseta Querétaro (IAVE)', lat: 20.6120, lng: -100.4800, cost: '$89 MXN' },
        { name: 'Caseta Salamanca', lat: 20.5820, lng: -101.1900, cost: '$95 MXN' }
      ],
      routePoints: [
        [20.5920, -100.3890],
        [20.6120, -100.4800],
        [20.5400, -100.8100],
        [20.7120, -100.8210],
        [20.5820, -101.1900],
        [20.7200, -101.3500],
        [20.9850, -101.5540]
      ]
    },
    driver: {
      name: 'Mario Alberto Trejo',
      phone: '+52 442 391 8820',
      license: 'Lic. Federal Tipo B',
      licenseExp: '19/Ago/2025',
      medicalExp: 'Vigente',
      rating: '4.7 ★',
      trips: 289
    },
    cargo: {
      type: 'Autopartes y Arneses Eléctricos Automotrices',
      weight: '2.20 Toneladas',
      pallets: '6 Racks Metálicos',
      sealNumber: 'SEAL-BAJIO-991',
      tempReefer: 'Seco / Just-In-Time',
      client: 'General Motors Complejo Silao',
      declaredValue: '$950,000.00 MXN'
    },
    billing: {
      subtotal: '$14,200.00',
      iva: '$2,272.00',
      retention: '-$568.00',
      total: '$15,904.00 MXN',
      status: 'Timbrado SAT / Crédito 15 días',
      uuid: '992811AB-4412-8899-0012-778899AABBCC',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte CFDI 4.0 Autopartes', type: 'PDF / XML', folio: 'CP-2024-77192', status: 'Timbrado SAT' },
      { name: 'Póliza Seguro Mercancías Inbursa', type: 'PDF Oficial', folio: 'INB-881920', status: 'Vigente' }
    ]
  },
  'MX-752263347': {
    id: 'MX-752263347',
    model: 'Ford F-350 Super Duty 2024 · 3.5T Doble Rodado',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'Monterrey → Nuevo Laredo',
    origin: 'Monterrey (Salinas Victoria)',
    destination: 'Nuevo Laredo (Puente III)',
    corridor: 'Autopista 85D Corredor Internacional NAFTA',
    status: 'On route',
    statusText: 'En ruta',
    statusClass: 'onroute',
    capacity: 81,
    eta: '03h 05m',
    departureTime: '04:20 CST',
    remainingTime: '01:12:00',
    remainingKm: '84 km restantes',
    speed: '82 km/h',
    fuel: 91,
    odometer: '67,400 km',
    plates: '88-BC-4P (SCT C-TPAT Carga)',
    vin: '1FT8W3BT2REC29104',
    engine: 'Ford 6.7L Power Stroke V8 Turbo Diésel 330 HP',
    tempBrakes: '130 °C (Normal)',
    tirePressure: '82 PSI (Calibración Óptima)',
    coords: {
      origin: [25.8610, -100.2920],
      destination: [27.4860, -99.5080],
      current: [26.5410, -99.9820],
      highway: 'Autopista 85D Monterrey-Nuevo Laredo · KM 102',
      casetas: [
        { name: 'Caseta Sabinas Hidalgo (IAVE)', lat: 26.4950, lng: -100.1200, cost: '$310 MXN' }
      ],
      routePoints: [
        [25.8610, -100.2920],
        [26.1500, -100.2000],
        [26.4950, -100.1200],
        [26.5410, -99.9820],
        [27.0200, -99.7800],
        [27.4860, -99.5080]
      ]
    },
    driver: {
      name: 'Raúl Mendoza Saldaña',
      phone: '+52 81 1920 4488',
      license: 'Lic. Federal Tipo B con Certificación B1 Fast',
      licenseExp: '11/Oct/2026',
      medicalExp: 'Vigente',
      rating: '4.95 ★',
      trips: 580
    },
    cargo: {
      type: 'Perfiles de Acero y Piezas Maquiladas de Exportación',
      weight: '3.30 Toneladas',
      pallets: '6 Tarimas Reforzadas con Eslingas',
      sealNumber: 'CTPAT-SAT-99014',
      tempReefer: 'Caja Seca Cerrada con Sellos C-TPAT',
      client: 'Ternium México / DeAcero',
      declaredValue: '$1,250,000.00 MXN'
    },
    billing: {
      subtotal: '$16,000.00',
      iva: '$2,560.00',
      retention: '-$640.00',
      total: '$17,920.00 MXN',
      status: 'Timbrado SAT / Despacho Aduanal',
      uuid: '55667788-99AA-BBCC-DDEE-FF0011223344',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte Internacional CFDI', type: 'PDF / XML', folio: 'CP-INT-2024-091', status: 'Timbrado SAT' },
      { name: 'Certificado C-TPAT / FAST Card', type: 'Seguridad Aduanas', folio: 'FAST-88192-US', status: 'Validado' },
      { name: 'Póliza Quálitas Internacional', type: 'Cobertura Binacional', folio: 'QUA-INT-9921', status: 'Vigente' }
    ]
  },
  'MX-916472621': {
    id: 'MX-916472621',
    model: 'Ford F-350 Chasis Cabina 2023 · Caja Seca 3.5T',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'Veracruz → Puebla',
    origin: 'Veracruz (Puerto San Juan de Ulúa)',
    destination: 'Puebla (Parque Finsa)',
    corridor: 'Autopista 150D Corredor Golfo - Altiplano Central',
    status: 'Delayed',
    statusText: 'Retrasado',
    statusClass: 'delayed',
    capacity: 35,
    eta: '04h 10m',
    departureTime: '02:20 CST',
    remainingTime: '02:45:00',
    remainingKm: '140 km restantes',
    speed: '25 km/h (Tráfico Cumbres Maltrata)',
    fuel: 54,
    odometer: '185,400 km',
    plates: '55-AA-1Z (SCT Federal)',
    vin: '1FT8W3BT4PEC88219',
    engine: 'Ford 7.3L V8 Godzilla 350 HP',
    tempBrakes: '160 °C (Pendiente pronunciada)',
    tirePressure: '80 PSI',
    coords: {
      origin: [19.2010, -96.1410],
      destination: [19.1230, -98.2410],
      current: [18.8210, -97.2340],
      highway: 'Autopista 150D Córdoba-Puebla (Cumbres de Maltrata) · KM 246',
      casetas: [
        { name: 'Caseta Paso del Toro', lat: 19.0400, lng: -96.1400, cost: '$118 MXN' },
        { name: 'Caseta Cuitláhuac', lat: 18.8200, lng: -96.7200, cost: '$126 MXN' },
        { name: 'Caseta Esperanza (IAVE)', lat: 18.8600, lng: -97.3500, cost: '$154 MXN' }
      ],
      routePoints: [
        [19.2010, -96.1410],
        [19.0400, -96.1400],
        [18.8800, -96.9200],
        [18.8210, -97.2340],
        [18.8600, -97.3500],
        [19.0100, -97.9800],
        [19.1230, -98.2410]
      ]
    },
    driver: {
      name: 'José Luis Cárdenas',
      phone: '+52 229 912 8834',
      license: 'Lic. Federal Tipo B',
      licenseExp: '08/Dic/2025',
      medicalExp: 'Vigente',
      rating: '4.6 ★',
      trips: 290
    },
    cargo: {
      type: 'Materia Prima Química Grado Alimenticio',
      weight: '1.95 Toneladas',
      pallets: '4 Contenedores IBC Asegurados',
      sealNumber: 'VER-PORT-7712',
      tempReefer: 'Seco Grado Industrial',
      client: 'Braskem Idesa / BASF México',
      declaredValue: '$620,000.00 MXN'
    },
    billing: {
      subtotal: '$15,500.00',
      iva: '$2,480.00',
      retention: '-$620.00',
      total: '$17,360.00 MXN',
      status: 'Facturado / En Tránsito',
      uuid: 'CC112233-4455-6677-8899-AABBCCDDEEFF',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte CFDI 4.0', type: 'PDF / XML', folio: 'CP-2024-3312', status: 'Timbrado SAT' },
      { name: 'Hoja de Seguridad MSDS', type: 'Norma Oficial', folio: 'NOM-018-STPS', status: 'Aprobado' }
    ]
  },
  'MX-118134203': {
    id: 'MX-118134203',
    model: 'Ford F-350 Super Duty 2024 · Caja Refrigerada Copete',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'Tijuana → Mexicali',
    origin: 'Tijuana (Otay)',
    destination: 'Mexicali (Parque Nelson)',
    corridor: 'Autopista 2D Corredor Fronterizo La Rumorosa',
    status: 'On route',
    statusText: 'En ruta',
    statusClass: 'onroute',
    capacity: 74,
    eta: '02h 30m',
    departureTime: '01:55 CST',
    remainingTime: '00:48:20',
    remainingKm: '46 km restantes',
    speed: '75 km/h',
    fuel: 82,
    odometer: '51,200 km',
    plates: '12-BC-8K (SCT Carga)',
    vin: '1FT8W3BT0REC29182',
    engine: 'Ford 6.7L Power Stroke Turbo Diésel 330 HP',
    tempBrakes: '120 °C (Freno de motor activo)',
    tirePressure: '80 PSI',
    coords: {
      origin: [32.5320, -116.9210],
      destination: [32.6270, -115.4520],
      current: [32.5480, -116.0820],
      highway: 'Autopista 2D Tijuana-Mexicali (La Rumorosa) · KM 68',
      casetas: [
        { name: 'Caseta El Hongo (IAVE)', lat: 32.5200, lng: -116.4800, cost: '$90 MXN' },
        { name: 'Caseta La Rumorosa', lat: 32.5300, lng: -115.9800, cost: '$31 MXN' }
      ],
      routePoints: [
        [32.5320, -116.9210],
        [32.5600, -116.6300],
        [32.5200, -116.4800],
        [32.5480, -116.0820],
        [32.5300, -115.9800],
        [32.6000, -115.7000],
        [32.6270, -115.4520]
      ]
    },
    driver: {
      name: 'Alonso Valenzuela Soto',
      phone: '+52 664 182 9901',
      license: 'Lic. Federal Tipo B',
      licenseExp: '14/Feb/2027',
      medicalExp: 'Vigente',
      rating: '4.88 ★',
      trips: 410
    },
    cargo: {
      type: 'Dispositivos Médicos e Insumos Quirúrgicos',
      weight: '2.40 Toneladas',
      pallets: '6 Tarimas Termocontroladas',
      sealNumber: 'MED-TJ-8841',
      tempReefer: '20 °C Controlado',
      client: 'Medtronic México',
      declaredValue: '$2,800,000.00 MXN'
    },
    billing: {
      subtotal: '$12,800.00',
      iva: '$2,048.00',
      retention: '-$512.00',
      total: '$14,336.00 MXN',
      status: 'Timbrado SAT / En Ruta',
      uuid: 'A1B2C3D4-E5F6-7890-1234-56789ABCDEF0',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte CFDI Grado Médico', type: 'PDF / XML', folio: 'CP-MED-8812', status: 'Timbrado SAT' },
      { name: 'Certificado COFEPRIS Insumos Médicos', type: 'Federal', folio: 'COF-2024-8891', status: 'Vigente' }
    ]
  },
  'MX-928322207': {
    id: 'MX-928322207',
    model: 'Ford F-350 Chasis Cabina 2024 · Caja Térmica 3.5T',
    brand: 'Ford F-350',
    type: 'f350_box',
    route: 'Mérida → Cancún',
    origin: 'Mérida (Umán)',
    destination: 'Cancún (Zona Hotelera / Aeropuerto)',
    corridor: 'Autopista 180D Corredor Península de Yucatán',
    status: 'Watching',
    statusText: 'Monitoreo',
    statusClass: 'watch',
    capacity: 63,
    eta: '03h 50m',
    departureTime: '05:40 CST',
    remainingTime: '01:30:15',
    remainingKm: '110 km restantes',
    speed: '90 km/h',
    fuel: 75,
    odometer: '29,400 km',
    plates: 'YZ-88-129 (Yucatán Carga)',
    vin: '1FT8W3BT8REC19201',
    engine: 'Ford 7.3L V8 Godzilla Gasolina 350 HP',
    tempBrakes: '90 °C',
    tirePressure: '80 PSI',
    coords: {
      origin: [20.9320, -89.6510],
      destination: [21.1610, -86.8510],
      current: [20.8120, -88.5410],
      highway: 'Autopista 180D Mérida-Cancún (Chichén Itzá) · KM 120',
      casetas: [
        { name: 'Caseta Pisté (Chichén)', lat: 20.6900, lng: -88.5800, cost: '$210 MXN' },
        { name: 'Caseta Tintal (IAVE)', lat: 21.0100, lng: -87.1900, cost: '$285 MXN' }
      ],
      routePoints: [
        [20.9320, -89.6510],
        [20.8800, -89.2000],
        [20.6900, -88.5800],
        [20.8120, -88.5410],
        [20.8200, -87.8000],
        [21.0100, -87.1900],
        [21.1610, -86.8510]
      ]
    },
    driver: {
      name: 'Eduardo Pech Canché',
      phone: '+52 999 482 1190',
      license: 'Lic. Estatal / Federal de Chofer',
      licenseExp: '30/Jun/2026',
      medicalExp: 'Vigente',
      rating: '4.9 ★',
      trips: 512
    },
    cargo: {
      type: 'Alimentos Gourmet y Congelados para Hotelería',
      weight: '2.10 Toneladas',
      pallets: '4 Pallets Refrigerados',
      sealNumber: 'CANCUN-HOTEL-49',
      tempReefer: '-18 °C Congelado',
      client: 'Grupo Posadas / Hoteles Xcaret',
      declaredValue: '$420,000.00 MXN'
    },
    billing: {
      subtotal: '$11,500.00',
      iva: '$1,840.00',
      retention: '-$460.00',
      total: '$12,880.00 MXN',
      status: 'Timbrado SAT / Pago Confirmado',
      uuid: '99887766-5544-3322-1100-FFEEDDCCBBAA',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte Termocontrol CFDI', type: 'PDF / XML', folio: 'CP-REEF-2024', status: 'Timbrado SAT' },
      { name: 'Certificado Fitosanitario SENASICA', type: 'Oficial', folio: 'SEN-24-00912', status: 'Aprobado' }
    ]
  }
};

let currentVehicleId = 'MX-752069247';
let currentActiveTab = 'shipping';

// -------------------------------------------------------------
// GENERADORES VECTORIALES SVG: FORD F-350 3.5T (CHASIS CABINA + CAJA SECA CON COPETE)
// -------------------------------------------------------------

function generateTruckSvg(id, brand = 'Ford F-350', capacity = 59) {
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, '_');
  
  // Custom subtle variations based on status/id
  let stripeColor = '#38bdf8';
  if (id.includes('9363')) stripeColor = '#f59e0b';
  if (id.includes('9164')) stripeColor = '#ef4444';
  if (id.includes('1181')) stripeColor = '#8b5cf6';
  if (id.includes('9283')) stripeColor = '#10b981';

  return `
  <svg class="vehicle-svg truck-svg f350-svg" viewBox="0 0 320 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${brand} Chasis Cabina 3.5T">
    <defs>
      <!-- Cabina Ford Super Duty Gradient -->
      <linearGradient id="f350CabGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e2e8f0"/>
        <stop offset="35%" stop-color="#94a3b8"/>
        <stop offset="85%" stop-color="#475569"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <!-- Caja Seca Blanca con Copete -->
      <linearGradient id="f350BoxGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="20%" stop-color="#e2e8f0"/>
        <stop offset="75%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>
      <!-- Cristales Polarizados de Cabina -->
      <linearGradient id="f350GlassGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="60%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <!-- Rines de Acero 8 Birlos / Doble Rodado Trasero -->
      <linearGradient id="f350RimGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cbd5e1"/>
        <stop offset="50%" stop-color="#64748b"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <!-- Parrilla Cromada Ford Super Duty -->
      <linearGradient id="f350GrilleGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f1f5f9"/>
        <stop offset="50%" stop-color="#94a3b8"/>
        <stop offset="100%" stop-color="#334155"/>
      </linearGradient>
    </defs>

    <!-- Sombra en Asfalto (Proporción compacta 3.5T) -->
    <ellipse cx="158" cy="67" rx="114" ry="3.2" fill="#000000" opacity="0.55"/>
    <line x1="38" y1="66.5" x2="278" y2="66.5" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

    <!-- ============================================== -->
    <!-- 1. CAJA SECA 3.5T COMPACTA CON COPETE          -->
    <!-- ============================================== -->
    <g class="f350-caja-seca">
      <!-- Cuerpo de la caja con copete sobre cabina (X: 98 a 262) -->
      <path d="M 98 17 L 126 7 L 260 7 Q 263 7 263 11 L 263 53 L 128 53 L 128 22 L 98 22 Z" fill="url(#f350BoxGrad_${cleanId})" stroke="#475569" stroke-width="0.8"/>
      
      <!-- Borde aerodinámico frontal del copete -->
      <path d="M 98 17 Q 96 19 98 22 L 128 22 L 126 7 Q 108 12 98 17 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
      
      <!-- Molduras y remaches estructurales de aluminio -->
      <line x1="128" y1="8" x2="261" y2="8" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1"/>
      <line x1="128" y1="52" x2="261" y2="52" stroke="#334155" stroke-width="1.2"/>
      
      <!-- Paneles verticales de la caja seca 3.5T -->
      <line x1="162" y1="8" x2="162" y2="52" stroke="#94a3b8" stroke-opacity="0.3" stroke-width="0.7"/>
      <line x1="196" y1="8" x2="196" y2="52" stroke="#94a3b8" stroke-opacity="0.3" stroke-width="0.7"/>
      <line x1="230" y1="8" x2="230" y2="52" stroke="#94a3b8" stroke-opacity="0.3" stroke-width="0.7"/>
      
      <!-- Franja reflectiva / corporativa lateral -->
      <path d="M 130 31 L 261 31 L 261 34 L 130 34 Z" fill="${stripeColor}" opacity="0.85"/>
      <circle cx="136" cy="32.5" r="1.2" fill="#ffffff"/>

      <!-- Cinta Reflejante Reglamentaria SCT / DOT-C2 (Rojo y Blanco) -->
      <g class="reflective-tape" transform="translate(130, 48)">
        <rect x="0" y="0" width="130" height="2" fill="#ef4444"/>
        <rect x="8" y="0" width="10" height="2" fill="#ffffff"/>
        <rect x="28" y="0" width="10" height="2" fill="#ffffff"/>
        <rect x="48" y="0" width="10" height="2" fill="#ffffff"/>
        <rect x="68" y="0" width="10" height="2" fill="#ffffff"/>
        <rect x="88" y="0" width="10" height="2" fill="#ffffff"/>
        <rect x="108" y="0" width="10" height="2" fill="#ffffff"/>
      </g>

      <!-- Luces de gálibo / Luces LED superiores ámbar y rojas -->
      <circle cx="102" cy="19" r="1.1" fill="#f59e0b"/>
      <circle cx="130" cy="9.5" r="1.1" fill="#f59e0b"/>
      <circle cx="196" cy="9.5" r="1.1" fill="#f59e0b"/>
      <circle cx="261" cy="9.5" r="1.1" fill="#ef4444"/>
      <circle cx="261" cy="50" r="1.1" fill="#ef4444"/>

      <!-- Marco trasero y cerrojo de puerta tipo cortina -->
      <rect x="260" y="10" width="3" height="42" fill="#475569"/>
      <rect x="262" y="16" width="1.5" height="3" fill="#cbd5e1"/>
      <rect x="262" y="40" width="1.5" height="3" fill="#cbd5e1"/>
      
      <!-- Faldón inferior de seguridad y loderas traseras -->
      <rect x="175" y="53" width="28" height="4.5" rx="0.5" fill="#1e293b" stroke="#334155" stroke-width="0.5"/>
      <line x1="177" y1="55" x2="201" y2="55" stroke="#475569" stroke-width="0.6" stroke-dasharray="3 2"/>
      <rect x="254" y="53" width="7" height="9" fill="#0f172a"/>
    </g>

    <!-- ============================================== -->
    <!-- 2. CHASIS CABINA FORD SUPER DUTY F-350        -->
    <!-- ============================================== -->
    <g class="f350-cabina">
      <!-- Larguero del chasis reforzado de acero -->
      <rect x="68" y="52" width="60" height="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
      <!-- Tanque de combustible y estribo lateral -->
      <rect x="84" y="53" width="40" height="4" rx="1" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

      <!-- Silueta frontal y cabina Ford F-350 Super Duty -->
      <path d="M 48 53 L 48 42 Q 48 39 51 38 L 68 37 Q 74 37 77 34 L 89 23 Q 93 20 102 20 L 126 20 L 126 53 L 118 53 Q 116 44 104 44 Q 92 44 90 53 L 70 53 Q 68 44 56 44 L 48 53 Z" fill="url(#f350CabGrad_${cleanId})" stroke="#475569" stroke-width="0.8"/>

      <!-- Cofre con relieves de poder (Power Dome) -->
      <path d="M 51 38 L 77 34 L 76 36 L 50 40 Z" fill="#64748b" opacity="0.6"/>

      <!-- Parrilla Frontal Cromada Ford Super Duty con 2 barras horizontales -->
      <rect x="48" y="40" width="4" height="13" rx="0.5" fill="url(#f350GrilleGrad_${cleanId})" stroke="#1e293b" stroke-width="0.5"/>
      <line x1="48" y1="44" x2="52" y2="44" stroke="#0f172a" stroke-width="0.8"/>
      <line x1="48" y1="48" x2="52" y2="48" stroke="#0f172a" stroke-width="0.8"/>
      <!-- Emblema Oval Azul Ford -->
      <ellipse cx="49.5" cy="46" rx="1.2" ry="0.8" fill="#1d4ed8" stroke="#ffffff" stroke-width="0.3"/>

      <!-- Faros Delanteros C-Clamp LED Signature de Ford Super Duty -->
      <path d="M 50 40 L 55 39 L 54 44 L 51 44 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="0.5"/>
      <circle cx="52.5" cy="42" r="1.1" fill="#ffffff"/>
      <!-- Direccional ámbar inferior en faro -->
      <rect x="51" y="45" width="2.5" height="1.5" fill="#f59e0b"/>

      <!-- Defensa Delantera Cromada Heavy-Duty con ganchos de arrastre -->
      <path d="M 47 49 L 54 49 L 53 54 L 47 54 Z" fill="#94a3b8" stroke="#334155" stroke-width="0.5"/>
      <rect x="46" y="52" width="2" height="2" fill="#0f172a"/>

      <!-- Ventana Lateral de Cabina Ford con corte bajo distintivo -->
      <path d="M 80 33 L 90 23 Q 94 21 102 21 L 122 21 L 122 35 L 80 35 Z" fill="url(#f350GlassGrad_${cleanId})" stroke="#334155" stroke-width="0.7"/>
      <!-- Reflejos en Cristal -->
      <path d="M 94 23 L 100 23 L 86 34 L 81 34 Z" fill="#ffffff" opacity="0.16"/>
      <path d="M 112 23 L 118 23 L 110 34 L 104 34 Z" fill="#ffffff" opacity="0.09"/>
      <line x1="102" y1="21" x2="102" y2="35" stroke="#1e293b" stroke-width="0.8"/>

      <!-- Manija de Puerta Negra -->
      <rect x="110" y="38" width="5" height="1.5" rx="0.6" fill="#0f172a"/>

      <!-- Espejo Lateral de Remolque Doble Brazo (Tow Mirrors con Direccional) -->
      <path d="M 82 32 L 76 32 L 76 38 L 82 37 Z" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
      <line x1="76" y1="35" x2="79" y2="35" stroke="#f59e0b" stroke-width="0.8"/>

      <!-- Luces Ámbar de Toldillo Cabina (Cab Marker Lights) -->
      <circle cx="100" cy="19.5" r="0.7" fill="#f59e0b"/>
      <circle cx="106" cy="19.5" r="0.7" fill="#f59e0b"/>
      <circle cx="112" cy="19.5" r="0.7" fill="#f59e0b"/>
    </g>

    <!-- ============================================== -->
    <!-- 3. RUEDAS Y RINES (EJE DELANTERO + EJE TRASERO) -->
    <!-- ============================================== -->
    <!-- Rueda Delantera (Eje Direccional Heavy Duty F-350) -->
    <g class="wheel front-wheel" transform="translate(68, 54)">
      <circle cx="0" cy="0" r="9.5" fill="#090d12" stroke="#1e293b" stroke-width="1"/>
      <circle cx="0" cy="0" r="6.5" fill="url(#f350RimGrad_${cleanId})" stroke="#0f172a" stroke-width="0.6"/>
      <circle cx="0" cy="0" r="3" fill="#0f172a"/>
      <circle cx="0" cy="0" r="1.3" fill="#e2e8f0"/>
      <circle cx="0" cy="-2" r="0.4" fill="#0f172a"/>
      <circle cx="1.5" cy="-1.5" r="0.4" fill="#0f172a"/>
      <circle cx="2" cy="0" r="0.4" fill="#0f172a"/>
      <circle cx="1.5" cy="1.5" r="0.4" fill="#0f172a"/>
      <circle cx="0" cy="2" r="0.4" fill="#0f172a"/>
      <circle cx="-1.5" cy="1.5" r="0.4" fill="#0f172a"/>
      <circle cx="-2" cy="0" r="0.4" fill="#0f172a"/>
      <circle cx="-1.5" cy="-1.5" r="0.4" fill="#0f172a"/>
    </g>

    <!-- Rueda Trasera (Eje Trasero Doble Rodado Dually 3.5T) -->
    <g class="wheel rear-wheel-1" transform="translate(220, 54)">
      <circle cx="0" cy="0" r="9.5" fill="#090d12" stroke="#1e293b" stroke-width="1"/>
      <circle cx="0" cy="0" r="6.5" fill="url(#f350RimGrad_${cleanId})" stroke="#0f172a" stroke-width="0.6"/>
      <circle cx="0" cy="0" r="3.2" fill="#0f172a"/>
      <circle cx="0" cy="0" r="1.3" fill="#e2e8f0"/>
      <circle cx="0" cy="-2" r="0.4" fill="#0f172a"/>
      <circle cx="1.5" cy="-1.5" r="0.4" fill="#0f172a"/>
      <circle cx="2" cy="0" r="0.4" fill="#0f172a"/>
      <circle cx="1.5" cy="1.5" r="0.4" fill="#0f172a"/>
      <circle cx="0" cy="2" r="0.4" fill="#0f172a"/>
      <circle cx="-1.5" cy="1.5" r="0.4" fill="#0f172a"/>
      <circle cx="-2" cy="0" r="0.4" fill="#0f172a"/>
      <circle cx="-1.5" cy="-1.5" r="0.4" fill="#0f172a"/>
    </g>
  </svg>`;
}

function generateVanSvg(id, brand, capacity) {
  return generateTruckSvg(id, brand, capacity);
}

// -------------------------------------------------------------
// ILUSTRACIÓN DE CORTE TRANSVERSAL: FORD F-350 3.5T (CAJA SECA CON COPETE)
// -------------------------------------------------------------

function generateDetailIllustration(vehicleOrCap = 59) {
  let capNum = 59;
  let cleanId = 'det_f350';

  if (typeof vehicleOrCap === 'object' && vehicleOrCap !== null) {
    capNum = Math.max(0, Math.min(100, Number(vehicleOrCap.capacity) || 59));
    cleanId = (vehicleOrCap.id || 'det').replace(/[^a-zA-Z0-9]/g, '_');
  } else {
    capNum = Math.max(0, Math.min(100, Number(vehicleOrCap) || 59));
  }

  // Max width of the cargo bay cutaway (compact 3.5T)
  const maxBayWidth = 148;
  const fillWidth = Math.max(14, Math.round((maxBayWidth * capNum) / 100));

  return `
  <div class="detail-truck-container">
    <svg class="detail-truck-svg" viewBox="0 0 380 95" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ford F-350 Super Duty Corte de Caja Seca 3.5T">
      <defs>
        <!-- Cabina Ford Super Duty Gradient -->
        <linearGradient id="detF350Cab_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f1f5f9"/>
          <stop offset="35%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
        <!-- Interior de la Caja Seca -->
        <linearGradient id="detF350Bay_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="50%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
        <!-- Carga Dinámica con Iluminación LED -->
        <linearGradient id="detF350Load_${cleanId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.95"/>
        </linearGradient>
        <!-- Rines -->
        <linearGradient id="detF350Rim_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e2e8f0"/>
          <stop offset="50%" stop-color="#64748b"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <pattern id="detF350Grid_${cleanId}" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>
        </pattern>
      </defs>

      <!-- Sombra en suelo compacta -->
      <ellipse cx="185" cy="87" rx="145" ry="4" fill="#000000" opacity="0.6"/>
      <line x1="35" y1="86" x2="335" y2="86" stroke="rgba(255,255,255,0.08)" stroke-width="1.2"/>

      <!-- ============================================== -->
      <!-- 1. CABINA FORD F-350 SUPER DUTY                -->
      <!-- ============================================== -->
      <g class="det-cabina">
        <!-- Larguero chasis de acero -->
        <rect x="68" y="68" width="80" height="7" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>
        <!-- Tanque de combustible -->
        <rect x="85" y="70" width="50" height="6" rx="1.5" fill="#1e293b" stroke="#475569" stroke-width="0.6"/>

        <!-- Carrocería frontal de cabina -->
        <path d="M 46 70 L 46 56 Q 46 51 50 49 L 72 48 Q 79 48 83 44 L 99 28 Q 104 24 116 24 L 144 24 L 144 70 L 132 70 Q 128 58 114 58 Q 100 58 97 70 L 68 70 Q 64 58 50 58 L 46 70 Z" fill="url(#detF350Cab_${cleanId})" stroke="#475569" stroke-width="1.1"/>

        <!-- Parrilla y cofre Ford -->
        <path d="M 50 49 L 82 44 L 80 47 L 48 52 Z" fill="#475569" opacity="0.6"/>
        <rect x="46" y="52" width="5" height="17" rx="1" fill="#94a3b8" stroke="#1e293b" stroke-width="0.7"/>
        <line x1="46" y1="58" x2="51" y2="58" stroke="#0f172a" stroke-width="1"/>
        <line x1="46" y1="64" x2="51" y2="64" stroke="#0f172a" stroke-width="1"/>

        <!-- Faros C-Clamp LED -->
        <path d="M 49 51 L 55 50 L 54 57 L 50 57 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="0.6"/>
        <circle cx="52" cy="54" r="1.5" fill="#ffffff"/>

        <!-- Ventana Lateral y Operador en cabina -->
        <path d="M 88 43 L 100 30 Q 105 27 116 27 L 138 27 L 138 45 L 88 45 Z" fill="#0f172a" stroke="#334155" stroke-width="0.9"/>
        <path d="M 104 30 L 112 30 L 96 44 L 90 44 Z" fill="#ffffff" opacity="0.14"/>
        <circle cx="120" cy="36" r="4.5" fill="#334155"/>
        <path d="M 112 45 Q 114 40 120 40 Q 126 40 128 45 Z" fill="#1e293b"/>

        <!-- Espejo de Remolque -->
        <path d="M 90 42 L 82 42 L 82 50 L 90 49 Z" fill="#0f172a" stroke="#334155" stroke-width="0.7"/>
        <line x1="82" y1="46" x2="86" y2="46" stroke="#f59e0b" stroke-width="1"/>
      </g>

      <!-- ============================================== -->
      <!-- 2. CORTE DE CAJA SECA CON COPETE AERODINÁMICO -->
      <!-- ============================================== -->
      <g class="det-caja-corte">
        <!-- Contorno exterior de la caja con copete sobre cabina -->
        <path d="M 112 20 L 144 8 L 316 8 Q 320 8 320 12 L 320 70 L 144 70 L 144 26 L 112 26 Z" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>

        <!-- Ventana de corte transversal interior -->
        <rect x="152" y="14" width="160" height="52" rx="3" fill="url(#detF350Bay_${cleanId})" stroke="#334155" stroke-width="1.2"/>
        <rect x="154" y="16" width="156" height="48" rx="2" fill="url(#detF350Grid_${cleanId})"/>

        <!-- Copete interior frontal (espacio de almacenaje superior) -->
        <path d="M 116 24 L 142 14 L 142 24 Z" fill="#1e293b" stroke="#334155" stroke-width="0.6"/>
        <rect x="120" y="19" width="16" height="4" rx="0.5" fill="#f59e0b" opacity="0.8"/>

        <!-- Rieles de amarre E-Track de acero -->
        <line x1="154" y1="32" x2="308" y2="32" stroke="#64748b" stroke-width="1.2" stroke-dasharray="8 4"/>
        <line x1="154" y1="48" x2="308" y2="48" stroke="#64748b" stroke-width="1.2" stroke-dasharray="8 4"/>

        <!-- Carga Dinámica: Tarimas y Carga Volumétrica según capacidad -->
        <g class="det-cargo-fill-group">
          <!-- Bloque de carga fluida -->
          <rect id="detailCargoFillRect" x="156" y="20" width="${fillWidth}" height="42" rx="2.5" fill="url(#detF350Load_${cleanId})"/>
          
          <!-- Separadores de tarimas y estibas -->
          <line x1="195" y1="18" x2="195" y2="64" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
          <line x1="235" y1="18" x2="235" y2="64" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
          <line x1="275" y1="18" x2="275" y2="64" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
        </g>

        <!-- Luces LED interiores de cabina de carga -->
        <circle cx="178" cy="16" r="1.5" fill="#38bdf8"/>
        <circle cx="230" cy="16" r="1.5" fill="#38bdf8"/>
        <circle cx="282" cy="16" r="1.5" fill="#38bdf8"/>

        <!-- Marco y cerrojos de puerta trasera -->
        <rect x="314" y="16" width="3" height="48" rx="0.5" fill="#334155"/>
        <rect x="318" y="22" width="1.5" height="5" fill="#cbd5e1"/>
        <rect x="318" y="52" width="1.5" height="5" fill="#cbd5e1"/>
      </g>

      <!-- ============================================== -->
      <!-- 3. RUEDAS 8 BIRLOS (DELANTERA Y TRASERA DUALLY)-->
      <!-- ============================================== -->
      <!-- Rueda Delantera -->
      <g class="wheel" transform="translate(74, 72)">
        <circle cx="0" cy="0" r="11.5" fill="#090d12" stroke="#1e293b" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="7.8" fill="url(#detF350Rim_${cleanId})" stroke="#0f172a" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="3.6" fill="#0f172a"/>
        <circle cx="0" cy="0" r="1.5" fill="#cbd5e1"/>
      </g>

      <!-- Rueda Trasera Doble Rodado Dually -->
      <g class="wheel" transform="translate(262, 72)">
        <circle cx="0" cy="0" r="11.5" fill="#090d12" stroke="#1e293b" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="7.8" fill="url(#detF350Rim_${cleanId})" stroke="#0f172a" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="3.6" fill="#0f172a"/>
        <circle cx="0" cy="0" r="1.5" fill="#cbd5e1"/>
      </g>
    </svg>

    <div class="detail-capacity-badge">
      <span id="capacityValue">${capNum}%</span>
      <small>CARGA</small>
    </div>
  </div>`;
}

// -------------------------------------------------------------
// MOTOR DE MAPA INTERACTIVO GOOGLE MAPS / LEAFLET MÉXICO
// -------------------------------------------------------------

let realMapInstance = null;
let currentTileLayer = null;
let currentMapMarkers = [];
let currentPolyline = null;

const MAP_TILE_PROVIDERS = {
  google_roads: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: { maxZoom: 19, attribution: '© OpenStreetMap & Google Maps' }
  },
  google_sat: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    options: { maxZoom: 18, attribution: 'Esri Satellite & Maxar' }
  },
  carto_dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    options: { maxZoom: 19, attribution: '© CartoDB Dark Matter' }
  }
};

let activeLayerName = 'google_roads';

function initRealMap() {
  const mapContainer = document.getElementById('realLiveMap');
  if (!mapContainer || typeof L === 'undefined') return;

  if (realMapInstance) {
    realMapInstance.remove();
    realMapInstance = null;
  }

  // Initial center: Corredor Autopista 57 México-Querétaro
  realMapInstance = L.map('realLiveMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([20.3712, -99.9921], 8);

  setMapTileLayer(activeLayerName);

  // Bind layer switcher buttons
  document.querySelectorAll('.map-layer-selector button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.map-layer-selector button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const layerType = btn.dataset.layer;
      setMapTileLayer(layerType);
      showToast(`Capa de mapa: ${btn.textContent}`);
    });
  });

  // Bind map zoom controls
  document.getElementById('btnMapZoomIn')?.addEventListener('click', () => {
    if (realMapInstance) realMapInstance.zoomIn();
  });
  document.getElementById('btnMapZoomOut')?.addEventListener('click', () => {
    if (realMapInstance) realMapInstance.zoomOut();
  });
  document.getElementById('btnMapCenter')?.addEventListener('click', () => {
    const v = vehiclesData[currentVehicleId];
    if (realMapInstance && v && v.coords) {
      realMapInstance.flyTo(v.coords.current, 12, { duration: 1.2 });
      showToast(`Centrado en Ford F-350 (${v.id})`);
    }
  });

  // Update map with default active vehicle
  const initialV = vehiclesData[currentVehicleId];
  if (initialV) {
    updateRealMapForVehicle(initialV);
  }
}

function setMapTileLayer(layerName) {
  if (!realMapInstance || !MAP_TILE_PROVIDERS[layerName]) return;
  activeLayerName = layerName;

  if (currentTileLayer) {
    realMapInstance.removeLayer(currentTileLayer);
  }

  const provider = MAP_TILE_PROVIDERS[layerName];
  currentTileLayer = L.tileLayer(provider.url, provider.options).addTo(realMapInstance);
}

function updateRealMapForVehicle(vehicle) {
  if (!realMapInstance || !vehicle || !vehicle.coords) return;

  // Clear previous markers & polylines
  currentMapMarkers.forEach(m => realMapInstance.removeLayer(m));
  currentMapMarkers = [];
  if (currentPolyline) {
    realMapInstance.removeLayer(currentPolyline);
    currentPolyline = null;
  }

  const { origin, destination, current, highway, casetas, routePoints } = vehicle.coords;

  // 1. Draw Route Polyline
  if (routePoints && routePoints.length > 0) {
    currentPolyline = L.polyline(routePoints, {
      color: '#38bdf8',
      weight: 4.5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: null
    }).addTo(realMapInstance);
  }

  // 2. Custom HTML Icons
  // Origin Icon
  const originIcon = L.divIcon({
    className: 'custom-map-icon',
    html: `<div class="origin-map-pin" title="${vehicle.origin}"><span>O</span></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
  const originMarker = L.marker(origin, { icon: originIcon })
    .bindPopup(`<strong style="font-size:11px;">Origen: ${vehicle.origin}</strong><br><small style="color:#64748b;">Salida: ${vehicle.departureTime}</small>`)
    .addTo(realMapInstance);
  currentMapMarkers.push(originMarker);

  // Destination Icon
  const destIcon = L.divIcon({
    className: 'custom-map-icon',
    html: `<div class="dest-map-pin" title="${vehicle.destination}"><span>D</span></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
  const destMarker = L.marker(destination, { icon: destIcon })
    .bindPopup(`<strong style="font-size:11px;">Destino: ${vehicle.destination}</strong><br><small style="color:#64748b;">ETA: ${vehicle.eta}</small>`)
    .addTo(realMapInstance);
  currentMapMarkers.push(destMarker);

  // Casetas de Cobro Icons
  if (casetas && casetas.length > 0) {
    casetas.forEach(c => {
      const casetaIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `<div class="caseta-map-pin" title="${c.name}"><span>$</span></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      const casetaMarker = L.marker([c.lat, c.lng], { icon: casetaIcon })
        .bindPopup(`<strong style="font-size:10px; color:#f59e0b;">${c.name}</strong><br><small style="font-size:9px;">Peaje: ${c.cost} · Tag IAVE Activo</small>`)
        .addTo(realMapInstance);
      currentMapMarkers.push(casetaMarker);
    });
  }

  // 3. Live Ford F-350 Truck GPS Marker with Animated Radar Pulse
  const truckIcon = L.divIcon({
    className: 'custom-truck-icon',
    html: `
      <div class="truck-map-marker">
        <div class="truck-marker-pulse"></div>
        <div class="truck-marker-body">
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:#ffffff;stroke-width:2;">
            <rect x="1" y="3" width="15" height="13" rx="1"/>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  const truckMarker = L.marker(current, { icon: truckIcon, zIndexOffset: 1000 })
    .bindPopup(`
      <div style="font-family:'DM Sans',sans-serif; min-width:140px;">
        <strong style="color:#38bdf8; font-size:11px; display:block;">Ford F-350 · ${vehicle.id}</strong>
        <span style="font-size:9.5px; color:#94a3b8; display:block;">Velocidad: <b>${vehicle.speed}</b></span>
        <span style="font-size:9px; color:#cbd5e1; display:block; margin-top:2px;">Operador: ${vehicle.driver.name}</span>
        <span style="font-size:8.5px; color:#10b981; display:block; margin-top:2px;">● GPS Satelital Activo</span>
      </div>
    `)
    .addTo(realMapInstance);
  currentMapMarkers.push(truckMarker);

  // Smooth camera zoom/fly to route bounds
  if (currentPolyline) {
    realMapInstance.fitBounds(currentPolyline.getBounds(), {
      padding: [30, 30],
      maxZoom: 12,
      animate: true,
      duration: 1.0
    });
  } else {
    realMapInstance.flyTo(current, 10, { duration: 1.0 });
  }

  // Update HUD elements
  const hudHighway = document.getElementById('mapGpsHighway');
  if (hudHighway && highway) hudHighway.textContent = highway;

  const hudCoords = document.getElementById('mapGpsCoords');
  if (hudCoords && current) {
    hudCoords.textContent = `${current[0].toFixed(4)}° N, ${current[1].toFixed(4)}° W`;
  }

  // Update Direct Google Maps Navigation Link
  const btnGoogleMaps = document.getElementById('btnOpenGoogleMaps');
  if (btnGoogleMaps) {
    btnGoogleMaps.href = `https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}`;
  }
}

// -------------------------------------------------------------
// RENDERIZADO DINÁMICO DE PESTAÑAS DEL PANEL LATERAL
// -------------------------------------------------------------

function renderDetailTabs(vehicle) {
  const detailId = document.querySelector('#detailId');
  if (detailId) {
    detailId.innerHTML = `${vehicle.id} <span class="status ${vehicle.statusClass}"><i></i>${vehicle.statusText}</span>`;
  }

  // Tab 1: Envío
  const capText = document.querySelector('#capacityStatusText');
  if (capText) capText.textContent = `${vehicle.capacity}% ocupado`;
  
  const capIllustration = document.querySelector('#detailCapacityIllustration');
  if (capIllustration) capIllustration.innerHTML = generateDetailIllustration(vehicle);

  const routeTime = document.querySelector('#routeRemainingTime');
  if (routeTime) routeTime.textContent = vehicle.remainingTime;
  
  const routeKm = document.querySelector('#routeRemainingKm');
  if (routeKm) routeKm.textContent = vehicle.remainingKm;

  const [orig, dest] = vehicle.route.split('→').map(s => s.trim().toUpperCase());
  const mapOrigin = document.querySelector('#mapOrigin');
  const mapDest = document.querySelector('#mapDest');
  if (mapOrigin && orig) mapOrigin.textContent = orig;
  if (mapDest && dest) mapDest.textContent = dest;

  // Tab 2: Datos de unidad (Telemetría IoT)
  const tabVehicle = document.querySelector('#tab-vehicle');
  if (tabVehicle) {
    tabVehicle.innerHTML = `
      <div class="telemetry-card">
        <h4>Ficha de Telemetría IoT</h4>
        <div class="telemetry-grid">
          <div class="tel-item"><small>Placas SCT</small><strong>${vehicle.plates}</strong></div>
          <div class="tel-item"><small>Número VIN</small><strong>${vehicle.vin}</strong></div>
          <div class="tel-item"><small>Odómetro</small><strong>${vehicle.odometer}</strong></div>
          <div class="tel-item"><small>Velocidad GPS</small><strong>${vehicle.speed}</strong></div>
          <div class="tel-item"><small>Temp. Frenos</small><strong>${vehicle.tempBrakes}</strong></div>
          <div class="tel-item"><small>Presión Llantas</small><strong>${vehicle.tirePressure}</strong></div>
        </div>
        <div class="fuel-meter-container">
          <div style="display:flex; justify-content:space-between; font-size:8.5px; margin-top:8px;">
            <span>Nivel de Diésel (Tanque Principal)</span>
            <strong style="color:#38bdf8;">${vehicle.fuel}% Disponible</strong>
          </div>
          <div class="fuel-bar"><div class="fuel-fill" style="width:${vehicle.fuel}%;"></div></div>
        </div>
      </div>

      <div class="telemetry-card">
        <h4>Operador en Turno</h4>
        <div class="driver-profile-card">
          <div class="driver-avatar-badge">${vehicle.driver.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
          <div style="flex:1;">
            <strong style="color:#fff; font-size:11px;">${vehicle.driver.name}</strong>
            <small style="display:block; color:#94a3b8; font-size:8px;">${vehicle.driver.license}</small>
            <div style="display:flex; gap:10px; margin-top:4px; font-size:7.5px; color:#60a5fa;">
              <span>Tel: ${vehicle.driver.phone}</span>
              <span>Calif: ${vehicle.driver.rating}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Tab 3: Documentos Legales
  const tabDocs = document.querySelector('#tab-documents');
  if (tabDocs) {
    const docsHtml = vehicle.documents.map(doc => `
      <div class="doc-card">
        <div class="doc-info">
          <div class="doc-icon">PDF</div>
          <div>
            <strong>${doc.name}</strong>
            <small>Folio: ${doc.folio} · ${doc.type}</small>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="doc-status">${doc.status}</span>
          <button class="doc-action-btn" onclick="downloadDoc('${doc.name}', '${doc.folio}')">Descargar</button>
        </div>
      </div>
    `).join('');

    tabDocs.innerHTML = `
      <div style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
        <h4 style="font-size:10.5px; margin:0; color:#fff;">Expediente Digital del Embarque</h4>
        <button class="btn-sm" onclick="showToast('Sincronizando expedientes con SAT y SCT...')">Verificar SAT</button>
      </div>
      <div class="docs-list">${docsHtml}</div>
    `;
  }

  // Tab 4: Empresa
  const tabCompany = document.querySelector('#tab-company');
  if (tabCompany) {
    tabCompany.innerHTML = `
      <div class="company-card">
        <h3>Transportes PAVA México S.A. de C.V.</h3>
        <p style="color:#94a3b8; font-size:8px; margin:2px 0 10px;">Líder en Transporte Pesado y Logística de Cadena de Suministro</p>
        <div class="company-meta-item"><strong>RFC:</strong> TPM180422-9K1 · Régimen General de Ley</div>
        <div class="company-meta-item"><strong>Patio Base:</strong> Parque Industrial Monterrey-Apodaca, N.L.</div>
        <div class="company-meta-item"><strong>Mesa de Control 24/7:</strong> 800 7282 872 · trafico@pavatrack.mx</div>
        <div class="company-meta-item"><strong>Póliza Maestra Flotilla:</strong> Quálitas Compañía de Seguros (Póliza #88192-NAC)</div>
        <div style="margin-top:14px;">
          <strong style="font-size:8.5px; color:#cbd5e1; display:block; margin-bottom:4px;">Certificaciones Activas de Seguridad</strong>
          <div class="cert-badges-row">
            <span class="cert-badge">C-TPAT NIVEL 3</span>
            <span class="cert-badge">OEA SAT MÉXICO</span>
            <span class="cert-badge">ISO 9001:2015</span>
            <span class="cert-badge">AUTOTRANSPORTE FEDERAL SCT</span>
          </div>
        </div>
      </div>
    `;
  }

  // Tab 5: Facturación
  const tabBilling = document.querySelector('#tab-billing');
  if (tabBilling) {
    tabBilling.innerHTML = `
      <div class="billing-card">
        <div class="billing-total-box">
          <div>
            <small style="color:#94a3b8; font-size:7.5px; text-transform:uppercase;">Total Facturado Flete</small>
            <strong>${vehicle.billing.total}</strong>
          </div>
          <span class="pill-tag">${vehicle.billing.status.split('/')[0]}</span>
        </div>
        <table class="billing-table">
          <tr><td>Flete Base (Subtotal)</td><td>${vehicle.billing.subtotal}</td></tr>
          <tr><td>IVA Trasladado (16%)</td><td style="color:#38bdf8;">+${vehicle.billing.iva}</td></tr>
          <tr><td>Retención Fiscal Fletes SAT (4%)</td><td style="color:#f87171;">${vehicle.billing.retention}</td></tr>
          <tr style="border-top:1px solid #242a36;"><td style="padding-top:6px; font-weight:700;">Total Neto a Cobrar</td><td style="padding-top:6px; font-weight:700;">${vehicle.billing.total}</td></tr>
        </table>
        <div style="margin-top:10px;">
          <small style="color:#717c8d; font-size:7.5px; display:block; margin-bottom:3px;">Folio Fiscal UUID SAT (CFDI 4.0):</small>
          <div class="uuid-box">${vehicle.billing.uuid}</div>
        </div>
        <div style="margin-top:12px; display:flex; gap:6px;">
          <button class="btn-sm" style="flex:1;" onclick="showToast('Descargando XML timbrado...')">Descargar XML</button>
          <button class="btn-sm" style="flex:1;" onclick="showToast('Generando PDF factura fiscal...')">Imprimir PDF</button>
        </div>
      </div>
    `;
  }
}

// Global helper for document download
window.downloadDoc = function(name, folio) {
  showToast(`Descargando ${name} (${folio})...`);
};

// -------------------------------------------------------------
// INICIALIZACIÓN DE LA CUADRÍCULA DE FLOTA
// -------------------------------------------------------------

function renderFleetGrid(filter = 'all') {
  const grid = document.querySelector('#vehicleGrid');
  if (!grid) return;

  const entries = Object.values(vehiclesData);
  let visibleCount = 0;

  grid.innerHTML = entries.map(v => {
    let matches = true;
    if (filter === 'active') matches = v.status === 'On route' || v.status === 'Moving';
    if (filter === 'stopped') matches = v.status === 'Watching' || v.status === 'Delayed';

    if (!matches) return '';
    visibleCount++;

    const isSelected = v.id === currentVehicleId ? 'selected' : '';
    const svgCode = v.type === 'van' ? generateVanSvg(v.id, v.model, v.capacity) : generateTruckSvg(v.id, v.model, v.capacity);

    return `
      <article class="vehicle-card ${isSelected}" data-id="${v.id}" onclick="selectVehicle('${v.id}', true)">
        <div class="card-top">
          <span>${v.id}</span>
          <span class="status ${v.statusClass}"><i></i>${v.statusText}</span>
        </div>
        <div class="vehicle-meta">
          <span>${v.departureTime}</span>
          <span>${v.eta}</span>
          <span>${v.route}</span>
        </div>
        <div class="vehicle-visual" id="vis-${v.id}">
          ${svgCode}
        </div>
        <div class="card-footer">
          <span>${v.model}</span>
          <span>${v.capacity}% lleno</span>
        </div>
      </article>
    `;
  }).join('');

  const countEl = document.querySelector('#vehicleCount');
  if (countEl) countEl.textContent = String(visibleCount).padStart(2, '0');
}

function selectVehicle(id, triggerToast = true) {
  const vehicle = vehiclesData[id];
  if (!vehicle) return;

  currentVehicleId = id;

  document.querySelectorAll('.vehicle-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.id === id);
  });

  renderDetailTabs(vehicle);
  updateRealMapForVehicle(vehicle);

  if (triggerToast) {
    showToast(`Monitoreando unidad ${vehicle.id} (${vehicle.route})`);
  }
}

// -------------------------------------------------------------
// CHAT INTERACTIVO CON OPERADORES (CENTRO DE RADIO CB & TRÁFICO)
// -------------------------------------------------------------

const chatThreads = [
  {
    id: 'MX-752069247',
    driver: 'Juan Carlos Méndez',
    unit: 'MX-752069247',
    model: 'Freightliner Cascadia 2024',
    theme: 'freightliner',
    route: 'CDMX → Monterrey',
    speed: '85 km/h',
    location: 'Autopista 57D · Palmillas',
    lastMsg: 'Todo en orden base, pasando caseta Palmillas sin contratiempos.',
    time: '12:40',
    unread: 1,
    channel: 'CH-19 · 27.185 MHz',
    isAlert: false,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Base PAVA, reportando salida de patio Vallejo con sellos fiscales SAT intactos.', time: '02:40' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Enterado Juan Carlos. Velocidad crucero en autopista 57 es 85 km/h. Monitoreo satelital activo.', time: '02:42' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Todo en orden base, pasando caseta Palmillas sin contratiempos. Temperatura de termógrafo estable a 4°C.', time: '12:40' }
    ]
  },
  {
    id: 'MX-93633762',
    driver: 'Gabriel Soto Villalobos',
    unit: 'MX-93633762',
    model: 'Kenworth T680 2024',
    theme: 'kenworth',
    route: 'Manzanillo → Guadalajara',
    speed: '78 km/h',
    location: 'Colima · Caseta San Marcos',
    lastMsg: 'Custodia armada confirmada y posicionada en retén.',
    time: '11:15',
    unread: 1,
    channel: 'CH-14 · 27.125 MHz',
    isAlert: false,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Embarque de electrónica cargado en puerto Contecon Manzanillo. Sellos de seguridad verificados.', time: '05:30' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Custodia armada asignada con la patrulla PAVA-SEC-04. Punto de reunión en km 45.', time: '05:35' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Custodia armada confirmada y posicionada en retén. Iniciando ascenso hacia Guadalajara.', time: '11:15' }
    ]
  },
  {
    id: 'MX-916472621',
    driver: 'José Luis Cárdenas',
    unit: 'MX-916472621',
    model: 'International LT 2024',
    theme: 'international',
    route: 'Veracruz → Puebla',
    speed: '42 km/h',
    location: 'Cumbres de Maltrata (km 244)',
    lastMsg: 'Derrumbe parcial y niebla espesa en Cumbres, avance lento.',
    time: '10:05',
    unread: 2,
    channel: 'CH-21 · 27.215 MHz',
    isAlert: true,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Reportando paso por caseta de Fortín. Comienza lluvia moderada en la zona.', time: '08:45' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Derrumbe parcial y niebla espesa en Cumbres de Maltrata, avance lento a 40 km/h por seguridad.', time: '10:05' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Enterado José Luis. Notificado cliente BASF por ventana de entrega. Mantén distancia de frenado y luces intermitentes.', time: '10:08' }
    ]
  },
  {
    id: 'MX-752263347',
    driver: 'Roberto Garza Elizondo',
    unit: 'MX-752263347',
    model: 'Kenworth T680 2024',
    theme: 'kenworth',
    route: 'Monterrey → Nuevo Laredo',
    speed: '96 km/h',
    location: 'Autopista Monterrey-Laredo (km 160)',
    lastMsg: 'Ajustando velocidad a 85 km/h, viento fuerte en la recta.',
    time: '04:22',
    unread: 1,
    channel: 'CH-19 · 27.185 MHz',
    isAlert: true,
    messages: [
      { from: 'out', author: 'Base Central Tráfico', text: 'ALERTA TELEMETRÍA: Velocidad registrada en 96 km/h en autopista federal. Límite SCT es 90 km/h.', time: '04:20' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Copiado base, ajustando velocidad a 85 km/h. Mucho viento lateral en la recta de Sabinas.', time: '04:22' }
    ]
  },
  {
    id: 'MX-118134203',
    driver: 'Ernesto Valenzuela',
    unit: 'MX-118134203',
    model: 'Scania R 450 2024',
    theme: 'scania',
    route: 'Tijuana → Mexicali',
    speed: '65 km/h',
    location: 'La Rumorosa · Caseta El Hongo',
    lastMsg: 'Telepeaje IAVE validado en caseta. Todo en orden.',
    time: '01:58',
    unread: 0,
    channel: 'CH-11 · 27.085 MHz',
    isAlert: false,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Comenzando cruce de La Rumorosa con carga de maquinaria pesada.', time: '01:20' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Verifica temperatura de balatas y frenos de motor auxiliar.', time: '01:22' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Telepeaje IAVE validado en caseta El Hongo. Frenos a 115°C (Rango óptimo).', time: '01:58' }
    ]
  },
  {
    id: 'MX-118945307',
    driver: 'Mario Alberto Trejo',
    unit: 'MX-118945307',
    model: 'Renault Master 2024',
    theme: 'van',
    route: 'Querétaro → León',
    speed: '88 km/h',
    location: 'Puerto Interior Silao',
    lastMsg: 'Arribando a patio de descarga General Motors.',
    time: '03:15',
    unread: 0,
    channel: 'CH-09 · 27.065 MHz',
    isAlert: false,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Saliendo de CEDIS El Marqués con autopartes urgentes Just-In-Time.', time: '01:10' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Arribando a patio de descarga General Motors Complejo Silao. Entregando remesa.', time: '03:15' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Excelente tiempo de tránsito Mario. Favor de recabar firma electrónica de recibo.', time: '03:16' }
    ]
  }
];

let activeChatId = 'MX-752069247';
let currentChatFilter = 'all';
let chatSearchQuery = '';

function renderChatApp() {
  const threadsList = document.querySelector('#chatThreadsList');
  if (!threadsList) return;

  // Filter threads
  const filtered = chatThreads.filter(t => {
    let matchFilter = true;
    if (currentChatFilter === 'route') matchFilter = !t.isAlert;
    if (currentChatFilter === 'alert') matchFilter = t.isAlert;

    const q = chatSearchQuery.toLowerCase().trim();
    const matchSearch = !q || `${t.driver} ${t.unit} ${t.model} ${t.route} ${t.lastMsg}`.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  threadsList.innerHTML = filtered.map(t => {
    const initials = t.driver.split(' ').map(w => w[0]).slice(0, 2).join('');
    const isActive = t.id === activeChatId;

    return `
      <div class="chat-thread ${isActive ? 'active' : ''}" onclick="switchChatThread('${t.id}')">
        <div class="chat-thread-avatar ${t.theme}">
          ${initials}
          <i></i>
        </div>
        <div class="chat-thread-body">
          <div class="chat-thread-top">
            <strong>${t.driver}</strong>
            <span>${t.time}</span>
          </div>
          <span class="chat-thread-meta">${t.unit} · ${t.route}</span>
          <p class="chat-thread-msg">${t.lastMsg}</p>
        </div>
        ${t.unread > 0 ? `<span class="chat-thread-unread">${t.unread}</span>` : ''}
      </div>
    `;
  }).join('') || `<div style="padding:20px; text-align:center; color:#64748b; font-size:10px;">No se encontraron operadores</div>`;

  const activeThread = chatThreads.find(t => t.id === activeChatId) || chatThreads[0];
  const chatMain = document.querySelector('#chatMainPanel');
  if (!chatMain || !activeThread) return;

  const initials = activeThread.driver.split(' ').map(w => w[0]).slice(0, 2).join('');

  const msgsHtml = activeThread.messages.map(m => {
    const isOut = m.from === 'out';
    return `
      <div class="chat-msg-row ${m.from}">
        ${!isOut ? `<div class="chat-msg-avatar">${initials}</div>` : ''}
        <div class="chat-bubble ${m.from}">
          <div class="chat-bubble-author">
            <span>${m.author || (isOut ? 'Mesa de Tráfico' : activeThread.driver)}</span>
            <span>${isOut ? 'CENTRAL' : 'CABINA'}</span>
          </div>
          <div class="chat-bubble-text">${m.text}</div>
          <div class="chat-bubble-meta">
            <span>${m.time}</span>
            ${isOut ? '<span class="checkmarks"><svg viewBox="0 0 24 24" class="svg-icon-checks" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;display:inline-block;vertical-align:-2px;"><path d="m18 6-8.5 8.5-4-4"/><path d="m22 10-8.5 8.5-2.5-2.5"/></svg></span>' : ''}
          </div>
        </div>
        ${isOut ? `<div class="chat-msg-avatar" style="color:#60a5fa;">JG</div>` : ''}
      </div>
    `;
  }).join('');

  chatMain.innerHTML = `
    <!-- CHAT HEADER -->
    <div class="chat-header">
      <div class="chat-header-user">
        <div class="chat-header-avatar">
          ${initials}
          <i></i>
        </div>
        <div class="chat-header-details">
          <strong>${activeThread.driver} <span class="chat-cb-tag">${activeThread.channel}</span></strong>
          <small>Unidad <span>${activeThread.unit}</span> (${activeThread.model}) · ${activeThread.location} · <b>${activeThread.speed}</b></small>
        </div>
      </div>
      <div class="chat-header-actions">
        <button class="chat-call-btn" onclick="openCallModal('${activeThread.driver}', '${activeThread.unit} (${activeThread.model})')">
          <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;margin-right:4px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span>Llamar Cabina</span>
        </button>
        <button class="chat-icon-action" title="Rastrear unidad en mapa GPS" onclick="selectVehicle('${activeThread.id}'); switchView('tracking');">
          <svg viewBox="0 0 24 24" class="svg-icon" style="width:14px;height:14px;"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
        </button>
        <button class="chat-icon-action" title="Alerta de Carretera / SCT" onclick="showToast('Enviando alerta preventiva de tránsito a cabina...')">
          <svg viewBox="0 0 24 24" class="svg-icon" style="width:14px;height:14px;"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </button>
      </div>
    </div>

    <!-- QUICK DISPATCH SUGGESTIONS -->
    <div class="chat-quick-suggestions">
      <button class="chat-suggestion-chip" onclick="insertQuickMessage('Por favor confirma coordenadas GPS exactas y referencia de kilometraje.')">
        <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> <span>Solicitar GPS</span>
      </button>
      <button class="chat-suggestion-chip" onclick="insertQuickMessage('Favor de verificar sellos fiscales SAT intactos en ambas puertas.')">
        <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><polyline points="9 11 11 13 15 9"/></svg> <span>Verificar sellos SAT</span>
      </button>
      <button class="chat-suggestion-chip" onclick="insertQuickMessage('Alerta: Se reporta tráfico denso en caseta próxima. Reducir velocidad.')">
        <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;"><path d="m14 2 6 16H4L10 2h4Z"/><line x1="7.5" y1="13" x2="16.5" y2="13"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="2" y1="22" x2="22" y2="22"/></svg> <span>Alerta de tráfico</span>
      </button>
      <button class="chat-suggestion-chip" onclick="insertQuickMessage('Favor de reportar nivel de diésel y próxima parada programada.')">
        <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;"><path d="M3 22h12M4 4h10a2 2 0 0 1 2 2v16H4V6a2 2 0 0 1 0-2zm12 5h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/><line x1="7" y1="8" x2="11" y2="8"/><rect x="6" y="11" width="6" height="4" rx="1"/></svg> <span>Reporte de diésel</span>
      </button>
      <button class="chat-suggestion-chip" onclick="insertQuickMessage('Carta Porte timbrada y autorizada para el cruce.')">
        <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> <span>Carta Porte SAT</span>
      </button>
    </div>

    <!-- MESSAGES VIEWPORT -->
    <div class="chat-messages" id="chatMessagesContainer">
      <div class="chat-date-divider">
        <span>Hoy · Comunicaciones Satelitales Seguras</span>
      </div>
      ${msgsHtml}
    </div>

    <!-- INPUT BAR -->
    <form class="chat-input-bar" id="chatInputForm" onsubmit="sendMessage(event)">
      <button type="button" class="chat-tool-btn" title="Adjuntar documento o foto" onclick="simulateChatAttachment()">
        <svg viewBox="0 0 24 24" class="svg-icon"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </button>
      <button type="button" class="chat-tool-btn" title="Mensaje de voz Radio CB" onclick="simulateVoiceNote()">
        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
      </button>
      <div class="chat-input-wrapper">
        <input id="chatMsgInput" placeholder="Escribe a cabina del operador (ej. confirmar paso de caseta, cambio de ruta)..." autocomplete="off" />
      </div>
      <button type="submit" class="chat-send-btn">
        <span>Enviar</span> <svg viewBox="0 0 24 24" class="svg-icon" style="width:13px;height:13px;stroke-width:2;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </form>
  `;

  const container = document.querySelector('#chatMessagesContainer');
  if (container) container.scrollTop = container.scrollHeight;
}

window.switchChatThread = function(id) {
  activeChatId = id;
  const thread = chatThreads.find(t => t.id === id);
  if (thread) thread.unread = 0;
  renderChatApp();
};

window.insertQuickMessage = function(text) {
  const input = document.querySelector('#chatMsgInput');
  if (input) {
    input.value = text;
    input.focus();
  }
};

window.simulateChatAttachment = function() {
  const thread = chatThreads.find(t => t.id === activeChatId);
  if (!thread) return;

  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  thread.messages.push({
    from: 'out',
    author: 'Base Central Tráfico',
    text: '<svg viewBox="0 0 24 24" class="svg-icon" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;stroke:currentColor;"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg> <strong>Documento Adjunto:</strong> Complemento Carta Porte SAT CFDI 4.0 (Folio: CP-2024-' + thread.id + ').pdf',
    time: timeStr
  });
  thread.lastMsg = 'Documento Carta Porte enviado';
  renderChatApp();
  showToast(`Carta Porte enviada a la cabina de ${thread.driver}`);
};

window.simulateVoiceNote = function() {
  const thread = chatThreads.find(t => t.id === activeChatId);
  if (!thread) return;

  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  thread.messages.push({
    from: 'out',
    author: 'Base Central Tráfico',
    text: '<svg viewBox="0 0 24 24" class="svg-icon" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;stroke:currentColor;"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg> <strong>Audio Radio CB (0:12):</strong> <svg viewBox="0 0 24 24" class="svg-icon" style="width:11px;height:11px;display:inline-block;vertical-align:-1px;fill:currentColor;"><polygon points="5 3 19 12 5 21 5 3"/></svg> ılııııııııııııııııııı 0:12 · Transmisión de voz encriptada',
    time: timeStr
  });
  thread.lastMsg = 'Nota de voz Radio CB';
  renderChatApp();
  showToast(`Nota de voz transmitida por canal CB a ${thread.driver}`);
};

window.sendMessage = function(e) {
  e.preventDefault();
  const input = document.querySelector('#chatMsgInput');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  const thread = chatThreads.find(t => t.id === activeChatId);
  if (thread) {
    thread.messages.push({ from: 'out', author: 'Base Central Tráfico', text, time: timeStr });
    thread.lastMsg = text;
    input.value = '';
    renderChatApp();

    // Auto-reply simulator from driver after 1.2s
    setTimeout(() => {
      const replies = [
        'Enterado base PAVA, copiado y confirmado al 100.',
        'Recibido central, avanzando sin novedad y monitoreando presión de neumáticos.',
        'Enterado, reporto posición exacta al cruzar la siguiente caseta de CAPUFE.',
        'Copiado base, todo en orden en cabina con sellos intactos.',
        'Recibido tráfico, reduciendo velocidad preventiva a 75 km/h.',
        'Enterado base, termógrafo marcando temperatura programada sin variaciones.'
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const rTime = String(new Date().getHours()).padStart(2, '0') + ':' + String(new Date().getMinutes()).padStart(2, '0');
      thread.messages.push({ from: 'in', author: 'Operador (Cabina)', text: reply, time: rTime });
      thread.lastMsg = reply;
      renderChatApp();
      showToast(`Nuevo mensaje de cabina: ${thread.driver}`);
    }, 1300);
  }
};

// Chat filter inputs and tabs
document.querySelector('#chatFilterInput')?.addEventListener('input', (e) => {
  chatSearchQuery = e.target.value;
  renderChatApp();
});

document.querySelectorAll('#chatFilterTabs .chat-filter-pill')?.forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('#chatFilterTabs .chat-filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentChatFilter = pill.dataset.filter || 'all';
    renderChatApp();
  });
});

// -------------------------------------------------------------
// RENDERIZADO DE TABLAS Y VISTAS DE SOLICITUDES / SOCIOS
// -------------------------------------------------------------

function renderSociosView() {
  const grid = document.querySelector('#partnersGrid');
  if (!grid) return;

  const partners = [
    { name: 'Grupo Bimbo S.A.B. de C.V.', rfc: 'BIM010419-8A1', activeRoutes: '14 Rutas', contract: 'Vigente hasta 2026', credit: '$4,500,000 MXN', rating: '5.0 ★' },
    { name: 'Fomento Económico Mexicano (FEMSA)', rfc: 'FEM980211-7H2', activeRoutes: '22 Rutas', contract: 'Vigente hasta 2027', credit: '$8,000,000 MXN', rating: '4.9 ★' },
    { name: 'Walmart de México y Centroamérica', rfc: 'WMM920401-KJ9', activeRoutes: '19 Rutas', contract: 'Vigente hasta 2025', credit: '$6,200,000 MXN', rating: '4.9 ★' },
    { name: 'Ternium México S.A. de C.V.', rfc: 'TME050912-1K8', activeRoutes: '8 Rutas Acero', contract: 'Vigente hasta 2026', credit: '$5,000,000 MXN', rating: '4.8 ★' },
    { name: 'Mercado Libre Logística México', rfc: 'MLM140810-9Y3', activeRoutes: '12 Rutas Express', contract: 'Vigente hasta 2028', credit: '$3,800,000 MXN', rating: '5.0 ★' },
    { name: 'General Motors de México', rfc: 'GMM650101-PL0', activeRoutes: '6 Rutas Just-In-Time', contract: 'Vigente hasta 2026', credit: '$7,500,000 MXN', rating: '4.9 ★' }
  ];

  grid.innerHTML = partners.map(p => `
    <div class="partner-card">
      <div class="partner-header">
        <div class="partner-logo">${p.name.substring(0,2).toUpperCase()}</div>
        <div>
          <strong>${p.name}</strong>
          <small>RFC: ${p.rfc}</small>
        </div>
      </div>
      <div style="font-size:8.5px; color:#94a3b8; margin-bottom:8px;">
        <div>• ${p.activeRoutes} asignadas</div>
        <div>• Línea de crédito: ${p.credit}</div>
        <div>• Contrato: <span style="color:#34d399;">${p.contract}</span></div>
      </div>
      <button class="btn-sm" style="width:100%;" onclick="showToast('Abriendo contratos de ${p.name}...')">Ver Embarques y Contratos</button>
    </div>
  `).join('');
}

function renderTables() {
  // Tabla Camiones
  const trucksTbl = document.querySelector('#trucksTableContainer');
  if (trucksTbl) {
    trucksTbl.innerHTML = `
      <table class="pava-table">
        <thead>
          <tr>
            <th>Unidad</th><th>Modelo</th><th>Placas SCT</th><th>Odómetro</th><th>Motor</th><th>Estatus</th><th>Acción</th>
          </tr>
        </thead>
        <tbody>
          ${Object.values(vehiclesData).map(v => `
            <tr>
              <td><strong>${v.id}</strong></td>
              <td>${v.model}</td>
              <td>${v.plates}</td>
              <td>${v.odometer}</td>
              <td>${v.engine}</td>
              <td><span class="status ${v.statusClass}"><i></i>${v.statusText}</span></td>
              <td><button class="btn-sm" onclick="selectVehicle('${v.id}'); switchView('tracking');">Rastrear</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Tabla Carga
  const cargoTbl = document.querySelector('#cargoTableContainer');
  if (cargoTbl) {
    cargoTbl.innerHTML = `
      <table class="pava-table">
        <thead>
          <tr>
            <th>Unidad</th><th>Mercancía</th><th>Peso Bruto</th><th>Sello Fiscal</th><th>Cliente</th><th>Valor Declarado</th>
          </tr>
        </thead>
        <tbody>
          ${Object.values(vehiclesData).map(v => `
            <tr>
              <td><strong>${v.id}</strong></td>
              <td>${v.cargo.type}</td>
              <td>${v.cargo.weight}</td>
              <td><span style="font-family:monospace; color:#38bdf8;">${v.cargo.sealNumber}</span></td>
              <td>${v.cargo.client}</td>
              <td>${v.cargo.declaredValue}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Tabla Reportes
  const repTbl = document.querySelector('#reportsTableContainer');
  if (repTbl) {
    repTbl.innerHTML = `
      <table class="pava-table">
        <thead>
          <tr>
            <th>Folio</th><th>Unidad</th><th>Tipo de Incidencia</th><th>Corredor Carretero</th><th>Severidad</th><th>Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>REP-8819</strong></td><td>MX-916472621</td><td>Retraso por obras y derrumbe</td><td>Cumbres de Maltrata (Veracruz-Puebla)</td><td><span style="color:#f59e0b; font-weight:700;">Media</span></td><td>02:20 CST</td></tr>
          <tr><td><strong>REP-8820</strong></td><td>MX-752263347</td><td>Alerta preventiva de velocidad 96 km/h</td><td>Autopista Monterrey-Laredo</td><td><span style="color:#ef4444; font-weight:700;">Alta</span></td><td>04:20 CST</td></tr>
          <tr><td><strong>REP-8821</strong></td><td>MX-118134203</td><td>Paso de aduana y caseta validado</td><td>La Rumorosa (Tijuana-Mexicali)</td><td><span style="color:#10b981; font-weight:700;">Informativa</span></td><td>01:55 CST</td></tr>
        </tbody>
      </table>
    `;
  }

  // Tabla Operadores
  const opTbl = document.querySelector('#operatorsTableContainer');
  if (opTbl) {
    opTbl.innerHTML = `
      <table class="pava-table">
        <thead>
          <tr>
            <th>Operador</th><th>Unidad</th><th>Licencia Federal</th><th>Vigencia Médica</th><th>Viajes</th><th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          ${Object.values(vehiclesData).map(v => `
            <tr>
              <td><strong>${v.driver.name}</strong></td>
              <td>${v.id}</td>
              <td>${v.driver.license}</td>
              <td><span style="color:#34d399;">${v.driver.medicalExp}</span></td>
              <td>${v.driver.trips}</td>
              <td style="color:#f59e0b; font-weight:700;">${v.driver.rating}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Tabla Historial
  const histTbl = document.querySelector('#historyTableContainer');
  if (histTbl) {
    histTbl.innerHTML = `
      <table class="pava-table">
        <thead>
          <tr>
            <th>Folio Viaje</th><th>Ruta Completada</th><th>Tractocamión</th><th>Operador</th><th>Fecha Entrega</th><th>Flete Total</th><th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>VIAJE-MX-4412</strong></td><td>Guadalajara → Monterrey</td><td>MX-752069247</td><td>Juan Carlos Méndez</td><td>06 Sep 2024</td><td>$42,800.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
          <tr><td><strong>VIAJE-MX-4411</strong></td><td>CDMX → Veracruz Puerto</td><td>MX-93633762</td><td>Gabriel Soto</td><td>05 Sep 2024</td><td>$26,400.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
          <tr><td><strong>VIAJE-MX-4410</strong></td><td>Monterrey → Altamira</td><td>MX-752263347</td><td>Raúl Mendoza</td><td>04 Sep 2024</td><td>$34,100.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
          <tr><td><strong>VIAJE-MX-4409</strong></td><td>Toluca → San Luis Potosí</td><td>MX-118945307</td><td>Mario Trejo</td><td>03 Sep 2024</td><td>$19,500.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
        </tbody>
      </table>
    `;
  }
}

// -------------------------------------------------------------
// NAVEGACIÓN PRINCIPAL (SIDEBAR VIEWS)
// -------------------------------------------------------------

function switchView(viewName) {
  const appShell = document.querySelector('.app-shell');
  if (appShell) {
    if (viewName === 'tracking') {
      appShell.classList.remove('hide-details');
      setTimeout(() => {
        if (realMapInstance) realMapInstance.invalidateSize();
      }, 120);
    } else {
      appShell.classList.add('hide-details');
    }
  }

  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });
  const groupedRequestViews = ['camiones', 'carga', 'reportes', 'operadores'];
  document.querySelector('.nav-group-btn')?.classList.toggle(
    'active',
    window.matchMedia('(max-width: 900px)').matches && groupedRequestViews.includes(viewName)
  );
  document.querySelectorAll('.sub-item').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });

  document.querySelectorAll('.view-content').forEach(v => {
    v.classList.remove('active');
  });

  const targetView = document.querySelector(`#view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update topbar titles
  const titleEl = document.querySelector('#topbarTitle');
  const eyebrowEl = document.querySelector('#topbarEyebrow');
  
  const titles = {
    'tracking': { title: 'Rastreo', eye: 'Operaciones / Flota en vivo' },
    'dashboard': { title: 'Dashboard General', eye: 'Métricas / Indicadores Clave' },
    'chats': { title: 'Comunicaciones de Tráfico', eye: 'Cabina / Mensajería en Vivo' },
    'socios': { title: 'Socios Comerciales', eye: 'Directorio / Cuentas Clave' },
    'camiones': { title: 'Parque Vehicular', eye: 'Activos / Tractos y Cajas' },
    'carga': { title: 'Manifiestos de Carga', eye: 'Inventario en Tránsito' },
    'reportes': { title: 'Reportes de Incidencias', eye: 'Seguridad / Auditoría' },
    'operadores': { title: 'Padrón de Operadores', eye: 'Recursos Humanos / SCT' },
    'analitica': { title: 'Analítica de Rendimiento', eye: 'Eficiencia / Combustible' },
    'historial': { title: 'Historial de Despachos', eye: 'Bitácora / Auditoría' }
  };

  if (titles[viewName] && titleEl && eyebrowEl) {
    titleEl.innerHTML = `${titles[viewName].title} <span class="live-dot"></span>`;
    eyebrowEl.textContent = titles[viewName].eye;
  }

  if (viewName === 'chats') renderChatApp();
  if (viewName === 'socios') renderSociosView();
  if (['camiones', 'carga', 'reportes', 'operadores', 'historial'].includes(viewName)) renderTables();

  if (['camiones', 'carga', 'reportes', 'operadores'].includes(viewName)) {
    document.querySelector('.nav-group')?.classList.add('open');
  }

  const workspace = document.querySelector('.workspace');
  if (workspace) workspace.scrollTop = 0;
}

document.querySelectorAll('.nav-item[data-view], .sub-item[data-view]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const view = btn.dataset.view;
    if (view) switchView(view);
  });
});

document.querySelector('.nav-group-btn')?.addEventListener('click', () => {
  if (window.matchMedia('(max-width: 900px)').matches) {
    switchView('camiones');
    return;
  }

  document.querySelector('.nav-group')?.classList.toggle('open');
});

// -------------------------------------------------------------
// PESTAÑAS DEL PANEL LATERAL (DETAIL TABS)
// -------------------------------------------------------------

document.querySelectorAll('#detailTabsNav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#detailTabsNav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentActiveTab = btn.dataset.tab;

    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const targetPane = document.querySelector(`#tab-${currentActiveTab}`);
    if (targetPane) targetPane.classList.add('active');

    showToast(`Pestaña ${btn.textContent} activa`);
  });
});

// -------------------------------------------------------------
// MODALES Y ACCIONES INTERACTIVAS
// -------------------------------------------------------------

// Modal 1: Nueva Solicitud
const modalNewReq = document.querySelector('#modalNewRequest');
document.querySelector('#btnOpenNewRequest')?.addEventListener('click', () => {
  modalNewReq?.classList.add('show');
});
document.querySelector('#btnCloseNewRequest')?.addEventListener('click', () => {
  modalNewReq?.classList.remove('show');
});
document.querySelector('#btnCancelNewRequest')?.addEventListener('click', () => {
  modalNewReq?.classList.remove('show');
});

document.querySelector('#formNewRequest')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const origin = document.querySelector('#reqOrigin')?.value || 'CDMX';
  const dest = document.querySelector('#reqDest')?.value || 'Monterrey';
  const model = document.querySelector('#reqModel')?.value || 'Kenworth T680';
  const capacity = Number(document.querySelector('#reqCapacity')?.value) || 75;
  const driver = document.querySelector('#reqDriver')?.value || 'Operador PAVA';
  const cargo = document.querySelector('#reqCargo')?.value || 'Carga General';

  const newId = 'MX-' + Math.floor(10000000 + Math.random() * 90000000);
  const isVan = model.includes('Sprinter') || model.includes('Master');

  vehiclesData[newId] = {
    id: newId,
    model: model + ' 2024',
    type: isVan ? 'van' : 'truck',
    route: `${origin} → ${dest}`,
    origin: origin,
    destination: dest,
    corridor: 'Corredor Nacional Asignado',
    status: 'On route',
    statusText: 'En ruta',
    statusClass: 'onroute',
    capacity: capacity,
    eta: '06h 30m',
    departureTime: 'Ahora',
    remainingTime: '06:30:00',
    remainingKm: '420 km restantes',
    speed: '80 km/h',
    fuel: 95,
    odometer: '12,400 km',
    plates: '99-ZZ-1A (SCT)',
    vin: '3AKJ' + Math.floor(1000000000 + Math.random() * 9000000000),
    engine: 'Motor Turbo Diésel 2024',
    tempBrakes: '100 °C',
    tirePressure: '110 PSI',
    driver: {
      name: driver,
      phone: '+52 55 ' + Math.floor(10000000 + Math.random() * 90000000),
      license: 'Licencia Federal Tipo B',
      licenseExp: '10/Dic/2027',
      medicalExp: 'Vigente',
      rating: '5.0 ★',
      trips: 1
    },
    cargo: {
      type: cargo,
      weight: '22.0 Toneladas',
      pallets: '24 Tarimas',
      sealNumber: 'SAT-MX-' + Math.floor(100000 + Math.random() * 900000),
      tempReefer: 'Seco',
      client: 'Cliente General PAVA',
      declaredValue: '$1,500,000.00 MXN'
    },
    billing: {
      subtotal: '$35,000.00',
      iva: '$5,600.00',
      retention: '-$1,400.00',
      total: '$39,200.00 MXN',
      status: 'Timbrado SAT / Despachado',
      uuid: 'UUID-' + Math.floor(1000000 + Math.random() * 9000000),
      invoiceDate: 'Hoy'
    },
    documents: [
      { name: 'Carta Porte CFDI 4.0', type: 'PDF / XML', folio: 'CP-NEW-' + newId, status: 'Timbrado SAT' }
    ]
  };

  modalNewReq?.classList.remove('show');
  switchView('tracking');
  renderFleetGrid('all');
  selectVehicle(newId, true);
  showToast(`¡Unidad ${newId} despachada con éxito (${origin} → ${dest})!`);
});

// Modal 2: Llamada telefónica / cabina
const modalCall = document.querySelector('#modalCallDriver');
let callInterval;
let callSeconds = 0;

window.openCallModal = function(name, unit) {
  if (!modalCall) return;
  document.querySelector('#callDriverName').textContent = name;
  document.querySelector('#callDriverUnit').textContent = unit;
  modalCall.classList.add('show');

  callSeconds = 0;
  clearInterval(callInterval);
  callInterval = setInterval(() => {
    callSeconds++;
    const min = String(Math.floor(callSeconds / 60)).padStart(2, '0');
    const sec = String(callSeconds % 60).padStart(2, '0');
    document.querySelector('#callTimerText').textContent = `${min}:${sec}`;
  }, 1000);

  showToast(`Conectando llamada por radio satelital con ${name}...`);
};

document.querySelector('#btnCallDriver')?.addEventListener('click', () => {
  const v = vehiclesData[currentVehicleId];
  if (v) openCallModal(v.driver.name, `Unidad ${v.id} (${v.model})`);
});

document.querySelector('#btnChatDriver')?.addEventListener('click', () => {
  switchView('chats');
  switchChatThread(currentVehicleId);
});

document.querySelector('#btnCallHangup')?.addEventListener('click', () => {
  clearInterval(callInterval);
  modalCall?.classList.remove('show');
  showToast('Llamada finalizada');
});

document.querySelector('#btnCallMute')?.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
  showToast(e.currentTarget.classList.contains('active') ? 'Micrófono silenciado' : 'Micrófono activo');
});

document.querySelector('#btnCallSpeaker')?.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
  showToast(e.currentTarget.classList.contains('active') ? 'Altavoz activado' : 'Altavoz normal');
});

// Modal 3: Visor de Fotos de Carga
const modalPhoto = document.querySelector('#modalPhotoViewer');
document.querySelectorAll('#cargoPhotoGallery .photo').forEach(p => {
  p.addEventListener('click', () => {
    const v = vehiclesData[currentVehicleId];
    if (modalPhoto && v) {
      document.querySelector('#photoUnitMeta').textContent = v.id;
      document.querySelector('#photoSealMeta').textContent = v.cargo.sealNumber;
      document.querySelector('#photoDriverMeta').textContent = v.driver.name;
      modalPhoto.classList.add('show');
      showToast('Inspeccionando evidencia fotográfica y sello fiscal SAT');
    }
  });
});
document.querySelector('#btnClosePhotoViewer')?.addEventListener('click', () => {
  modalPhoto?.classList.remove('show');
});
document.querySelector('#btnViewAllPhotos')?.addEventListener('click', () => {
  modalPhoto?.classList.add('show');
});
document.querySelector('#btnRequestPhoto')?.addEventListener('click', () => {
  showToast('Solicitud enviada a la cabina del operador para toma de foto');
});

// Modal 4: Cambiar Ruta
const modalRoute = document.querySelector('#modalChangeRoute');
document.querySelector('#btnChangeRoute')?.addEventListener('click', () => {
  modalRoute?.classList.add('show');
});
document.querySelector('#btnCloseChangeRoute')?.addEventListener('click', () => {
  modalRoute?.classList.remove('show');
});
document.querySelector('#btnCancelChangeRoute')?.addEventListener('click', () => {
  modalRoute?.classList.remove('show');
});
document.querySelectorAll('.route-option-card').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.route-option-card').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    const radio = c.querySelector('input');
    if (radio) radio.checked = true;
  });
});
document.querySelector('#btnApplyChangeRoute')?.addEventListener('click', () => {
  modalRoute?.classList.remove('show');
  showToast('Ruta recalculada y enviada al GPS de la unidad.');
});

// Map Zoom & Center Controls
let mapZoom = 1;
document.querySelector('#btnMapZoomIn')?.addEventListener('click', () => {
  mapZoom = Math.min(1.8, mapZoom + 0.2);
  const grid = document.querySelector('#mapGridEl');
  if (grid) grid.style.transform = `scale(${mapZoom})`;
  showToast(`Mapa: Zoom ${Math.round(mapZoom * 100)}%`);
});
document.querySelector('#btnMapZoomOut')?.addEventListener('click', () => {
  mapZoom = Math.max(0.8, mapZoom - 0.2);
  const grid = document.querySelector('#mapGridEl');
  if (grid) grid.style.transform = `scale(${mapZoom})`;
  showToast(`Mapa: Zoom ${Math.round(mapZoom * 100)}%`);
});
document.querySelector('#btnMapCenter')?.addEventListener('click', () => {
  mapZoom = 1;
  const grid = document.querySelector('#mapGridEl');
  if (grid) grid.style.transform = 'scale(1)';
  showToast('Mapa: Centrado en coordenadas GPS del tractocamión');
});

// Search input
document.querySelector('#searchInput')?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.vehicle-card').forEach(card => {
    const v = vehiclesData[card.dataset.id];
    if (!v) return;
    const match = !q || `${v.id} ${v.route} ${v.model} ${v.driver.name} ${v.cargo.type}`.toLowerCase().includes(q);
    card.style.display = match ? 'flex' : 'none';
  });
});

// Fleet filter segment
document.querySelectorAll('#fleetFilterSegment button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#fleetFilterSegment button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    renderFleetGrid(btn.dataset.filter);
    showToast(`Filtrando por: ${btn.textContent.trim().split(' ')[0]}`);
  });
});

// Theme Toggle
document.querySelector('.theme-toggle')?.addEventListener('click', (event) => {
  body.classList.toggle('light');
  const light = body.classList.contains('light');
  const btn = event.currentTarget;
  if (light) {
    btn.innerHTML = '<svg viewBox="0 0 24 24" class="svg-icon theme-moon" id="topThemeIcon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('aria-label', 'Activar modo oscuro');
  } else {
    btn.innerHTML = '<svg viewBox="0 0 24 24" class="svg-icon theme-sun" id="topThemeIcon"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    btn.setAttribute('aria-label', 'Activar modo claro');
  }
  showToast(light ? 'Modo claro activado' : 'Modo oscuro activado');
});

// Quick sidebar and header buttons
document.querySelector('#btnQuickNotifs')?.addEventListener('click', () => showToast('3 Notificaciones de tráfico activas'));
document.querySelector('#btnQuickSettings')?.addEventListener('click', () => showToast('Ajustes de sistema y telemetría PAVA Track'));
document.querySelector('#btnQuickHelp')?.addEventListener('click', () => showToast('Mesa de control 24/7: 800-7282-872 · Soporte SAT/SCT'));
document.querySelector('#btnQuickMore')?.addEventListener('click', () => showToast('Herramientas de auditoría y sincronización de cartas porte'));
document.querySelector('#userMenuTrigger')?.addEventListener('click', () => showToast('Sesión activa: Javier Gonzalez (Jefe de Tráfico México)'));
document.querySelector('#topNotifBtn')?.addEventListener('click', () => showToast('Notificaciones: 3 alertas de ruta pendientes'));
document.querySelector('#btnAdvancedFilters')?.addEventListener('click', () => showToast('Filtros avanzados por corredor y tipo de unidad'));
document.querySelector('#btnRequestsMore')?.addEventListener('click', () => showToast('Opciones de solicitud de despacho'));

// Extra Action buttons
document.querySelector('#btnReviewRequest')?.addEventListener('click', () => {
  showToast('Solicitud de tráfico aprobada y sincronizada con el cliente');
});
document.querySelector('#btnClearAlerts')?.addEventListener('click', () => {
  showToast('Todas las alertas marcadas como atendidas');
});
document.querySelector('#btnExportHistory')?.addEventListener('click', () => {
  showToast('Exportando historial completo en formato Excel (.xlsx)...');
});
document.querySelector('#btnNewPartner')?.addEventListener('click', () => {
  showToast('Formulario de registro de cliente / socio activado');
});
document.querySelector('#btnNewTruckAsset')?.addEventListener('click', () => {
  document.querySelector('#modalNewRequest')?.classList.add('show');
});
document.querySelector('#btnNewCargoManifest')?.addEventListener('click', () => {
  document.querySelector('#modalNewRequest')?.classList.add('show');
});
document.querySelector('#btnGenerateReport')?.addEventListener('click', () => {
  showToast('Generando reporte consolidado de incidencias en PDF...');
});
document.querySelector('#btnNewOperator')?.addEventListener('click', () => {
  showToast('Abriendo alta de operador y verificación de licencia SCT...');
});

// -------------------------------------------------------------
// INICIALIZACIÓN GLOBAL
// -------------------------------------------------------------
renderFleetGrid('all');
initRealMap();
selectVehicle('MX-752069247', false);
switchView('tracking');
renderTables();
renderSociosView();
console.log('PAVA Track - Inicializado con éxito');
