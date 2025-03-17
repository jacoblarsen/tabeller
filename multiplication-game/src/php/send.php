<?php
$numberOfDiplomas = isset($_GET['numberOfDiplomas']) ? $_GET['numberOfDiplomas'] : '';
$to = "jacoblarsen.net@gmail.com";
$subject = "Diplom Nummer " . $numberOfDiplomas . " Til Wilma";
$txt = "Wilma har lige fået endnu et diplom";
$headers = "From: mail@jacoblarsen.net";

mail($to,$subject,$txt,$headers);
?>