import uuid

from .models import Author, Post, Comment, Node
from .converter import sanitize_author_dict, sanitize_post_dict

def update_db(update_authors: bool, update_posts: bool):
    """
    This will update the database with remote authors and posts

    args:
        update_authors - If True will get all the authors from the remote node
        update_posts - If True will get all the posts from the remote node
    
    return
    """
    for node in Node.objects.all():
        # This will add or remove authors on the local db based on the state of the remote node
        if update_authors:
            pass
        # This will add or remove posts on the local db based on the state of the remote node
        if update_posts:
            pass
    # This will update the friend list on our local authors
    if update_authors:
        pass

def update_remote_authors(host: str, auth: str):
    """
    This will make an author API request to the host using auth to get the list of current authors on the remote note and updating our database accordingly

    args:
        host - The host url of the remote server
        auth - The authentication information to send to the server
    
    return
    """
    try:
        url = host + 'authors'
    except Exception as e:
        print("Exception : {}\n\n{}".format(type(e), str(e)))