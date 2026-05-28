# 日本東京行旅遊管理系統｜UI/UX 設計風格規劃文件

> 文件版本：v1.0  
> 建立日期：2026-05-28  
> 適用系統：日本東京行旅遊管理系統  
> 設計方向：簡潔、美觀、手機優先、支援深淺色模式、適合多人旅行協作  

---

## 1. 設計定位

本系統是一套針對多人日本旅遊所設計的旅遊管理平台，核心用途是整合：

- 行程表
- 住宿
- 交通
- 吃與喝
- 景點與商店
- 支出記錄
- 分帳統計

設計風格應兼具「旅行手帳感」與「管理系統的清楚效率」，讓使用者在旅途中能快速查看資訊，不需要在複雜介面中尋找資料。

---

## 2. 設計關鍵字

| 關鍵字 | 說明 |
|---|---|
| 簡潔 | 減少多餘裝飾，重點資訊清楚呈現 |
| 美觀 | 使用柔和色彩、卡片式設計與一致的視覺規則 |
| 易讀 | 手機螢幕上也能快速閱讀時間、地點、提醒 |
| 旅行感 | 使用東京、富士山、櫻花、車票、地圖等視覺語彙 |
| 管理感 | 表格、篩選、標籤、狀態欄位需清楚 |
| 深淺色切換 | 支援 Light Mode / Dark Mode |
| 行動優先 | 旅途中主要以手機查看，桌機作為規劃與整理用途 |

---

## 3. 使用情境

## 3.1 旅行前

使用者會在出發前整理資料，例如：

- 確認每日行程
- 檢查住宿與交通
- 補上餐廳訂位資訊
- 整理景點與商店清單
- 預估旅費與分帳方式

### 設計重點

- 資料輸入要清楚
- 表格欄位要完整
- 支援大量內容管理
- 桌機版需要有完整資訊密度

---

## 3.2 旅途中

使用者會用手機快速查看：

- 今天去哪裡
- 下一站在哪裡
- 幾點要搭車
- 飯店地址
- 餐廳訂位時間
- 誰先付款
- 目前還有什麼未結清

### 設計重點

- 手機版資訊要優先顯示
- 點擊地點可快速開啟地圖
- 今日行程要放在首頁最上方
- 重要提醒要用顯眼但不刺眼的方式呈現

---

## 3.3 旅行後

使用者會回來整理：

- 實際支出
- 分帳結算
- 已去 / 未去景點
- 旅行紀錄
- 未來可複製模板

### 設計重點

- 支出統計要清楚
- 可匯出資料
- 可保留旅遊紀錄
- 方便複製為下一次旅行模板

---

## 4. 整體視覺風格

## 4.1 風格方向

建議採用：

> **Minimal Travel Dashboard Style**  
> 簡潔旅遊儀表板風格

特色：

- 乾淨背景
- 大量留白
- 卡片式資訊區塊
- 圓角元件
- 柔和陰影
- 色彩不過度飽和
- 用標籤區分地區、類型、狀態
- 用 icon 輔助理解，但不取代文字

---

## 4.2 視覺氛圍

| 項目 | 建議 |
|---|---|
| 主視覺 | 東京城市旅行 + 富士山一日行 |
| 情緒感 | 輕鬆、有秩序、好查找 |
| 介面感 | Notion + Google Travel + Apple Wallet 的混合感 |
| 元件感 | 卡片、標籤、時間軸、清單、統計卡 |
| 圖像感 | 可使用線性 icon，不建議過多插畫 |

---

## 5. 色彩系統

本系統需支援淺色與深色模式，因此色彩應以 Design Token 管理。

---

# 5.1 淺色模式 Light Mode

## 5.1.1 主要色彩

| 用途 | 色彩名稱 | HEX | 說明 |
|---|---|---|---|
| Primary | Tokyo Navy | `#1E3A5F` | 主色，適合標題、主要按鈕 |
| Secondary | Fuji Blue | `#4A90E2` | 輔助色，用於連結、交通相關 |
| Accent | Sakura Pink | `#F5A6B8` | 點綴色，用於提醒、旅行感 |
| Success | Matcha Green | `#5FA777` | 已完成、已訂位、已結清 |
| Warning | Sunset Orange | `#F5A623` | 待確認、即將出發 |
| Danger | Tokyo Tower Red | `#D94F45` | 錯誤、取消、逾時 |
| Info | Sky Cyan | `#5BC0DE` | 提示、一般資訊 |

## 5.1.2 背景與文字

| 用途 | HEX | 說明 |
|---|---|---|
| Page Background | `#F7F8FA` | 主背景 |
| Surface | `#FFFFFF` | 卡片、表格、彈窗背景 |
| Surface Soft | `#F0F3F6` | 次要區塊背景 |
| Border | `#E1E5EA` | 分隔線 |
| Text Primary | `#1F2933` | 主要文字 |
| Text Secondary | `#5F6B7A` | 次要文字 |
| Text Muted | `#9AA4B2` | 輔助文字 |

---

# 5.2 深色模式 Dark Mode

## 5.2.1 主要色彩

| 用途 | 色彩名稱 | HEX | 說明 |
|---|---|---|---|
| Primary | Tokyo Night Blue | `#7FB3FF` | 深色模式主色 |
| Secondary | Fuji Glow | `#8CCBFF` | 連結、交通資訊 |
| Accent | Sakura Night Pink | `#F2A7C3` | 點綴色 |
| Success | Matcha Light | `#8AD6A0` | 成功狀態 |
| Warning | Lantern Yellow | `#FFD166` | 提醒狀態 |
| Danger | Tower Light Red | `#FF7A70` | 危險狀態 |
| Info | Neon Cyan | `#7FDBFF` | 資訊提示 |

## 5.2.2 背景與文字

| 用途 | HEX | 說明 |
|---|---|---|
| Page Background | `#0F172A` | 深色主背景 |
| Surface | `#111827` | 卡片背景 |
| Surface Soft | `#1F2937` | 次要區塊 |
| Border | `#334155` | 邊框 |
| Text Primary | `#F8FAFC` | 主要文字 |
| Text Secondary | `#CBD5E1` | 次要文字 |
| Text Muted | `#94A3B8` | 輔助文字 |

---

# 5.3 色彩使用規則

## 5.3.1 按鈕

| 按鈕類型 | Light Mode | Dark Mode |
|---|---|---|
| Primary Button | Tokyo Navy 背景，白字 | Fuji Glow 背景，深色字 |
| Secondary Button | 白底，Primary 外框 | 深色底，Primary 外框 |
| Danger Button | Tokyo Tower Red | Tower Light Red |
| Ghost Button | 透明背景，Primary 字色 | 透明背景，Primary 字色 |

## 5.3.2 狀態標籤

| 狀態 | 顏色 |
|---|---|
| 已訂位 | Success |
| 待確認 | Warning |
| 未預約 | Text Muted |
| 已結清 | Success |
| 未結清 | Danger |
| 交通提醒 | Info |
| 高優先度 | Danger |
| 中優先度 | Warning |
| 低優先度 | Text Muted |

---

## 6. 字體系統

## 6.1 字體建議

| 語言 / 用途 | 字體 |
|---|---|
| 中文 | Noto Sans TC |
| 英文 / 數字 | Inter |
| 日文 | Noto Sans JP |
| 系統備援 | Apple system font / Microsoft JhengHei |

建議 CSS：

```css
font-family: "Inter", "Noto Sans TC", "Noto Sans JP", system-ui, sans-serif;
```

---

## 6.2 字級規範

| 用途 | Desktop | Mobile | Weight |
|---|---:|---:|---|
| H1 頁面標題 | 32px | 26px | 700 |
| H2 區塊標題 | 24px | 22px | 700 |
| H3 卡片標題 | 20px | 18px | 600 |
| Body 正文 | 16px | 15px | 400 |
| Small 輔助文字 | 14px | 13px | 400 |
| Caption 標籤文字 | 12px | 12px | 500 |
| Data 數字資訊 | 20px | 18px | 700 |

---

## 6.3 文字風格

| 類型 | 建議寫法 |
|---|---|
| 標題 | 明確、短句，例如「今日行程」、「住宿資訊」 |
| 按鈕 | 動詞開頭，例如「新增支出」、「查看地圖」 |
| 提醒 | 簡短直接，例如「14:50 前需抵達機場」 |
| 空狀態 | 親切，例如「目前還沒有新增支出」 |
| 錯誤訊息 | 清楚說明原因，例如「請輸入金額後再儲存」 |

---

## 7. 間距與版面系統

## 7.1 Grid

| 裝置 | 欄位 | Margin | Gutter |
|---|---:|---:|---:|
| Mobile | 4 columns | 16px | 12px |
| Tablet | 8 columns | 24px | 16px |
| Desktop | 12 columns | 32px | 24px |

---

## 7.2 Spacing Scale

建議使用 4px 基準。

| Token | px | 用途 |
|---|---:|---|
| xs | 4px | icon 與文字間距 |
| sm | 8px | 小元件內距 |
| md | 16px | 卡片內距 |
| lg | 24px | 區塊間距 |
| xl | 32px | 頁面區塊 |
| 2xl | 48px | 大區塊分隔 |

---

## 7.3 圓角

| 元件 | Radius |
|---|---:|
| 小標籤 | 999px |
| 按鈕 | 10px |
| 輸入框 | 10px |
| 卡片 | 16px |
| Modal | 20px |
| Dashboard 大卡 | 24px |

---

## 7.4 陰影

| 層級 | 用途 | 建議 |
|---|---|---|
| Shadow 1 | 小卡片 | 輕微陰影 |
| Shadow 2 | Dashboard 卡片 | 中等陰影 |
| Shadow 3 | Modal / Drawer | 明顯陰影 |

Light Mode 建議：

```css
box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
```

Dark Mode 建議：

```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
```

---

## 8. 元件設計規範

---

# 8.1 Button 按鈕

## 8.1.1 類型

| 類型 | 用途 |
|---|---|
| Primary | 主要操作，例如新增行程、新增支出 |
| Secondary | 次要操作，例如查看詳情 |
| Ghost | 不重要操作，例如取消 |
| Danger | 刪除、取消訂位、清除資料 |
| Icon Button | 手機版快速操作 |

## 8.1.2 尺寸

| 尺寸 | 高度 | 用途 |
|---|---:|---|
| Small | 32px | 表格內操作 |
| Medium | 40px | 一般操作 |
| Large | 48px | 手機主要 CTA |

## 8.1.3 按鈕文字範例

- 新增行程
- 新增支出
- 查看地圖
- 編輯住宿
- 標記已結清
- 匯出資料

---

# 8.2 Card 卡片

卡片是本系統最主要的資訊承載元件。

## 8.2.1 卡片類型

| 卡片 | 用途 |
|---|---|
| 今日行程卡 | 首頁顯示今日主要行程 |
| 交通提醒卡 | 顯示下一班車或航班 |
| 住宿卡 | 顯示飯店、地址、入住時間 |
| 餐廳卡 | 顯示訂位餐廳 |
| 景點卡 | 顯示景點與商店 |
| 支出卡 | 顯示單筆支出 |
| 統計卡 | 顯示總花費、應收應付 |

## 8.2.2 卡片基本結構

```text
[Icon] 標題
      副標題 / 地區 / 類型
      主要資訊
      狀態標籤
      操作按鈕
```

## 8.2.3 卡片設計規則

- 卡片內距建議 16px～24px
- 標題與內容需有明確層級
- 重要時間可加粗
- 狀態標籤放右上角或標題下方
- 手機版卡片避免塞太多欄位

---

# 8.3 Tag 標籤

## 8.3.1 標籤用途

| 標籤類型 | 範例 |
|---|---|
| 地區 | 澀谷、上野、池袋、田端 |
| 類型 | 景點、餐廳、交通、購物 |
| 狀態 | 已訂位、待確認、已結清 |
| 優先度 | 高、中、低 |
| 日期 | Day 1、Day 2 |

## 8.3.2 標籤設計

- 高度：24px
- 圓角：999px
- 字級：12px
- 左右 padding：8px～10px
- 不建議使用過度鮮豔的背景色

---

# 8.4 Table 表格

表格主要用於桌機版管理資料。

## 8.4.1 表格使用場景

- 支出記錄
- 分帳統計
- 餐廳清單
- 景點商店清單
- 交通清單

## 8.4.2 表格設計規則

| 項目 | 規則 |
|---|---|
| Header | 固定表頭，背景略深 |
| Row Height | 48px～56px |
| Hover | 滑過時背景變化 |
| 數字欄位 | 靠右 |
| 日期 / 時間 | 固定格式 |
| 狀態 | 使用標籤顯示 |
| 手機版 | 改為卡片顯示，不直接壓縮表格 |

---

# 8.5 Form 表單

## 8.5.1 表單使用場景

- 新增行程
- 新增住宿
- 新增交通
- 新增餐廳
- 新增景點
- 新增支出

## 8.5.2 表單欄位規範

| 欄位類型 | 使用範例 |
|---|---|
| Text Input | 店名、地址、備註 |
| Date Picker | 日期 |
| Time Picker | 出發時間、訂位時間 |
| Select | 類別、地區、狀態 |
| Multi Select | 分攤人 |
| Number Input | 金額、人數 |
| Textarea | 備案、備註 |
| URL Input | Google Maps 連結 |

## 8.5.3 表單設計規則

- 必填欄位以 `*` 標示
- 錯誤訊息放在欄位下方
- 儲存按鈕放在右下或底部固定區
- 手機版可使用 Bottom Sheet

---

## 9. 頁面設計細節

---

# 9.1 Dashboard 首頁

## 9.1.1 目的

讓使用者一打開系統就知道：

- 今天是第幾天
- 今天去哪裡
- 下一個交通是什麼
- 有沒有餐廳訂位
- 有沒有需要注意的時間

## 9.1.2 頁面結構

```text
[頂部區]
日本東京行
2026/06/22 - 2026/06/28
Light / Dark Mode Toggle

[今日重點卡]
Day 3｜6/24（三）
富士山 / 河口湖一日行
08:00 包車
河口湖遊船、Lawson、淺間神社

[下一個提醒]
13:40 Skyliner 上野 → 成田
或
20:30 Yoroniku 訂位

[快速入口]
行程表｜住宿｜交通｜吃喝｜景點商店｜支出

[支出摘要]
目前總支出
尚未結清
我應付 / 應收
```

## 9.1.3 Dashboard 卡片

| 卡片 | 顯示資訊 |
|---|---|
| 今日行程 | 今日區域、主要活動、時間 |
| 下一個交通 | 出發地、目的地、時間 |
| 已訂位 | 餐廳名稱、時間、人數 |
| 住宿提醒 | 今晚住宿、Check in / Check out |
| 支出摘要 | 總花費、未結清 |

---

# 9.2 行程表頁

## 9.2.1 版面

建議使用「日期 Tabs + 時間軸」。

```text
[日期切換]
6/22 Day 1｜6/23 Day 2｜6/24 Day 3｜...

[時間軸]
08:22  Skyliner 成田 → 上野
下午   秋葉原：海洋堂、無線電會館、BicCamera
16:00  Check in
```

## 9.2.2 行程卡片資訊

| 欄位 | 顯示 |
|---|---|
| 時間 | 08:22-09:15 |
| 類型 | 交通 / 景點 / 餐廳 |
| 標題 | Skyliner 成田 → 上野 |
| 地區 | 上野 |
| 備註 | 到上野寄放行李 |
| 操作 | 查看地圖、編輯 |

## 9.2.3 特殊日期提示

| 日期 | 提醒 |
|---|---|
| 6/22 | 抵達日，需寄放行李與 Check in |
| 6/24 | 富士山一日行，需早起 |
| 6/27 | 更換住宿，需處理行李 |
| 6/28 | 回程日，14:50 前需到機場 |

---

# 9.3 住宿頁

## 9.3.1 頁面重點

因本次旅行有兩段住宿，住宿頁要清楚顯示：

- 6/22～6/27：田端
- 6/27～6/28：三之輪

## 9.3.2 卡片設計

```text
[住宿卡]
田端住宿
6/22 入住 - 6/27 退房
JR 田端站步行約 4 分鐘
東京都北區田端 1-20-6

[按鈕]
查看地圖｜附近便利商店｜編輯
```

## 9.3.3 住宿頁欄位

| 欄位 | 說明 |
|---|---|
| 飯店 / 民宿名稱 | 名稱 |
| 入住日期 | Check in |
| 退房日期 | Check out |
| 最近車站 | 例如 JR 田端站 |
| 地址 | 完整地址 |
| 周邊便利商店 | 超市、FamilyMart、Lawson |
| 訂房資訊 | 平台、訂單編號、費用 |
| 行李備註 | 是否可寄放行李 |

---

# 9.4 交通頁

## 9.4.1 頁面目的

集中管理所有移動資訊：

- 航班
- Skyliner
- JR
- 富士急行線
- 包車
- 市區移動

## 9.4.2 交通卡片

```text
[交通卡]
Skyliner
6/22 08:22 - 09:15
成田機場 T1 → 上野
票券：已購買
費用：¥2,310 / 人
```

## 9.4.3 重要交通提醒

| 日期 | 交通 | UI 顯示方式 |
|---|---|---|
| 6/22 | 去程航班 | 大型提醒卡 |
| 6/22 | Skyliner 成田 → 上野 | 交通卡 |
| 6/24 | 富士山交通 | 特別標註早起 |
| 6/28 | Skyliner 上野 → 成田 | 高優先度提醒 |
| 6/28 | 回程航班 | 大型提醒卡 |

---

# 9.5 吃與喝頁

## 9.5.1 頁面目的

管理已訂位餐廳與備選餐廳，方便當天依地區選擇。

## 9.5.2 頁面結構

```text
[已訂位]
Yoroniku｜6/23 20:30｜5人
THE SUSHI TOKYO 旬｜6/25 12:00｜5人

[依地區分類]
田端｜池袋｜上野｜淺草｜新宿｜東京站｜澀谷｜富士山

[篩選]
類型：拉麵 / 壽司 / 燒肉 / 咖啡 / 定食
```

## 9.5.3 餐廳卡片

```text
Yoroniku
表參道｜燒肉
6/23 20:30｜5人
狀態：已訂位
訂位編號：7ALS33NU4D
```

---

# 9.6 景點與商店頁

## 9.6.1 頁面目的

管理購物點、景點、商店、拍照點與備案。

## 9.6.2 分類方式

| 分類 | 內容 |
|---|---|
| 景點 | Shibuya Sky、東京國立博物館、淺草寺、東京鐵塔 |
| 商店 | AURALEE、PARCO、Stüssy、Graphpaper |
| 拍照點 | 富士山 Lawson |
| 神社 | 北口本宮富士淺間神社 |
| 模型 / 電器 | 秋葉原海洋堂、無線電會館、BicCamera |

## 9.6.3 顯示方式

- 地區卡片
- 地圖列表
- 優先度標籤
- 是否已排入行程
- 是否需預約

---

# 9.7 支出記錄頁

## 9.7.1 頁面目的

管理共同支出、個人支出、分帳與結清。

## 9.7.2 頁面結構

```text
[統計卡]
總支出
共同支出
我已代墊
我應付
尚未結清

[新增支出按鈕]

[支出列表]
日期｜項目｜類別｜金額｜付款者｜分攤人｜狀態
```

## 9.7.3 支出分類

| 類別 | 顏色 |
|---|---|
| 機票 | Primary |
| 住宿 | Secondary |
| 交通 | Info |
| 餐飲 | Accent |
| 門票 | Warning |
| 購物 | Text Muted |
| 其他 | Surface Soft |

## 9.7.4 分帳狀態

| 狀態 | 顯示方式 |
|---|---|
| 已結清 | 綠色標籤 |
| 未結清 | 紅色標籤 |
| 部分結清 | 橘色標籤 |

---

## 10. 深淺色模式規劃

## 10.1 切換位置

建議放在：

1. Dashboard 右上角
2. 設定頁
3. 手機版底部選單或側邊選單內

## 10.2 切換方式

| 模式 | 說明 |
|---|---|
| Light | 預設淺色模式 |
| Dark | 深色模式 |
| System | 跟隨系統設定 |

## 10.3 儲存方式

- 前端可使用 `localStorage`
- 登入系統後可存入使用者設定
- 預設值建議為 `system`

## 10.4 設計注意事項

- 深色模式不是單純反白
- 卡片與背景需有層次
- 邊框顏色不可太亮
- 狀態色在深色模式下需提高亮度
- 陰影在深色模式下應更柔和
- 表格 hover 狀態需清楚可辨識

---

## 11. Icon 系統

## 11.1 Icon 風格

建議使用線性 icon，例如：

- Lucide Icons
- Heroicons
- Phosphor Icons

## 11.2 Icon 對應

| 模組 | Icon 建議 |
|---|---|
| Dashboard | LayoutDashboard |
| 行程表 | CalendarDays |
| 住宿 | Hotel |
| 交通 | Train / Plane |
| 吃與喝 | Utensils |
| 景點商店 | MapPin / ShoppingBag |
| 支出記錄 | Wallet / Receipt |
| 設定 | Settings |
| 深淺色 | Sun / Moon |

## 11.3 Icon 使用規則

- Icon 尺寸：16px、20px、24px
- 不單獨使用 icon 表示功能，需搭配文字
- 手機底部導航可使用 icon + label
- 狀態 icon 不宜過多，避免混亂

---

## 12. 導航設計

## 12.1 Desktop 導航

建議使用左側 Sidebar。

```text
日本東京行
Dashboard
行程表
住宿
交通
吃與喝
景點與商店
支出記錄
設定
```

### Sidebar 規格

| 項目 | 規格 |
|---|---|
| 寬度 | 240px |
| 收合寬度 | 72px |
| 背景 | Surface |
| Active 狀態 | Primary 淡色背景 |
| Icon | 20px |
| 文字 | 14px～15px |

---

## 12.2 Mobile 導航

建議使用底部 Bottom Navigation。

```text
首頁｜行程｜交通｜支出｜更多
```

更多頁內包含：

- 住宿
- 吃與喝
- 景點商店
- 設定

### Bottom Navigation 規格

| 項目 | 規格 |
|---|---|
| 高度 | 64px～72px |
| Icon | 22px |
| Label | 11px～12px |
| Active 顏色 | Primary |
| 背景 | Surface |
| 安全距離 | 支援 iPhone bottom safe area |

---

## 13. 響應式設計

## 13.1 Breakpoints

| 裝置 | 寬度 |
|---|---:|
| Mobile | 0～767px |
| Tablet | 768～1023px |
| Desktop | 1024px 以上 |

---

## 13.2 Mobile First 設計規則

| 項目 | Mobile | Desktop |
|---|---|---|
| 行程表 | 卡片時間軸 | 表格 + 時間軸 |
| 支出 | 卡片列表 | 表格 |
| Dashboard | 單欄卡片 | 多欄 Grid |
| 導航 | Bottom Nav | Sidebar |
| 新增表單 | Bottom Sheet | Modal / Side Panel |
| 地點清單 | 卡片 | 表格 / 卡片混合 |

---

## 14. 互動設計

## 14.1 Hover

Desktop 上滑過卡片時：

- 背景微變
- 陰影稍微加深
- cursor 顯示 pointer

## 14.2 Active

按下按鈕時：

- 稍微縮小 `scale(0.98)`
- 顏色略深
- 避免大幅動畫

## 14.3 Loading

| 場景 | 顯示 |
|---|---|
| 初次載入 | Skeleton Card |
| 表格載入 | Skeleton Rows |
| 儲存資料 | Button loading spinner |
| 匯出資料 | Progress indicator |

## 14.4 Empty State

| 頁面 | 文字 |
|---|---|
| 支出記錄 | 目前還沒有支出，新增第一筆花費吧 |
| 景點商店 | 尚未加入景點或商店 |
| 餐廳 | 尚未新增餐廳 |
| 搜尋結果 | 找不到符合條件的資料 |

## 14.5 Error State

| 狀況 | 訊息 |
|---|---|
| 表單未填必填欄位 | 請填寫必填欄位 |
| 金額格式錯誤 | 請輸入有效金額 |
| 儲存失敗 | 儲存失敗，請稍後再試 |
| 網路錯誤 | 目前無法連線，請檢查網路 |

---

## 15. Accessibility 無障礙設計

## 15.1 對比

- 主要文字與背景對比需達 WCAG AA
- 深色模式下避免低對比灰字
- 狀態不可只靠顏色判斷，需加文字

## 15.2 點擊區域

| 元件 | 最小尺寸 |
|---|---:|
| 手機按鈕 | 44px x 44px |
| Icon Button | 40px x 40px |
| Checkbox | 24px x 24px |

## 15.3 鍵盤操作

- Tab 可移動至所有互動元件
- Focus 狀態需明顯
- Modal 開啟後 focus 保持在 Modal 內

## 15.4 螢幕閱讀器

- Icon Button 需有 aria-label
- 表單欄位需有 label
- 錯誤訊息需與欄位關聯

---

## 16. Design Tokens

## 16.1 CSS Variables

```css
:root {
  --color-primary: #1E3A5F;
  --color-secondary: #4A90E2;
  --color-accent: #F5A6B8;
  --color-success: #5FA777;
  --color-warning: #F5A623;
  --color-danger: #D94F45;
  --color-info: #5BC0DE;

  --color-bg: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-surface-soft: #F0F3F6;
  --color-border: #E1E5EA;

  --color-text-primary: #1F2933;
  --color-text-secondary: #5F6B7A;
  --color-text-muted: #9AA4B2;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

[data-theme="dark"] {
  --color-primary: #7FB3FF;
  --color-secondary: #8CCBFF;
  --color-accent: #F2A7C3;
  --color-success: #8AD6A0;
  --color-warning: #FFD166;
  --color-danger: #FF7A70;
  --color-info: #7FDBFF;

  --color-bg: #0F172A;
  --color-surface: #111827;
  --color-surface-soft: #1F2937;
  --color-border: #334155;

  --color-text-primary: #F8FAFC;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #94A3B8;
}
```

---

## 17. Tailwind CSS 建議設定

```js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-soft": "var(--color-surface-soft)",
        border: "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)"
      },
      borderRadius: {
        sm: "8px",
        md: "10px",
        lg: "16px",
        xl: "24px"
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans TC", "Noto Sans JP", "system-ui", "sans-serif"]
      }
    }
  }
}
```

---

## 18. 頁面 Wireframe 草圖

## 18.1 Desktop Dashboard

```text
┌─────────────────────────────────────────────────────────────┐
│ Sidebar        │ 日本東京行                         🌙       │
│                │ 2026/06/22 - 2026/06/28                     │
│ Dashboard      │                                             │
│ 行程表         │ ┌──────────────┐ ┌──────────────┐           │
│ 住宿           │ │ 今日行程      │ │ 下一個交通    │           │
│ 交通           │ │ 富士山一日行  │ │ 13:40 Skyliner│           │
│ 吃與喝         │ └──────────────┘ └──────────────┘           │
│ 景點商店       │                                             │
│ 支出記錄       │ ┌──────────────┐ ┌──────────────┐           │
│                │ │ 已訂位餐廳    │ │ 支出摘要      │           │
│                │ └──────────────┘ └──────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 18.2 Mobile Dashboard

```text
┌─────────────────────┐
│ 日本東京行       🌙 │
│ 6/22 - 6/28         │
├─────────────────────┤
│ 今日行程             │
│ Day 3 富士山一日行   │
│ 08:00 包車           │
├─────────────────────┤
│ 下一個提醒           │
│ 河口湖遊船 09:00     │
├─────────────────────┤
│ 快速入口             │
│ 行程 交通 支出 更多  │
├─────────────────────┤
│ 支出摘要             │
│ 尚未結清：3 筆       │
└─────────────────────┘
```

---

## 19. 元件命名建議

若以 React 開發，可採用以下命名：

| 元件 | 用途 |
|---|---|
| `DashboardPage` | 首頁 |
| `TodaySummaryCard` | 今日摘要 |
| `NextReminderCard` | 下一個提醒 |
| `ItineraryTimeline` | 行程時間軸 |
| `ItineraryCard` | 單筆行程 |
| `AccommodationCard` | 住宿卡 |
| `TransportCard` | 交通卡 |
| `FoodCard` | 餐廳卡 |
| `PlaceCard` | 景點商店卡 |
| `ExpenseTable` | 支出表格 |
| `ExpenseCard` | 手機版支出卡 |
| `SettlementSummary` | 分帳統計 |
| `ThemeToggle` | 深淺色切換 |
| `StatusTag` | 狀態標籤 |
| `AreaFilterTabs` | 地區篩選 |
| `BottomNavigation` | 手機底部導航 |
| `SidebarNavigation` | 桌機側邊導航 |

---

## 20. UX 文案規範

## 20.1 語氣

- 簡短
- 清楚
- 不過度正式
- 旅途中看得懂
- 避免長句

## 20.2 文案範例

| 場景 | 文案 |
|---|---|
| 新增支出 | 新增一筆支出 |
| 儲存成功 | 已儲存 |
| 未填金額 | 請輸入金額 |
| 今日無行程 | 今天還沒有安排，可以新增行程 |
| 回程提醒 | 14:50 前需抵達成田機場 |
| 換住宿提醒 | 今天需要更換住宿，記得先處理行李 |
| 餐廳提醒 | 20:30 有 Yoroniku 訂位 |
| 結清完成 | 此筆費用已結清 |

---

## 21. 首頁資訊優先順序

首頁應依照重要程度排序：

1. 今日日期與今日行程
2. 下一個即將發生的時間點
3. 交通 / 航班提醒
4. 訂位提醒
5. 住宿提醒
6. 快速入口
7. 支出摘要
8. 未完成事項

---

## 22. 重要提醒設計

## 22.1 高優先提醒

例如：

- 回程日 14:50 前要到機場
- 6/27 需要更換飯店
- 6/24 富士山行程需要早起
- 已訂位餐廳即將到時間

### 顯示方式

- 放在 Dashboard 上方
- 使用 Warning 或 Danger 色
- 附上明確時間
- 可關閉，但當日重新顯示

## 22.2 中優先提醒

例如：

- 尚未填寫三之輪飯店地址
- 尚未填入餐廳費用
- 尚未結清分帳

### 顯示方式

- 放在待辦清單區
- 使用 Warning 標籤

---

## 23. 資料狀態設計

## 23.1 行程狀態

| 狀態 | 說明 |
|---|---|
| 已確認 | 時間與地點已確定 |
| 待確認 | 需要補資料 |
| 備案 | 非主要行程 |
| 已完成 | 當天已完成 |
| 已取消 | 不前往 |

## 23.2 訂位狀態

| 狀態 | 說明 |
|---|---|
| 已訂位 | 有訂位編號或截圖 |
| 待確認 | 需要再次確認 |
| 不需訂位 | 可直接前往 |
| 已取消 | 訂位取消 |

## 23.3 支出狀態

| 狀態 | 說明 |
|---|---|
| 未結清 | 尚未分帳 |
| 部分結清 | 部分旅伴已付款 |
| 已結清 | 已完成分帳 |

---

## 24. 設計驗收標準

| 編號 | 項目 | 驗收標準 |
|---|---|---|
| UX01 | 深淺色切換 | 可切換 Light / Dark / System |
| UX02 | 手機可讀性 | 主要資訊在手機寬度下不需橫向滑動 |
| UX03 | 今日行程 | 首頁可清楚看到今日行程 |
| UX04 | 重要提醒 | 回程、換住宿、訂位可被明確提醒 |
| UX05 | 支出記錄 | 可快速新增支出 |
| UX06 | 分帳資訊 | 可看出每人應付與應收 |
| UX07 | 地區分類 | 餐廳與景點能依地區篩選 |
| UX08 | 狀態標籤 | 已訂位、待確認、未結清等狀態清楚 |
| UX09 | 深色模式對比 | 深色模式文字清楚可讀 |
| UX10 | 操作一致性 | 各頁新增、編輯、刪除按鈕位置一致 |

---

## 25. 建議第一版 UI 製作順序

1. 建立 Design Tokens
2. 建立 Light / Dark Mode
3. 建立共用元件
   - Button
   - Card
   - Tag
   - Input
   - Table
   - Modal
4. 製作 Dashboard
5. 製作行程表頁
6. 製作住宿與交通頁
7. 製作吃與喝、景點商店頁
8. 製作支出紀錄與分帳統計
9. 加入手機版 Bottom Navigation
10. 加入深淺色切換與本機儲存

---

## 26. 結論

本旅遊管理系統的 UI/UX 應以「旅途中快速查找」為核心，而不是只追求漂亮畫面。  
設計上應兼顧以下四點：

1. **資訊清楚**：時間、地點、交通、訂位、住宿要一眼可見。
2. **操作簡單**：新增支出、查看地圖、切換日期不能太複雜。
3. **視覺美觀**：使用柔和色彩、卡片設計、圓角與適度留白。
4. **情境貼合**：針對 6/27 換住宿、6/28 返台、富士山一日行等重要情境給予明確提醒。

第一版建議先以手機優先的 Dashboard、行程時間軸、住宿交通卡片與支出記錄頁為重點，後續再擴充地圖串接、收據上傳與自動分帳等功能。
