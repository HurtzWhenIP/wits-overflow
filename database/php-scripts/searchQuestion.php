<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$question = $json['Question'];
 
$sql = "SELECT * FROM QuestionPost WHERE PostTitle LIKE '%" . $question ."%'";
$query = $db->prepare($sql);
$query->execute();

// Formatting the output into a json array
$questions = array();

if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
}

echo json_encode($questions);
$query->close();
$db->close();
