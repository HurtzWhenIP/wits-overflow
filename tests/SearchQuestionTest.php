<?php
use \PhpUnit\Framework\TestCase;
use App\SearchQuestion;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\SearchQuestion
*/
class SearchQuestionTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->question = "Why"; 

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
        $expectedQuestion = "Why";
        $this->expectOutputRegex('/\"Question\":' . $expectedQuestion . '/');
        SearchQuestion::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
