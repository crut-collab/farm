'use strict';

const requestToken = '1234';
const profileURL = 'get-profile-html/';
const calcURL = 'calculator/';
const blockRequestError = `
	<div class="container text-center">
		<p>
			Проблема с получением данных,<br>повторите попытку позже.
		</p>
	</div>
`;
const titleRequestError = 'Ошибка';
// const profileRegisterTitle = 'Регистрация';
// const profileLoginTitle = 'Вход';
// const profileViewTitle = 'Профиль';
// const profileEditTitle = 'Редактирование';