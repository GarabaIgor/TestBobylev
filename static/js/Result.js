$(function() {
	$.post("http://127.0.0.1:8000/result_html/",{},function(html)
       {
       
        console.log(html);
        $("#results").html(html);
        
       },'html');

	$("#reset_result").on("click",function(){
		$.post("http://127.0.0.1:8000/reset_result/",{},function(html)
       {
       
        $("#results").html(html);
        
       },'html');
	});
});