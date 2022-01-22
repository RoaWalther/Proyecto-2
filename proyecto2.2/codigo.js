"use strict"

//Api geolocation() 

const geo = navigator.geolocation;

const posicion = (pos)=> {
	console.log(pos);
}

const err = (e)=> {
	console.log(e)
}
const optiones = {

	maximumAge: 0,
	timeout: 3000,
	enableHightAccuracy: true
}

geo.getCurrentPosition(posicion, err,optiones);//obtener la posicion de conexión

//Api FileReader= seleccionar archivos

const archivo = document.getElementById("archivo");
const archivoImg = document.getElementById("archivo-img");
const resultado = document.querySelector(".resultado");

archivo.addEventListener("change", (e)=> {
	leerArchivo(archivo.files);
})

const leerArchivo = (ar) =>{
    console.log((ar));
	for (let i = 0; i < ar.length; i++) {
		const reader = new FileReader();
		reader.readAsText(ar[i]);
        reader.FileReader;
		reader.addEventListener("load",(e)=> {
            resultado.innerHTML = e.currentTarget.result;
		})
	}
}

archivoImg.addEventListener("change", (e)=> {
	leerArchivoImg(archivoImg.files);
})

const leerArchivoImg = (ar) =>{

	for (let i = 0; i < ar.length; i++) {
		const reader = new FileReader();
		reader.readAsDataURL(ar[i]);
		reader.addEventListener("load",(e)=> {
		let newImg = `<img src='${e.currentTarget.result}'>`;
		resultado.innerHTML+=newImg;
		})
	}
}






















