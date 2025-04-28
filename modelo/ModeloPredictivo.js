class ModeloPredictivo {
  constructor(vocabularioSize, numClases, epcs) {
    this.epc = epcs; // Número de épocas para el entrenamiento
    this.vocabularioSize = vocabularioSize; // Tamaño del vocabulario
    this.numClases = numClases; // Número de clases (intenciones)
    this.model = this.crearModelo();
    this.guardarModelo();
  }

  // Crear el modelo
  crearModelo() {
    const model = tf.sequential();
    console.log("Modelo Creado");
    // Capa de embedding para convertir palabras en vectores
    model.add(
      tf.layers.embedding({
        inputDim: this.vocabularioSize, // Tamaño del vocabulario
        outputDim: 16, // Dimensión del espacio de embedding
        inputLength: 10, // Longitud máxima de la secuencia de entrada
      })
    );
    console.log("Capa de embedding añadida");
    // Capa LSTM para procesar secuencias
    model.add(tf.layers.lstm({ units: 32 }));

    // Capa densa para la clasificación
    model.add(
      tf.layers.dense({
        units: this.numClases,
        activation: "softmax",
      })
    );
    console.log("Capas Añadidas");
    // Compilar el modelo
    model.compile({
      optimizer: "adam",
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });
    console.log("Modelo Compilado");

    console.log(model.summary());

    return model;
  }

  // Entrenar el modelo
  async entrenar(X, y, epochs = this.epc) {
    const XTensor = tf.tensor2d(X, [X.length, 10]); 
    const yTensor = tf.oneHot(tf.tensor1d(y, "int32"), this.numClases);

    await this.model.fit(XTensor, yTensor, {
      epochs,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(
            `Época ${epoch + 1}: Pérdida = ${logs.loss.toFixed(
              4
            )}, Precisión = ${logs.acc.toFixed(4)}`
          );
        },
      },
    });

    XTensor.dispose();
    yTensor.dispose();
  }

  // Predecir la intención de un texto
  predecir(textoNumerico) {
    if (textoNumerico.length !== 10) {
      console.error("La secuencia de texto no tiene la longitud esperada.");
      return null;
    }

    const inputTensor = tf.tensor2d([textoNumerico], [1, 10]); // Asegúrate de que el texto esté en formato numérico
    const prediccion = this.model.predict(inputTensor);
    const intencion = tf.argMax(prediccion, 1).dataSync()[0]; // Obtener la clase predicha
    inputTensor.dispose();
    return intencion;
  }

  // Guardar el modelo
  // async guardarModelo() {
  //   const url = "http://localhost:3000/RichardBot/modelo"; // Ruta donde se guardará el modelo
  //   console.log("Guardando modelo en", url);
  //   await this.model.save(url); // Usar this.model para referirse al modelo actual
  //   console.log("Modelo guardado correctamente en", url);
  // }

  // Cargar el modelo
  async cargarModelo() {
    const url = "http://localhost:3000/RichardBot/modelo/model.json"; // Ruta del archivo model.json
    console.log("Cargando modelo desde", url);
    this.model = await tf.loadLayersModel(url);
    console.log("Modelo cargado correctamente desde", url);
  }

  // async guardarModelo() {
  //   console.log("Guardando modelo en el servidor...");
  //   const artifacts = await this.model.save(
  //     tf.io.withSaveHandler(async (artifacts) => {
  //       const response = await fetch(
  //         "http://localhost:3000/RichardBot/endPoint/guardarModelo.php",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(artifacts),
  //         }
  //       );
  //       console.log("artifechos", artifacts);
  //       if (!response.ok) {
  //         throw new Error(`Error al guardar el modelo: ${response.statusText}`);
  //       }

  //     })
  //   );

  //   console.log("Modelo guardado en el servidor.");
  // }

  async guardarModelo() {
    console.log("Guardando modelo en el servidor...");

    await this.model.save(
      tf.io.withSaveHandler(async (artifacts) => {
        console.log("artifacts:", artifacts);

        //  Convertir weightData (ArrayBuffer) a Base64
        const weightDataBase64 = await arrayBufferToBase64(
          artifacts.weightData
        );

        // weightData versión en Base64
        const artifactsModificados = {
          modelTopology: artifacts.modelTopology,
          weightSpecs: artifacts.weightSpecs,
          weightData: weightDataBase64,
        };

        console.log("Enviando:", artifactsModificados);

        // Enviar al servidor
        const response = await fetch(
          "http://localhost:3000/RichardBot/endPoint/guardarModelo.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(artifactsModificados),
          }
        );

        if (!response.ok) {
          throw new Error(`Error al guardar el modelo: ${response.statusText}`);
        }

        console.log("Modelo guardado en el servidor.");
      })
    );
  }

  // convertir ArrayBuffer a Base64
}
function arrayBufferToBase64(buffer) {
  return new Promise((resolve) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    resolve(btoa(binary));
  });
}
export default ModeloPredictivo;
