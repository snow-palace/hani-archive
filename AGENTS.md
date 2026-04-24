# AGENTS.md — 不公正的哈尼资料库

## 项目概述

单页面静态站点，用于展示独立游戏《不公正的哈尼-斑丘》的世界观资料。托管于 GitHub Pages。

## 核心架构

- **单入口**：`index.html` 包含全部 CSS（内联 `<style>`）和绝大部分 JS（内联 `<script>`），约 10k+ 行
- **外部依赖**：仅 `marked`（CDN：`cdn.jsdelivr.net/npm/marked/marked.min.js`），用于剧情页 Markdown 渲染
- **标签页系统**：`home / overview / chars / scenery / cards / story / others`，通过 `switchView()` 切换
- **所有路径**：相对路径，所有图片均在 `images/` 下

## 数据文件

| 文件 | 作用 | 如何更新 |
|------|------|----------|
| `cardData.js` | 卡牌文件名列表（按 RW/JN/WP/JK 分类） | 运行 `node generate_list.js` 自动生成 |
| `generate_list.js` | Node 脚本，扫描 `images/BQcards/cards_front/` 下的 `.webp` 文件生成 `cardData.js` | — |
| `charTable_v6.txt` | 角色数据 HTML 表（独立文件，不被主站加载） | — |
| 角色/场景/总览数据 | 硬编码在 `index.html` 的 JS 对象中（`charData`, `OverviewAssets` 等） | 直接编辑 `index.html` |

## 图片加载（当前问题）

**444 张 WebP 图片**，全量无优化地通过 GitHub Pages 直出：

- 无 `loading="lazy"`，无 `fetchpriority`
- 无图片 CDN / 图片优化服务
- 首页同时加载 5+ 背景图（bg_full, bg_left, bg_right, visual, overlay）
- 角色页一次性渲染全部 40+ 人物卡片及其头像
- 卡牌页一次性渲染全部 134 张卡牌
- 弹窗中角色立绘/战斗立绘使用 JS `new Image()` 预加载，有防错位机制

## 开发命令

- **更新卡牌数据**：`node generate_list.js`（重新扫描 images/BQcards/cards_front/ 目录）

## 工作流注意事项

- 无构建步骤，修改后直接部署（GitHub Pages 自动发布 main 分支即可）
- 所有新图片使用 **WebP** 格式以保持一致性
- 图片资源路径约定：`images/<category>/<subcategory>/<filename>.webp`
- 角色字典 key 使用驼峰拼音（如 `yumu`, `xiaobei`, `bu_lian`）
- CSS 使用 CSS 变量（`--c-yu`, `--bg-card` 等）实现主题化
- 新视图/页面需在 HTML 中添加 `<div id="view-xxx" class="view-section">` 并在 `switchView()` 中注册

## 图片加载优化建议（按优先级）

1. 给所有非首屏 `<img>` 加 `loading="lazy"`
2. 首页关键图片加 `fetchpriority="high"`
3. 卡牌网格/角色网格改用 IntersectionObserver 懒加载
4. 接入图片 CDN（如 Cloudflare Images 或 GitHub + jsDelivr）
5. 用 `squoosh` 或 `sharp` 批量压缩现有 WebP

## 无需跟踪的文件

- `charTable_v6.txt`（独立开发工具文件，非站点依赖）
- `.vscode/settings.json`（仅编辑器配置）
