# Vane - Email HTML Generator

一个使用 Bun 构建的高性能微服务，将 JSON 数据转换为兼容邮件客户端的 HTML。

## 🚀 快速开始

### 安装依赖

```bash
bun install
```

### 启动开发服务器

```bash
bun dev
```

### 启动生产服务器

```bash
bun start
```

服务器默认运行在 `http://localhost:3000`

## 📡 API 端点

### `GET /health`

健康检查端点。

**响应示例：**
```json
{
  "status": "ok",
  "timestamp": "2025-11-08T11:00:00.000Z"
}
```

### `POST /generate`

生成 Email HTML。

**请求体：**
```json
{
  "subject": "邮件主题（可选）",
  "component": {
    "type": "组件类型",
    "props": {
      "属性名": "属性值"
    },
    "children": []
  }
}
```

**响应：** 完整的 HTML 邮件内容

## 🧩 组件系统

### 组件结构

所有组件遵循统一的结构：

```typescript
{
  type: string;          // 组件类型
  props?: object;        // 组件属性
  children?: Component[]; // 子组件（支持嵌套）
}
```

### Text 组件

渲染文本内容。

**类型：** `text`

**Props：**

| 属性       | 类型   | 必填 | 默认值    | 说明           |
| ---------- | ------ | ---- | --------- | -------------- |
| content    | string | ✅   | -         | 文本内容       |
| color      | string | ❌   | #000000   | 文字颜色       |
| fontSize   | string | ❌   | 14px      | 字体大小       |
| fontWeight | string | ❌   | normal    | 字体粗细       |
| align      | string | ❌   | left      | 对齐方式       |
| lineHeight | string | ❌   | 1.5       | 行高           |

**示例：**

```json
{
  "subject": "欢迎",
  "component": {
    "type": "text",
    "props": {
      "content": "Hello, World!",
      "color": "#333333",
      "fontSize": "16px",
      "align": "center"
    }
  }
}
```

## 📝 使用示例

### 使用 curl

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @examples/simple-text.json
```

### 使用 JavaScript/TypeScript

```typescript
const response = await fetch("http://localhost:3000/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    subject: "Test Email",
    component: {
      type: "text",
      props: {
        content: "Hello from Vane!",
        fontSize: "18px",
        color: "#007bff",
      },
    },
  }),
});

const html = await response.text();
console.log(html);
```

## 🛠️ 技术栈

- **运行时：** [Bun](https://bun.sh/) - 快速的 JavaScript 运行时
- **语言：** TypeScript
- **验证：** Zod v4 - 类型安全的 schema 验证

## 📦 项目结构

```
vane/
├── src/
│   ├── components/      # 组件实现
│   │   └── text.ts      # Text 组件
│   ├── types.ts         # 类型定义和 Schema
│   ├── renderer.ts      # 渲染引擎
│   └── index.ts         # HTTP 服务入口
├── examples/            # 示例 JSON 文件
│   └── simple-text.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 安全特性

- ✅ HTML 转义，防止 XSS 攻击
- ✅ 输入验证使用 Zod schema
- ✅ CORS 支持

## 📧 邮件客户端兼容性

生成的 HTML 兼容主流邮件客户端：

- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ 其他主流客户端

使用表格布局和内联样式确保最佳兼容性。

## 🚧 后续开发

计划支持更多组件：
- Container（容器）
- Button（按钮）
- Image（图片）
- Divider（分隔线）
- Heading（标题）
- 等等...

## 📄 许可证

MIT
