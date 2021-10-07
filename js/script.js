//DECLARO VARIABLES
let personas = [];
let carreraAcabada = false;
let cantidadParticipantes = 0;
//VARIABLES DE CAMBIO DE PANTALLA
let pantallaInicio = document.getElementById("pantalla-inicio");
let pantallaSeleccion = document.getElementById("pantalla-seleccion");
let pantallaCarrera = document.getElementById("pantalla-carrera");
let pantallas = {
    "pantallaInicio": pantallaInicio,
    "pantallaSeleccion": pantallaSeleccion,
    "pantallaCarrera": pantallaCarrera
};
let showRace = document.getElementById("show-race");
let generarParticipantes = document.getElementById("generar-participantes");
let textoChoose = document.getElementById("choose");

//VARIABLE PARA CAPTURAR EL NUMERO DE PERSONAS ELEGIDO POR EL USUARIO
let numeroPersonas = document.getElementById("numero-personas");

//VARIABLE CREADA PARA PINTAR EN PANTALLA LOS OBJETOS PERSONA CREADAS
let listadoPersonasSeleccion = document.getElementById("listado-personas-seleccion");
let listadoPersonasCarrera = document.getElementById("listado-personas-carrera");



//CREO LA CLASE PERSONA
class Persona{
    constructor(){
        this.numero = 0,
        this.distancia = 0
    }

    getNumero(numero){
        this.numero = numero;
    }

    getDistancia(distancia){
        this.distancia = this.distancia + distancia;
    }
}

//CREO LA CLASE MAINAPP
class mainApp{
    //GESTIONAMOS CAMBIO DE PANTALLAS. PASAMOS A LA FUNCION LA PANTALLA QUE QUERAMOS VER. OCULTA TODAS POR DEFECTO Y MUESTRA LA QUE QUEREMOS VISUALIZAR
    static cambiarPantalla(pantalla){
        for (const property in pantallas) {//FOR IN - RECORRE EL OBJETO
            pantallas[property].style.display = "none";
        }
        pantallas[pantalla].style.display = "flex";
    };
    //OBTIENE EL NÚMERO INTRODUCIDO POR EL USUARIO, TRAS COMPROBAR QUE ES UN NUMERO CORRECTO
    static cogerNumeroPersonas(){
        let numero = parseInt(numeroPersonas.value);
        if (isNaN(numero)) {
            console.log("Introduce un número, máquina");
        }else{
            if (numero <= 0) {
                console.log("Introduce un número mayor de 0, máquina");                
            }
            if(numero > 0){
                cantidadParticipantes = parseInt(numero);
                showRace.style.display = "flex"; //MOSTRAMOS BOTÓN PARA MOSTRAR LA CARRERA
            }
        }
    }
    //SE DESACTIVA EL BOTON ENTER EN EL INPUT
    static controlEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    }
    //SE GENERAN LOS OBJETOS PERSONAS DE MANERA AUTOMATICA
    static calcularPersonas(num){
        for (let i = 0; i < num; i++) {
            personas[i] = new Persona();
            personas[i].getNumero(i + 1);
        }
    }
    //PINTAMOS LOS OBJETOS PERSONA EN PANTALLA SELECCION
    static renderPersonas(){
        for (let i = 0; i < personas.length; i++) {
            listadoPersonasSeleccion.innerHTML = listadoPersonasSeleccion.innerHTML + `<div class="persona">${personas[i].numero}</div>`;
            listadoPersonasCarrera.innerHTML = listadoPersonasCarrera.innerHTML + `<div id="persona-${personas[i].numero}" class="persona-carrera" style="margin-left: 0%">${personas[i].numero}</div>`
        }
    }
    //FUNCION QUE UNE LA OBTENCIÓN DEL DATO METIDO POR USUARIO CON LA CREACIÓN DE LOS OBJETOS PERSONA, ADEMAS DE SU REPRESENTACION EN PANTALLAS
    static prepararCarrera = () =>{
        this.cogerNumeroPersonas();
        if (cantidadParticipantes > 0) {
            this.calcularPersonas(cantidadParticipantes);
            generarParticipantes.style.display = "none";
            numeroPersonas.style.display = "none";
            textoChoose.innerHTML = `You have selected ${cantidadParticipantes} participants!`
            this.renderPersonas();
        }
        console.log(personas);
    }
    //MODIFICAMOS EL VALOR DISTANCIA DE LOS OBJETOS Y MOVEMOS EL DIV QUE LOS CONTIENE
    static moverPersonas(){
        for (let i = 0; i < personas.length; i++) {
            let distanciaRecorrida = parseInt(Math.random() * (3-1) + 1)
            personas[i].getDistancia(distanciaRecorrida);
            let distanciaActual = parseInt(document.getElementById(`persona-${personas[i].numero}`).style.marginLeft.replace("%",""));
            document.getElementById(`persona-${personas[i].numero}`).style.marginLeft = distanciaActual + distanciaRecorrida + "%";
            console.log(distanciaActual);
            if (personas[i].distancia >= 98) {
                carreraAcabada = true;
            }
        };
        console.log(personas);
    }
    static empezarCarrera(){
        while (!carreraAcabada) {
            this.moverPersonas();
        }
    }
}

mainApp.calcularPersonas(cantidadParticipantes);

// setTimeout(() => {
//     mainApp.empezarCarrera();
// }, 500);