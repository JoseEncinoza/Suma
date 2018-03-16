function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var category = getParameterByName('category');
var url = "";
if(!category){
	url = 'http://localhost:3000/api/cause';
}else{
	url = 'http://localhost:3000/cause/'+category;
}

// ============================= Carga Masiva =============================

var timeline = document.getElementById("timeline");

$.ajax({
	method: "GET",
	url: url,
	dataType: "json"
}).done(function( data ) {
   	data.causes.map( cause =>{

   	// --- Box center
   	let box = document.createElement('div');
   	box.className = "box text-center";
   		// --- Box title
   		let title = document.createElement('div');
   		title.className = "box-title";
	   		// --- Box title h3
	   		let h3 = document.createElement('h3');
	   		let h3Text = document.createTextNode(cause.name);

	   		h3.appendChild(h3Text)
	   	title.appendChild(h3)
	   	// --- Box Img
   		let boximg = document.createElement('div');
   		boximg.className = "box-img";
   			// --- Box Img a
	   		let a = document.createElement('a');
	   		a.setAttribute("href","causa.html?r="+cause._id);
	   			// --- Box Img a
	   			let img = document.createElement('img');
	   			img.setAttribute("src","http://localhost:3000/files/causes/"+cause.name+"."+cause.img);
	   		a.appendChild(img)
	   	boximg.appendChild(a)
	   	// --- Box footer
   		let boxfooter = document.createElement('div');
   		boxfooter.className = "box-footer";
   			// --- Box footer btns
	   		let h4 = document.createElement('h4');
	   		let h4Text = document.createTextNode(cause.description);
	   		h4.appendChild(h4Text)
	   	boxfooter.appendChild(h4)
	box.appendChild(title)
	box.appendChild(boximg)
	box.appendChild(boxfooter)

	timeline.appendChild(box)
	})
})
// ============================= Carga de categorias =============================

// ---------- Cargar Categorias ---------
var busqueda = document.getElementById("busqueda");

$.ajax({
	method: "GET",
	url: 'http://localhost:3000/api/category',
	dataType: "json",
	}).done(function( data ) {
   		   	data.categories.map( cat =>{

   			let a = document.createElement('a');
   			a.className = "categoria box";
   			a.setAttribute("href","inicio.html?category="+cat._id);
			let text = document.createTextNode(cat.name);

			a.appendChild(text)

			busqueda.appendChild(a)
		})


  	}).fail(function( jqXHR, textStatus ) {
  		alert( "Request failed: " + textStatus );
	});




// ============================= Funciones =============================

// ---- Dar Like ---
var busq = 0;
var etiBusq = document.getElementById("busqueda");

function Busqueda(){
	event.preventDefault();
	if(busq==0){
		etiBusq.setAttribute("style","display: none;");
		return busq=1;
	}
	if(busq==1){
		etiBusq.setAttribute("style","");
		return busq=0;
	}

}