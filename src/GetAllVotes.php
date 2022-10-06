<?php

namespace App;

require_once "db.php";

class GetAllVotes {
    public static function makeCall() {
        DB::init();

        // Generating and executing the SQL
        $sql = "SELECT * FROM Vote";

        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $votes = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $votes[] = $row;
            }
        }

        $query->close();
        DB::$db->close();

        return json_encode($votes);
    }
}

echo GetAllVotes::makeCall();
