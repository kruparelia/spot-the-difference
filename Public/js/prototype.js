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
		 
		$("#carousel-spot-the-difference").carousel('pause');
		
		// SWIPE THROUGH TILES
		$("#carousel-spot-the-difference").swipe({ excludedElements:"button, input, select, textarea",
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
        $(this).carousel('next');
		$(this).carousel('pause');
        },
		swipeRight:function(event, direction, distance, duration, fingerCount) {
        $(this).carousel('prev');
		$(this).carousel('pause');
        }
        });
		
		
		
		
	    
		 
    }
	
	 
	
	 
	
     
  };

  return Prototype;

})();


}).call(this);


var MINI = this.MINI = {};
    MINI.version = '0.0.0';
