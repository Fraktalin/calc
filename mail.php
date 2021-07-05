<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$city = $_POST['user_city'];
$table = $_POST['table'];
$comment = $_POST['user_comment'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'calc-sender@stekomail.com.ua'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'PJ225bjg3G'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('StekoCorp@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('ijdrjgkzcdima@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с Калькулятора';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта пользователя: ' .$email. '<br> Город проживания: '.$city.'<br>'.'Комментарий: '.$comment.' '.$table;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>