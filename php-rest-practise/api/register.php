<?php
    include_once './config/database.php';

    $data = json_decode(file_get_contents("php://input"));

     // print_r($data);die();

    $name = $data->name;
    $phoneNumber = $data->phoneNumber;
    $password = $data->password;
    $confirmPassword = $data->confirmPassword;
   

    if ($name && $phoneNumber && $password && $confirmPassword) {

        
            if($password === $confirmPassword) {

                 $qry = "INSERT INTO `users` VALUES ('', '".$name."', '".$phoneNumber."','".$password."', '".$confirmPassword."')";
                 $qry_exec = mysqli_query($con, $qry);

                 if($qry_exec){
                        echo json_encode(array("message" => "User successfully registered."));
                    }
                    else{
                         echo json_encode(array("message" => "Unable to register the user."));
                    }

            } else{
            echo json_encode(array("message" => "Invalid entry , check your password."));
            
             }
     
    

    } else{
            echo json_encode(array("message" => "Invalid entry."));
            
    }
?>