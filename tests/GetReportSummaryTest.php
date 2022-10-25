<?php
use \PhpUnit\Framework\TestCase;
use App\GetReportSummary;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetReportSummary
*/
class GetReportSummaryTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        /*
            Create a request with
            AnswerID = 1
        */

        $bodyContent = new stdClass();
        $bodyContent->AnswerID = 1;

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
        $this->expectOutputRegex('/\"Topic\":"Bad words used"/');
        $this->expectOutputRegex('/\"Comments\":"true"/');
        $this->expectOutputRegex('/\"DateCreated\":"2022-10-23"/');
        $this->expectOutputRegex('/\"IsReviewed\":1/');
        GetReportSummary::makeCall();
    }
}
