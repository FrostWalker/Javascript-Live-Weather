$(document).ready(function() {
    var canvas = $('#weather_canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var w = 0;
        var h = 0;
        var a = 0;
        var s = 0;

        var particles = [];

        function setup() {
            resize();

            frequency($('#rainfreq').val());
            rotate($('#rainangl').val());
            speed($('#rainspeed').val());

            loop();
        }

        function loop() {
            window.requestAnimationFrame(loop);
            draw();
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for(var i = 0; i < particles.length; ++i) {
                var particle = particles[i];

                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle.x + particle.l * (particle.xs - (90 - a)), particle.y + particle.l * particle.ys);
                ctx.stroke();

                particle.x += (particle.xs - (90 - a));
                particle.y += (particle.ys * 100) / s;
                if(particle.x > w || particle.y > h) {
                    particle.x = Math.random() * w;
                    particle.y = -40 + Math.random() * h;
                }
            }
        }

        function resize() {
            ctx.clearRect(0, 0, w, h);

            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;

            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';

            draw();
        }

        function frequency(count) {
            $('#frequency').text(count);
            if(count < particles.length) {
                particles.splice(count);
            } else if(count > particles.length) {
                for(var i = particles.length; i < count; ++i) {
                    particles.push({
                        x: Math.random() * w,
                        y: Math.random() * h,
                        l: Math.random() * 1,
                        xs: -2 + Math.random() * 4,
                        ys: Math.random() * 10 + 20
                    })
                }
            }
        }

        function rotate(angle) {
            $('#rotation').text(angle);
            a = angle;
        }

        function speed(speed) {
            $('#speed').text(speed);
            s = 200-speed;
        }

        window.ondevicemotion = function(event) {
            var orientation = screen.orientation || window.orientation;
            var x = event.accelerationIncludingGravity.x;
            var y = event.accelerationIncludingGravity.y;

            var angle = 0;
            if(orientation == 90) {
                angle = -y;
                $('#background').css('width', screen.height);
                $('#background').css('height', screen.width);
            } else if(orientation == 180) {
                angle = -x;
                $('#background').css('width', screen.width);
                $('#background').css('height', screen.height);
            } else if(orientation == -90) {
                angle = y;
                $('#background').css('width', screen.height);
                $('#background').css('height', screen.width);
            } else {
                angle = x;
                $('#background').css('width', screen.width);
                $('#background').css('height', screen.height);
            }
            angle *= 4.5;
            angle += 90;


            $('#rainangl').val(angle);
            $('#devorientation').text(orientation);
            $('#xaccel').text(event.accelerationIncludingGravity.x);
            $('#yaccel').text(event.accelerationIncludingGravity.y);
            $('#zaccel').text(event.accelerationIncludingGravity.z);

            $('#devwidth').text(screen.width);
            $('#devheight').text(screen.height);

            rotate(angle);
        }
        
        document.addEventListener("updateWeather", function() {
            resize();

            frequency($('#rainfreq').val());
            rotate($('#rainangl').val());
            speed($('#rainspeed').val());
        }, false);

        $('#rainfreq').on("input", function() {
            frequency($(this).val());
        });

        $('#rainangl').on("input", function() {
            rotate($(this).val());
        });

        $('#rainspeed').on("input", function() {
            speed($(this).val());
        });

        window.onresize = function(event) { resize(); }
        setup();
    }
});