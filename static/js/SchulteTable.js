jQuery(document).ready(function() {
	$(document).bind("contextmenu",function(e){
              return false;
       });
			var nextInd = 1;
			var cur = 0;
			var sec = 0;
			var min = 0;
			var timerId;
			var body = $("body");
		var updateFun = function()
		{
		timerId = setInterval(function() { 
			if(sec != 60) 
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
		restartFun = function()
		{
  		
  			console.log("restart");
  			clearInterval(timerId);
  			$("#sec").text(0);
			$("#min").text(0);
			min = 0;
  			sec = 0;
  			nextInd = 1;
			cur = 0;
  			$.get("http://127.0.0.1:8000/schulte_table_html/",{},function(html){
  				 $("#content_container").html(html);
  				});
  			updateFun();
  		
  		}
		body.on("click","#restart",restartFun);
  		body.on("click","#restart_from_modal",function(){
  			// restartFun();
  			$("#myModal").modal('hide');
  			
  		});
  		body.bind("hidden","#myModal",restartFun);
		body.on('click','#get_content',function()
			
  {			console.log("1");
  			nextInd = 1;
			cur = 0;
			sec = 0;
			min = 0;
			timerId;
    
  		   $.get("http://127.0.0.1:8000/schulte_table_html/",{},function(html){
  		   $("head").append("<link href=\"/static/SchulteTable.css\" rel=\"stylesheet\">");
  		   
  		   
  		   if($(".top_left_corner").length == 0)
  		   {
  		   		$(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");
  		   		// console.log($(".top_left_corner").length);
  		   }
  		   else
  		   		{
  		   			min = 0;
  		   			sec = 0;
  		   			nextInd = 1;
  		   			cur = 0;
  		   			$("min").html("0");
  		   			$("sec").html("0");
  		   		}
  		   $("#content_container").html(html);
  		



  		
			$('td').live('click',function()
			{
				
				//console.log($(this).text() + " " + nextInd );
				var $this = $(this);
				if(nextInd == parseInt($this.text()))
				{
					$this.css('background','#00D500');

					nextInd++;
					cur++;
					console.log(nextInd + " " + $this.text());
					
					
				}
				else 
				{
					$this.css('background','red');
					
				}
				setTimeout(
					function()
					{
					
						
						$this.css('background','white');
					},250);
				//nextInd == 26 && cur == 25
				if(nextInd == 26 && cur == 25)
				{
				clearInterval(timerId);
				
				template = $.trim($("#resultTime").html());
				var temp = template.replace(/{minResult}/ig,min)
								   .replace(/{secResult}/ig,sec);

				//Посылаю результаты
				$.ajax(
					{
						url: "http://127.0.0.1:8000/get_schulte_table_result/",
      				    type: "POST",
       				    data: {"ex_name":"SchulteTable","min":min,"sec":sec},
        				dataType:"json",

					});

				$("#resultTime").replaceWith(temp); 
				$("#myModal").modal("show");
					
				
			}
				
			});
		
	updateFun();
		//Отправляю по кнопке завершить упражнение
		// $("#finish_ex").on("click",function(){

				
				 
		// });
		
  		
  },'html');
});
	


});
