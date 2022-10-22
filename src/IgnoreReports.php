<?php
namespace App;

require_once "db.php";

class IgnoreReports {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];
        $answerID = $json['AnswerID'];

        $sql = "UPDATE Reports SET IsReviewed = 1 WHERE PostID = ? AND IsQuestion = 0";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        $sql = "UPDATE AnswerPost SET IsUnderReview = 1 WHERE AnswerID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

IgnoreReports::makeCall();