"use strict";

let prueba =false;

const zona = document.querySelector(".zona-arrastre");
let barraDeCarga= document.querySelector(".barra-carga");

zona.addEventListener("dragover", (e)=> {
	e.preventDefault();
	cambioEstilo(e.srcElement, "#900");
})

zona.addEventListener("dragleave", (e)=> {
	e.preventDefault();
	cambioEstilo(e.srcElement, "#222");
})

zona.addEventListener("drop", (e)=> {
	e.preventDefault();
	cambioEstilo(e.srcElement, "#222");
    let dato =e.dataTransfer.files[0].type;
    (dato == "image/png" || dato == "image/jpeg")?cargarArchivoImg(e.dataTransfer.files[0])
                :(dato == "video/mp4")?cargarArchivoVideo(e.dataTransfer.files[0])
                :alert("error archivo incorrecto");
	zona.style.border ="4px solid #888"
	zona.textContent="!Cargando archivo";
})

const cambioEstilo = (obj,color)=>{
	obj.style.color = color;
	obj.style.border= `4px dashed ${color}`; 
}

//cargar img

const cargarArchivoImg = (ar)=> {
	const reade = new FileReader();
	reade.readAsDataURL(ar);
	reade.addEventListener("load" ,(e)=> {
		let url = URL.createObjectURL(ar);
		let img = document.createElement("IMG");
		img.setAttribute("src",url);
		document.querySelector(".resultado").appendChild(img);
	});
    	//evento durante y despues de la carga
	reade.addEventListener("loadend", (e)=>{
		cambioEstilo(zona, "#2e7");
		zona.style.border = "4px Solid #090";
		barraDeCarga.style.background ="#4f9";
		setTimeout(()=> {
            zona.style.background ="#4f9";
			zona.style.color = "#090";
			zona.style.animation = `aparecer 2s forwards`;
			zona.textContent="!Carga Completa¡";
		},300);
	});
}


//cargar video
let obj = {
	type: "video/mp4"
}
const cargarArchivoVideo = (cargar)=> {
    let barraDeCarga= document.querySelector(".barra-carga");
    const reade = new FileReader();
    reade.readAsArrayBuffer(cargar);

    //evento del progreso de la carga
    reade.addEventListener("progress", (e)=>{
        let carga = Math.round((e.loaded / cargar.size* 100));
        zona.textContent =`${carga}%`;
        barraDeCarga.style.padding = "75px 20px";
        barraDeCarga.style.width = `${carga/2}%`;
        
    })
    // evento durante y despues de la carga
    reade.addEventListener("loadend", (e)=>{
        cambioEstilo(zona, "#2e7");
        zona.style.border = "4px Solid #090";
        barraDeCarga.style.background ="#4f9";
        setTimeout(()=> {
            zona.style.color = "#fff";
            zona.style.animation = `aparecer 1s forwards`;
            zona.textContent="!Carga Completa¡";
            
        },300);

    })
    
    reade.addEventListener("load" ,(e)=> {
        let video = new Blob([new Uint8Array(e.currentTarget.result)],obj);
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src",url);
        document.querySelector(".resultado").appendChild(img);
        img.pause();
        img.controls = "controls";
    })
}
