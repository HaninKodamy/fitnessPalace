<?php
header("Access-Control-Allow-Origin:http://localhost:3000");
include './dbConnect.php';

$sql = "SELECT * FROM coaches";
$result = $conn->query($sql);

$coaches = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $coaches[] = $row;
    }
    echo json_encode($coaches);
} else {
    echo "0 results";
}
$conn->close();
?>
