# Chirp

The social engine open source, which has been developed using the [mean](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) fullstack javascript.

An [online demo](http://chirp.westeurope.cloudapp.azure.com) is hosted on Azure.
Read the [release notes](https://github.com/antdimot/chirp/blob/master/Releasenotes.md)
for the last updates.
[Activity board](https://trello.com/b/prRPzzir).

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
- repost (aka retweet)

### Try it now on your workstation with Docker

Clone the project and run the following:

> Run Official Chirp Container with `docker-compose`

```sh
docker-compose up
```

On Linux go to:

[http://localhost:3000](http://localhost:3000)

On OSX/Windows get the IP of the docker machine and browse that server, example:

```sh
% docker-machine ip
192.168.99.100
```

[http://192.168.99.100:3000](http://192.168.99.100:3000)


If you don't have docker compose, you can run manually the mongo and chirp containers in the following order:

> 1. Run Official Mongo Container manually

```sh
docker run --name mongodb -p 27017:27017 -d mongo
```

> 2. Run Official Chirp Container manually

```sh
docker run --name chirp -p 3000:3000 --link mongodb:mongodb dinolupo/chirp
```


### Todo (missing features):
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
5. Execute **node app**

### Known issues:
- no check of the username (duplication) when signup
- doesn't encode html on post message
