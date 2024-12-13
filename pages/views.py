from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import login, logout
from .forms import CreateUserForm, AuthUserForm, ChangeUserForm, ViewUserForm
from django.template.loader import render_to_string


def home(request):
	return render(request, 'home.html', {'testQ': settings.DEBUG})

def about(request):
	return render(request, 'about.html', {'testQ': settings.DEBUG, 'headline_title': 'О нас'})

def contacts(request):
	return render(request, 'contacts.html', {'testQ': settings.DEBUG, 'headline_title': 'Контакты'})

def buy(request):
	return HttpResponse("Trying to buy.")

def get_profile_html(request):
	"""
	
	"""
	# проверка токена
	token = request.headers.get('X-Server-Token')
	if token != settings.SECRET_SERVER_TOKEN:
		return HttpResponseForbidden("В доступе отказано!")

	form = None
	if request.user.is_authenticated:
		# view, edit
		if request.method == "POST":
			if 'action' in request.POST :
				match request.POST['action']:
					case 'edit':
						form, action, title = ChangeUserForm(request.POST, instance=request.user), 'edit', 'Редактирование'
						if form.is_valid():
							form.save()
							return JsonResponse({
								'redirect': True,
								'url': request.POST['url']
							})
					case 'logout':
						logout(request)
						return JsonResponse({
							'redirect': True,
							'url': reverse('home')
						})
			else:
				return HttpResponseForbidden("Неизвестный запрос! Проверьте параметры или метод запроса.")
		else:
			if 'action' in request.GET:
				match request.GET['action']:
					case 'view':
						form, action, title = ViewUserForm(instance=request.user), 'view', 'Профиль'
					case 'edit':
						form, action, title = ChangeUserForm(instance=request.user), 'edit', 'Редактирование'
			else:
				form, action, title = ViewUserForm(instance=request.user), 'view', 'Профиль'
	else:
		# login, register
		if request.method == "POST":
			if 'action' in request.POST:
				match request.POST['action']:
					case 'register':
						form, action, title = CreateUserForm(request.POST), 'register', 'Регистрация'
						if form.is_valid():
							user = form.save()
							login(request, user)
							return JsonResponse({
								'redirect': True,
								'url': reverse('home'),
							})
					case 'login':
						form, action, title = AuthUserForm(request.POST), 'login', 'Ауентификация'
						if form.is_valid():
							user = form.get_user()
							login(request, user)
							return JsonResponse({
								'redirect': True,
								'url': reverse('home'),
							})
			else:
				return HttpResponseForbidden("Неизвестный запрос! Проверьте параметры или метод запроса.")
		else:
			if 'action' in request.GET and request.GET['action'] == 'register':
				form, action, title = CreateUserForm(), 'register', 'Регистрация'
			else:
				form, action, title = AuthUserForm(), 'login', 'Ауентификация'

	if form is None:
		pass
	return JsonResponse({
		'form': render_to_string(
			'components/profile_form.html', 
			{
				'form': form, 
				'action': action
			}, 
			request=request
		),
		'title': title
	})

def calculator(request):
	if request.method == "POST":
		pass
	else:
		pass
	return render(request, 'calculator.html', {'testQ': settings.DEBUG})
