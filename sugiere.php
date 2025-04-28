<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir los archivos de PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sugerencia = $_POST['sugerencia'];

    $mail = new PHPMailer(true);

    try {
        $mail->Timeout = 300;  // Tiempo de espera en segundos
        $mail->SMTPKeepAlive = true;  // Mantener la conexión viva
        
        $mail->SMTPDebug = 2; // Cambia a 3 o 4 para más detalles
        $mail->Debugoutput = 'html'; // Mostrar salida en formato HTML

        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'luismesber0403@gmail.com';
        $mail->Password = 'zjmucbmfwgpqhwqv'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Configuración del correo
        $mail->setFrom('luismesber0403@gmail.com', 'Asistencia RicharBot');
        $mail->addAddress('luismesber0403@gmail.com');
        $mail->Subject = 'Nueva Sugerencia de Usuario';
        $mail->Body = "Nueva sugerencia recibida:\n\n" . $sugerencia;

        // Enviar correo
        $mail->send();
       
        

        header("Location: RicharBot.php");
        exit();
    } catch (Exception $e) {
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
}
?>
