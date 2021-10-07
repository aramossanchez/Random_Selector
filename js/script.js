//DECLARO VARIABLES
let personas = [];
let carreraAcabada = false;
let cantidadParticipantes = 0;
//VARIABLES DE CAMBIO DE PANTALLA
let pantallaInicio = document.getElementById("pantalla-inicio");
let pantallaSeleccion = document.getElementById("pantalla-seleccion");
let pantallaCarrera = document.getElementById("pantalla-carrera");
let showRace = document.getElementById("show-race");
let pantallas = {
    "pantallaInicio": pantallaInicio,
    "pantallaSeleccion": pantallaSeleccion,
    "pantallaCarrera": pantallaCarrera
};
//VARIABLE PARA CAPTURAR EL NUMERO DE PERSONAS ELEGIDO POR EL USUARIO
let numeroPersonas = document.getElementById("numero-personas");



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
    //FUNCION QUE UNE LA OBTENCIÓN DEL DATO METIDO POR USUARIO CON LA CREACIÓN DE LOS OBJETOS PERSONA
    static prepararCarrera = () =>{
        this.cogerNumeroPersonas();
        if (cantidadParticipantes > 0) {
            this.calcularPersonas(cantidadParticipantes);
        }
        console.log(personas);
    }
    static moverPersonas(){
        for (let i = 0; i < personas.length; i++) {
            personas[i].getDistancia(parseInt(Math.random() * (3-1) + 1));
            if (personas[i].distancia >= 100) {
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