//Optimizar funciones y modificar el codigo de errores(de sobrepasar medidas)

//funcion para los metros cuadrados
SubProceso metroCuadrado <-calculoMetroCuadrado(alto,largo)
	Definir metroCuadrado Como Real;
	metroCuadrado <- alto*largo;
FinSubProceso

//funcion calculo material por "x" medida que se desee
SubAlgoritmo metroXMaterial<- procesoMateriales(medidaDiv,material)
	Definir metroXMaterial Como Real;
	metroXMaterial<-(medidaDiv/material);
FinSubAlgoritmo

SubProceso  calculoGeneral
	
	//ingreso de medidas
	
	//alto
	Definir medidasAlto Como Real;
	Escribir "***** Ingrese las medidas a calcular *****";
	Escribir "Ingrese el alto en metros: ";
	Leer medidasAlto;
	Si (medidasAlto>3.00) Entonces;
		Escribir "Error, la medida maxima respecto a la altura es 3mtrs, ingrese otra medida";
	FinSi
	
	//ancho
	Definir medidasAncho Como Real;
	Escribir "Ingrese el ancho en cm (centimetros): ";
	Leer medidasAncho;
	Si (medidasAncho>40) Entonces
		Escribir "Error, la medida maxima respecto al espesor es de 40cm, ingrese otra medida";
		Definir medidasAnchoFinal Como Real;
		medidasAnchoFinal <-medidasAncho/100;
	SiNo
		Definir medidasAnchoFinal Como Real;
		medidasAnchoFinal <-medidasAncho/100; //paso de los centimetros ingresados por el usuario a metros
	FinSi
	
	//largo
	Definir medidasLargo Como Real;
	Escribir "Ingrese el largo en metros: ";
	Leer medidasLargo;
	Si (medidasLargo>20.00) Entonces
		Escribir "Error, el largo no debe superar los 20mtrs, por favor ingrese otra medida";
	FinSi
	
	//Opciones de materiales
	Definir materialIngresado Como Entero;
	Escribir "*****  Ingrerse el material a utilizar *****";
	Escribir "1 - Ladrillo chico.";
	Escribir "2 - Ladrillo estandard (normal)";
	Escribir "3 - Ladrillo grande.";
	Escribir "4 - Ladrillo cemento.";
	Escribir "5 - Plata de Durloc.;";
	Leer materialIngresado;
	
	//tipos de materiales segun seleccion del usuario
	Definir nombre Como Caracter;
	Definir material_alto,material_ancho,material_largo Como Real;
	
	Segun materialIngresado Hacer 
		1:	Escribir "Material seleccionado :Ladrillo chico.";
			nombre<-"Ladrillo chico";
			material_alto <- 0.20;
			material_ancho<- 0.10;
			material_largo<- 0.38;
			
		2:  Escribir "Material seleccionado :Estandard.";
			nombre<-"Ladrillo estandad";
			material_alto <-0.25;
			material_ancho<-0.12;
			material_largo<-0.40;
			
		3:	Escribir "Material seleccionado :Ladrillo grande.";
			nombre<-"Ladrillo grande";
			material_alto <-0.30;
			material_ancho<-0.15;
			material_largo<-0.42;
			
		4: 	Escribir "Material seleccionado :Ladrillo de cemento.";
			nombre<-"Ladrillo de cemento";
			material_alto <-0.28;
			material_ancho<-0.17;
			material_largo<-0.42;
			
		5:	Escribir "Material seleccionado :Durloc.";
			nombre<-"Placa de durloc";
			material_alto <- 3.00;
			material_ancho<- 0.05;
			material_largo<- 1.70;
			
		De Otro Modo:
			//si el usuario selecciona una opcion por fuera de las opciones(hasta num 5) se envia error y se vuelve a ejecutar la funcion
			Escribir "Error, seleccione una de nuestras opciones.";
	FinSegun
	
	
	//calculo de metros cuadrados a calcular
	
	//resta de aberturas
	Definir aberturas Como Real;
	aberturas<-0; //cambiar por aberturas entrantes de otro subproceso
	
	//calculo perse
	Definir metroCuadrado Como Real;
	metroCuadrado <- calculoMetroCuadrado(medidasLargo,medidasAlto)-aberturas;
	Escribir "Metros cuadrados a calcular: ",metroCuadrado,".";
	
	//Calculo extra segun materiales seleccionados
	
	//calculo materiales por metro cuadrado
	//materiales necesarios
	Definir largo,alto,ancho Como Real;
	
	largo <- procesoMateriales(medidasLargo,material_largo);
	Escribir nombre," necesario por largo ",largo," ya que tiene ", material_largo," de largo cada ",nombre,".";
	
	//material por el alto
	alto<- procesoMateriales(medidasAlto,material_alto);
	Escribir nombre," necesario por alto ",alto," ya que tiene ",material_alto, " de alto cada ",nombre,".";
	
	//calculo por espesor/ancho
	
	Si (materialIngresado < 5) Entonces
		//salida para cualquier tipo de ladrillo
		
		//fino, finalizacion reemplazar por otros calculos segun corresponda del otro subproceso
		
		Definir fino,finalizacionDePared,total Como Real;
		fino<-0.5;
		finalizacionDePared<-0.3;
		ancho<-material_ancho+fino+finalizacionDePared;
		Escribir "Espesor final de la pared segun el material sera de ", ancho, ".";
		
		//material total necesario segun medidas ingresadas
		total<-calculoMetroCuadrado(alto,largo);
		
		//calculo de cemento/cal/arena para el pegado de ladrillos por metro cuadrado y total(bolsa por kg)
		Definir cemento,arena,cal Como Real;
		cemento<-0.78;
		arena<-9;
		cal<-3;
		
		//total necesario de materiales para pegar los ladrillos
		Definir totalCal,totalArena,totalCemento Como Real;
		totalCal<-metroCuadrado*cal;
		totalArena<-metroCuadrado*arena;
		totalCemento<-metroCuadrado*cemento;
		
		//salida final
		Escribir "Para ",metroCuadrado," metros cuadrados, necesita ",total," de ", nombre,". Para pegar estos ladrillos necesitara: ",totalCal, " kg de cal, ",totalArena, " kg de arena ,",totalCemento," kg respectivamente.";
		
	SiNo
		//salida si se selecciono durloc
		Escribir "Al seleccionar durloc, este material requerira doble placa (externa y interna), por lo cual necesita el doble de placas para lograr un acabado correcto.";
		
		Definir total,montante,montantesNecesarios,tornillos,tornillosTotal Como Real;
		
		//material total necesario segun medidas ingresadas
		total<-calculoMetroCuadrado(alto,largo);
		
		//montante (metal el cual sostiene placa de durloc)
		montante <- 2.6;
		montantesNecesarios<-procesoMateriales(metroCuadrado,montante);
		
		//tornillos necesarios
		tornillos<-10; //por metro cuadrado segun estandares generales
		tornillosTotal<-calculoMetroCuadrado(tornillos,metroCuadrado);
		
		//salida final
		Escribir "Para ",metroCuadrado," metros cuadrados, necesita ",total*2," de ", nombre,". Asi mismo las placas requieren ", montantesNecesarios,"de montantes, para sujetar las placas de durloc y necesitara ",tornillosTotal," de tornillos.";
	FinSi
	
FinSubProceso



//llamado al proceso general para su ejecucion
Proceso general
	calculoGeneral();
FinProceso