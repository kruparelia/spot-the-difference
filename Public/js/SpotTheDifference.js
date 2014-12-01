;(function () {
	
	'use strict'; 
	
 var SpotTheDifference = MINIStandalone.SpotTheDifference = (function() {
  
	
 function SpotTheDifference() {
	    
	    // class globals 
		this.score = 0;
		this.username = "";
		this.numbFound = 0;
		this.toBeFound = 10;
		this.startTime = Date.now();
		this.time = this.startTime;
		this.finishFunction = function () { };
		this.incorrectFunction = function () { };
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

		    $("#clock-ones").attr("src", "Public/img/clock-" + ones + ".jpg");
		    $("#clock-tens").attr("src", "Public/img/clock-" + tens + ".jpg");
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

		$(".spot").click(function () {
		    var id = $(this).attr("data-id");
		    if (!$(this).hasClass("found")) {
		        that.numbFound++;
		        $(".spot[data-id='" + id + "']").each(function () {
		            $(this).addClass("found");
		            $(this).css("border", "5px solid white");
		        });
		        that.AddPoints();
		    }
		    if (that.numbFound == that.toBeFound) {
		        that.finishFunction();
		    }
		});
		$(".spot-level").click(function (e) {
		    var x = e.pageX - 24;
		    var y = e.pageY - 24;
		    $("body").append("<img class='xmark' src='Public/img/x-mark.png' style='position:absolute; top:" + y + "px; left:" + x + "px;' />");
		    setTimeout(function () { $(".xmark").remove(); }, 500);
		    that.MinusPoints();
		});
		$("input[name='popquizchoice']").click(function () {
		    var correct = $(this).attr("data-correct");
		    if (correct == "true") {
		        that.AddPoints();
		        that.finishFunction();
            }
		    else {
		        $(this).prop('checked', false);
		        that.MinusPoints();
		        that.incorrectFunction();
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
		    that.numbFound = 0;
		    that.toBeFound = 3;
		    that.finishFunction = function () { $("#Modal-EndSpotLevel1").modal("show"); };
		});
		$("#End-SpotLevel1").click(function () {
		    $("#Modal-EndSpotLevel1").modal("hide");
		    $(gameCarousel).carousel('next');
		    that.startTime = Date.now();
		    $("#Modal-StartQuizLevel1").modal("show");
		});

	    // Level 1 Quiz
		$("#Start-QuizLevel1").click(function () {
		    $("#Modal-StartQuizLevel1").modal("hide");
		    that.incorrectFunction = function () { $("#Modal-IncorrectQuizLevel1").modal("show"); };
		    that.finishFunction = function () { $("#Modal-EndQuizLevel1").modal("show"); };
		});
		$("#End-QuizLevel1").click(function () {
		    $("#Modal-EndQuizLevel1").modal("hide");
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartBonusLevel1").modal("show");
		});

	    // Level 1 Bonus
		$("#Start-BonusLevel1").click(function () {
		    $("#Modal-StartBonusLevel1").modal("hide");
		    that.startTime = Date.now();
		    that.numbFound = 0;
		    that.toBeFound = 1;
		    that.finishFunction = function () { $("#Modal-EndBonusLevel1").modal("show"); };
		});
		$("#End-BonusLevel1").click(function () {
		    $("#Modal-EndBonusLevel1").modal("hide");
		    $(gameCarousel).carousel('next');
		});

	    // Level 2 Intro Screen
		$("#Level2IntroScreen").click(function () {
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartSpotLevel2").modal("show");
		});
	    // Level 2 Spot
		$("#Start-SpotLevel2").click(function () {
		    that.startTime = Date.now();
		    $("#points").text(that.score);
		    $("#ui-info").show();
		    $("#Modal-StartSpotLevel2").modal("hide");
		    that.numbFound = 0;
		    that.toBeFound = 5;
		    that.finishFunction = function () { $("#Modal-EndSpotLevel2").modal("show"); };
		});
		$("#End-SpotLevel2").click(function () {
		    $("#Modal-EndSpotLevel2").modal("hide");
		    $(gameCarousel).carousel('next');
		    that.startTime = Date.now();
		    $("#Modal-StartBonusLevel2").modal("show");
		});
	    // Level 2 Bonus
		$("#Start-BonusLevel2").click(function () {
		    $("#Modal-StartBonusLevel2").modal("hide");
		    that.startTime = Date.now();
		    that.numbFound = 0;
		    that.toBeFound = 1;
		    that.finishFunction = function () { $("#Modal-EndBonusLevel2").modal("show"); };
		});
		$("#End-BonusLevel2").click(function () {
		    $("#Modal-EndBonusLevel2").modal("hide");
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartQuizLevel2").modal("show");
		});
	    // Level 2 Quiz
		$("#Start-QuizLevel2").click(function () {
		    $("#Modal-StartQuizLevel2").modal("hide");
		    that.incorrectFunction = function () { $("#Modal-IncorrectQuizLevel2").modal("show"); };
		    that.finishFunction = function () { $("#Modal-EndQuizLevel2").modal("show"); };
		});
		$("#End-QuizLevel2").click(function () {
		    $("#Modal-EndQuizLevel2").modal("hide");
		    $(gameCarousel).carousel('next');
		});

	    // Level 3 Intro Screen
		$("#Level3IntroScreen").click(function () {
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartSpotLevel3").modal("show");
		});
	    // Level 2 Spot
		$("#Start-SpotLevel3").click(function () {
		    that.startTime = Date.now();
		    $("#points").text(that.score);
		    $("#ui-info").show();
		    $("#Modal-StartSpotLevel3").modal("hide");
		    that.numbFound = 0;
		    that.toBeFound = 5;
		    that.finishFunction = function () { $("#Modal-EndSpotLevel3").modal("show"); };
		});
		$("#End-SpotLevel3").click(function () {
		    $("#Modal-EndSpotLevel3").modal("hide");
		    $(gameCarousel).carousel('next');
		    that.startTime = Date.now();
		   // $("#Modal-StartBonusLevel3").modal("show");
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

 
