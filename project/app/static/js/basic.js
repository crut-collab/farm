$(document).ready(function(){
	// переопределение всех иконок
	$('.navbar-nav .nav-item div.menu-item').each(function() {
		$(this).find('span.icon-fill').addClass('d-none');
		$(this).find('span.icon').removeClass('d-none');
	});
	// закрашивание текущей иконки
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
});