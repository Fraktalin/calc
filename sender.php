<?php
if (array_key_exists('message', $_POST)) 
{
   $to = 'ijdrjgkzcdima@gmail.com';
   $subject = 'Заполнена контактная форма (ВЕРХНЯЯ) с ';
   $subject = "=?utf-8?b?";
   $message = 
"Email отправителя: ".
"\nИмя Отправителя: ".
"\nТелефон Отправителя: ";
   $headers = 'Content-type: text/plain; charset="utf-8"';
   $headers .= "MIME-Version: 1.0\r\n";
   $headers .= "ДАТА ОТПРАВКИ:". date('D, d M Y h:i:s O') ."\r\n";
   mail($to, $subject, $message, $headers);
   echo 'name';
}
?>
