jQuery(document).ready(function() {
		$("#get_content").on('click',function()
  {
    // alert("clicked!");
  $.get("http://127.0.0.1:8000/green_point_html/",{},function(html){
  		   $("head").append("<link href=\"/static/GreenPoint.css\" rel=\"stylesheet\">");
  		   $(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");

  		   $("#content_container").html(html);
  		
  	var h = $("#green_point_text").height();
	var w = $("#green_point_text").width();
	var sec = 0;
	var min = 0;
	console.log(w,h)
	$("#circle").css("margin-left",w/2);
	$("#circle").css("margin-top",300);
	var timerId;
	var updateFun = function(){
	timerId = setInterval(function() { 
			if(sec==5)// if(min==5)
			{
				// alert('Упражнение окончено');
				//Посылаю результаты
				$.ajax(
					{
						url: "http://127.0.0.1:8000/green_point_result/",
      				    type: "POST",
       				    data: {"ex_name":"GreenPoint","done":"true","min":min,"sec":sec},
        				dataType:"json",

					});
				
				clearInterval(timerId);
				var template = $.trim($("#resultTime").html());
				var temp = template.replace(/{minResult}/ig,min)
								   .replace(/{secResult}/ig,sec);
				
				$("#resultTime").replaceWith(temp); 
				$("#myModal").modal('show');
			}
			else if(sec != 60) 
			{
				$("#sec").text(++sec);
			}
			else if(sec == 60)
			{
				sec = 0;
				$("#sec").text(sec);
				$("#min").text(++min);
			}
			},1000);
}
updateFun();
	var resart_ex = function(){
		clearInterval(timerId);
				min = 0;
				sec = 0;
				$("#sec").text(sec);
				$("#min").text(min);
		updateFun();
	}
	$("#restart").on("click",resart_ex);
	$("body").on("click","#restart_from_modal",function(){
		resart_ex();
		$("#myModal").modal('hide');
	});
	

  },'html');
});
	


});
