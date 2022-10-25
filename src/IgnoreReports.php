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

        // Change the report's IsReviewed to say that it has now been reviewed
        $sql = "UPDATE Reports SET IsReviewed = 1 WHERE PostID = ? AND IsQuestion = 0";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        /*
            Since the only possible reports that can be ignored are answers,
            we set the relevant answer post's IsUnderReview flag to false
            to signify that it is no longer under review.
        */

        $sql = "UPDATE AnswerPost SET IsUnderReview = 0 WHERE AnswerID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

IgnoreReports::makeCall();