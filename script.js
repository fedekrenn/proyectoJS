//Clase constructora que me permite crear un listado de recetas
class Receta {
    constructor(nombre, ingredientes, tiempoDeCoccion) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.tiempoDeCoccion = tiempoDeCoccion;
    }
    longitud() {                                      //Método para conocer cantidad de ingredientes
        return (this.ingredientes).length;
    }
    recetaConCarne() {                                 //Método para saber si la receta tiene carne
        return (this.ingredientes).some((val) => val == "carne" || val == "Carne");
    }
}


//Arrays
const listadoRecetas = [];
const comidasVegetarianas = [];
const comidasRapidas = [];
const tiempoTotalDeCocina = [];


//FUNCIONES

//Función que crea un array con los ingredientes que formarán parte de cada receta 
function agregadorIngredientes() {
    let cantidad = parseInt(prompt("¿Cuántos ingredientes tiene?"));
    const nuevoIngrediente = [];
    for (let i = 0; i < cantidad; i++) {
        nuevoIngrediente.push(prompt("Escribe el ingrediente"));
    }
    return nuevoIngrediente.sort();         //Los acomodo alfabéticamente con sort
}

//Función que crea un array seleccionando únicamente las recetas que no tengan carne
function recetasVegetarianas() {
    listadoRecetas.forEach((element) => {
        if (!element.recetaConCarne()) { // Niego con "!" el true del boleano, para obener las que NO tienen carne
            comidasVegetarianas.push(element.nombre);
        }
    });
}

// Función que crea un array con las recetas que tengan tiempo de cocción menor a 20 minutos
function agregarComidaRapida() {
    listadoRecetas.forEach((element) => {
        if (element.tiempoDeCoccion <= 20) {
            comidasRapidas.push(element.nombre);
        }
    })
}

//Función que suma el tiempo de preparación de todas las recetas y devuelve el total
function calcularTiempoTotal() {
    for (const tiempos of listadoRecetas) {
        tiempoTotalDeCocina.push(tiempos.tiempoDeCoccion);
    }
    return tiempoTotalDeCocina.reduce((acc, el) => acc + el, 0);
}

//Función que compara la cantidad de ingredientes para determinar cuál receta es más complicada de cocinar, se usa el método .longitud() del objeto 
function masDificilDeCocinar(primerReceta, segundaReceta) {
    if ((primerReceta.longitud()) > (segundaReceta.longitud())) {
        alert(`Cocinar ${primerReceta.nombre} es más difícil ya que lleva ${primerReceta.longitud()} ingredientes`);
    } else {
        alert(`Cocinar ${segundaReceta.nombre} es más difícil ya que lleva ${segundaReceta.longitud()} ingredientes`);
    }
}






// Creación de c/u de las recetas, con un ciclo para poder obtener la cantidad deseada por el usuario
let cantidadDeseada = parseInt(prompt("¿Cuántas recetas le gustaría ingresar?"));

for (let i = 0; i < cantidadDeseada; i++) {
    listadoRecetas.push(new Receta(prompt("Nombre de la receta:"), agregadorIngredientes(), parseInt(prompt("Cuanto tiempo en minutos demora su preparación?"))));
}





// Lanzo las funciones y muestro alertas por pantalla
recetasVegetarianas();
agregarComidaRapida();
alert(`El tiempo total para cocinar todas esas recetas es de ${calcularTiempoTotal()} minutos`);


// Condicional para mostrar por alerta comidas vegetarianas y rápidas solo si el array tiene elementos
if (comidasVegetarianas.length != 0) {
    alert(`Las comidas aptas para vegetarianos son:\n${comidasVegetarianas.join(`\n`)}`);
}

if (comidasRapidas.length != 0) {
    alert(`Estas son las comidas más rápidas de cocinar:\n${comidasRapidas.join(`\n`)}`);
}








alert(`Usted ha seleccionado ${cantidadDeseada} recetas, vamos a comparar 2 de ellas para ver cual es más difícil de cocinar según sus ingredientes`);

// El código a continuación crea un listado de los nombres de las recetas y adicionalmente le agrega un contador 1 -, 2-, etc según cuantas recetas hay
const contador = listadoRecetas.map((val) => val.nombre);
const contadorConRecetas = [];

for (let i = 0; i < contador.length; i++) {
    contadorConRecetas[i] = `${i + 1} - ${contador[i]}`;
}





/*Lanzador de la función masDificilDeCocinar(), está dentro de un if, para que el usuario pueda elegir
que recetas comparar en el caso de que haya 3 o más, en el caso de ser 2 recetas las compara automáticamente
y en el caso que haya 1 o ninguna no efectua comparación
*/
if (listadoRecetas.length > 2) {
    let comparacionReceta1 = listadoRecetas[(parseInt(prompt(`Ingrese el número de receta del 1 al ${cantidadDeseada}\n${contadorConRecetas.join("\n")}`)) - 1)];
    let comparacionReceta2 = listadoRecetas[(parseInt(prompt(`Ahora ingresá otro número diferente al anterior, del 1 al ${cantidadDeseada}\n${contadorConRecetas.join("\n")}`)) - 1)];
    masDificilDeCocinar(comparacionReceta1, comparacionReceta2);
} else if (listadoRecetas.length == 2) {
    masDificilDeCocinar(listadoRecetas[0], listadoRecetas[1]);
} else {
    alert("No se ingresaron las suficientes recetas para realizar una comparación");
}

