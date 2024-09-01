# 阶段 1: 构建阶段
FROM node:14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 阶段 2: 生产阶段
FROM nginx:alpine

# 复制构建好的静态文件到 Nginx 服务器
COPY --from=build /app/build /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
