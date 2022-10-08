<?php
use \PhpUnit\Framework\TestCase;
use App\GetSingleQuestion;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetSingleQuestion
*/
class GetSingleQuestionTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->PostID = 1;

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
        $expectedPID = 1;
        $this->expectOutputRegex('/\"PostID\":' . $expectedPID . '/');
        GetSingleQuestion::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
