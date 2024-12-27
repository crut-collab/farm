'use strict';

function base_data() {
	return {
		currentPage: 'home',
		mainQ: false,
		no_headline: true,
		title: 'Мобильная ферма',
		headline_title: '',
		init() {
			this.loadPage(this.currentPage);
		},
		loadPage(page) {
			this.currentPage = page;
			$.ajax({
				url: urlPATH[page],
				method: "GET",
				headers: {
					'GetContent': 'variables',
				},
				success: (response) => {
					this.mainQ = page === 'home';
					this.no_headline = page === 'operations';
					this.title = response.title;
					this.headline_title = response.headline_title;
					window.history.pushState({}, '', urlPATH[page]);
					initDocument();
				},
				error: (xhr, status, error) => {
					this.mainQ = false;
					this.no_headline = true;
					this.title = 'Ошибка загрузки';
					this.content = blockRequestError;
				}
			});
		}
	}
};
function header_data() {
	return {
		scrollPosition: 0,
		isScrollingUp: true,
		ticking: false,
		init() {
		},
		updateMenu() {
			if (window.scrollY !== this.scrollPosition) {
				if (!this.ticking) {
					window.requestAnimationFrame(() => {
						if (window.scrollY < this.scrollPosition) {
							// Up
							if (!this.isScrollingUp) {
								$('header').css('transform', showNav);
								this.isScrollingUp = true;
							}
						} else {
							// Down
							if (this.isScrollingUp && window.scrollY > headerIndent) {
								$('header').css('transform', closeNav);
								this.isScrollingUp = false;
							}
						}
						this.scrollPosition = window.scrollY;
						this.ticking = false;
					});
					this.ticking = true;
				};
			};
		}
	}
};
function quick_calculator_data() {
	return {
		selectedValue: '',
		init() {
			$('#animal-group').selectpicker();
		}
	}
};
function footer_data() {
	return {
		goHome() {
			if(window.location.pathname === '/') {
				$(document).scrollTop(0);
				return true;
			}
		}
	}
};