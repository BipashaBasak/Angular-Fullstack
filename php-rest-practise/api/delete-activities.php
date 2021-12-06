
<?php
    include_once './config/database.php';
    include_once './config/auth-guard.php';

    $data = json_decode(file_get_contents("php://input"));

     // print_r($data);die();
    $currentTime = date('Y-m-d H:i:s');

    $id = $data->id;

       $q1 = "SELECT 
                   `activities`.`id` AS `activityId`, 
                   `activities`.`title` AS `title`, 
                   `activities`.`description` AS `description`, 
                   `activities`.`createdAt` AS `createdAt`,
                   `users`.`id` AS `userId`,
                   `users`.`name` AS `name`,
                   `users`.`phoneNumber` AS `phoneNumber`
                   
              FROM 
                  `activities`, 
                  `users` 
              WHERE 
                   `activities`.`userId` = `users`.`id` AND   
                   `activities`.`status` = 'active' ";

     $qr = mysqli_query($con, $q1);

    $qr_num = mysqli_num_rows($qr);
    

     if ($qr_num !== 0) {

            $qry = "DELETE FROM `activities` WHERE `activities`.`id` = ".$id;
            $qry_exec = mysqli_query($con, $qry);

            if($qry_exec){
                echo json_encode(array("status" =>"success", "message" => "Activity Deleted."));
            }
            else{
                echo json_encode(array("status" =>"error", "message" => "Unable to delete activity."));
            }

    } else {
        echo json_encode(array("status" =>"error", "message" => "Already deleted or error in request."));
    }

    
?>