//Medidas maximas de calculo (en cm)
const altutaMax = 400;
const anchoMax = 70;
const largoMax =2000;

//Ingresos de medidas y material para calcular materiales segun las medidas 
let materialSeleccionado = prompt(`Ingrese el material con el que letruira(con numero). 
    1 - Ladrillo chico.
    2 - Ladrillo grande.
    3 - Ladrillo cemento.
    4 - Ladrillo estandard.
    5 - Durloc.
    `
);
let alturaIngresada = prompt(`Ingrese la altura (metros): `);
let anchoIngresado = prompt(`Ingrese el ancho (centimetros): `);
let largoIngresado = prompt(`Ingrese el largo (metros): `);
//falta aberturas
//let puertasIngresadas = prompt(`Ingrese la puerta que desee.
//    Las medidas de puertas son:
//    1 Puerta - 0.21m x 0.9m.
//    2 Puerta - 0.21m x 0.8m.
//    3 Puerta - 0.21m x 0.7m.
//`);
//let cantidadDeVentanas = prompt(`Ingrese cantidad de ventanas: 1 , 2 o 3.`)
//let ventanaIngresada = prompt(`Ingrese la ventana que desee.
//    Las medidas de las ventans son:
//	1 Ventana - 1.2m.x 1m.
//	2 Ventana - 1.2m x 0.9m.
//	3 Ventana - 0.6m x 0.4m.
//`);

//traspaso de string a numeros del promp
const transformStringToNumber = (elementoATransformar) =>{
    elementoATransformar=parseInt(elementoATransformar)*100  //pasaje de cm a metros y de letras a numeros;
    return elementoATransformar
};
transformStringToNumber(alturaIngresada,anchoIngresado,largoIngresado);


//funcion error de medida maxima sobrepasada
const errormax = () => {
    alert(`Error, su medida seleccionada esta fuera de nuestros calculos`);
};

//funcion dividir ingresos de medidas  por material seleccionado
const div = (medida,tipoMaterial) =>{
    let medidaCalculada = medida/tipoMaterial;
    return medidaCalculada
}

//funcion de calculo sobre materiales necesarios en base a las medidas
const calcReqAlto = () =>{
    let pasoAMtrs=alturaIngresada*100;
    if (pasoAMtrs>altutaMax){
        errormax();
    }else if(alturaIngresada<altutaMax){
        //console.log(`Altura ingresada ${alturaIngresada} metros`);console.log(`Material: ${materialSeleccionado.nombre}`);console.log(`Medidas del material seleccionado (de alto), en cm ${materialSeleccionado.alto}.`);
        let reqXAltura =div(pasoAMtrs,materialSeleccionado.alto);
        console.log(`necesita ${Math.ceil(reqXAltura)} de unidades de ${materialSeleccionado.nombre} para ${alturaIngresada} metros de alto.`)
        return reqXAltura;
    }
};

const calcReqAncho = () =>{
    if (anchoIngresado>anchoMax){
        errormax();
    }else if(anchoIngresado<anchoMax){
        //console.log(`ancho ingresada ${anchoIngresado} centimetros`);console.log(`Material: ${materialSeleccionado.nombre}`);console.log(`Medidas del material seleccionado (de alto), en cm ${materialSeleccionado.ancho}.`);
        let reqXAncho =div(anchoIngresado,materialSeleccionado.ancho);
        console.log(`necesita ${Math.ceil(reqXAncho)} de unidades de ${materialSeleccionado.nombre} para ${anchoIngresado} cm de ancho.`)
        return reqXAncho;
    }
};

const calcReqLargo = () =>{
    let pasoAMtrs=largoIngresado*100;
    if (pasoAMtrs>largoMax){
        errormax();
    }else if(pasoAMtrs<largoMax){
        //console.log(`Altura ingresada ${largoIngresado} metros`);console.log(`Material: ${materialSeleccionado.nombre}`);console.log(`Medidas del material seleccionado (de alto), en cm ${materialSeleccionado.largo}.`);
        let reqXLarg =div(pasoAMtrs,materialSeleccionado.largo);
        console.log(`necesita ${Math.ceil(reqXLarg)} de unidades de ${materialSeleccionado.nombre} para ${largoIngresado} metros de largo.`)
        return reqXLarg;
    }
};

//calculo largoxalto-materialesvarios
const reqXmtr4 = () => {
    let materialesXmetroAlto =  calcReqAlto();
    let materialesXmetroLarg = calcReqLargo();
    calcReqAncho();
    let metros4 = largoIngresado*alturaIngresada;
    let reqXmetroCuadrado = materialesXmetroAlto*materialesXmetroLarg;
    console.log(`necesita ${Math.ceil(reqXmetroCuadrado)} de unidades de ${materialSeleccionado.nombre} para ${metros4} metros cuadrados.`)
};

//funcion material seleccioado igualado a objeto segun caso
//Medidas de materiales en Centimetros
const materialPorPrompt = () =>{
    switch(materialSeleccionado){
        case "1":
            materialSeleccionado=ladrilloChico={
                nombre:"Ladrillo pequeño",
                ancho:10,
                largo:40,
                alto:20
            };
            reqXmtr4();
            break;
        case "2":
            materialSeleccionado=ladrilloGrande={
                nombre:"Ladrillo grande",
                ancho:35,
                largo:40,
                alto:25
            };
            reqXmtr4();
            break;
        case "3":    
            materialSeleccionado=ladrilloCemento = {
                nombre:"Ladrillo de cemento",
                ancho:20,
                largo:40,
                alto:20
            };
            reqXmtr4();
            break;
        case "4":
            materialSeleccionado= ladrilloPerse = {
                    nombre:"Ladrillo normal",
                    ancho:20,
                    largo:38,
                    alto:25
            };
            reqXmtr4();
            break;
        case "5":
            materialSeleccionado=durloc={
                nombre:"Durloc",
                alto : 300,
                ancho: 14,
                largo: 170
            };
            reqXmtr4();
            break; 
    }
};
materialPorPrompt();
//restar a la cuenta final, las aberturas (segun opcion del usuario) y en base a ello mostrar el calculo final y materiales necesarios
//const finalCountMtrs = () => {
//    if(cantidadDeVentanas<1){
//        alert("selecciono cero (0) ventanas");
//        materialPorPrompt();
//    }else{
//        switch(ventanaIngresada){
//            case "1":
//                ventanaIngresada= ventana1={
//                    largo:120,
//                    alto:100
//                }
//                break;
//            case "2":
//            ventanaIngresada= ventana2={
//                largo:120,
//                alto:90
//            }
//                break;
//            case "3":
//                ventanaIngresada= ventana3={
//                    largo:60,
//                    alto:40
//                }
//                break;
//            }
//    }
//}