<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $con = conectar();

    if (isset($_POST['categoria'])) {
        $categoria = $_POST['categoria'];

        $query = "SELECT pregunta FROM solicitud WHERE categoria = ?";
        $params = array($categoria);
        $stmt = sqlsrv_prepare($con, $query, $params);

        if (sqlsrv_execute($stmt)) {
            $preguntas = [];
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $preguntas[] = $row['pregunta'];
            }
            echo json_encode(['preguntas' => $preguntas]);
        } else {
            echo json_encode(['error' => sqlsrv_errors()]);
        }

        sqlsrv_free_stmt($stmt);
    } elseif (isset($_POST['opcion'])) {
        $opcion = $_POST['opcion'];

        $query = "SELECT respuesta FROM solicitud WHERE pregunta = ?";
        $params = array($opcion);
        $stmt = sqlsrv_prepare($con, $query, $params);

        if (sqlsrv_execute($stmt)) {
            if ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                echo json_encode(['respuesta' => $row['respuesta']]);
            } else {
                echo json_encode(['respuesta' => 'Lo siento, no tengo una respuesta para esa solicitud.']);
            }
        } else {
            echo json_encode(['error' => sqlsrv_errors()]);
        }

        sqlsrv_free_stmt($stmt);
    }

    sqlsrv_close($con);
} else {
    echo json_encode(['respuesta' => 'Método no permitido.']);
}
