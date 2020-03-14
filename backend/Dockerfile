FROM node:latest

WORKDIR /usr/src/app

# 首次添加package.json 和 package-lock.json两个文件，充分利用缓存
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
#我们将后端项目的容器暴露4000端口

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev
# 该wait命令是为了可以在 Teatime/docker-compose.yml 里面使得server在redis 和postgres 执行好之后再执行
# https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b