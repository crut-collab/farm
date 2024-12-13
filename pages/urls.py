from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('about/', views.about, name='about'),
	path('buy/', views.buy, name='buy'),
	path('get-profile-html/', views.get_profile_html, name='profile'),
	path('calculator/', views.calculator, name='calculator'),
	path('contacts/', views.contacts, name='contacts'),
]
