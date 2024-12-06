from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import authenticate


User = get_user_model()

class CreateUserForm(UserCreationForm):
	email = forms.EmailField(
		required=True, 
		label="Почта", 
		help_text="Введите вашу почту."
	)
	agree_to_terms = forms.BooleanField(
		required=True,
		label="Согласен с условиями",
		help_text="Требуется согласие."
		)

	class Meta:
		model = User
		fields = ('username', 'last_name', 'first_name', 'email', 'password1', 'password2')
		labels = {
			'username': 'Имя пользователя',
			'last_name': 'Фамилия',
			'first_name': 'Имя',
			'password1': 'Пароль',
			'password2': 'Повторите пароль',
		}

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		valid_class = 'is-invalid' if self.non_field_errors() else 'border-primary'

		for field in self.fields:
			self.fields[field].widget.attrs['class'] = 'is-invalid' if self.errors.get(field, []) else valid_class


class AuthUserForm(forms.Form):
	username_or_email = forms.CharField(
		max_length=150, 
		required=True, 
		label="Имя пользователя или почта",
		help_text="Введите почту или имя пользователя, используемые при регистрации."
	)
	password = forms.CharField(
		widget=forms.PasswordInput, 
		required=True, 
		label="Пароль",
		help_text="Введите пароль."
	)

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		valid_class = 'is-invalid' if self.non_field_errors() else 'border-primary'

		for field in self.fields:
			self.fields[field].widget.attrs['class'] = 'is-invalid' if self.errors.get(field, []) else valid_class

	def clean_username_or_email(self):
		username_or_email = self.cleaned_data.get('username_or_email')
		if not username_or_email:
			raise forms.ValidationError("Это поле обязательно для заполнения.")
		if not User.objects.filter(username=username_or_email).exists() and not User.objects.filter(email=username_or_email).exists():
			raise forms.ValidationError("Пользователь с таким именем или почтой не найден.")
		return username_or_email

	def clean_password(self):
		password = self.cleaned_data.get('password')		
		if not password:
			raise forms.ValidationError("Это поле обязательно для заполнения.")
		return password

	def clean(self):
		cleaned_data = super().clean()
		username_or_email = cleaned_data.get("username_or_email")
		password = cleaned_data.get("password")
		# доп. проверка данных
		if username_or_email and password:
			user = authenticate(username=username_or_email, password=password) or authenticate(username=username_or_email, password=password)
			if user is None:
				self.add_error(None, forms.ValidationError("Проверьте введенные данные."))
		return cleaned_data

	def get_user(self):
		try:
			user = User.objects.get(username=self.cleaned_data['username_or_email'], password=self.cleaned_data['password'])
		except User.DoesNotExist:
			try:
				user = User.objects.get(email=self.cleaned_data['username_or_email'], password=self.cleaned_data['password'])
			except User.DoesNotExist:
				user = None
		return user


class ChangeUserForm(UserChangeForm):
	class Meta:
		model = User
		fields = ('username', 'last_name', 'first_name', 'email')
		labels = {
			'username': 'Имя пользователя',
			'last_name': 'Фамилия',
			'first_name': 'Имя',
			'email': 'Почта',
		}

class ViewUserForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ('username', 'last_name', 'first_name', 'email')
		labels = {
			'username': 'Имя пользователя',
			'last_name': 'Фамилия',
			'first_name': 'Имя',
			'email': 'Почта',
		}
