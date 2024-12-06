from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.urls import resolve
from django.conf import settings
from django.contrib.auth import login, logout
from .forms import CreateUserForm, AuthUserForm, ChangeUserForm, ViewUserForm
from django.template.loader import render_to_string


def get_profile_html(request):
	"""
	
	"""
	print(request.user.is_authenticated)
	# проверка токена
	token = request.headers.get('X-Server-Token')
	if token != settings.SECRET_SERVER_TOKEN:
		return HttpResponseForbidden("В доступе отказано!")
	# if request.user.is_authenticated:
	# 	if request.method == "POST":
	# 		pass
	# 	else:
	# 		form, action, title = ViewUserForm(), 'view', 'Профиль'
	# else:
	# 	if request.method == "POST":
	# 		# login, register
	# 		if 'action' in request.POST:
	# 			match request.POST['action']:
	# 				case 'register':
	# 					pass
	# 				case 'login':
	# 					form, action, title = AuthUserForm(request.POST), 'login', 'Ауентификация'
	# 					if form.is_valid():
	# 						user = form.get_user()
	# 						login(request, user)
	# 						return redirect('home')
	# 	else:
	# 		form, action, title = AuthUserForm(), 'login', 'Ауентификация'

	# return JsonResponse({
	# 	'form': render_to_string(
	# 		'profile_form.html', 
	# 		{
	# 			'form': form, 
	# 			'action': action
	# 		}, 
	# 		request=request
	# 	),
	# 	'title': title
	# })


	form = None
	if request.user.is_authenticated:
		# view, edit
		pass
	else:
		# login, register
		if request.method == "POST":
			if 'action' in request.POST:
				match request.POST['action']:
					case 'register':
						pass
					case 'login':
						form, action, title = AuthUserForm(request.POST), 'login', 'Ауентификация'
						if form.is_valid():
							user = form.get_user()
							login(request, user)
							return redirect('home')
		else:
			if 'action' in request.GET and request.GET['action'] == 'register':
				form, action, title = CreateUserForm(), 'register', 'Регистрация'
			else:
				form, action, title = AuthUserForm(), 'login', 'Ауентификация'

	if form is None:
		pass
	return JsonResponse({
		'form': render_to_string(
			'profile_form.html', 
			{
				'form': form, 
				'action': action
			}, 
			request=request
		),
		'title': title
	})

def logout(request):
	if request.user.is_authenticated:
		logout(request)
	return redirect('home')

def home(request):
	first_form = AuthUserForm()
	return render(request, 'home.html', {'testQ': settings.DEBUG})

def about(request):
	return render(request, 'about.html', {'testQ': settings.DEBUG})

def buy(request):
	return HttpResponse("Trying to buy.")
