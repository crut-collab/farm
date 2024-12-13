'use strict';

$(document).ready(function() {
	$(document).on('change', '#animal-group', function(event) {
		if ($('#quick-calculator-button').prop('disabled')) {
			if ($(this).val()) {
				$("#quick-calculator-button").prop('disabled', false);
			}
		}
		else {
			if (!$(this).val()) {
				$("#quick-calculator-button").prop('disabled', true);
			}
		};
	});
	// Отправка формы краткого калькулятора
	// $(document).on('submit', '#quick-calculator-form', function(event) {
	// 	event.preventDefault();
	// 	$.ajax({
	// 		url: calcURL,
	// 		type: 'GET',
	// 		data: $(this).serialize() + '&action=calculate',
	// 		headers: {
	// 			'X-Server-Token': requestToken
	// 		},
	// 		success: function (response) {
	// 		},
	// 		error: function (xhr, status, error) {
	// 		}
	// 	});
	// });
});