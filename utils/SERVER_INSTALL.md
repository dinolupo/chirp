### Install Chirp on Ubuntu Server 15.10

#### update ubuntu server with missing packages

```sh
sudo apt-get -y install make gcc g++
```

#### [install node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

```sh
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### [install mongo](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo update-rc.d mongodb defaults
```

#### (optional) nodemon install for development
 
```sh
sudo npm install -g nodemon
```

#### Install Fake S3 for development

```sh
sudo apt-get install ruby-full
sudo gem install fakes3
```

#### Autorun chirp on server startup

- create `/etc/init/chirp.conf` file with the following content:

```sh
description "node.js chirp server"
author      "Dino Lupo"

start on started mongodb
stop on shutdown

# automatically respawn

respawn
respawn limit 99 5

script

    export HOME="/home/dimolup"
    chdir /home/dimolup/chirp
    exec /usr/bin/node main.js >> /var/log/chirp.log 2>&1

end script

post-start script

   # optionally put a script here that will notifiy you node has (re)started
   # /root/bin/hoptoad.sh "node.js has started!"

end script
```

- you can start and stop the service with

```sh
sudo start chirp
sudo stop chirp
```

#### Autorun FakeS3 on server startup

- create directory for S3 buckets and data

```sh
mkdir -p /home/dimolup/fakeS3data
```

- create `/etc/init/fakeS3.conf` file with the following content:

```sh
description "fakeS3 server"
author      "Dino Lupo"

start on filesystem or runlevel [2345]
stop on shutdown

# automatically respawn

respawn
respawn limit 50 10

script

    export HOME="/home/dimolup"
    chdir /home/dimolup
    exec fakes3 -r /home/dimolup/fakeS3data -p 4567 >> /var/log/fakeS3.log 2>&1

end script

post-start script

   # optionally put a script here that will notifiy you node has (re)started
   # /root/bin/hoptoad.sh "fakeS3 has started!"

end script
```

- you can start and stop the service with

```sh
sudo start fakeS3
sudo stop fakeS3
```


### Appendix A - some useful commands

> start node and exit from ssh

```sh
nohup node main.js > node.log 2>&1 &
```

> start fake s3 and exit from ssh

```sh
nohup fakes3 -r /mnt/fakes3_root -p 4567 > fakeS3.log 2>&1 &
```

### Appendix B: Docker

> Run Official Chirp Container with `docker-compose`

```sh
docker-compose up
```

> Run Official Mongo Container manually 

```sh
docker run --name mongodb -p 27017:27017 -d mongo
```

> Run Official Chirp Container manually

```sh
docker run --name chirp -p 3000:3000 --link mongodb:mongodb dinolupo/chirp
```

> stop and remove running containers (this will not delete data volumes) 

```sh
docker rm -f chirp
```

> Build Docker Chirp Image

```sh
docker build -t dinolup/chirp .
```

