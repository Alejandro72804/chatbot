<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatBot</title>
    <link rel="stylesheet" href="style.css" media="screen">
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>

</head>


<body>


    <div id="main-container">
        <div id="Panel">
            <!-- Seccion Preguntas -->
            <div class="comandos">
                <h3>Comandos Disponibles</h3>
                <ul>
                    <li><strong>Hola</strong>: Saluda al chatbot</li>
                    <li><strong>Iniciar</strong>: Comienza una nueva interacción</li>
                    <li><strong>Cerrar</strong>: Finaliza la conversación</li>
                    <li><strong>Opciones</strong>: Muestra opciones disponibles</li>
                </ul>
                <br>
                <div class="preguntas-container">
                    <h3>Preguntas Frecuentes</h3>
                    <ul class="preguntas-list">
                        <?php include 'dataset/cargarPreguntas.php'; ?>
                    </ul>
                </div>
            </div>
            <!-- Panel ChatBot -->
            <div id="panel-chat">
                <h1>Sistema de Asistencia Restaurante</h1>
                <div class="titulo">
                    Richard Bot

                    <button id="btn btn-cerrar" class="btn-cerrar" onclick="cerrarBot()">Cerrar</button>
                    <button id="btn btn-iniciar" class="btn btn-iniciar" onclick="iniciarConversacion()">Iniciar</button>
                </div>

                <div id="panel-text">
                    <div id="contenido">
                        <div class="form">
                            <div class="panel-inbox">
                                <div class="icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="msg-chat">
                                    <p>Hola, ¿cómo puedo ayudarte? 😀</p>
                                    <p>Puedes ingresar la palabra 'Opciones' para ver el menú de ayuda. 😉</p>
                                </div>
                            </div>
                            <div class="panel-opciones" id="opciones"></div>

                            <div class="panel-entrada">
                                <div class="msg-user">
                                    <input id="msj" class="msj" type="text" placeholder="Escribe algo aquí.. (ej. Opciones)" required>
                                    <button id="btn btn-enviar" onclick="enviar()">Enviar</button>
                                    <button id="btn-atras" class="btn-atras" style="display: none;" onclick="mostrarCategorias()">Atrás</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Equipo de Desarrollo -->
            <div class="equipo">
                <div class="alert-box">
                    <p><strong>⚠ Ten en cuenta:</strong> Este es un prototipo, puede estar ligado a fallas. 😥😪</p>
                </div>
                <div>

                    <br>
                </div>
                <div class="cont-Team">
                    <h2>Desarrollador</h2>
                    <div class="team-member" style="text-align: center; color:black;">
                        <!-- <div class="left"> -->
                        <p>👩‍💻 Luis Alejandro Mestra Bernal
                            <br> 🎓 Estudiante en Formación
                            <br> 📝Universidad de Córdoba
                            <br> 💻Ingenieria de Sistemas
                        </p>
                        <!-- </div> -->
                        <!-- <div class="right">
                        <p>👩‍💻 </p>
                        <p>👩‍💻 </p>
                    </div> -->

                    </div>
                    <div>

                        <br>
                    </div>
                </div>
                <div class="buzon">
                    <h3>Buzón de Sugerencias</h3>
                    <form id="form-sugerencia" action="sugiere.php" method="POST">
                        <textarea name="sugerencia" placeholder="Escribe tu sugerencia aquí..." required></textarea>
                        <button type="submit" id="btn-enviar-sugerencia">Enviar Sugerencia</button>
                    </form>
                    <!-- Contenedor para la animación y el mensaje de confirmación -->
                    <div id="animacion-carga" class="animacion-carga">
                        <div class="icono-carga">📨</div>
                        <div class="mensaje-enviado">Mensaje enviado ✅</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="module" src="modelo/tokenizacion.js"></script>
    <script type="module" src="events.js"></script>
    
</body>

</html>