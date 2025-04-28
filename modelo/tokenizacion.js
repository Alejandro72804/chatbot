import * as tf from "@tensorflow/tfjs";
import nlp from "https://cdn.jsdelivr.net/npm/compromise@latest/builds/compromise.mjs";

// Tokenización y vocabulario
const vocabulario = new Map();
let indice = 1;

// Función para tokenizar texto
function tokenizarTexto(texto) {
    const doc = nlp(texto);
    return doc.terms().out("array");
}

// Función para agregar palabras al vocabulario
function agregarAlVocabulario(palabras) {
    palabras.forEach(palabra => {
        if (!vocabulario.has(palabra)) {
            vocabulario.set(palabra, indice);
            indice++;
        }
    });
}

// Función para convertir texto a números
function textoANumeros(texto) {
    const palabras = tokenizarTexto(texto);
    return palabras.map(palabra => vocabulario.get(palabra) || 0);
}

// Cargar el modelo
let model;
async function cargarModelo() {
    try {
        model = await tf.loadLayersModel("modelo/modelo.json"); // Asegúrate de que la ruta sea correcta
        console.log("Modelo cargado correctamente.");
    } catch (error) {
        console.error("Error al cargar el modelo:", error);
    }
}

// Función para predecir la intención
export async function predecirIntencion(texto) {
    if (!model) {
        console.error("El modelo no está cargado.");
        return null;
    }

    const numeros = textoANumeros(texto);
    const tensor = tf.tensor2d([numeros], [1, 10]); // Asegúrate de que la longitud sea consistente
    const prediccion = model.predict(tensor);
    const intencion = tf.argMax(prediccion, 1).dataSync()[0]; // Obtener la clase predicha
    tensor.dispose(); // Liberar memoria
    return intencion;
}

// Cargar el modelo al iniciar
cargarModelo();