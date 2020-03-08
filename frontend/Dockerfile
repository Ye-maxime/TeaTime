# FROM node:alpine
# WORKDIR '/Teatime'
# COPY . .
# RUN npm install && npm run build && npm run sta rt

#暂时无用！！！！！！！！！！！
FROM nginx:latest
LABEL maintainer="Maxime"
ADD ./dist/ /usr/share/nginx/html/
#挂载静态资源
ADD nginx.conf /etc/nginx/ 
#挂载nginx配置
EXPOSE 80
#我们将前端项目的容器暴露并映射给宿主机(我的机子)的80端口

#将宿主机的nginx.conf挂载到容器内的nginx配置文件，用来覆盖原有的配置文件,同时也将dist挂载到容器内
