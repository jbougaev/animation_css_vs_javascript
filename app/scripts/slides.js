$(document).ready(function () {
    
        //falling letters
        var $fallingLetters = $('#fallingLetters');
        $fallingLetters.lettering(); // wrap <span class="charx"/ > around each character within header
        var $spans = $fallingLetters.find('span');
        var delay = 0;
        var transitionsfired = 0;
        var transitionisrunning = false;
        $fallingLetters.on('transitionend webkitTransitionEnd', function (e) {           
            var $target = $(e.target); // target letter transitionend fired on
            if (/transform/i.test(e.originalEvent.propertyName)) { // check event fired on "transform" prop
                transitionsfired += 1;
                $target.css({ transitionDelay: '2000ms' }); // set transition delay to 0 so when 'dropped' class is removed, letter appears instantly
                if (transitionsfired == $spans.length) { // all transitions on characters have completed?
                    transitionsfired = 0; // reset number of transitions fired
                    delay = 0;
                    $fallingLetters.removeClass('dropped');
                    transitionisrunning = false; // indicate transition has stopped
                }
            }
        });
        $fallingLetters.on('click', function () {
            if (transitionisrunning === false) {
                $spans.each(function () {
                    $(this).css({ transitionDelay: delay + 's' }); // apply sequential trans delay to each character
                    delay += 0.1;
                });
                $fallingLetters.addClass('dropped'); // Add "dropped" class to header to apply transition
                transitionisrunning = true; // indicate transition is running
            }
        });
    
    
        //a ball animation
        $('#container').addClass('animate');
        $('#container').click(function () {
            $('#container').removeClass('animate').delay(10).queue(function (next) {
                $(this).addClass('animate');
                next();
            });
            return false;
        });
    
         //filing divs
//        var globalID;
//            var flag=false;
//            function repeatOften() {
//                var div = document.createElement("div");
//                div.style.position = "absolute";
//                div.style.top = getRandomArbitrary(0, 500) + "px";
//                div.style.left = getRandomArbitrary(0, 250) + "px";
//                div.style.width = getRandomArbitrary(5, 50) + "px";
//                div.style.height = getRandomArbitrary(5, 50) + "px";
//                if( getRandomArbitrary(0, 500)%2===0){
//                div.style.border = "1px solid #FF4447";
//                }else{
//                      div.style.border = "1px solid black";
//                }
//                var container = document.getElementById("frameAnContainer");
//                container.appendChild(div);
//                globalID = requestAnimationFrame(repeatOften);
//                 flag = true;
//            }
//      
//            document.getElementById("frameAnContainer").addEventListener("click", function () {
//                if (!flag) {
//                    flag = true;
//                    globalID = requestAnimationFrame(repeatOften);                   
//                } else {
//                    flag = false;
//                    cancelAnimationFrame(globalID);                    
//                }            
//            });      
//
//            function getRandomArbitrary(min, max) {
//                return Math.floor(Math.random() * (max - min)) + min;
//
//            }  
    
    
   
});