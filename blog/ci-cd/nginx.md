# nginx

## 常用命令

```sh
# 检查配置文件是否有错误
nginx -t
# 启动
start nginx
# 快速停止
nginx -s stop
# 正常停止
nginx -s quit
# 重启
nginx -s reload
```

## 常用配置

nginx.conf

```nginx
http: {
  server {
    # 端口
    listen       80;
    # 域名
    # localhost
    server_name  localhost;

    # 根路径部署spa
    location / {
      root D:\personProject\vue2\dist;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    # api 反向代理
    location /api {
      proxy_pass https://api.leibo.group/api;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 子路径部署spa

    location /vue3 {
      alias D:/personProject/vue3/dist;
      index  index.html index.htm;
      try_files $uri $uri/ /vue3/index.html;
    }

    location /react {
      alias D:/personProject/react18/build;
      index  index.html index.htm;
      try_files $uri $uri/ /react/index.html;
    }

    location /angular {
      alias D:/personProject/angular16/dist/angular16;
      index  index.html index.htm;
      try_files $uri $uri/ /angular/index.html;
    }
  }
}
```

## https

已备案域名 公网服务器

主域名或子域名签发 ssl 证书 下载 ssl 证书 pem/key

主域名或子域名解析到公网服务器

公网服务器下载安装 nginx

将 ssl 证书 .pem .key 文件上传到 公网服务器

```nginx
http {
  server {
    listen       443 ssl;
    server_name  域名;

    ssl_certificate      文件路径.pem;
    ssl_certificate_key  文件路径.key;

    # ssl_session_cache    shared:SSL:1m;
    # ssl_session_timeout  5m;

    # ssl_ciphers  HIGH:!aNULL:!MD5;
    # ssl_prefer_server_ciphers  on;

    # 配置 location
  }
}
```
