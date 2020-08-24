$(function(){

  
    
    $("#side-toc ul li a").click(function(){
        $(this).parent().addClass("is-selected");
        console.log(this);
    });
});