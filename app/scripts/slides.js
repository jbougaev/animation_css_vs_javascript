
$(document).ready(function () {
        //http://www.javascriptkit.com/dhtmltutors/css3-transitions-and-jquery2.shtml
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
    
    
        //a ball animation http://www.smashingmagazine.com/2011/09/the-guide-to-css-animation-principles-and-examples/
        $('#container').addClass('animate');
        $('#container').click(function () {
            $(this).removeClass('animate').delay(10).queue(function (next) {
                $(this).addClass('animate');
                next();
            });
            return false;
        });
    
    
        //train http://plnkr.co/edit/QKkOvATRaCMQBXSbbCdN?p=preview
        var timer;       
       $("#train").on("click", function(){       
       var start = Date.now();
           var that=this;
         function draw(){
              var timePassed = Date.now() - start;
              that.style.left = timePassed / 5 + 'px';
              if (timePassed > 4500) {
                 clearTimeout(timer);
               }else{         
                 timer = setTimeout(draw, 20);
               }
            }
              draw();       
       });
    
       //snake animation http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        // requestAnim shim layer by Paul Irish
        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();


        // example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
        var canvas, context, toggle;
        init();
        animate();
        function init() {
            canvas = document.createElement( 'canvas' );
            canvas.width = 512;
            canvas.height = 512;
            context = canvas.getContext( '2d' );    
            var el = document.getElementById("animRA");
            el.appendChild( canvas );
        }

        function animate() {
            requestAnimFrame( animate );
            draw();
        }

        function draw() {
            var time = new Date().getTime() * 0.002;
            var x = Math.sin( time ) * 192 + 256;
            var y = Math.cos( time * 0.9 ) * 192 + 256;
            toggle = !toggle;

            context.fillStyle = toggle ? '#FF4447' :  '#5EA8A7';
            context.beginPath();
            context.arc( x, y, 10, 0, Math.PI * 2, true );
            context.closePath();
            context.fill();

        }
    
        //transitionend example
        var defaults = {
                easing: ''
            };

            $.fn.transition = function (properties, options) {
                var $el = $(this);
                options = $.extend({}, defaults, options);
                properties['transition'] = 'all ' + options.duration + 'ms ' + options.easing;

                $el.queue(function () {
                    $el.one('transitionend webkitTransitionEnd', function (e) {
                        $el.dequeue();
                        if (options.complete) options.complete.apply($el);
                    });
                    $el.css(properties);
                });

                return this;
            };
            var flag = false;

            $('.element').on("click", function () {
                if (!flag) {
                    var o = $("#output");
                    $('.element')
                        .transition({ marginLeft: 100 }, {
                            duration: 2000,
                            complete: function () {
                                this.html("<div style='margin:0 auto;vertical-align: middle;text-align: center;font-size: 4.6rem;'>1</div>");
                                o.html("<div style='margin:0 auto;'><b>marginLeft</b> change <font style='font-size:2.5rem; color: #FF4447;'>completed</font></div>");
                            }
                        })
                        .transition({ marginTop: 195, width: 150 }, {
                            duration: 2000,
                            complete: function () {
                                 this.html("<div style='margin:0 auto;vertical-align: middle;text-align: center;font-size: 4.6rem;'>2</div>");
                                o.html(o.html() + "<b>marginTop</b> and <b>width</b> change <font style='font-size:2.5rem; color: #FF4447;'>completed</font>");

                            }
                        });
                    flag = true;

                } else {
                    flag = false;
                    $('.element').css({ marginLeft: 0, marginTop: 0, width: 100 });
                    $("#output").html("");
                    $('.element').html("");
                }
            });
    
    
         //easing functions  //http://javascript.info/tutorial/animation
         function animate1(opts) {
                var start = new Date
                var id = setInterval(function () {
                    var timePassed = new Date - start
                    var progress = timePassed / opts.duration
                    if (progress > 1) progress = 1
                    var delta = opts.delta(progress)
                    opts.step(delta)
                    if (progress == 1) { clearInterval(id) }
                }, opts.delay || 10)
            }
            function elastic(progress) { return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress) }
            function linear(progress) { return progress }
            function quad(progress) { return Math.pow(progress, 2) }
            function quint(progress) { return Math.pow(progress, 5) }
            function circ(progress) { return 1 - Math.sin(Math.acos(progress)) }
            function back(progress) { return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5) }
            function bounce(progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            }
    
          var bowMove = document.querySelector("#bowMove");
           bowMove.addEventListener("click", function(){move(this.children[0], back)});
    
           var elasticMove = document.querySelector("#elasticMove");
           elasticMove.addEventListener("click", function(){move(this.children[0], elastic, 2000)});
    
          var bounceMove = document.querySelector("#bounceMove");
           bounceMove.addEventListener("click", function(){move(this.children[0], bounce, 2000)});
           
           function move(element, delta, duration) {
                var to = 400
                animate1({ delay: 10, duration: duration || 1000, delta: delta, step: function (delta) { element.style.left = to * delta + "px" } })
           }
                      
           var textArea = document.querySelector("#textExample");
           textArea.addEventListener("click", animateText);

          function animateText() {
           //   var textArea = document.querySelector("#textExample");
              var text = textArea.value;
              var to = text.length,
                from = 0;

          animate1({
            duration: 5000,
            delta: bounce,
            step: function(progress) {
              var result = (to - from) * progress + from;
              textArea.value = text.substr(0, Math.ceil(result))
            }
          });
          }

    
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