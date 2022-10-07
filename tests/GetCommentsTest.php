<?php
use \PhpUnit\Framework\TestCase;
use App\GetComments;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetComments
*/
class GetCommentsTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->PostID = 3; //not sure what actual ID should be?
        $bodyContent->isQuestion = false;

        $request->data = $bodyContent;
        $json = json_encode($request);
        
        $_SERVER["REQUEST_METHOD"] = "GET";
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
        $expectedUID = 1;
        $this->expectOutputRegex('/\"PostID\":' . $expectedUID . '/');
        GetComments::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
