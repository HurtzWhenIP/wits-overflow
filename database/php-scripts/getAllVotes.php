<?php
require_once "db.php";

// Generating and executing the SQL
$sql = "SELECT * FROM Vote";

$query = $db->prepare($sql);
$query->execute();

// Formatting the output into a json array
$votes = array();

if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc()) {
        $votes[] = $row;
    }
}

echo json_encode($votes);
$query->close();
$db->close();

