$(function(){

    $("#announcement").click(function(){
        console.log("Clicked");
    })
    
    $("#side-toc ul li a").click(function(){
        $(this).parent().addClass("is-selected");
        console.log(this);
    });
});