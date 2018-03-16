//--- obtener un Valor por la URL ---

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var r = getParameterByName('r');

//================ Agregar Informacion de la Causa ================

//--- Boton Causa ---
btnlike = document.getElementById("btnlike");
btnlike.setAttribute("onclick","Like()");

//--- Boton Seguir ---
btnseguir = document.getElementById("btnseguir");
btnseguir.setAttribute("onclick","Seguir()");

if(r){
var img = document.getElementById("fotoCausa");
var desc = document.getElementById("descripcion");
var cantLikes = document.getElementById("cantLikes");
var cantSeg = document.getElementById("cantSeg");
var progreso = document.getElementById("progreso");

$.ajax({
	method: "GET",
	url: 'http://localhost:3000/api/cause/'+r,
	dataType: "json"
}).done(function( data ) {

	// progreso
	let prog = 0;
	if(data.cause.likes.length >= data.cause.goal){
		prog = 100;
	}
	else if(data.cause.likes.length != 0){
		prog = Math.round(data.cause.likes.length*100/data.cause.goal);
	}

	let Textprog = document.createTextNode(prog+"% completado");
	progreso.setAttribute("Style","width:"+prog+"%;");
	progreso.appendChild(Textprog)

	// demas datos
	let descText = document.createTextNode(data.cause.description);
	let num1 = document.createTextNode(" "+data.cause.likes.length);
	let num2 = document.createTextNode(" "+data.cause.followers.length);

	desc.appendChild(descText)
	cantLikes.appendChild(num1)
	cantSeg.appendChild(num2)

	img.setAttribute("src","http://localhost:3000/files/causes/"+data.cause.name+"."+data.cause.img);
   	
});
}

//--- Cargar Comentarios ---

if(r){

var caja = document.getElementById("cajaMsj");

$.ajax({
	method: "GET",
	url: 'http://localhost:3000/comment/'+r,
	dataType: "json"
}).done(function( data ) {
	data.map( comment =>{

	let msj = document.createElement('div');
	msj.className = "causa-msj";
		let autor = document.createElement('p');
		let texto = document.createElement('p');
		let fecha = document.createElement('p');

		let text1 = document.createTextNode(comment.owner.email);
		let text2 = document.createTextNode(comment.text);
		let formatoFecha = comment.createdAt.split("T");
		let text3 = document.createTextNode(formatoFecha[0]);

		autor.appendChild(text1)
		texto.appendChild(text2)
		fecha.appendChild(text3)
	msj.appendChild(autor)
	msj.appendChild(texto)
	msj.appendChild(fecha)

	caja.appendChild(msj)

	})
});
}

// ============================= Funciones =============================
// --- Crear Comentario ---

function Comentar(){

	event.preventDefault();

	var com = document.comentar.comentarText.value;

	$.ajax({
		method: "POST",
		url: 'http://localhost:3000/api/comment',
		dataType: "json",
        data: {
	        text: com,
			owner: localStorage.token,
			cause: r,
        }
		}).done(function( data ) {
			alert('Gracias por darnos tu opinion')
			location.reload(true);
		}).fail(function( jqXHR, textStatus ) {
  			alert('No se pudo Crear el Comentario');
		});

}

// ---- Dar Like ---

function Like(){
	event.preventDefault();
	$.ajax({
	method: "GET",
	url: 'http://localhost:3000/api/cause/'+r,
	dataType: "json"
	}).done(function( data ) {
   		
		// Verificar si Ya Dio Like
		if (data.cause.likes.length != 0){
			for(i=0; i<data.cause.likes.length; i++)
			{
				if(data.cause.likes[i] == localStorage.token) return alert('Ya ha Dado Like');
			}
		}

		// Guardar Like
		data.cause.likes.push(localStorage.token);

		$.ajax({
		method: "PUT",
		url: 'http://localhost:3000/like/'+r,
		dataType: "json",
		data: data.cause,
		}).done(function( data ) {
			alert('Gracias por Tu apoyo!');
			location.reload(true);
  		})
  	})

}

// ---- Seguir ---

function Seguir(){
	event.preventDefault();
	$.ajax({
	method: "GET",
	url: 'http://localhost:3000/api/cause/'+r,
	dataType: "json"
	}).done(function( data ) {
   		
		// Verificar si Ya Sigue la Causa
		if (data.cause.followers.length != 0){
			for(i=0; i<data.cause.followers.length; i++)
			{
				if(data.cause.followers[i] == localStorage.token) return alert('Ya Sigue Esta Causa');
			}
		}

		// Guardar seguidor en causa
		data.cause.followers.push(localStorage.token);

		$.ajax({
		method: "PUT",
		url: 'http://localhost:3000/follow/'+r,
		dataType: "json",
		data: data.cause,
		}).done(function( data2 ) {
				$.ajax({
				method: "GET",
				url: 'http://localhost:3000/api/user/'+localStorage.token,
				dataType: "json"
				}).done(function( data3 ) {

					// Guardar causa en el seguidor
					data3.user.causes.push(r);

					$.ajax({
					method: "PUT",
					url: 'http://localhost:3000/follower/'+localStorage.token,
					dataType: "json",
					data: data3.user,
					}).done(function( data ) {
						alert('Ahora Eres un Seguidor de La Causa');
						location.reload(true);
			  		})
			  	})
  		})
  	})

}
// ---- Seguir ---