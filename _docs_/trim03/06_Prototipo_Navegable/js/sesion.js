/*
   VIKINGOS MASTER - sesion.js
   Lógica de registro, inicio y cierre de sesió */

const MODO_DEMO = true;

/* - Funciones de ayuda ---- */

// Devuelve la fecha de hoy como "2026-10-30" (usa la hora local de tu computador)
function fechaHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// "ana@correo.com" -> "Ana"
function nombreDesdeCorreo(correo) {
  const parte = correo.split('@')[0];
  return parte.charAt(0).toUpperCase() + parte.slice(1);
}

/* ---------- Sesión ---------- */

const Sesion = {

  // Quién tiene la "manilla" puesta. Devuelve null si nadie.
  actual() {
    return JSON.parse(localStorage.getItem(CLAVES.sesion));
  },

  
  guardar(usuario) {
    const datos = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };
    localStorage.setItem(CLAVES.sesion, JSON.stringify(datos));
  },

  // Quita la manilla.
  cerrar() {
    localStorage.removeItem(CLAVES.sesion);
  },

  // Intenta iniciar sesión. Devuelve { ok: true, usuario } o { ok: false, mensaje }.
  iniciar(correo, clave) {
    const correoLimpio = correo.trim().toLowerCase();
    const usuarios = BaseDatos.leer(CLAVES.usuarios);
    const usuario = usuarios.find((u) => u.correo.toLowerCase() === correoLimpio);

    // Caso 1: el correo está registrado
    if (usuario) {
      if (!usuario.activo) {
        return { ok: false, mensaje: 'Tu cuenta está inactiva. Comunícate con la barbería.' };
      }
      if (usuario.clave !== clave) {
        return { ok: false, mensaje: 'Correo o contraseña incorrectos.' };
      }
      this.guardar(usuario);
      return { ok: true, usuario };
    }

    // Caso 2: acceso de demostración
    if (MODO_DEMO && clave.length >= 4) {
      const invitado = {
        id: 'demo',
        nombre: nombreDesdeCorreo(correoLimpio),
        correo: correoLimpio,
        rol: 'cliente',
      };
      this.guardar(invitado);
      return { ok: true, usuario: invitado };
    }

    return { ok: false, mensaje: 'Correo o contraseña incorrectos.' };
  },

  // Crea una cuenta de cliente. Devuelve { ok: true, usuario } o { ok: false, mensaje }.
  registrar(datos) {
    const correoLimpio = datos.correo.trim().toLowerCase();

    if (datos.clave !== datos.confirmarClave) {
      return { ok: false, mensaje: 'Las contraseñas no coinciden.' };
    }

    const usuarios = BaseDatos.leer(CLAVES.usuarios);
    if (usuarios.some((u) => u.correo.toLowerCase() === correoLimpio)) {
      return { ok: false, mensaje: 'Ya existe una cuenta con ese correo.' };
    }

    const usuario = {
      id: 'u' + Date.now(),
      nombre: datos.nombre.trim(),
      correo: correoLimpio,
      telefono: datos.telefono.trim(),
      rol: 'cliente',
      activo: true,
      registro: fechaHoy(),
      clave: datos.clave,
    };

    usuarios.push(usuario);
    BaseDatos.guardar(CLAVES.usuarios, usuarios);
    return { ok: true, usuario };
  },

  // A qué página va cada rol después de iniciar sesión
  rutaInicial(rol) {
    if (rol === 'admin') return 'admin.html';
    if (rol === 'cliente') return 'cliente.html';
    return 'index.html'; // el barbero todavía no tiene panel en el mockup
  },

  // Si la persona no puede ver esta página, la manda a otra. Devuelve true si puede verla.
  proteger(rolRequerido) {
    const sesion = this.actual();

    if (!sesion) {
      window.location.href = 'login.html';
      return false;
    }
    if (sesion.rol !== rolRequerido) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },
};