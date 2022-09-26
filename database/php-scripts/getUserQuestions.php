<?php
require_once "db.php";

$json = $json[$payloadLabel];
$userID = $json['UserID'];

// Generating and executing the SQL
$sql = "SELECT QuestionPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
        "IFNULL(vt.DownVotes, 0) as DownVotes " . 
        "FROM QuestionPost " . 
        "LEFT JOIN QuestionVoteTally as vt " . 
        "ON QuestionPost.PostID = vt.QuestionID " . 
        "WHERE QuestionPost.UserID = ?";

$query = $db->prepare($sql);
$query->bind_param("s", $userID);
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
