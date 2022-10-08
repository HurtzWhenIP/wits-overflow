<?php
namespace App;

require_once "db.php";

class SearchQuestion {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];
        
        // Getting required fields from the request
        $question = $json['Question'];
        
        $sql = "SELECT * FROM QuestionPost WHERE PostTitle LIKE '%" . $question ."%'";
        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $questions = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $questions[] = $row;
            }
        }

        $query->close();
        DB::$db->close();
        return json_encode($questions);
    }
}

echo SearchQuestion::makeCall();