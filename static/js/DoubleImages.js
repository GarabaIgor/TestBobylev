$(function() {
	$(document).bind("contextmenu",function(e){
              return false;
       }); 
		var spaceCount = 0;
	  	var sec = 0;
		var min = 0;
		var body = $("body");
		var updateFun = function()
		{
			timerId = setInterval(function() { 
					if(sec==5)// if(min==5)
					{
						
						


						$.ajax(
				          {
				            url: "http://127.0.0.1:8000/double_images_result/",
				                  type: "POST",
				                  data: {"ex_name":"DoubleImages","spaceCount":spaceCount,"min":min,"sec":sec},
				                dataType:"json",

				          });

				        template = $.trim($("#resultInf").html());
				        var temp = template.replace(/{minResult}/ig,min)
						                   .replace(/{secResult}/ig,sec)
						                   .replace(/{spaceCount}/ig,spaceCount);
				        $("#resultInf").replaceWith(temp); 
				        // console.log(temp);
				        clearInterval(timerId);
				        $("#myModal").modal("show");


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
	};

		var restart_ex = function(){
			clearInterval(timerId);
			min = 0;
			sec = 0;
			spaceCount = 0;
			$("#sec").text(sec);
			$("#min").text(min);
			$.get("http://127.0.0.1:8000/double_images_html/",{},function(html){
		    $("head").append("<link href=\"/static/DoubleImages.css\" rel=\"stylesheet\">");
	  		   // $("head").append("<script type=\"text/javascript\" src=\"/static/AttentionLettersTable.js\"></script>");
	        $("#content_container").html(html);
	        $("#content_container").css({"text-align":"center","padding-top":"2em"});
	        // $(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");
	  		},'html');
			updateFun();
		}

		body.on("click","#restart",restart_ex);

	body.keyup(function(e)
	{
   
	   	if(e.keyCode == 32)
	   	{
	   		spaceCount++;
	       // console.log(spaceCount);
 		}
	});

	body.on("click","#restart_from_modal",function()
	{
    	$("#myModal").modal('hide');
      	setTimeout(function(){
   			 restart_ex();
  		},350);
    
  	});

	$("#get_content").on("click",function()
	{
		$.get("http://127.0.0.1:8000/double_images_html/",{},function(html){
  		   $("head").append("<link href=\"/static/DoubleImages.css\" rel=\"stylesheet\">");
  		   // $("head").append("<script type=\"text/javascript\" src=\"/static/AttentionLettersTable.js\"></script>");
  		 
        $("#content_container").html(html);
        $("#content_container").css({"text-align":"center","padding-top":"2em"});
        $(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");
  		
  		
		updateFun();
	



  		

  		},'html');
	})

	
});