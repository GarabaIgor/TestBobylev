jQuery(document).ready(function() {
  $(document).bind("contextmenu",function(e){
              return false;
       }); 

	var chosen_letters = "";
  var letter1_count = 0;
  var letter2_count = 0;
  var mistake_count = 0;
  var not_found_count = 0;
  var letter1_count_orig = 0;
  var letter2_count_orig = 0;
  var sec = 0;
  var min = 0;

  //Тикающий таймер
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

 
  var restart_ex = function()
  {
      chosen_letters = "";
      letter1_count = 0;
      letter2_count = 0;
      mistake_count = 0;
      not_found_count = 0;
      letter1_count_orig = 0;
      letter2_count_orig = 0;
      clearInterval(timerId);
        min = 0;
        sec = 0;
        $("#sec").text(sec);
        $("#min").text(min);
    // updateFun();
       $.get("http://127.0.0.1:8000/attention_letters_html_from_modal/",{},function(html)
       {
       
        $(".top_left_corner").remove();
        $("#content_container").html(html);
        //Who knows why?
        $(".page-content").css("width","876");
       // console.log(html);
       },'html');
    
  }
  
  $("body").on('click',"#get_content",function()
  {
    $('body').on("mousedown","td",function(event)
     {
          // console.log("clicked!");
      if(chosen_letters.length == 1)
      {
        if (event.which == 1) {
              
                if(!$(this).attr("id"))
                {
                  $(this).attr("id","selected");
                letter1_count++;
              }
                  
      }
      }
      if(chosen_letters.length == 2)
      {
        if (event.which == 1) {
              
                if(!$(this).attr("id"))
                {
                  $(this).attr("id","selected");
                letter1_count++;
              }
                  
      }
        if(event.which == 3)
        {
              if(!$(this).attr("id"))
              {
                $(this).attr("id","selected2");
              letter2_count++;
            }
          }
                
      }
     
});
    chosen_letters = $("#list option:selected").val();
     // console.log(chosen_letters);
  $.getJSON("http://127.0.0.1:8000/attention_letters_json/",{"chosen_letters":chosen_letters},function(json){
  		   
  		    $(".navbar").after("<div class=\"top_left_corner\"><a id=\"restart\" class=\"btn btn-info\"><i class=\"icon-refresh\" ></i> Начать заново</a><p class=\"timer\"><span id=\"min\">0</span>:<span id=\"sec\">0</span></p></div>");

       letter1_count_orig = json.letter1_count;
       letter2_count_orig = json.letter2_count;

  		$("#content_container").html(json.html_content);
      updateFun();

      
  		
  },'json');
          
   
}); 

  $("body").on("click","#restart",restart_ex);
      //Получить стартовую страницу упражнения
  $("body").on("click","#restart_from_modal",function(){
    // resart_ex();
    
    $("#myModal").modal('hide');
      setTimeout(function(){
    restart_ex();
  },350);
    
  });





$("body").on("click","#check_table_b",function(){
      

        $('body').unbind('mousedown');
        var selected = $("#selected").text();
        $("#letters_table td").each(function() {
        var td = $(this);
        // TODO принять значение букв через AJAX
        if(td.attr("id") == "selected" && td.text() != chosen_letters[0])
        {
            td.attr("id","selected_mistake");

            letter1_count--;
            mistake_count++;
            // console.log(td.attr("id"));
        }
        if(td.attr("id") == "selected2" && td.text() != chosen_letters[1])
        {
            td.attr("id","selected_mistake");

            letter2_count--;
            mistake_count++;
            // console.log(td.attr("id"));
        }
        if(!td.attr("id") && (td.text() == chosen_letters[0] || td.text() == chosen_letters[1]))
        {
            td.attr("id","selected_mistake");
            mistake_count++;
            // not_found_count++;
            // console.log(td.attr("id"));
        }



        

    
});
        //Посылаем данные о результатах на сервер
        $.ajax(
          {
            url: "http://127.0.0.1:8000/get_attention_letters_result/",
                  type: "POST",
                  data: {"ex_name":"AttentionLetters","mistake_count":mistake_count,"min":min,"sec":sec},
                dataType:"json",

          });
        
        template = $.trim($("#resultInf").html());
        var temp = template.replace(/{letter1_count}/ig,letter1_count)
                   .replace(/{letter2_count}/ig,letter2_count)
                   .replace(/{letter1_count_orig}/ig,letter1_count_orig)
                   .replace(/{letter2_count_orig}/ig,letter2_count_orig)
                   .replace(/{mistake_count}/ig,mistake_count)
                   .replace(/{not_found_count}/ig,not_found_count)
                   .replace(/{minResult}/ig,min)
                   .replace(/{secResult}/ig,sec);
        $("#resultInf").replaceWith(temp); 
        // console.log(temp);
        clearInterval(timerId);
        $("#myModal").modal("show");
    });




});
