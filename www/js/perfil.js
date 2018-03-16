// --- datos ---
var img = document.getElementById("fotoPerfil");
var email = document.getElementById("correoPerfil");
var telf = document.getElementById("telefonoPerfil");
// --- Time line ---
var timeline = document.getElementById("timeline");

$.ajax({
	method: "GET",
	url: 'http://localhost:3000/user/populate/'+localStorage.token,
	dataType: "json"
}).done(function( data ) {
   	
   	let emailText = document.createTextNode(data.user.email);
   	let telfText = document.createTextNode(data.user.phone);

   	email.appendChild(emailText)
   	telf.appendChild(telfText)

   	img.setAttribute("src","http://localhost:3000/files/users/"+data.user.email+"."+data.user.img);

    data.user.causes.map( cause =>{

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

}).fail(function( jqXHR, textStatus ) {
  	alert("No se pudo Conectar con el Servidor");
});