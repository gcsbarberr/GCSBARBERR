// identifcamos la zona de aterrizaje en la tabla 
const cuerpoTabla = document.getElementById("tabla-usuarios");
// extraemos el archivo del almacenamiento
const listaUsuarios = JSON.parse(localStorage.getItem("usuariosVikingos")) || [];
// recorremos la lista de usuarios y vamos creando las filas de la tabla
listaUsuarios.forEach(function(usuario){
    const fila = document.createElement("tr");

    // se aplica la clase de color de boostrap directamente en las celdas
    fila.innerHTML = `
         <td class="align-middle">${usuario.nombre}</td>
         <td class="text-secondary align-middle">${usuario.correo}</td>
         <td class="text-danger fw-bold text-uppercase align-middle">${usuario.rol}</td>
         `;

         cuerpoTabla.appendChild(fila);
});    

const cuerpoTabla = document.getElementById("tabla-usuarios");
// la función constructora principal
function cargarUsuarios() {
    // limpiamos la tabla antes de dibujar para no publicar datos
    cuerpoTabla.innerHTML = "";

    let listaUsuarios = JSON.parse(localStorage.getItem("usuariosVikingos")) || []; 

    // agregamos la palabra "indice" para saber la posicion exacta de cada cliente 
    listaUsuarios.forEach(function(usuario, indice){
      const fila = document.createElement("tr");
      fila.innerHTML = `
          <td class="align-middle">${usuario.nombre}</td>
          <td class="text-secondary align-middle">${usuario.correo}</td>
          <td class="text-danger fw-bold text-uppercase align-middle">${usuario.rol}</td>
          <td class="align-middle">
          <!-- Botón de Boostrap que dispara la función de eliminar -->
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarUsuario(${indice})">
          Eliminar
          </button>
          </td>
      `;
      cuerpoTabla.appendChild(fila);   
    });
}

// La función destructora 

function eliminarUsuario(indiceDestino) {
  let listaUsuarios = JSON.parse(localStorage.getItem("usuariosVikingos")) || [];

  // recortamos al usuario de la lista 
  listaUsuarios.splice(indiceDestino, 1);

  // guardamos la lista actualizada (sin el usuario) en el disco duro
  localStorage.setItem("usuariosVikingos", JSON.stringify(listaUsuarios));

  // volvemos a dibujar la tabla 
  cargarUsuarios();

  }

  cargarUsuarios();
  