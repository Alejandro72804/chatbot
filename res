<body>
    <div id="panel-chat">
        <h1>Sistema de Asistencia Restaurante</h1>
        <div class="titulo">ChatBot</div>
        <div id="panel-text">

            <div id="contenido">


                <div class="form">
                    <div class="panel-inbox">
                        <div class="icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="msg-chat">
                            <p>Hola, ¿cómo puedo ayudarte?</p>
                        </div>
                    </div>
                </div>



                <div class="panel-entrada">
                    <?php
                    $val = 0;
                    include 'dataset/conexion.php';
                    $con = conectar();

                    $query = "SELECT pregunta FROM solicitud WHERE categoria = 'General'";
                    $result = mysqli_query($con, $query);

                    if (!$result) {
                        die("Error al consultar la base de datos: " . mysqli_error($con));
                    }

                    if ($val == 1): ?>

                    <?php else: ?>


                        <div class="panel-opciones">
                            <?php while ($row = mysqli_fetch_assoc($result)):
                            ?>

                                <button class="opcion" onclick="seleccionarOpcion('<?php echo $row['pregunta']; ?>')">
                                    <?php echo $row['pregunta']; ?>
                                </button>

                            <?php endwhile; ?>
                            <!-- <button class="opcion" onclick="seleccionarOpcion('Regresar')">❌</button> -->
                        </div>

                        <div class="msg-user">
                            <input id="msj" class="msj" type="text" placeholder="Escribe algo aquí.." required>
                            <button id="btn btn-enviar" onclick="enviar()">Enviar</button>
                        </div>

                    <?php endif;
                    mysqli_close($con);
                    ?>
                </div>
            </div>
        </div>
    </div>
    <script src="events.js"></script>
</body>



events
document.addEventListener("DOMContentLoaded", function () {
  const panelInbox = document.querySelector(".panel-inbox");
  
  window.enviar = function () {
    var val = document.getElementById("msj").value;
    agregarMensajeUsuario(val);
    simularRespuestaBot(val);
  };

  window.seleccionarOpcion = function (opcion) {
    agregarMensajeUsuario(opcion);
    simularRespuestaBot(opcion);
  };

  function agregarMensajeUsuario(mensaje) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-chat", "user-message");

    const p = document.createElement("p");
    p.textContent = mensaje;

    msgDiv.appendChild(p);
    panelInbox.appendChild(msgDiv);
    panelInbox.scrollTop = panelInbox.scrollHeight;
  }

  function simularRespuestaBot(opcion) {
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("msg-chat", "bot-typing");
    loadingDiv.innerHTML = "<p>Escribiendo...</p>";
    panelInbox.appendChild(loadingDiv);

    setTimeout(() => {
      fetch("dataset/consulta.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `opcion=${encodeURIComponent(opcion)}`,
      })
        .then((response) => response.json())
        .then((data) => {
          loadingDiv.remove();
          mostrarRespuestaBot(data.respuesta);
        })
        .catch((error) => {
          loadingDiv.remove();
          mostrarRespuestaBot("Error al obtener la respuesta. Intenta nuevamente.");
          console.error("Error:", error);
        });

    }, 2000);
    scrollToBottom();
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


  function scrollToBottom() {
    const panelText = document.getElementById('panel-text');
    panelText.scrollTop = panelText.scrollHeight;
  }


});

consulta

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $opcion = $_POST['opcion'];

    $con = conectar();

    $query = "SELECT respuesta FROM solicitud WHERE pregunta = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $opcion);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['respuesta' => $row['respuesta']]);
    } else {
        echo json_encode(['respuesta' => 'Lo siento, no tengo una respuesta para esa solicitud.']);
    }

    $stmt->close();
    $con->close();
} else {
    echo json_encode(['respuesta' => 'Método no permitido.']);
}
?>
