<?php
function conectar(){
    $serverName = "PC-MBERNAL38";  
    $connectionOptions = array(
        "Database" => "chatbot",  
        "UID" => "sa",          
        "PWD" => "admin2444",    
        "CharacterSet" => "UTF-8" 
    );

    $con = sqlsrv_connect($serverName, $connectionOptions);

    if (!$con) {
        die("Error al conectar con SQL Server: " . print_r(sqlsrv_errors(), true));
    }

    //! echo "✅ Conexión exitosa a la base de datos.<br>";
    return $con;
}

conectar();
?>