'use strict';

$(document).ready(function(){
	// Функция обработки успешного ajax-запроса
	function handleSuccessResponse(response) {
		if (response.redirect) {
			window.location.href = response.url;
		}
		else {
			$('#profile-form').html(response.form);
			$('#profile-title').text(response.title);
		}
	};
	// Функция обработки проваленного ajax-запроса
	function handleErrorResponse(xhr, status, error) {
		$('#profile-form').html(blockRequestError);
		$('#profile-title').text(titleRequestError);
	};
	// Кнопка профиля
	$("#profile-link").click(function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'GET',
			headers: {
				'X-Server-Token': requestToken
			},
			success: function (response) {
				handleSuccessResponse(response);
				$('#profile').modal('show');
			},
			error: handleErrorResponse
		});
	});
	if (localStorage.getItem('showModal') === 'true') {
		$("#profile-link").click();
		localStorage.removeItem('showModal');
	};
	// Отправка формы входа
	$(document).on('submit', '#profile-login-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'POST',
			data: $(this).serialize() + '&action=login',
			headers: {
				'X-Server-Token': requestToken
			},
			success: handleSuccessResponse,
			error: handleErrorResponse
		});
	});
	// Переход от входа в регистрацию
	$(document).on('click', '#login2register-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'GET',
			data: {
				'action': 'register'
			},
			headers: {
				'X-Server-Token': requestToken
			},
			success: handleSuccessResponse,
			error: handleErrorResponse
		});
	});
	// Отправка формы регистрации
	$(document).on('submit', '#profile-register-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'POST',
			data: $(this).serialize() + `&action=register`,
			headers: {
				'X-Server-Token': requestToken
			},
			success: handleSuccessResponse,
			error: handleErrorResponse
		});
	});
	// Переход от просмотра к редактированию
	$(document).on('click', '#profile-edit-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'GET',
			data: {
				'action': 'edit'
			},
			headers: {
				'X-Server-Token': requestToken
			},
			success: handleSuccessResponse,
			error: handleErrorResponse
		});
	});
	// Отправка формы редактирования
	$(document).on('submit', '#profile-edit-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'POST',
			data: $(this).serialize() + `&action=edit&url=${window.location.href}`,
			headers: {
				'X-Server-Token': requestToken
			},
			success: function (response) {
				localStorage.setItem('showModal', 'true');
				handleSuccessResponse(response);
			},
			error: handleErrorResponse
		});
	});
	// Отправка формы выхода из аккаунта
	$(document).on('submit', '#profile-logout-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: profileURL,
			type: 'POST',
			data: $(this).serialize() + '&action=logout',
			headers: {
				'X-Server-Token': requestToken
			},
			success: handleSuccessResponse,
			error: handleErrorResponse
		});
	});
	// Другое
	// Необходимость согласия с условиями для регистрации
	$(document).on('change', '#terms-to-agree input', function() {
		if ($('#terms-to-agree input').length === $('#terms-to-agree input:checked').length) {
			$('#profile-register-button').removeAttr('disabled');
		}
		else {
			$('#profile-register-button').attr('disabled', '');
		};
	});
});