$(document).ready(function(){
    $(".elementContain").click(function(){
        $("#popUp").show();
    });
    $(".backgroundExit").click(function(){
        $("#popUp").hide();
    });
    $("#exit").click(function(){
        $("#popUp").hide();
    });
});





function showPopup(){
    $("#popUp").css("display", "initial");
}
function closePopup(){
    $("#popUp").css("display", "none");
}
