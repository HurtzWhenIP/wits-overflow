<?php
use \PhpUnit\Framework\TestCase;
use App\AddQuestion;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\AddQuestion
*/
class AddQuestionTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->UserID = 20;
        $bodyContent->PostTitle = "This is a post title";
        $bodyContent->PostContent = "This is the content of a post";

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
        AddQuestion::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
