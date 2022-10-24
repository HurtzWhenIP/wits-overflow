<?php
namespace App;

require_once "db.php";

class SearchUsers {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $username = $json['Username'];

        // Generating and executing the SQL
        $sql = "SELECT UserID, FirstName, LastName, Email FROM User " . 
        "WHERE CONCAT(FirstName, LastName) LIKE '%" . $username . "%'" . 
        " OR Email LIKE '%" . $username . "%'";
        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $users = array();

        // Add results to 
        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc())
                $users[] = $row;
        }

        $query->close();
        DB::$db->close();
        return json_encode($users);
    }
}

echo SearchUsers::makeCall();