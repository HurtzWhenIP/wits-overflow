<?php
namespace App;

require_once "db.php";

class IgnoreReports {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];
        $postID = $json['PostID'];
        $isQuestion = $json['IsQuestion'];

        $sql = "UPDATE Reports SET IsReviewed = 1 WHERE PostID = ? AND IsQuestion = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("ii", $postID, $isQuestion);
        $query->execute();

        if (isQuestion == 0) 
            $sql = "UPDATE AnswerPost SET IsUnderReview = 0 WHERE AnswerID = ?";
        else
            $sql = "UPDATE QuestionPost SET IsUnderReview = 0 WHERE PostID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $postID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

IgnoreReports::makeCall();