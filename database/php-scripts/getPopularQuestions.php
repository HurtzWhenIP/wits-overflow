<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

$sql = "SELECT QuestionPost.* FROM QuestionPost, Vote " . 
        // "WHERE (QuestionPost.PostID = Vote.PostID AND Vote.IsQuestion = 1) " .
        "GROUP BY QuestionPost.PostID " . 
        "ORDER BY CAST(SUM(Vote.Vote = 1 AND Vote.PostID = QuestionPost.PostID) as SIGNED) DESC";
$query = $db->prepare($sql);
$query->execute();

// Formatting the output into a json array
$popularQuestions = array();

if ($result = $query->get_result()) {
    while ($row = $result->fetch_assoc()) {
        $popularQuestions[] = $row;
    }
}

echo json_encode($popularQuestions);
$query->close();
$db->close();
