<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include './dbConnect.php';

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    exit();
}

function sanitizeInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$inputData = json_decode(file_get_contents("php://input"), true);

$username = $_COOKIE['username'] ?? null;
$planName = sanitizeInput($inputData['planName']);
$className = sanitizeInput($inputData['className']);
$startDate = date("Y-m-d"); 
$cost = floatval(sanitizeInput($inputData['cost'])); 
$token = sanitizeInput($inputData['token']);

if (empty($planName) || empty($startDate) || empty($cost) || empty($className) || empty($token)) {
    echo json_encode(["message" => "All fields are required."]);
    http_response_code(400);
    exit();
}

$date = new DateTime($startDate);
if($planName === 'Basic Plan'){
    $date->add(new DateInterval('P5D'));
}
else if($planName === 'Pro Plan'){
    $date->add(new DateInterval('P1M'));
}
else{
    $date->add(new DateInterval('P15D'));
}
$expiryDate = $date->format('Y-m-d');

$memberQuery = "SELECT id FROM members WHERE token = ?";
$memberStmt = $conn->prepare($memberQuery);
$memberStmt->bind_param("s", $token);
$memberStmt->execute();
$result = $memberStmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["message" => "Member not found."]);
    http_response_code(404);
    exit();
}
echo json_encode(["message" => "All fields are required. $token"]);
$member = $result->fetch_assoc();
$memberId = $member['id'];

$planQuery = "INSERT INTO plans (planName, className, start_date, expiry_date, member_id, cost) VALUES (?, ?, ?, ?, ?, ?)";
$planStmt = $conn->prepare($planQuery);
$planStmt->bind_param("ssssdi", $planName, $className, $startDate, $expiryDate, $memberId, $cost);

if ($planStmt->execute()) {
    echo json_encode(["message" => "Plan registered successfully."]);
    http_response_code(201);
} else {
    echo json_encode(["message" => "Error in plan registration."]);
    http_response_code(500);
}

$memberStmt->close();
$planStmt->close();
$conn->close();
?>