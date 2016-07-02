// DOCUMENT READY //
jQuery(document).ready(function() {
    toggle_burger();
    sliding_menu();
    scroll_content();
});

// DOCUMENT LOAD //
jQuery(window).load(function() {

});

// DOCUMENT RESIZE //
jQuery(window).resize(function() {

});

// DOCUMENT SCROLL //
jQuery(window).scroll(function() {

});

function toggle_burger() {
    $('.burger').on('click', function() {
        $('.bars').toggleClass('animate');
    });
}

function sliding_menu() {
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

function scroll_content() {
	$('.page-scroll').click(function(e) {
		e.preventDefault();

		var page = $(this).attr('href');
		var speed = 800; // Durée de l'animation (en ms)
		$('html, body').animate({scrollTop: $(page).offset().top}, speed);
	});
}
