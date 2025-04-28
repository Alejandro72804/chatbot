<?php
include 'conexion.php';
$con = conectar();

$query = "SELECT pregunta FROM Solicitud"; 
$result = sqlsrv_query($con, $query);

while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    echo "<li>{$row['pregunta']}</li>";
}

sqlsrv_close($con);
?>