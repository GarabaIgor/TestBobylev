$(function() {

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

      var restart_ex = function(){

        clearInterval(timerId);
        min = 0;
        sec = 0;
        
        $("#sec").text(sec);
        $("#min").text(min);
        $.post("http://127.0.0.1:8000/vertical_about_html/",{},function(html){
          
            $(".top_left_corner").remove();
            $("#content_container").remove();
            $(".navbar").after(html);

          },'html');
         // updateFun();
    }

	$("body").on("click","#get_content",function()
	{
		text_name = $("#texts_names option:selected").val();
		$.get("http://127.0.0.1:8000/vertical_html/",{"text_name":text_name},function(html){
  		   // $("head").append("<link href=\"/static/Vertical.css\" rel=\"stylesheet\">");
  		   $(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");

  		   $("#content_container").html(html);
         
      
      updateFun();

	});
 });

body.on("click","#restart",restart_ex);
      body.on("click","#restart_from_modal",function()
      {
    // resart_ex();
    
        $("#myModal").modal('hide');
        setTimeout(function(){
        restart_ex();
       },350);
      });

$('body').on("click","#finish_reading",function(){
        $.get("http://127.0.0.1:8000/vertical_questionare_html/",{"text_name":text_name},function(html){
            clearInterval(timerId);
            // $("form").append("<input id=\"min_h\" type=\"hidden\" name=\"min\" value=\"min\">");
            $(".top_left_corner").remove();
              $("#content_container").html(html);
            });
      });

var check_res_count = 0;
      $("body").on("click","#check_result",function()
      {
          // if(check_res_count == 0)
          // {
          //   check_res_count++;
            // alert("!!!!!");
          $("form").append("<input id=\"min_h\" type=\"hidden\" name=\"min\" value=\""+min+"\">");
          $("form").append("<input id=\"min_h\" type=\"hidden\" name=\"sec\" value=\""+sec+"\">");
          serialized_arr = $("form").serializeArray();
         // serialized_arr.push("111");
          console.log(serialized_arr);

          $.post("http://127.0.0.1:8000/vertical_questionare_result/",serialized_arr,function(json){
          arr = new Array(json.correct_inds);
          // for(var key in json.correct_inds){
          //   console.log(json.correct_inds[key]);
          // }

          input_ind = 1;
          // console.log($.contains(json.correct_inds,"10"));
          $("form#quest :input[type=text]").each(function(){
            $(this).css("background","ffd5d5");        
            for(var key in json.correct_inds){         
              if(json.correct_inds[key] == input_ind )
              {
                console.log(json.correct_inds[key]);
                console.log(input_ind);
                $(this).css("background","d5ffd5");
                break;
              }
          }
           input_ind++;
            // a = $(json.correct_inds).toArray();
            // console.log(jQuery.contains(a,10));
            // console.log("!");
            // console.log($(this));
          });

          template = $.trim($("#resultInf").html());
          var temp = template.replace(/{minResult}/ig,min)
                             .replace(/{secResult}/ig,sec)
                             .replace(/{speed}/ig,json.speed);
          $("#resultInf").replaceWith(temp); 
           $("#myModal").modal("show");
          // $("input").css("background","ffd5d5");
        });
      // }
      // else
      // {
      //   $("#myModal").modal("show");
      // }

     

  
 
	  });
});