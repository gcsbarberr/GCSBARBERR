// Identificar: buscamos el formulario usando el id que se uso en HTML
const formularioRegistro = document.getElementById("form-registro");
formularioRegistro.addEventListener("submit", function(evento)){
evento.preventDefault();

//Buscamos cada input por su id y extraemos su valor; value = falso o verdadero 

const nombreusuario = document.getElementById("reg-nombre"). value;
const correoUsuario = document.getElementById("reg-correo"). value;
const passwordUsusario = document.getElementById("reg-password"). value;



console.log("---NUEVO INTENTO DE REGISTRO---");
console.log("Nombre capturado;", nombreUsuario);
console.log("Correo capturado:", correoUsuario);
console.log("Contraseña capturada:", passwordUsuario);

alert("¡Bienvenido a Vikingos Master! Registro exitoso.");


const nuevoUsuario = {
    nombre: nombreUsuario,
    correo: correoUsuario,
    password: passwordUsuario,
    rol: "cliente"
};

// la busqueda de la base de datos (localStorage) para ver si ya existe el usuario
let listaUsuarios = JSON.parse(localStorage.getItem("usuariosVikingos")) || [];
// la inserción 
listaUsuarios.push(nuevoUsuario);
// el guardado permanente 
localStorage.setItem("usuariosVikingos", JSON.stringify(listaUsuarios));
alert("¡Registro exitoso! Usuario guardado en la base de datos.");
// la limpieza
formularioRegistro.reset();

});

