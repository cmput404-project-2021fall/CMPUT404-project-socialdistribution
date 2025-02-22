import requests
import base64
import re
from urllib.parse import urlparse

from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Author, Node

from social_dist.settings import DJANGO_DEFAULT_HOST 
class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to allow the author of the object to edit it.
    """
    message = "Author is not allowed to do this operation"
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        try:
            # Get the user from the request
            author_id = request.user.author.id
            uri = request.build_absolute_uri()
        except:
            return False
        uuid_pattern_1 = "[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}"
        uuid_pattern_2 = "[A-Za-z0-9]{36}"
        uuid_1 = re.findall(uuid_pattern_1, uri)
        uuid_2 = re.findall(uuid_pattern_2, uri)
        if len(uuid_1) != 0:
            return uuid_1[0] == str(author_id)
        elif len(uuid_2) != 0:
            return uuid_2[0] == str(author_id)
        return False
        # Match the author ID to the URL of the request


def IsLocalAuthor(request):
    try:
        request_uri = request.META['HTTP_REFERER']
        if (DJANGO_DEFAULT_HOST.split('/api/')[0].split("//")[1] in request_uri or "localhost" in request_uri):
            return True
        else:
            return False
    except:
        return False

class IsAuthenticated(permissions.BasePermission):
    """
    Object-level permission to allow an authenticated node to access or edit objects
    """
    def has_permission(self, request, view):
        try:
            request_uri = request.META['HTTP_REFERER']
            if (DJANGO_DEFAULT_HOST.split('/api/')[0].split("//")[1] in request_uri or "localhost" in request_uri):
                if (("PostDetail" not in str(view) ) or (request.method in permissions.SAFE_METHODS)):
                    return True
                try:
                    # Get the user from the request
                    author_id = request.user.author.id
                    uri = request.build_absolute_uri()
                except:
                    return False
                uuid_pattern_1 = "[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}"
                uuid_pattern_2 = "[A-Za-z0-9]{36}"
                uuid_1 = re.findall(uuid_pattern_1, uri)
                uuid_2 = re.findall(uuid_pattern_2, uri)
                if len(uuid_1) != 0:
                    return uuid_1[0] == str(author_id)
                elif len(uuid_2) != 0:
                    return uuid_2[0] == str(author_id)
        except:
            #do nothing
            pass
        try:
            # Check for auth token
            # https://stackoverflow.com/questions/10613315/accessing-request-headers-on-django-python
            basic_auth_field = request.META['HTTP_AUTHORIZATION']
            basic_auth_base64 = basic_auth_field.split("Basic ")[1]
            basic_auth_bytes = base64.b64decode(basic_auth_base64) 
            basic_auth_value = basic_auth_bytes.decode('utf-8')
            # Get the node from the request(will fail if node is not in our database)
            node = Node.objects.get(auth_info=basic_auth_value)
            # if auth token is found return true
            return True
        # If not found check if the remote is allowed to connect without auth?
        except Exception as e:
            print(f"IsAuthenticated.has_permission Exception: {type(e)}\n{str(e)}")
        try:
            # Grab the uri from the remote request
            request_uri = str(request.META['HTTP_REFERER'])
            # Get the hostname of the remote request
            referer_hostname = urlparse(request_uri)
            node = Node.objects.get(host__icontains=referer_hostname.netloc)
            # Check if the node requires auth
            if not node.require_auth:
                return True
        except Exception as e:
            print(f"IsAuthenticated.has_permission Exception: {type(e)}\n{str(e)}")
            return False
        return False