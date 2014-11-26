;(function () {
	
	'use strict'; 
	
 var SpotTheDifference = MINIStandalone.SpotTheDifference = (function() {
  
	
 function SpotTheDifference() {
	    
	    // class globals 
		this.score = 0;
		this.username = "";
		this.numbFound = 0;
		this.startTime = Date.now();
		this.time = this.startTime;
	  
	    // INIT 
		this.initalize();
  }
  
  
  SpotTheDifference.prototype = {
	  
	/**
	MAIN INIT STATMENT
	*/
	initalize : function () {
		
		// declare scope obj
		var that = this;
		
		
		setInterval(function () {
		    that.time = Math.trunc((Date.now() - that.startTime)/ 1000);
		    $("#time").text(that.time);
		}, 100);
		var gameCarousel = $("#carousel-spot-the-difference");
		$("#carousel-spot-the-difference").carousel('pause');
		
		 
	    // Tile1-> GoButton Handler
		$("#GoButton").click(function () {
		    if ($('#username').val() != "")
		    {
		        that.username = $("#username").val();
		        $("#usernameLabel").text(that.username);
		        $(gameCarousel).carousel('next');
		        $(gameCarousel).carousel('pause');
		        that.startTime = Date.now();
		        $("#points").text(that.score);
		        $("#ui-info").show();
		        $(this).hide();
		    }
		});

	    // Tile2-> Spot Handler
		$(".spot").click(function () {
		    var id = $(this).attr("data-id");
		    if (!$(this).hasClass("found"))
		    {
		        that.numbFound++;
		        $(".spot[data-id='" + id + "']").each(function () {
		            $(this).addClass("found");
		            $(this).css("border", "5px solid white");
		        });
		        that.AddPoints();
		    }
		    if(that.numbFound == 3)
		    {
		        $(gameCarousel).carousel('next');
		        $(gameCarousel).carousel('pause');
		        that.startTime = Date.now();
            }
		});

	    // Tile3-> Quiz Handler
		$("input[name='popquiz1']").click(function () {
		    var correct = $(this).attr("data-correct");
		    if(correct == "true")
		    {
		        that.AddPoints();
		        $(gameCarousel).carousel('next');
		        $(gameCarousel).carousel('pause');
		    }
		    else
		    {
		        $(this).prop('checked', false);
		        that.MinusPoints();
            }
		});

		
    },
	
	/**
	ADD POINTS 
	*/
	AddPoints : function () {
		    if (this.time <= 10)
		        this.score += 10;
		    else if (this.time <= 20)
		        this.score += 5;
		    else if (this.time <= 30)
		        this.score += 3;
		    else 
		        this.score += 1;
		    $("#points").text(this.score);
	},
	
	/**
	REMOVE POINTS 
	*/
	MinusPoints : function () {
		this.score -= 1;
		$("#points").text(this.score);
	}
	
	 
     
  };

  return SpotTheDifference;
})();
 

}).call(this);

 
