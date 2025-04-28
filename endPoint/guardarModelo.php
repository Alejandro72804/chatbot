<?php
// Habilitar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Definir ruta absoluta
$basePath = __DIR__ . '/../modelo/';
$modelPath = $basePath . 'model.json';
$weightsPath = $basePath . 'weights.bin';

// Asegurar que la carpeta `modelo` existe
if (!is_dir($basePath)) {
    mkdir($basePath, 0777, true);
}

// Verifica si se recibió una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Solo se permiten solicitudes POST."]);
    exit;
}

// Lee los datos del cuerpo de la solicitud
$rawData = file_get_contents('php://input');
if (empty($rawData)) {
    http_response_code(400);
    echo json_encode(["error" => "No se recibieron datos en el cuerpo de la solicitud."]);
    exit;
}

// Decodifica los datos JSON
$data = json_decode($rawData, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Error al decodificar JSON: " . json_last_error_msg()]);
    exit;
}
// Verifica que los datos necesarios estén presentes
if (!isset($data['modelTopology']) || !isset($data['weightSpecs']) || !isset($data['weightData'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos del modelo incompletos."]);
    exit;
}

// 💡 Verifica y convierte weightData a string si es un array
if (is_array($data['weightData'])) {
    $data['weightData'] = implode('', $data['weightData']); // Une el array en un solo string
}

// Asegurar que weightData sea un string antes de decodificar
if (!is_string($data['weightData']) || empty($data['weightData'])) {
    http_response_code(400);
    echo json_encode(["error" => "weightData no es una cadena válida o está vacía."]);
    exit;
}

// Decodifica weightData en binario
$weightData = base64_decode($data['weightData'], true);
if ($weightData === false || empty($weightData)) {
    http_response_code(400);
    echo json_encode(["error" => "Error al decodificar weightData (Base64 inválido o vacío)."]);
    exit;
}

// 🔍 **Validación del tamaño de weights.bin**
if (strlen($weightData) % 4 !== 0) {
    http_response_code(400);
    echo json_encode(["error" => "El tamaño de weights.bin no es múltiplo de 4, lo que indica corrupción de datos."]);
    exit;
}

// Guardar weights.bin
if (file_put_contents($weightsPath, $weightData) === false || filesize($weightsPath) === 0) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo guardar weights.bin o está vacío"]);
    exit;
}

// Crear estructura de model.json
$modelData = [
    "modelTopology" => $data['modelTopology'],
    "weightsManifest" => [
        [
            "paths" => ["weights.bin"],
            "weights" => $data['weightSpecs']
        ]
    ]
];

// Guardar model.json
if (file_put_contents($modelPath, json_encode($modelData, JSON_PRETTY_PRINT)) === false) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo guardar model.json"]);
    exit;
}

// ✅ Respuesta exitosa
echo json_encode(["status" => "success"]);
exit;