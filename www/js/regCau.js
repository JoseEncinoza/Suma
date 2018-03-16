// ---------- Cargar Categorias ---------
var category = document.getElementById("category");

$.ajax({
	method: "GET",
	url: 'http://localhost:3000/api/category',
	dataType: "json",
	}).done(function( data ) {
   		   	data.categories.map( cat =>{

   			let option = document.createElement('option');
   			option.setAttribute("value",cat._id);

			let text = document.createTextNode(cat.name);

			option.appendChild(text)

			category.appendChild(option)
		})


  	}).fail(function( jqXHR, textStatus ) {
  		alert( "Request failed: " + textStatus );
	});

// ---------- Funciones ----------------

function registrar(){
	event.preventDefault();

	// --- Validaciones de Campos Vacios
	if(!document.formulario.name.value) return alert("Debe darle un nombre a su causa");
	if(!document.formulario.description.value) return alert("Por favor describa la finalidad de la causa");
	if(!document.formulario.goal.value) return alert("No olvide decirnos su meta a alcanzar");
	if(!document.formulario.category.value) return alert("Seleccione en que categoria estara su causa, podra ayudarlo a que mas personas den con ella");
	if(!document.formulario.archivo.value) return alert("Debe Cargar una Foto");

	var form = document.getElementById("formulario")
	var formData = new FormData(form);
	formData.append("owner", localStorage.token);

	$.ajax({
		method: "POST",
		url: 'http://localhost:3000/api/cause',
		dataType: "json",
        data: formData,
        processData: false,
        contentType: false
		}).done(function( data ) {
			alert('Ha Creado Una Nueva Causa. Le Deseamos mucho exito!!!')
			document.location.href="inicio.html";
		}).fail(function( jqXHR, textStatus ) {
  			alert('No se pudo Crear la Causa');
		});
}