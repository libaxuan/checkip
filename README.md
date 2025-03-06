---

# IP Check Pro
![IP Check界面截图](https://musictops.eu.org/file/1741244238555_ipcheck.jpg)

---

## 🌐 项目简介
**IP Check Pro** 是一个基于 **Cloudflare Workers** 的轻量级 IP 信息查询工具，支持 **批量查询、实时预览、结果导出** 功能。用户可输入多组 IP 地址，快速获取地理位置（省份/城市/区县）、运营商等详细信息，并导出为 CSV 文件。

**项目地址**：[GitHub 仓库](https://github.com/libaxuan/checkip.git)  
**体验地址**：[https://checkip.globalai.us.kg/](https://checkip.globalai.us.kg/)

---

## ✨ 核心功能
- **批量查询**：支持每行输入一个 IP 地址，最大支持 **100 个 IP 同时查询**。
- **详细信息**：返回以下字段：
   - **IP 地址**
   - **省份**
   - **城市**
   - **区县**
   - **运营商**
   - **完整信息**（如详细地理位置描述）
- **结果导出**：一键导出 CSV 文件，包含所有查询结果。
- **实时预览**：查询结果实时展示在表格中，并支持 **列排序**。
- **响应式设计**：适配手机、平板、PC 等多端显示。

---

## 🚀 使用指南
### 1. 访问工具
打开 [IP Check Pro](https://checkip.globalai.us.kg/)，界面如下：  
![功能界面示意图](https://musictops.eu.org/file/1741244238555_ipcheck.jpg)

### 2. 输入 IP 地址
- 在输入框中逐行粘贴或输入 IP 地址（示例）：
  ```  
  8.8.8.8  
  1.1.1.1  
  192.168.1.1  
  ```  

### 3. 执行查询
- 点击 **“执行查询”** 按钮，系统将自动调用 API 并返回结果。
- 查询中显示加载动画，结果实时更新到表格。

### 4. 导出数据
- 点击 **“导出 CSV”** 按钮，下载包含以下字段的文件：
  ```csv  
  IP地址,省份,城市,区县,运营商,完整信息  
  8.8.8.8,加利福尼亚州,洛杉矶,洛杉矶县,Google,Google Public DNS 服务器  
  ...  
  ```  

---

## 🛠️ 部署说明
### 1. 环境准备
- **Cloudflare 账户**：[注册 Cloudflare](https://dash.cloudflare.com/sign-up)
- **Wrangler CLI**：全局安装部署工具
  ```bash  
  npm install -g wrangler  
  ```  

### 2. 配置 `wrangler.toml`
在项目根目录创建或修改配置文件：
```toml  
name = "your-worker-name"  # 替换为你的 Worker 名称（全局唯一）  
account_id = "your-account-id"  # 替换为你的 Cloudflare 账户 ID  
compatibility_date = "2025-03-06"  # 兼容性日期（建议当日日期）  
main = "work.js"  # 入口文件路径  
workers_dev = true  # 开启测试环境  
# route = "your.subdomain.workers.dev"  # 可选：自定义 Workers Dev 子域名  
```  

### 3. 部署到 Cloudflare Workers
```bash  
# 初始化项目（首次）  
wrangler init .  

# 部署到 Workers Dev 测试环境  
wrangler publish  

# 生产环境部署（需绑定域名）  
wrangler publish --target production  
```  

---

## 🛠️ 技术栈
| 类型       | 技术/工具                     | 作用说明                          |  
|------------|------------------------------|-----------------------------------|  
| **前端**   | HTML5, CSS3, JavaScript      | 用户界面交互与数据展示            |  
| **后端**   | Cloudflare Workers           | 处理 HTTP 请求与异步 IP 查询      |  
| **API**    | 第三方 IP 数据接口            | 提供地理位置与运营商信息          |  
| **工具**   | Wrangler CLI                  | 项目部署与配置管理                |  

---

## 🤝 贡献与支持
- **开源地址**：[GitHub 仓库](https://github.com/libaxuan/checkip.git)
- **反馈建议**：
   - 提交 Issue 描述问题或需求
   - 欢迎 PR 优化代码或文档
---

## 📜 License
本项目基于 **MIT License** 开源，允许自由使用、修改和分发。

---
