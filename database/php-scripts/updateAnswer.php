<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$answerID = $json['AnswerID'];
$answerContent = $json['AnswerContent'];
$edited = $json['Edited'];

// Generating and executing the SQL
$sql = "UPDATE AnswerPost SET AnswerContent = ?, Edited = ? WHERE AnswerID = ?";
$query = $db->prepare($sql);
$query->bind_param("sii", $answerContent, $edited, $answerID);
$query->execute();

$query->close();
$db->close();
