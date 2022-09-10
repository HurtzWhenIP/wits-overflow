<?php
require_once "db.php";

// Generating and executing the SQL
$sql = "SELECT * FROM QuestionPost";

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
