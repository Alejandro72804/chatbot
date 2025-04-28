<?php
include 'conexion.php';
$con = conectar();

$query = "SELECT DISTINCT categoria FROM solicitud";
$result = sqlsrv_query($con, $query);

while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    $categoria = $row['categoria'];
    echo "<button class='opcion' onclick=\"seleccionarCategoria('$categoria')\">$categoria</button>";
}

sqlsrv_close($con);
?>
