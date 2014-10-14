<?php
include('/config.php');

class Hotel
{    
    function __construct(){
        $this->rooms_root_folder = "images/rooms";
        $this->exterier_folder = "images/hotel_exterier";
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
    
    function update_table_row($params){
        $table_name = array_shift($params);
        $row_info = array_shift($params);
        $key_name = array_shift($params);
        $key_value = array_shift($params);
        
        DB::update($table_name, $new_row_info, $key_name."=".$key_value);
    }
    
    function remove_table_row($params){
        $table_name = array_shift($params);
        $row_info = array_shift($params);
        $key_name = array_shift($params);
        $key_value = array_shift($params);
        
        DB::delete($table_name, "%s=%s", $key_name ,$key_value);
    }
    
    function add_table_row($params){
        $table_name = array_shift($params);
        $row_info = array_shift($params);
        
        DB::insertIgnore($table_name, $row_info);
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
        
        return json_encode($hotel_info_result_array);
    }
    
    function get_hotel_service_info(){
        $hotel_rooms_types_table = $this->__get_table_items('rooms_types');
        $hotel_available_service = $this->__get_table_items('service');
        
        return json_encode(array_merge($hotel_rooms_types_table, $hotel_available_service));
    }
    
    ///////////////////////////////
    //  ROOMS PHOTOS FUNCTINALITY//
    ///////////////////////////////
    
    function get_rooms_main_photos($room_type=NULL){
        $query = "SELECT * FROM rooms";
        $room_photos_path = array('rooms_lists' => array());
        if ($room_type){
            $rooms_id = DB::queryOneColumn('id', "SELECT * FROM rooms WHERE type=%s", $room_type);
        }else{
            $rooms_id = DB::queryOneColumn('id', "SELECT * FROM rooms" );
        }
        
        foreach ($rooms_id as $room)
        {
            $current_room_dir = $this->rooms_root_folder.'/'.$room;
            $room_images = array_diff(scandir($current_room_dir), array('.', '..'));
            if (count($room_images)){
                $room_photos_path['rooms_lists'][$room] = $current_room_dir.'/'.array_shift($room_images);
            }            
        }
        return json_encode($room_photos_path['rooms_lists']);
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
        return json_encode($room_photos_path['rooms_lists']);
    }
    
    /////////////////////////////////
    //EXTERIER PHOTOS FUNCTIONALITY//
    /////////////////////////////////
    
    function get_hotel_exterier_photos(){
        $hotel_exterier_photos = array("exterier_photos" => array());        
        $exterier_photos_names = array_diff(scandir($this->exterier_folder), array('.', '..'));
        $hotel_photos['exterier_photos'] = $this->__get_images_full_path($this->exterier_folder, $exterier_photos_names);
        return json_encode($hotel_photos);
    }
}







