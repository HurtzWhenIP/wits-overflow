<?php
use \PhpUnit\Framework\TestCase;
use App\AddComment;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\AddComment
*/
class AddCommentTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->UserID = 20;
        $bodyContent->PostID = 15;
        $bodyContent->Content = "Answer";
        $bodyContent->isQuestion = false;

        $request->data = $bodyContent;
        $json = json_encode($request);
        
        $_SERVER["REQUEST_METHOD"] = "POST";
        $fileWriter = fopen(INPUT_TEST_FILE, "w");

        fwrite($fileWriter, $json);
        fclose($fileWriter);
    }   

    /**
    * @test
    */
    public function testValidCall() 
    {
        self::generateInput();
        $expectedUID = 20;
        $this->expectOutputRegex('/\"UserID\":' . $expectedUID . '/');
        AddComment::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
