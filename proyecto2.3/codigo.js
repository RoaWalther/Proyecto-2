"use strict"


//Database
const IDBRequest =  indexedDB.open("primeraBD", 1);


IDBRequest.addEventListener("upgradeneeded", ()=> {
	const db = IDBRequest.result;
	db.createObjectStore("nombres", {
		autoIncrement: true
	});
})

//comprueba si se creo correctamente
IDBRequest.addEventListener("success", ()=> {
	leerObjeto();
})

//comprueba si hubo error en la creacion
IDBRequest.addEventListener("error", ()=> {
	console.log("ocurrio un error");
})


document.querySelector('.add').addEventListener("click", ()=>{
	let nombre = document.getElementById("nombre");
	const pattern = new RegExp('^[A-Z a-z]+$');
	if (pattern.test(nombre.value)){
		if (nombre.value.length > 0 && nombre.value.length <35) { 	
			if (document.querySelector(".aceptar") != undefined) {
				if (confirm("Hay elementos si guardar: ¿quieres continuar?")) {
					addObjeto({nombre: nombre.value});
					nombre.value="";
					 leerObjeto();
				}
			} else {
				addObjeto({nombre: nombre.value});
				nombre.value="";
				 leerObjeto();
			}
		}
	}else{
		alert("El valor " + nombre.value + " no es una letra");
	 }
})

const addObjeto = objeto=> {
	const data= IDBdata("readwrite","Agregado correctamente");
	data.add(objeto);
}

const leerObjeto = ()=> {
	const data= IDBdata("readonly");
	const cursor =data.openCursor();
	const fragment = document.createDocumentFragment();
	document.querySelector(".nombres").innerHTML = "";
	cursor.addEventListener("success", (e)=>{
		if (cursor.result) {
			let elemento = nombresHTML(cursor.result.key, cursor.result.value);
			fragment.appendChild(elemento);
			cursor.result.continue();
		} else {
			document.querySelector(".nombres").appendChild(fragment);
		}
	})
}


//actualizamos el objeto
const updateObjeto = (key,objeto)=> {
	const data= IDBdata("readwrite","Modificado correctamente");
	data.put(objeto,key);
}

//eliminamos el objeto
const deleteObjeto = (key)=> {
	const data= IDBdata("readwrite","Eliminado correctamente");
	data.delete(key);
}

const IDBdata = (mode,sms)=>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("nombres", mode);
	const objectStore = IDBtransaction.objectStore("nombres");
	IDBtransaction.addEventListener("complete", ()=> {
	console.log(sms);
	})
	return objectStore;
}


const nombresHTML = (id,nombre)=> {
	const container = document.createElement("DIV");
	const h2 = document.createElement("h2");
	const options = document.createElement("DIV");
	const saveButon= document.createElement("button");
	const deleteButon= document.createElement("button");

	container.classList.add("nombre");
	options.classList.add("options");
	saveButon.classList.add("denegar");
	deleteButon.classList.add("delete");

	saveButon.textContent= "Guardar";
	deleteButon.textContent= "Eliminar";

	h2.textContent = nombre.nombre;
	h2.setAttribute("contenteditable", "true");
	h2.setAttribute("spellcheck", "false");

	options.appendChild(saveButon);
	options.appendChild(deleteButon);

	container.appendChild(h2);
	container.appendChild(options);

	h2.addEventListener("keyup", ()=>{
		saveButon.classList.replace("denegar","aceptar");
	})

	saveButon.addEventListener("click", ()=> {
		if (saveButon.className == "aceptar") {
			updateObjeto(id,{nombre: h2.textContent});
			saveButon.classList.replace("aceptar", "denegar");
		}
	})

	deleteButon.addEventListener("click", ()=>{
		deleteObjeto(id);
		document.querySelector(".nombres").removeChild(container);
	})

	return container;

}

