# node-ax8ctz

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/node-ax8ctz)
[Redis Quick Start ⚡️](https://redis.io/topics/quickstart)

## Install Redis

```
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

### copy CLI and server

```
sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/
```

### Run Redis server

```
redis-server
```

### Check Redis is working

```
redis-cli ping
```

you must get PONG
