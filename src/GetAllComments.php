<?php

namespace App;

require_once "db.php";

class GetAllComments {
    public static function makeCall() {
        DB::init();

        $sql = "SELECT * FROM Comment";

        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $comments = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }
        }

        $query->close();
        DB::$db->close();

        return json_encode($comments);
    }
}

echo GetAllComments::makeCall();