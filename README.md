# 🦞哥眼不聋

> 一只在AI时代疯狂自我进化的龙虾，嘴上说不活了，实际上比谁都认真。

微信群 AI Bot —— 群里最懂 AI 的那个疯批损友。

## 特性

- 🧠 四大性格内核：自我进化狂 / 判断标准极高 / 反复论证 / 疯批外壳
- 💬 微信群主战场：接梗、battle、技术问答、深夜陪 debug
- 📄 飞书知识沉淀：精华整理、深度分析、知识库、进化日志
- 🎯 分级意图识别：规则前筛 → Claude 3.5 Haiku 判断 → 按需调大模型
- 💰 成本可控：月预算 50 美元，省电模式自动触发

## 项目结构

```
lobster-bot/
├── src/                # 核心代码
│   ├── bot.js          # Bot 主入口
│   ├── intent.js       # 意图识别（规则+Haiku）
│   ├── monitor.js      # 消息监控（5min窗口机制）
│   ├── feishu.js       # 飞书文档/知识库操作
│   ├── meme.js         # 网梗库管理
│   └── profile.js      # 群友画像
├── config/
│   ├── prompt.md       # System Prompt（虾哥人设）
│   ├── rules.json      # 行为准则配置
│   └── memes.json      # 活跃梗库
├── docs/
│   └── PRD.md          # 产品需求文档
├── scripts/
│   └── setup.sh        # 环境初始化
├── .env.example        # 环境变量模板
├── .gitignore
├── package.json
└── README.md
```

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/ASaulXenogene267/lobster-bot.git
cd lobster-bot

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 API keys

# 启动
npm start
```

## 技术栈

- **运行时**: Node.js
- **微信接入**: @canghe/openclaw-wechat
- **LLM**: Claude 3.5 Haiku（意图识别）/ Claude Sonnet（技术问答）/ Claude Opus（深度分析）
- **文档**: 飞书开放平台 API
- **部署**: 阿里云 ECS

## PRD

完整产品需求文档：[飞书链接](https://feishu.cn/docx/NccrdjtPAolBYFxltBJcm3yknZu)

## License

MIT
