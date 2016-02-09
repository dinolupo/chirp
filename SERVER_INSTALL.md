### Install Chirp on Ubuntu Server 15.10

> [install node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

```sh
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

> [install mongo](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

> start node and exit from ssh

```sh
nohup node main.js > node.log 2>&1 &
```

> Install Fake S3 for development

```sh
sudo apt-get install ruby-full
sudo gem install fakes3
nohup fakes3 -r /mnt/fakes3_root -p 4567 > fakeS3.log 2>&1 &
```


