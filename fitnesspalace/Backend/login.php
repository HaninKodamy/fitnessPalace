<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include './dbConnect.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function sanitizeInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$inputData = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = sanitizeInput($inputData['email'] ?? '');
    $password = sanitizeInput($inputData['password'] ?? '');

    if (!empty($email) && !empty($password)) {
        $query = "SELECT * FROM members WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                if ($user['username']) {
                    $token = bin2hex(random_bytes(32));

                    $updateTokenQuery = "UPDATE members SET token = ? WHERE email = ?";
                    $updateTokenStmt = $conn->prepare($updateTokenQuery);
                    $updateTokenStmt->bind_param("ss", $token, $email);
                    $updateTokenStmt->execute();

                    $currentDate = date("Y-m-d");
                    $fetchPlanesQuery = "SELECT p.planName, p.expiry_date, nutPlanName, className
                                                
                                            FROM plans p 
                                            LEFT JOIN downloadednutritionplans d 
                                            ON p.id = d.plan_id AND d.member_id = ?
                                            WHERE p.member_id = ? AND p.expiry_date > ?";
                    $fetchPlanesStmt = $conn->prepare($fetchPlanesQuery);
                    $fetchPlanesStmt->bind_param("iii", $user['id'], $user['id'], $currentDate);
                    $fetchPlanesStmt->execute();
                    $fetchPlanesResult = $fetchPlanesStmt->get_result();

                    if ($fetchPlanesResult) {
                        $planes = [];
                        while ($row = $fetchPlanesResult->fetch_assoc()) {
                            $planes[] = $row;
                        }
                        $fetchPlanesStmt->close();
                        echo json_encode(["success" => true, "token" => $token, "planes" => $planes]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Error fetching planes: " . $conn->error]);
                    }
                } else {
                    echo json_encode(["success" => false, "message" => "Failed to set cookie"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Invalid credentials"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "User does not exist"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Email and password are required"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    http_response_code(405);
}

$conn->close();