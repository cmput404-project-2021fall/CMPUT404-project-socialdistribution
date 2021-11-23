from rest_framework import permissions
from rest_framework.authtoken.models import Token

from .models import Author
import re
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