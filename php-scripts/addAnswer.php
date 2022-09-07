<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$userID = $json['UserID'];
$parentPostID = $json['ParentPostID'];
$answerContent = $json['AnswerContent'];

// Generating and executing the SQL
$sql = "INSERT INTO AnswerPost(UserID, ParentPostID, AnswerContent) VALUES (?, ?, ?)";
$query = $db->prepare($sql);
$query->bind_param("iis", $userID, $parentPostID, $answerContent);
$query->execute();

$query->close();
$db->close();

//obligatory comment
