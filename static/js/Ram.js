$(function() {
	var nextInd = 1;
			
			var sec = 0;
			var min = 0;
			var timerId;
			var body = $("body");
		var updateFun = function()
		{
			 timerId = setInterval(function() {
				if(sec==5)
				{
					clearInterval(timerId);
					min = 0;
					sec = 0;
					$("#words_table").remove();
					$(".top_left_corner").remove();
					$("#content_container").append("<p>Введите слова</p><textarea id=\"result_words\"></textarea><p style=\"text-align:right\"><a id=\"send_words\" class=\"btn btn-danger\"><i class=\"icon-arrow-right\" ></i> Отправить</a></p>")
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
		// restartFun = function()
		// {
  		
  // 			console.log("restart");
  // 			clearInterval(timerId);
  // 			$("#sec").text(0);
		// 	$("#min").text(0);
		// 	min = 0;
  // 			sec = 0;
  // 			nextInd = 1;
		// 	cur = 0;
  // 			$.get("http://127.0.0.1:8000/schulte_table_html/",{},function(html){
  // 				 $("#content_container").html(html);
  // 				});
  // 			updateFun();
  		
  // 		}

  		body.on("click","#get_content",function(){
  			updateFun()
  			$.get("http://127.0.0.1:8000/ram_html/",{},function(html){
  				$(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");
  				$("#content_container").html(html);
  		});
  	});

  		body.on("click","#send_words",function(){
  			$.post("http://127.0.0.1:8000/ram_check_result/",{"words":$("#result_words").val()},function(text){
  				$("textarea").attr('readonly','readonly');
  				var template = $.trim($("#result_count").html());
				var temp = template.replace(/{ans_count}/ig,text);
								   
				
				$("#result_count").replaceWith(temp); 
  				$("#myModal").modal("show");
  			});

  		});
  		body.on("click","#restart_from_modal",function(){
  			$("#myModal").modal("hide");
  			$.get("http://127.0.0.1:8000/ram_html/",{},function(html){
  				 setTimeout(function(){
    				$(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");
  				$("#content_container").html(html);
  				updateFun();
  					},350);
  				

  		});
  		});
  		body.on("click","#restart",function(){
  			clearInterval(timerId);
  			min = 0;
			sec = 0;
  			$("#words_table").remove();
			$(".top_left_corner").remove();
  			$.get("http://127.0.0.1:8000/ram_html/",{},function(html){
  				 
    			$(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");
  				$("#content_container").html(html);
  				updateFun();
  					
  				

  		});
  		});
});