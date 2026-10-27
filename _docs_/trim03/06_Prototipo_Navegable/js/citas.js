// Lógica de las citas

function formatoHora(hora) {
  const partes = hora.split(':');
  const h = Number(partes[0]);
  const sufijo = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + ':' + partes[1] + ' ' + sufijo;
}

const Citas = {

  horarioOcupado(barberoId, fecha, hora) {
    return BaseDatos.leer(CLAVES.citas).some((c) =>
      c.barberoId === barberoId &&
      c.fecha === fecha &&
      c.hora === hora &&
      c.estado !== 'cancelada'
    );
  },

  crear(datos) {
    if (datos.fecha < fechaHoy()) {
      return { ok: false, mensaje: 'La fecha no puede ser anterior a hoy.' };
    }
    if (this.horarioOcupado(datos.barberoId, datos.fecha, datos.hora)) {
      return { ok: false, mensaje: 'Ese barbero ya tiene una cita a esa hora. Elige otra hora u otro barbero.' };
    }

    const sesion = Sesion.actual();
    const cita = {
      id: 'c' + Date.now(),
      clienteId: sesion ? sesion.id : null,
      clienteNombre: datos.nombre,
      telefono: datos.telefono,
      servicioId: datos.servicioId,
      barberoId: datos.barberoId,
      fecha: datos.fecha,
      hodra: datos.hora,
      estado: 'confirmada',
    };

    const citas = BaseDatos.leer(CLAVES.citas);
    citas.push(cita);
    BaseDatos.guardar(CLAVES.citas, citas);
    return { ok: true, cita };
  },
};