# 使用官方Node.js的Docker镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建React应用为生产版本
RUN npm run build

# 设置环境变量，指定运行的端口
ENV PORT=3000
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]