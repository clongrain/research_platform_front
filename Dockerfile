# 阶段 1: 构建阶段
FROM node:14 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建 React 应用
RUN npm run build

# 阶段 2: 生产阶段
FROM nginx:alpine

# 复制构建好的静态文件到 Nginx 服务器
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 Nginx 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]