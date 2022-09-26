<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$postID = $json['PostID'];

$sql = "SELECT QuestionPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
        "IFNULL(vt.DownVotes, 0) as DownVotes " . 
        "FROM QuestionPost " . 
        "LEFT JOIN QuestionVoteTally as vt " . 
        "ON QuestionPost.PostID = vt.QuestionID " . 
        "WHERE QuestionPost.PostID = ?";

$query = $db->prepare($sql);
$query->bind_param("i", $postID);
$query->execute();

// Formatting the output into a json array
$question = array();

if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc()) {
        $question[] = $row;
    }
}

echo json_encode($question);
$query->close();
$db->close();
