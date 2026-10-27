/* 
   VIKINGOS MASTER - datos.js
   Capa de datos: guarda y lee todo en localstorage */

// Nombre (clave) con el que se guarda cada lista
const CLAVES = {
  usuarios: 'vm_usuarios',
  barberos: 'vm_barberos',
  servicios: 'vm_servicios',
  productos: 'vm_productos',
  citas: 'vm_citas',
  ventas: 'vm_ventas',
  sesion: 'vm_sesion',
  iniciado: 'vm_iniciado',
  servicioElegido: 'vm_servicio_elegido',
};

// Desde cuántas unidades un producto cuenta como "stock bajo"
const STOCK_MINIMO = 5;

/* ---------- Datos de demostración (los del mockup) ---------- */

// Las claves son solo de prueba: en una aplicación real nunca se guardan así.
const USUARIOS_INICIALES = [
  { id: 'u1', nombre: 'Carlos Vikingo', correo: 'admin@vikingosmaster.com', telefono: '3101234567', rol: 'admin', activo: true, registro: '2026-01-15', clave: 'admin123' },
  { id: 'u2', nombre: 'Andrés Guerrero', correo: 'andres@vikingosmaster.com', telefono: '3109876543', rol: 'barbero', activo: true, registro: '2026-02-01', clave: '1234' },
  { id: 'u3', nombre: 'Diego Ramírez', correo: 'diego@vikingosmaster.com', telefono: '3205551234', rol: 'barbero', activo: true, registro: '2026-02-15', clave: '1234' },
  { id: 'u4', nombre: 'Juan Pérez', correo: 'juan@test.com', telefono: '3001234567', rol: 'cliente', activo: true, registro: '2026-03-10', clave: '1234' },
  { id: 'u5', nombre: 'Miguel Torres', correo: 'miguel@test.com', telefono: '3109876543', rol: 'cliente', activo: true, registro: '2026-04-05', clave: '1234' },
  { id: 'u6', nombre: 'Felipe Mora', correo: 'felipe@test.com', telefono: '3205551234', rol: 'cliente', activo: false, registro: '2026-05-20', clave: '1234' },
];

const BARBEROS_INICIALES = [
  { id: 'carlos', nombre: 'Carlos Vikingo', especialidad: 'Cortes Premium y Diseño', experiencia: 8, usuarioId: 'u1', activo: true },
  { id: 'andres', nombre: 'Andrés Guerrero', especialidad: 'Cortes Clásicos y Barba', experiencia: 5, usuarioId: 'u2', activo: true },
  { id: 'diego', nombre: 'Diego Ramírez', especialidad: 'Cortes Modernos y Fade', experiencia: 4, usuarioId: 'u3', activo: true },
];

const SERVICIOS_INICIALES = [
  { id: 'corte-basico', nombre: 'Corte Básico', precio: 25000, extra: '', activo: true },
  { id: 'corte-premium', nombre: 'Corte Premium', precio: 30000, extra: 'Incluye mascarilla', activo: true },
  { id: 'corte-barba', nombre: 'Corte + Barba', precio: 40000, extra: '', activo: true },
  { id: 'corte-premium-diseno', nombre: 'Corte Premium + Diseño', precio: 55000, extra: 'Incluye diseño y pintura temporal', activo: true },
];

const PRODUCTOS_INICIALES = [
  { id: 'cera-mate-premium', nombre: 'Cera Mate Premium', categoria: 'ceras', precio: 35000, stock: 12, activo: true },
  { id: 'gel-extra-fuerte', nombre: 'Gel Extra Fuerte', categoria: 'geles', precio: 22000, stock: 3, activo: true },
  { id: 'pomada-brillante', nombre: 'Pomada Brillante', categoria: 'pomadas', precio: 38000, stock: 15, activo: true },
  { id: 'shampoo-para-barba', nombre: 'Shampoo Para Barba', categoria: 'shampoos', precio: 28000, stock: 0, activo: true },
  { id: 'aceite-de-argan', nombre: 'Aceite de Argán', categoria: 'aceites', precio: 45000, stock: 8, activo: true },
  { id: 'balsamo-hidratante', nombre: 'Bálsamo Hidratante', categoria: 'balsamos', precio: 32000, stock: 10, activo: true },
  { id: 'peine-de-madera', nombre: 'Peine de Madera', categoria: 'peines', precio: 18000, stock: 20, activo: true },
  { id: 'cepillo-para-barba', nombre: 'Cepillo Para Barba', categoria: 'cepillos', precio: 24000, stock: 2, activo: true },
  { id: 'polvo-texturizador', nombre: 'Polvo Texturizador', categoria: 'polvos', precio: 42000, stock: 9, activo: true },
];

const CITAS_INICIALES = [
  { id: 'c1', clienteId: 'u4', clienteNombre: 'Juan Pérez', telefono: '3001234567', servicioId: 'corte-premium', barberoId: 'carlos', fecha: '2026-08-22', hora: '10:00', estado: 'confirmada' },
  { id: 'c2', clienteId: 'u5', clienteNombre: 'Miguel Torres', telefono: '3109876543', servicioId: 'corte-barba', barberoId: 'andres', fecha: '2026-08-23', hora: '11:00', estado: 'confirmada' },
  { id: 'c3', clienteId: 'u6', clienteNombre: 'Felipe Mora', telefono: '3205551234', servicioId: 'corte-basico', barberoId: 'diego', fecha: '2026-08-15', hora: '14:00', estado: 'completada' },
  { id: 'c4', clienteId: null, clienteNombre: 'Sebastián Gil', telefono: '', servicioId: 'corte-premium-diseno', barberoId: 'carlos', fecha: '2026-08-10', hora: '15:00', estado: 'completada' },
  { id: 'c5', clienteId: null, clienteNombre: 'Camilo Herrera', telefono: '', servicioId: 'corte-basico', barberoId: 'andres', fecha: '2026-08-18', hora: '16:00', estado: 'cancelada' },
  { id: 'c6', clienteId: null, clienteNombre: 'Luis Mendoza', telefono: '', servicioId: 'corte-barba', barberoId: 'diego', fecha: '2026-08-25', hora: '09:00', estado: 'cancelada' },
];

const VENTAS_INICIALES = [
  { id: 'v1', cliente: 'Felipe Mora', servicioId: 'corte-basico', barberoId: 'diego', fecha: '2026-08-15', valor: 25000, estado: 'activa' },
  { id: 'v2', cliente: 'Sebastián Gil', servicioId: 'corte-premium-diseno', barberoId: 'carlos', fecha: '2026-08-10', valor: 55000, estado: 'activa' },
  { id: 'v3', cliente: 'Luis Mendoza', servicioId: 'corte-barba', barberoId: 'andres', fecha: '2026-08-08', valor: 40000, estado: 'activa' },
  { id: 'v4', cliente: 'Carlos Ruiz', servicioId: 'corte-premium', barberoId: 'carlos', fecha: '2026-08-05', valor: 30000, estado: 'activa' },
  { id: 'v5', cliente: 'Pedro Sánchez', servicioId: 'corte-basico', barberoId: 'andres', fecha: '2026-08-03', valor: 25000, estado: 'cancelada' },
];

/* ---------- Caja de herramientas para usar los datos ---------- */

// Patrón Repositorio: único lugar que habla con localStorage
const BaseDatos = {

  // Lee una lista guardada. Si todavía no existe, devuelve una lista vacía.
  leer(clave) {
    return JSON.parse(localStorage.getItem(clave)) || [];
  },

  // Guarda una lista completa.
  guardar(clave, lista) {
    localStorage.setItem(clave, JSON.stringify(lista));
  },

  // Carga los datos de demostración, pero solo la primera vez.
  iniciar() {
    if (localStorage.getItem(CLAVES.iniciado)) return;

    this.guardar(CLAVES.usuarios, USUARIOS_INICIALES);
    this.guardar(CLAVES.barberos, BARBEROS_INICIALES);
    this.guardar(CLAVES.servicios, SERVICIOS_INICIALES);
    this.guardar(CLAVES.productos, PRODUCTOS_INICIALES);
    this.guardar(CLAVES.citas, CITAS_INICIALES);
    this.guardar(CLAVES.ventas, VENTAS_INICIALES);

    localStorage.setItem(CLAVES.iniciado, 'si');
  },

  // Para pruebas: borra todo lo del proyecto y vuelve a cargar los datos de demostración.
  reiniciar() {
    Object.values(CLAVES).forEach((clave) => localStorage.removeItem(clave));
    this.iniciar();
  },
};

BaseDatos.iniciar();