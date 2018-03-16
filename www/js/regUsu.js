function registrar(){
	event.preventDefault();
	// --- Validaciones de Campos Vacios
	if(!document.formulario.email.value) return alert("Ingrese su correo");
	if(!document.formulario.password.value) return alert("Ingrese su contraseña");
	if(!document.formulario.password2.value) return alert("Confirme su contraseña");
	if(!document.formulario.phone.value) return alert("Ingrese su Telefono");
	if(!document.formulario.description.value) return alert("No olvide dar una pequeña descrion de ud");
	if(!document.formulario.archivo.value) return alert("Debe Cargar una Foto");

	// --- Validacion de contraseñas coincidentes
	if(document.formulario.password.value != document.formulario.password2.value){
		alert('Las contraseñas no coinciden');
	}else{

	var form = document.getElementById("formulario")
	var formData = new FormData(form);

	$.ajax({
		method: "POST",
		url: 'http://localhost:3000/api/user',
		dataType: "json",
        data: formData,
        processData: false,
        contentType: false
		}).done(function( data ) {
			alert('Usuario Registrado con Exito')
			document.location.href="index.html";
		}).fail(function( jqXHR, textStatus ) {
  			alert('No se pudo Crear el Usuario');
		});
	}
}