/**
 * File Name: carousel.js
 * Author: Nicholas Lin
 * Date: 6/4/20
 * Description: Main javascript for carousels
 */


/**
 * Description: JS for skill carousel
 */
$('.skill-carousel .carousel-item').each(function () {
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});

/**
 * Time parameter for project carousel
 */
$('.project-carousel').carousel({
    interval: 800 * 10
});