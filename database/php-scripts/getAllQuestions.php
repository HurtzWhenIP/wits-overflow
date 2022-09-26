<?php
require_once "db.php";

$json = $json[$payloadLabel];

// Generating and executing the SQL
$sql = "SELECT QuestionPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
        "IFNULL(vt.DownVotes, 0) as DownVotes " . 
        "FROM QuestionPost " . 
        "LEFT JOIN QuestionVoteTally as vt " . 
        "ON QuestionPost.PostID = vt.QuestionID ";

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