// -------- Iniciar Session --------
function Ingresar(){
	event.preventDefault();
	// --- Validaciones de Campos Vacios
	if(!document.formulario.email.value) return alert("Ingrese su correo");
	if(!document.formulario.password.value) return alert("Ingrese su contraseña");
	// --- Query
	$.ajax({
		method: "POST",
		url: 'http://localhost:3000/sessions',
		dataType: "json",
		data: {
			email: document.formulario.email.value,
			password: document.formulario.password.value
	}
	}).done(function( data ) {
		alert(data.message);		
		if(!data.token){

		}else{
			localStorage.setItem('token', data.token);
			document.location.href="inicio.html";
		}
	});
}
	