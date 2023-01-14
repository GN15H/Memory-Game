/*
Autho: Ing(c) Cristobal Ochoa Cadavid
Primer BootCamp "piscina-42" UTP sobre fullstack
Date: 2023-01-13
Technologic University of Pereira
*/

//arreglo que contiene la clasificacion de las cargas
var cartas = ['baltazar', 'gaspar', 'ninodios', 'mula', 'pastor', 'melchor', 'jose', 'maria', 'baltazar', 'gaspar', 'ninodios', 'mula', 'pastor', 'melchor', 'jose', 'maria']

//arreglo que contiene los audios
const pistas = ['./audios/Audio_correcta.mp3', './audios/Audio_incorrecta.mp3', './audios/Audio_final.mp3', './audios/Audio_intro.mp3', './audios/Audio_pareja1.mp3', './audios/Audio_pareja2.mp3', './audios/Audio_pareja3.mp3', './audios/Audio_pareja4.mp3', './audios/Audio_pareja5.mp3', './audios/Audio_pareja6.mp3', './audios/Audio_pareja7.mp3', './audios/Audio_pareja8.mp3']

let click = 0  //registra los clicks del jugador
let aciertos = 0 //cuenta la cantidad de aciertos que lleva el jugador
let pista //la pista que se debe de reproducir segun la situación
let clase //clase que se obtiene de la imagen al dar click
var mensaje = "" //string que dara el mensaje segun las cartas seleccionadas
let descubrir //clase de la imagen cubierta

const empezar = document.getElementById('empezar') //boton de empezar
const continuar = document.getElementById('continuar') //boton de continuar
const contenedor = document.querySelector('#contenedor') //div que contiene las cartas
const template = document.querySelector('template').content.cloneNode(true) //contiene clon de contenido de plantilla

//función que se encarga de pausar la pista que se esta reproduciendo
function pausar(){
    pista.pause();
    }

//ciclo que sortea de manera aleatoria el arreglo de las cartas 
for (i = 15; i >= 0; i--) {
    const a = parseInt(Math.random() * i)
    const parte = cartas[a]
    cartas.splice(a, 1)
    cartas.push(parte)
}

//cambia la pista segun el parametro
function cancion(direccion) {
    pista = new Audio(direccion)
}

//funcion que cambia a "mensaje" segun la carta seleccionada
function dar_mensaje(id) {
    switch (id) {
        case 'melchor':
            mensaje = 'El villancico es un género de cancion cuya letra hace referencia a la navidad.'
            break;
        case 'baltazar':
            mensaje = 'A la nanita nana es un villancio compuesto por Jeremías Quinetero, oriundo de Barbacoas, Nariño.'
            break;
        case 'gaspar':
            mensaje = 'La palabra tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo'
            break;
        case 'jose':
            mensaje = 'En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias, la figura del niño Jesús se coloca despúes de la llegada de la navidad.'
            break;
        case 'pastor':
            mensaje = 'A las novenas se les llama "Las posadas" y son fiestas populares de Mexico, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.'
            break;
        case 'mula':
            mensaje = 'En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.'
            break;
        case 'ninodios':
            mensaje = 'El villancico es un género de canción cuya letra hace referencia a la navidad.'
            break;
        case 'maria':
            mensaje = 'La primera celebración navideña en la que se montó un pesebre para la conmemoraciónd del nacimiento de Jesús fue en la nochebuena del año 1223, realizada por San Francisco de Asís.'
            break;
    }
}

//funcion que rota la carta
function rotar(id, carta) {
    if (!carta.classList.contains('carta')) {
        void (0)
    } else {
        if (carta.classList.contains(true)) {
            carta.classList.remove('rotacion')
            carta.parentNode.classList.remove('true')
            carta.parentNode.classList.remove(`${id}`)
        } else {
            carta.classList.remove('rotaciont')
            carta.parentNode.classList.add('true')
            carta.parentNode.classList.add(`${id}`)
            carta.classList.add('rotacion')
        }
    }
}

//evento de click para iniciar el juego
empezar.addEventListener('click', () => {
    empezar.parentNode.parentNode.classList.add('ocultar')
    document.querySelector('body').classList.remove('scrollnt')
    cancion(pistas[3])
    pista.play()
})

//evento de click para continuar el juego
continuar.addEventListener('click', () => {
    if (aciertos == 9) {
        location.reload() //recarga la pagina
    } else { //oprimiendo el boton continuar quitando el modal
        document.querySelector('body').classList.remove('scrollnt')
        continuar.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('ocultar')
        document.querySelector(`.${descubrir}`).remove()
        console.log('pausar cancion')
        pausar()
        aciertos++
        if (aciertos == 8) { //en caso de haber encontrado todas las parejas
            setTimeout(() => { //espera un tiempo para mostrar el modal final
                document.querySelector('.notificacion1').classList.remove('ocultar')
                document.querySelector('.modal_titulo').textContent = "Armaste tu pesebre"
                document.getElementById('datos').textContent = "Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad."
                document.getElementById('continuar').textContent = "Volver a intentar"
                document.querySelector('.modal_content').appendChild(template)
                cancion(pistas[2])
                pista.play()
                aciertos++
            }, 1000)
        }
    }
})

//evento que permite registrar el click en las cartas
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('true')) { //verifica si el click se hizo en una imagen previamente clickeada
        void (0)
    } else {
        let pos = parseInt(e.target.id) //obtiene el id de la carta
        let id
        id = cartas[pos] //obtiene la clase de la carta
        rotar(id, e.target)
        if (click == 0) {
            clase = e.target.parentNode
            console.log(click);
            click = 1
        } else {// en caso de click = 1
            if (clase.classList[4] == e.target.parentNode.classList[4]) { //verifica si dos cartas son iguales
                console.log("melo")
                pausar()
                click = 0
                clase = null
                dar_mensaje(e.target.parentNode.classList[4])
                document.getElementById('datos').textContent = mensaje
                cancion(pistas[0])
                pista.play()
                setTimeout(() => { //espera un momento para mostrar la animación del pesebre
                    document.querySelector('body').classList.add('scrollnt')
                    document.querySelector('.notificacion1').classList.remove('ocultar')
                    descubrir = e.target.parentNode.classList[4] + "t"
                    document.querySelector(`.${descubrir}`).classList.add('showItem')
                    cancion(pistas[aciertos+4])
                    pista.play()
                }, 800)
            } else { //en caso de que las cartas no sean iguales
                setTimeout(() => { //espera un momento para volver a tapar las cartas
                    console.log('melont')
                    clase.classList.remove('true')
                    clase.childNodes[0].classList.remove('rotacion')
                    clase.childNodes[0].classList.add('rotaciont')
                    clase.classList.remove(clase.classList[3])
                    e.target.parentNode.classList.remove('true')
                    e.target.classList.remove('rotacion')
                    e.target.classList.add('rotaciont')
                    e.target.parentNode.classList.remove(id)
                    cancion(pistas[1])
                    pista.play()
                    click = 0;
                }, 700)
            }
        }
    }
})

