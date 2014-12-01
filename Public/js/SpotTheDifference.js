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

		    $("#clock-ones").attr("src", "/Public/img/clock-" + ones + ".jpg");
		    $("#clock-tens").attr("src", "/Public/img/clock-" + tens + ".jpg");
		}, 100);
		var gameCarousel = $("#carousel-spot-the-difference");
		$("#carousel-spot-the-difference").carousel('pause');
		
		//$("body").keydown(function (e) {
		//    if (e.keyCode == 37) { // left
		//        $(gameCarousel).carousel('prev');
		//    }
		//    else if (e.keyCode == 39) { // right
		//        $(gameCarousel).carousel('next');
		//    }
		//});

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
		    $("body").append("<img class='xmark' src='/Public/img/x-mark.png' style='position:absolute; top:" + y + "px; left:" + x + "px;' />");
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
		        $(".level").text("1");
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
		    $("#Modal-StartQuizLevel1").modal("show");
		    $(".level").text("QUIZ");
		});

	    // Level 1 Quiz
		$("#Start-QuizLevel1").click(function () {
		    that.startTime = Date.now();
		    $("#Modal-StartQuizLevel1").modal("hide");
		    that.incorrectFunction = function () { $("#Modal-IncorrectQuizLevel1").modal("show"); };
		    that.finishFunction = function () { $("#Modal-EndQuizLevel1").modal("show"); };
		});
		$("#End-QuizLevel1").click(function () {
		    $("#Modal-EndQuizLevel1").modal("hide");
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartBonusLevel1").modal("show");
		    $(".level").text("BONUS");
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
		    $(".level").text("2");
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
		    $("#Modal-StartBonusLevel2").modal("show");
		    $(".level").text("BONUS");
		});
	    // Level 2 Bonus
		$("#Start-BonusLevel2").click(function () {
		    that.startTime = Date.now();
		    $("#Modal-StartBonusLevel2").modal("hide");
		    that.numbFound = 0;
		    that.toBeFound = 1;
		    that.finishFunction = function () { $("#Modal-EndBonusLevel2").modal("show"); };
		});
		$("#End-BonusLevel2").click(function () {
		    $("#Modal-EndBonusLevel2").modal("hide");
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartQuizLevel2").modal("show");
		    $(".level").text("QUIZ");
		});
	    // Level 2 Quiz
		$("#Start-QuizLevel2").click(function () {
		    that.startTime = Date.now();
		    $("#Modal-StartQuizLevel2").modal("hide");
		    that.incorrectFunction = function () { $("#Modal-IncorrectQuizLevel2").modal("show"); };
		    that.finishFunction = function () { $("#Modal-EndQuizLevel2").modal("show"); };
		});
		$("#End-QuizLevel2").click(function () {
		    $("#Modal-EndQuizLevel2").modal("hide");
		    $(gameCarousel).carousel('next');
		    $(".level").text("3");
		});

	    // Level 3 Intro Screen
		$("#Level3IntroScreen").click(function () {
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartSpotLevel3").modal("show");
		});
	    // Level 3 Spot
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
		    $("#Modal-StartBonus1Level3").modal("show");
		    $(".level").text("BONUS");
		});
	    // Level 3 Bonus 1
		$("#Start-Bonus1Level3").click(function () {
		    $("#Modal-StartBonus1Level3").modal("hide");
		    that.startTime = Date.now();
		    that.numbFound = 0;
		    that.toBeFound = 1;
		    that.finishFunction = function () { $("#Modal-EndBonus1Level3").modal("show"); };
		});
		$("#End-Bonus1Level3").click(function () {
		    $("#Modal-EndBonus1Level3").modal("hide");
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartBonus2Level3").modal("show");
		});
	    // Level 3 Bonus 2
		$("#Start-Bonus2Level3").click(function () {
		    $("#Modal-StartBonus2Level3").modal("hide");
		    that.startTime = Date.now();
		    that.numbFound = 0;
		    that.toBeFound = 1;
		    that.finishFunction = function () { $("#Modal-EndBonus2Level3").modal("show"); };
		});
		$("#End-Bonus2Level3").click(function () {
		    $("#Modal-EndBonus2Level3").modal("hide");
		    $(gameCarousel).carousel('next');
		    $("#Modal-StartQuizLevel3").modal("show");
		    $(".level").text("FINAL QUIZ");
		});
	    // Level 3 Quiz
		$("#Start-QuizLevel3").click(function () {
		    that.startTime = Date.now();
		    $("#Modal-StartQuizLevel3").modal("hide");
		    that.incorrectFunction = function () { $("#Modal-IncorrectQuizLevel3").modal("show"); };
		    that.finishFunction = function () { $("#Modal-EndQuizLevel3").modal("show"); };
		});
		$("#End-QuizLevel3").click(function () {
		    $("#Modal-EndQuizLevel3").modal("hide");
		    $(gameCarousel).carousel('next');
		    $(".username").text(that.username);
		    $(".user-score").text(that.score);
		    $("#player-ui").hide();
		});
	    // Summary Page
		$("#SubmitToLeaderboard").click(function () {
		    var initialText = $(this).text();
		    $(this).text("Loading");
		    $(this).prop("disabled", true);
		    $.ajax({
		        url: "http://php.richmondday.com/mini.ca/spot-the-difference-api/Save.php?User=" + that.username + "&Score=" + that.score, type: "POST",
		        success: function () {
		            that.GetLeaderboardData();
		            $(gameCarousel).carousel('next');
		        },
		        error: function (jqXHR, textStatus, errorThrown) {
		            //alert(jqXHR.responseText + ": " + textStatus + ". " + errorThrown);
		            $(this).prop("disabled", false);
		            $(this).text(initialText);
		        }
		    });
		});
		$("#SkipAhead").click(function () {
		    that.GetLeaderboardData();
		    $(gameCarousel).carousel('next');
		});
        // Leaderboards
		$("#LB-Next").click(function () {
		    $(gameCarousel).carousel('next');
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
	},
	
	/**
	GET LEADERBOARD DATA
	*/
	GetLeaderboardData : function () {
	    var html = "";
	    html += "<tr class= 'player-standings'>";
	    html += "<td class='tb-rank' colspan='3'>Loading Data...</td>";
	    html += "</tr>";
	    $("#lbTable tr:not(#lbHeaderRow)").remove();
	    $("#lbHeaderRow").after(html);
	    html = "";
	    $.getJSON("http://php.richmondday.com/mini.ca/spot-the-difference-api/api/api.php?action=get_top_10")
          .done(function (json) {
              var leaderboardData = json;
              if (leaderboardData.length == 0) {
                  html += "<tr class= 'player-standings'>";
                  html += "<td class='tb-rank' colspan='3'>No data.</td>";
                  html += "</tr>";
              }
              else {
                  $.each(leaderboardData, function (key, value) {
                      html += "<tr class= 'player-standings'>";
                      html += "<td class='tb-rank'>" + (key + 1) + ".</td>";
                      html += "<td class='tb-username'>" + value.User + "</td>";
                      html += "<td class='tb-pts'>" + value.Score + "</td>";
                      html += "</tr>";
                  });
              }
              $("#lbTable tr:not(#lbHeaderRow)").remove();
              $("#lbHeaderRow").after(html);
          })
          .fail(function (jqxhr, textStatus, error) {
              var err = textStatus + ", " + error;
              html += "<tr class= 'player-standings'>";
              html += "<td class='tb-rank' colspan='3'>Error occurred.</td>";
              html += "</tr>";
              $("#lbTable tr:not(#lbHeaderRow)").remove();
              $("#lbHeaderRow").after(html);
        });
	}
	 
     
  };

  return SpotTheDifference;
})();
 

}).call(this);

 
