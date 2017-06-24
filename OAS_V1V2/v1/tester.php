<? 
header("Access-Control-Allow-Origin: *");
function post($url, $data) {
$header = array("User-Agent: " . $_SERVER["HTTP_USER_AGENT"], "Content-Type: application/x-www-form-urlencoded");
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
$response = curl_exec($curl);
curl_close($curl);
return $response;
}

$url = "https://oas.lpu.in/api/OnlineExam/SaveLogDetails";
$data = $_SERVER["QUERY_STRING"];

echo(post($url, $data));

?>