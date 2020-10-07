"use strict";

const rutaPhp = "http://localhost/html/proyectoDelphos/php/";

const ajax = () => {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
};

const serverCall = ( ruta, callback ) => {
	let objAjax = ajax();

	objAjax.open("GET", ruta, true);
	objAjax.onreadystatechange = () => {
		if(objAjax.readyState === 4 && objAjax.status === 200) {
			if (callback != undefined) {
				callback(objAjax.responseText);
			}
		}
	}
	objAjax.send();
};

const mensaje = ( str ) => {
	document.getElementById("mensaje").innerHTML = "";
	document.getElementById("mensaje").innerHTML = str;
	document.getElementById("mensaje_info").style.display = "block";
};

const imprimir = () => {
	var ficha = document.getElementById("Listas");
	var ventimp = window.open(' ', 'popimpr');
	ventimp.document.write(ficha.innerHTML);
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
}

export { serverCall, rutaPhp, mensaje, imprimir };