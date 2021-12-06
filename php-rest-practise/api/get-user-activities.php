<?php
    include_once './config/database.php';
    include_once './config/auth-guard.php';

    $data = json_decode(file_get_contents("php://input"));

    $userId = $data->userId;

    $query = "
              SELECT 
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
                   `activities`.`userId` = '".$userId."' AND 
                   `activities`.`status` = 'active'";

    $qry_exec = mysqli_query($con, $query);

    $num = mysqli_num_rows($qry_exec);

    $activities = [];


    while ($row = mysqli_fetch_array($qry_exec)) {

        // print_r($row);
 
        $activities[] = array(
                     'id' => $row['activityId'], 
                     'user' => array(
                                    'userId'=>$row['userId'], 
                                    'name'=>$row['name'], 
                                    'phoneNumber'=>$row['phoneNumber'] 
                                ),
                     'title' => $row['title'], 
                     'description' => $row['description'],
                     'createdAt' => $row['createdAt']
                 );

    }
   
    // die();       
     echo json_encode(
        array(
            "status" => "success",
            "data" => $activities
        )
        
    );
?>