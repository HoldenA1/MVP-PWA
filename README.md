## MVP PWA
A progressive web app to view and navigate through game videos

### Setup
Required programs:
- [NodeJS](https://github.com/nodejs/node)
- [nginx](https://github.com/nginx/nginx)

Install dependencies for nodejs server:
```
$ npm install cors express mongoose
```
Paste this into the nginx site config file:
```
location /viewer {
  root [repository location]/MVP-PWA;       
  index index.html;
}

location /node-server {
        proxy_pass http://[server ip address]:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
}
```

### How to run
Start the nodejs server:
```
$ node node-server/server.js
```
Start the nginx server:
```
$ sudo service nginx start
```
Visit [localhost/viewer](http://localhost/viewer) in a browser.

### FAQ
```
Q: Why do I need a nodejs server?

A: It is responsible for getting data from the mongodb databse.
```
```
Q: What does nginx do if I already have a nodejs server?

A: Nginx serves the rest of the content while nodejs acts as a backend to request data from the database.
```
