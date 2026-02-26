# DengFan OS - Cloudflare Pages & D1 部署文档

本文档基于极致简洁的原则，指导如何将前端代码与 `/functions/api/` 下的后端 Serverless API 一键部署到 Cloudflare Pages，并绑定 D1 数据库预留。

## 1. 准备工作

请确保已安装 Node.js 和 Wrangler CLI：
```bash
npm install -g wrangler
```
并登录你的 Cloudflare 账号：
```bash
wrangler login
```

## 2. D1 数据库配置与初始化

1. **创建数据库**：在终端执行：
```bash
wrangler d1 create dengfan-os-db
```
执行完毕后，终端会打印出一段配置。将其复制并新建到项目根目录的 `wrangler.toml` 文件中：
```toml
# wrangler.toml
name = "dengfan-os"
pages_build_output_dir = "./dist"

[[d1_databases]]
binding = "DB" # 必须与 manage.ts 中的环境变量一致
database_name = "dengfan-os-db"
database_id = "你的-database-id"
```

2. **初始化数据表**：
项目根目录已生成 `schema.sql`，执行以下命令在云端及本地应用表结构：
```bash
# 本地开发环境初始化
wrangler d1 execute dengfan-os-db --local --file=./schema.sql

# 生产环境初始化（部署前执行）
wrangler d1 execute dengfan-os-db --remote --file=./schema.sql
```

## 3. 本地全栈开发与联调

借助 `wrangler` 可以直接本地模拟生产环境进行测试（包括前端和 Functions API）：
```bash
npm run build
wrangler pages dev dist
```
本地 Pages Dev Server 通常运行在 `http://localhost:8788`。
由于我们在 `src/utils/api.ts` 做了封装：
在 `vite dev` 开发环境下，请求会自动打向此端口的 `/api` 目录以避免地址硬编码问题。

## 4. 生产环境部署

直接运行以下命令即可将你的 DengFan OS 部署至 CF Pages：
```bash
# 1. 构建前端产物
npm run build 

# 2. 发布到 Cloudflare Pages
wrangler pages deploy dist --project-name dengfan-os
```

## 4b. 网页端部署 (Cloudflare Dashboard)

如果你希望通过网页后台部署你的应用（例如关联 GitHub 仓库），请遵循以下步骤：

1. **登录并创建**：前往 Cloudflare Dashboard > Workers & Pages 面板，点击 `创建应用程序` -> `Pages` -> 选择 `连接到 Git`。
2. **源码关联**：选中邓繁 OS 的 Github 仓库。
3. **构建配置**：
   - 框架预设：如果使用 Vite，选择 `Vite` 即可。如果没有预设，请选择 `None`。
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
4. **开始构建与首次部署**：保存并构建。第一次构建后接口可能会报错，因为我们还没有在网页端绑定 D1 数据库。

## 5. 网页端 D1 数据库绑定配置

1. 在左侧菜单栏进入 `D1` 并点击 `创建数据库`，取名为 `dengfan-os-db` 或其他自定义名称。
2. **非常重要**：回到 Workers & Pages -> 点击刚部署的 Pages 项目 -> 进入 `设置` (Settings) -> `函数` (Functions) 或 `绑定` (Bindings)。
3. 在 `D1 数据库绑定` 处，点击新建绑定：
   - **变量名称**：填写 `DB` （这必须和 `manage.ts` 里 `context.env.DB` 一致）
   - **D1 数据库**：选择刚刚创建的 `dengfan-os-db` 库。
4. 返回 `部署` 页面，点击最新的部署记录进行 `重新部署`。

完毕后，前端和 API 会生效，D1 的读写也会恢复正常。

部署成功后，会生成一个形如 `https://dengfan-os.pages.dev` 的链接，你的前端和 API 就在同一个云端实例上生效了！

## 5. 验证步骤

当你无论是在本地开发环境联调，还是在正式环境部署后，可通过以下方式验证 `manage.ts` 是否跑通且数据真实入库：

1. **本地开发验证**
   - 启动本地开发服务：`npm run dev`
   - 启动 Pages 模拟服务：`wrangler pages dev dist`
   - 使用浏览器打开本地 dev 项目或通过 Postman、终端 `curl` 向 `http://localhost:3000/api/manage` 发送 POST 测试请求：
   ```bash
   curl -X POST http://localhost:3000/api/manage \
   -H "Content-Type: application/json" \
   -d '{"name": "土豆", "quantity": "3", "unit": "个", "category": "蔬菜", "notes": "需要削皮"}'
   ```
   - 期望返回：带 `success: true` 及从 D1 库原样返回插入的 JSON (`result`)。

2. **生产环境验证**
   - 部署完成后，向你的 Pages 线上地址发送同样的 `curl` 请求即可验证：
   ```bash
   curl -X POST https://你的项目前缀.pages.dev/api/manage \ ...
   ```
   - 也可登录 Cloudflare Dashboard -> D1 数据库面板，直接查看 `ingredients` 表内是否有该条数据记录即可。
