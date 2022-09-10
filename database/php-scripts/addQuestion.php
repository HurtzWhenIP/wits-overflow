<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$userID = $json['UserID'];
$postTitle = $json['PostTitle'];
$postContent = $json['PostContent'];

// Generating and executing the SQL
$sql = "INSERT INTO QuestionPost(UserID, PostTitle, PostContent) VALUES (?, ?, ?)";

$query = $db->prepare($sql);
$query->bind_param("iss", $userID, $postTitle, $postContent);
$query->execute();

$query->close();
$db->close();
