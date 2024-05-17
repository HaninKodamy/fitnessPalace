<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include './dbConnect.php';

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    exit();
}
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$inputData = json_decode(file_get_contents("php://input"), true);

if(isset($inputData)) {
    $username = sanitizeInput($inputData['username']);
    $email = sanitizeInput($inputData['email']);
    $password = sanitizeInput($inputData['password']);
    $birthdate = sanitizeInput($inputData['birthdate']);

    if(empty($username) || empty($email) || empty($password) || empty($birthdate)) {
        echo json_encode(["message" => "All fields are required."]);
        http_response_code(400);
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO members (username, email, password, dob) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssss", $username, $email, $hashedPassword, $birthdate);

    if($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully."]);
        http_response_code(201); 
    } else {
        echo json_encode(["message" => "Error in user registration."]);
        http_response_code(500); 
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "No data received."]);
    http_response_code(400); 
}

$conn->close();
?>
