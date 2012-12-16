$(function()
{	
	var body = $("body");
	var selectes_cells = 0;
	send_selected = function()
	{
		body.unbind("click");
		ids_arr = []
		$("#trianglesTable  td").each(function()
		{		 	
		 	if($(this).attr("class"))
		 	{
		 		ids_arr.push($(this).attr("id"));		 				 		
		 	}
		 	
		});
		console.log(ids_arr);
		//Отправить ids_arr
		$.get("http://127.0.0.1:8000/triangles_results/",{},function(html)
		 	{
		 		body.html(html);
		 	},'html');
	}
	select_tr = function()
	{
		$.get("http://127.0.0.1:8000/triangles/",{},function(html)
		{                    
          body.html(html);
          body.prepend("<div id=\"timer\">timer</div>")
          body.on("click","td",function()
		  {	
		  	if(!$(this).attr("class") && selectes_cells < 6)
		  	{
		  		$(this).attr("class","selected");		
		  		selectes_cells++;
		  	}
			else if($(this).attr("class"))
			{
				$(this).removeAttr("class");
				selectes_cells--;
			}
		  });
		  initTimer(0,5,send_selected)
		  updateTimer();
        },'html');
	}
	

	initTimer(0,2,select_tr);	
	updateTimer();

	

	

});