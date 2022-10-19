<?php
namespace App;

require_once "db.php";

class GetReportSummary {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];
        $postID = $json['PostID'];
        $isQuestion = $json['IsQuestion'];

        $sql = "SELECT Topic, Comments, DateCreated FROM Reports " . 
               "WHERE PostID = ? AND IsQuestion = ? AND IsReviewed = FALSE " . 
               "ORDER BY DateCreated DESC";

        $query = DB::$db->prepare($sql);
        $query->bind_param("ii", $postID, $isQuestion);
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