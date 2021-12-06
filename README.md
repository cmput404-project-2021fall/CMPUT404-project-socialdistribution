# cmput404-project
Current version is deployed and available on:
https://cmput-404-social-distribution.herokuapp.com/#/

Demo Video: https://youtu.be/CE3Me1_tt88

## Setup

> Install the package for backend

```shell
pip install -r requirements.txt
python manage.py migrate
```

> Install the packages for frontend

```
npm install react-bootstrap@next bootstrap@5.1.1 react-router-dom react-router-bootstrap axios react-redux redux-devtools-extension redux-thunk commonmark commonmark-react-renderer
```

> Update frontend before deployment

```
npm run build
```

## Run

If you are running locally make sure that you set `DJANGO_DEFAULT_HOST` to your localhost 

For example, `export DJANGO_DEFAULT_HOST="http://127.0.0.1:8000"`

To deploy the website type the command below in the terminal:
```shell
python manage.py runserver
```

## User Stories Progress

Front - Back end

- :white_check_mark: - :white_check_mark: As an author I want to make public posts.
- :black_square_button: - :white_check_mark: As an author I want to edit public posts.
- :white_check_mark: - :white_check_mark: As an author, posts I create can link to images. (via commonmark)
- :white_check_mark: - :white_check_mark: As an author, posts I create can be images.
- :white_check_mark: - :white_check_mark: As a server admin, images can be hosted on my server.
- :white_check_mark: - :white_check_mark: As an author, posts I create can be private to another author
- :white_check_mark: - :white_check_mark: As an author, posts I create can be private to my friends
- :black_square_button: - :black_square_button: As an author, I can share other author's public posts
- :black_square_button: - :black_square_button: As an author, I can re-share other author's friend posts to my friends
- :white_check_mark: - :white_check_mark: As an author, posts I make can be in simple plain text
- :white_check_mark: - :white_check_mark: As an author, posts I make can be in CommonMark
- :white_check_mark: - :white_check_mark: As an author, I want a consistent identity per server
- :white_check_mark: - :white_check_mark: As a server admin, I want to host multiple authors on my server
- :white_check_mark: - :white_check_mark: As a server admin, I want to share public images with users on other servers.
- :white_check_mark: - :white_check_mark: As an author, I want to pull in my github activity to my "stream"
- :white_check_mark: - :white_check_mark: As an author, I want to post posts to my "stream"
- :white_check_mark: - :white_check_mark: As an author, I want to delete my own public posts.
- :white_check_mark: - :white_check_mark: As an author, I want to befriend local authors
- :white_check_mark: - :white_check_mark: As an author, I want to befriend remote authors
- :white_check_mark: - :white_check_mark: As an author, I want to feel safe about sharing images and posts with my friends -- images shared to friends should only be visible to friends. [public images are public]
- :white_check_mark: - :white_check_mark: As an author, when someone sends me a friends only-post I want to see the likes.
- :white_check_mark: - :white_check_mark: As an author, comments on friend posts are private only to me the original author.
- :white_check_mark: - :white_check_mark: As an author, I want un-befriend local and remote authors
- :white_check_mark: - :white_check_mark: As an author, I want to be able to use my web-browser to manage my profile
- :white_check_mark: - :white_check_mark: As an author, I want to be able to use my web-browser to manage/author my posts
- :white_check_mark: - :white_check_mark: As a server admin, I want to be able add, modify, and remove authors.
- :white_check_mark: - :white_check_mark: As a server admin, I want to OPTIONALLY be able to allow users to sign up but require my OK to finally be on my server
- :black_square_button: - :black_square_button: As a server admin, I don't want to do heavy setup to get the posts of my author's friends.
- :white_check_mark: - :white_check_mark: As a server admin, I want a restful interface for most operations
- :white_check_mark: - :white_check_mark: As an author, other authors cannot modify my public post
- :white_check_mark: - :white_check_mark: As an author, other authors cannot modify my shared to friends post.
- :white_check_mark: - :white_check_mark: As an author, I want to comment on posts that I can access
- :white_check_mark: - :white_check_mark: As an author, I want to like posts that I can access
- :white_check_mark: - :white_check_mark: As an author, my server will know about my friends
- :white_check_mark: - :white_check_mark: As an author, When I befriend someone it follows them, only when the other authors befriends me do I count as a real friend.
- :white_check_mark: - :white_check_mark: As an author, I want to know if I have friend requests.
- :white_check_mark: - :white_check_mark: As an author I should be able to browse the public posts of everyone
- :white_check_mark: - :white_check_mark: As a server admin, I want to be able to add nodes to share with
- :white_check_mark: - :white_check_mark: As a server admin, I want to be able to remove nodes and stop sharing with them.
- :white_check_mark: - :white_check_mark: As a server admin, I can limit nodes connecting to me via authentication.
- :white_check_mark: - :white_check_mark: As a server admin, node to node connections can be authenticated with HTTP Basic Auth
- :white_check_mark: - :white_check_mark: As a server admin, I can disable the node to node interfaces for connections that are not authenticated!
- :black_square_button: - :white_check_mark: As an author, I want to be able to make posts that are unlisted, that are publicly shareable by URI alone (or for embedding images)

## API Documentation

The API documentation is found on the wiki page [here](https://github.com/cmput404-project-2021fall/CMPUT404-project-socialdistribution/wiki)

# Contributors / Licensing

Generally everything is LICENSE'D under the Apache 2 license by Abram Hindle.

All text is licensed under the CC-BY-SA 4.0 http://creativecommons.org/licenses/by-sa/4.0/deed.en_US

Contributors:

- Jihoon Og
- Maristella Jho
- Ivan Zhang
- Dazhi Zhang
- Richard Davidson

# Acknowledgments
This is our collection of references and guides used for the project
## References used
1. Web App General Info: https://www.udemy.com/course/django-with-react-an-ecommerce-website/
2. CSRF Token From Cookies: https://stackoverflow.com/a/50735730
3. CommonMark Rendering on React: https://www.npmjs.com/package/commonmark-react-renderer
4. Creating a signup page: https://simpleisbetterthancomplex.com/tutorial/2017/02/18/how-to-create-user-sign-up-view.html
5. How to use Django Field Choices: https://www.geeksforgeeks.org/how-to-use-django-field-choices/
6. BooleanField: Djqngo models: https://www.geeksforgeeks.org/booleanfield-django-models/
7. Serializing with nested objects: https://www.tomchristie.com/rest-framework-2-docs/api-guide/serializers#dealing-with-nested-objects
8. Class based views in Django: https://www.django-rest-framework.org/tutorial/3-class-based-views/
9. Check if a value exists in related fields https://www.codegrepper.com/code-examples/python/check+if+a+value+exist+in+a+model+Django
10. Setting many to many field of an object https://stackoverflow.com/questions/17826629/how-to-set-value-of-a-manytomany-field-in-django
11. Parse a reponse using json.loads https://stackoverflow.com/questions/16877422/whats-the-best-way-to-parse-a-json-response-from-the-requests-library
12. Adding key,value pair to dictionary https://www.tutorialspoint.com/add-a-key-value-pair-to-dictionary-in-python
13. How to specify headers for testing purposes https://stackoverflow.com/questions/31902901/django-test-client-method-override-header
14. How to change the self.client to make test requests as a specific user https://stackoverflow.com/questions/2619102/djangos-self-client-login-does-not-work-in-unit-tests
