<?php
namespace App;

require_once "db.php";

class GetReportSummary {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];
        $answerID = $json['AnswerID'];

        /*
            Get all report information about a specific post
            based on it's PostID and IsQuestion values.
            The order will be based on the unreviewed
            reports in order of recency by the date created.
            Thereafter, the reviewed reports would be also
            ordered by the date created
        */

        $sql = "SELECT Topic, Comments, DateCreated, IsReviewed FROM Reports " . 
               "WHERE PostID = ? AND IsQuestion = 0 " . 
               "ORDER BY IsReviewed, DateCreated DESC";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        // Formatting the output into a json array
        $reports = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $reports[] = $row;
            }
        }

        $query->close();
        DB::$db->close();
        return json_encode($reports);
    }
}

echo GetReportSummary::makeCall();