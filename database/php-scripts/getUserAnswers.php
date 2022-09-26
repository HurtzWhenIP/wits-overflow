<?php
require_once "db.php";

$json = $json[$payloadLabel];
$parentPostID = $json['ParentPostID'];

// Generating and executing the SQL
$sql = "SELECT AnswerPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
        "IFNULL(vt.DownVotes, 0) as DownVotes " . 
        "FROM AnswerPost " . 
        "LEFT JOIN AnswerVoteTally as vt " . 
        "ON AnswerPost.AnswerID = vt.AnswerID " . 
        "WHERE AnswerPost.ParentPostID = ?";

$query = $db->prepare($sql);
$query->bind_param("s", $parentPostID);
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
