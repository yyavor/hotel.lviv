<?php
header('Content-Type: application/json');
include ('database_communication.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['sender'])){
        
        $request_sender = $_POST['sender'];
        if ($request_sender == 'admin_ui' and isset($_POST['data'])){
            $data = $_POST['data'];
            switch ($data['command']) {
                case 0:
                    $response = get_data_for_admin_ui();
                    break;
                case 1:
                    $response = update_row($data['params']);
                    break;
                case 2:
                    $response = delete_row($data['params']);
                    break;
                case 3:
                    $response = add_row($data['params']);
                    break;
            }
            
            echo json_encode($response);
        }
    }else{
        echo json_encode("Data : NOT RECEIVED");
    }
}

function get_data_for_admin_ui()
{
    $hotel = new Hotel();
    
    $result = array();
    $result["hotel_contacts_info"] = $hotel->get_hotel_contacts_info();
    $result["hotel_service_info"] = $hotel->get_hotel_service_info();
    $result["hotel_rooms"] = $hotel->get_rooms_main_info();            
    
    return $result;
}

function update_row($params)
{
    $hotel = new Hotel();
    $result = $hotel->update_table_row($params[0], $params[1], '`id`', $params[2]);
    return $result;
}

function delete_row($params)
{
    $hotel = new Hotel();
    if ($params[0] == 'hotel_rooms'){
        $result = $hotel->remove_room($params[0], $params[1]);
        return $result;
    }
    $result = $hotel->remove_table_row($params[0], '`id`', $params[1]);
    return $result;
}

function add_row($params)
{   
    $hotel = new Hotel();
    if ($params[0] == 'hotel_rooms'){
        $result = $hotel->add_room($params[0], $params[1]);
        return $result;
    }
    $result = $hotel->add_table_row($params[0], $params[1]);
    return $result;
}

