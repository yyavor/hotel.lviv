<?php
include('/config.php');

class Hotel
{    
    function __construct(){
        $this->rooms_root_folder = "images/rooms";
        $this->exterier_folder = "images/hotel_exterier";
        $this->tables_matches = array(
            "room_type_class" => "rooms_types",
            "phone_class" => "hotel_phones",
            "contacts_info_class" => "hotel_info",
            "available_service_class" => "service",
            "hotel_rooms" => "rooms"
        );
    }
    
    private function __get_table_items($table){
        return DB::query("SELECT * FROM ".$table);
    }
    
    private function __get_images_full_path($images_path, $images)
    {
        $result = array();
        foreach ($images as $image)
        {
            $image_path = $images_path.'/'.$image;
            array_push($result, $image_path);
        }
        return $result;    
    }
    
    function update_table_row(){
        $params = func_get_args();
        $table_name = $this->tables_matches[array_shift($params)];
        $row_info = array_shift($params);
        $key_name = array_shift($params);
        $key_value = array_shift($params);
        
        return DB::update($table_name, $row_info, $key_name."=%s", $key_value);
    }
    
    function remove_table_row(){
        $params = func_get_args();
        $table_name = $this->tables_matches[array_shift($params)];
        $key_name = array_shift($params);
        $key_value = array_shift($params);
        
        return DB::delete($table_name, $key_name."=%s", $key_value);
    }
    
    function add_table_row(){
        $params = func_get_args();
        $table_name = $this->tables_matches[array_shift($params)];
        $row_info = array_shift($params);
        
        return DB::insertIgnore($table_name, $row_info);
    }
    
    ////////////////////////////////
    //  HOTEL INFO FUNCTIONALITY  //
    ////////////////////////////////
    
    function get_hotel_contacts_info(){
        $hotel_info_result_array = array("contacts_info"=>array(), "hotel_phones"=>array());
        
        $hotel__contacts_info_table = $this->__get_table_items('hotel_info');
        $hotel_phones_table = $this->__get_table_items('hotel_phones');
        
        $hotel_info_result_array["contacts_info"] = $hotel__contacts_info_table[0];
        
        $item = 0;
        while (list(,$phone_number) = each($hotel_phones_table)){
            $hotel_info_result_array['hotel_phones'][$item] = $phone_number;
            $item ++;
        }
        
        return $hotel_info_result_array;
    }
    
    function get_hotel_service_info(){
        $hotel_rooms_types_table = $this->__get_table_items('rooms_types');
        $hotel_available_service = $this->__get_table_items('service');
        $result = array();
        $result['rooms_types'] = $hotel_rooms_types_table;
        $result['available_services'] = $hotel_available_service;
        return $result;
    }
    
    ///////////////////////////////
    //  ROOMS PHOTOS FUNCTINALITY//
    ///////////////////////////////
    
    function get_rooms_main_info($room_type=NULL){
        $room_info = array('rooms' => array());
        if ($room_type){
            $rooms_query_result = DB::queryFullColumns("SELECT * FROM rooms WHERE type=%s", $room_type);
        }else{
            $rooms_query_result = DB::queryFullColumns("SELECT * FROM rooms" );
        }
        foreach ($rooms_query_result as $room)
        {
            $current_room_dir = $this->rooms_root_folder.'/'.$room['rooms.id'];
            $room_images = array_diff(scandir($current_room_dir), array('.', '..'));
            if (count($room_images)){
                $room_info['rooms'][$room['rooms.id']]['main_photo'] = $current_room_dir.'/'.array_shift($room_images);
                $room_info['rooms'][$room['rooms.id']]['type'] = $room['rooms.type'];
                $room_info['rooms'][$room['rooms.id']]['comments'] = $room['rooms.comments']; 
                $room_info['rooms'][$room['rooms.id']]['price'] = $room['rooms.price'];
            }            
        }
        return $room_info;
    }
    
    function get_separate_room_photos($room_id){
        if (!$room_id){
            return;
        }
        $room_photos_path = array('rooms_lists' => array());
        
        $current_room_dir = $this->rooms_root_folder.'/'.$room_id;
        $room_images = array_diff(scandir($current_room_dir), array('.', '..'));
        if (count($room_images)){
            $room_photos_path['rooms_lists'] = $this->__get_images_full_path($current_room_dir, $room_images);
        }
        return $room_photos_path['rooms_lists'];
    }
    
    function add_room($table, $params)
    {
        if (!$this->add_table_row($table, $params))
        {
            return False;
        }
        if (!is_dir('./images/rooms/'.$params['id'])) {
            mkdir('./images/rooms/'.$params['id'], 0755);
        }
    }
    
    function remove_room($table, $id)
    {
        if (!$this->remove_table_row($table, 'id', $id))
        {
            return False;
        }
        $dir = './images/rooms/'.$id;
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
              if ($object != "." && $object != "..") {
                if (filetype($dir."/".$object) == "dir") 
                   rrmdir($dir."/".$object); 
                else unlink   ($dir."/".$object);
              }
            }
            reset($objects);
            rmdir($dir);
        }
    }
    
    /////////////////////////////////
    //EXTERIER PHOTOS FUNCTIONALITY//
    /////////////////////////////////
    
    function get_hotel_exterier_photos(){
        $hotel_exterier_photos = array("exterier_photos" => array());        
        $exterier_photos_names = array_diff(scandir($this->exterier_folder), array('.', '..'));
        $hotel_photos['exterier_photos'] = $this->__get_images_full_path($this->exterier_folder, $exterier_photos_names);
        return $hotel_photos;
    }
}

//$hotel = new Hotel();

//print(json_encode($hotel->get_separate_room_photos()));

//print(json_encode($hotel->get_rooms_main_info()));


//$hotel->add_table_row("room_type_class", array('comment'=>'some comment will be here', 'type_name'=>'Yura-new-type'));

//$hotel->update_table_row("phone_class", array('address'=>"м. Львів, вул. Скнилівська, 75d", 'email'=>"dfghjkl"), 'id', '1');








