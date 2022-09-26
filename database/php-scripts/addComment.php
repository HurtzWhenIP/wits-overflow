<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$userID = $json['UserID'];
$postID = $json['PostID'];
$commentContent = $json['CommentContent'];
$isQuestion = $json['IsQuestion'];

// Generating and executing the SQL
$sql = "INSERT INTO Comment(UserID, PostID, CommentContent, IsQuestion) VALUES (?, ?, ?, ?)";

$query = $db->prepare($sql);
$query->bind_param("iisi", $userID, $postID, $commentContent, $isQuestion);
$query->execute();

$query->close();
$db->close();