<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$postID = $json['PostID'];
$isQuestion = $json['IsQuestion'];

// Generating and executing the SQL
$sql = "SELECT * FROM Comment WHERE PostID = ? AND IsQuestion = ?";

$query = $db->prepare($sql);
$query->bind_param("ii", $postID, $isQuestion);
$query->execute();

$comments = array();

if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc())
        $comments[] = $row;
}

echo json_encode($comments);
$query->close();
$db->close();