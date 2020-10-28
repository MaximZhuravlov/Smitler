$(document).ready(function () {
	if ($("#nav").length) {
		new Mmenu("#nav", {
			"extensions": [
				"position-back",
				"position-right",
				"pagedim-black",
				"theme-black"
			],
			navbar: {
				title: '<img src="../app/images/logo.svg" width="125" height="25" alt="Салон красоты в Харькове">'
			}
		});
	}

	$(".services-slider").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: false,
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [
			{
				breakpoint: 1750,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1240,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$("select").selectric();

	$(".reviews-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: false
	});

	$(".partners-slider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: false,
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$(".blog-slider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: false,
		responsive: [
			{
				breakpoint: 1101,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 501,
				settings: {
					slidesToShow: 1
				}
			}
		]
	}).on('setPosition', function (event, slick) {
		slick.$slides.css('height', slick.$slideTrack.height() + 'px');
	});

	$(".secondary-mobile-button").on("click", function () {
		$(".secondary-header-nav-list").slideToggle();
	});

	// Smooth scrolling
	$("#back-to-top").on("click", function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash != "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			$("html, body").animate({
				scrollTop: $(hash).offset().top
			}, 800, function() {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		}
	});

});