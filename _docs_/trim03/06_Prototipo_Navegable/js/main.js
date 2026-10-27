/* ============================================
   VIKINGOS MASTER - main.js
   Conecta las páginas con la lógica.
   Cada función revisa si su parte existe en la página.
   ============================================ */

/* ---------- Mensajes de error ---------- */

function mostrarMensaje(caja, texto) {
  caja.textContent = texto;
  caja.classList.remove('d-none');
}

function ocultarMensaje(caja) {
  caja.classList.add('d-none');
}

/* ---------- Navbar: cambia según haya sesión o no ---------- */

function actualizarNavbar() {
  const navLogin = document.getElementById('navLogin');
  const navUser = document.getElementById('navUser');
  const navUserName = document.getElementById('navUserName');
  const btnSalir = document.getElementById('btnSalir');
  const sesion = Sesion.actual();

  // toggle(clase, true) la pone; toggle(clase, false) la quita
  if (navLogin) navLogin.classList.toggle('d-none', Boolean(sesion));
  if (navUser) navUser.classList.toggle('d-none', !sesion);

  if (navUserName && sesion) {
    navUserName.textContent = sesion.nombre.split(' ')[0]; // solo el primer nombre
  }

  // Al hacer clic en "Salir", se cierra la sesión y el enlace lleva al inicio
  if (btnSalir) {
    btnSalir.addEventListener('click', () => Sesion.cerrar());
  }
}

/* ---------- Paneles protegidos ---------- */

// Las páginas privadas llevan <body data-rol="admin"> o <body data-rol="cliente">
function protegerPagina() {
  const rolRequerido = document.body.dataset.rol;
  if (!rolRequerido) return; // página pública: no hay nada que proteger
  Sesion.proteger(rolRequerido);
}

/* ---------- Formulario: Iniciar sesión ---------- */

function iniciarFormLogin() {
  const form = document.getElementById('formLogin');
  if (!form) return;

  const caja = document.getElementById('mensajeLogin');

  form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    ocultarMensaje(caja);

    const resultado = Sesion.iniciar(form.elements.correo.value, form.elements.clave.value);

    if (!resultado.ok) {
      mostrarMensaje(caja, resultado.mensaje);
      return;
    }
    window.location.href = Sesion.rutaInicial(resultado.usuario.rol);
  });
}

/* ---------- Formulario: Crear cuenta ---------- */

function iniciarFormRegistro() {
  const form = document.getElementById('formRegistro');
  if (!form) return;

  const caja = document.getElementById('mensajeRegistro');

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    ocultarMensaje(caja);

    const datos = {
      nombre: form.elements.nombre.value,
      telefono: form.elements.telefono.value,
      correo: form.elements.correo.value,
      clave: form.elements.clave.value,
      confirmarClave: form.elements.confirmarClave.value,
    };

    const resultado = Sesion.registrar(datos);

    if (!resultado.ok) {
      mostrarMensaje(caja, resultado.mensaje);
      return;
    }

    // Cuenta creada: inicia sesión sola y va al panel del cliente
    Sesion.iniciar(datos.correo, datos.clave);
    window.location.href = Sesion.rutaInicial('cliente');
  });
}

/* ---------- Guardar el servicio al que se le dio clic ---------- */

function iniciarBotonesReservar() {
  document.querySelectorAll('[data-servicio]').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      localStorage.setItem(CLAVES.servicioElegido, enlace.dataset.servicio);
    });
  });
}

/* ---------- Formulario: Reservar cita ---------- */

function iniciarFormReserva() {
  const form = document.getElementById('formReserva');
  if (!form) return;

  const tarjetaForm = document.getElementById('tarjetaForm');
  const confirmacion = document.getElementById('confirmacion');
  const contenedorError = document.getElementById('mensajeError');
  const aviso = contenedorError.querySelector('.alert');

  // Si hay sesión, rellena nombre y teléfono
  function rellenarDatosUsuario() {
    const sesion = Sesion.actual();
    if (!sesion) return;
    const usuario = BaseDatos.leer(CLAVES.usuarios).find((u) => u.id === sesion.id);
    form.elements.nombre.value = sesion.nombre;
    if (usuario) form.elements.telefono.value = usuario.telefono;
  }

  form.elements.fecha.min = fechaHoy();
  rellenarDatosUsuario();

  // Servicio elegido en otra página
  const elegido = localStorage.getItem(CLAVES.servicioElegido);
  if (elegido) {
    form.elements.servicio.value = elegido;
    localStorage.removeItem(CLAVES.servicioElegido);
  }

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    contenedorError.classList.add('d-none');

    const resultado = Citas.crear({
      nombre: form.elements.nombre.value.trim(),
      telefono: form.elements.telefono.value.trim(),
      servicioId: form.elements.servicio.value,
      barberoId: form.elements.barbero.value,
      fecha: form.elements.fecha.value,
      hora: form.elements.hora.value,
    });

    if (!resultado.ok) {
      aviso.textContent = resultado.mensaje;
      contenedorError.classList.remove('d-none');
      return;
    }
    mostrarConfirmacion(resultado.cita);
  });

  function mostrarConfirmacion(cita) {
    const servicio = BaseDatos.leer(CLAVES.servicios).find((s) => s.id === cita.servicioId);
    const barbero = BaseDatos.leer(CLAVES.barberos).find((b) => b.id === cita.barberoId);

    document.getElementById('resServicio').textContent = servicio.nombre;
    document.getElementById('resBarbero').textContent = barbero.nombre;
    document.getElementById('resFecha').textContent = cita.fecha;
    document.getElementById('resHora').textContent = formatoHora(cita.hora);
    document.getElementById('resContacto').textContent = cita.telefono;

    tarjetaForm.classList.add('d-none');
    confirmacion.classList.remove('d-none');
  }

  document.getElementById('btnNueva').addEventListener('click', () => {
    form.reset();
    rellenarDatosUsuario();
    confirmacion.classList.add('d-none');
    tarjetaForm.classList.remove('d-none');
  });
}


/* ---------- Arranque ---------- */



actualizarNavbar();
protegerPagina();
iniciarFormLogin();
iniciarFormRegistro();