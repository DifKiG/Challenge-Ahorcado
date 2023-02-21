//Selectores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display= "none";
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none";
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = "none";
let btnNuevoJuego  = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");


var palabras = ["JAVA", "JAVASCRIPT", "CSS", "HTML", "PROGRAMACION", "PARADIGMA", "OBJETOS", "VARIABLE", "DESARROLLO", "SOFTWARE", "SCRUM"];
var tablero = document.getElementById('horca').getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8;
let letraElegida = [];  

//eventos
// captura el id "iniciar-juego" en el click y direcciona el programa al metodo que inicia el juego  
document.getElementById("iniciar-juego").onclick = () => {
    iniciarJuego();
}    
//captura el id bnt-guardar guarda la palabra agregada e inicia el juego
document.getElementById("btn-guardar").onclick = () => {
    guardarPalabra();
}
//actualiza la  pantalla cuando el usuario hace click en el boton "nuevo-juego"
btnNuevoJuego.addEventListener("click", function () {
    location.reload();
});

//Actualiza la pantalla cuando el usuario hace click en el btn "salir"
btnSalir.addEventListener("click", function () {
    location.reload();
});
//actualiza la pantalla cuando el usuario
btnCancelar.addEventListener("click", function () {
    location.reload();
});

//Escoge una palabra sorteada que sera usada en el ahorcado 
function escogerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra;
    return palabra
}

function verificarLetraClicada(key){
    if (letras.length < 1 || letras.indexOf(key) < 0) {
        letras.push(key)
        return false;
    }
    else{
        letras.push(key)
        return true
    }
}
function adicionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase() 
}
function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0){
        errores -= 1
    }
}

function verificarFinJuego(letra){//checa si la letra ha sico incluida en el array de las letras correctas o incorrectas 
    if(letraElegida.length < palabraSecreta.length){
        //incluye las letras ya digitadas en el array 
        letrasIncorrectas.push(letra);

        //valida si el usuario cometio el numero  maximo de errores
        if (letrasIncorrectas.length > numeroDeErrores){
            perdiste()
        }
        else if(letraElegida.length < palabraSecreta.length){
            adicionarLetraIncorrecta(letra)
            escribirLetraIncorrecta(letra, errores)
        }    
    }
}

//verifica si el usuario ha ganado
function verificarVencedor(letra){
    letraElegida.push(letra.toUpperCase());
    if(letraElegida.length == palabraSecreta.length){
        ganaste();
    }
}
//impide teclas como shift y otras, sean consideradas errores y sean escritas  
function verificarLetra(keyCode){
    if(typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90){
        return true;
    }
    else{
        return false;
    }
}

//haz con que los botones de la pantalla de home desaparezcan y los de agregar palabra aparezcan
function enseñarPantallaDeAgregarPalabra(){
    document.getElementById("div-desaparece").style.display = "none";
    document.getElementById("agregar-palabra").style.display = "block";
}
//guarda la palabra que el usuario quiere agregar
function guardarPalabra(){
    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById("input-nueva-palabra").value;
    //incluye la palabra que el usuario digito en el array de las palabras que seran sorteadas
    if(nuevaPalabra !== ""){
        palabras.push(nuevaPalabra.toUpperCase());
        alert("La palabra fue guardada")
        //haz con que los componentes de la pantalla de agregar palabra desaparezcan
        document.getElementById("agregar-palabra").style.display = "none";
        iniciarJuego();   
    }
    else{
        alert("Ninguna palabra ha sido digitada")
    }
}
//inicia el juego
function iniciarJuego(){
    //hace con que los de inicar juego y agregar palabra desaparezcan
    document.getElementById("div-desaparece").style.display = "none";
    //llama la funcion que dibuja el tablero del ahorcado 
    dibujarTablero();
    //llama la funcion que sortea la palabra
    escogerPalabraSecreta();
    //llama la funcion que dibuja las lineas donde el usuario escribira
    dibujarLineas();
    //hace con que los botones de nuevo juego y salir aparezcan
    document.getElementById("btn-nuevo-juego").style.display = "block"
    document.getElementById("btn-salir").style.display = "block"

    //captura la letra que el usuario escribio
    document.onkeydown = (e) => {
        //pone la letra
        let letra = e.key.toUpperCase()
        //verifica si el usuario todavia no ha perdido
        if(letrasIncorrectas.length <= numeroDeErrores){
            if(!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)){
                if (palabraSecreta.includes(letra)){
                    adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                    for (let i = 0; i < palabraSecreta.length; i++){
                        if (palabraSecreta[i] === letra){
                            escribirLetraCorrecta(i)
                            verificarVencedor(letra)
                        }
                    }
                }
                //si el usuario cometio mas errores delos que son permitidos,
                //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
            else {
                if(!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
                    dibujarAhorcado(errores)
                    verificarFinJuego(letra) 
                }
            }
        }
        else {
            alert ("has agotado el limite de letras incorrectas");
        }
    };
    
}