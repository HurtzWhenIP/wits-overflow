<?php
require_once "db.php";

// Generating and executing the SQL
$sql = "SELECT * FROM User";
$query = $db->prepare($sql);
$query->execute();

// Formatting the output into a json array
$loginDetails = array();

// Add results to 
if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc())
        $loginDetails[] = $row;
}

echo json_encode($loginDetails);
$query->close();
$db->close();