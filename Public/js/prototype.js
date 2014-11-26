;(function () {
	'use strict'; 
var Prototype = MINIStandalone.Prototype = (function() {
  function Prototype() {
	  // INIT 
	  this.initalize();
  }
  Prototype.prototype = {
	initalize : function () {
		var that = this;
		var score = 0;
		var username = "";
		var numbFound = 0;
		var startTime = Date.now();
		var time = startTime;
		setInterval(function () {
		    time = Math.trunc((Date.now() - startTime)/ 1000);
		    $("#time").text(time);
		}, 100);
		var gameCarousel = $("#carousel-spot-the-difference");
		$("#carousel-spot-the-difference").carousel('pause');
		
		// SWIPE THROUGH TILES
		//$("#carousel-spot-the-difference").swipe({
		//    excludedElements: "button, input, select, textarea",
        //    swipeLeft:function(event, direction, distance, duration, fingerCount) {
        //        $(this).carousel('next');
		//        $(this).carousel('pause');
        //    },
		//    swipeRight:function(event, direction, distance, duration, fingerCount) {
        //        $(this).carousel('prev');
		//        $(this).carousel('pause');
        //    }
        //});
		
	    // Tile1-> GoButton Handler
		$("#GoButton").click(function () {
		    if ($('#username').val() != "")
		    {
		        username = $("#username").val();
		        $("#usernameLabel").text(username);
		        $(gameCarousel).carousel('next');
		        $(gameCarousel).carousel('pause');
		        startTime = Date.now();
		        $("#points").text(score);
		        $("#ui-info").show();
		        $(this).hide();
		    }
		});

	    // Tile2-> Spot Handler
		$(".spot").click(function () {
		    var id = $(this).attr("data-id");
		    if (!$(this).hasClass("found"))
		    {
		        numbFound++;
		        $(".spot[data-id='" + id + "']").each(function () {
		            $(this).addClass("found");
		            $(this).css("border", "5px solid white");
		        });
		        AddPoints();
		    }
		    if(numbFound == 3)
		    {
		        $(gameCarousel).carousel('next');
		        $(gameCarousel).carousel('pause');
		        startTime = Date.now();
            }
		});

	    // Tile3-> Quiz Handler
		$("input[name='popquiz1']").click(function () {
		    var correct = $(this).attr("data-correct");
		    if(correct == "true")
		    {
		        AddPoints();
		        $(gameCarousel).carousel('next');
		        $(gameCarousel).carousel('pause');
		    }
		    else
		    {
		        $(this).prop('checked', false);
		        MinusPoints();
            }
		});

		function AddPoints() {
		    if (time <= 10)
		        score += 10;
		    else if (time <= 20)
		        score += 5;
		    else if (time <= 30)
		        score += 3;
		    else 
		        score += 1;
		    $("#points").text(score);
		}
		function MinusPoints() {
		    score -= 1;
		    $("#points").text(score);
		}
    }
	
  
     
  };

  return Prototype;
})();





}).call(this);


var MINI = this.MINI = {};
    MINI.version = '0.0.0';
