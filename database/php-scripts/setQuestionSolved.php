<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$userID = $json['UserID'];
$postID = $json['PostID'];
$isSolved = $json['Solved'];

$sql = "UPDATE QuestionPost SET Solved = ? WHERE UserID = ? AND PostID = ?";
$query = $db->prepare($sql);
$query->bind_param("iii", $isSolved, $userID, $postID);
$query->execute();

$query->close();
$db->close();