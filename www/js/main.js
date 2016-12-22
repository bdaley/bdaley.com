/**
*	Hendrie (HTML)
*	Copyright © Hendrie by beshleyua. All Rights Reserved.
**/

$(function () {
	'use strict';
	
	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height': height});
	
	/* Preloader */
	$(window).on('load', function() {
		var preload = $('.preloader');
		preload.find('.spinner').fadeOut(function(){
			preload.fadeOut();
			$('body').addClass('ready');
		});
	});

	/* Fade animations on scroll */
	if (width > 720) {
		window.sr = ScrollReveal();
		sr.reveal('.animated');
	}

	/* Typed subtitle */
	$('.typed-title').typed({
		stringsElement: $('.typing-title'),
		backDelay: 5000,
		typeSpeed: 0,
		loop: true
	});

	/* Youtube video background */
	var video_bg = $("#video-bg");
	var myPlayer = video_bg.YTPlayer();

	/* Pause/Play video on scroll */
	if (video_bg.length) {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() >= height-10) {
				video_bg.YTPPause();
			}
			if ($(this).scrollTop() <= height-10) {
				video_bg.YTPPlay();
			}
		});
	}

	/* Youtube Video Mobile */
	if ($(window).width() < 720 & video_bg.length) {
		$('.mbYTP_wrapper').hide();
	}	
	
	$(window).on('scroll', function(){
		/* Smoothscroll */
		var scrollPos = $(window).scrollTop();
		$('.top-menu ul li a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.offset().top <= scrollPos) {
				$(this).closest('.top-menu').find('li').removeClass("active");
				currLink.closest('li').addClass("active");
			}
		});
		
		/* Hide mouse button on scroll */
		if ($(this).scrollTop() >= height-10) {
			$('.mouse-btn').fadeOut();
		}
		if ($(this).scrollTop() <= height-10) {
			$('.mouse-btn').fadeIn();
		}
		if ($(this).scrollTop() <= height-10) {
			$('.top-menu ul li').removeClass("active");
		}
		
		/* Fixed Menu */
		if($(window).scrollTop() > 10) {
			$('header').addClass('filled');
		} else {
			$('header').removeClass('filled');
		}
	});

	/* Top Menu */
	$('.top-menu ul li a').on('click', function(){
		var id = $(this).attr('href');
		var h = parseFloat($(id).offset().top);
		
		$('body,html').animate({
			scrollTop: h + 10
		}, 800);
		
		return false;
	});

	/* Open Top Menu */
	$('.page').on('click', '.menu-btn', function(){
		var top_menu = $('.top-menu');
		if(top_menu.hasClass('active')){
			top_menu.removeClass('active');
			$(this).removeClass('active');
		} else {
			top_menu.addClass('active');
			$(this).addClass('active');
		}

		return false;
	});
	
	/* On click mouse button, page scroll down */
	$('.section').on('click', '.mouse-btn', function() {
		$('body,html').animate({
			scrollTop: height
		}, 800);
	});

	/* Menu filled */
	if($(window).scrollTop() > 10) {
		$('header').addClass('filled');
	} else {
		$('header').removeClass('filled');
	}

	/* Initialize masonry items */
	var $container = $('.box-items');
	
	$container.imagesLoaded(function() {
		$container.multipleFilterMasonry({
			itemSelector: '.box-item',
			filtersGroupSelector: '.filters',
			percentPosition: true,
			gutter: 0
		});
	});

	/* 12. Initialize masonry filter */
	$('.filters label').on('change', 'input[type="radio"]', function() {
		if ($(this).is(':checked')) {
			$('.f_btn').removeClass('active');
			$(this).closest('.f_btn').addClass('active');
		}
		/* Refresh Portfolio magnific popup */
		$('.has-popup').magnificPopup({
			type: 'inline',
			overflowY: 'auto',
			closeBtnInside: true,
			mainClass: 'mfp-fade'
		});
	});

	/* Portfolio magnific popup */
	$('.has-popup').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});
	
	/* Validate contact form */
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			tel: {
				required: true
			},
			message: {
				required: true
			},
			subject: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&tel='+ $("#cform").find('input[name="tel"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&subject='+ $("#cform").find('input[name="subject"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {
				
				},
				complete: function() {
				
				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});

});