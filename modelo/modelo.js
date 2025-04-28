import * as tf from "@tensorflow/tfjs";

class ModeloPredictivo {
  constructor(vocabularioSize, numClases) {
    this.vocabularioSize = vocabularioSize; // Tamaño del vocabulario
    this.numClases = numClases; // Número de clases (intenciones)
    this.model = this.crearModelo();
  }

  // Crear el modelo
  crearModelo() {
    const model = tf.sequential();

    // Capa de embedding para convertir palabras en vectores
    model.add(
      tf.layers.embedding({
        inputDim: this.vocabularioSize, // Tamaño del vocabulario
        outputDim: 16, // Dimensión del espacio de embedding
        inputLength: 10, // Longitud máxima de la secuencia de entrada
      })
    );

    // Capa LSTM para procesar secuencias
    model.add(tf.layers.lstm({ units: 32 }));

    // Capa densa para la clasificación
    model.add(tf.layers.dense({ units: this.numClases, activation: "softmax" }));

    // Compilar el modelo
    model.compile({
      optimizer: "adam",
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });

    return model;
  }

  // Entrenar el modelo
  async entrenar(X, y, epochs = 10) {
    const XTensor = tf.tensor2d(X, [X.length, 10]); // Asegúrate de que X tenga la forma correcta
    const yTensor = tf.oneHot(tf.tensor1d(y, "int32"), this.numClases);

    await this.model.fit(XTensor, yTensor, {
      epochs,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Época ${epoch + 1}: Pérdida = ${logs.loss.toFixed(4)}, Precisión = ${logs.acc.toFixed(4)}`);
        },
      },
    });

    XTensor.dispose();
    yTensor.dispose();
  }

  // Predecir la intención de un texto
  predecir(textoNumerico) {
    const inputTensor = tf.tensor2d([textoNumerico], [1, 10]); // Asegúrate de que el texto esté en formato numérico
    const prediccion = this.model.predict(inputTensor);
    const intencion = tf.argMax(prediccion, 1).dataSync()[0]; // Obtener la clase predicha
    inputTensor.dispose();
    return intencion;
  }

  // Guardar el modelo
  async guardarModelo(ruta) {
    await this.model.save(`file://${ruta}`);
    console.log("Modelo guardado correctamente.");
  }

  // Cargar el modelo
  async cargarModelo(ruta) {
    this.model = await tf.loadLayersModel(`file://${ruta}/model.json`);
    console.log("Modelo cargado correctamente.");
  }
}

export default ModeloPredictivo;