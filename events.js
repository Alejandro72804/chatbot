import ModeloPredictivo from "./modelo/ModeloPredictivo.js";

document.addEventListener("DOMContentLoaded", function () {
  const panelInbox = document.querySelector(".panel-inbox");
  const panelOpciones = document.getElementById("opciones");
  let enCategorias = true;
  const btnAtras = document.getElementById("btn-atras");
  const panelEntrada = document.querySelector(".panel-entrada");

  // function loadScript(url, callback) {
  //   var head = document.getElementsByTagName("head")[0];
  //   var script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = url;
  //   script.onreadystatechange = callback;
  //   script.onload = callback;
  //   head.appendChild(script);
  // }

  window.enviar = function () {
    const val = document.getElementById("msj").value.trim();

    if (val.toLowerCase() == "opciones") {
      agregarMensajeUsuario(val);
      simularRespuestaBot(val);
    } else {
      agregarMensajeUsuario(val);
      simularRespuestaBot(val);
    }
    document.getElementById("msj").value = "";
    scrollToBottom();
  };

  window.seleccionarCategoria = function (categoria) {
    enCategorias = false;
    agregarMensajeUsuario(categoria);
    cargarPreguntas(categoria);
    btnAtras.style.display = "flex";
    scrollToBottom();
  };

  window.seleccionarOpcion = function (opcion) {
    agregarMensajeUsuario(opcion);
    simularRespuestaBot(opcion);
  };

  window.cerrarBot = function () {
    panelEntrada.style.display = "none";
    panelOpciones.style.display = "none";

    var msj = "Cerrar";
    agregarMensajeUsuario(msj);
    simularRespuestaBot(msj);
    scrollToBottom();
  };

  window.iniciarConversacion = function () {
    var msj = "Iniciar";

    document.getElementById("msj").value = "";
    panelInbox.innerHTML = "";
    panelOpciones.innerHTML = "";

    agregarMensajeUsuario(msj);
    simularRespuestaBot(msj);

    panelEntrada.style.display = "flex";
    panelOpciones.style.display = "grid";
    enCategorias = true;
    scrollToBottom();
  };

  function cargarCategorias() {
    panelOpciones.innerHTML = "";
    panelOpciones.style.display = "grid";
    fetch("dataset/cargarCategorias.php")
      .then((response) => response.text())
      .then((html) => {
        panelOpciones.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar las categorías:", error);
      });
  }

  function agregarMensajeUsuario(mensaje) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-chat", "user-message");

    const p = document.createElement("p");
    p.textContent = mensaje;

    msgDiv.appendChild(p);
    panelInbox.appendChild(msgDiv);
    panelInbox.scrollTop = panelInbox.scrollHeight;
  }

  function cargarPreguntas(categoria) {
    fetch("dataset/consulta.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `categoria=${encodeURIComponent(categoria)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        panelOpciones.innerHTML = "";
        data.preguntas.forEach((pregunta) => {
          const btn = document.createElement("button");
          btn.classList.add("opcion");
          btn.textContent = pregunta;
          btn.onclick = () => seleccionarOpcion(pregunta);
          panelOpciones.appendChild(btn);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  var valida = false;

  //! Función para predecir la intención de un texto

  // Tokenización y vocabulario
  const vocabulario = new Map();
  let indice = 1;

  // Función para tokenizar texto
  function tokenizarTexto(texto, vocabulario, longitudMaxima = 10) {
    const palabras = texto.toLowerCase().split(/\s+/);
    const secuencia = palabras.map(
      (palabra) => vocabulario.indexOf(palabra) + 1
    ); // +1 para evitar el índice 0

    console.log("Palabras ", palabras);
    console.log("Secuencia ", secuencia);

    while (secuencia.length < longitudMaxima) {
      secuencia.push(0); // Padding con 0
    }
    return secuencia.slice(0, longitudMaxima);
  }

  // Función para agregar palabras al vocabulario
  function agregarAlVocabulario(palabras) {
    palabras.forEach((palabra) => {
      if (!vocabulario.has(palabra)) {
        vocabulario.set(palabra, indice);
        indice++;
      }
    });
  }

  // Función para convertir texto a números
  function textoANumeros(texto, vocabulario) {
    const palabras = texto.toLowerCase().split(/\s+/);
    const secuencia = palabras.map(
      (palabra) => vocabulario.indexOf(palabra) + 1
    ); // +1 para evitar el índice 0

    // Rellenar con ceros si la secuencia es más corta que 10
    while (secuencia.length < 10) {
      secuencia.push(0);
    }

    // Truncar si la secuencia es más larga que 10
    return secuencia.slice(0, 10);
  }

  // Crear una instancia del modelo
  // const vocabularioSize = vocabulario.length; // Tamaño del vocabulario
  // const numClases = 5; // Número de clases (intenciones)
  // const modelo = new ModeloPredictivo(vocabularioSize, numClases);

  // // Datos de entrenamiento (ejemplo)
  // const X = [
  //   [1, 2, 3, 4, 5, 0, 0, 0, 0, 0], // Secuencias de palabras tokenizadas
  //   [6, 7, 8, 9, 10, 0, 0, 0, 0, 0],
  //   // Más ejemplos...
  // ];
  // const y = [0, 1, 2, 3, 4]; // Etiquetas de intenciones

  // // Entrenar el modelo (esto puede hacerse en un botón o al iniciar la aplicación)
  // async function entrenarModelo() {
  //   await modelo.entrenar(X, y, 10);
  //   console.log("Modelo entrenado.");
  //   await modelo.guardarModelo("./modelo"); // Guardar el modelo
  // }

  async function cargarDatosEntrenamiento() {
    try {
      const response = await fetch("endPoint/procesarTexto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "accion=obtenerDatosEntrenamiento",
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // Leer el cuerpo de la respuesta solo una vez
      const datos = await response.json();
      console.log("Datos recibidos del backend:", datos);

      if (datos.length === 0) {
        throw new Error("No hay datos de entrenamiento en la base de datos.");
      }

      const vocabulario = [
        ...new Set(datos.flatMap((d) => d.pregunta.split(/\s+/))),
      ].map((p) => p.toLowerCase());
      console.log("Vocabulario ", vocabulario);
      if (vocabulario.length === 0) {
        throw new Error(
          "El vocabulario está vacío. Revisa los datos de entrenamiento."
        );
      }

      const X = datos.map((d) => tokenizarTexto(d.pregunta, vocabulario));
      const y = datos.map((d) => d.intencion);
      console.log("X ", X);
      console.log("Y ", y);

      console.log("Datos de entrenamiento cargados correctamente.");
      return { X, y, vocabulario };
    } catch (error) {
      console.error("Error en cargarDatosEntrenamiento:", error);
      throw error; // Relanzar el error para manejarlo en el flujo principal
    }
  }

  // Función para reentrenar el modelo
  async function entrenarModelo() {
    try {
      const { X, y, vocabulario } = await cargarDatosEntrenamiento();
      const modelo = new ModeloPredictivo(vocabulario.length, 5, 50); // 5 es el número de intenciones

      await modelo.entrenar(X, y, 10); // Entrenar por 10 épocas
      await modelo.guardarModelo(); // Guardar el modelo entrenado
    } catch (error) {
      console.error("Error al reentrenar el modelo:", error);
    }
  }
  async function predecirIntencion(texto, vocabulario) {
    const textoNumerico = tokenizarTexto(texto, vocabulario);
    const modelo = new ModeloPredictivo(vocabulario.length, 5,50);
    await modelo.cargarModelo(); // Cargar el modelo previamente entrenado
    const intencion = await modelo.predecir(textoNumerico);
    return intencion;
  }
  let contadorInteracciones = 0;

  // async function iniciar() {
  //   try {
  //     await modelo.cargarModelo();
  //     console.log("Modelo cargado correctamente.");
  //   } catch (error) {
  //     console.error("Error al cargar el modelo:", error);
  //   }
  // }

  // Llamar a iniciar al cargar la página  iniciar();


  //!Fin de la función para predecir la intención de un texto
  async function simularRespuestaBot(opcion) {
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("msg-chat", "bot-typing");
    loadingDiv.innerHTML = "<p>Escribiendo...</p>";
    panelInbox.appendChild(loadingDiv);

    setTimeout(async () => {
      try {
        if (opcion.toLowerCase() === "opciones") {
          loadingDiv.remove();
          panelOpciones.style.display = "none";
          mostrarRespuestaBot(
            "Claro, aquí te muestro el panel de opciones, elige una para iniciar! 🤩"
          );
          cargarCategorias();
          valida = true;
        } else {
          panelOpciones.innerHTML = "";
          panelOpciones.style.display = "none";
          btnAtras.style.display = "none";

          if (!valida) {
            const { vocabulario } = await cargarDatosEntrenamiento();
            const intencion = await predecirIntencion(opcion, vocabulario);

            const response = await fetch("endpoint/procesarTexto.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `intencion=${intencion}&userInput=${encodeURIComponent(
                opcion
              )}`,
            });

            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Respuesta del backend:", data);

            loadingDiv.remove();
            mostrarRespuestaBot(data.response);

            contadorInteracciones++;
            if (contadorInteracciones >= 10) {
              await entrenarModelo();
              contadorInteracciones = 0;
            }
          }

          if (valida) {
            const response = await fetch("dataset/consulta.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `opcion=${encodeURIComponent(opcion)}`,
            });

            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json();
            loadingDiv.remove();
            mostrarRespuestaBot(data.respuesta);
            valida = false;
          }
        }

        scrollToBottom();
      } catch (error) {
        console.error("Error en simularRespuestaBot:", error);
        loadingDiv.remove();
        mostrarRespuestaBot(
          "Hubo un error al procesar tu solicitud. Intenta nuevamente."
        );
      }
    }, 2000);
  }

  function mostrarRespuestaBot(respuesta) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-chat", "bot-message");

    const p = document.createElement("p");
    p.textContent = respuesta;

    msgDiv.appendChild(p);
    panelInbox.appendChild(msgDiv);
    panelInbox.scrollTop = panelInbox.scrollHeight;
  }

  window.mostrarCategorias = function () {
    document.getElementById("msj").value = "";
    panelOpciones.innerHTML = "";
    btnAtras.style.display = "none";

    cargarCategorias();

    enCategorias = true;
    scrollToBottom();
  };

  function scrollToBottom() {
    const panelText = document.getElementById("panel-text");
    panelText.scrollTop = panelText.scrollHeight;
  }

  const preguntasList = document.querySelector(".preguntas-list");
  let preguntas = [];
  const preguntasPorPagina = 4;
  let currentIndex = 0;

  const cargarPregunta = () => {
    fetch("dataset/cargarPreguntas.php")
      .then((response) => response.text())
      .then((data) => {
        preguntasList.innerHTML = data;
        preguntas = document.querySelectorAll(".preguntas-list li");
        rotatePreguntas();
      })
      .catch((error) => console.error("Error cargando las preguntas:", error));
  };

  const rotatePreguntas = () => {
    if (preguntas.length === 0) return;

    // Ocultar todas las preguntas
    preguntas.forEach((pregunta) => {
      pregunta.classList.remove("active");
      pregunta.classList.add("hidden");
    });

    // Mostrar las preguntas actuales
    for (let i = 0; i < preguntasPorPagina; i++) {
      const index = (currentIndex + i) % preguntas.length;
      preguntas[index].classList.add("active");
      preguntas[index].classList.remove("hidden");
    }

    // Actualizar el índice para la siguiente rotación
    currentIndex = (currentIndex + preguntasPorPagina) % preguntas.length;

    // Ajustar la altura del contenedor de preguntas
    ajustarAlturaPreguntas();
  };

  const ajustarAlturaPreguntas = () => {
    const preguntasActivas = document.querySelectorAll(
      ".preguntas-list li.active"
    );
    let alturaTotal = 0;

    preguntasActivas.forEach((pregunta) => {
      alturaTotal += pregunta.offsetHeight + 20; // 20px de margen entre preguntas
    });

    preguntasList.style.height = `${alturaTotal}px`;
  };

  cargarPregunta();
  setInterval(rotatePreguntas, 7000); // Rotar cada 7 segundos
});

//Apartado de Buzon de mensaje
document
  .getElementById("form-sugerencia")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("form-sugerencia").style.display = "none";
    document.getElementById("animacion-carga").style.display = "flex";

    const formData = new FormData(this);

    fetch("sugiere.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        document.querySelector(".mensaje-enviado").textContent =
          "Mensaje enviado ✅";

        // Ocultar la animación después de 3 segundos y mostrar el formulario nuevamente
        setTimeout(function () {
          document.getElementById("animacion-carga").style.display = "none";
          document.getElementById("form-sugerencia").style.display = "block";
          document.getElementById("form-sugerencia").reset(); // Limpiar el formulario
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector(".mensaje-enviado").textContent =
          "Error al enviar el mensaje 😥";
      });
  });
