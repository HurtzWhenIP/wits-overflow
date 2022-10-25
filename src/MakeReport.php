<?php
namespace App;

require_once "db.php";

class MakeReport {
    const REPORT_LIMIT = 10;

    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $postID = $json['PostID'];
        $isQuestion = $json['IsQuestion'];
        $reportTopic = $json['ReportTopic'];
        $reportComments = $json['ReportComments'];
        $isReviewed = 0;      

        if ($isQuestion == 1) 
            $isReviewed = 1;

        // Generating and executing the SQL
        $sql = "INSERT INTO Reports(PostID, IsQuestion, Topic, Comments, DateCreated, IsReviewed) " . 
               "VALUES (?, ?, ?, ?, NOW(), ?)";

        $query = DB::$db->prepare($sql);
        $query->bind_param("iissi", $postID, $isQuestion, $reportTopic, $reportComments, $isReviewed);
        $query->execute();

        /*
            Based on whether the request if for a question or answer,
            either the UnderReview for the answer or for the question
            must be enabled.
        */
        
        if ($isQuestion == 0) 
            $sql = "UPDATE AnswerPost SET IsUnderReview = 1 WHERE AnswerID = ?";
        else
            $sql = "UPDATE QuestionPost SET IsUnderReview = 1 WHERE PostID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $postID);
        $query->execute();

        // Backend moderation for question report limit
        if ($isQuestion == 1 && self::getQuestionReportCount($postID) > self::REPORT_LIMIT) {
            $sql = "UPDATE QuestionPost SET IsUnderReview = 0, IsHidden = 1 " . 
                   "WHERE PostID = ?"; 
            $query = DB::$db->prepare($sql);
            $query->bind_param("i", $postID);
            $query->execute();
        }

        $query->close();
        DB::$db->close();
    }

    // Return the number of reports a specific question has so far
    public static function getQuestionReportCount($postID) {
        $sql = "SELECT COUNT(*) as CountReports " .
               "FROM Reports " . 
               "WHERE PostID = ? AND IsQuestion = 1";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $postID);
        $query->execute();

        $reportCount = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $reportCount[] = $row;
            }
        }
        
        $count = $reportCount[0]['CountReports'];
        return $count;
    }
}

MakeReport::makeCall();