<?php
include "../dataset/conexion.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userInput = strtolower($_POST["userInput"]);
    $intention = recognizeIntention($userInput);
    $response = getResponse($intention);
    registrarInteraccion($userInput, $response);
    echo json_encode(["response" => $response]);
}

function recognizeIntention($text)
{
    // Aquí integrarías el modelo de reconocimiento de intenciones
    // Por ahora, usaremos un enfoque simple basado en palabras clave
    if (strpos($text, "hola") !== false || strpos($text, "ola") !== false || strpos($text, "holis") !== false || strpos($text, "que tal") !== false || strpos($text, "buen dia") || strpos($text, "buenas tardes") !== false || strpos($text, "buenas noches") !== false) {
        return "saludo";
    }

    if (strpos($text, "ayuda") !== false || strpos($text, "ayudame") !== false || strpos($text, "ayudar") !== false || strpos($text, "help") !== false) {
        return "ayuda";
    }

    if (strpos($text, "despedida") !== false || strpos($text, "adios") !== false || strpos($text, "hasta luego") !== false || strpos($text, "nos vemos") !== false || strpos($text, "bye") !== false || strpos($text, "cerrar") !== false) {
        return "cerrar";
    }

    if (strpos($text, "iniciar") !== false || strpos($text, "comenzar") !== false || strpos($text, "empezar") !== false || strpos($text, "arrancar") !== false) {
        return "iniciar";
    }
    if (strpos($text, "gracias") !== false || strpos($text, "muchas gracias")) {
        return "gracias";
    }

    // Agrega  condiciones para otras intenciones
    return "desconocido";
}

function getResponse($intention)
{
    switch ($intention) {
        case "saludo":
            return "¡Hola! ¿En qué puedo ayudarte? 😀";
        case "ayuda":
            return "Claro, estaré encantado de ayudarte. 😊\n
                Puedes preguntarme sobre opciones disponibles, o escribir 'Cerrar' para finalizar la conversación.";
        case "cerrar":
            return "Fue un placer atenderlo el día de hoy, ¡feliz día! 😁";
        case "iniciar":
            return "Bienvenido, ¿Puedo ayudarte en Algo? 😊\nPuedes ingresar la palabra 'Opciones' para ver el menú de ayuda. 😉";
        case "gracias":
            return "¡De nada! Estoy aquí para ayudarte. 😊";
            // Agrega casos para otras intenciones
        default:
            return "No entendí tu pregunta. ¿Puedes reformularla?";
    }
}

function registrarInteraccion($entradaUsuario, $respuestaChatbot)
{
    $con = conectar();
    if (!$con) {
        die(json_encode(["error" => "Error de conexión a la base de datos"]));
    }
    $query = "INSERT INTO interaccion (msj_pregunta, msj_respuesta) VALUES (?, ?)";
    $params = array(&$entradaUsuario, &$respuestaChatbot);
    
    $stmt = sqlsrv_prepare($con, $query, $params);
    sqlsrv_execute($stmt);
}

