$(function()
{	
			
	var sec = 0;
	var min = 0;
	var timerId;
	var funOnFinish;
	initTimer = function(minPar,secPar,funPar)
	{
		sec = secPar;
		min = minPar;
		funOnFinish = funPar;
	}
	updateTimer = function()
	{
		timerId = setInterval(function() 
		{ 
			if(sec != 0) 
			{
				--sec;
			}
			else if(sec == 0)
			{
				if(min == 0)
				{
					clearInterval(timerId);
					min = 0;
					sec = 0;
					funOnFinish();
				}
				else
				{
					sec = 59;
					--min;
				}
			}
			
			$("#timer").text(min + ":" + sec);
		},1000);
	}
	
	

	
});