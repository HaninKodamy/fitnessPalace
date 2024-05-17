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
    $token = sanitizeInput($inputData['token'] ?? '');

    if (!empty($token)) {
        $query = "SELECT m.username, m.email, m.dob, p.className, p.planName, p.expiry_date, p.cost, d.nutPlanName
                    FROM members m
                    LEFT JOIN plans p ON m.id = p.member_id
                    LEFT JOIN downloadednutritionplans d ON m.id = d.member_id
                    WHERE m.token = ?";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $userInfo = [];
            while ($row = $result->fetch_assoc()) {
                $userInfo[] = $row;
            }
            $stmt->close();
            echo json_encode(["success" => true, "userInfo" => $userInfo]);
        } else {
            echo json_encode(["success" => false, "message" => "User not found or no plans available"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Token is required"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    http_response_code(405);
}

$conn->close();
?>
