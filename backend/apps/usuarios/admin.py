from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Rol, Usuario

admin.site.register(Rol)
admin.site.register(Usuario, UserAdmin)