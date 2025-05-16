from django.urls import path, include
from .import views
from accounts import views as AccountViews



urlpatterns = [
      
    path('',AccountViews.vendorDashboard,name='vendor'),
    path('profile/',views.vprofile,name='vprofile'),
    path('menu-builder/',views.menu_builder,name='menu_builder'),
    path('menu-builder/category/<int:pk>/ ',views.fooditems_by_category,name='fooditems_by_category'),
    
    
    #Curd
    path('menu-builder/category/add/', views.add_Category,name='add_category'),
    path('menu-builder/category/edit/<int:pk>', views.edit_Category,name='edit_category'),
    path('menu-builder/category/delete/<int:pk>/ ',views.delete_category,name='delete_category'),

] 

 