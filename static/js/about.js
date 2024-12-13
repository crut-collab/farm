$(document).ready(function() {
	// function getLuminance(r, g, b) {
	// 	// Формула для вычисления яркости цвета
	// 	const a = [r, g, b].map(function (v) {
	// 		v /= 255;
	// 		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	// 	});
	// 	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722; // Возвращаем яркость
	// };
	// function updateTextColor() {
	// 	$(".text").each(function() {
	// 		 const textElement = $(this);
	// 		// Фоновый цвет элемента
	// 		const bgColor = textElement.css('background-color');
	// 		// Извлекаем значения RGB из цвета фона
	// 		const rgb = bgColor.match(/\d+/g);
	// 		console.log(luminance);
	// 		if (rgb) {
	// 			const r = parseInt(rgb[0]);
	// 			const g = parseInt(rgb[1]);
	// 			const b = parseInt(rgb[2]);
	// 			// Яркость фона
	// 			const luminance = getLuminance(r, g, b);
	// 			if (luminance < 0.5) {
	// 				textElement.css('color', 'white'); // Светлый текст на темном фоне
	// 			} else {
	// 				textElement.css('color', 'black'); // Темный текст на светлом фоне
	// 			}
	// 		}
	// 	});
	// };

	// // Обновляем цвет текста при загрузке страницы и при изменении окна
	// window.onload = updateTextColor;
	// window.onresize = updateTextColor;
});