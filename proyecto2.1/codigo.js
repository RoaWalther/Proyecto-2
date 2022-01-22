"use strict"

//manejo de apis

const addZeros = (numCeros)=> {

	if (numCeros.toString().length <2) { 
		return "0".concat(numCeros);
	}
		return numCeros;
}

const actualizarHora = ()=> {
	Date();
	const time = new Date();
	let horas = addZeros(time.getHours());
	let minutos = addZeros(time.getMinutes());
	let segundos =addZeros( time.getSeconds());

	document.querySelector(".horas").textContent = horas;
	document.querySelector(".minutos").textContent = minutos;
	document.querySelector(".segundos").textContent = segundos;
}

actualizarHora();
setInterval(actualizarHora);

//texturas

const zona = document.querySelector(".zona");
zona.addEventListener("dragover", (e)=>{
	e.preventDefault();
})
zona.addEventListener("drop", (e)=>{
	let num = e.dataTransfer.getData("textura");
	zona.style.background = `url("./img/textura${num}.png")`;
})

let child = document.querySelector(".texturas").children.length;
for (let i = 1; i < child+1; i++) {
	
	document.querySelector(`.textura${i}`).addEventListener("dragstart", (e)=>transferirTextura(i,e))
}

const transferirTextura =(n,e)=> {
	e.dataTransfer.setData("textura",n);
}

// drag y drop

const circulo = document.querySelector(".circulo");
const rectangulo = document.querySelector(".rectangulo");

document.querySelector(".color").addEventListener("click",()=>{
	let color = document.getElementById("color").value;
	circulo.style.background = color;
})

circulo.addEventListener("mouseover", runnCircle);
let punto=0;
function runnCircle(){
	punto++;
	let randTop = Math.round(Math.random()*400);
	let randLeft = Math.round(Math.random()*400);
	circulo.style.marginTop = `${randTop}px`;
	circulo.style.marginLeft = `${randLeft}px`;
}

circulo.addEventListener("dragstar", (e)=>{
	e.dataTransfer.setData("clase",e.target.className);
	console.log(e)
});
circulo.addEventListener("drag", ()=>console.log(2));
circulo.addEventListener("dragend", ()=> console.log(3));


rectangulo.addEventListener("dragenter",()=>{ 
	rectangulo.style.background = color;
	
	console.log(4)});
rectangulo.addEventListener("dragover",(e)=> {
	e.preventDefault();
	console.log(5)
});
rectangulo.addEventListener("drop",(e)=> {
	console.log(e.dataTransfer.getData("clase"));
	rectangulo.style.background = color;
	console.log(e)
});
rectangulo.addEventListener("dragleave",(e)=> {
	rectangulo.style.background = color;
	console.log(7)
	console.log(e)
});

//localStorage y sectionStorage 
setInterval(()=>{
	localStorage.setItem("nombre", punto); 
},1000);

setTimeout(()=>{
	localStorage.removeItem("nombre");
}, 60000);

sessionStorage.setItem("nombre", "Walther"); 

setTimeout(()=>{
	sessionStorage.removeItem("nombre");
}, 20000);



