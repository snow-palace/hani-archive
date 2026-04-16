# AGENTS.md

## 项目概述

"不公正的哈尼-斑丘资料库" - 一个静态HTML网站，用于展示游戏/故事的角色、卡牌、时间线、规则等信息。

## 技术栈

- 纯静态 HTML/CSS/JavaScript（单文件 `index.html`）
- Node.js 脚本用于生成卡牌数据

## 关键文件

- `index.html` - 主页面（约1800行），包含所有视图和逻辑
- `cardData.js` - 自动生成的卡牌数据
- `generate_list.js` - Node.js 脚本，读取 `images/BQcards/cards_front/` 目录下的 `.webp` 文件并重新生成 `cardData.js`

## 开发命令

```bash
# 更新卡牌数据（新增卡牌图片后需运行）
node generate_list.js
```

## 目录结构

```
images/
  BQcards/cards_front/  # 卡牌图片（RW-, JN-, WP-, JK- 前缀分类）
  icon/                 # 网站图标
cardData.js             # 自动生成，勿手动编辑
generate_list.js        # 卡牌数据生成脚本
index.html              # 主站页面
```

## 注意事项

- `cardData.js` 由 `generate_list.js` 自动生成，手动编辑会在下次运行脚本时丢失
- 卡牌图片命名规则：`{类型}-{编号}-{版本}.webp`（如 `RW-A01a-PGa.webp`）
- 类型前缀：RW(人物)、JN(技能)、WP(物品)、JK(纪念)
