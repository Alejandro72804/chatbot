<?php
include "../dataset/conexion.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

// $interacciones = obtenerInteracciones();
// echo "<pre>";
// print_r($interacciones);
// echo "</pre>";
// exit();

const cada = "¡Hola! ¿En qué puedo ayudarte? 😀";
const cadb = "Claro, estaré encantado de ayudarte. 😊\nPuedes preguntarme sobre opciones disponibles, o escribir 'Cerrar' para finalizar la conversación.";
const cadc = "Fue un placer atenderlo el día de hoy, ¡feliz día! 😁";
const cadd = "Bienvenido, ¿Puedo ayudarte en Algo? 😊\nPuedes ingresar la palabra 'Opciones' para ver el menú de ayuda. 😉";
const cade = "¡De nada! Estoy aquí para ayudarte. 😊";
const cadf = "No entendí tu pregunta. ¿Puedes reformularla?";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["accion"]) && $_POST["accion"] == "obtenerDatosEntrenamiento") {
        $interacciones = obtenerInteracciones();

        if (isset($interacciones["error"])) {
            echo json_encode(["error" => $interacciones["error"]]);
            exit();
        }

        if (empty($interacciones)) {
            echo json_encode(["error" => "No hay datos de entrenamiento en la base de datos."]);
            exit();
        }

        $datosEntrenamiento = [];
        foreach ($interacciones as $interaccion) {
            $pregunta = $interaccion["msj_pregunta"];
            $respuesta = $interaccion["msj_respuesta"];
            $intencion = respuestaAIntencion($respuesta);
            if ($intencion !== -1) {
                $datosEntrenamiento[] = [
                    "pregunta" => $pregunta,
                    "intencion" => $intencion
                ];
            }
        }

        echo json_encode($datosEntrenamiento);
        exit();
    }

    // Procesar una nueva interacción
    if (isset($_POST["intencion"]) && isset($_POST["userInput"])) {
        $intencion = $_POST["intencion"];
        $userInput = $_POST["userInput"];
        $response = getResponse($intencion);

        $resultado = registrarInteraccion($userInput, $response);
        if (isset($resultado["error"])) {
            echo json_encode(["error" => $resultado["error"]]);
            exit();
        }

        echo json_encode(["response" => $response]);
        exit();
    }

    // Procesar una nueva interacción

    $response = getResponse($intencion);
    $intencion = $_POST["intencion"];
    $userInput = $_POST["userInput"];
    registrarInteraccion($userInput, $response);
}

function getResponse($intencion)
{
    switch ($intencion) {
        case 0:
            return cada;
        case 1:
            return cadb;
        case 2:
            return cadc;
        case 3:
            return cadd;
        case 4:
            return cade;
        default:
            return cadf;
    }
}

function registrarInteraccion($entradaUsuario, $respuestaChatbot) {
    $con = conectar();
    if (!$con) {
        return ["error" => "Error de conexión a la base de datos"];
    }

    $query = "INSERT INTO interaccion (msj_pregunta, msj_respuesta) VALUES (?, ?)";
    $params = array(&$entradaUsuario, &$respuestaChatbot);
    $stmt = sqlsrv_prepare($con, $query, $params);

    if (!$stmt || !sqlsrv_execute($stmt)) {
        return ["error" => "Error al registrar la interacción: " . print_r(sqlsrv_errors(), true)];
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    return ["success" => true];
}

function obtenerInteracciones()
{
    $con = conectar();
    if (!$con) {
        return ["error" => "Error de conexión a la base de datos"];
    }

    // Consulta para obtener las interacciones
    $query = "SELECT msj_pregunta, msj_respuesta FROM interaccion";
    $stmt = sqlsrv_query($con, $query);

    if ($stmt === false) {
        return ["error" => "Error al ejecutar la consulta: " . print_r(sqlsrv_errors(), true)];
    }

    $interacciones = [];
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $interacciones[] = $row;
    }

    // Liberar recursos
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    return $interacciones;
}

//Normalizacion de texto
function eliminarEmojis($cadena) {
    // Expresión regular para eliminar emojis
    $regex = '/[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{1F900}-\x{1F9FF}]/u';
    return preg_replace($regex, '', $cadena);
}

function respuestaAIntencion($respuesta) {
    if ($respuesta === null) {
        return -1; // Si la respuesta es null, devolver -1
    }

    // Eliminar emojis de la respuesta
    $respuesta = eliminarEmojis($respuesta);
    $respuesta = str_replace("??", "", $respuesta); 
    $respuesta = trim($respuesta); // Eliminar espacios adicionales
    $respuesta = str_replace("\n", " ", $respuesta);

    // Eliminar emojis de las constantes
    $cada_sin_emojis = eliminarEmojis(cada);
    $cadb_sin_emojis = eliminarEmojis(cadb);
    $cadc_sin_emojis = eliminarEmojis(cadc);
    $cadd_sin_emojis = eliminarEmojis(cadd);
    $cade_sin_emojis = eliminarEmojis(cade);

    // Normalizar las constantes
    $cada_normalizada = trim(str_replace("\n", " ", $cada_sin_emojis));
    $cadb_normalizada = trim(str_replace("\n", " ", $cadb_sin_emojis));
    $cadc_normalizada = trim(str_replace("\n", " ", $cadc_sin_emojis));
    $cadd_normalizada = trim(str_replace("\n", " ", $cadd_sin_emojis));
    $cade_normalizada = trim(str_replace("\n", " ", $cade_sin_emojis));

    // Comparar respuestas normalizadas
    switch ($respuesta) {
        case $cada_normalizada:
            return 0;
        case $cadb_normalizada:
            return 1;
        case $cadc_normalizada:
            return 2;
        case $cadd_normalizada:
            return 3;
        case $cade_normalizada:
            return 4;
        default:
            return -1;
    }
}