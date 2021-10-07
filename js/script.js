//DECLARAMOS VARIABLES
let personas = [];

//CREAMOS LA CLASE PERSONA
class Persona{
    constructor(){
        this.numero = 0,
        this.distancia = 0
    }

    getNumero(numero){
        this.numero = numero;
    }

    getDistancia(distancia){
        this.distancia = distancia;
    }
}
class mainApp{
    static calcularPersonas(num){
        for (let i = 0; i < num; i++) {
            personas[i] = new Persona();
            personas[i].getNumero(i + 1);
        }
        console.log(personas);
    }
}

mainApp.calcularPersonas(25);