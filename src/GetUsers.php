<?php
namespace App;

require_once "db.php";

class GetUsers {
    public static function makeCall() {
        DB::init();

        // Generating and executing the SQL
        $sql = "SELECT * FROM User";
        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $loginDetails = array();

        // Add results to 
        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc())
                $loginDetails[] = $row;
        }

        $query->close();
        DB::$db->close();
        return json_encode($loginDetails);
    }
}

echo GetUsers::makeCall();