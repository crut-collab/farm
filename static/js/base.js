'use strict';

$(document).ready(function(){
	// все иконки имеют .icon
	$('.navbar-nav .nav-item div.menu-item').each(function() {
		$(this).find('span.icon-fill').addClass('d-none');
		$(this).find('span.icon').removeClass('d-none');
	});
	// текущий пункт меню получит .icon-fill
	$('.navbar-nav .nav-item a').each(function() {
		if (this.href != window.location.href) {
			return;
		};
		let toFill;
		if ($(this).hasClass('sub-menu-item')) {
			toFill = [$(this).find('div.menu-item'), $(this).closest('ul.sub-menu').closest('div.menu-item')];
		}
		else {
			toFill = [$(this).find('div.menu-item')];
		};
		toFill.forEach(function(tag) {
			tag.find('span.icon-fill').removeClass('d-none');
			tag.find('span.icon').addClass('d-none');
		});
		return false;
	});


	const $header = $('header');
	const showNav = "translateY(0%)";
	const closeNav = "translateY(-100%)";
	const headerIndent = 50;
	let prevScrollPos = $(window).scrollTop();
	let isScrollingUp = true;
	let ticking = false;

	// начальная позиция $header
	$header.css('transform', showNav);

	$(window).on('scroll', function() {
		const curScrollPos = $(window).scrollTop();
		// только при изменении
		if (curScrollPos !== prevScrollPos) {
			// оптимизация анимации
			if (!ticking) {
				window.requestAnimationFrame(function() {
					if (curScrollPos < prevScrollPos) {
						// прокрутка вверх
						if (!isScrollingUp) {
							$header.css('transform', showNav);
							isScrollingUp = true;
						}
					} else {
						// прокрутка вниз
						if (isScrollingUp && curScrollPos > headerIndent) {
							$header.css('transform', closeNav);
							isScrollingUp = false;
						}
					}
					prevScrollPos = curScrollPos;
					ticking = false; // событие обработано
				});
				ticking = true;
			};
		};
	});
});