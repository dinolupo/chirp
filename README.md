# Chirp

It's a simple clone of twitter, which has been developed using the [mean](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) fullstack javascript.

An [online demo](http://chirp.dimotta.net) is hosted on Heroku.
Read the [release notes](https://github.com/antdimot/chirp/blob/master/Releasenotes.md)
for the last updates.

### Features:
- public timeline *(http://mywebsite/#/public)*
- user timeline   *(http://mywebsite/#/home)*
- user info       *(http://mywebsite/#/info/myusername)*
- post of a message
- list of the followers
- list of the following
- follow an user
- unfollow an user
- sign up
- log on

### Todo (missing features):
- retweet
- response
- searching (users and messages)
- security management (client/server comunication)
- hashtag
- rest api documentation
- edit user information
- add custom user image

### How to install:
1. Clone the project
2. Install *nodejs*
3. Install *mongodb*
4. Restore *node_modules* using ```npm install```
5. Restore *bower_components* in *wwwroot* using ```bower install```
6. Execute **node main**

### Known issues:
- no check of the username (duplication) when signup
- doesn't encode html on post message
