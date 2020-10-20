<?php
$msg = $_GET['msg'];
$status = $_GET['status'];
$sendmethod = $_GET['sendmethod'];

function sendMail($msg, $status) {
  //mail($to, $subject, $message, $headers);
  return 'error';
}

function sendSMS($msg, $status) {
  return 'success';
}

switch ($sendmethod) {
  case "email": echo sendMail($msg, $status); break;
  case "sms": echo sendSMS($msg, $status); break;
}
?>