//funcion que imprime el contenido del elemento html que se recoge por Id
function imprimir(){
	var ficha=document.getElementById("Listas");
	var ventimp=window.open(' ','popimpr');
	ventimp.document.write(ficha.innerHTML);
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
}