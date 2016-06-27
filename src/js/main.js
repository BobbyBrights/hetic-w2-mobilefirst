// DOCUMENT READY //
jQuery(document).ready(function() {
    toggle_burger();
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
