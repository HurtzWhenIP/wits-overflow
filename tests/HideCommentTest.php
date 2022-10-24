<?php
use \PhpUnit\Framework\TestCase;
use App\HideComment;
use App\DB;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\HideComment
*/
class HideCommentTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->CommentID = 4;

        $request->data = $bodyContent;
        $json = json_encode($request);
        
        $_SERVER["REQUEST_METHOD"] = "POST";
        $fileWriter = fopen(INPUT_TEST_FILE, "w");

        fwrite($fileWriter, $json);
        fclose($fileWriter);
    }   

    private function unhideComment($commentID) {
        DB::init();

        // Generating and executing the SQL
        $sql = "SELECT * FROM Comment WHERE CommentID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $commentID);
        $query->execute();

        // Formatting the output into a json array
        $answers = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $answers[] = $row;
            }
        }
        
        $isHidden = $answers[0]['IsHidden'];
        $this->assertEquals($isHidden, "1");

        // Generating and executing the SQL
        $sql = "UPDATE Comment SET IsHidden = 0 WHERE CommentID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $commentID);
        $query->execute();
        $query->close();
        
        DB::$db->close();
    }

    /**
    * @test
    */
    public function testValidCall() 
    {
        self::generateInput();
        $commentID = 4;
        HideComment::makeCall();
        $this->unhideComment($commentID);
    }
}
