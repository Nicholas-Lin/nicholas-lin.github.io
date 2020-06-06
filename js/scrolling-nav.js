/**
 * File Name: scrolling-nav.js
 * Author: Nicholas Lin
 * Date: 6/4/20
 * Description: Main javascript for scrolling functionality
 */


 /**
 * The following code uses jquery to automatically scroll smoothly to a section when a link is clicked
 */

(function ($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 56)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 56
	});

})(jQuery); // End of use strict

window.addEventListener("scroll", function () {
	var nav = document.getElementById("main-nav");
	nav.classList.toggle("scrolled", window.scrollY > $(window).height() * 0.66);
});

/**
 * The following code is for "active" navbar based on currently viewed section
 * Refer to: https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
 */

var $navigationLinks = $('#navbarResponsive > ul > li > a, #navi > ul > li > a');
var $resumeLinks = $('#navi > ul > li > a, #navi > ul > li > a');

var $sections = $("section, header");
var $resumeSections = $(".page");

var sectionIdTonavigationLink = {};
var resumeSectionIdToresumeLink = {};

$sections.each(function () {
	sectionIdTonavigationLink[$(this).attr('id')] = $('#navbarResponsive > ul > li > a[href=\\#' + $(this).attr('id') + ']');
});

$resumeSections.each(function () {
	resumeSectionIdToresumeLink[$(this).attr('id')] = $('#navi > ul > li > a[href=\\#' + $(this).attr('id') + ']');
});

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
	var lastCall, timeoutId;
	return function () {
		var now = new Date().getTime();
		if (lastCall && now < (lastCall + interval)) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
				fn.call();
			}, interval - (now - lastCall));
		} else {
			// otherwise, we directly call the function 
			lastCall = now;
			fn.call();
		}
	};
}

function getOffset(el) {
	var _x = 0;
	var _y = 0;
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

/**
 * name: highlightNavigation()
 * description: Assigns the "active" class to the currently viewed section for the main nav
 */
function highlightNavigation() {
	// get the current vertical position of the scroll bar
	var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// iterate the sections
	for (var i = $sections.length - 1; i >= 0; i--) {
		var currentSection = $sections[i];
		// get the position of the section
		var sectionTop = getOffset(currentSection).top;

		// if the user has scrolled over the top of the section  
		if (scrollPosition >= sectionTop - 250) {
			// get the section id
			var id = currentSection.id;

			// get the corresponding navigation link
			var $navigationLink = sectionIdTonavigationLink[id];

			// if the link is not active
			if (typeof $navigationLink[0] !== 'undefined') {
				if (!$navigationLink[0].classList.contains('active')) {
					// remove .active class from all the links
					for (i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
					}
					// add .active class to the current link
					$navigationLink[0].className += (' active');
				}
			} else {
				// remove .active class from all the links
				for (i = 0; i < $navigationLinks.length; i++) {
					$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
				}
			}
			// we have found our section, so we return false to exit the each loop
			return false;
		}
	}


}

  
/**
 * name: highlightSideNavigation()
 * description: Assigns the "active" class to the currently viewed section in the side nav
 */
function highlightSideNavigation() {
	// get the current vertical position of the scroll bar
	var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
	// iterate the sections
	for (var i = $resumeSections.length - 1; i >= 0; i--) {
		var currentSection = $resumeSections[i];
		// get the position of the section
		var sectionTop = getOffset(currentSection).top;

		// if the user has scrolled over the top of the section  
		if (scrollPosition >= sectionTop - 250) {
			// get the section id
			var id = currentSection.id;

			// get the corresponding navigation link
			var $navigationLink = resumeSectionIdToresumeLink[id];


			// if the link is not active
			if (typeof $navigationLink[0] !== 'undefined') {
				if (!$navigationLink[0].classList.contains('active')) {
					// remove .active class from all the links
					for (i = 0; i < $resumeLinks.length; i++) {
						$resumeLinks[i].className = $resumeLinks[i].className.replace(/ active/, '');
					}
					// add .active class to the current link
					$navigationLink[0].className += (' active');
				}
			} else {
				// remove .active class from all the links
				for (i = 0; i < $resumeLinks.length; i++) {
					$resumeLinks[i].className = $resumeLinks[i].className.replace(/ active/, '');
				}
			}
			// we have found our section, so we return false to exit the each loop
			return false;
		}
	}
}

window.addEventListener('scroll', throttle(highlightNavigation, 150));
window.addEventListener('scroll', throttle(highlightSideNavigation, 150));


