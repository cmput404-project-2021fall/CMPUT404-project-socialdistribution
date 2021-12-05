from django.contrib import admin
from .models import Author, Post, Comment, Like, FriendRequest, Inbox, Node

@admin.action(description="Set selected node(s) to require authentication")
def set_require_auth(modeladmin, request, queryset):
    queryset.update(require_auth=True)

@admin.action(description="Set selected node(s) to not require authentication")
def set_no_require_auth(modeladmin, request, queryset):
    queryset.update(require_auth=False)

class AuthorAdmin(admin.ModelAdmin):
    list_display = [Author.__str__, 'host']

class PostAdmin(admin.ModelAdmin):
    list_display = [Post.__str__, 'origin', 'author']
    ordering = ['title']

class CommentAdmin(admin.ModelAdmin):
    ordering = ['id', 'post']

class InboxAdmin(admin.ModelAdmin):
    list_display = ['id']

class NodeAdmin(admin.ModelAdmin):
    list_display = ['host', 'connect', 'require_auth', 'team_name']
    ordering = ['host']
    actions = [set_require_auth, set_no_require_auth]

class LikeAdmin(admin.ModelAdmin):
    list_display = ['author','object']

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['actor', 'object']

# Register your models here.
admin.site.register(Author, AuthorAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(FriendRequest, FriendRequestAdmin) 
admin.site.register(Inbox, InboxAdmin)
admin.site.register(Node, NodeAdmin)
