import ModeloPredictivo from "modelo.js";

// Ejemplo de datos de entrenamiento
const vocabularioSize = 1000; // Tamaño del vocabulario
const numClases = 5; // Número de intenciones
const X = [
  [1, 2, 3, 4, 5, 0, 0, 0, 0, 0], // Secuencia de palabras tokenizadas
  [6, 7, 8, 9, 10, 0, 0, 0, 0, 0],
  // Más ejemplos...
];
const y = [0, 1, 2, 3, 4]; // Etiquetas de intenciones

// Crear y entrenar el modelo
const modelo = new ModeloPredictivo(vocabularioSize, numClases);
modelo.entrenar(X, y, 10).then(() => {
  console.log("Modelo entrenado.");

  // Predecir una nueva secuencia
  const textoNumerico = [1, 2, 3, 4, 5, 0, 0, 0, 0, 0]; // Ejemplo de texto tokenizado
  const intencion = modelo.predecir(textoNumerico);
  console.log("Intención predicha:", intencion);
});