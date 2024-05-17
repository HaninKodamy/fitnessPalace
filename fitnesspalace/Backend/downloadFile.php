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

$token = sanitizeInput($inputData['token']) ?? null;
$planName = sanitizeInput($inputData['planName']) ?? null;
$nutPlanName = sanitizeInput($inputData['nutPlanName']) ?? null;


if (empty($token) || empty($planName || empty($nutPlanName))) {
    echo json_encode(["error" => true, "message" => "Token and plan name and nutPlanName are required."]);
    http_response_code(400);
    exit();
}

$memberIdQuery = "SELECT id FROM members WHERE token = ?";
$memberIdStmt = $conn->prepare($memberIdQuery);
$memberIdStmt->bind_param("s", $token);
$memberIdStmt->execute();
$memberIdResult = $memberIdStmt->get_result();

if ($memberIdResult->num_rows === 0) {
    echo json_encode(["error" => true, "message" => "Member not found."]);
    http_response_code(404);
    exit();
}

$memberIdRow = $memberIdResult->fetch_assoc();
$memberId = $memberIdRow['id'];

$planIdQuery = "SELECT id FROM plans WHERE planName = ?";
$planIdStmt = $conn->prepare($planIdQuery);
$planIdStmt->bind_param("s", $planName);
$planIdStmt->execute();
$planIdResult = $planIdStmt->get_result();

if ($planIdResult->num_rows === 0) {
    echo json_encode(["error" => true, "message" => "Plan not found."]);
    http_response_code(404);
    exit();
}

$planIdRow = $planIdResult->fetch_assoc();
$planId = $planIdRow['id'];

$insertQuery = "INSERT INTO downloadednutritionplans(plan_id, member_id,nutPlanName) VALUES (?, ?,?)";
$insertStmt = $conn->prepare($insertQuery);
$insertStmt->bind_param("iis", $planId, $memberId,$nutPlanName);

if ($insertStmt->execute()) {
    echo json_encode(["error" => false, "message" => "Downloaded nutrition plan saved successfully."]);
    http_response_code(201);
} else {
    echo json_encode(["error" => true, "message" => "Error in saving downloaded nutrition plan."]);
    http_response_code(500);
}

$insertStmt->close();
$planIdStmt->close();
$memberIdStmt->close();
$conn->close();
?>