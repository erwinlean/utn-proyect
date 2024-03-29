//ERROR EN EL CARGADO DE LAS PUERTAS

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
    5 - Durloc.`);
let alturaIngresada = prompt(`Ingrese la altura (metros): 
(maximo de 4 metros de alto)`);
let anchoIngresado = prompt(`Ingrese el ancho (centimetros): 
(maximo 70 cm ancho)`);
let largoIngresado = prompt(`Ingrese el largo (metros): 
(maximo 20 metros de largo)`);
//let puertaIngresada = prompt(`Ingrese la puerta que desee.
//    Las medidas de puertas son:
//    1 - Puerta - 0.21m x 0.9m.
//    2 - Puerta - 0.21m x 0.8m.
//    3 - Puerta - 0.21m x 0.7m.`);
let cantidadDeVentanas = prompt(`Ingrese cantidad de ventanas: 
    0 ,
    1 ,
    2 ,
    3 .`);
let ventanaIngresada = prompt(`Ingrese la ventana que desee.
    Las medidas de las ventans son:
    1 - Ventana - 1.2m.x 1m.
    2 - Ventana - 1.2m x 0.9m.
    3 - Ventana - 0.6m x 0.4m.`);

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
        console.log(`Necesita ${Math.ceil(reqXAltura)} de unidades de ${materialSeleccionado.nombre} para ${alturaIngresada} metros de alto.`)
        return reqXAltura;
    }
};

const calcReqAncho = () =>{
    if (anchoIngresado>anchoMax){
        errormax();
    }else if(anchoIngresado<anchoMax){
        //console.log(`ancho ingresada ${anchoIngresado} centimetros`);console.log(`Material: ${materialSeleccionado.nombre}`);console.log(`Medidas del material seleccionado (de alto), en cm ${materialSeleccionado.ancho}.`);
        let reqXAncho =div(anchoIngresado,materialSeleccionado.ancho);
        console.log(`Necesita ${Math.ceil(reqXAncho)} de unidades de ${materialSeleccionado.nombre} para ${anchoIngresado} cm de ancho.`)
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
        console.log(`Necesita ${Math.ceil(reqXLarg)} de unidades de ${materialSeleccionado.nombre} para ${largoIngresado} metros de largo.`)
        return reqXLarg;
    }
};

//calculo largoxalto-materialesvarios
const reqXmtr4 = () => {
    let materialesXmetroAlto =  calcReqAlto();
    let materialesXmetroLarg = calcReqLargo();
    calcReqAncho();
    //let metros4Puerta = puertaIngresada.alto*puertaIngresada.largo;
    let metros4 = (largoIngresado*alturaIngresada)//-metros4Puerta;
    let reqXmetroCuadrado = materialesXmetroAlto*materialesXmetroLarg;
    console.log(`Necesita ${Math.ceil(reqXmetroCuadrado)} de unidades de ${materialSeleccionado.nombre} para ${metros4} metros cuadrados.`)
}

//materiales
const materialPorPrompt = () =>{
    switch(materialSeleccionado){
        case `1`:
            materialSeleccionado=ladrilloChico={
                nombre:`Ladrillos pequeños`,
                ancho:10,
                largo:40,
                alto:20
            };
            break;
        case `2`:
            materialSeleccionado=ladrilloGrande={
                nombre:`Ladrillos grandes`,
                ancho:35,
                largo:40,
                alto:25
            };
            break;
        case `3`:    
            materialSeleccionado=ladrilloCemento = {
                nombre:`Ladrillos de cemento`,
                ancho:20,
                largo:40,
                alto:20
            };
            break;
        case `4`:
            materialSeleccionado= ladrilloPerse = {
                nombre:`Ladrillos normal`,
                ancho:20,
                largo:38,
                alto:25
            };
            break;
        case `5`:
            materialSeleccionado=durloc={
                nombre:`Durloc`,
                alto : 300,
                ancho: 70, //inicializado como max cantidad de ancho, ya que no necesita masque esto.
                largo: 170
            };
            break; 
    }
    
};

//puerta
//const puertaSeleccionada = () =>{
//    switch(puertaIngresada){
//        case "1":
//            puertaIngresada=puerta1={
//                largo:0.21,
//                alto:0.90
//            }
//            break;
//        case "2":
//            puertaIngresada=puerta2={
//                largo:0.21,
//                alto:0.80
//            }
//            break;
//        case "3":puertaIngresada=puerta3={
//                largo:0.21,
//                alto:0.70
//            }   
//            break;
//        }
//};
//puertaSeleccionada();
//console.log(puertaIngresada);

//calculo descuento aberturas
const mtrRestaAbertura = () => {
    //calculo material x alto y largo y ancho(funcion y multiplicacion para sacar metro cuadrado y materiales de estos)
    let materialesXmetroAlto =  calcReqAlto();
    let materialesXmetroLarg = calcReqLargo();
    calcReqAncho();
    //calculo aberturas, metro cuadrado y cuanto materiales se necesitan para esto, para restar a los materiales necesarios
    console.log("Material seleccionado :"+ materialSeleccionado.nombre);
    let metros4Aberturas=(ventanaIngresada.alto*ventanaIngresada.largo)*cantidadDeVentanas;
    let aberXLarg = div(ventanaIngresada.largo,materialSeleccionado.largo);
    let aberXAlto = div(ventanaIngresada.alto,materialSeleccionado.alto);
    //metros cuadrados puerta
    //let metros4Puerta = puertaIngresada.alto*puertaIngresada.largo;
    //metros cuadrados de construccion , menos abertura y puerta
    let restaMaterialesAberturas=aberXAlto*aberXLarg;
    let metros4 = ((largoIngresado*alturaIngresada)-metros4Aberturas)//-metros4Puerta;
    //calculo descuento puerta
    //let puertaXalto = div(puertaIngresada.alto/materialSeleccionado.alto);
    //let puertaXLargo= div(puertaIngresada.largo/materialSeleccionado.largo);
    //let puertaXMaterial=puertaXLargo*puertaXalto;
    //console.log(puertaXMaterial)
    console.log(`${metros4} metros cuadrados de paredes descontando las aberturas`);
    //calculo final metros cuadrados de materiales necesarios, menos materiales necesarios que se utiliza en aberturas
    let reqXmetroCuadrado = ((materialesXmetroAlto*materialesXmetroLarg)-restaMaterialesAberturas)//-puertaXMaterial;
    console.log(`Necesita ${Math.ceil(reqXmetroCuadrado)} de unidades de ${materialSeleccionado.nombre} para ${metros4} metros cuadrados.`)
};

//funcion resta de aberturas
const finalCountMtrs = () => {
    transformStringToNumber(cantidadDeVentanas);
    if(cantidadDeVentanas<1){
        materialPorPrompt();
        switch(cantidadDeVentanas){
            case `0`:
            alert(`selecciono sin ventanas (cero ventanas).`);
            reqXmtr4();
            break;
        }
    }else if(cantidadDeVentanas>=1){
        materialPorPrompt();
        switch(ventanaIngresada){
            case `1`:
                ventanaIngresada=ventana1={
                    largo:1.20,
                    alto:1.00
                };
                mtrRestaAbertura();
                break;
            case `2`:
                ventanaIngresada=ventana2={
                    largo:1.20,  
                    alto:0.90
                };
                mtrRestaAbertura();
                break;
            case `3`:
                ventanaIngresada=ventana3={
                    largo:0.60,
                    alto:0.40
                };
                mtrRestaAbertura();
                break;
        }
    }
}
finalCountMtrs();