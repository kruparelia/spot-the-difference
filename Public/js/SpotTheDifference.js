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
		    that.time = Math.trunc((Date.now() - that.startTime) / 1000);
		    if (that.time >= 99) that.time = 99;
		    var ones = 0;
		    var tens = 0;
		    if (that.time >= 10) {
		        ones = String(that.time).charAt(1);
		        tens = String(that.time).charAt(0);
		    }
		    else {
		        ones = String(that.time).charAt(0);
		        tens = 0;
		    }

		    $("#clock-ones").attr("src", "/Public/img/clock-" + ones + ".jpg");
		    $("#clock-tens").attr("src", "/Public/img/clock-" + tens + ".jpg");
		}, 100);
		var gameCarousel = $("#carousel-spot-the-difference");
		$("#carousel-spot-the-difference").carousel('pause');
		
		$("body").keydown(function (e) {
		    if (e.keyCode == 37) { // left
		        $(gameCarousel).carousel('prev');
		    }
		    else if (e.keyCode == 39) { // right
		        $(gameCarousel).carousel('next');
		    }
		});

	    // Intro Screen
		$("#GoButton").click(function () {
		    if ($('#username').val() != "")
		    {
		        that.username = $("#username").val();
		        $("#usernameLabel").text(that.username);
		        $(gameCarousel).carousel('next');
            }
		});
		$("#HowToPlayButton").click(function () {
		    $("#Modal-HowToPlay").modal("show");
		});

	    // Level 1 Intro Screen
		$("#Level1IntroScreen").click(function () {
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartSpotLevel1").modal("show");
        });

	    // Level 1 Spot
		$("#Start-SpotLevel1").click(function () {
		    that.startTime = Date.now();
		    $("#points").text(that.score);
		    $("#ui-info").show();
		    $("#Modal-StartSpotLevel1").modal("hide");
		});
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
		        $("#Modal-EndSpotLevel1").modal("show");
            }
		});
		$("#End-SpotLevel1").click(function () {
		    $("#Modal-EndSpotLevel1").modal("hide");
		    $(gameCarousel).carousel('next');
		    that.startTime = Date.now();
		});

	    // Level 1 Quiz
		$("input[name='popquiz1']").click(function () {
		    var correct = $(this).attr("data-correct");
		    if(correct == "true")
		    {
		        that.AddPoints();
		        $("#Modal-EndQuizLevel1").modal("show");
            }
		    else
		    {
		        $(this).prop('checked', false);
		        that.MinusPoints();
		        $("#Modal-IncorrectQuizLevel1").modal("show");
            }
		});
		$("#End-QuizLevel1").click(function () {
		    $("#Modal-EndQuizLevel1").modal("hide");
		    $(gameCarousel).carousel('next');
		    that.startTime = Date.now();
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

 
