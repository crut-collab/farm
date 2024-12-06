'use strict';

$(document).ready(function(){
	// Кнопка профиля
	$("#profile-link").click(function(event) {
		event.preventDefault();
		$.ajax({
			url: 'get-profile-html/',
			type: 'GET',
			headers: {
				'X-Server-Token': '1234'
			},
			success: function (response) {
				$('#profile-form').html(response.form);
				$('#profile').modal('show');
				$('#profile-title').text(response.title);
			},
			error: function (response) {
				$('#profile-form').html(blockRequestError);
			}
		});
	});
	// Кнопка входа
	$(document).on('submit', '#profile-login-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'get-profile-html/',
			type: 'POST',
			data: $(this).serialize(),
			headers: {
				'X-Server-Token': '1234'
			},
			success: function (response) {
				$('#profile-form').html(response.form);
				$('#profile-title').text(response.title);
			},
			error: function (response) {
				$('#profile-form').html(blockRequestError);
			}
		});
	});
	// Кнопка регистрации
	$(document).on('click', '#login2register-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'get-profile-html/',
			type: 'GET',
			data: {
				'action': 'register'
			},
			headers: {
				'X-Server-Token': '1234'
			},
			success: function (response) {
				$('#profile-form').html(response.form);
				$('#profile-title').text(response.title);
			},
			error: function (response) {
				$('#profile-form').html(blockRequestError);
			}
		});
	});
	// Подтверждение согласия при регистрации
	$(document).on('change', '#terms-to-agree input', function() {
		if ($('#terms-to-agree input').length === $('#terms-to-agree input:checked').length) {
			$('#profile-register-button').removeAttr('disabled');
		}
		else {
			$('#profile-register-button').attr('disabled', '');
		};
	});
	// Кнопка редактирования
	$(document).on('click', '#profile-edit-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'get-profile-html/',
			type: 'GET',
			data: {
				'action': 'register'
			},
			headers: {
				'X-Server-Token': '1234'
			},
			success: function (response) {
				$('#profile-form').html(response.form);
				$('#profile-title').text(response.title);
			},
			error: function (response) {
				$('#profile-form').html(blockRequestError);
			}
		});
	});
	// Кнопка выхода из аккаунта
	$(document).on('click', '#logout-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'logout/',
			type: 'POST',
			data: {
				'action': 'logout'
			},
			headers: {
				'X-Server-Token': '1234'
			},
			success: function (response) {
			},
			error: function (response) {
			}
		});
	});
});