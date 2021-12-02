from django.contrib import admin
from .models import Author, Post, Comment, Like, FriendRequest, Inbox, Node

# Register your models here.
admin.site.register(Author)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(FriendRequest) 
admin.site.register(Inbox)

@admin.action(description="Set selected node(s) to require authentication")
def set_require_auth(modeladmin, request, queryset):
    queryset.update(require_auth=True)

@admin.action(description="Set selected node(s) to not require authentication")
def set_no_require_auth(modeladmin, request, queryset):
    queryset.update(require_auth=False)

class NodeAdmin(admin.ModelAdmin):
    list_display = ['host','require_auth']
    ordering = ['host']
    actions = [set_require_auth, set_no_require_auth]

admin.site.register(Node, NodeAdmin)
