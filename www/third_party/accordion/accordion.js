/// Accordion menu
jQuery(document).ready(function(){
    function createCookie(name,value,days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
      }
      else expires = "";
      document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }

    var cookier = readCookie("actr");
    var actr = cookier ? cookier : 0;
    var cookiel = readCookie("actl");
    var actl = cookiel ? cookiel : 0;

    jQuery(".accordion h3:eq("+actr+")").addClass("active");
    jQuery(".accordion p:eq("+actr+")").show();

    jQuery(".accordion h3").click(function(){
        var index = jQuery(".accordion h3").index(this);
        createCookie("actr", index, 365);

        jQuery(this).next("p").slideToggle("fast")
        .siblings("p:visible").slideUp("fast");
        jQuery(this).toggleClass("active");
        jQuery(this).siblings("h3").removeClass("active");

    });

});