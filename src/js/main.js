// DOCUMENT READY //
jQuery(document).ready(function() {
    toggle_burger();
    hover_menu();
    scroll_content();
    open_reservation();
    sliding_menu();
    scroll_to_top();
});

function toggle_burger() {
    $('.burger').on('click', function() {
        $('.bars').toggleClass('animate');
    });
}

function hover_menu() {
    if ($(window).width() > 768) {
        $('.header--menu').each(function(i) {
            var menu = $(this);
            menu.find('li a').hover(function() {
                var that = $(this);
                var leftPosition = that.position().left;
                var widthElement = that.outerWidth()/2;
                var hrWidth = $('.header--menu hr').width()/2;

                menu.find('hr').stop();
                menu.find('hr').css({
                    'display' : 'block'
                });
                menu.find('hr').animate({
                    'left' : (leftPosition + widthElement - hrWidth) + 'px'
                }, 400, 'easeOutBack');
            }, function() {});

            menu.mouseleave(function(e) {
                var that = menu.find('li.active a');

                if(that.size() > 0) {
                    var leftPosition = that.position().left;
                    var widthElement = that.outerWidth()/2;
                    var hrWidth = menu.find('hr').width()/2;
                    menu.find('hr').stop();
                    menu.find('hr').css({
                        'display' : 'block',
                        'left' : (leftPosition + widthElement - hrWidth) + 'px'
                    });
                }
                else menu.find('hr').css({
                    'display' : 'none'
                });
            });
        });
    }
}

function scroll_content() {
	$('.page-scroll').click(function(e) {
		e.preventDefault();

		var page = $(this).attr('href');
		var speed = 800; // Durée de l'animation (en ms)
		$('html, body').animate({scrollTop: $(page).offset().top}, speed);
	});
}

function open_reservation() {
    $('.popin-resa').click(function(e) {
        e.preventDefault();
        var $this = $('.reservation');
        if ($this.hasClass('open')) {
            $this.removeClass('open show');
            $('html').css('overflow', 'auto');
        } else {
            $this.addClass('open show');
            $('html').css('overflow', 'hidden');
        }
    });
}

function sliding_menu() {
    $('.open-menu').click(function(e) {
        e.preventDefault();
        var $this = $('.header--nav');
        if ($this.hasClass('slide')) {
            $this.animate({
                left: '-100%'
            }, 500).removeClass('slide');
            $('html').css('overflow', 'auto');
        } else {
            $this.animate({
                left: '0px'
            }, 500).addClass('slide');
            $('html').css('overflow', 'hidden');
        }
    });
}

function scroll_to_top() {
    if ($(window).width() > 480) {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 1500) {
                $('.scroll-top').fadeIn(800);
            } else {
                $('.scroll-top').fadeOut(800);
            }
        });
        $('.scroll-top').click(function(){
            $('html, body').animate({scrollTop : 0}, 800);
            return false;
        });
    }
}
