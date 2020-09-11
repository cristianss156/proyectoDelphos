$(document).ready(function(){
	$("#mostrar").click(function(){
		$("#fondoMenu").css({'visibility':'visible'});
		$("#menu").css({'marginLeft':'0px'});
	});
	
	$("#fondoMenu").click(function(){
		$(this).css({'visibility':'hidden'});
		$("#menu").css({'marginLeft':'-300px'});
	});

	$("#status").mouseover(function(){
		if($("#header").css("marginTop")==="-90px"){
			$("#header").css({'marginTop':'0px'});
			if("#tabs".length){
				$("#tabs").css({'marginTop':'85px'});
			}
		}
	});

	$("#amonestaciones").click(function(){
		$("#indicador").css({'marginLeft':'0%'});
		$("#contenidoExpulsiones, #contenidoFirmas, #contenidoSancion").css({'display':'none'});
		$("#contenidoAmonestaciones").fadeIn(500);
	});

	$("#expulsiones").click(function(){
		$("#indicador").css({'marginLeft':'25%'});
		$("#contenidoAmonestaciones, #contenidoFirmas, #contenidoSancion").css({'display':'none'});
		$("#contenidoExpulsiones").fadeIn(500);
	});

	$("#nueva_causa").click(function() {
        if($("#nueva_causa").is(':checked')) {
            $("#causa_amo").css({'border-bottom':'2px dotted #bdbdbd','backgroundColor':'#ECEFF1'});
            $("#causa_amo").attr("disabled","disabled");
            $("#causa_amo_nueva").css({'display':'block'});
        }
        else {
        	$("#causa_amo_nueva").css({'display':'none'});
            $("#causa_amo").removeAttr("disabled");
            $("#causa_amo").css({'border-bottom':'2px solid grey','backgroundColor':'white'});
        }
    });

    $("#nueva_causa_expulsion").click(function() {
        if($("#nueva_causa_expulsion").is(':checked')) {
            $("#causa_exp").css({'border-bottom':'2px dotted #bdbdbd','backgroundColor':'#ECEFF1'});
            $("#causa_exp").attr("disabled","disabled");
            $("#causa_exp_nueva").css({'display':'block'});
        }
        else {
        	$("#causa_exp_nueva").css({'display':'none'});
            $("#causa_exp").removeAttr("disabled");
            $("#causa_exp").css({'border-bottom':'2px solid grey','backgroundColor':'white'});
        }
    });

    $("#aceptar_mensaje").click(function(){
    	$("#mensaje_info").fadeOut(500);
    });

    $("#options").click(function(){
    	if($("#listOptions").is(":hidden")){
    		$("#listOptions").css({'display':'block'});
    	}
    	else{
    		$("#listOptions").css({'display':'none'});
    	}
    });
});

$(window).scroll(function(){
	if($(this).scrollTop()>0 && $("#fondoMenu").css("visibility")==="hidden"){
		$("#header").css({'marginTop':'-90px'});
		$("#status").css({'boxShadow':'0px 3px 5px rgba(0,0,0,0.26)'});
		if("#tabs".length){
			$("#tabs").css({'marginTop':'25px'});
			$("#status").css({'boxShadow':'none'});
		}
	}
	else{
		$("#header").css({'marginTop':'0px'});
		$("#status").css({'boxShadow':'none'});
		if("#tabs".length){
			$("#tabs").css({'marginTop':'85px'});
		}
	}
});

function activarFiltros(contenido){
	if(contenido!=="" && contenido.length===9){
		$("#filtros").slideDown(500);
	}
	else{
		$("#filtros").slideUp(500);
		if(document.getElementById("contenedorTabla").hasChildNodes()){
			document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
		}
		document.getElementById("fech_firma").min="";
		document.getElementById("fech_firma").value="";
		document.getElementById("mensaje").innerHTML="";
		document.getElementById("mensaje").innerHTML="Introduce un DNI valido";
		$("#mensaje_info").css({'display':'block'});
	}
}

function aplicarFecha(fecha){
	document.getElementById("fech_firma").min=fecha;
	document.getElementById("fech_firma").value=fecha;
}

function aplicarFechaSan(fecha){
	document.getElementById("fech_Sancion").min=fecha;
	document.getElementById("fech_Sancion").value=fecha;
}

function destacar(elemento){
	if($(elemento).height()!=200){
		$(elemento).css({'zIndex':'2','width':'98%','height':'200px','marginLeft':'1%','marginTop':'4px','marginBottom':'8px','boxShadow':'0px 0px 20px 2px rgba(0,0,0,0.26)'});
	}
	else{
		$(elemento).css({'zIndex':'1','width':'96%','height':'70px','marginTop':'0px','marginLeft':'2%','marginBottom':'4px','boxShadow':'0px 2px 3px 0px rgba(0,0,0,0.26)'});
	}
}

function mostrarBuscar(){
	if($("#filtro_uno").is(':checked')){
		if($("#AmoExpAlumn").is(':hidden')){
			$("#AmoExpAlumn").slideDown(500);
			document.getElementById("dniAlumn").value="";
		}
	}
	else{
		if($("#AmoExpAlumn").is(':visible')){
			$("#AmoExpAlumn").slideUp(500);
		}
	}

	if($("#filtro_tres").is(':checked')){
		if($("#AmoProf").is(':hidden')){
			$("#AmoProf").slideDown(500);
			document.getElementById("codProf").value="";
		}
	}
	else{
		if($("#AmoProf").is(':visible')){
			$("#AmoProf").slideUp(500);
		}
	}

	if($("#filtro_cuatro").is(':checked')){
		if($("#AmoExpGrp").is(':hidden')){
			$("#AmoExpGrp").slideDown(500);
			document.getElementById("codGrp").value="";
		}
	}
	else{
		if($("#AmoExpGrp").is(':visible')){
			$("#AmoExpGrp").slideUp(500);
		}
	}
}

function animar() {
	if($("#middle").width() === 0){
		$("#animacion").css({'transform':'rotate(360deg)'});
		setTimeout(function() {$("#middle").css({'width':'80px'});}, 500);
		setTimeout(function() {$("#middleUno").css({'height':'50px'});}, 700);
		setTimeout(function() {$("#middleDos").css({'marginTop':'100px'});}, 900);
		$("#semiUno").css({'boxShadow':'5px 0px 10px 0px rgba(0,0,0,0.26)'});
		$("#semiDos").css({'boxShadow':'-5px 0px 10px 0px rgba(0,0,0,0.26)'});
		$("#middleUno").css({'boxShadow':'0px 5px 10px 0px rgba(0,0,0,0.26)'});
		$("#middleDos").css({'boxShadow':'0px -5px 10px 0px rgba(0,0,0,0.26)'});
	}
	else{
		$("#middleDos").css({'marginTop':'200px'});
		setTimeout(function(){$("#middleUno").css({'height':'0px'});},300);
		$("#semiUno").css({'boxShadow':'none'});
		$("#semiDos").css({'boxShadow':'none'});
		$("#middleUno").css({'boxShadow':'none'});
		$("#middleDos").css({'boxShadow':'none'});
		setTimeout(function(){$("#middle").css({'width':'0px'});},500);
		setTimeout(function(){$("#animacion").css({'transform':'rotate(-360deg)'});},1000);
	}
}

function mostrarSanciones(){
	$("#indicador").css({'marginLeft':'50%'});
	$("#contenidoAmonestaciones, #contenidoExpulsiones, #contenidoFirmas").css({'display':'none'});
	$("#contenidoSancion").fadeIn(500);
}

function mostrarFirmas(){
	$("#indicador").css({'marginLeft':'75%'});
	$("#contenidoExpulsiones, #contenidoAmonestaciones, #contenidoSancion").css({'display':'none'});
	$("#contenidoFirmas").fadeIn(500);
}