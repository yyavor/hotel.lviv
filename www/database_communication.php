<?php
class DataBaseConfiguration
{
    public static $HOST = "localhost";
    public static $USER = "root";
    public static $PASSWORD = "";
    public static $DB_NAME = "rod_dvir_hotel";
}

class DataBase
{
    private $connection = NULL; 
    
    function create_connection(){
        
        $this->__connection = mysqli_connect(
                DataBaseConfiguration::$HOST,
                DataBaseConfiguration::$USER,
                DataBaseConfiguration::$PASSWORD,
                DataBaseConfiguration::$DB_NAME);
        // Check connection
        if (mysqli_connect_errno()){
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
        echo "Success";    
    }
    
    function close_connection(){
        if ($this->__connection != NULL){
            mysqli_close($this->__connection);
        }
    }
}

$hotel_db = new DataBase();
$hotel_db->create_connection();
$hotel_db->close_connection();





