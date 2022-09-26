<?php
require_once "db.php";

// Generating and executing the SQL
$sql = "SELECT * FROM AnswerPost";

$query = $db->prepare($sql);
$query->execute();

// Formatting the output into a json array
$answers = array();

if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc()) {
        $answers[] = $row;
    }
}

echo json_encode($answers);
$query->close();
$db->close();
