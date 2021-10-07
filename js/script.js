//DECLARAMOS VARIABLES
let personas = [];
let carreraAcabada = false;

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
        this.distancia = this.distancia + distancia;
    }
}
class mainApp{
    static calcularPersonas(num){
        for (let i = 0; i < num; i++) {
            personas[i] = new Persona();
            personas[i].getNumero(i + 1);
        }
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

mainApp.calcularPersonas(10);

setTimeout(() => {
    mainApp.empezarCarrera();
}, 500);