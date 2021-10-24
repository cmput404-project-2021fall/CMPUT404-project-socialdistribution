from django.urls import include, path
from django.conf.urls import url, include
from django.contrib.auth import views as auth_views

from rest_framework import routers

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),

    # The endpoint for singing up
    path('signup/', views.signup, name="signup"),
    path('admin-approval/', views.admin_approval, name='admin-approval'),
    path('login/', auth_views.LoginView.as_view(template_name="login.html"), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name="logout.html"), name='logout'),

    # The endpoint after login in that wil redirect to the author's homepage
    path("author/", views.home, name="home"),
    # The endpoint for viewing the authors list
    path("authors/", views.authors_list_api, name="author-list"),
    # The endpoint for viewing and updating a single author
    path("author/<str:author_id>/", views.AuthorDetail.as_view(), name="author-detail"),

    # The endpoints for CRUD operations on followers
    path("author/<str:author_id>/followers", views.FollowerDetail.as_view(), name="author-followers"),
    path("author/<str:author_id>/followers/<str:foreign_author_id>", views.FollowerDetail.as_view(), name="follower-detail"),

    # The endpoints for CRUD operations on posts
    path("author/<str:author_id>/posts", views.PostDetail.as_view(), name="author-posts"),
    path("author/<str:author_id>/posts/<str:post_id>", views.PostDetail.as_view(), name="post-detail"),

    # The endpoint for viewing and updating comments
    path("author/<str:author_id>/posts/<str:post_id>/comments", views.CommentDetail.as_view(), name="author-post-comment"),
    path("author/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>", views.CommentDetail.as_view(), name="comment-detail"),

    # The endpoint for viewing Liked posts and comments
    path("author/<str:author_id>/liked", views.LikedDetail.as_view(), name="author-liked"),
]
