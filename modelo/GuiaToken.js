import * as tf from "@tensorflow/tfjs";

const nlp = require("compromise"); 

function tokenizarTexto(texto) {
    const doc = nlp(texto); 
    const palabras = doc.terms().out("array"); 
    return palabras;
}

const texto = "Hola, ¿cómo estás?";
const palabrasTokenizadas = tokenizarTexto(texto);
console.log(palabrasTokenizadas);

const vocabulario = new Map();
let indice = 1; 
// Agregar palabras al vocabulario
function agregarAlVocabulario(palabras) {
    palabras.forEach(palabra => {
        if (!vocabulario.has(palabra)) {
            vocabulario.set(palabra, indice);
            indice++;
        }
    });
}

// Ejemplo de uso
const texto1 = "Hola, ¿cómo estás?";
const texto2 = "Hola, soy un chatbot.";
agregarAlVocabulario(tokenizarTexto(texto1));
agregarAlVocabulario(tokenizarTexto(texto2));

console.log(vocabulario);

//Convertir texto a números:
function textoANumeros(texto) {
    const palabras = tokenizarTexto(texto);
    return palabras.map(palabra => vocabulario.get(palabra) || 0); // 0 para palabras desconocidas
}

const numeros = textoANumeros("Hola, ¿cómo estás?");
console.log(numeros);

//Preparar los Datos de Entrenamiento:
const datosEntrenamiento = [
    { texto: "Hola", intencion: "saludo" },
    { texto: "Buenos días", intencion: "saludo" },
    { texto: "Adiós", intencion: "cerrar" },
    { texto: "¿Cómo estás?", intencion: "saludo" },
    { texto: "Necesito ayuda", intencion: "ayuda" }
];

const datosNumericos = datosEntrenamiento.map(dato => ({
    entrada: textoANumeros(dato.texto),
    salida: dato.intencion
}));


//Convertir a tensores:

const entradas = datosNumericos.map(dato => dato.entrada);
const salidas = datosNumericos.map(dato => dato.salida);

const tensorEntradas = tf.tensor2d(entradas);
const tensorSalidas = tf.oneHot(tf.tensor1d(salidas.map(intencion => {
    const intenciones = ["saludo", "ayuda", "cerrar"];
    return intenciones.indexOf(intencion);
}), "int32"), 3); // 3 intenciones

//Definir el modelo:


const model = tf.sequential();
model.add(tf.layers.embedding({ inputDim: vocabulario.size + 1, outputDim: 16, inputLength: 10 }));
model.add(tf.layers.lstm({ units: 32 }));
model.add(tf.layers.dense({ units: 3, activation: "softmax" })); // 3 intenciones
model.compile({ loss: "categoricalCrossentropy", optimizer: "adam" });


//entrenar modelo
model.fit(tensorEntradas, tensorSalidas, { epochs: 100 }).then(history => {
    console.log("Modelo entrenado");
});