/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var $j = jQuery.noConflict();

function show_photos_galery(photos_content, room_id){
    $j.getJSON( "get_hotel_photos.php", function(data) {
        if ($j("#content").length){
            $j("#content").empty();
        }
        $j("#content").append("<div id='MooFlow' class='mf'></div>");
        if (typeof room_id === 'undefined'){
            photos_galery = data[photos_content];
        }
        else{
            photos_galery = data[photos_content][room_id];
        }
        for (var i=0; i<photos_galery.length; i++){
            $j("#content").children().append("<div><img src='"+photos_galery[i]+"'/></div>");
        }        
        var mf = new MooFlow($('MooFlow'), {
                startIndex: Math.round((photos_galery.length)/2)-1,
                useWindowResize: true,
		useMouseWheel: true,
		useKeyInput: true,
                useSlider: true,
                useCaption: true,
                useResize: true,
                reflection: 0.2,
                heightRatio: 0.47,
                interval: 3000,
                factor: 160
        });
    });
}

function get_rooms_list(){
    $j.getJSON( "get_hotel_photos.php", function(data) {
        if ($j("#content").length){
            $j("#content").empty();
        }
        rooms_photos = data['rooms_lists'];
        rooms_number = Object.keys(rooms_photos).length;
        for (room in rooms_photos){
            $j("#content").append('<div id="'+room+'" class="room_photo_item"></div>');
            $j("#"+room).append('<img src="'+rooms_photos[room][0]+'" />');
        }
        $j('.room_photo_item').click(function() {
            room_id = $j(this).attr("id");
            show_photos_galery("rooms_lists", room_id);
        });
    });
}

function show_contacts(){
    if ($j("#content").length){
        $j("#content").empty();
    }
    $j("#content").append('<div id="place_on_map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5149.138220771666!2d23.96858374224904!3d49.81296796871404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae70c3533e4eb%3A0xa031acbc59876fea!2z0LLRg9C7LiDQodC60L3QuNC70ZbQstGB0YzQutCwLCA3NSwg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1suk!2sua!4v1409680971676" width="600" height="450" frameborder="0" style="border:0"></iframe></div>');
}

$j( document ).ready(function() {
    show_photos_galery("exterier_photos");
    $j("#exterier_menu_link").click(function(){
        $j(this).addClass("current");
        $j(this).siblings().removeClass("current");
        show_photos_galery("exterier_photos");
    });
    $j("#rooms_menu_link").click(function(){
        $j(this).addClass("current");
        $j(this).siblings().removeClass("current");
        get_rooms_list();        
    });
    $j("#contacts_menu_link").click(function(){
        $j(this).addClass("current");
        $j(this).siblings().removeClass("current");
        show_contacts();
    });
});

