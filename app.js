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
// BASE DE DATOS DE UNIDADES Y EMBARQUES (FLOTA 3.5T FORD F-350)
// CON COORDENADAS GPS REALES Y RUTAS CARRETERAS EN MÉXICO
// -------------------------------------------------------------
const vehiclesData = {
  'MX-752069247': {
    id: 'MX-752069247',
    model: 'Ford F-350 Super Duty 2024',
    type: 'truck',
    route: 'CDMX → Monterrey',
    origin: 'CDMX (Vallejo)',
    destination: 'Monterrey (Apodaca)',
    corridor: 'México 57 (Troncal Nacional)',
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
    odometer: '42,850 km',
    plates: '72-AB-9F (SCT Carga 3.5T)',
    vin: '1FT8W3BT5PEB82910',
    engine: '6.7L Power Stroke V8 Turbo Diésel 330 HP · TorqShift 10 vel.',
    tempBrakes: '98 °C (Normal)',
    tirePressure: '80 PSI (Calibración Óptima)',
    coords: {
      origin: { lat: 19.4978, lng: -99.1678, name: 'CDMX (Vallejo)' },
      current: { lat: 20.3712, lng: -99.9921, name: 'Autopista 57D · Palmillas, QRO', highway: 'Autopista 57D (México - Querétaro)', km: 'KM 148', text: '20.3712° N, -99.9921° W' },
      destination: { lat: 25.7785, lng: -100.1870, name: 'Monterrey (Apodaca)' },
      casetas: [
        { lat: 19.7042, lng: -99.2312, name: 'Caseta Tepotzotlán' },
        { lat: 20.3712, lng: -99.9921, name: 'Caseta Palmillas' },
        { lat: 21.9821, lng: -100.8912, name: 'Caseta San Luis' }
      ],
      routePoints: [
        [19.4978, -99.1678], [19.6012, -99.1840], [19.7042, -99.2312], [19.9821, -99.5210],
        [20.3712, -99.9921], [20.5880, -100.3890], [21.1619, -100.9312], [22.1565, -100.9855],
        [23.6492, -100.6441], [25.4232, -101.0053], [25.6866, -100.3161], [25.7785, -100.1870]
      ]
    },
    driver: {
      name: 'Juan Carlos Méndez',
      phone: '+52 55 4192 8831',
      license: 'Lic. Federal Tipo B (Carga 3.5T)',
      licenseExp: '14/Nov/2027',
      medicalExp: 'Vigente (Apto)',
      rating: '4.9 ★',
      trips: 412
    },
    cargo: {
      type: 'Abarrotes y Paquetería Regional',
      weight: '3.4 Toneladas',
      pallets: '6 Tarimas',
      sealNumber: 'SAT-MX-883921',
      tempReefer: 'Caja Seca 14ft con Copete',
      client: 'Grupo Femsa / Oxxo Logística',
      declaredValue: '$680,000.00 MXN'
    },
    billing: {
      subtotal: '$18,500.00',
      iva: '$2,960.00',
      retention: '-$740.00',
      total: '$20,720.00 MXN',
      status: 'Timbrado SAT / Crédito 30 días',
      uuid: '8B4F2A19-92C1-4D3E-A591-D18293C89B1A',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte Digital CFDI 4.0', type: 'PDF / XML', folio: 'CP-2024-88492', status: 'Timbrado SAT' },
      { name: 'Póliza de Seguro de Carga GNP', type: 'PDF Oficial', folio: 'POL-GNP-772910', status: 'Vigente' },
      { name: 'Dictamen Físico-Mecánica NOM-068', type: 'SCT Aprobado', folio: 'SCT-FM-2024-09', status: 'Vigente' },
      { name: 'Verificación Ambiental de Humos', type: 'Holograma 00', folio: 'VERIF-2024-B', status: 'Vigente' }
    ]
  },
  'MX-93633762': {
    id: 'MX-93633762',
    model: 'Ford F-350 Chasis Cabina 2023',
    type: 'truck',
    route: 'Manzanillo → Guadalajara',
    origin: 'Manzanillo (Puerto Contecon)',
    destination: 'Guadalajara (El Salto)',
    corridor: 'Corredor Pacífico Puerto',
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
    odometer: '58,420 km',
    plates: '91-BA-3K (SCT 3.5T)',
    vin: '1FT8W3B68PEC48190',
    engine: '6.2L V8 Gasolina 385 HP · TorqShift 6 vel.',
    tempBrakes: '105 °C (Normal)',
    tirePressure: '80 PSI (Óptimo)',
    coords: {
      origin: { lat: 19.0544, lng: -104.3160, name: 'Manzanillo (Contecon)' },
      current: { lat: 19.4215, lng: -103.5820, name: 'Autopista Colima-Guadalajara · San Marcos', highway: 'Autopista 54D (Colima - Guadalajara)', km: 'KM 94', text: '19.4215° N, -103.5820° W' },
      destination: { lat: 20.5180, lng: -103.2960, name: 'Guadalajara (El Salto)' },
      casetas: [
        { lat: 19.1820, lng: -103.9510, name: 'Caseta Cuyutlán' },
        { lat: 19.4215, lng: -103.5820, name: 'Caseta San Marcos' }
      ],
      routePoints: [
        [19.0544, -104.3160], [18.9140, -103.8750], [19.1820, -103.9510], [19.2433, -103.7240],
        [19.4215, -103.5820], [19.7820, -103.5410], [20.2540, -103.4890], [20.5180, -103.2960]
      ]
    },
    driver: {
      name: 'Gabriel Soto Villalobos',
      phone: '+52 33 1892 4490',
      license: 'Lic. Federal Tipo B (Carga General)',
      licenseExp: '20/Ene/2026',
      medicalExp: 'Vigente',
      rating: '4.8 ★',
      trips: 340
    },
    cargo: {
      type: 'Electrónicos y Envíos Express de Puerto',
      weight: '2.9 Toneladas',
      pallets: '5 Tarimas',
      sealNumber: 'CONTECON-MZ-4921',
      tempReefer: 'Caja Seca 14ft con Copete',
      client: 'Samsung Electronics México',
      declaredValue: '$1,200,000.00 MXN'
    },
    billing: {
      subtotal: '$14,000.00',
      iva: '$2,240.00',
      retention: '-$560.00',
      total: '$15,680.00 MXN',
      status: 'Timbrado SAT / Pago Contra Entrega',
      uuid: '4A12B980-6C23-45F1-9988-E102934812AB',
      invoiceDate: '08 Sep 2024'
    },
    documents: [
      { name: 'Carta Porte Complemento 3.0', type: 'PDF / XML', folio: 'CP-2024-91024', status: 'Timbrado SAT' },
      { name: 'Pedimento Aduanal de Importación', type: 'SAT Aduanas', folio: 'PED-24-16-3921-0012', status: 'Desaduanado' },
      { name: 'Póliza Quálitas Transporte', type: 'Seguro Cobertura Amplia', folio: 'QUA-88192-01', status: 'Vigente' }
    ]
  },
  'MX-113949207': {
    id: 'MX-113949207',
    model: 'Mercedes Sprinter 3.5T 2023',
    type: 'van',
    route: 'CDMX → Toluca',
    origin: 'CDMX (Azcapotzalco)',
    destination: 'Toluca (Parque Toluca 2000)',
    corridor: 'Metropolitano Valle de Toluca',
    status: 'Moving',
    statusText: 'En tránsito',
    statusClass: 'moving',
    capacity: 42,
    eta: '01h 15m',
    departureTime: '02:55 CST',
    remainingTime: '00:28:40',
    remainingKm: '19 km restantes',
    speed: '65 km/h',
    fuel: 62,
    odometer: '45,120 km',
    plates: 'LC-92-811 (Edomex Carga)',
    vin: 'W1Y4EBHY9PT284910',
    engine: '2.0L Turbo Diésel 170 HP · 9G-TRONIC',
    tempBrakes: '95 °C (Frío)',
    tirePressure: '48 PSI (Calibrado)',
    coords: {
      origin: { lat: 19.4850, lng: -99.1830, name: 'CDMX (Azcapotzalco)' },
      current: { lat: 19.3320, lng: -99.3450, name: 'Autopista México-Toluca · La Marquesa', highway: 'Autopista 15D (México - Toluca)', km: 'KM 36', text: '19.3320° N, -99.3450° W' },
      destination: { lat: 19.3410, lng: -99.5750, name: 'Toluca (Parque 2000)' },
      casetas: [
        { lat: 19.3620, lng: -99.2780, name: 'Caseta La Venta' }
      ],
      routePoints: [
        [19.4850, -99.1830], [19.4210, -99.2150], [19.3620, -99.2780], [19.3320, -99.3450],
        [19.3010, -99.4620], [19.2890, -99.5420], [19.3410, -99.5750]
      ]
    },
    driver: {
      name: 'Héctor Daniel Rivas',
      phone: '+52 55 7712 9011',
      license: 'Lic. Tipo C (Servicio Particular Carga)',
      licenseExp: '05/May/2026',
      medicalExp: 'Vigente',
      rating: '5.0 ★',
      trips: 620
    },
    cargo: {
      type: 'Paquetería Express y E-Commerce',
      weight: '1.4 Toneladas',
      pallets: '8 Bultos Consolidados',
      sealNumber: 'PAVA-EXP-112',
      tempReefer: 'Paquetería Última Milla',
      client: 'Mercado Libre México',
      declaredValue: '$340,000.00 MXN'
    },
    billing: {
      subtotal: '$8,400.00',
      iva: '$1,344.00',
      retention: '-$336.00',
      total: '$9,408.00 MXN',
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
    model: 'Ford F-350 Super Duty 2024',
    type: 'truck',
    route: 'Querétaro → León',
    origin: 'Querétaro (El Marqués)',
    destination: 'León (Puerto Interior Silao)',
    corridor: 'Corredor Industrial del Bajío',
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
    plates: 'SS-44-192 (Querétaro 3.5T)',
    vin: '1FT8W3BT8REC18293',
    engine: '6.7L Power Stroke V8 330 HP · TorqShift 10 vel.',
    tempBrakes: '92 °C (Normal)',
    tirePressure: '80 PSI (Calibrado)',
    coords: {
      origin: { lat: 20.5880, lng: -100.2850, name: 'Querétaro (El Marqués)' },
      current: { lat: 20.7850, lng: -101.1980, name: 'Carretera 45D · Irapuato-Salamanca', highway: 'Carretera Federal 45D (Bajío)', km: 'KM 78', text: '20.7850° N, -101.1980° W' },
      destination: { lat: 20.9850, lng: -101.5200, name: 'Silao (Puerto Interior)' },
      casetas: [
        { lat: 20.6120, lng: -100.4850, name: 'Caseta Querétaro-Celaya' },
        { lat: 20.6950, lng: -101.3120, name: 'Caseta Salamanca' }
      ],
      routePoints: [
        [20.5880, -100.2850], [20.5340, -100.8120], [20.5750, -101.1980], [20.7850, -101.1980],
        [20.9120, -101.4250], [20.9850, -101.5200]
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
      type: 'Autopartes y Arneses Eléctricos',
      weight: '3.1 Toneladas',
      pallets: '5 Racks Metálicos',
      sealNumber: 'SEAL-BAJIO-991',
      tempReefer: 'Caja Seca 14ft con Copete',
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
    model: 'Ford F-450 Super Duty 2024',
    type: 'truck',
    route: 'Monterrey → Nuevo Laredo',
    origin: 'Monterrey (Salinas Victoria)',
    destination: 'Nuevo Laredo (Puente III)',
    corridor: 'Corredor Internacional NAFTA / Comercio Mundial',
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
    odometer: '32,400 km',
    plates: '88-BC-4P (SCT C-TPAT 4.5T)',
    vin: '1FDOW4HT5REC29104',
    engine: '6.7L V8 High Output 330 HP · Dually 4x2',
    tempBrakes: '95 °C (Normal)',
    tirePressure: '85 PSI (Calibración Óptima)',
    coords: {
      origin: { lat: 25.9620, lng: -100.2930, name: 'Monterrey (Salinas Victoria)' },
      current: { lat: 26.8520, lng: -99.9850, name: 'Autopista Monterrey-Laredo · Sabinas Hidalgo', highway: 'Autopista Federal 85D (NAFTA)', km: 'KM 160', text: '26.8520° N, -99.9850° W' },
      destination: { lat: 27.4860, lng: -99.5070, name: 'Nuevo Laredo (Puente III)' },
      casetas: [
        { lat: 26.5020, lng: -100.1850, name: 'Caseta Sabinas Hidalgo' }
      ],
      routePoints: [
        [25.9620, -100.2930], [26.3510, -100.1820], [26.8520, -99.9850], [27.2140, -99.7210],
        [27.4860, -99.5070]
      ]
    },
    driver: {
      name: 'Raúl Mendoza Saldaña',
      phone: '+52 81 1920 4488',
      license: 'Lic. Federal Tipo B con Certificación FAST',
      licenseExp: '11/Oct/2026',
      medicalExp: 'Vigente',
      rating: '4.95 ★',
      trips: 580
    },
    cargo: {
      type: 'Insumos Industriales y Paquetería de Exportación',
      weight: '4.2 Toneladas',
      pallets: '6 Tarimas Reforzadas',
      sealNumber: 'CTPAT-SAT-99014',
      tempReefer: 'Caja Seca 14ft Reforzada',
      client: 'Ternium México / DeAcero',
      declaredValue: '$850,000.00 MXN'
    },
    billing: {
      subtotal: '$18,000.00',
      iva: '$2,880.00',
      retention: '-$720.00',
      total: '$20,160.00 MXN',
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
    model: 'RAM 4000 Heavy Duty 2023',
    type: 'truck',
    route: 'Veracruz → Puebla',
    origin: 'Veracruz (Puerto San Juan de Ulúa)',
    destination: 'Puebla (Parque Finsa)',
    corridor: 'Corredor Golfo - Altiplano Central',
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
    odometer: '65,400 km',
    plates: '55-AA-1Z (SCT 4T)',
    vin: '3C7WR4EL5PG882190',
    engine: '6.4L HEMI V8 410 HP · Heavy Duty 8 vel.',
    tempBrakes: '110 °C (Pendiente pronunciada)',
    tirePressure: '80 PSI',
    coords: {
      origin: { lat: 19.1738, lng: -96.1342, name: 'Veracruz (Puerto)' },
      current: { lat: 18.8410, lng: -97.2340, name: 'Cumbres de Maltrata · Autopista 150D', highway: 'Autopista 150D (Veracruz - Puebla)', km: 'KM 244', text: '18.8410° N, -97.2340° W' },
      destination: { lat: 19.0980, lng: -98.2450, name: 'Puebla (Parque Finsa)' },
      casetas: [
        { lat: 19.0120, lng: -96.3450, name: 'Caseta Paso del Toro' },
        { lat: 18.8820, lng: -97.0120, name: 'Caseta Fortín' },
        { lat: 18.9410, lng: -97.6850, name: 'Caseta Esperanza' }
      ],
      routePoints: [
        [19.1738, -96.1342], [18.8540, -96.9120], [18.8410, -97.2340], [18.9410, -97.6850],
        [19.0120, -97.9450], [19.0980, -98.2450]
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
      type: 'Materia Prima Química No Peligrosa',
      weight: '3.5 Toneladas',
      pallets: '4 Contenedores IBC',
      sealNumber: 'VER-PORT-7712',
      tempReefer: 'Caja Seca 14ft con Copete',
      client: 'Braskem Idesa / BASF',
      declaredValue: '$520,000.00 MXN'
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
    model: 'Ford F-350 Super Duty 2024',
    type: 'truck',
    route: 'Tijuana → Mexicali',
    origin: 'Tijuana (Otay)',
    destination: 'Mexicali (Parque Nelson)',
    corridor: 'Corredor Fronterizo Rumorosa',
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
    odometer: '28,200 km',
    plates: '12-BC-8K (SCT 3.5T)',
    vin: '1FT8W3BT2REC29182',
    engine: '6.7L Power Stroke V8 Diésel · Dually 4x2',
    tempBrakes: '90 °C (Freno motor auxiliar)',
    tirePressure: '80 PSI',
    coords: {
      origin: { lat: 32.5340, lng: -116.9280, name: 'Tijuana (Otay)' },
      current: { lat: 32.5650, lng: -116.0820, name: 'La Rumorosa · Caseta El Hongo', highway: 'Autopista Federal 2D (La Rumorosa)', km: 'KM 92', text: '32.5650° N, -116.0820° W' },
      destination: { lat: 32.6270, lng: -115.4540, name: 'Mexicali (Parque Nelson)' },
      casetas: [
        { lat: 32.5420, lng: -116.6120, name: 'Caseta Tecate' },
        { lat: 32.5650, lng: -116.0820, name: 'Caseta El Hongo' }
      ],
      routePoints: [
        [32.5340, -116.9280], [32.5740, -116.6250], [32.5650, -116.0820], [32.5920, -115.7890],
        [32.6270, -115.4540]
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
      type: 'Dispositivos Médicos y Quirúrgicos',
      weight: '2.8 Toneladas',
      pallets: '4 Tarimas Termocontroladas',
      sealNumber: 'MED-TJ-8841',
      tempReefer: 'Caja Térmica 14ft con Copete',
      client: 'Medtronic México',
      declaredValue: '$1,800,000.00 MXN'
    },
    billing: {
      subtotal: '$13,800.00',
      iva: '$2,208.00',
      retention: '-$552.00',
      total: '$15,456.00 MXN',
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
    model: 'Chevrolet Silverado 3500 HD 2024',
    type: 'truck',
    route: 'Mérida → Cancún',
    origin: 'Mérida (Umán)',
    destination: 'Cancún (Zona Hotelera / Aeropuerto)',
    corridor: 'Corredor Península de Yucatán',
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
    plates: 'YZ-88-129 (Yucatán Carga 3.5T)',
    vin: '1GB4C3CY8RF192019',
    engine: '6.6L Duramax V8 Turbo Diésel 350 HP',
    tempBrakes: '88 °C',
    tirePressure: '80 PSI',
    coords: {
      origin: { lat: 20.8820, lng: -89.7450, name: 'Mérida (Umán)' },
      current: { lat: 20.9150, lng: -87.8240, name: 'Autopista 180D · Valladolid, Yuc', highway: 'Autopista 180D (Mérida - Cancún)', km: 'KM 172', text: '20.9150° N, -87.8240° W' },
      destination: { lat: 21.0360, lng: -86.8770, name: 'Cancún (Aeropuerto)' },
      casetas: [
        { lat: 20.8920, lng: -88.9120, name: 'Caseta Pisté' },
        { lat: 20.9450, lng: -87.3120, name: 'Caseta Tintal' }
      ],
      routePoints: [
        [20.8820, -89.7450], [20.9320, -89.0150], [20.9150, -87.8240], [20.9850, -87.2140],
        [21.0360, -86.8770]
      ]
    },
    driver: {
      name: 'Eduardo Pech Canché',
      phone: '+52 999 482 1190',
      license: 'Lic. Estatal de Chofer',
      licenseExp: '30/Jun/2026',
      medicalExp: 'Vigente',
      rating: '4.9 ★',
      trips: 512
    },
    cargo: {
      type: 'Alimentos Gourmet y Congelados Hotelería',
      weight: '2.5 Toneladas',
      pallets: '4 Pallets Refrigerados',
      sealNumber: 'CANCUN-HOTEL-49',
      tempReefer: 'Caja Refrigerada 14ft con Copete',
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

// // -------------------------------------------------------------
// GENERADORES VECTORIALES SVG DE ALTA PRECISIÓN (FORD F-350 3.5T)
// -------------------------------------------------------------

function generateTruckSvg(id, brand, capacity) {
  let accentColor = '#2563eb';
  if (brand.includes('RAM')) accentColor = '#dc2626';
  if (brand.includes('Chevrolet') || brand.includes('Silverado')) accentColor = '#f59e0b';
  if (brand.includes('Isuzu')) accentColor = '#10b981';
  if (brand.includes('Mercedes')) accentColor = '#0284c7';

  const cleanId = id.replace(/[^a-zA-Z0-9]/g, '_');

  return `
  <svg class="vehicle-svg truck-svg f350-svg" viewBox="0 0 250 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${brand} camioneta chasis cabina 3.5T con caja seca y copete">
    <defs>
      <!-- CAB GRADIENT (White / Silver Automotive finish) -->
      <linearGradient id="f350CabGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="25%" stop-color="#eef2f6"/>
        <stop offset="65%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#64748b"/>
      </linearGradient>
      <!-- BOX BODY GRADIENT (White Box Panels) -->
      <linearGradient id="f350BoxGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="20%" stop-color="#f8fafc"/>
        <stop offset="70%" stop-color="#e2e8f0"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>
      <!-- ALUMINUM TRIM GRADIENT -->
      <linearGradient id="f350AlumGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#94a3b8"/>
        <stop offset="30%" stop-color="#f1f5f9"/>
        <stop offset="70%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#64748b"/>
      </linearGradient>
      <!-- WINDOW TINT -->
      <linearGradient id="f350GlassGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d14"/>
      </linearGradient>
      <!-- 8/10-LUG RIM GRADIENT -->
      <linearGradient id="f350RimGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="40%" stop-color="#cbd5e1"/>
        <stop offset="80%" stop-color="#64748b"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
    </defs>

    <!-- GROUND SHADOW & ROAD REFLECTION -->
    <ellipse cx="122" cy="67" rx="108" ry="3.5" fill="#000000" opacity="0.45"/>
    <line x1="12" y1="66.5" x2="238" y2="66.5" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- REAR CHASSIS RAIL & FUEL TANK -->
    <rect x="100" y="50" width="124" height="4.5" rx="1" fill="#171a20" stroke="#2a303c" stroke-width="0.5"/>
    <rect x="110" y="52.5" width="28" height="4" rx="0.5" fill="#0d1117" stroke="#1f2937" stroke-width="0.5"/>
    <circle cx="114" cy="54.5" r="1.5" fill="#374151"/>

    <!-- ================= FORD F-350 CABIN ================= -->
    <g class="f350-cabin">
      <!-- Lower rocker panel -->
      <rect x="62" y="48.5" width="46" height="3" rx="0.8" fill="#1e232c" stroke="#333b47" stroke-width="0.4"/>
      
      <!-- Ford F-350 Main Cab Silhouette (Tucked neatly under the copete) -->
      <path d="M 22 56 L 22 46 Q 22 41 25 36 L 30 34 Q 34 33 46 33 L 58 32 Q 62 31 66 27 L 78 18 Q 82 17 88 17 L 108 17 L 108 49 Q 104 40 93 40 Q 82 40 78 49 L 58 49 Q 54 40 43 40 Q 32 40 28 49 L 22 49 Z" fill="url(#f350CabGrad_${cleanId})" stroke="#4f596a" stroke-width="0.7"/>

      <!-- Front Bumper (Heavy Duty Black Matte Super Duty Bumper) -->
      <path d="M 18 56 L 18 46 Q 18 44 22 44 L 32 44 L 32 56 Z" fill="#11141a" stroke="#2b3340" stroke-width="0.6"/>
      <rect x="20" y="49" width="6" height="3.5" rx="0.8" fill="#090b0e"/>
      <rect x="21" y="46" width="3" height="1.2" rx="0.4" fill="#e2e8f0"/>

      <!-- Ford Super Duty Black Front Grille & Blue Oval Emblem -->
      <path d="M 22 35 L 28 35 L 28 44 L 22 44 Z" fill="#11151c" stroke="#252d3a" stroke-width="0.6"/>
      <line x1="22" y1="38" x2="28" y2="38" stroke="#374151" stroke-width="0.9"/>
      <line x1="22" y1="41" x2="28" y2="41" stroke="#374151" stroke-width="0.9"/>
      <ellipse cx="24" cy="39.5" rx="1.6" ry="1" fill="#2563eb"/>

      <!-- Stacked Headlights with Amber Turn Signal -->
      <path d="M 27 34 L 32 34 L 32 44 L 27 44 Z" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
      <path d="M 28 35 L 31 35 L 31 39 L 28 39 Z" fill="#93c5fd"/>
      <path d="M 28 40 L 31 40 L 31 43 L 28 43 Z" fill="#e2e8f0"/>
      <rect x="30.5" y="35" width="1.2" height="8" fill="#f59e0b"/>

      <!-- Black Front Fender Flare (Moldura ancha de salpicadera negra como en la foto) -->
      <path d="M 28 49 Q 32 38 43 38 Q 54 38 58 49 L 55 49 Q 52 40 43 40 Q 34 40 31 49 Z" fill="#171b22" stroke="#2a3240" stroke-width="0.5"/>

      <!-- Hood lines & Super Duty Fender Badge -->
      <line x1="30" y1="34" x2="62" y2="31" stroke="#3f4857" stroke-width="0.6"/>
      <rect x="62" y="32" width="6" height="2.2" rx="0.4" fill="#11151c"/>
      <rect x="63" y="32.8" width="4" height="0.6" fill="#f59e0b"/>

      <!-- Windshield & Side Window (Ford Super Duty drop-down window sill!) -->
      <path d="M 66 27 L 78 18 L 105 18 L 105 32 L 72 32 Q 68 32 66 27 Z" fill="url(#f350GlassGrad_${cleanId})" stroke="#2a3342" stroke-width="0.6"/>
      <line x1="77" y1="19" x2="74" y2="32" stroke="#181d26" stroke-width="1.2"/>
      <path d="M 80 19 L 85 19 L 77 30 L 72 30 Z" fill="#ffffff" opacity="0.14"/>
      <path d="M 94 19 L 98 19 L 94 30 L 90 30 Z" fill="#ffffff" opacity="0.08"/>

      <!-- Door cut line and handle -->
      <line x1="71" y1="32" x2="71" y2="49" stroke="#374151" stroke-width="0.6"/>
      <line x1="105" y1="18" x2="105" y2="49" stroke="#374151" stroke-width="0.6"/>
      <rect x="98" y="35" width="4.5" height="1.4" rx="0.7" fill="#111827"/>

      <!-- Ford Super Duty Dual-Arm Towing Mirror -->
      <path d="M 69 30 L 64 32 L 64 39 L 69 38 Z" fill="#111827" stroke="#2d3748" stroke-width="0.5"/>
      <line x1="69" y1="31" x2="71" y2="31" stroke="#111827" stroke-width="1"/>
      <line x1="69" y1="37" x2="71" y2="37" stroke="#111827" stroke-width="1"/>
      <line x1="65" y1="35" x2="68" y2="35" stroke="#475569" stroke-width="0.5"/>
      <rect x="64.2" y="33" width="0.8" height="3" fill="#f59e0b"/>
    </g>

    <!-- ================= 3.5T BOX BODY WITH OVER-CAB COPETE (CAJA SECA CON COPETE RECTO) ================= -->
    <g class="f350-box-body">
      <!-- Main Box Outer Path (Square copete extending over cab roof as in real photo) -->
      <path d="M 68 10 L 74 6 L 226 6 L 226 50 L 108 50 L 108 22 L 72 22 Q 68 22 68 18 Z" fill="url(#f350BoxGrad_${cleanId})" stroke="#475569" stroke-width="0.75"/>

      <!-- Aluminum Corner / Perimeter Moldings (Perfiles de Aluminio en todos los bordes) -->
      <!-- Top Aluminum Rail -->
      <path d="M 68 10 L 74 6 L 226 6 L 226 8.5 L 73 8.5 L 68 12 Z" fill="url(#f350AlumGrad_${cleanId})" stroke="#475569" stroke-width="0.4"/>
      <!-- Front Overhang Vertical Edge Trim -->
      <rect x="68" y="9" width="3.5" height="11" fill="url(#f350AlumGrad_${cleanId})" stroke="#475569" stroke-width="0.4"/>
      <!-- Overhang Bottom Edge Trim -->
      <rect x="68" y="19.5" width="40" height="2.5" fill="url(#f350AlumGrad_${cleanId})" stroke="#475569" stroke-width="0.4"/>
      <!-- Mid-Body Drop Vertical Edge Trim -->
      <rect x="106" y="20" width="3.5" height="30" fill="url(#f350AlumGrad_${cleanId})" stroke="#475569" stroke-width="0.4"/>
      <!-- Bottom Aluminum Side Skirt Rail -->
      <rect x="108" y="48.5" width="118" height="2.2" fill="url(#f350AlumGrad_${cleanId})" stroke="#475569" stroke-width="0.4"/>
      <!-- Rear Aluminum Corner Rail -->
      <rect x="222.5" y="6" width="3.5" height="44" fill="url(#f350AlumGrad_${cleanId})" stroke="#475569" stroke-width="0.4"/>

      <!-- Copete Center Vertical Aluminum Stripe (Franja central de aluminio como en la foto) -->
      <rect x="84" y="6.5" width="4" height="14" fill="url(#f350AlumGrad_${cleanId})" stroke="#64748b" stroke-width="0.4"/>

      <!-- Vertical Panel Seams & Rivets (Remaches en paneles de aluminio) -->
      <line x1="135" y1="9" x2="135" y2="48" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2 2"/>
      <line x1="164" y1="9" x2="164" y2="48" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2 2"/>
      <line x1="193" y1="9" x2="193" y2="48" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2 2"/>

      <!-- Fleet Accent Stripe -->
      <rect x="110" y="28" width="112" height="3" rx="0.5" fill="${accentColor}" opacity="0.9"/>
      <circle cx="116" cy="29.5" r="1" fill="#ffffff"/>

      <!-- SCT / DOT Safety Reflective Tape (Cinta Reflejante Roja y Blanca) -->
      <g class="reflective-tape" transform="translate(110, 46.5)">
        <rect x="0" y="0" width="112" height="1.8" fill="#ef4444"/>
        <rect x="0" y="0" width="10" height="1.8" fill="#ffffff"/>
        <rect x="20" y="0" width="10" height="1.8" fill="#ffffff"/>
        <rect x="40" y="0" width="10" height="1.8" fill="#ffffff"/>
        <rect x="60" y="0" width="10" height="1.8" fill="#ffffff"/>
        <rect x="80" y="0" width="10" height="1.8" fill="#ffffff"/>
        <rect x="100" y="0" width="10" height="1.8" fill="#ffffff"/>
      </g>

      <!-- Top Clearance Marker Lights (Luces de gálibo como en la foto) -->
      <circle cx="78" cy="8" r="1.1" fill="#f59e0b"/>
      <circle cx="94" cy="8" r="1.1" fill="#f59e0b"/>
      <circle cx="224" cy="8" r="1.1" fill="#ef4444"/>
      <circle cx="110" cy="46" r="1" fill="#f59e0b"/>
      <circle cx="224" cy="46" r="1" fill="#ef4444"/>

      <!-- Rear Door Hardware & Lock Rods -->
      <line x1="223" y1="9" x2="223" y2="48" stroke="#334155" stroke-width="0.8"/>
      <rect x="224" y="14" width="1.2" height="2.5" fill="#1e293b"/>
      <rect x="224" y="28" width="1.2" height="2.5" fill="#1e293b"/>
      <rect x="224" y="42" width="1.2" height="2.5" fill="#1e293b"/>
      <rect x="221.5" y="26" width="2" height="5" rx="0.5" fill="#0f172a"/>

      <!-- Rear Bumper & Mud Flap (Lodera trasera) -->
      <rect x="216" y="52" width="12" height="3.5" rx="0.5" fill="#1e232c" stroke="#374151" stroke-width="0.5"/>
      <rect x="225" y="43" width="2" height="6" fill="#ef4444"/>
      <path d="M 194 50 Q 200 50 200 57 L 197 61 L 194 61 Z" fill="#11151c"/>
    </g>

    <!-- ================= WHEELS (8-LUG SUPER DUTY & DUALLIES) ================= -->
    <!-- FRONT WHEEL (x=43, y=57) -->
    <g class="wheel" transform="translate(43, 57)">
      <circle cx="0" cy="0" r="9" fill="#090c10" stroke="#1f2530" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#f350RimGrad_${cleanId})" stroke="#171b22" stroke-width="0.5"/>
      <circle cx="0" cy="0" r="2.8" fill="#151922"/>
      <circle cx="0" cy="0" r="1.2" fill="#94a3b8"/>
      <circle cx="0" cy="-4" r="0.6" fill="#0d1117"/>
      <circle cx="2.8" cy="-2.8" r="0.6" fill="#0d1117"/>
      <circle cx="4" cy="0" r="0.6" fill="#0d1117"/>
      <circle cx="2.8" cy="2.8" r="0.6" fill="#0d1117"/>
      <circle cx="0" cy="4" r="0.6" fill="#0d1117"/>
      <circle cx="-2.8" cy="2.8" r="0.6" fill="#0d1117"/>
      <circle cx="-4" cy="0" r="0.6" fill="#0d1117"/>
      <circle cx="-2.8" cy="-2.8" r="0.6" fill="#0d1117"/>
    </g>

    <!-- REAR DUALLY WHEELS (x=182, y=57) - Double Wheel Silhouette -->
    <g class="wheel dually" transform="translate(182, 57)">
      <ellipse cx="4" cy="0" rx="9" ry="9" fill="#090c10" stroke="#1a202c" stroke-width="0.8"/>
      <circle cx="0" cy="0" r="9" fill="#090c10" stroke="#242c3b" stroke-width="1"/>
      <circle cx="0" cy="0" r="5.8" fill="url(#f350RimGrad_${cleanId})" stroke="#141820" stroke-width="0.5"/>
      <circle cx="0" cy="0" r="3.4" fill="#0f141d" stroke="#334155" stroke-width="0.4"/>
      <circle cx="0" cy="0" r="1.6" fill="#64748b"/>
      <circle cx="0" cy="-4" r="0.6" fill="#0d1117"/>
      <circle cx="2.8" cy="-2.8" r="0.6" fill="#0d1117"/>
      <circle cx="4" cy="0" r="0.6" fill="#0d1117"/>
      <circle cx="2.8" cy="2.8" r="0.6" fill="#0d1117"/>
      <circle cx="0" cy="4" r="0.6" fill="#0d1117"/>
      <circle cx="-2.8" cy="2.8" r="0.6" fill="#0d1117"/>
      <circle cx="-4" cy="0" r="0.6" fill="#0d1117"/>
      <circle cx="-2.8" cy="-2.8" r="0.6" fill="#0d1117"/>
    </g>
  </svg>`;
}

function generateVanSvg(id, brand, capacity) {
  let accentColor = '#0284c7';
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, '_');

  return `
  <svg class="vehicle-svg van-svg" viewBox="0 0 250 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${brand} camioneta de reparto 3.5T">
    <defs>
      <linearGradient id="vanGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="20%" stop-color="#e2e8f0"/>
        <stop offset="70%" stop-color="#94a3b8"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <linearGradient id="vanGlassGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d14"/>
      </linearGradient>
      <linearGradient id="vanRimGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cbd5e1"/>
        <stop offset="50%" stop-color="#64748b"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
    </defs>
    <ellipse cx="125" cy="67" rx="108" ry="3" fill="#000000" opacity="0.45"/>
    <line x1="18" y1="66.5" x2="232" y2="66.5" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <g class="van-chassis">
      <path d="M 28 58 L 28 48 Q 28 44 32 42 L 44 39 Q 51 37 56 33 L 76 18 Q 83 13 94 13 L 218 13 Q 227 13 229 18 L 229 57 L 215 57 Q 211 48 198 48 Q 185 48 181 57 L 88 57 Q 84 48 71 48 Q 58 48 54 57 L 28 58 Z" fill="url(#vanGrad_${cleanId})" stroke="#64748b" stroke-width="0.75"/>
      <path d="M 28 47 L 36 47 L 38 58 L 28 58 Z" fill="#1f242d" stroke="#313947" stroke-width="0.5"/>
      <line x1="30" y1="51" x2="36" y2="51" stroke="#434c5b" stroke-width="0.8"/>
      <path d="M 34 42 L 44 41 L 42 46 L 32 46 Z" fill="#75a6ff" stroke="#9bc0ff" stroke-width="0.4"/>
      <circle cx="37" cy="43.5" r="1" fill="#ffffff"/>
      <path d="M 60 32 L 78 18 L 104 18 L 104 33 L 58 33 Z" fill="url(#vanGlassGrad_${cleanId})" stroke="#364050" stroke-width="0.6"/>
      <line x1="71" y1="24" x2="67" y2="33" stroke="#222833" stroke-width="1.2"/>
      <path d="M 76 20 L 81 20 L 69 31 L 64 31 Z" fill="#ffffff" opacity="0.12"/>
      <path d="M 92 20 L 97 20 L 92 31 L 87 31 Z" fill="#ffffff" opacity="0.08"/>
      <path d="M 57 31 L 52 32 L 52 37 L 58 36 Z" fill="#15181e" stroke="#353d4a" stroke-width="0.5"/>
      <path d="M 106 18 L 106 55 L 54 55" fill="none" stroke="#20252e" stroke-width="0.7"/>
      <rect x="97" y="37" width="4.5" height="1.2" rx="0.6" fill="#15181e"/>
      <path d="M 111 15 L 111 55 L 170 55 L 170 15" fill="none" stroke="#242a33" stroke-width="0.65"/>
      <line x1="111" y1="40" x2="223" y2="40" stroke="#20252e" stroke-width="0.9"/>
      <rect x="160" y="37" width="4.5" height="1.2" rx="0.6" fill="#15181e"/>
      <line x1="110" y1="31" x2="218" y2="31" stroke="${accentColor}" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>
    </g>
    <g class="wheel" transform="translate(71, 58)">
      <circle cx="0" cy="0" r="8.5" fill="#101317" stroke="#242932" stroke-width="0.9"/>
      <circle cx="0" cy="0" r="5.6" fill="url(#vanRimGrad_${cleanId})" stroke="#151820" stroke-width="0.5"/>
      <circle cx="0" cy="0" r="2.6" fill="#181d25"/>
      <circle cx="0" cy="0" r="1.1" fill="#959ca8"/>
    </g>
    <g class="wheel" transform="translate(198, 58)">
      <circle cx="0" cy="0" r="8.5" fill="#101317" stroke="#242932" stroke-width="0.9"/>
      <circle cx="0" cy="0" r="5.6" fill="url(#vanRimGrad_${cleanId})" stroke="#151820" stroke-width="0.5"/>
      <circle cx="0" cy="0" r="2.6" fill="#181d25"/>
      <circle cx="0" cy="0" r="1.1" fill="#959ca8"/>
    </g>
  </svg>`;
}

function generateDetailIllustration(vehicleOrCap = 59) {
  let capNum = 59;
  let brand = 'Ford F-350 Super Duty';
  let cleanId = 'det_truck';

  if (typeof vehicleOrCap === 'object' && vehicleOrCap !== null) {
    capNum = Math.max(0, Math.min(100, Number(vehicleOrCap.capacity) || 59));
    brand = vehicleOrCap.model || 'Ford F-350 Super Duty';
    cleanId = (vehicleOrCap.id || 'det').replace(/[^a-zA-Z0-9]/g, '_');
  } else {
    capNum = Math.max(0, Math.min(100, Number(vehicleOrCap) || 59));
  }

  const maxBayWidth = 145;
  const fillWidth = Math.max(10, Math.round((maxBayWidth * capNum) / 100));

  let accentColor = '#2563eb';
  if (brand.includes('RAM')) accentColor = '#dc2626';
  if (brand.includes('Chevrolet') || brand.includes('Silverado')) accentColor = '#f59e0b';
  if (brand.includes('Isuzu')) accentColor = '#10b981';

  return `
  <div class="detail-truck-container">
    <svg class="detail-truck-svg f350-detail-svg" viewBox="0 0 310 92" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${brand} Camioneta Chasis Cabina 3.5T con Caja Seca y Copete">
      <defs>
        <linearGradient id="detCabGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="30%" stop-color="#e2e8f0"/>
          <stop offset="70%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>
        <linearGradient id="detAlumGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#94a3b8"/>
          <stop offset="30%" stop-color="#f1f5f9"/>
          <stop offset="70%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>
        <linearGradient id="detBoxInteriorGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e2430"/>
          <stop offset="50%" stop-color="#131720"/>
          <stop offset="100%" stop-color="#0c0e14"/>
        </linearGradient>
        <linearGradient id="detLoadGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="${accentColor}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="detRimGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="40%" stop-color="#cbd5e1"/>
          <stop offset="80%" stop-color="#64748b"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <pattern id="f350CargoGrid_${cleanId}" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.8"/>
        </pattern>
      </defs>

      <!-- GROUND SHADOW -->
      <ellipse cx="155" cy="84" rx="145" ry="4" fill="#000000" opacity="0.6"/>
      <line x1="10" y1="83.5" x2="300" y2="83.5" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

      <!-- CHASSIS RAIL & FUEL TANK -->
      <rect x="120" y="62" width="160" height="5.5" rx="1" fill="#171a22" stroke="#334155" stroke-width="0.7"/>
      <rect x="135" y="65" width="34" height="4.5" rx="0.5" fill="#0d1117" stroke="#1f2937" stroke-width="0.5"/>

      <!-- ================= FORD F-350 CABIN ================= -->
      <g class="detail-f350-cab">
        <!-- Main Cab Silhouette -->
        <path d="M 18 72 L 18 58 Q 18 52 22 46 L 28 43 Q 33 41 48 41 L 62 40 Q 68 38 72 33 L 86 20 Q 90 19 98 19 L 132 19 L 132 62 Q 128 51 114 51 Q 100 51 96 62 L 74 62 Q 69 51 55 51 Q 41 51 36 62 L 18 62 Z" fill="url(#detCabGrad_${cleanId})" stroke="#64748b" stroke-width="1"/>

        <!-- Front Bumper & Black Fender Flare -->
        <path d="M 14 72 L 14 58 Q 14 55 18 55 L 30 55 L 30 72 Z" fill="#11141a" stroke="#2b3340" stroke-width="0.8"/>
        <rect x="17" y="62" width="8" height="4" rx="1" fill="#090b0e"/>
        <path d="M 36 62 Q 41 49 55 49 Q 69 49 74 62 L 70 62 Q 65 52 55 52 Q 45 52 40 62 Z" fill="#171b22" stroke="#2a3240" stroke-width="0.6"/>

        <!-- Grille & Headlight -->
        <path d="M 18 43 L 26 43 L 26 55 L 18 55 Z" fill="#11151c" stroke="#252d3a" stroke-width="0.6"/>
        <ellipse cx="22" cy="49" rx="2" ry="1.2" fill="#2563eb"/>
        <path d="M 25 42 L 31 42 L 31 55 L 25 55 Z" fill="#0f172a" stroke="#334155" stroke-width="0.6"/>
        <path d="M 26 44 L 30 44 L 30 49 L 26 49 Z" fill="#93c5fd"/>
        <rect x="29.5" y="44" width="1.5" height="10" fill="#f59e0b"/>

        <!-- Windshield & Side Window with Super Duty dip -->
        <path d="M 72 33 L 86 20 L 128 20 L 128 38 L 80 38 Q 75 38 72 33 Z" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>
        <line x1="85" y1="21" x2="81" y2="38" stroke="#181d26" stroke-width="1.4"/>
        <path d="M 88 22 L 94 22 L 85 36 L 79 36 Z" fill="#ffffff" opacity="0.14"/>
        <circle cx="95" cy="28" r="4" fill="#334155" opacity="0.7"/>

        <!-- Tow Mirror -->
        <path d="M 77 35 L 71 37 L 71 47 L 77 45 Z" fill="#0f172a" stroke="#334155" stroke-width="0.7"/>
        <line x1="77" y1="37" x2="80" y2="37" stroke="#0f172a" stroke-width="1.2"/>
        <line x1="77" y1="44" x2="80" y2="44" stroke="#0f172a" stroke-width="1.2"/>
        <rect x="71" y="39" width="1" height="4" fill="#f59e0b"/>
      </g>

      <!-- ================= BOX BODY CUTAWAY (CARGO INTERIOR WITH OVER-CAB COPETE) ================= -->
      <g class="detail-f350-box">
        <!-- Outer Box Frame with Over-Cab Copete -->
        <path d="M 78 12 L 86 8 L 285 8 L 285 62 L 132 62 L 132 25 L 82 25 Q 78 25 78 21 Z" fill="url(#detBoxInteriorGrad_${cleanId})" stroke="#475569" stroke-width="1.2"/>
        <path d="M 82 14 L 88 11 L 281 11 L 281 59 L 135 59 L 135 27 L 85 27 Q 82 27 82 23 Z" fill="url(#f350CargoGrid_${cleanId})"/>

        <!-- Aluminum Edge Trims -->
        <path d="M 78 12 L 86 8 L 285 8" stroke="url(#detAlumGrad_${cleanId})" stroke-width="2.5" fill="none"/>
        <line x1="132" y1="62" x2="285" y2="62" stroke="url(#detAlumGrad_${cleanId})" stroke-width="2.5"/>
        <line x1="285" y1="8" x2="285" y2="62" stroke="url(#detAlumGrad_${cleanId})" stroke-width="2.5"/>
        <line x1="78" y1="12" x2="78" y2="24" stroke="url(#detAlumGrad_${cleanId})" stroke-width="2.5"/>
        <line x1="132" y1="25" x2="132" y2="62" stroke="url(#detAlumGrad_${cleanId})" stroke-width="2"/>

        <!-- Over-Cab Attic Storage Shelf (Copete para carga ligera / insumos) -->
        <line x1="82" y1="25" x2="132" y2="25" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="94" y="20" fill="#94a3b8" font-size="7" font-weight="600" font-family="sans-serif">COPETE</text>

        <!-- DYNAMIC CARGO LOAD FILL IN MAIN BAY -->
        <g class="detail-cargo-fill-group">
          <rect id="detailCargoFillRect" x="136" y="15" width="${fillWidth}" height="44" rx="2" fill="url(#detLoadGrad_${cleanId})"/>
          <!-- Over-cab copete partial fill if high capacity -->
          ${capNum > 70 ? `<rect x="84" y="13" width="44" height="10" rx="1.5" fill="url(#detLoadGrad_${cleanId})" opacity="0.8"/>` : ''}
          <!-- Pallet Dividers for 3.5T Cargo (4 Pallets standard) -->
          <line x1="172" y1="14" x2="172" y2="59" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
          <line x1="208" y1="14" x2="208" y2="59" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
          <line x1="244" y1="14" x2="244" y2="59" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
        </g>

        <!-- Logistic E-Track Rails along wall -->
        <line x1="135" y1="30" x2="280" y2="30" stroke="#475569" stroke-width="1.2" stroke-dasharray="8 4"/>
        <line x1="135" y1="46" x2="280" y2="46" stroke="#475569" stroke-width="1.2" stroke-dasharray="8 4"/>

        <!-- Reflective Strip on lower skirt -->
        <g class="detail-reflective" transform="translate(134, 59.5)">
          <rect x="0" y="0" width="150" height="2" fill="#ef4444"/>
          <rect x="0" y="0" width="14" height="2" fill="#ffffff"/>
          <rect x="28" y="0" width="14" height="2" fill="#ffffff"/>
          <rect x="56" y="0" width="14" height="2" fill="#ffffff"/>
          <rect x="84" y="0" width="14" height="2" fill="#ffffff"/>
          <rect x="112" y="0" width="14" height="2" fill="#ffffff"/>
          <rect x="136" y="0" width="14" height="2" fill="#ffffff"/>
        </g>

        <!-- Clearance Marker Lights -->
        <circle cx="88" cy="10" r="1.5" fill="#f59e0b"/>
        <circle cx="106" cy="10" r="1.5" fill="#f59e0b"/>
        <circle cx="282" cy="10" r="1.5" fill="#ef4444"/>
      </g>

      <!-- ================= WHEELS (8-LUG SUPER DUTY & DUALLIES) ================= -->
      <!-- FRONT WHEEL (x=55, y=72) -->
      <g class="wheel" transform="translate(55, 72)">
        <circle cx="0" cy="0" r="11.5" fill="#090c10" stroke="#1f2530" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="7.8" fill="url(#detRimGrad_${cleanId})" stroke="#171b22" stroke-width="0.6"/>
        <circle cx="0" cy="0" r="3.5" fill="#151922"/>
        <circle cx="0" cy="0" r="1.5" fill="#94a3b8"/>
        <circle cx="0" cy="-5" r="0.8" fill="#0d1117"/>
        <circle cx="3.5" cy="-3.5" r="0.8" fill="#0d1117"/>
        <circle cx="5" cy="0" r="0.8" fill="#0d1117"/>
        <circle cx="3.5" cy="3.5" r="0.8" fill="#0d1117"/>
        <circle cx="0" cy="5" r="0.8" fill="#0d1117"/>
        <circle cx="-3.5" cy="3.5" r="0.8" fill="#0d1117"/>
        <circle cx="-5" cy="0" r="0.8" fill="#0d1117"/>
        <circle cx="-3.5" cy="-3.5" r="0.8" fill="#0d1117"/>
      </g>

      <!-- REAR DUALLY WHEELS (x=230, y=72) -->
      <g class="wheel dually" transform="translate(230, 72)">
        <ellipse cx="5" cy="0" rx="11.5" ry="11.5" fill="#090c10" stroke="#1a202c" stroke-width="1"/>
        <circle cx="0" cy="0" r="11.5" fill="#090c10" stroke="#242c3b" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="7.5" fill="url(#detRimGrad_${cleanId})" stroke="#141820" stroke-width="0.6"/>
        <circle cx="0" cy="0" r="4.2" fill="#0f141d" stroke="#334155" stroke-width="0.5"/>
        <circle cx="0" cy="0" r="2" fill="#64748b"/>
        <circle cx="0" cy="-5" r="0.8" fill="#0d1117"/>
        <circle cx="3.5" cy="-3.5" r="0.8" fill="#0d1117"/>
        <circle cx="5" cy="0" r="0.8" fill="#0d1117"/>
        <circle cx="3.5" cy="3.5" r="0.8" fill="#0d1117"/>
        <circle cx="0" cy="5" r="0.8" fill="#0d1117"/>
        <circle cx="-3.5" cy="3.5" r="0.8" fill="#0d1117"/>
        <circle cx="-5" cy="0" r="0.8" fill="#0d1117"/>
        <circle cx="-3.5" cy="-3.5" r="0.8" fill="#0d1117"/>
      </g>
    </svg>
    <div class="detail-capacity-badge">
      <span id="capacityValue">${capNum}%</span>
      <small>CARGA 3.5T</small>
    </div>
  </div>`;
}

// -------------------------------------------------------------
// MOTOR DE MAPAS EN VIVO REAL (LEAFLET + GOOGLE MAPS MÉXICO)
// -------------------------------------------------------------
let liveLeafletMap = null;
let currentTileLayer = null;
let activeRouteLayer = null;
let activeMarkersGroup = null;
let currentMapLayerKey = 'google_roads';

const mapTileProviders = {
  google_roads: {
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    options: { maxZoom: 20, attribution: 'Google Maps' }
  },
  google_sat: {
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    options: { maxZoom: 20, attribution: 'Google Maps Satélite' }
  },
  carto_dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    options: { maxZoom: 19, subdomains: 'abcd', attribution: 'CartoDB Dark' }
  }
};

function initRealMap() {
  const mapEl = document.querySelector('#realLiveMap');
  if (!mapEl || typeof L === 'undefined') return;

  if (liveLeafletMap) {
    liveLeafletMap.invalidateSize();
    return;
  }

  // Create Leaflet map centered on Mexico
  liveLeafletMap = L.map('realLiveMap', {
    zoomControl: false,
    attributionControl: false,
    fadeAnimation: true,
    zoomAnimation: true
  }).setView([23.6345, -102.5528], 5);

  // Set default tile layer (Google Maps Calles)
  setMapTileLayer('google_roads');

  // Layer groups for markers & route polyline
  activeMarkersGroup = L.layerGroup().addTo(liveLeafletMap);
  activeRouteLayer = L.layerGroup().addTo(liveLeafletMap);

  // Layer buttons
  document.querySelectorAll('.map-layer-selector .layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-layer-selector .layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const layerKey = btn.dataset.layer || 'google_roads';
      setMapTileLayer(layerKey);
      showToast(`Capa de mapa: ${btn.textContent}`);
    });
  });

  // Map Controls
  document.querySelector('#btnMapZoomIn')?.addEventListener('click', () => {
    if (liveLeafletMap) liveLeafletMap.zoomIn();
  });
  document.querySelector('#btnMapZoomOut')?.addEventListener('click', () => {
    if (liveLeafletMap) liveLeafletMap.zoomOut();
  });
  document.querySelector('#btnMapCenter')?.addEventListener('click', () => {
    const v = vehiclesData[currentVehicleId];
    if (v && v.coords && liveLeafletMap) {
      liveLeafletMap.flyTo([v.coords.current.lat, v.coords.current.lng], 13, { duration: 1 });
      showToast(`GPS centrado: ${v.coords.current.name}`);
    }
  });

  // Render active vehicle route
  const currentV = vehiclesData[currentVehicleId];
  if (currentV) {
    updateRealMapForVehicle(currentV);
  }
}

function setMapTileLayer(layerKey) {
  if (!liveLeafletMap || !mapTileProviders[layerKey]) return;
  currentMapLayerKey = layerKey;

  if (currentTileLayer) {
    liveLeafletMap.removeLayer(currentTileLayer);
  }

  const prov = mapTileProviders[layerKey];
  currentTileLayer = L.tileLayer(prov.url, prov.options).addTo(liveLeafletMap);
}

function updateRealMapForVehicle(vehicle) {
  if (!vehicle) return;

  const fallbackCoords = {
    origin: { lat: 19.4326, lng: -99.1332, name: vehicle.origin || 'CDMX' },
    current: { lat: 20.3712, lng: -99.9921, name: 'Autopista Federal · En Ruta', highway: vehicle.corridor || 'Autopista Federal', km: 'KM 120', text: '20.3712° N, -99.9921° W' },
    destination: { lat: 25.6866, lng: -100.3161, name: vehicle.destination || 'Destino' },
    casetas: [],
    routePoints: [[19.4326, -99.1332], [20.3712, -99.9921], [25.6866, -100.3161]]
  };

  const coords = vehicle.coords || fallbackCoords;

  // Update HUD
  const hwyEl = document.querySelector('#mapGpsHighway');
  if (hwyEl) hwyEl.textContent = `${coords.current.highway || vehicle.corridor} · ${coords.current.km || 'KM 148'}`;

  const coordsEl = document.querySelector('#mapGpsCoords');
  if (coordsEl) coordsEl.textContent = coords.current.text || `${coords.current.lat.toFixed(4)}° N, ${coords.current.lng.toFixed(4)}° W`;

  // Update Google Maps Direct Link
  const gmapsBtn = document.querySelector('#btnOpenGoogleMaps');
  if (gmapsBtn) {
    const origStr = `${coords.origin.lat},${coords.origin.lng}`;
    const destStr = `${coords.destination.lat},${coords.destination.lng}`;
    gmapsBtn.href = `https://www.google.com/maps/dir/?api=1&origin=${origStr}&destination=${destStr}&travelmode=driving`;
  }

  if (!liveLeafletMap || typeof L === 'undefined') return;

  // Clear previous layers
  if (activeMarkersGroup) activeMarkersGroup.clearLayers();
  if (activeRouteLayer) activeRouteLayer.clearLayers();

  // 1. Draw glowing route polyline
  if (coords.routePoints && coords.routePoints.length > 0) {
    // Background glow shadow
    L.polyline(coords.routePoints, {
      color: '#38bdf8',
      weight: 8,
      opacity: 0.35,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(activeRouteLayer);

    // Main sharp polyline
    L.polyline(coords.routePoints, {
      color: '#2563eb',
      weight: 4,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(activeRouteLayer);
  }

  // 2. Add Origin Pin (Green)
  const originIcon = L.divIcon({
    className: 'custom-origin-pin',
    html: `<div class="origin-map-pin"><span>🟢</span><span>${coords.origin.name}</span></div>`,
    iconSize: [110, 26],
    iconAnchor: [55, 13]
  });
  L.marker([coords.origin.lat, coords.origin.lng], { icon: originIcon })
    .bindPopup(`<b>Origen:</b> ${coords.origin.name}<br><small>Patio de salida de carga</small>`)
    .addTo(activeMarkersGroup);

  // 3. Add Destination Pin (Red)
  const destIcon = L.divIcon({
    className: 'custom-dest-pin',
    html: `<div class="dest-map-pin"><span>🏁</span><span>${coords.destination.name}</span></div>`,
    iconSize: [115, 26],
    iconAnchor: [57, 13]
  });
  L.marker([coords.destination.lat, coords.destination.lng], { icon: destIcon })
    .bindPopup(`<b>Destino:</b> ${coords.destination.name}<br><small>Punto de entrega y descarga</small>`)
    .addTo(activeMarkersGroup);

  // 4. Add Casetas (Toll Plazas) if present
  if (coords.casetas && coords.casetas.length > 0) {
    coords.casetas.forEach(c => {
      const casetaIcon = L.divIcon({
        className: 'custom-caseta-pin',
        html: `<div class="caseta-map-pin"><span>💳</span><span>${c.name}</span></div>`,
        iconSize: [95, 22],
        iconAnchor: [47, 11]
      });
      L.marker([c.lat, c.lng], { icon: casetaIcon })
        .bindPopup(`<b>${c.name}</b><br><small>Telepeaje IAVE / CAPUFE</small>`)
        .addTo(activeMarkersGroup);
    });
  }

  // 5. Add Live Truck Marker (Custom Pulse & F-350 Truck Icon)
  const truckIcon = L.divIcon({
    className: 'custom-truck-pin',
    html: `
      <div class="truck-map-marker">
        <div class="marker-pulse-ring"></div>
        <div class="marker-truck-icon">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <div class="marker-speed-tag">${vehicle.speed}</div>
      </div>
    `,
    iconSize: [40, 52],
    iconAnchor: [20, 26]
  });

  L.marker([coords.current.lat, coords.current.lng], { icon: truckIcon, zIndexOffset: 1000 })
    .bindPopup(`
      <div style="font-size:10px;">
        <strong style="color:#38bdf8;">Unidad ${vehicle.id}</strong> (${vehicle.model})<br>
        <b>Operador:</b> ${vehicle.driver.name}<br>
        <b>Ubicación:</b> ${coords.current.name}<br>
        <b>Velocidad:</b> ${vehicle.speed} · Diésel: ${vehicle.fuel}%
      </div>
    `)
    .addTo(activeMarkersGroup);

  // 6. Smoothly fly map view to fit route bounds
  const points = coords.routePoints && coords.routePoints.length > 0 ? coords.routePoints : [[coords.origin.lat, coords.origin.lng], [coords.destination.lat, coords.destination.lng]];
  const bounds = L.latLngBounds(points);
  liveLeafletMap.invalidateSize();
  liveLeafletMap.flyToBounds(bounds, {
    padding: [25, 25],
    maxZoom: 13,
    duration: 1.2
  });
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

  // Actualizar mapa satelital real de Google Maps con la unidad activa
  updateRealMapForVehicle(vehicle);

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
    model: 'Ford F-350 Super Duty 2024',
    theme: 'freightliner',
    route: 'CDMX → Monterrey',
    speed: '84 km/h',
    location: 'Autopista 57D · Palmillas',
    lastMsg: 'Todo en orden base, pasando caseta Palmillas sin contratiempos.',
    time: '12:40',
    unread: 1,
    channel: 'CH-19 · 27.185 MHz',
    isAlert: false,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Base PAVA, reportando salida de patio Vallejo con sellos fiscales SAT intactos en la caja seca.', time: '02:40' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Enterado Juan Carlos. Velocidad crucero en autopista 57 es 84 km/h. Monitoreo satelital activo en tu F-350.', time: '02:42' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Todo en orden base, pasando caseta Palmillas sin contratiempos. Estiba y amarres asegurados.', time: '12:40' }
    ]
  },
  {
    id: 'MX-93633762',
    driver: 'Gabriel Soto Villalobos',
    unit: 'MX-93633762',
    model: 'Ford F-350 Chasis Cabina 2023',
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
      { from: 'in', author: 'Operador (Cabina)', text: 'Embarque de electrónica cargado en puerto Contecon Manzanillo. Sellos de seguridad en caja de 14ft verificados.', time: '05:30' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Custodia armada asignada con la patrulla PAVA-SEC-04. Punto de reunión en km 45.', time: '05:35' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Custodia armada confirmada y posicionada en retén. Iniciando ascenso hacia Guadalajara.', time: '11:15' }
    ]
  },
  {
    id: 'MX-916472621',
    driver: 'José Luis Cárdenas',
    unit: 'MX-916472621',
    model: 'RAM 4000 Heavy Duty 2023',
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
    driver: 'Raúl Mendoza Saldaña',
    unit: 'MX-752263347',
    model: 'Ford F-450 Super Duty 2024',
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
      { from: 'out', author: 'Base Central Tráfico', text: 'ALERTA TELEMETRÍA: Velocidad registrada en 96 km/h en autopista federal. Límite SCT para 4.5T es 90 km/h.', time: '04:20' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Copiado base, ajustando velocidad a 85 km/h. Mucho viento lateral en la recta de Sabinas.', time: '04:22' }
    ]
  },
  {
    id: 'MX-118134203',
    driver: 'Alonso Valenzuela Soto',
    unit: 'MX-118134203',
    model: 'Ford F-350 Super Duty 2024',
    theme: 'scania',
    route: 'Tijuana → Mexicali',
    speed: '75 km/h',
    location: 'La Rumorosa · Caseta El Hongo',
    lastMsg: 'Telepeaje IAVE validado en caseta. Todo en orden.',
    time: '01:58',
    unread: 0,
    channel: 'CH-11 · 27.085 MHz',
    isAlert: false,
    messages: [
      { from: 'in', author: 'Operador (Cabina)', text: 'Comenzando cruce de La Rumorosa con insumos médicos termocontrolados.', time: '01:20' },
      { from: 'out', author: 'Base Central Tráfico', text: 'Verifica temperatura de balatas y freno motor auxiliar en la bajada.', time: '01:22' },
      { from: 'in', author: 'Operador (Cabina)', text: 'Telepeaje IAVE validado en caseta El Hongo. Balatas a 90°C (Rango óptimo).', time: '01:58' }
    ]
  },
  {
    id: 'MX-118945307',
    driver: 'Mario Alberto Trejo',
    unit: 'MX-118945307',
    model: 'Ford F-350 Super Duty 2024',
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
      { from: 'in', author: 'Operador (Cabina)', text: 'Saliendo de CEDIS El Marqués con autopartes urgentes Just-In-Time en caja 16ft.', time: '01:10' },
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
        ${isOut ? `<div class="chat-msg-avatar" style="color:#60a5fa;">AM</div>` : ''}
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
            <th>Folio Viaje</th><th>Ruta Completada</th><th>Unidad</th><th>Operador</th><th>Fecha Entrega</th><th>Flete Total</th><th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>VIAJE-MX-4412</strong></td><td>Guadalajara → Monterrey</td><td>MX-752069247 (Ford F-350)</td><td>Juan Carlos Méndez</td><td>06 Sep 2024</td><td>$22,800.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
          <tr><td><strong>VIAJE-MX-4411</strong></td><td>CDMX → Veracruz Puerto</td><td>MX-93633762 (Ford F-350)</td><td>Gabriel Soto</td><td>05 Sep 2024</td><td>$16,400.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
          <tr><td><strong>VIAJE-MX-4410</strong></td><td>Monterrey → Altamira</td><td>MX-752263347 (Ford F-450)</td><td>Raúl Mendoza</td><td>04 Sep 2024</td><td>$18,100.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
          <tr><td><strong>VIAJE-MX-4409</strong></td><td>Toluca → San Luis Potosí</td><td>MX-118945307 (Ford F-350)</td><td>Mario Trejo</td><td>03 Sep 2024</td><td>$14,500.00</td><td><span style="color:#34d399; font-weight:700;">Entregado a Tiempo</span></td></tr>
        </tbody>
      </table>
    `;
  }
}

// -------------------------------------------------------------
// NAVEGACIÓN PRINCIPAL (SIDEBAR VIEWS)
// -------------------------------------------------------------

function switchView(viewName) {
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });
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
    'camiones': { title: 'Parque Vehicular', eye: 'Activos / Camionetas 3.5T y Cajas' },
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

  if (viewName === 'tracking') {
    setTimeout(() => {
      if (liveLeafletMap) {
        liveLeafletMap.invalidateSize();
        const v = vehiclesData[currentVehicleId];
        if (v) updateRealMapForVehicle(v);
      } else {
        initRealMap();
      }
    }, 100);
  }

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
  const model = document.querySelector('#reqModel')?.value || 'Ford F-350 Super Duty';
  const capacity = Number(document.querySelector('#reqCapacity')?.value) || 75;
  const driver = document.querySelector('#reqDriver')?.value || 'Operador PAVA';
  const cargo = document.querySelector('#reqCargo')?.value || 'Carga General 3.5T';

  const newId = 'MX-' + Math.floor(10000000 + Math.random() * 90000000);
  const isVan = model.includes('Sprinter') || model.includes('Master');

  // Coordenadas para nuevas rutas generadas dinámicamente en México
  const newCoords = {
    origin: { lat: 19.4326, lng: -99.1332, name: origin },
    current: { lat: 20.3712, lng: -99.9921, name: `${origin} → ${dest} (En Tránsito Carretero)`, highway: 'Autopista Federal de Cuota', km: 'KM 148', text: '20.3712° N, -99.9921° W' },
    destination: { lat: 25.6866, lng: -100.3161, name: dest },
    casetas: [
      { lat: 19.7042, lng: -99.2312, name: 'Caseta de Salida' },
      { lat: 20.3712, lng: -99.9921, name: 'Caseta Troncal CAPUFE' }
    ],
    routePoints: [
      [19.4326, -99.1332], [19.7042, -99.2312], [20.3712, -99.9921], [22.1565, -100.9855], [25.6866, -100.3161]
    ]
  };

  vehiclesData[newId] = {
    id: newId,
    model: model.includes('202') ? model : model + ' 2024',
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
    speed: '82 km/h',
    fuel: 95,
    odometer: '12,400 km',
    plates: '99-ZZ-1A (SCT 3.5T)',
    vin: '1FT8W3BT' + Math.floor(100000000 + Math.random() * 900000000),
    engine: '6.7L Power Stroke V8 Turbo Diésel 330 HP',
    tempBrakes: '92 °C',
    tirePressure: '80 PSI',
    coords: newCoords,
    driver: {
      name: driver,
      phone: '+52 55 ' + Math.floor(10000000 + Math.random() * 90000000),
      license: 'Licencia Federal Tipo B (3.5T)',
      licenseExp: '10/Dic/2027',
      medicalExp: 'Vigente',
      rating: '5.0 ★',
      trips: 1
    },
    cargo: {
      type: cargo,
      weight: '3.2 Toneladas',
      pallets: '5 Tarimas',
      sealNumber: 'SAT-MX-' + Math.floor(100000 + Math.random() * 900000),
      tempReefer: 'Caja Seca con Copete',
      client: 'Cliente PAVA Track',
      declaredValue: '$650,000.00 MXN'
    },
    billing: {
      subtotal: '$16,000.00',
      iva: '$2,560.00',
      retention: '-$640.00',
      total: '$17,920.00 MXN',
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
document.querySelector('#userMenuTrigger')?.addEventListener('click', () => showToast('Sesión activa: Alex Morales (Jefe de Tráfico México)'));
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

// Window resize handler for Leaflet
window.addEventListener('resize', () => {
  if (liveLeafletMap) {
    liveLeafletMap.invalidateSize();
  }
});

// -------------------------------------------------------------
// INICIALIZACIÓN GLOBAL
// -------------------------------------------------------------
renderFleetGrid('all');
renderTables();
renderSociosView();

// Inicializar mapa interactivo real de Google Maps México
setTimeout(() => {
  initRealMap();
  selectVehicle('MX-752069247', false);
}, 80);

console.log('PAVA Track - Inicializado con éxito y mapa satelital de México activo');
