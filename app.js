/**
 * Tokyo Travel Management System MVP - Core JavaScript Logic
 * Implements data storage, view routing, expense calculations, todo management, and CSV export.
 */

// ==========================================================================
// 1. Initial Seed Data Definitions
// ==========================================================================

const DEFAULT_USERS = [
  { id: "u-1", name: "莊", role: "行程/記帳負責人" },
  { id: "u-2", name: "陳", role: "行程管理者" },
  { id: "u-3", name: "包", role: "同行旅伴" },
  { id: "u-4", name: "賴", role: "同行旅伴" },
  { id: "u-5", name: "李", role: "同行旅伴" }
];

const DEFAULT_ITINERARIES = [
  {
    id: "iti-1",
    date: "2026-06-22",
    dayLabel: "Day 1",
    startTime: "02:20",
    endTime: "06:50",
    area: "成田 / 上野",
    title: "去程航班 TPE → NRT",
    category: "交通",
    locationName: "桃園國際機場 / 成田國際機場 T1",
    address: "",
    googleMapUrl: "",
    transportNote: "航班 IT202 (預計航班)，提前 2.5 小時至機場櫃檯辦理登機",
    reservationStatus: "confirmed",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "抵達成田後，預計 08:00 前辦理完入境手續並領取行李"
  },
  {
    id: "iti-2",
    date: "2026-06-22",
    dayLabel: "Day 1",
    startTime: "08:22",
    endTime: "09:15",
    area: "成田 / 上野",
    title: "Skyliner 成田機場 T1 → 京成上野",
    category: "交通",
    locationName: "成田機場第一航廈車站",
    address: "",
    googleMapUrl: "",
    transportNote: "搭乘 Skyliner 10 號，車程約 41 分鐘",
    reservationStatus: "confirmed",
    priority: "medium",
    isFlexible: false,
    backupPlan: "若入境延誤，改搭 08:59 或 09:39 班次",
    note: "抵達上野站後，先至置物櫃寄存行李"
  },
  {
    id: "iti-3",
    date: "2026-06-22",
    dayLabel: "Day 1",
    startTime: "13:00",
    endTime: "16:00",
    area: "秋葉原",
    title: "秋葉原動漫電器巡禮",
    category: "購物",
    locationName: "海洋堂、無線電會館、BicCamera 秋葉原店",
    address: "東京都千代田區外神田",
    googleMapUrl: "https://maps.app.goo.gl/yJ6h1sUjV1K9GZ9S8",
    transportNote: "從上野搭乘 JR 山手線或京濱東北線至秋葉原站",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "可自由調整停留時間，或改去上野阿美橫町購物",
    note: "主要看模型、電器與動漫周邊商品"
  },
  {
    id: "iti-4",
    date: "2026-06-22",
    dayLabel: "Day 1",
    startTime: "16:00",
    endTime: "17:00",
    area: "田端",
    title: "民宿 Check in",
    category: "住宿",
    locationName: "田端公寓式民宿",
    address: "東京都北區田端 1-20-6",
    googleMapUrl: "https://maps.app.goo.gl/9Zc1N3k8k8k8k8k8",
    transportNote: "從秋葉原搭乘 JR 山手線至田端站，步行約 4 分鐘",
    reservationStatus: "confirmed",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "自助入住，密碼會前一天發送，先回民宿放置行李並稍作休息"
  },
  {
    id: "iti-5",
    date: "2026-06-23",
    dayLabel: "Day 2",
    startTime: "10:00",
    endTime: "17:30",
    area: "澀谷 / 表參道",
    title: "澀谷與南青山時尚逛街日",
    category: "購物",
    locationName: "AURALEE TOKYO, PARCO, Stüssy, Graphpaper, Style Department",
    address: "東京都澀谷區",
    googleMapUrl: "",
    transportNote: "從田端搭乘 JR 山手線至澀谷站",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "若下雨則以澀谷 PARCO 與表參道室內商場為主",
    note: "逛街採購行程，建議穿著好走的鞋子"
  },
  {
    id: "iti-6",
    date: "2026-06-23",
    dayLabel: "Day 2",
    startTime: "18:00",
    endTime: "19:30",
    area: "澀谷",
    title: "Shibuya Sky 展望台觀景",
    category: "景點",
    locationName: "SHIBUYA SKY",
    address: "東京都澀谷區澀谷 2-24-12 澀谷Scramble Square",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=SHIBUYA+SKY+Tokyo",
    transportNote: "澀谷站直通",
    reservationStatus: "pending",
    priority: "high",
    isFlexible: false,
    backupPlan: "若沒訂到黃昏票，改訂夜景票或退費",
    note: "預計於 6/1 開放訂票，需搶購 18:00 左右黃昏日落時段"
  },
  {
    id: "iti-7",
    date: "2026-06-23",
    dayLabel: "Day 2",
    startTime: "20:30",
    endTime: "22:30",
    area: "表參道",
    title: "Yoroniku 頂級燒肉晚餐",
    category: "餐廳",
    locationName: "YORONIKU (よろにく) 青山店",
    address: "東京都港區南青山 6-6-22",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Yoroniku+Aoyama+Tokyo",
    transportNote: "表參道站 B1 出口步行約 10 分鐘",
    reservationStatus: "confirmed",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "已訂位，人數：5 人，訂位確認代號：7ALS33NU4D"
  },
  {
    id: "iti-8",
    date: "2026-06-24",
    dayLabel: "Day 3",
    startTime: "07:00",
    endTime: "08:30",
    area: "田端 / 大月",
    title: "出發前往富士山交通移動",
    category: "交通",
    locationName: "JR 田端站 → 新宿站 → 大月站",
    address: "",
    googleMapUrl: "",
    transportNote: "建議 07:00 前出門，搭乘 JR 特急前往大月站",
    reservationStatus: "none",
    priority: "high",
    isFlexible: false,
    backupPlan: "若趕不上特急，可在大月直接與包車司機會合",
    note: "本日為富士山河口湖一日行，需早起！"
  },
  {
    id: "iti-9",
    date: "2026-06-24",
    dayLabel: "Day 3",
    startTime: "08:30",
    endTime: "18:00",
    area: "河口湖 / 富士山",
    title: "富士山河口湖包車一日遊",
    category: "景點",
    locationName: "富士山 Lawson, 河口湖遊船, 新倉山淺間公園, 北口本宮富士淺間神社",
    address: "山梨縣南都留郡富士河口湖町",
    googleMapUrl: "",
    transportNote: "包車服務 (08:00 起起算)",
    reservationStatus: "confirmed",
    priority: "high",
    isFlexible: false,
    backupPlan: "若富士山被雲遮住，改往富士急樂園室內遊樂區或河口湖美術館",
    note: "河口湖遊船每 30 分鐘一班 (9:00 起)。包車集合時間點與司機聯絡方式待補！"
  },
  {
    id: "iti-10",
    date: "2026-06-25",
    dayLabel: "Day 4",
    startTime: "12:00",
    endTime: "14:00",
    area: "池袋",
    title: "THE SUSHI TOKYO 旬 壽司午餐",
    category: "餐廳",
    locationName: "THE SUSHI TOKYO 旬",
    address: "東京都豐島區西池袋 1 丁目",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=THE+SUSHI+TOKYO+SHUN+Ikebukuro",
    transportNote: "池袋站步行約 3 分鐘",
    reservationStatus: "confirmed",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "已訂位，人數：5 人，訂位確認代號：S45YFC7AML"
  },
  {
    id: "iti-11-1",
    date: "2026-06-25",
    dayLabel: "Day 4",
    startTime: "14:30",
    endTime: "16:30",
    area: "原宿",
    title: "明治神宮參拜",
    category: "景點",
    locationName: "明治神宮",
    address: "東京都澀谷區代代木神園町 1-1",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Meiji+Jingu+Tokyo",
    transportNote: "從池袋搭乘 JR 山手線至原宿站",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "",
    note: "參拜明治神宮，漫步於神宮內著名的參道與大鳥居。"
  },
  {
    id: "iti-11-2",
    date: "2026-06-25",
    dayLabel: "Day 4",
    startTime: "16:30",
    endTime: "18:30",
    area: "原宿",
    title: "原宿竹下通與表參道逛街",
    category: "購物",
    locationName: "竹下通 / 表參道",
    address: "東京都澀谷區神宮前",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Takeshita+Street+Harajuku",
    transportNote: "步行",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "",
    note: "原宿竹下通、表參道逛街，體驗東京流行與潮流時尚文化。"
  },
  {
    id: "iti-11-3",
    date: "2026-06-25",
    dayLabel: "Day 4",
    startTime: "18:30",
    endTime: "21:30",
    area: "新宿",
    title: "新宿商圈逛街與晚餐",
    category: "自由活動",
    locationName: "新宿商圈",
    address: "東京都新宿區",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Shinjuku+Station+Tokyo",
    transportNote: "從原宿搭乘 JR 山手線至新宿站",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "",
    note: "新宿站周邊商場（如伊勢丹、Lumine等）逛街，晚餐可在新宿自由選擇喜愛的餐廳。"
  },
  {
    id: "iti-12-1",
    date: "2026-06-26",
    dayLabel: "Day 5",
    startTime: "10:00",
    endTime: "13:30",
    area: "東京站",
    title: "東京車站與車站地下街購物",
    category: "購物",
    locationName: "東京車站一番街 / KITTE",
    address: "東京都千代田區丸之內 1 丁目",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Tokyo+Station+Character+Street",
    transportNote: "搭乘地鐵或 JR 移動",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "",
    note: "東京車站一番街動漫街、拉麵街逛街，午餐可在拉麵街或 KITTE 丸之內大樓吃根室花まる。"
  },
  {
    id: "iti-12-2",
    date: "2026-06-26",
    dayLabel: "Day 5",
    startTime: "14:00",
    endTime: "16:30",
    area: "松濱町",
    title: "東京鐵塔觀光與拍照",
    category: "景點",
    locationName: "東京鐵塔",
    address: "東京都港區芝公園 4-2-8",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Tokyo+Tower",
    transportNote: "從東京站搭乘 JR 山手線至濱松町站，或地鐵至赤羽橋站，步行前進",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "",
    note: "東京地標東京鐵塔，可在周邊芝公園、赤羽橋站路口或豆腐屋樓梯等熱門角度拍照留念。"
  },
  {
    id: "iti-12-3",
    date: "2026-06-26",
    dayLabel: "Day 5",
    startTime: "17:00",
    endTime: "21:30",
    area: "銀座",
    title: "銀座逛街與鷄繁燒鳥晚餐",
    category: "自由活動",
    locationName: "銀座商圈 / 鷄繁",
    address: "東京都中央區銀座",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Torishige+Shinbashi+Tokyo",
    transportNote: "從東京鐵塔周邊地鐵站搭至銀座站或新橋站",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "",
    note: "銀座高級百貨與精品店逛街，晚餐備選新橋站附近的鷄繁燒鳥（Torishige 新橋本店，JR 新橋站步行3分鐘）。"
  },
  {
    id: "iti-13",
    date: "2026-06-27",
    dayLabel: "Day 6",
    startTime: "10:00",
    endTime: "12:00",
    area: "田端 / 上野",
    title: "退房與行李寄存",
    category: "住宿",
    locationName: "田端民宿 → 京成上野站",
    address: "",
    googleMapUrl: "",
    transportNote: "JR 山手線",
    reservationStatus: "none",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "10:00 前完成退房，搭車前往上野站，將大型行李寄存在車站置物櫃"
  },
  {
    id: "iti-14",
    date: "2026-06-27",
    dayLabel: "Day 6",
    startTime: "12:00",
    endTime: "16:00",
    area: "上野 / 淺草",
    title: "東京國立博物館與淺草寺參拜",
    category: "景點",
    locationName: "東京國立博物館、淺草寺",
    address: "東京都台東區淺草 2-3-1",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Sensoji+Temple+Tokyo",
    transportNote: "搭乘地鐵銀座線至淺草站",
    reservationStatus: "none",
    priority: "medium",
    isFlexible: true,
    backupPlan: "若天候不佳，可多留在博物館內或前往淺草地下街",
    note: "淺草寺周邊可吃牛かつ備選，傍晚需回上野領取行李"
  },
  {
    id: "iti-15",
    date: "2026-06-27",
    dayLabel: "Day 6",
    startTime: "16:00",
    endTime: "17:00",
    area: "三之輪",
    title: "更換住宿 Check in (最後一晚)",
    category: "住宿",
    locationName: "三之輪站附近民宿 (待補)",
    address: "東京都荒川區南千住 (詳細待補)",
    googleMapUrl: "",
    transportNote: "從上野搭乘地鐵日比谷線至三之輪站",
    reservationStatus: "pending",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "換宿點！詳細民宿資訊（名稱、密碼、費用）仍有待確認"
  },
  {
    id: "iti-16",
    date: "2026-06-28",
    dayLabel: "Day 7",
    startTime: "13:00",
    endTime: "14:24",
    area: "上野 / 成田",
    title: "Skyliner 前往成田機場",
    category: "交通",
    locationName: "京成上野站 → 成田機場第一航廈",
    address: "",
    googleMapUrl: "",
    transportNote: "預計搭乘 13:40 的 Skyliner 43 號，14:24 抵達",
    reservationStatus: "pending",
    priority: "high",
    isFlexible: false,
    backupPlan: "最晚必須搭乘 14:00 班次，確保 14:50 前抵達櫃檯",
    note: "高優先交通！14:50 前必須抵達機場櫃檯辦理登機！"
  },
  {
    id: "iti-17",
    date: "2026-06-28",
    dayLabel: "Day 7",
    startTime: "17:40",
    endTime: "20:20",
    area: "成田 / 台北",
    title: "回程航班 NRT → TPE",
    category: "交通",
    locationName: "成田國際機場 T1 / 桃園國際機場",
    address: "",
    googleMapUrl: "",
    transportNote: "航班 IT201 (預計航班)",
    reservationStatus: "confirmed",
    priority: "high",
    isFlexible: false,
    backupPlan: "",
    note: "返回台北，結束東京七天六夜旅程"
  }
];

const DEFAULT_ACCOMMODATIONS = [
  {
    id: "acc-1",
    name: "田端公寓式民宿",
    area: "田端",
    nearestStation: "JR 田端站 (山手線/京濱東北線)，步行約 4 分鐘",
    checkInDate: "2026-06-22",
    checkOutDate: "2026-06-27",
    checkInTime: "16:00",
    checkOutTime: "10:00",
    address: "東京都北區田端 1-20-6",
    bookingPlatform: "Airbnb",
    bookingNumber: "HM-TABATA2026",
    payer: "陳",
    totalAmount: 35880, // NT$ 7176 * 5
    perPersonAmount: 7176,
    luggageNote: "退房後不可寄放行李，需寄放在上野車站置物櫃",
    note: "周邊生活機能極佳，步行距離有超市與多家超商",
    nearbyStores: [
      { name: "成城石井 アトレヴィ田端店", type: "超市", distance: "JR 田端站內" },
      { name: "FamilyMart 田端駅前店", type: "便利商店", distance: "民宿步行 6 分鐘" },
      { name: "Lawson 田端与楽寺前店", type: "便利商店", distance: "民宿步行 3 分鐘" }
    ]
  },
  {
    id: "acc-2",
    name: "三之輪住宿 (最後一晚)",
    area: "三之輪",
    nearestStation: "東京地鐵日比谷線 三之輪站",
    checkInDate: "2026-06-27",
    checkOutDate: "2026-06-28",
    checkInTime: "16:00",
    checkOutTime: "10:00",
    address: "待確認",
    bookingPlatform: "待補",
    bookingNumber: "待補",
    payer: "待補",
    totalAmount: 0,
    perPersonAmount: 0,
    luggageNote: "待補",
    note: "因航班改期追加的最後一晚住宿，尚缺乏詳細地址與訂房資訊！",
    nearbyStores: []
  }
];

const DEFAULT_TRANSPORTS = [
  {
    id: "tr-1",
    date: "2026-06-22",
    type: "飛機",
    departureLocation: "台北 TPE",
    arrivalLocation: "成田 NRT",
    departureTime: "02:20",
    arrivalTime: "06:50",
    route: "桃園機場第一航廈 → 成田機場第一航廈",
    ticketStatus: "bought",
    cost: 57220, // NT$ 11444 * 5
    payer: "包",
    note: "去程航班 (紅眼班機)"
  },
  {
    id: "tr-2",
    date: "2026-06-22",
    type: "Skyliner",
    departureLocation: "成田機場 T1",
    arrivalLocation: "京成上野",
    departureTime: "08:22",
    arrivalTime: "09:15",
    route: "Skyliner 10 號",
    ticketStatus: "bought",
    cost: 4450, // NT$ 890 * 5
    payer: "莊",
    note: "機場特快車"
  },
  {
    id: "tr-3",
    date: "2026-06-24",
    type: "JR",
    departureLocation: "田端",
    arrivalLocation: "大月",
    departureTime: "07:00",
    arrivalTime: "08:30",
    route: "JR 山手線至新宿，轉乘 JR 特急至大月站",
    ticketStatus: "onsite",
    cost: 0,
    payer: "個人",
    note: "現場刷 IC 卡或買車票，預估單程約 ¥2,500"
  },
  {
    id: "tr-4",
    date: "2026-06-24",
    type: "包車",
    departureLocation: "大月 / 河口湖周邊",
    arrivalLocation: "各景點",
    departureTime: "08:30",
    arrivalTime: "18:00",
    route: "包車接送河口湖與富士山周邊景點",
    ticketStatus: "bought",
    cost: 9500, // NT$ 1900 * 5
    payer: "陳",
    note: "富士山一日行專屬包車。司機資料待補！"
  },
  {
    id: "tr-5",
    date: "2026-06-28",
    type: "Skyliner",
    departureLocation: "京成上野",
    arrivalLocation: "成田機場 T1",
    departureTime: "13:40",
    arrivalTime: "14:24",
    route: "Skyliner 43 號",
    ticketStatus: "bought",
    cost: 0,
    payer: "莊",
    note: "回程 Skyliner，已購票完成 (費用已包含在去程套票中)"
  },
  {
    id: "tr-6",
    date: "2026-06-28",
    type: "飛機",
    departureLocation: "成田 NRT",
    arrivalLocation: "台北 TPE",
    departureTime: "17:40",
    arrivalTime: "20:20",
    route: "成田機場第一航廈 → 桃園機場第一航廈",
    ticketStatus: "bought",
    cost: 0,
    payer: "個人",
    note: "回程航班，已訂妥"
  }
];

const DEFAULT_FOODS = [
  {
    id: "f-1",
    nameJp: "よろにく 青山店",
    nameEn: "Yoroniku Aoyama",
    area: "表參道",
    category: "燒肉",
    nearestStation: "表參道站 B1 出口，步行約 10 分鐘",
    walkingTime: "10 分鐘",
    reservationRequired: true,
    reservationStatus: "confirmed",
    reservationTime: "2026-06-23T20:30:00",
    reservationNumber: "7ALS33NU4D",
    peopleCount: 5,
    estimatedBudget: 12000, // JPY
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Yoroniku+Aoyama+Tokyo",
    priority: "high",
    note: "東京知名頂級燒肉，已訂妥 20:30 時段，需準時入場。訂位手續費已由莊代墊 NT$ 450 (90/人)"
  },
  {
    id: "f-2",
    nameJp: "THE SUSHI TOKYO 旬",
    nameEn: "THE SUSHI TOKYO SHUN",
    area: "池袋",
    category: "壽司",
    nearestStation: "JR 池袋站，步行約 3 分鐘",
    walkingTime: "3 分鐘",
    reservationRequired: true,
    reservationStatus: "confirmed",
    reservationTime: "2026-06-25T12:00:00",
    reservationNumber: "S45YFC7AML",
    peopleCount: 5,
    estimatedBudget: 8000, // JPY
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=THE+SUSHI+TOKYO+SHUN+Ikebukuro",
    priority: "high",
    note: "已預約 12:00 壽司午餐無菜單料理，5人"
  },
  // Backup list
  { id: "f-3", nameJp: "だるまや食堂", nameEn: "Darumaya Shokudo", area: "田端", category: "定食", nearestStation: "田端站", walkingTime: "5 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "古早味平價日式定食，田端備選" },
  { id: "f-4", nameJp: "おいしい餃子", nameEn: "Oishii Gyoza", area: "田端", category: "中華/餃子", nearestStation: "田端站", walkingTime: "6 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "中華煎餃，田端備選" },
  { id: "f-5", nameJp: "焼肉ともや", nameEn: "Yakiniku Tomoya", area: "田端", category: "燒肉", nearestStation: "田端站", walkingTime: "4 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "平價單點燒肉，田端備選" },
  { id: "f-6", nameJp: "coco cafe", nameEn: "coco cafe", area: "田端", category: "咖啡", nearestStation: "田端站", walkingTime: "2 分鐘", reservationRequired: false, reservationStatus: "none", priority: "low", note: "休閒咖啡廳，適合休息" },
  { id: "f-7", nameJp: "麵創房 無敵家", nameEn: "Mutekiya Ramen", area: "池袋", category: "拉麵", nearestStation: "池袋站", walkingTime: "6 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "池袋超人氣豚骨拉麵，排隊時間通常較長" },
  { id: "f-8", nameJp: "敘々苑 池袋サンシャイン", nameEn: "Jojoen Ikebukuro", area: "池袋", category: "燒肉", nearestStation: "東池袋站", walkingTime: "3 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "高空景觀燒肉午餐性價比高" },
  { id: "f-9", nameJp: "らーめん 鴨to葱", nameEn: "Kamo to Negi Ramen", area: "上野", category: "拉麵", nearestStation: "御徒町站", walkingTime: "1 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "極受歡迎的鴨肉湯底拉麵，排隊必備" },
  { id: "f-10", nameJp: "伊豆栄 本店", nameEn: "Izuei Main Branch", area: "上野", category: "定食", nearestStation: "上野站", walkingTime: "2 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "老字號鰻魚飯" },
  { id: "f-11", nameJp: "浅草牛かつ", nameEn: "Asakusa Gyukatsu", area: "淺草", category: "定食", nearestStation: "淺草站", walkingTime: "2 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "炸牛排人氣排隊名店，淺草寺旁" },
  { id: "f-12", nameJp: "FUGLEN ASAKUSA", nameEn: "Fuglen Asakusa", area: "淺草", category: "咖啡", nearestStation: "淺草站", walkingTime: "8 分鐘", reservationRequired: false, reservationStatus: "none", priority: "low", note: "來自挪威的知名咖啡分店，北歐風格" },
  { id: "f-13", nameJp: "鶏繁", nameEn: "Torishige", area: "新宿", category: "居酒屋", nearestStation: "新宿站", walkingTime: "5 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "串燒燒鳥名店，新宿彈性日餐飲備選" },
  { id: "f-14", nameJp: "松戸富田麺絆", nameEn: "Matsudo Tomita Memban", area: "東京站", category: "拉麵", nearestStation: "東京站", walkingTime: "3 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "東京站 KITTE 大樓地下室，主打濃厚沾麵" },
  { id: "f-15", nameJp: "根室花まる KITTE丸の内店", nameEn: "Nemuro Hanamaru KITTE", area: "東京站", category: "壽司", nearestStation: "東京站", walkingTime: "4 分鐘", reservationRequired: false, reservationStatus: "none", priority: "high", note: "超人氣排隊迴轉壽司，食材來自北海道" },
  { id: "f-16", nameJp: "GLITCH COFFEE GINZA", nameEn: "Glitch Coffee Ginza", area: "銀座", category: "咖啡", nearestStation: "東銀座站", walkingTime: "1 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "手沖單品淺焙咖啡天花板" },
  { id: "f-17", nameJp: "らーめん はやし", nameEn: "Ramen Hayashi", area: "澀谷", category: "拉麵", nearestStation: "澀谷站", walkingTime: "3 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "魚介豚骨拉麵，無多餘裝飾的職人老店" },
  { id: "f-18", nameJp: "牛かつ もと村 渋谷店", nameEn: "Gyukatsu Motomura Shibuya", area: "澀谷", category: "定食", nearestStation: "澀谷站", walkingTime: "1 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "炸牛排排隊名店" },
  { id: "f-19", nameJp: "茶亭 羽當", nameEn: "Chatei Hatou", area: "澀谷", category: "咖啡", nearestStation: "澀谷站", walkingTime: "1 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "日式傳統精緻喫茶店，手沖咖啡極佳" },
  { id: "f-20", nameJp: "山崎家うどん", nameEn: "Yamazakiya Udon", area: "富士山", category: "定食", nearestStation: "富士山站", walkingTime: "13 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "吉田烏龍麵，在地特色粗麵條" },
  { id: "f-21", nameJp: "ふじや", nameEn: "Fujiya Udon", area: "富士山", category: "定食", nearestStation: "富士山站", walkingTime: "6 分鐘", reservationRequired: false, reservationStatus: "none", priority: "medium", note: "吉田烏龍麵，在地老牌" }
];

const DEFAULT_PLACES = [
  { id: "p-1", name: "SHIBUYA SKY", area: "澀谷", category: "景點", nearestStation: "澀谷站", walkingTime: "直通", openingHours: "10:00-22:30", ticketRequired: true, reservationRequired: true, priority: "high", plannedDate: "2026-06-23", note: "高空戶外展望台，6/1 需訂票" },
  { id: "p-2", name: "河口湖遊覽船 天晴", nameJp: "河口湖遊覧船", area: "河口湖", category: "景點", nearestStation: "河口湖站", walkingTime: "搭公車約 15 分鐘", openingHours: "09:00-16:30 (每30分鐘一班)", ticketRequired: true, reservationRequired: false, priority: "high", plannedDate: "2026-06-24", note: "富士山一日遊經典景點，航程約 20 分鐘" },
  { id: "p-3", name: "富士山 Lawson 河口湖站前店", area: "富士山", category: "拍照點", nearestStation: "河口湖站", walkingTime: "3 分鐘", openingHours: "24小時", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-24", note: "著名網紅拍照點，注意交通安全勿阻礙車道" },
  { id: "p-4", name: "北口本宮富士淺間神社", area: "富士山", category: "神社", nearestStation: "富士山站", walkingTime: "搭車約 10 分鐘", openingHours: "白天開放", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-24", note: "富士山登山口起點古神社，巨木林立氛圍莊嚴" },
  { id: "p-5", name: "東京國立博物館", area: "上野", category: "博物館", nearestStation: "上野站", walkingTime: "10 分鐘", openingHours: "09:30-17:00 (週一休館)", ticketRequired: true, reservationRequired: false, priority: "medium", plannedDate: "2026-06-27", note: "日本最古老的博物館，館藏極為豐富" },
  { id: "p-6", name: "淺草寺", area: "淺草", category: "景點", nearestStation: "淺草站", walkingTime: "5 分鐘", openingHours: "正殿 06:00-17:00", ticketRequired: false, reservationRequired: false, priority: "high", plannedDate: "2026-06-27", note: "東京必去代表性古剎，雷門與仲見世通商店街" },
  { id: "p-7", name: "東京鐵塔", area: "東京鐵塔", category: "景點", nearestStation: "赤羽橋站", walkingTime: "5 分鐘", openingHours: "09:00-22:30", ticketRequired: true, reservationRequired: false, priority: "medium", plannedDate: "2026-06-26", note: "東京地標，6/26 彈性日可前往看夜景" },
  { id: "p-8", name: "海洋堂 Hobby Lobby 東京", area: "秋葉原", category: "商店", nearestStation: "秋葉原站", walkingTime: "4 分鐘", openingHours: "11:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-22", note: "動漫模型玩具公仔名店，無線電會館 5F" },
  { id: "p-9", name: "秋葉原無線電會館", area: "秋葉原", category: "百貨", nearestStation: "秋葉原站", walkingTime: "1 分鐘", openingHours: "10:00-20:00", ticketRequired: false, reservationRequired: false, priority: "high", plannedDate: "2026-06-22", note: "整棟動漫模型、卡牌商店，秋葉原站出站即達" },
  { id: "p-10", name: "BicCamera 秋葉原店", area: "秋葉原", category: "百貨", nearestStation: "秋葉原站", walkingTime: "3 分鐘", openingHours: "10:00-21:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-22", note: "大型連鎖電器商場，買相機、吹風機、保溫杯等" },
  { id: "p-11", name: "AURALEE TOKYO (青山總店)", area: "澀谷", category: "商店", nearestStation: "表參道站", walkingTime: "8 分鐘", openingHours: "12:00-20:00", ticketRequired: false, reservationRequired: false, priority: "high", plannedDate: "2026-06-23", note: "日本潮流高質感服飾品牌總店" },
  { id: "p-12", name: "澀谷 PARCO", area: "澀谷", category: "百貨", nearestStation: "澀谷站", walkingTime: "5 分鐘", openingHours: "11:00-21:00", ticketRequired: false, reservationRequired: false, priority: "high", plannedDate: "2026-06-23", note: "包含 Nintendo Tokyo, Pokemon Center, Capcom 及眾多潮流服飾" },
  { id: "p-13", name: "Stüssy Shibuya Chapter", area: "澀谷", category: "商店", nearestStation: "澀谷站", walkingTime: "7 分鐘", openingHours: "11:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-23", note: "美式街頭潮流品牌澀谷分店" },
  { id: "p-14", name: "10010 Minamiaoyama (南青山店)", area: "澀谷", category: "商店", nearestStation: "表參道站", walkingTime: "8 分鐘", openingHours: "12:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-23", note: "時尚設計師服飾選品店" },
  { id: "p-15", name: "A.PRESSE (南青山)", area: "澀谷", category: "商店", nearestStation: "表參道站", walkingTime: "12 分鐘", openingHours: "12:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-23", note: "精緻細節男裝服飾選品店" },
  { id: "p-16", name: "Graphpaper TOKYO", area: "澀谷", category: "商店", nearestStation: "代代木公園站 / 澀谷站", walkingTime: "9 分鐘", openingHours: "12:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-23", note: "簡約性冷淡風潮流服飾總部" },
  { id: "p-17", name: "Style Department", area: "澀谷", category: "商店", nearestStation: "澀谷站", walkingTime: "10 分鐘", openingHours: "12:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-23", note: "潮流精緻日常服飾選品店" },
  { id: "p-18", name: "伊勢丹新宿本館", area: "新宿", category: "百貨", nearestStation: "新宿三丁目站", walkingTime: "直通", openingHours: "10:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-26", note: "新宿代表性高級百貨大樓" },
  { id: "p-19", name: "AURALEE ISETAN SHINJUKU", area: "新宿", category: "商店", nearestStation: "新宿三丁目站", walkingTime: "直通", openingHours: "10:00-20:00", ticketRequired: false, reservationRequired: false, priority: "medium", plannedDate: "2026-06-26", note: "伊勢丹新宿本館 4F 專櫃" }
];

const DEFAULT_EXPENSES = [
  {
    id: "exp-1",
    date: "2026-05-15",
    itemName: "去程航班機票 (5人)",
    category: "機票",
    amount: 57220, // NT$ 11444 * 5
    currency: "TWD",
    payerId: "u-3", // 包
    splitType: "equal",
    participants: ["u-1", "u-2", "u-3", "u-4", "u-5"],
    customAmounts: {},
    paymentMethod: "信用卡",
    settlementStatus: "unsettled",
    note: "包代為線上刷卡付清，每人應分攤 NT$ 11,444"
  },
  {
    id: "exp-2",
    date: "2026-05-20",
    itemName: "Skyliner 機場快線去程套票 (5人)",
    category: "交通",
    amount: 4450, // NT$ 890 * 5
    currency: "TWD",
    payerId: "u-1", // 莊
    splitType: "equal",
    participants: ["u-1", "u-2", "u-3", "u-4", "u-5"],
    customAmounts: {},
    paymentMethod: "信用卡",
    settlementStatus: "unsettled",
    note: "莊代墊線上訂票，成田機場到京成上野站，每人應分攤 NT$ 890"
  },
  {
    id: "exp-3",
    date: "2026-05-10",
    itemName: "田端公寓式民宿 (5人, 5晚)",
    category: "住宿",
    amount: 35880, // NT$ (6226 + 950) * 5
    currency: "TWD",
    payerId: "u-2", // 陳
    splitType: "equal",
    participants: ["u-1", "u-2", "u-3", "u-4", "u-5"],
    customAmounts: {},
    paymentMethod: "信用卡",
    settlementStatus: "unsettled",
    note: "陳代刷 Airbnb 訂房費用，每人應分攤 NT$ 7,176"
  },
  {
    id: "exp-4",
    date: "2026-05-25",
    itemName: "Yoroniku 青山店燒肉訂位費",
    category: "餐飲",
    amount: 450, // NT$ 90 * 5
    currency: "TWD",
    payerId: "u-1", // 莊
    splitType: "equal",
    participants: ["u-1", "u-2", "u-3", "u-4", "u-5"],
    customAmounts: {},
    paymentMethod: "信用卡",
    settlementStatus: "unsettled",
    note: "莊線上代付預訂費，每人應分攤 NT$ 90"
  },
  {
    id: "exp-5",
    date: "2026-05-12",
    itemName: "富士山河口湖包車一日費用 (訂金+尾款)",
    category: "交通",
    amount: 9500, // NT$ 1900 * 5
    currency: "TWD",
    payerId: "u-2", // 陳
    splitType: "equal",
    participants: ["u-1", "u-2", "u-3", "u-4", "u-5"],
    customAmounts: {},
    paymentMethod: "信用卡",
    settlementStatus: "unsettled",
    note: "陳代付包車費用，每人應分攤 NT$ 1,900"
  },
  {
    id: "exp-6",
    date: "2026-06-22",
    itemName: "個人採購：秋葉原動漫模型 (陳)",
    category: "購物",
    amount: 8500,
    currency: "JPY",
    payerId: "u-2",
    splitType: "personal",
    participants: ["u-2"],
    customAmounts: {},
    paymentMethod: "現金",
    settlementStatus: "settled",
    note: "陳個人消費，不計入分帳項目"
  },
  {
    id: "exp-7",
    date: "2026-06-23",
    itemName: "個人採購：表參道潮流服飾 (賴)",
    category: "購物",
    amount: 3200,
    currency: "TWD",
    payerId: "u-4",
    splitType: "personal",
    participants: ["u-4"],
    customAmounts: {},
    paymentMethod: "信用卡",
    settlementStatus: "settled",
    note: "賴個人血拼服裝，自理"
  }
];

const DEFAULT_TODOS = [
  { id: "todo-1", title: "補齊三之輪飯店詳細資訊 (名稱、地址、入住密碼、總金額)", category: "住宿", priority: "high", ownerId: "u-2", status: "open", dueDate: "2026-06-15", note: "航班改期追加的最後一晚住宿，由陳負責與房東確認細節" },
  { id: "todo-2", title: "確認富士山一日包車司機聯絡方式、集合起點與確切時間", category: "交通", priority: "high", ownerId: "u-2", status: "open", dueDate: "2026-06-20", note: "陳需與包車公司確認司機的 LINE 或 WeChat 帳號" },
  { id: "todo-3", title: "購買回程 Skyliner (京成上野 → 成田) 票券或確認購票金額", category: "交通", priority: "high", ownerId: "u-1", status: "done", dueDate: "2026-06-25", note: "已購買並出票完成，費用已併入去程套票中" },
  { id: "todo-4", title: "訂購 Shibuya Sky 門票 (搶購 6/23 18:00 黃昏時段)", category: "景點", priority: "medium", ownerId: "u-1", status: "open", dueDate: "2026-06-01", note: "日本時間 6/1 00:00 (台灣 5/31 23:00) 開搶，莊負責上官網訂購" },
  { id: "todo-5", title: "確認同行 5 人中文姓名與護照代號 (分帳與票券預訂必備)", category: "其他", priority: "high", ownerId: "u-1", status: "done", dueDate: "2026-05-10", note: "已補齊 5 人代號：莊、陳、包、賴、李" },
  { id: "todo-6", title: "確認 6/26 彈性日的新宿、東京鐵塔或銀座行程內容與餐廳", category: "景點", priority: "medium", ownerId: "u-2", status: "done", dueDate: "2026-06-20", note: "行程已確定：東京車站地下街、東京鐵塔、銀座與新橋鷄繁晚餐。" },
  { id: "todo-7", title: "調查 6/27 退房後上野車站寄放行李之置物櫃位置與備選點", category: "住宿", priority: "medium", ownerId: "u-3", status: "open", dueDate: "2026-06-20", note: "上野站置物櫃容易客滿，包需上網搜尋是否有其他行李寄放服務 (如 Ecbo Cloak)" }
];

const DEFAULT_PACKING_ITEMS = [
  { id: "pack-1", name: "護照", category: "證件與重要文件", packed: false },
  { id: "pack-2", name: "Visit Japan 資料", category: "證件與重要文件", packed: false },
  { id: "pack-3", name: "eSIM / 網路確認", category: "證件與重要文件", packed: false },
  { id: "pack-4", name: "錢包", category: "金錢與支付", packed: false },
  { id: "pack-5", name: "日幣現金", category: "金錢與支付", packed: false },
  { id: "pack-6", name: "少量台幣", category: "金錢與支付", packed: false },
  { id: "pack-7", name: "手機", category: "電子用品", packed: false },
  { id: "pack-8", name: "行動電源（合乎標示 / Wh）", category: "電子用品", packed: false },
  { id: "pack-9", name: "充電器", category: "電子用品", packed: false },
  { id: "pack-10", name: "相機 / 底片機", category: "電子用品", packed: false },
  { id: "pack-11", name: "牙刷 / 牙膏", category: "個人盥洗用品", packed: false },
  { id: "pack-12", name: "洗面乳", category: "個人盥洗用品", packed: false },
  { id: "pack-13", name: "毛巾 / 手帕", category: "個人盥洗用品", packed: false },
  { id: "pack-14", name: "衛生紙 / 濕紙巾", category: "個人盥洗用品", packed: false },
  { id: "pack-15", name: "常備藥", category: "健康與日常用品", packed: false },
  { id: "pack-16", name: "水壺", category: "健康與日常用品", packed: false },
  { id: "pack-17", name: "環保袋", category: "健康與日常用品", packed: false }
];

const DEFAULT_SHOPPING_ITEMS = [
  { id: "shop-1", name: "EVE 止痛藥", category: "藥妝 / 保健類", packed: false },
  { id: "shop-2", name: "合利他命 EX Plus (幫長輩帶)", category: "藥妝 / 保健類", packed: false },
  { id: "shop-3", name: "吉伊卡哇玩偶 (Chiikawa)", category: "模型 / 玩具", packed: false },
  { id: "shop-4", name: "Dyson 吹風機", category: "電器 / 3C", packed: false },
  { id: "shop-5", name: "Uniqlo 特價服飾", category: "服飾 / 配件", packed: false },
  { id: "shop-6", name: "薯條三兄弟", category: "零食 / 伴手禮", packed: false },
  { id: "shop-7", name: "Saborino 早安面膜", category: "美妝 / 保養類", packed: false }
];

const DEFAULT_COUPONS = [
  {
    id: "coupon-1",
    store: "BicCamera",
    title: "10% 免稅 + 最多 7% 折價優惠券",
    expiry: "2026-08-31",
    image: "coupons/media__1780127639944.jpg"
  },
  {
    id: "coupon-2",
    store: "國民藥妝店 KoKuMiN",
    title: "10% 免稅 + 最多 8% 折價優惠券",
    expiry: "2026-12-31",
    image: "coupons/media__1780127639947.jpg"
  },
  {
    id: "coupon-3",
    store: "大國藥妝 Daikoku",
    title: "10% 免稅 + 最多 8% 折價優惠券",
    expiry: "2026-12-31",
    image: "coupons/media__1780127639952.jpg"
  },
  {
    id: "coupon-4",
    store: "尚都樂客 Sundrug",
    title: "10% 免稅 + 最多 7% 折價優惠券",
    expiry: "2026-12-31",
    image: "coupons/media__1780127639955.jpg"
  },
  {
    id: "coupon-5",
    store: "愛電王 EDION",
    title: "10% 免稅 + 最多 7% 折價優惠券",
    expiry: "2026-10-31",
    image: "coupons/media__1780127639989.jpg"
  }
];

const DEFAULT_TICKETS = [
  { id: "tk-1", title: "Skyliner 去程車票", owner: "全體", qrImage: "" }
];


// ==========================================================================
// 2. LocalStorage State Management Wrapper
// ==========================================================================

const STORAGE_KEY = "jp_travel_app_state_v7";

function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      // Ensure all fields exist
      if (parsed.users && parsed.itineraries && parsed.accommodations && parsed.transports && parsed.foods && parsed.places && parsed.expenses && parsed.todos) {
        let isModified = false;

        // Migrate packing items if missing
        if (!parsed.packingItems) {
          parsed.packingItems = DEFAULT_PACKING_ITEMS;
          isModified = true;
        }

        // Migrate shopping items and coupons if missing
        if (!parsed.shoppingItems) {
          parsed.shoppingItems = DEFAULT_SHOPPING_ITEMS;
          isModified = true;
        }
        if (!parsed.coupons) {
          parsed.coupons = DEFAULT_COUPONS;
          isModified = true;
        }

        // Reset tickets to 1 default ticket if version isn't migrated to v2 yet
        if (!parsed.ticketVersion || parsed.ticketVersion !== "v2") {
          parsed.tickets = DEFAULT_TICKETS;
          parsed.ticketVersion = "v2";
          isModified = true;
        }

        // Migrate return Skyliner to bought (0 additional cost, since it is a round-trip package)
        const returnSkyliner = parsed.transports.find(t => t.id === "tr-5");
        if (returnSkyliner && (returnSkyliner.ticketStatus !== "bought" || returnSkyliner.cost !== 0)) {
          returnSkyliner.ticketStatus = "bought";
          returnSkyliner.cost = 0;
          returnSkyliner.payer = "莊";
          returnSkyliner.note = "回程 Skyliner，已購票完成 (費用已包含在去程套票中)";
          isModified = true;
        }

        // Migrate Todo-3 to done
        const todo3 = parsed.todos.find(t => t.id === "todo-3");
        if (todo3 && (todo3.status !== "done" || !todo3.note.includes("併入去程"))) {
          todo3.status = "done";
          todo3.note = "已購買並出票完成，費用已併入去程套票中";
          isModified = true;
        }

        // Remove return Skyliner duplicate expense (exp-8) if present in state
        const exp8Index = parsed.expenses.findIndex(e => e.id === "exp-8");
        if (exp8Index !== -1) {
          parsed.expenses.splice(exp8Index, 1);
          isModified = true;
        }

        // Mark todo-6 as done since the itinerary is finalized
        const todo6 = parsed.todos.find(t => t.id === "todo-6");
        if (todo6 && todo6.status !== "done") {
          todo6.status = "done";
          todo6.note = "行程已確定：東京車站地下街、東京鐵塔、銀座與新橋鷄繁晚餐。";
          isModified = true;
        }

        // Migrate itineraries for June 25-26 changes
        if (!parsed.itineraryVersion || parsed.itineraryVersion !== "v3") {
          // Remove old iti-11 and iti-12
          parsed.itineraries = parsed.itineraries.filter(i => i.id !== "iti-11" && i.id !== "iti-12");
          
          // Check if the new items already exist to avoid duplicate adding
          const newIds = ["iti-11-1", "iti-11-2", "iti-11-3", "iti-12-1", "iti-12-2", "iti-12-3"];
          newIds.forEach(nid => {
            if (!parsed.itineraries.some(i => i.id === nid)) {
              const newIti = DEFAULT_ITINERARIES.find(i => i.id === nid);
              if (newIti) {
                parsed.itineraries.push(newIti);
              }
            }
          });
          
          parsed.itineraryVersion = "v3";
          isModified = true;
        }

        if (isModified) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }

        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse local storage state", e);
    }
  }

  // Fallback to default seed data
  const defaultState = {
    users: DEFAULT_USERS,
    itineraries: DEFAULT_ITINERARIES,
    accommodations: DEFAULT_ACCOMMODATIONS,
    transports: DEFAULT_TRANSPORTS,
    foods: DEFAULT_FOODS,
    places: DEFAULT_PLACES,
    expenses: DEFAULT_EXPENSES,
    todos: DEFAULT_TODOS,
    tickets: DEFAULT_TICKETS,
    packingItems: DEFAULT_PACKING_ITEMS,
    shoppingItems: DEFAULT_SHOPPING_ITEMS,
    coupons: DEFAULT_COUPONS,
    ticketVersion: "v2",
    exchangeRate: 0.21 // JPY to TWD
  };
  saveState(defaultState);
  return defaultState;
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Global active state object
let APP_STATE = loadState();


// ==========================================================================
// 3. Navigation & Router Controller
// ==========================================================================

function initNavigation() {
  const views = document.querySelectorAll(".view-panel");
  const navButtons = document.querySelectorAll("[data-view]");

  function switchView(viewId) {
    views.forEach(v => v.classList.remove("active"));
    const activeView = document.getElementById(`view-${viewId}`);
    if (activeView) {
      activeView.classList.add("active");
      // Scroll main content back to top
      document.querySelector(".view-viewport").scrollTop = 0;
    }

    // Toggle nav active state
    navButtons.forEach(btn => {
      if (btn.getAttribute("data-view") === viewId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Render corresponding pages
    renderPageData(viewId);
  }

  // Attach click handlers
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const viewId = btn.getAttribute("data-view");
      switchView(viewId);
      
      // If mobile more bottom sheet is active, close it
      const mobileSheet = document.getElementById("mobile-more-sheet");
      if (mobileSheet) mobileSheet.classList.remove("active");
    });
  });

  // Mobile 'More' bottom sheet toggler
  const mobMoreBtn = document.getElementById("btn-mob-more");
  const mobileSheet = document.getElementById("mobile-more-sheet");
  const closeSheetBtn = document.getElementById("btn-close-more-sheet");
  const backdrop = document.getElementById("mobile-more-backdrop");

  if (mobMoreBtn && mobileSheet) {
    mobMoreBtn.addEventListener("click", () => {
      mobileSheet.classList.add("active");
    });
  }

  const closeSheet = () => {
    if (mobileSheet) mobileSheet.classList.remove("active");
  };

  if (closeSheetBtn) closeSheetBtn.addEventListener("click", closeSheet);
  if (backdrop) backdrop.addEventListener("click", closeSheet);

  // Theme Toggle Logic
  const themeToggleD = document.getElementById("theme-toggle-desktop");
  const themeToggleM = document.getElementById("theme-toggle-mobile");
  
  // Set initial theme on load
  const savedTheme = localStorage.getItem("app-theme") || "system";
  setTheme(savedTheme);

  [themeToggleD, themeToggleM].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
      });
    }
  });

  // Redirect to initial hash or dashboard
  switchView("dashboard");
}

function setTheme(theme) {
  if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  localStorage.setItem("app-theme", theme);
}


// ==========================================================================
// 4. Render Pages Data Dynamically
// ==========================================================================

function renderPageData(viewId) {
  // Re-run icons library at end of render cycles
  const postRender = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  switch (viewId) {
    case "dashboard":
      renderDashboard();
      postRender();
      break;
    case "itinerary":
      renderItinerary();
      postRender();
      break;
    case "accommodations":
      renderAccommodations();
      postRender();
      break;
    case "transport":
      renderTransport();
      renderTickets();
      postRender();
      break;
    case "food":
      renderFood();
      postRender();
      break;
    case "places":
      renderPlaces();
      postRender();
      break;
    case "expenses":
      renderExpenses();
      postRender();
      break;
    case "settlements":
      renderSettlements();
      postRender();
      break;
    case "todos":
      renderTodos();
      postRender();
      break;
    case "packing":
      renderPackingList();
      postRender();
      break;
    case "shopping":
      renderShopping();
      postRender();
      break;
  }
}

// --------------------------------------------------------------------------
// 4.1 Dashboard Render Details
// --------------------------------------------------------------------------

function renderDashboard() {
  // Determine current day of travel based on current Date.
  // Travel date range is 2026-06-22 to 2026-06-28.
  const today = new Date();
  const travelStart = new Date("2026-06-22");
  const travelEnd = new Date("2026-06-28");
  
  let currentTargetDateStr = "2026-06-22"; // default preview day
  let dayNumLabel = "Day 1";
  
  // If system time falls inside travel dates, dynamically switch target date
  if (today >= travelStart && today <= travelEnd) {
    const timeDiff = today.getTime() - travelStart.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    dayNumLabel = `Day ${dayDiff}`;
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    currentTargetDateStr = `${year}-${month}-${day}`;
  }

  const formattedDateString = new Date(currentTargetDateStr).toLocaleDateString("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  document.getElementById("dash-today-meta").textContent = `${dayNumLabel} ｜ ${formattedDateString}`;

  // Today Itineraries Filtered
  const todayIti = APP_STATE.itineraries.filter(i => i.date === currentTargetDateStr);
  const todayTitleNode = document.getElementById("dash-today-title");
  const todayDescNode = document.getElementById("dash-today-desc");
  const todayDetailsNode = document.getElementById("dash-today-details");
  
  todayDetailsNode.innerHTML = "";

  if (todayIti.length > 0) {
    // Find highlights
    const mainStop = todayIti.find(i => i.category === "景點" || i.category === "餐廳") || todayIti[0];
    todayTitleNode.textContent = mainStop.title;
    todayDescNode.textContent = mainStop.locationName ? `今日目的地：${mainStop.locationName}` : mainStop.transportNote || "今日重點行程安排";

    // Summary pills
    const areas = [...new Set(todayIti.map(i => i.area).filter(a => a))];
    const categories = [...new Set(todayIti.map(i => i.category).filter(c => c))];

    if (areas.length > 0) {
      const areaItem = document.createElement("div");
      areaItem.className = "dash-detail-item";
      areaItem.innerHTML = `<i data-lucide="map-pin"></i> <span>地區: ${areas.join(", ")}</span>`;
      todayDetailsNode.appendChild(areaItem);
    }

    const countItem = document.createElement("div");
    countItem.className = "dash-detail-item";
    countItem.innerHTML = `<i data-lucide="calendar-check"></i> <span>行程共 ${todayIti.length} 筆</span>`;
    todayDetailsNode.appendChild(countItem);
  } else {
    todayTitleNode.textContent = "今日無固定安排";
    todayDescNode.textContent = "今天沒有排入特定行程，可以彈性散步購物或稍作休息！";
  }

  // Next steps logic (next flight or travel warnings)
  const nextStepNode = document.getElementById("dash-next-step");
  nextStepNode.innerHTML = "";

  // Get current travel status notes (find the next transportation booking or high priority event)
  const highPriorityItis = APP_STATE.itineraries.filter(i => i.priority === "high");
  if (highPriorityItis.length > 0) {
    const nextH = highPriorityItis[0];
    const noticeEl = document.createElement("div");
    noticeEl.className = "reminder-item";
    noticeEl.innerHTML = `
      <div class="reminder-time">${nextH.date} ${nextH.startTime || ""}</div>
      <div class="reminder-text">${nextH.title}</div>
      <div class="reminder-note" style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
        地標: ${nextH.locationName || nextH.area} ｜ ${nextH.note || ""}
      </div>
    `;
    nextStepNode.appendChild(noticeEl);
  }

  // Pre-booked lists
  const prebooksNode = document.getElementById("dash-prebooks");
  prebooksNode.innerHTML = "";
  
  // Booked restaurants or reserved places
  const bookedFoods = APP_STATE.foods.filter(f => f.reservationStatus === "confirmed");
  const bookedPlaces = APP_STATE.places.filter(p => p.reservationRequired && p.priority === "high");

  bookedFoods.slice(0, 3).forEach(f => {
    const dateObj = f.reservationTime ? new Date(f.reservationTime) : null;
    const timeStr = dateObj ? `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}` : "未定";
    
    const div = document.createElement("div");
    div.className = "prebook-item";
    div.innerHTML = `
      <div>
        <div class="prebook-name">${f.nameJp || f.nameEn}</div>
        <div class="prebook-meta">預約編號: ${f.reservationNumber || "無"} ｜ 人數: ${f.peopleCount}人</div>
      </div>
      <span class="badge badge-success">${timeStr}</span>
    `;
    prebooksNode.appendChild(div);
  });

  if (bookedFoods.length === 0) {
    prebooksNode.innerHTML = `<div class="empty-state-text" style="font-size:0.85rem;color:var(--text-muted);">目前無已確認的餐廳預約。</div>`;
  }

  // Today Lodging card
  const lodgingBox = document.getElementById("dash-lodging-box");
  lodgingBox.innerHTML = "";

  // find lodging that covers target preview date
  const dateCompare = new Date(currentTargetDateStr);
  const activeStay = APP_STATE.accommodations.find(acc => {
    const chkIn = new Date(acc.checkInDate);
    const chkOut = new Date(acc.checkOutDate);
    return dateCompare >= chkIn && dateCompare < chkOut;
  });

  if (activeStay) {
    lodgingBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
        <h4 style="font-weight:700; font-size:1.05rem;">${activeStay.name}</h4>
        <span class="badge badge-info">${activeStay.area}</span>
      </div>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:6px;">
        <i data-lucide="map-pin" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i>${activeStay.address}
      </p>
      <p style="font-size:0.8rem; color:var(--text-muted);">
        最近車站: ${activeStay.nearestStation} ｜ Payer: ${activeStay.payer}
      </p>
    `;
  } else {
    lodgingBox.innerHTML = `<div class="text-muted" style="font-size:0.85rem;">今日無指定住宿 (或已退房)。</div>`;
  }

  // Expenses totals
  calculateFinanceTotals();

  // Todo summaries
  const uncompletedTodos = APP_STATE.todos.filter(t => t.status !== "done");
  const highUncompleted = uncompletedTodos.filter(t => t.priority === "high");
  
  document.getElementById("dash-todo-high-count").textContent = `高優先待補: ${highUncompleted.length}`;
  document.getElementById("dash-todo-total-count").textContent = `未完成總計: ${uncompletedTodos.length}`;

  const todoMiniList = document.getElementById("dash-todo-mini");
  todoMiniList.innerHTML = "";

  uncompletedTodos.slice(0, 3).forEach(t => {
    const li = document.createElement("li");
    li.className = "todo-mini-item";
    const priorityIconColor = t.priority === "high" ? "text-danger" : t.priority === "medium" ? "text-warning" : "text-muted";
    li.innerHTML = `
      <i data-lucide="alert-circle" class="${priorityIconColor}"></i>
      <span class="todo-mini-text">${t.title}</span>
    `;
    todoMiniList.appendChild(li);
  });

  if (uncompletedTodos.length === 0) {
    todoMiniList.innerHTML = `<li class="todo-mini-item" style="color:var(--success);"><i data-lucide="check-circle" class="text-success"></i> 所有的待補事項均已解決！</li>`;
  }

  // Attach redirect click actions
  document.getElementById("dash-go-expenses").onclick = () => {
    document.querySelector('[data-view="expenses"]').click();
  };
  document.getElementById("dash-go-todos").onclick = () => {
    document.querySelector('[data-view="todos"]').click();
  };
}

function calculateFinanceTotals() {
  let sharedTwd = 0;
  let sharedJpy = 0;
  let personalTwd = 0;
  let personalJpy = 0;

  APP_STATE.expenses.forEach(exp => {
    const amt = Number(exp.amount) || 0;
    const isShared = exp.splitType !== "personal";

    if (exp.currency === "TWD") {
      if (isShared) sharedTwd += amt;
      else personalTwd += amt;
    } else if (exp.currency === "JPY") {
      if (isShared) sharedJpy += amt;
      else personalJpy += amt;
    }
  });

  const rate = APP_STATE.exchangeRate || 0.21;
  const avgSharedTwd = sharedTwd / 5;
  const avgSharedJpy = sharedJpy / 5;

  const combinedPersonalTwd = personalTwd + (personalJpy * rate) + avgSharedTwd;

  const dashTwd = document.getElementById("dash-total-twd");

  if (dashTwd) dashTwd.textContent = `NT$ ${Math.round(combinedPersonalTwd).toLocaleString()}`;
}

// --------------------------------------------------------------------------
// 4.2 Itinerary Page Render Details
// --------------------------------------------------------------------------

let SELECTED_ITINERARY_DATE = "2026-06-22";

function renderItinerary() {
  const dateTabsNode = document.getElementById("itinerary-date-tabs");
  dateTabsNode.innerHTML = "";

  // Date range list
  const dates = [
    { date: "2026-06-22", label: "Day 1", day: "一" },
    { date: "2026-06-23", label: "Day 2", day: "二" },
    { date: "2026-06-24", label: "Day 3", day: "三" },
    { date: "2026-06-25", label: "Day 4", day: "四" },
    { date: "2026-06-26", label: "Day 5", day: "五" },
    { date: "2026-06-27", label: "Day 6", day: "六" },
    { date: "2026-06-28", label: "Day 7", day: "日" }
  ];

  dates.forEach(d => {
    const tab = document.createElement("button");
    tab.className = `date-tab ${SELECTED_ITINERARY_DATE === d.date ? "active" : ""}`;
    tab.innerHTML = `
      <span class="date-tab-day">${d.label} (${d.day})</span>
      <span class="date-tab-num">${d.date.substring(8)}</span>
    `;
    tab.onclick = () => {
      SELECTED_ITINERARY_DATE = d.date;
      renderItinerary();
      if (window.lucide) window.lucide.createIcons();
    };
    dateTabsNode.appendChild(tab);
  });

  // Render Day Meta Overview
  const dayMetaBox = document.getElementById("itinerary-day-meta");
  dayMetaBox.innerHTML = "";

  // Get special notices
  let specialAlert = "";
  if (SELECTED_ITINERARY_DATE === "2026-06-22") {
    specialAlert = "抵達日！成田紅眼落地、行李寄存與秋葉原血拼。";
  } else if (SELECTED_ITINERARY_DATE === "2026-06-24") {
    specialAlert = "富士山一日遊！本日為包車行程，早晨 07:00 需出發，大月站集合。";
  } else if (SELECTED_ITINERARY_DATE === "2026-06-27") {
    specialAlert = "換宿日！早上退房寄存行李在上野，傍晚入住三之輪。";
  } else if (SELECTED_ITINERARY_DATE === "2026-06-28") {
    specialAlert = "回程返台日！航班為 17:40，下午 14:50 前必須抵達機場辦登機！";
  }

  const dateObj = new Date(SELECTED_ITINERARY_DATE);
  const weekdayStr = dateObj.toLocaleDateString("zh-TW", { weekday: "short" });
  const dayIndexLabel = dates.find(d => d.date === SELECTED_ITINERARY_DATE).label;

  dayMetaBox.innerHTML = `
    <div class="day-meta-header">
      <div class="day-meta-date">${dayIndexLabel} ｜ ${SELECTED_ITINERARY_DATE.substring(5)} (${weekdayStr})</div>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">日本東京・現地時區</p>
    </div>
    <div style="font-size:0.9rem; color:var(--text-secondary);">
      <div class="info-row" style="margin-bottom:8px;">
        <i data-lucide="sun"></i>
        <span>天氣預報: 東京 (陰轉晴, 22-26°C)</span>
      </div>
    </div>
    ${specialAlert ? `<div class="day-meta-alert-box">${specialAlert}</div>` : ""}
  `;

  // Render Timeline
  renderTimelineList();
}

function renderTimelineList() {
  const timelineContainer = document.getElementById("itinerary-timeline");
  timelineContainer.innerHTML = "";

  // Get active filter
  const activeFilterBtn = document.querySelector("#timeline-filters .filter-chip.active");
  const filterType = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";

  // Filter and Sort itinerary items
  let items = APP_STATE.itineraries.filter(i => i.date === SELECTED_ITINERARY_DATE);
  
  if (filterType !== "all") {
    items = items.filter(i => i.category === filterType);
  }

  // Sort by startTime (treat empty as afternoon/flexible/placeholder sorting at the end)
  items.sort((a, b) => {
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });

  if (items.length === 0) {
    timelineContainer.innerHTML = `
      <div class="empty-state-container">
        <i data-lucide="calendar-x"></i>
        <div class="empty-state-title">此分類無排定行程</div>
        <p class="empty-state-desc">你可以點擊右上角新增行程，或者選擇其他分類篩選項目。</p>
      </div>
    `;
    return;
  }

  // Category to Icon mapper
  const getCatIcon = (cat) => {
    switch (cat) {
      case "交通": return "train";
      case "餐廳": return "utensils";
      case "景點": return "map-pin";
      case "購物": return "shopping-bag";
      case "住宿": return "hotel";
      default: return "help-circle";
    }
  };

  items.forEach(item => {
    const itemWrapper = document.createElement("div");
    itemWrapper.className = "timeline-item-wrapper";

    // Set timeline node
    const iconName = getCatIcon(item.category);
    const nodeColor = item.priority === "high" ? "style='border-color:var(--danger)'" : "";
    const nodeHtml = `<div class="timeline-node" ${nodeColor}><i data-lucide="${iconName}"></i></div>`;

    // Timeline card contents
    const timeLabel = item.startTime ? (item.endTime ? `${item.startTime} - ${item.endTime}` : item.startTime) : "彈性時段";
    const flexTag = item.isFlexible ? `<span class="badge badge-primary">彈性備選</span>` : "";
    const priorityTag = item.priority === "high" ? `<span class="badge badge-danger">高優先</span>` : "";
    const resvTag = item.reservationStatus === "confirmed" ? `<span class="badge badge-success">已確認預約</span>` : (item.reservationStatus === "pending" ? `<span class="badge badge-warning">待預約</span>` : "");

    const mapButton = item.googleMapUrl ? `
      <a href="${item.googleMapUrl}" target="_blank" class="app-btn btn-secondary btn-sm">
        <i data-lucide="map"></i> 開啟地圖
      </a>
    ` : "";

    const backupBox = item.backupPlan ? `
      <div class="backup-plan-expander">
        <div class="backup-title">雨天/排隊備案：</div>
        <div>${item.backupPlan}</div>
      </div>
    ` : "";

    itemWrapper.innerHTML = `
      ${nodeHtml}
      <div class="timeline-card">
        <div class="timeline-card-time">${timeLabel}</div>
        <div class="timeline-card-main">
          <div class="timeline-card-header">
            <div>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
                <span class="badge badge-info">${item.category}</span>
                ${priorityTag}
                ${flexTag}
                ${resvTag}
              </div>
              <h4 class="timeline-card-title">${item.title}</h4>
              <div class="timeline-card-area">${item.area}</div>
            </div>
          </div>
          
          <div class="timeline-card-details">
            ${item.locationName ? `
              <div class="timeline-detail-row">
                <i data-lucide="map-pin"></i>
                <div class="detail-val"><strong>地點:</strong> ${item.locationName} ${item.address ? `(${item.address})` : ""}</div>
              </div>` : ""}
            ${item.transportNote ? `
              <div class="timeline-detail-row">
                <i data-lucide="navigation"></i>
                <div class="detail-val"><strong>交通:</strong> ${item.transportNote}</div>
              </div>` : ""}
            ${item.note ? `
              <div class="timeline-detail-row">
                <i data-lucide="info"></i>
                <div class="detail-val">${item.note}</div>
              </div>` : ""}
          </div>

          ${backupBox}

          <div class="timeline-card-actions">
            ${mapButton}
            <button class="app-btn btn-secondary btn-sm btn-edit-itinerary" data-id="${item.id}">
              <i data-lucide="edit"></i> 編輯
            </button>
            <button class="app-btn btn-danger btn-sm btn-delete-itinerary" data-id="${item.id}">
              <i data-lucide="trash-2"></i> 刪除
            </button>
          </div>
        </div>
      </div>
    `;

    timelineContainer.appendChild(itemWrapper);
  });

  // Attach timeline edit & delete button click handlers
  document.querySelectorAll(".btn-edit-itinerary").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openItineraryModal(id);
    };
  });

  document.querySelectorAll(".btn-delete-itinerary").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      if (confirm("您確定要刪除這筆行程嗎？")) {
        APP_STATE.itineraries = APP_STATE.itineraries.filter(i => i.id !== id);
        saveState(APP_STATE);
        renderTimelineList();
        if (window.lucide) window.lucide.createIcons();
      }
    };
  });
}

// Set itinerary filters click actions
document.querySelectorAll("#timeline-filters .filter-chip").forEach(chip => {
  chip.onclick = () => {
    document.querySelectorAll("#timeline-filters .filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderTimelineList();
    if (window.lucide) window.lucide.createIcons();
  };
});

// --------------------------------------------------------------------------
// 4.3 Accommodations Page Render Details
// --------------------------------------------------------------------------

function renderAccommodations() {
  const container = document.getElementById("accommodations-list");
  if (!container) return;
  container.innerHTML = "";

  APP_STATE.accommodations.forEach(acc => {
    const card = document.createElement("div");
    card.className = "lodging-card-box";

    // Show warnings if Minowa detail is empty / missing
    const hasDataGap = acc.address === "待確認" || acc.bookingPlatform === "待補";
    const statusTag = hasDataGap ? `<span class="badge badge-danger">缺詳細資料</span>` : `<span class="badge badge-success">預訂已完成</span>`;

    let storesListHtml = "";
    if (acc.nearbyStores && acc.nearbyStores.length > 0) {
      const listItems = acc.nearbyStores.map(s => `
        <li class="nearby-item">
          <span>${s.name} (${s.type})</span>
          <span style="color:var(--text-muted);">${s.distance}</span>
        </li>
      `).join("");
      storesListHtml = `
        <div class="nearby-stores-box">
          <div class="nearby-stores-title">周邊生活機能：</div>
          <ul class="nearby-stores-list">${listItems}</ul>
        </div>
      `;
    }

    const mapBtn = acc.address !== "待確認" ? `
      <a href="https://maps.google.com/?q=${encodeURIComponent(acc.address)}" target="_blank" class="app-btn btn-secondary btn-sm">
        <i data-lucide="map"></i> 開啟地圖
      </a>
    ` : "";

    card.innerHTML = `
      <div class="stay-card-header">
        <div>
          <h3 class="stay-title">${acc.name}</h3>
          <span class="stay-dates">${acc.checkInDate} 入住 ｜ ${acc.checkOutDate} 退房</span>
        </div>
        ${statusTag}
      </div>

      <div class="info-rows">
        <div class="info-row">
          <i data-lucide="map-pin"></i>
          <span class="info-row-label">地址:</span>
          <span class="info-row-val">${acc.address}</span>
        </div>
        <div class="info-row">
          <i data-lucide="train"></i>
          <span class="info-row-label">最近車站:</span>
          <span class="info-row-val">${acc.nearestStation}</span>
        </div>
        <div class="info-row">
          <i data-lucide="clock"></i>
          <span class="info-row-label">入住/退房:</span>
          <span class="info-row-val">Check in: ${acc.checkInTime} / Check out: ${acc.checkOutTime}</span>
        </div>
        <div class="info-row">
          <i data-lucide="ticket"></i>
          <span class="info-row-label">訂房資訊:</span>
          <span class="info-row-val">平台: ${acc.bookingPlatform} ｜ 訂單編號: ${acc.bookingNumber}</span>
        </div>
        <div class="info-row">
          <i data-lucide="dollar-sign"></i>
          <span class="info-row-label">費用分攤:</span>
          <span class="info-row-val">付款: ${acc.payer} ｜ 總額: NT$ ${acc.totalAmount.toLocaleString()} ｜ 每人: NT$ ${acc.perPersonAmount.toLocaleString()}</span>
        </div>
        <div class="info-row">
          <i data-lucide="luggage"></i>
          <span class="info-row-label">行李寄存:</span>
          <span class="info-row-val">${acc.luggageNote}</span>
        </div>
        ${acc.note ? `
        <div class="info-row">
          <i data-lucide="info"></i>
          <span class="info-row-label">備註:</span>
          <span class="info-row-val">${acc.note}</span>
        </div>` : ""}
      </div>

      ${storesListHtml}

      <div class="stay-card-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${mapBtn}
        <button class="app-btn btn-secondary btn-sm btn-edit-accommodation" data-id="${acc.id}">
          <i data-lucide="edit-2"></i> 編輯
        </button>
        <button class="app-btn btn-danger btn-sm btn-delete-accommodation" data-id="${acc.id}">
          <i data-lucide="trash"></i> 刪除
        </button>
        <button class="app-btn btn-secondary btn-sm" onclick="openTodoModalForAccommodation('${acc.name}')">
          <i data-lucide="check-square"></i> 更新缺漏
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach click handlers
  container.querySelectorAll(".btn-edit-accommodation").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openAccommodationModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-accommodation").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      deleteAccommodation(id);
    };
  });
}

function openTodoModalForAccommodation(accName) {
  // Jump straight to todos tab and open create modal
  document.querySelector('[data-view="todos"]').click();
  openTodoModal(null);
  document.getElementById("todo-title").value = `補齊 [${accName}] 住宿缺漏資訊 (飯店名稱、詳細地址、金額金額)`;
  document.getElementById("todo-category").value = "住宿";
  document.getElementById("todo-priority").value = "high";
}

function openAccommodationModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-accommodation");
  if (!modal) return;
  modal.classList.add("active");

  const form = document.getElementById("form-accommodation");
  form.reset();

  const titleNode = document.getElementById("accommodation-modal-title");
  const idInput = document.getElementById("accommodation-id-input");

  if (id) {
    titleNode.textContent = "編輯住宿明細";
    idInput.value = id;

    const acc = APP_STATE.accommodations.find(item => item.id === id);
    if (acc) {
      document.getElementById("acc-modal-name").value = acc.name;
      document.getElementById("acc-modal-area").value = acc.area;
      document.getElementById("acc-modal-platform").value = acc.bookingPlatform || "";
      document.getElementById("acc-modal-checkin-date").value = acc.checkInDate;
      document.getElementById("acc-modal-checkout-date").value = acc.checkOutDate;
      document.getElementById("acc-modal-checkin-time").value = acc.checkInTime || "";
      document.getElementById("acc-modal-checkout-time").value = acc.checkOutTime || "";
      document.getElementById("acc-modal-address").value = acc.address || "";
      document.getElementById("acc-modal-station").value = acc.nearestStation || "";
      document.getElementById("acc-modal-booking-no").value = acc.bookingNumber || "";
      document.getElementById("acc-modal-payer-select").value = acc.payer || "待補";
      document.getElementById("acc-modal-total-amt").value = acc.totalAmount || 0;
      document.getElementById("acc-modal-per-person").value = acc.perPersonAmount || 0;
      document.getElementById("acc-modal-luggage").value = acc.luggageNote || "";
      document.getElementById("acc-modal-note").value = acc.note || "";
    }
  } else {
    titleNode.textContent = "新增住宿項目";
    idInput.value = "";
    document.getElementById("acc-modal-checkin-date").value = "2026-06-22";
    document.getElementById("acc-modal-checkout-date").value = "2026-06-27";
    document.getElementById("acc-modal-payer-select").value = "待補";
    document.getElementById("acc-modal-total-amt").value = 0;
    document.getElementById("acc-modal-per-person").value = 0;
  }
}

function onAccommodationFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("accommodation-id-input").value;
  const name = document.getElementById("acc-modal-name").value;
  const area = document.getElementById("acc-modal-area").value;
  const bookingPlatform = document.getElementById("acc-modal-platform").value;
  const checkInDate = document.getElementById("acc-modal-checkin-date").value;
  const checkOutDate = document.getElementById("acc-modal-checkout-date").value;
  const checkInTime = document.getElementById("acc-modal-checkin-time").value;
  const checkOutTime = document.getElementById("acc-modal-checkout-time").value;
  const address = document.getElementById("acc-modal-address").value;
  const nearestStation = document.getElementById("acc-modal-station").value;
  const bookingNumber = document.getElementById("acc-modal-booking-no").value;
  const payer = document.getElementById("acc-modal-payer-select").value;
  const totalAmount = Number(document.getElementById("acc-modal-total-amt").value) || 0;
  const perPersonAmount = Number(document.getElementById("acc-modal-per-person").value) || 0;
  const luggageNote = document.getElementById("acc-modal-luggage").value;
  const note = document.getElementById("acc-modal-note").value;

  // Keep existing nearbyStores array if modifying, else empty array
  let nearbyStores = [];
  if (id) {
    const existing = APP_STATE.accommodations.find(item => item.id === id);
    if (existing && existing.nearbyStores) {
      nearbyStores = existing.nearbyStores;
    }
  }

  const accommodationItem = {
    id: id || `acc-${Date.now()}`,
    name,
    area,
    nearestStation,
    checkInDate,
    checkOutDate,
    checkInTime,
    checkOutTime,
    address,
    bookingPlatform,
    bookingNumber,
    payer,
    totalAmount,
    perPersonAmount,
    luggageNote,
    note,
    nearbyStores
  };

  if (id) {
    const idx = APP_STATE.accommodations.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.accommodations[idx] = accommodationItem;
  } else {
    APP_STATE.accommodations.push(accommodationItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderAccommodations();
  if (window.lucide) window.lucide.createIcons();
}

function deleteAccommodation(id) {
  const acc = APP_STATE.accommodations.find(item => item.id === id);
  if (!acc) return;

  if (confirm(`確定要刪除「${acc.name}」的住宿項目嗎？`)) {
    APP_STATE.accommodations = APP_STATE.accommodations.filter(item => item.id !== id);
    saveState(APP_STATE);
    renderAccommodations();
    if (window.lucide) window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// 4.4 Transportation Page Render Details
// --------------------------------------------------------------------------

function renderTransport() {
  const container = document.getElementById("transport-list");
  if (!container) return;
  container.innerHTML = "";

  APP_STATE.transports.forEach(tr => {
    const card = document.createElement("div");
    card.className = "transport-card-box";

    let ticketClass = "badge-muted";
    let ticketText = "未預訂";
    if (tr.ticketStatus === "bought") {
      ticketClass = "badge-success";
      ticketText = "已購買/已出票";
    } else if (tr.ticketStatus === "onsite") {
      ticketClass = "badge-info";
      ticketText = "現場購買/刷IC卡";
    } else if (tr.ticketStatus === "not_bought") {
      ticketClass = "badge-danger";
      ticketText = "未購買(高風險)";
    }

    card.innerHTML = `
      <div class="stay-card-header">
        <div>
          <span class="badge badge-primary">${tr.type}</span>
          <h3 class="stay-title" style="margin-top:4px;">${tr.departureLocation} → ${tr.arrivalLocation}</h3>
          <span class="stay-dates">搭乘日期: ${tr.date}</span>
        </div>
        <span class="badge ${ticketClass}">${ticketText}</span>
      </div>

      <div class="info-rows">
        <div class="info-row">
          <i data-lucide="clock"></i>
          <span class="info-row-label">出發/抵達:</span>
          <span class="info-row-val"><strong>${tr.departureTime}</strong> 出發 ｜ <strong>${tr.arrivalTime}</strong> 抵達</span>
        </div>
        <div class="info-row">
          <i data-lucide="navigation"></i>
          <span class="info-row-label">搭乘路線:</span>
          <span class="info-row-val">${tr.route}</span>
        </div>
        <div class="info-row">
          <i data-lucide="dollar-sign"></i>
          <span class="info-row-label">費用記錄:</span>
          <span class="info-row-val">${tr.cost > 0 ? `NT$ ${tr.cost.toLocaleString()} (付款人: ${tr.payer})` : "預估現場支付或個人自理"}</span>
        </div>
        ${tr.note ? `
        <div class="info-row">
          <i data-lucide="info"></i>
          <span class="info-row-label">提醒備註:</span>
          <span class="info-row-val">${tr.note}</span>
        </div>` : ""}
      </div>

      <div class="stay-card-actions" style="display: flex; gap: 8px;">
        <button class="app-btn btn-secondary btn-sm btn-edit-transport" data-id="${tr.id}">
          <i data-lucide="edit-2"></i> 編輯
        </button>
        <button class="app-btn btn-danger btn-sm btn-delete-transport" data-id="${tr.id}">
          <i data-lucide="trash"></i> 刪除
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach click handlers
  container.querySelectorAll(".btn-edit-transport").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openTransportModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-transport").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      deleteTransport(id);
    };
  });
}

function openTransportModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-transport");
  if (!modal) return;
  modal.classList.add("active");

  const form = document.getElementById("form-transport");
  form.reset();

  const titleNode = document.getElementById("transport-modal-title");
  const idInput = document.getElementById("transport-id-input");

  if (id) {
    titleNode.textContent = "編輯交通明細";
    idInput.value = id;

    const tr = APP_STATE.transports.find(item => item.id === id);
    if (tr) {
      document.getElementById("tr-modal-date").value = tr.date;
      document.getElementById("tr-modal-type").value = tr.type;
      document.getElementById("tr-modal-dep-loc").value = tr.departureLocation;
      document.getElementById("tr-modal-arr-loc").value = tr.arrivalLocation;
      document.getElementById("tr-modal-dep-time").value = tr.departureTime;
      document.getElementById("tr-modal-arr-time").value = tr.arrivalTime;
      document.getElementById("tr-modal-route").value = tr.route;
      document.getElementById("tr-modal-status").value = tr.ticketStatus;
      document.getElementById("tr-modal-payer-select").value = tr.payer || "待補";
      document.getElementById("tr-modal-cost").value = tr.cost || 0;
      document.getElementById("tr-modal-note").value = tr.note || "";
    }
  } else {
    titleNode.textContent = "新增交通明細";
    idInput.value = "";
    document.getElementById("tr-modal-date").value = "2026-06-22"; // Start of Tokyo trip
    document.getElementById("tr-modal-status").value = "bought";
    document.getElementById("tr-modal-payer-select").value = "待補";
    document.getElementById("tr-modal-cost").value = 0;
  }
}

function onTransportFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("transport-id-input").value;
  const date = document.getElementById("tr-modal-date").value;
  const type = document.getElementById("tr-modal-type").value;
  const departureLocation = document.getElementById("tr-modal-dep-loc").value;
  const arrivalLocation = document.getElementById("tr-modal-arr-loc").value;
  const departureTime = document.getElementById("tr-modal-dep-time").value;
  const arrivalTime = document.getElementById("tr-modal-arr-time").value;
  const route = document.getElementById("tr-modal-route").value;
  const ticketStatus = document.getElementById("tr-modal-status").value;
  const payer = document.getElementById("tr-modal-payer-select").value;
  const cost = Number(document.getElementById("tr-modal-cost").value) || 0;
  const note = document.getElementById("tr-modal-note").value;

  const transportItem = {
    id: id || `tr-${Date.now()}`,
    date,
    type,
    departureLocation,
    arrivalLocation,
    departureTime,
    arrivalTime,
    route,
    ticketStatus,
    payer,
    cost,
    note
  };

  if (id) {
    const idx = APP_STATE.transports.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.transports[idx] = transportItem;
  } else {
    APP_STATE.transports.push(transportItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderTransport();
  if (window.lucide) window.lucide.createIcons();
}

function deleteTransport(id) {
  const tr = APP_STATE.transports.find(item => item.id === id);
  if (!tr) return;

  if (confirm(`確定要刪除從「${tr.departureLocation}」到「${tr.arrivalLocation}」的交通項目嗎？`)) {
    APP_STATE.transports = APP_STATE.transports.filter(item => item.id !== id);
    saveState(APP_STATE);
    renderTransport();
    if (window.lucide) window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// 4.4.2 Ticket Wallet Render Details
// --------------------------------------------------------------------------

function renderTickets() {
  const container = document.getElementById("tickets-list");
  if (!container) return;
  container.innerHTML = "";

  if (!APP_STATE.tickets) {
    APP_STATE.tickets = DEFAULT_TICKETS;
    saveState(APP_STATE);
  }

  APP_STATE.tickets.forEach(tk => {
    const card = document.createElement("div");
    card.className = "ticket-card";

    let qrContent = "";
    if (tk.qrImage) {
      // If there is an uploaded base64 image
      qrContent = `<img class="ticket-qr-img" src="${tk.qrImage}" alt="QR Code" onclick="zoomTicketQR('${tk.title} (${tk.owner})', '${tk.qrImage}')">`;
    } else {
      // Show upload placeholder
      qrContent = `
        <div class="ticket-qr-placeholder" onclick="document.getElementById('input-file-${tk.id}').click()">
          <i data-lucide="qr-code"></i>
          <span style="font-size:0.8rem; font-weight:500;">點擊上傳 QR Code</span>
          <span style="font-size:0.7rem; color:var(--text-muted);">或選下方按鈕選擇</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="ticket-card-header">
        <div style="display: flex; flex-direction: column; gap: 4px; max-width: 70%;">
          <span class="ticket-title" style="word-break: break-all;">${tk.title}</span>
          <span class="ticket-owner-badge" style="align-self: flex-start;">${tk.owner}</span>
        </div>
        <div style="display: flex; gap: 4px; align-self: flex-start;">
          <button class="app-btn btn-secondary btn-sm btn-edit-ticket" data-id="${tk.id}" title="編輯名稱/所有人" style="padding: 4px 8px; font-size: 0.75rem; height: auto;">
            <i data-lucide="edit-2" style="width: 12px; height: 12px;"></i>
          </button>
          <button class="app-btn btn-danger btn-sm btn-delete-ticket" data-id="${tk.id}" title="刪除票卡" style="padding: 4px 8px; font-size: 0.75rem; height: auto;">
            <i data-lucide="trash" style="width: 12px; height: 12px;"></i>
          </button>
        </div>
      </div>
      <div class="ticket-qr-container">
        ${qrContent}
      </div>
      <div class="ticket-card-footer">
        <div class="ticket-upload-btn">
          <button class="app-btn btn-secondary btn-sm" style="width:100%;">
            <i data-lucide="upload"></i> ${tk.qrImage ? "重新上傳" : "上傳車票"}
          </button>
          <input type="file" id="input-file-${tk.id}" accept="image/*" onchange="handleTicketUpload(event, '${tk.id}')">
        </div>
        ${tk.qrImage ? `
          <button class="app-btn btn-danger btn-sm" onclick="clearTicketQR('${tk.id}')" title="清除圖片">
            <i data-lucide="trash-2"></i>
          </button>
        ` : ""}
      </div>
    `;

    container.appendChild(card);
  });

  // Attach edit & delete click handlers
  container.querySelectorAll(".btn-edit-ticket").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openTicketModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-ticket").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      deleteTicket(id);
    };
  });
}

function openTicketModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-ticket");
  if (!modal) return;
  modal.classList.add("active");

  const form = document.getElementById("form-ticket");
  form.reset();

  const titleNode = document.getElementById("ticket-modal-title");
  const idInput = document.getElementById("ticket-id-input");

  if (id) {
    titleNode.textContent = "編輯票卡資訊";
    idInput.value = id;

    const tk = APP_STATE.tickets.find(item => item.id === id);
    if (tk) {
      document.getElementById("tk-modal-title").value = tk.title;
      document.getElementById("tk-modal-owner").value = tk.owner;
    }
  } else {
    titleNode.textContent = "新增電子票卡";
    idInput.value = "";
    document.getElementById("tk-modal-owner").value = "全體";
  }
}

function onTicketFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("ticket-id-input").value;
  const title = document.getElementById("tk-modal-title").value;
  const owner = document.getElementById("tk-modal-owner").value;

  if (id) {
    // Edit mode
    const tk = APP_STATE.tickets.find(item => item.id === id);
    if (tk) {
      tk.title = title;
      tk.owner = owner;
    }
  } else {
    // Add mode
    const newTk = {
      id: `tk-${Date.now()}`,
      title: title,
      owner: owner,
      qrImage: ""
    };
    APP_STATE.tickets.push(newTk);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderTickets();
  if (window.lucide) window.lucide.createIcons();
}

function deleteTicket(id) {
  const tk = APP_STATE.tickets.find(item => item.id === id);
  if (!tk) return;

  if (confirm(`確定要刪除「${tk.title} (${tk.owner})」這個票卡嗎？將會永久移除該票卡及裡面的 QR Code。`)) {
    APP_STATE.tickets = APP_STATE.tickets.filter(item => item.id !== id);
    saveState(APP_STATE);
    renderTickets();
    if (window.lucide) window.lucide.createIcons();
  }
}

function handleTicketUpload(event, ticketId) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file is indeed an image
  if (!file.type.startsWith("image/")) {
    alert("請選擇圖片格式的檔案！");
    return;
  }

  // Compress the image before saving to localStorage to prevent exceeding 5MB quota
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Use canvas to compress the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Max size for QR code image (400x400 is plenty of resolution for scanner)
      const maxDim = 400;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed jpeg base64
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // 70% quality is very clean for QR

      // Save to state
      const ticket = APP_STATE.tickets.find(t => t.id === ticketId);
      if (ticket) {
        ticket.qrImage = compressedDataUrl;
        saveState(APP_STATE);
        renderTickets();
        if (window.lucide) window.lucide.createIcons();
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clearTicketQR(ticketId) {
  if (confirm("確定要清除這張車票的 QR Code 嗎？")) {
    const ticket = APP_STATE.tickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.qrImage = "";
      saveState(APP_STATE);
      renderTickets();
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

function zoomTicketQR(title, imgUrl) {
  const lightbox = document.getElementById("modal-ticket-lightbox");
  const titleNode = document.getElementById("lightbox-ticket-title");
  const imgNode = document.getElementById("lightbox-ticket-img");

  if (lightbox && titleNode && imgNode) {
    titleNode.textContent = title;
    imgNode.src = imgUrl;
    lightbox.classList.add("active");
  }
}

function initTicketLightbox() {
  const lightbox = document.getElementById("modal-ticket-lightbox");
  const closeBtn = document.getElementById("btn-close-lightbox");
  const backdrop = document.getElementById("ticket-lightbox-backdrop");

  const closeLightbox = () => {
    if (lightbox) lightbox.classList.remove("active");
  };

  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (backdrop) backdrop.onclick = closeLightbox;
}

// --------------------------------------------------------------------------
// 4.5 Food Page Render Details
// --------------------------------------------------------------------------

let SELECTED_FOOD_AREA = "all";
let SELECTED_FOOD_CAT = "all";

function renderFood() {
  // Area Filter chips
  const areaFilterNode = document.getElementById("food-area-filters");
  areaFilterNode.innerHTML = "";
  
  const allAreas = ["all", ...new Set(APP_STATE.foods.map(f => f.area).filter(a => a))];
  allAreas.forEach(area => {
    const chip = document.createElement("button");
    chip.className = `filter-chip ${SELECTED_FOOD_AREA === area ? "active" : ""}`;
    chip.textContent = area === "all" ? "全部地區" : area;
    chip.onclick = () => {
      SELECTED_FOOD_AREA = area;
      renderFood();
      if (window.lucide) window.lucide.createIcons();
    };
    areaFilterNode.appendChild(chip);
  });

  // Category Filter chips
  const catFilterNode = document.getElementById("food-category-filters");
  catFilterNode.innerHTML = "";
  
  const allCats = ["all", ...new Set(APP_STATE.foods.map(f => f.category).filter(c => c))];
  allCats.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = `filter-chip ${SELECTED_FOOD_CAT === cat ? "active" : ""}`;
    chip.textContent = cat === "all" ? "全部類別" : cat;
    chip.onclick = () => {
      SELECTED_FOOD_CAT = cat;
      renderFood();
      if (window.lucide) window.lucide.createIcons();
    };
    catFilterNode.appendChild(chip);
  });

  // Filter lists
  let list = APP_STATE.foods;
  if (SELECTED_FOOD_AREA !== "all") {
    list = list.filter(f => f.area === SELECTED_FOOD_AREA);
  }
  if (SELECTED_FOOD_CAT !== "all") {
    list = list.filter(f => f.category === SELECTED_FOOD_CAT);
  }

  // Pre-booked lists
  const bookedContainer = document.getElementById("food-booked-list");
  bookedContainer.innerHTML = "";
  
  const bookedItems = list.filter(f => f.reservationStatus === "confirmed");
  bookedItems.forEach(f => {
    const dateObj = f.reservationTime ? new Date(f.reservationTime) : null;
    const timeStr = dateObj ? `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${["日","一","二","三","四","五","六"][dateObj.getDay()]}) ${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}` : "未定";

    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-card-header">
        <div>
          <h4 class="food-card-title">${f.nameEn}</h4>
          <p class="food-card-jp">${f.nameJp || ""}</p>
        </div>
        <span class="badge badge-success">已確認訂位</span>
      </div>

      <div class="food-card-details">
        <div><strong>預約時間:</strong> <span class="text-primary" style="font-weight:700;">${timeStr}</span></div>
        <div><strong>訂位編號:</strong> <code style="font-weight:700; background:var(--surface-soft); padding:2px 6px; border-radius:4px;">${f.reservationNumber || "無"}</code></div>
        <div><strong>人數安排:</strong> ${f.peopleCount} 人份</div>
        <div><strong>預估預算:</strong> 每人約 ¥${f.estimatedBudget ? f.estimatedBudget.toLocaleString() : "無"}</div>
        <div><strong>最近車站:</strong> ${f.nearestStation} ｜ 步行 ${f.walkingTime || "無"}</div>
        <div><strong>重要備註:</strong> ${f.note || "無"}</div>
      </div>

      <div class="food-card-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <a href="${f.googleMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((f.nameJp || f.nameEn) + ' Tokyo')}`}" target="_blank" class="app-btn btn-secondary btn-sm">
          <i data-lucide="map"></i> 開啟地圖
        </a>
        <button class="app-btn btn-secondary btn-sm" onclick="openExpenseFormForFood('${f.nameEn}', ${f.estimatedBudget || 0})">
          <i data-lucide="wallet"></i> 記錄此筆支出
        </button>
        <button class="app-btn btn-secondary btn-sm btn-edit-food" data-id="${f.id}">
          <i data-lucide="edit-2"></i> 編輯
        </button>
        <button class="app-btn btn-danger btn-sm btn-delete-food" data-id="${f.id}">
          <i data-lucide="trash"></i> 刪除
        </button>
      </div>
    `;
    bookedContainer.appendChild(card);
  });

  if (bookedItems.length === 0) {
    bookedContainer.innerHTML = `<div class="empty-state-text" style="color:var(--text-muted); padding:12px;">此篩選條件下無已訂位餐廳。</div>`;
  }

  // Backup list
  const backupContainer = document.getElementById("food-backup-list");
  backupContainer.innerHTML = "";
  
  const backupItems = list.filter(f => f.reservationStatus !== "confirmed");
  backupItems.forEach(f => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-card-header">
        <div>
          <h4 class="food-card-title">${f.nameEn}</h4>
          <p class="food-card-jp">${f.nameJp || ""}</p>
        </div>
        <span class="badge badge-muted">${f.area}</span>
      </div>

      <div class="food-card-details">
        <div><strong>分類:</strong> ${f.category}</div>
        <div><strong>地標:</strong> ${f.nearestStation || "無"} ${f.walkingTime ? `(步行 ${f.walkingTime})` : ""}</div>
        <div><strong>備註:</strong> ${f.note || "無"}</div>
      </div>

      <div class="food-card-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <a href="${f.googleMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((f.nameJp || f.nameEn) + ' Tokyo')}`}" target="_blank" class="app-btn btn-secondary btn-sm">
          <i data-lucide="map"></i> 開啟地圖
        </a>
        <button class="app-btn btn-secondary btn-sm btn-edit-food" data-id="${f.id}">
          <i data-lucide="edit-2"></i> 編輯
        </button>
        <button class="app-btn btn-danger btn-sm btn-delete-food" data-id="${f.id}">
          <i data-lucide="trash"></i> 刪除
        </button>
      </div>
    `;
    backupContainer.appendChild(card);
  });

  if (backupItems.length === 0) {
    backupContainer.innerHTML = `<div class="empty-state-text" style="color:var(--text-muted); padding:12px;">此篩選條件下無備選餐廳。</div>`;
  }

  // Attach edit & delete click handlers for food
  document.querySelectorAll(".btn-edit-food").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openFoodModal(id);
    };
  });

  document.querySelectorAll(".btn-delete-food").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      deleteFood(id);
    };
  });
}

function openExpenseFormForFood(foodName, estimatedJpy) {
  document.querySelector('[data-view="expenses"]').click();
  openExpenseModal(null);
  document.getElementById("exp-item-name").value = `${foodName} 餐飲費`;
  document.getElementById("exp-category").value = "餐飲";
  document.getElementById("exp-currency").value = "JPY";
  if (estimatedJpy > 0) {
    // Fill total budget
    document.getElementById("exp-amount").value = estimatedJpy * 5; 
  }
}

function openFoodModal(id, defaultStatus = 'none') {
  closeAllModals();
  const modal = document.getElementById("modal-food");
  if (!modal) return;
  modal.classList.add("active");

  const form = document.getElementById("form-food");
  form.reset();

  const titleNode = document.getElementById("food-modal-title");
  const idInput = document.getElementById("food-id-input");

  if (id) {
    titleNode.textContent = "編輯餐廳項目";
    idInput.value = id;

    const f = APP_STATE.foods.find(item => item.id === id);
    if (f) {
      document.getElementById("fd-modal-name-en").value = f.nameEn;
      document.getElementById("fd-modal-name-jp").value = f.nameJp || "";
      document.getElementById("fd-modal-area").value = f.area;
      document.getElementById("fd-modal-category").value = f.category;
      document.getElementById("fd-modal-station").value = f.nearestStation || "";
      document.getElementById("fd-modal-walking").value = f.walkingTime || "";
      document.getElementById("fd-modal-resv-status").value = f.reservationStatus || "none";
      document.getElementById("fd-modal-budget").value = f.estimatedBudget || "";
      document.getElementById("fd-modal-mapurl").value = f.googleMapUrl || "";
      document.getElementById("fd-modal-note").value = f.note || "";
      
      if (f.reservationTime) {
        const dateVal = f.reservationTime.substring(0, 16);
        document.getElementById("fd-modal-resv-time").value = dateVal;
      } else {
        document.getElementById("fd-modal-resv-time").value = "";
      }
      
      document.getElementById("fd-modal-resv-no").value = f.reservationNumber || "";
      document.getElementById("fd-modal-people").value = f.peopleCount || "";
    }
  } else {
    titleNode.textContent = defaultStatus === 'confirmed' ? "新增已預約餐廳" : "新增備選餐廳";
    idInput.value = "";
    document.getElementById("fd-modal-resv-status").value = defaultStatus;
  }
  
  toggleFoodResvFieldsVisibility();
}

function onFoodFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("food-id-input").value;
  const nameEn = document.getElementById("fd-modal-name-en").value;
  const nameJp = document.getElementById("fd-modal-name-jp").value;
  const area = document.getElementById("fd-modal-area").value;
  const category = document.getElementById("fd-modal-category").value;
  const nearestStation = document.getElementById("fd-modal-station").value;
  const walkingTime = document.getElementById("fd-modal-walking").value;
  const reservationStatus = document.getElementById("fd-modal-resv-status").value;
  const estimatedBudget = Number(document.getElementById("fd-modal-budget").value) || undefined;
  const googleMapUrl = document.getElementById("fd-modal-mapurl").value;
  const note = document.getElementById("fd-modal-note").value;

  let reservationTime = undefined;
  let reservationNumber = undefined;
  let peopleCount = undefined;
  
  if (reservationStatus === "confirmed" || reservationStatus === "pending") {
    const rawTime = document.getElementById("fd-modal-resv-time").value;
    if (rawTime) {
      reservationTime = rawTime;
    }
    reservationNumber = document.getElementById("fd-modal-resv-no").value || undefined;
    peopleCount = Number(document.getElementById("fd-modal-people").value) || undefined;
  }

  const foodItem = {
    id: id || `f-${Date.now()}`,
    nameEn,
    nameJp,
    area,
    category,
    nearestStation,
    walkingTime,
    reservationRequired: reservationStatus !== "none",
    reservationStatus,
    reservationTime,
    reservationNumber,
    peopleCount,
    estimatedBudget,
    googleMapUrl,
    note
  };

  if (id) {
    const idx = APP_STATE.foods.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.foods[idx] = foodItem;
  } else {
    APP_STATE.foods.push(foodItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderFood();
  if (window.lucide) window.lucide.createIcons();
}

function deleteFood(id) {
  const f = APP_STATE.foods.find(item => item.id === id);
  if (!f) return;

  if (confirm(`確定要刪除餐廳「${f.nameEn}」嗎？`)) {
    APP_STATE.foods = APP_STATE.foods.filter(item => item.id !== id);
    saveState(APP_STATE);
    renderFood();
    if (window.lucide) window.lucide.createIcons();
  }
}

function toggleFoodResvFieldsVisibility() {
  const status = document.getElementById("fd-modal-resv-status").value;
  const bookedFields = document.getElementById("fd-modal-booked-fields");
  
  if (status === "confirmed" || status === "pending") {
    bookedFields.classList.remove("hidden");
  } else {
    bookedFields.classList.add("hidden");
  }
}

// --------------------------------------------------------------------------
// 4.6 Places Page Render Details
// --------------------------------------------------------------------------

let SELECTED_PLACES_AREA = "all";
let SELECTED_PLACES_CAT = "all";

function renderPlaces() {
  // Area Filter chips
  const areaFilterNode = document.getElementById("places-area-filters");
  areaFilterNode.innerHTML = "";
  
  const allAreas = ["all", ...new Set(APP_STATE.places.map(p => p.area).filter(a => a))];
  allAreas.forEach(area => {
    const chip = document.createElement("button");
    chip.className = `filter-chip ${SELECTED_PLACES_AREA === area ? "active" : ""}`;
    chip.textContent = area === "all" ? "全部地區" : area;
    chip.onclick = () => {
      SELECTED_PLACES_AREA = area;
      renderPlaces();
      if (window.lucide) window.lucide.createIcons();
    };
    areaFilterNode.appendChild(chip);
  });

  // Category Filter chips
  const catFilterNode = document.getElementById("places-category-filters");
  catFilterNode.innerHTML = "";
  
  const allCats = ["all", ...new Set(APP_STATE.places.map(p => p.category).filter(c => c))];
  allCats.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = `filter-chip ${SELECTED_PLACES_CAT === cat ? "active" : ""}`;
    chip.textContent = cat === "all" ? "全部類別" : cat;
    chip.onclick = () => {
      SELECTED_PLACES_CAT = cat;
      renderPlaces();
      if (window.lucide) window.lucide.createIcons();
    };
    catFilterNode.appendChild(chip);
  });

  // Filter list
  let list = APP_STATE.places;
  if (SELECTED_PLACES_AREA !== "all") {
    list = list.filter(p => p.area === SELECTED_PLACES_AREA);
  }
  if (SELECTED_PLACES_CAT !== "all") {
    list = list.filter(p => p.category === SELECTED_PLACES_CAT);
  }

  const container = document.getElementById("places-list");
  container.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "place-card";

    const ticketTag = p.ticketRequired ? `<span class="badge badge-accent">需門票</span>` : "";
    const resvTag = p.reservationRequired ? `<span class="badge badge-warning">需預約</span>` : "";

    card.innerHTML = `
      <div class="place-card-header">
        <div>
          <h4 class="place-card-title">${p.name}</h4>
          <span style="font-size:0.8rem; color:var(--text-muted);">${p.area} ｜ ${p.category}</span>
        </div>
      </div>

      <div class="place-card-details">
        ${p.plannedDate ? `<div><strong>預計日期:</strong> ${p.plannedDate}</div>` : ""}
        <div><strong>營業時間:</strong> ${p.openingHours || "無"}</div>
        <div><strong>最近車站:</strong> ${p.nearestStation || "無"} ${p.walkingTime ? `(步行 ${p.walkingTime})` : ""}</div>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:4px;">
          ${ticketTag}
          ${resvTag}
        </div>
        <div style="margin-top:6px;"><strong>提醒備註:</strong> ${p.note || "無"}</div>
      </div>

      <div class="place-card-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <a href="${p.googleMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' Tokyo')}`}" target="_blank" class="app-btn btn-secondary btn-sm">
          <i data-lucide="map"></i> 開啟地圖
        </a>
        <button class="app-btn btn-secondary btn-sm btn-edit-place" data-id="${p.id}">
          <i data-lucide="edit-2"></i> 編輯
        </button>
        <button class="app-btn btn-danger btn-sm btn-delete-place" data-id="${p.id}">
          <i data-lucide="trash"></i> 刪除
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach edit & delete click handlers
  container.querySelectorAll(".btn-edit-place").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openPlaceModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-place").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      deletePlace(id);
    };
  });

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state-container" style="grid-column: span 12;">
        <i data-lucide="map"></i>
        <div class="empty-state-title">找不到任何景點或商店</div>
        <p class="empty-state-desc">你可以嘗試更換篩選條件。</p>
      </div>
    `;
  }
}

function openPlaceModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-place");
  if (!modal) return;
  modal.classList.add("active");

  const form = document.getElementById("form-place");
  form.reset();

  const titleNode = document.getElementById("place-modal-title");
  const idInput = document.getElementById("place-id-input");

  if (id) {
    titleNode.textContent = "編輯景點項目";
    idInput.value = id;

    const p = APP_STATE.places.find(item => item.id === id);
    if (p) {
      document.getElementById("pl-modal-name").value = p.name;
      document.getElementById("pl-modal-area").value = p.area;
      document.getElementById("pl-modal-category").value = p.category;
      document.getElementById("pl-modal-date").value = p.plannedDate || "";
      document.getElementById("pl-modal-hours").value = p.openingHours || "";
      document.getElementById("pl-modal-station").value = p.nearestStation || "";
      document.getElementById("pl-modal-walking").value = p.walkingTime || "";
      document.getElementById("pl-modal-ticket").value = String(p.ticketRequired || false);
      document.getElementById("pl-modal-reservation").value = String(p.reservationRequired || false);
      document.getElementById("pl-modal-mapurl").value = p.googleMapUrl || "";
      document.getElementById("pl-modal-note").value = p.note || "";
    }
  } else {
    titleNode.textContent = "新增景點項目";
    idInput.value = "";
    document.getElementById("pl-modal-category").value = "景點";
    document.getElementById("pl-modal-date").value = "2026-06-22"; // Start of Tokyo trip
    document.getElementById("pl-modal-ticket").value = "false";
    document.getElementById("pl-modal-reservation").value = "false";
  }
}

function onPlaceFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("place-id-input").value;
  const name = document.getElementById("pl-modal-name").value;
  const area = document.getElementById("pl-modal-area").value;
  const category = document.getElementById("pl-modal-category").value;
  const plannedDate = document.getElementById("pl-modal-date").value;
  const openingHours = document.getElementById("pl-modal-hours").value;
  const nearestStation = document.getElementById("pl-modal-station").value;
  const walkingTime = document.getElementById("pl-modal-walking").value;
  const ticketRequired = document.getElementById("pl-modal-ticket").value === "true";
  const reservationRequired = document.getElementById("pl-modal-reservation").value === "true";
  const googleMapUrl = document.getElementById("pl-modal-mapurl").value;
  const note = document.getElementById("pl-modal-note").value;

  const placeItem = {
    id: id || `p-${Date.now()}`,
    name,
    area,
    category,
    plannedDate: plannedDate || undefined,
    openingHours,
    nearestStation,
    walkingTime,
    ticketRequired,
    reservationRequired,
    googleMapUrl,
    note
  };

  if (id) {
    const idx = APP_STATE.places.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.places[idx] = placeItem;
  } else {
    APP_STATE.places.push(placeItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderPlaces();
  if (window.lucide) window.lucide.createIcons();
}

function deletePlace(id) {
  const p = APP_STATE.places.find(item => item.id === id);
  if (!p) return;

  if (confirm(`確定要刪除景點「${p.name}」嗎？`)) {
    APP_STATE.places = APP_STATE.places.filter(item => item.id !== id);
    saveState(APP_STATE);
    renderPlaces();
    if (window.lucide) window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// 4.7 Expenses Page Render Details
// --------------------------------------------------------------------------

function renderExpenses() {
  // Sync the exchange rate UI input field
  const rateInput = document.getElementById("input-exchange-rate");
  if (rateInput) rateInput.value = APP_STATE.exchangeRate;

  // Calculate totals and render lists
  updateExpensesTotalsDisplay();
  renderExpensesListTable();
}

function updateExpensesTotalsDisplay() {
  let twdTotal = 0;
  let jpyTotal = 0;
  let sharedTwd = 0;
  let sharedJpy = 0;
  let personalTwd = 0;
  let personalJpy = 0;
  let unsettledCount = 0;

  APP_STATE.expenses.forEach(exp => {
    const amt = Number(exp.amount) || 0;
    const isShared = exp.splitType !== "personal";

    if (exp.currency === "TWD") {
      twdTotal += amt;
      if (isShared) sharedTwd += amt;
      else personalTwd += amt;
    } else if (exp.currency === "JPY") {
      jpyTotal += amt;
      if (isShared) sharedJpy += amt;
      else personalJpy += amt;
    }

    if (exp.settlementStatus !== "settled") {
      unsettledCount++;
    }
  });

  const rate = APP_STATE.exchangeRate || 0.21;
  const combinedTwdTotal = twdTotal + (jpyTotal * rate);
  const combinedSharedTwd = sharedTwd + (sharedJpy * rate);
  
  // Calculate average shared portion (TWD & JPY) per person
  const avgSharedTwd = combinedSharedTwd / 5;
  const avgSharedJpy = sharedJpy / 5;

  // Add average shared portion to personal expenses
  const combinedPersonalTwd = personalTwd + (personalJpy * rate) + avgSharedTwd;
  const personalJpySummary = personalJpy + avgSharedJpy;

  document.getElementById("exp-total-twd").textContent = `NT$ ${Math.round(combinedTwdTotal).toLocaleString()}`;
  document.getElementById("exp-total-jpy-meta").textContent = `日幣: ¥ ${jpyTotal.toLocaleString()}`;
  
  document.getElementById("exp-total-shared").textContent = `NT$ ${Math.round(combinedSharedTwd).toLocaleString()}`;
  document.getElementById("exp-shared-jpy-meta").textContent = `日幣: ¥ ${sharedJpy.toLocaleString()}`;
  
  document.getElementById("exp-total-personal").textContent = `NT$ ${Math.round(combinedPersonalTwd).toLocaleString()}`;
  document.getElementById("exp-personal-jpy-meta").textContent = `日幣: ¥ ${Math.round(personalJpySummary).toLocaleString()}`;
  
  document.getElementById("exp-unsettled-count-val").textContent = unsettledCount;
}

function renderExpensesListTable() {
  const tbody = document.getElementById("expenses-tbody");
  const mobList = document.getElementById("expenses-mobile-cards");

  tbody.innerHTML = "";
  mobList.innerHTML = "";

  // Get active search & filters
  const query = document.getElementById("expense-search-input").value.toLowerCase();
  const payerFilter = document.getElementById("expense-filter-payer").value;
  const typeFilter = document.getElementById("expense-filter-type").value;
  const catFilter = document.getElementById("expense-filter-category").value;
  const statusFilter = document.getElementById("expense-filter-status").value;

  let list = [...APP_STATE.expenses];

  // Nature filter
  if (typeFilter !== "all") {
    if (typeFilter === "shared") {
      list = list.filter(e => e.splitType !== "personal");
    } else if (typeFilter === "personal") {
      list = list.filter(e => e.splitType === "personal");
    }
  }

  // Search filter
  if (query) {
    list = list.filter(e => {
      const payerName = getUsernameById(e.payerId);
      return e.itemName.toLowerCase().includes(query) || payerName.toLowerCase().includes(query);
    });
  }

  // Payer filter
  if (payerFilter !== "all") {
    list = list.filter(e => e.payerId === payerFilter);
  }

  // Category filter
  if (catFilter !== "all") {
    list = list.filter(e => e.category === catFilter);
  }

  // Status filter
  if (statusFilter !== "all") {
    list = list.filter(e => e.settlementStatus === statusFilter);
  }

  // Sort by date descending
  list.sort((a, b) => b.date.localeCompare(a.date));

  if (list.length === 0) {
    const emptyRow = `
      <tr>
        <td colspan="9" style="text-align:center; color:var(--text-muted); padding:32px;">
          沒有符合篩選條件的支出記錄。
        </td>
      </tr>
    `;
    tbody.innerHTML = emptyRow;
    mobList.innerHTML = `
      <div class="empty-state-container">
        <i data-lucide="receipt"></i>
        <div class="empty-state-title">無支出項目</div>
        <p class="empty-state-desc">你可以點擊右上角新增一筆花費。</p>
      </div>
    `;
    return;
  }

  // Color mappings
  const getCatBadgeClass = (cat) => {
    switch (cat) {
      case "機票": return "badge-primary";
      case "住宿": return "badge-secondary";
      case "交通": return "badge-info";
      case "餐飲": return "badge-accent";
      case "門票": return "badge-warning";
      case "購物": return "badge-muted";
      default: return "badge-primary";
    }
  };

  list.forEach(e => {
    const payerName = getUsernameById(e.payerId);
    
    // Status text & class
    const statusClass = e.settlementStatus === "settled" ? "badge-success" : "badge-danger";
    const statusText = e.settlementStatus === "settled" ? "已結清" : "未結清";

    // Split descriptive text
    let splitDesc = "";
    if (e.splitType === "personal") {
      splitDesc = "個人支出 (不平分)";
    } else if (e.splitType === "equal") {
      const names = e.participants.map(pid => getUsernameById(pid));
      splitDesc = `平分: ${names.join(", ")}`;
    } else if (e.splitType === "custom") {
      const details = Object.entries(e.customAmounts).map(([pid, val]) => `${getUsernameById(pid)}: ${val}`).join(", ");
      splitDesc = `自訂: ${details}`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.date.substring(5)}</td>
      <td>
        <div style="font-weight:600;">${e.itemName}</div>
        <div style="font-size:0.75rem; color:var(--text-muted); max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${e.note || ""}</div>
      </td>
      <td><span class="badge ${getCatBadgeClass(e.category)}">${e.category}</span></td>
      <td class="text-right" style="font-weight:700;">${Math.round(e.amount).toLocaleString()}</td>
      <td>${e.currency}</td>
      <td><span style="font-weight:600;">${payerName}</span></td>
      <td style="font-size:0.8rem; color:var(--text-secondary); max-width:250px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${splitDesc}">${splitDesc}</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td class="text-center">
        <div style="display:flex; gap:8px; justify-content:center;">
          <button class="app-btn btn-secondary btn-sm btn-toggle-expense-status" data-id="${e.id}" title="${e.settlementStatus === 'settled' ? '標記為未結清' : '標記為已結清'}">
            <i data-lucide="${e.settlementStatus === 'settled' ? 'check-square' : 'square'}" class="${e.settlementStatus === 'settled' ? 'text-success' : 'text-muted'}"></i>
          </button>
          <button class="app-btn btn-secondary btn-sm btn-edit-expense" data-id="${e.id}"><i data-lucide="edit"></i></button>
          <button class="app-btn btn-danger btn-sm btn-delete-expense" data-id="${e.id}"><i data-lucide="trash-2"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    // Mobile list render card
    const mCard = document.createElement("div");
    mCard.className = "mobile-expense-card";
    const amtStr = e.currency === "TWD" ? `NT$ ${Math.round(e.amount).toLocaleString()}` : `¥ ${Math.round(e.amount).toLocaleString()}`;
    
    mCard.innerHTML = `
      <div class="mobile-card-row-top">
        <div>
          <span class="badge ${getCatBadgeClass(e.category)}" style="margin-bottom:6px;">${e.category}</span>
          <div class="mob-card-item-title">${e.itemName}</div>
          <span class="mob-card-date">${e.date} ｜ 付款: <strong>${payerName}</strong></span>
        </div>
        <div style="text-align:right;">
          <span class="badge ${statusClass}" style="margin-bottom:6px;">${statusText}</span>
          <div class="mob-card-cost">${amtStr}</div>
        </div>
      </div>
      <div class="mob-card-detail-line">
        <strong>分攤:</strong> ${splitDesc}
      </div>
      ${e.note ? `<div class="mob-card-detail-line" style="color:var(--text-muted);">備註: ${e.note}</div>` : ""}
      <div class="mob-card-actions">
        <button class="app-btn btn-secondary btn-sm btn-toggle-expense-status" data-id="${e.id}">
          <i data-lucide="${e.settlementStatus === 'settled' ? 'check-square' : 'square'}" class="${e.settlementStatus === 'settled' ? 'text-success' : 'text-muted'}"></i>
          <span>${e.settlementStatus === 'settled' ? '已結清' : '未結清'}</span>
        </button>
        <button class="app-btn btn-secondary btn-sm btn-edit-expense" data-id="${e.id}"><i data-lucide="edit"></i> 編輯</button>
        <button class="app-btn btn-danger btn-sm btn-delete-expense" data-id="${e.id}"><i data-lucide="trash-2"></i> 刪除</button>
      </div>
    `;
    mobList.appendChild(mCard);
  });

  // Attach expense edit & delete button click handlers
  document.querySelectorAll(".btn-edit-expense").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openExpenseModal(id);
    };
  });

  document.querySelectorAll(".btn-delete-expense").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      if (confirm("您確定要刪除這筆支出嗎？")) {
        APP_STATE.expenses = APP_STATE.expenses.filter(e => e.id !== id);
        saveState(APP_STATE);
        renderExpenses();
        if (window.lucide) window.lucide.createIcons();
      }
    };
  });

  // Attach quick status toggle button click handlers
  document.querySelectorAll(".btn-toggle-expense-status").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      const exp = APP_STATE.expenses.find(e => e.id === id);
      if (exp) {
        exp.settlementStatus = exp.settlementStatus === "settled" ? "unsettled" : "settled";
        saveState(APP_STATE);
        renderExpenses();
        if (window.lucide) window.lucide.createIcons();
      }
    };
  });
}

// --------------------------------------------------------------------------
// 4.8 Settlements Page Render Details
// --------------------------------------------------------------------------

function renderSettlements() {
  const container = document.getElementById("settlement-users-grid");
  container.innerHTML = "";

  const results = runSettlementCalculator();
  
  Object.values(results).forEach(res => {
    const card = document.createElement("div");
    card.className = "settlement-user-card";

    // Balance text color styling
    let balanceClass = "text-muted";
    let balanceText = `NT$ ${Math.round(res.balanceTwd).toLocaleString()}`;
    if (res.balanceTwd > 0.1) {
      balanceClass = "badge-success";
      balanceText = `應收 NT$ ${Math.round(res.balanceTwd).toLocaleString()}`;
    } else if (res.balanceTwd < -0.1) {
      balanceClass = "badge-danger";
      balanceText = `應付 NT$ ${Math.round(Math.abs(res.balanceTwd)).toLocaleString()}`;
    } else {
      balanceClass = "badge-muted";
      balanceText = "已結清 / 差額為 0";
    }

    const rate = APP_STATE.exchangeRate || 0.21;
    const personalTotalTwd = res.shareTwd + (res.shareJpy * rate);
    const privateTotalTwd = res.privateTwd + (res.privateJpy * rate);
    const jointTotalTwd = res.jointTwd + (res.jointJpy * rate);

    card.innerHTML = `
      <div class="settlement-user-header">
        <div class="settlement-avatar">${res.name[0]}</div>
        <div>
          <div class="settlement-user-name">${res.name}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${res.role}</div>
        </div>
      </div>
      <div class="settlement-user-details">
        <div class="settlement-user-row">
          <span>代墊支出 (TWD):</span>
          <span>NT$ ${Math.round(res.paidTwd).toLocaleString()}</span>
        </div>
        <div class="settlement-user-row">
          <span>代墊支出 (JPY):</span>
          <span>¥ ${Math.round(res.paidJpy).toLocaleString()}</span>
        </div>
        <div class="settlement-user-row">
          <span>應分攤額 (TWD):</span>
          <span>NT$ ${Math.round(res.shareTwd).toLocaleString()}</span>
        </div>
        <div class="settlement-user-row">
          <span>應分攤額 (JPY):</span>
          <span>¥ ${Math.round(res.shareJpy).toLocaleString()}</span>
        </div>
        <div class="settlement-user-row-total">
          <span>淨收支差額 (台幣折算):</span>
          <span class="badge ${balanceClass}" style="font-size:0.85rem; font-weight:700;">${balanceText}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Calculate transfers
  renderSettlementTransfers(results);
}

function runSettlementCalculator() {
  const rate = APP_STATE.exchangeRate || 0.21;
  const userResults = {};
  
  // Initialize users results
  APP_STATE.users.forEach(u => {
    userResults[u.id] = {
      id: u.id,
      name: u.name,
      role: u.role,
      paidTwd: 0,
      paidJpy: 0,
      shareTwd: 0,
      shareJpy: 0,
      balanceTwd: 0
    };
  });

  // Run over expenses list
  APP_STATE.expenses.forEach(exp => {
    if (exp.settlementStatus === "settled") return; // Skip already settled items

    const amt = Number(exp.amount) || 0;
    const payerId = exp.payerId;
    const split = exp.splitType;
    
    // 1. Add Paid Amount
    if (userResults[payerId]) {
      if (exp.currency === "TWD") {
        userResults[payerId].paidTwd += amt;
      } else {
        userResults[payerId].paidJpy += amt;
      }
    }

    // 2. Add Share Amount per person
    if (split === "personal") {
      // 100% split to payer
      if (userResults[payerId]) {
        if (exp.currency === "TWD") userResults[payerId].shareTwd += amt;
        else userResults[payerId].shareJpy += amt;
      }
    } else if (split === "equal") {
      const partCount = exp.participants.length;
      if (partCount > 0) {
        const perPersonShare = amt / partCount;
        exp.participants.forEach(pid => {
          if (userResults[pid]) {
            if (exp.currency === "TWD") userResults[pid].shareTwd += perPersonShare;
            else userResults[pid].shareJpy += perPersonShare;
          }
        });
      }
    } else if (split === "custom") {
      // Specifying custom splits amounts mapping
      Object.entries(exp.customAmounts).forEach(([pid, val]) => {
        const shareVal = Number(val) || 0;
        if (userResults[pid]) {
          if (exp.currency === "TWD") userResults[pid].shareTwd += shareVal;
          else userResults[pid].shareJpy += shareVal;
        }
      });
    }
  });

  // 3. Resolve balances using exchange rate conversion
  Object.keys(userResults).forEach(uid => {
    const u = userResults[uid];
    const totalPaidConverted = u.paidTwd + (u.paidJpy * rate);
    const totalShareConverted = u.shareTwd + (u.shareJpy * rate);
    u.balanceTwd = totalPaidConverted - totalShareConverted;
  });

  return userResults;
}

function renderSettlementTransfers(calcResults) {
  const box = document.getElementById("settlement-transfers-box");
  box.innerHTML = "";

  // Convert balances into debtors (balance < 0) and creditors (balance > 0)
  const balances = Object.values(calcResults).map(r => ({
    id: r.id,
    name: r.name,
    balance: r.balanceTwd
  }));

  const debtors = balances.filter(b => b.balance < -0.1).sort((a, b) => a.balance - b.balance); // most negative first
  const creditors = balances.filter(b => b.balance > 0.1).sort((a, b) => b.balance - a.balance); // most positive first

  const transfers = [];

  let dIdx = 0;
  let cIdx = 0;

  // Clone balances to prevent mutation during allocation loop
  const tempDebtors = debtors.map(d => ({ ...d, balance: Math.abs(d.balance) }));
  const tempCreditors = creditors.map(c => ({ ...c, balance: c.balance }));

  while (dIdx < tempDebtors.length && cIdx < tempCreditors.length) {
    const debtor = tempDebtors[dIdx];
    const creditor = tempCreditors[cIdx];

    const amountToTransfer = Math.min(debtor.balance, creditor.balance);
    if (amountToTransfer > 0.1) {
      transfers.push({
        from: debtor.name,
        to: creditor.name,
        amount: amountToTransfer
      });
    }

    debtor.balance -= amountToTransfer;
    creditor.balance -= amountToTransfer;

    if (debtor.balance <= 0.1) dIdx++;
    if (creditor.balance <= 0.1) cIdx++;
  }

  if (transfers.length === 0) {
    box.innerHTML = `
      <div style="text-align:center; padding:16px; color:var(--success);">
        <i data-lucide="check-circle" style="width:36px;height:36px;margin-bottom:8px;"></i>
        <div style="font-weight:700;">帳目完全結清</div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">目前所有支出均已結清，無須進行轉帳分帳。</p>
      </div>
    `;
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "transfer-box";
  
  transfers.forEach(t => {
    const line = document.createElement("div");
    line.className = "transfer-line";
    line.innerHTML = `
      <span class="transfer-debtor">${t.from}</span>
      <span style="font-size:0.9rem; color:var(--text-secondary);">應支付給</span>
      <span class="transfer-creditor">${t.to}</span>
      <i data-lucide="arrow-right"></i>
      <span class="transfer-amount text-primary">NT$ ${Math.round(t.amount).toLocaleString()}</span>
    `;
    wrapper.appendChild(line);
  });

  box.appendChild(wrapper);
}

// --------------------------------------------------------------------------
// 4.9 Todos Page Render Details
// --------------------------------------------------------------------------

let SELECTED_TODO_FILTER = "all";

function renderTodos() {
  const catFiltersNode = document.getElementById("todo-cat-filters");
  catFiltersNode.innerHTML = "";

  const allCats = ["all", "住宿", "交通", "餐廳", "景點", "支出", "其他"];
  allCats.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = `filter-chip ${SELECTED_TODO_FILTER === cat ? "active" : ""}`;
    chip.textContent = cat === "all" ? "全部" : cat;
    chip.onclick = () => {
      SELECTED_TODO_FILTER = cat;
      renderTodos();
      if (window.lucide) window.lucide.createIcons();
    };
    catFiltersNode.appendChild(chip);
  });

  // Calculate statistics counts
  let highCount = 0;
  let medCount = 0;
  let lowCount = 0;
  let doneCount = 0;

  APP_STATE.todos.forEach(t => {
    if (t.status === "done") {
      doneCount++;
    } else {
      if (t.priority === "high") highCount++;
      else if (t.priority === "medium") medCount++;
      else if (t.priority === "low") lowCount++;
    }
  });

  document.getElementById("todo-stat-high").textContent = highCount;
  document.getElementById("todo-stat-medium").textContent = medCount;
  document.getElementById("todo-stat-low").textContent = lowCount;
  document.getElementById("todo-stat-done").textContent = doneCount;

  // Filter list
  let list = [...APP_STATE.todos];
  if (SELECTED_TODO_FILTER !== "all") {
    list = list.filter(t => t.category === SELECTED_TODO_FILTER);
  }

  // Sort: open items first, then priority descending, then due date
  const priorityWeight = { high: 3, medium: 2, low: 1 };
  list.sort((a, b) => {
    if (a.status === "done" && b.status !== "done") return 1;
    if (a.status !== "done" && b.status === "done") return -1;
    
    // Sort by priority weight
    const wA = priorityWeight[a.priority] || 0;
    const wB = priorityWeight[b.priority] || 0;
    if (wA !== wB) return wB - wA;

    // Due dates sorting
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });

  const container = document.getElementById("todos-container");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state-container">
        <i data-lucide="check-circle-2"></i>
        <div class="empty-state-title">無待處理事項</div>
        <p class="empty-state-desc">目前的分類下沒有任何待確認項目！</p>
      </div>
    `;
    return;
  }

  list.forEach(t => {
    const card = document.createElement("div");
    card.className = `todo-card-box ${t.status === "done" ? "done" : ""}`;

    const isDone = t.status === "done";
    const checkIcon = isDone ? "check-circle" : "circle";
    const checkClass = isDone ? "done" : "";

    let priorityBadge = "";
    if (t.priority === "high") priorityBadge = `<span class="badge badge-danger">高優先</span>`;
    else if (t.priority === "medium") priorityBadge = `<span class="badge badge-warning">中優先</span>`;
    else priorityBadge = `<span class="badge badge-muted">低優先</span>`;

    const ownerName = getUsernameById(t.ownerId) || "所有人";

    card.innerHTML = `
      <button class="todo-status-checkbox-btn ${checkClass}" data-id="${t.id}" aria-label="標記狀態">
        <i data-lucide="${checkIcon}"></i>
      </button>
      <div class="todo-card-body">
        <div class="todo-card-title-text">${t.title}</div>
        <div class="todo-card-meta">
          <span class="badge badge-primary">${t.category}</span>
          ${priorityBadge}
          <span>負責人: <strong>${ownerName}</strong></span>
          ${t.dueDate ? `<span>期限: ${t.dueDate}</span>` : ""}
          ${t.note ? `<span style="width:100%; display:block; color:var(--text-secondary); margin-top:2px;">說明: ${t.note}</span>` : ""}
        </div>
      </div>
      <div class="todo-card-actions">
        <button class="app-btn btn-secondary btn-sm btn-edit-todo" data-id="${t.id}"><i data-lucide="edit"></i></button>
        <button class="app-btn btn-danger btn-sm btn-delete-todo" data-id="${t.id}"><i data-lucide="trash-2"></i></button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach status toggle click handlers
  document.querySelectorAll(".todo-status-checkbox-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      const todo = APP_STATE.todos.find(t => t.id === id);
      if (todo) {
        todo.status = todo.status === "done" ? "open" : "done";
        saveState(APP_STATE);
        renderTodos();
        if (window.lucide) window.lucide.createIcons();
      }
    };
  });

  // Attach edit & delete todo click handlers
  document.querySelectorAll(".btn-edit-todo").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openTodoModal(id);
    };
  });

  document.querySelectorAll(".btn-delete-todo").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      if (confirm("您確定要刪除這項待補紀錄嗎？")) {
        APP_STATE.todos = APP_STATE.todos.filter(t => t.id !== id);
        saveState(APP_STATE);
        renderTodos();
        if (window.lucide) window.lucide.createIcons();
      }
    };
  });
}

// --------------------------------------------------------------------------
// 4.10 Packing List Page Render Details
// --------------------------------------------------------------------------

function renderPackingList() {
  const container = document.getElementById("packing-items-container");
  if (!container) return;
  container.innerHTML = "";

  const items = APP_STATE.packingItems || [];
  const totalCount = items.length;
  const packedCount = items.filter(item => item.packed).length;
  const percent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  // Update progress bar
  const percentNode = document.getElementById("packing-progress-percent");
  if (percentNode) percentNode.textContent = `${percent}%`;

  const fillNode = document.getElementById("packing-progress-fill");
  if (fillNode) fillNode.style.width = `${percent}%`;

  const textNode = document.getElementById("packing-progress-text");
  if (textNode) textNode.textContent = `已打包 ${packedCount} / ${totalCount} 件物品`;

  if (totalCount === 0) {
    container.innerHTML = `
      <div class="empty-state-container">
        <i data-lucide="luggage"></i>
        <div class="empty-state-title">無行李物品</div>
        <p class="empty-state-desc">目前行李清單中沒有任何物品，點擊右上角新增吧！</p>
      </div>
    `;
    return;
  }

  // Standard categories order
  const categories = [
    "證件與重要文件",
    "金錢與支付",
    "電子用品",
    "個人盥洗用品",
    "健康與日常用品"
  ];

  // Group items by category
  const grouped = {};
  categories.forEach(cat => grouped[cat] = []);
  
  // Catch-all for any other categories
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  // Render each category section
  Object.keys(grouped).forEach(cat => {
    const catItems = grouped[cat];
    if (catItems.length === 0) return; // skip empty categories

    const catPackedCount = catItems.filter(i => i.packed).length;
    const catTotalCount = catItems.length;

    const section = document.createElement("div");
    section.className = "packing-category-section";

    section.innerHTML = `
      <div class="packing-category-title">
        <span>${cat}</span>
        <span class="packing-category-count">已打包 ${catPackedCount} / ${catTotalCount}</span>
      </div>
      <div class="packing-items-grid"></div>
    `;

    const grid = section.querySelector(".packing-items-grid");

    catItems.forEach(item => {
      const card = document.createElement("div");
      card.className = `packing-item-card ${item.packed ? "done" : ""}`;

      const checkIcon = item.packed ? "check-circle" : "circle";
      const checkClass = item.packed ? "done" : "";

      card.innerHTML = `
        <span class="packing-checkbox-btn ${checkClass}" data-id="${item.id}">
          <i data-lucide="${checkIcon}"></i>
        </span>
        <div class="packing-item-name">${item.name}</div>
        <div class="packing-item-actions">
          <button class="app-btn btn-secondary btn-sm btn-edit-packing" data-id="${item.id}" aria-label="編輯"><i data-lucide="edit"></i></button>
          <button class="app-btn btn-danger btn-sm btn-delete-packing" data-id="${item.id}" aria-label="刪除"><i data-lucide="trash-2"></i></button>
        </div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(section);
  });

  // Bind card clicks to toggle packed status
  container.querySelectorAll(".packing-item-card").forEach(card => {
    card.onclick = () => {
      const checkBtn = card.querySelector(".packing-checkbox-btn");
      if (checkBtn) {
        const id = checkBtn.getAttribute("data-id");
        togglePackingItem(id);
      }
    };
  });

  // Bind edit/delete triggers (prevent propagation to card trigger)
  container.querySelectorAll(".btn-edit-packing").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      openPackingModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-packing").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      deletePackingItem(id);
    };
  });
}

function togglePackingItem(id) {
  const item = APP_STATE.packingItems.find(i => i.id === id);
  if (item) {
    item.packed = !item.packed;
    saveState(APP_STATE);
    renderPackingList();
    if (window.lucide) window.lucide.createIcons();
  }
}

function deletePackingItem(id) {
  if (confirm("您確定要刪除此物品嗎？")) {
    APP_STATE.packingItems = APP_STATE.packingItems.filter(i => i.id !== id);
    saveState(APP_STATE);
    renderPackingList();
    if (window.lucide) window.lucide.createIcons();
  }
}

function openPackingModal(id = null) {
  closeAllModals();
  const modal = document.getElementById("modal-packing");
  if (!modal) return;

  const titleNode = document.getElementById("packing-modal-title");
  const idInput = document.getElementById("packing-id-input");
  const nameInput = document.getElementById("pack-modal-name");
  const catInput = document.getElementById("pack-modal-category");

  if (id) {
    // Edit Mode
    const item = APP_STATE.packingItems.find(i => i.id === id);
    if (item) {
      titleNode.textContent = "編輯行李物品";
      idInput.value = item.id;
      nameInput.value = item.name;
      catInput.value = item.category;
    }
  } else {
    // Create Mode
    titleNode.textContent = "新增行李物品";
    idInput.value = "";
    nameInput.value = "";
    catInput.value = "證件與重要文件"; // default selection
  }

  modal.classList.add("active");
}

function onPackingFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("packing-id-input").value;
  const name = document.getElementById("pack-modal-name").value.trim();
  const category = document.getElementById("pack-modal-category").value;

  if (!name) {
    alert("請輸入物品名稱");
    return;
  }

  const item = {
    id: id || `pack-${Date.now()}`,
    name,
    category,
    packed: id ? (APP_STATE.packingItems.find(i => i.id === id)?.packed || false) : false
  };

  if (id) {
    const idx = APP_STATE.packingItems.findIndex(i => i.id === id);
    if (idx !== -1) {
      APP_STATE.packingItems[idx] = item;
    }
  } else {
    APP_STATE.packingItems.push(item);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderPackingList();
  if (window.lucide) window.lucide.createIcons();
}

// --------------------------------------------------------------------------
// 4.11 Shopping & Coupons Page Render Details
// --------------------------------------------------------------------------

let ACTIVE_SHOPPING_SUBVIEW = "shop-list";

function renderShopping() {
  // Bind sub-tabs events
  const tabBtns = document.querySelectorAll(".sub-tab-btn");
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      ACTIVE_SHOPPING_SUBVIEW = btn.getAttribute("data-subview");
      
      // Toggle subview sections visibility
      const subviews = document.querySelectorAll(".subview-content");
      subviews.forEach(sv => {
        if (sv.id === `subview-${ACTIVE_SHOPPING_SUBVIEW}`) {
          sv.style.display = "block";
          sv.classList.add("active");
        } else {
          sv.style.display = "none";
          sv.classList.remove("active");
        }
      });
      
      // Render data for active subview
      if (ACTIVE_SHOPPING_SUBVIEW === "shop-list") {
        renderShoppingList();
      } else {
        renderCoupons();
      }
      
      if (window.lucide) window.lucide.createIcons();
    };
  });

  // Highlight correct sub tab based on state
  tabBtns.forEach(btn => {
    if (btn.getAttribute("data-subview") === ACTIVE_SHOPPING_SUBVIEW) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const subviews = document.querySelectorAll(".subview-content");
  subviews.forEach(sv => {
    if (sv.id === `subview-${ACTIVE_SHOPPING_SUBVIEW}`) {
      sv.style.display = "block";
      sv.classList.add("active");
    } else {
      sv.style.display = "none";
      sv.classList.remove("active");
    }
  });

  // Render current view
  if (ACTIVE_SHOPPING_SUBVIEW === "shop-list") {
    renderShoppingList();
  } else {
    renderCoupons();
  }
}

function renderShoppingList() {
  const container = document.getElementById("shopping-items-container");
  if (!container) return;
  container.innerHTML = "";

  const items = APP_STATE.shoppingItems || [];
  const totalCount = items.length;
  const packedCount = items.filter(item => item.packed).length;
  const percent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  // Update progress bar
  const percentNode = document.getElementById("shopping-progress-percent");
  if (percentNode) percentNode.textContent = `${percent}%`;

  const fillNode = document.getElementById("shopping-progress-fill");
  if (fillNode) fillNode.style.width = `${percent}%`;

  const textNode = document.getElementById("shopping-progress-text");
  if (textNode) textNode.textContent = `已採購 ${packedCount} / ${totalCount} 件物品`;

  if (totalCount === 0) {
    container.innerHTML = `
      <div class="empty-state-container">
        <i data-lucide="shopping-bag"></i>
        <div class="empty-state-title">無購物項目</div>
        <p class="empty-state-desc">目前的購物清單中沒有任何物品，點擊右上角新增吧！</p>
      </div>
    `;
    return;
  }

  // Categories
  const categories = [
    "服飾 / 配件",
    "藥妝 / 保健類",
    "美妝 / 保養類",
    "模型 / 玩具",
    "電器 / 3C",
    "零食 / 伴手禮",
    "其他 / 代購"
  ];

  const grouped = {};
  categories.forEach(cat => grouped[cat] = []);
  
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  // Render categories
  Object.keys(grouped).forEach(cat => {
    const catItems = grouped[cat];
    if (catItems.length === 0) return;

    const catPackedCount = catItems.filter(i => i.packed).length;
    const catTotalCount = catItems.length;

    const section = document.createElement("div");
    section.className = "packing-category-section"; // Reuse packing list visual container styles!

    section.innerHTML = `
      <div class="packing-category-title">
        <span>${cat}</span>
        <span class="packing-category-count">已採購 ${catPackedCount} / ${catTotalCount}</span>
      </div>
      <div class="packing-items-grid"></div>
    `;

    const grid = section.querySelector(".packing-items-grid");

    catItems.forEach(item => {
      const card = document.createElement("div");
      card.className = `packing-item-card ${item.packed ? "done" : ""}`; // Reuse packing styles!

      const checkIcon = item.packed ? "check-circle" : "circle";
      const checkClass = item.packed ? "done" : "";

      card.innerHTML = `
        <span class="packing-checkbox-btn ${checkClass}" data-id="${item.id}">
          <i data-lucide="${checkIcon}"></i>
        </span>
        <div class="packing-item-name">${item.name}</div>
        <div class="packing-item-actions">
          <button class="app-btn btn-secondary btn-sm btn-edit-shopping-item" data-id="${item.id}" aria-label="編輯"><i data-lucide="edit"></i></button>
          <button class="app-btn btn-danger btn-sm btn-delete-shopping-item" data-id="${item.id}" aria-label="刪除"><i data-lucide="trash-2"></i></button>
        </div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(section);
  });

  // Bind card clicks
  container.querySelectorAll(".packing-item-card").forEach(card => {
    card.onclick = () => {
      const checkBtn = card.querySelector(".packing-checkbox-btn");
      if (checkBtn) {
        const id = checkBtn.getAttribute("data-id");
        toggleShoppingItem(id);
      }
    };
  });

  // Bind edit/delete
  container.querySelectorAll(".btn-edit-shopping-item").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      openShoppingItemModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-shopping-item").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      deleteShoppingItem(id);
    };
  });
}

function toggleShoppingItem(id) {
  const item = APP_STATE.shoppingItems.find(i => i.id === id);
  if (item) {
    item.packed = !item.packed;
    saveState(APP_STATE);
    renderShoppingList();
    if (window.lucide) window.lucide.createIcons();
  }
}

function deleteShoppingItem(id) {
  if (confirm("您確定要刪除此項目嗎？")) {
    APP_STATE.shoppingItems = APP_STATE.shoppingItems.filter(i => i.id !== id);
    saveState(APP_STATE);
    renderShoppingList();
    if (window.lucide) window.lucide.createIcons();
  }
}

function openShoppingItemModal(id = null) {
  closeAllModals();
  const modal = document.getElementById("modal-shopping-item");
  if (!modal) return;

  const titleNode = document.getElementById("shopping-item-modal-title");
  const idInput = document.getElementById("shopping-item-id-input");
  const nameInput = document.getElementById("shop-modal-name");
  const catInput = document.getElementById("shop-modal-category");

  if (id) {
    const item = APP_STATE.shoppingItems.find(i => i.id === id);
    if (item) {
      titleNode.textContent = "編輯購物項目";
      idInput.value = item.id;
      nameInput.value = item.name;
      catInput.value = item.category;
    }
  } else {
    titleNode.textContent = "新增購物項目";
    idInput.value = "";
    nameInput.value = "";
    catInput.value = "服飾 / 配件";
  }

  modal.classList.add("active");
}

function onShoppingItemFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("shopping-item-id-input").value;
  const name = document.getElementById("shop-modal-name").value.trim();
  const category = document.getElementById("shop-modal-category").value;

  if (!name) {
    alert("請輸入項目名稱");
    return;
  }

  const item = {
    id: id || `shop-${Date.now()}`,
    name,
    category,
    packed: id ? (APP_STATE.shoppingItems.find(i => i.id === id)?.packed || false) : false
  };

  if (id) {
    const idx = APP_STATE.shoppingItems.findIndex(i => i.id === id);
    if (idx !== -1) APP_STATE.shoppingItems[idx] = item;
  } else {
    APP_STATE.shoppingItems.push(item);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderShoppingList();
  if (window.lucide) window.lucide.createIcons();
}

function renderCoupons() {
  const container = document.getElementById("coupons-grid-container");
  if (!container) return;
  container.innerHTML = "";

  const list = APP_STATE.coupons || [];

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state-container" style="grid-column: 1 / -1;">
        <i data-lucide="ticket"></i>
        <div class="empty-state-title">無優惠券</div>
        <p class="empty-state-desc">目前優惠券夾中沒有任何票券，點擊右上角新增吧！</p>
      </div>
    `;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "coupons-grid";

  list.forEach(cp => {
    const card = document.createElement("div");
    card.className = "coupon-card";

    let imageContent = "";
    if (cp.image) {
      imageContent = `
        <div class="coupon-card-image-box has-image">
          <img src="${cp.image}" alt="${cp.store}" class="coupon-card-image-preview" onclick="zoomTicketQR('${cp.store} 折價券', '${cp.image}')">
        </div>
      `;
    } else {
      imageContent = `
        <div class="coupon-card-image-box">
          <label class="coupon-card-image-placeholder">
            <i data-lucide="image"></i>
            <span>點擊上傳優惠券圖檔</span>
            <input type="file" style="display: none;" class="coupon-file-input" data-id="${cp.id}">
          </label>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="coupon-card-header">
        <div>
          <div class="coupon-card-store">${cp.store}</div>
          <div class="coupon-card-title">${cp.title}</div>
        </div>
        <button class="app-btn btn-danger btn-sm btn-delete-coupon" data-id="${cp.id}" aria-label="刪除"><i data-lucide="trash-2"></i></button>
      </div>
      
      ${imageContent}

      <div class="coupon-card-actions">
        <span class="coupon-card-expiry">${cp.expiry ? `有效期限至: ${cp.expiry}` : "無期限限制"}</span>
        <div style="display: flex; gap: 8px;">
          <button class="app-btn btn-secondary btn-sm btn-edit-coupon" data-id="${cp.id}"><i data-lucide="edit"></i> 編輯</button>
          <div class="app-btn btn-primary btn-sm coupon-upload-btn">
            <i data-lucide="upload"></i> ${cp.image ? "重傳" : "上傳"}
            <input type="file" class="coupon-file-input" data-id="${cp.id}" accept="image/*">
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);

  // Bind upload handlers
  container.querySelectorAll(".coupon-file-input").forEach(input => {
    input.onchange = (e) => {
      const id = input.getAttribute("data-id");
      if (e.target.files && e.target.files[0]) {
        handleCouponImageUpload(e.target.files[0], id);
      }
    };
  });

  // Bind edit/delete handlers
  container.querySelectorAll(".btn-edit-coupon").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      openCouponModal(id);
    };
  });

  container.querySelectorAll(".btn-delete-coupon").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      deleteCoupon(id);
    };
  });
}

function handleCouponImageUpload(file, couponId) {
  if (!file.type.startsWith("image/")) {
    alert("請選擇圖片格式的檔案！");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Max size for coupon image is 800px width/height to preserve barcodes
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed jpeg base64
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

      // Save to state
      const coupon = APP_STATE.coupons.find(c => c.id === couponId);
      if (coupon) {
        coupon.image = compressedDataUrl;
        saveState(APP_STATE);
        renderCoupons();
        if (window.lucide) window.lucide.createIcons();
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function deleteCoupon(id) {
  if (confirm("您確定要刪除這張優惠券嗎？")) {
    APP_STATE.coupons = APP_STATE.coupons.filter(c => c.id !== id);
    saveState(APP_STATE);
    renderCoupons();
    if (window.lucide) window.lucide.createIcons();
  }
}

function openCouponModal(id = null) {
  closeAllModals();
  const modal = document.getElementById("modal-coupon");
  if (!modal) return;

  const titleNode = document.getElementById("coupon-modal-title");
  const idInput = document.getElementById("coupon-id-input");
  const storeInput = document.getElementById("cp-modal-store");
  const descInput = document.getElementById("cp-modal-title");
  const expiryInput = document.getElementById("cp-modal-expiry");

  if (id) {
    const cp = APP_STATE.coupons.find(c => c.id === id);
    if (cp) {
      titleNode.textContent = "編輯優惠券";
      idInput.value = cp.id;
      storeInput.value = cp.store;
      descInput.value = cp.title;
      expiryInput.value = cp.expiry || "";
    }
  } else {
    titleNode.textContent = "新增優惠券";
    idInput.value = "";
    storeInput.value = "";
    descInput.value = "";
    expiryInput.value = "";
  }

  modal.classList.add("active");
}

function onCouponFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("coupon-id-input").value;
  const store = document.getElementById("cp-modal-store").value.trim();
  const title = document.getElementById("cp-modal-title").value.trim();
  const expiry = document.getElementById("cp-modal-expiry").value;

  if (!store || !title) {
    alert("請輸入店家與優惠內容說明");
    return;
  }

  const cpItem = {
    id: id || `coupon-${Date.now()}`,
    store,
    title,
    expiry: expiry || null,
    image: id ? (APP_STATE.coupons.find(c => c.id === id)?.image || "") : ""
  };

  if (id) {
    const idx = APP_STATE.coupons.findIndex(c => c.id === id);
    if (idx !== -1) APP_STATE.coupons[idx] = cpItem;
  } else {
    APP_STATE.coupons.push(cpItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderCoupons();
  if (window.lucide) window.lucide.createIcons();
}



// ==========================================================================
// 5. Utility Data Helper Functions
// ==========================================================================

function getUsernameById(userId) {
  const u = APP_STATE.users.find(user => user.id === userId);
  return u ? u.name : userId;
}


// ==========================================================================
// 6. Modal / Form Controller Actions
// ==========================================================================

function initFormControllers() {
  
  // Custom Select options generation
  const expPayerSelect = document.getElementById("exp-payer");
  const todoOwnerSelect = document.getElementById("todo-owner");
  const tkOwnerSelect = document.getElementById("tk-modal-owner");
  
  if (expPayerSelect) {
    expPayerSelect.innerHTML = APP_STATE.users.map(u => `<option value="${u.id}">${u.name}</option>`).join("");
  }
  if (todoOwnerSelect) {
    todoOwnerSelect.innerHTML = `<option value="">所有人</option>` + APP_STATE.users.map(u => `<option value="${u.id}">${u.name}</option>`).join("");
  }
  if (tkOwnerSelect) {
    tkOwnerSelect.innerHTML = `<option value="全體">全體</option>` + APP_STATE.users.map(u => `<option value="${u.name}">${u.name}</option>`).join("");
  }
  
  const trPayerSelect = document.getElementById("tr-modal-payer-select");
  if (trPayerSelect) {
    trPayerSelect.innerHTML = `
      <option value="待補">待補</option>
      <option value="個人">個人自理</option>
    ` + APP_STATE.users.map(u => `<option value="${u.name}">${u.name}</option>`).join("");
  }

  const accPayerSelect = document.getElementById("acc-modal-payer-select");
  if (accPayerSelect) {
    accPayerSelect.innerHTML = `
      <option value="待補">待補</option>
      <option value="個人">個人自理</option>
    ` + APP_STATE.users.map(u => `<option value="${u.name}">${u.name}</option>`).join("");
  }

  // Populate checkboxes for participants selection in splits
  const checkboxesContainer = document.getElementById("exp-participants-checkboxes");
  if (checkboxesContainer) {
    checkboxesContainer.innerHTML = APP_STATE.users.map(u => `
      <label class="checkbox-item">
        <input type="checkbox" name="exp-parts-checkbox" value="${u.id}" checked>
        <span>${u.name}</span>
      </label>
    `).join("");
  }

  // Checkbox state change listener to recalculate splits dynamically
  document.querySelectorAll('input[name="exp-parts-checkbox"]').forEach(chk => {
    chk.addEventListener("change", () => {
      rebuildCustomSplitInputs();
    });
  });

  // Custom rate listener
  const rateInput = document.getElementById("input-exchange-rate");
  if (rateInput) {
    rateInput.addEventListener("change", (e) => {
      const val = Number(e.target.value) || 0.21;
      APP_STATE.exchangeRate = val;
      saveState(APP_STATE);
      // Refresh active page totals
      const activeView = document.querySelector(".view-panel.active").id.replace("view-", "");
      renderPageData(activeView);
    });
  }

  // Search input and Filter selectors listeners
  document.getElementById("expense-search-input").addEventListener("input", renderExpensesListTable);
  
  // Populate payer filter dropdown options
  const filterPayer = document.getElementById("expense-filter-payer");
  if (filterPayer) {
    filterPayer.innerHTML = `<option value="all">付款人：全部</option>` + APP_STATE.users.map(u => `<option value="${u.id}">${u.name}</option>`).join("");
    filterPayer.addEventListener("change", renderExpensesListTable);
  }
  
  document.getElementById("expense-filter-type").addEventListener("change", renderExpensesListTable);
  document.getElementById("expense-filter-category").addEventListener("change", renderExpensesListTable);
  document.getElementById("expense-filter-status").addEventListener("change", renderExpensesListTable);

  // Split Type toggle settings
  const splitTypeSelect = document.getElementById("exp-split-type");
  splitTypeSelect.addEventListener("change", () => {
    toggleSplitInputsVisibility();
  });

  const resvStatusSelect = document.getElementById("fd-modal-resv-status");
  if (resvStatusSelect) {
    resvStatusSelect.addEventListener("change", () => {
      toggleFoodResvFieldsVisibility();
    });
  }

  // Modal Closers
  document.querySelectorAll(".close-modal-btn, .btn-ghost").forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });

  // Initial Form Submits
  document.getElementById("form-expense").onsubmit = onExpenseFormSubmit;
  document.getElementById("form-itinerary").onsubmit = onItineraryFormSubmit;
  document.getElementById("form-todo").onsubmit = onTodoFormSubmit;
  document.getElementById("form-ticket").onsubmit = onTicketFormSubmit;
  document.getElementById("form-transport").onsubmit = onTransportFormSubmit;
  document.getElementById("form-accommodation").onsubmit = onAccommodationFormSubmit;
  document.getElementById("form-place").onsubmit = onPlaceFormSubmit;
  document.getElementById("form-food").onsubmit = onFoodFormSubmit;
  
  const formPacking = document.getElementById("form-packing");
  if (formPacking) {
    formPacking.onsubmit = onPackingFormSubmit;
  }

  const formShoppingItem = document.getElementById("form-shopping-item");
  if (formShoppingItem) {
    formShoppingItem.onsubmit = onShoppingItemFormSubmit;
  }

  const formCoupon = document.getElementById("form-coupon");
  if (formCoupon) {
    formCoupon.onsubmit = onCouponFormSubmit;
  }

  // Add Item Openers
  document.getElementById("btn-add-expense").onclick = () => openExpenseModal(null);
  document.getElementById("btn-add-itinerary").onclick = () => openItineraryModal(null);
  document.getElementById("btn-add-todo").onclick = () => openTodoModal(null);

  const btnAddPacking = document.getElementById("btn-add-packing");
  if (btnAddPacking) {
    btnAddPacking.onclick = () => openPackingModal(null);
  }

  const btnAddShoppingItem = document.getElementById("btn-add-shopping-item");
  if (btnAddShoppingItem) {
    btnAddShoppingItem.onclick = () => openShoppingItemModal(null);
  }

  const btnAddCoupon = document.getElementById("btn-add-coupon");
  if (btnAddCoupon) {
    btnAddCoupon.onclick = () => openCouponModal(null);
  }
  
  const addTrBtn = document.getElementById("btn-add-transport");
  if (addTrBtn) {
    addTrBtn.onclick = () => openTransportModal(null);
  }
  
  const addTkBtn = document.getElementById("btn-add-ticket");
  if (addTkBtn) {
    addTkBtn.onclick = () => openTicketModal(null);
  }

  const addAccBtn = document.getElementById("btn-add-accommodation");
  if (addAccBtn) {
    addAccBtn.onclick = () => openAccommodationModal(null);
  }

  const addPlBtn = document.getElementById("btn-add-place");
  if (addPlBtn) {
    addPlBtn.onclick = () => openPlaceModal(null);
  }

  const addBookedFdBtn = document.getElementById("btn-add-booked-food");
  if (addBookedFdBtn) {
    addBookedFdBtn.onclick = () => openFoodModal(null, 'confirmed');
  }

  const addBackupFdBtn = document.getElementById("btn-add-backup-food");
  if (addBackupFdBtn) {
    addBackupFdBtn.onclick = () => openFoodModal(null, 'none');
  }

  // Form Cancels
  const cancelTkBtn = document.getElementById("btn-cancel-ticket");
  if (cancelTkBtn) {
    cancelTkBtn.onclick = () => closeAllModals();
  }

  const cancelTrBtn = document.getElementById("btn-cancel-transport");
  if (cancelTrBtn) {
    cancelTrBtn.onclick = () => closeAllModals();
  }

  const cancelAccBtn = document.getElementById("btn-cancel-accommodation");
  if (cancelAccBtn) {
    cancelAccBtn.onclick = () => closeAllModals();
  }

  const cancelPlBtn = document.getElementById("btn-cancel-place");
  if (cancelPlBtn) {
    cancelPlBtn.onclick = () => closeAllModals();
  }

  const cancelFdBtn = document.getElementById("btn-cancel-food");
  if (cancelFdBtn) {
    cancelFdBtn.onclick = () => closeAllModals();
  }

  // Auto per-person cost calculation for accommodation form
  const accTotalAmtInput = document.getElementById("acc-modal-total-amt");
  const accPerPersonInput = document.getElementById("acc-modal-per-person");
  if (accTotalAmtInput && accPerPersonInput) {
    accTotalAmtInput.addEventListener("input", (e) => {
      const val = Number(e.target.value) || 0;
      accPerPersonInput.value = Math.round(val / 5);
    });
  }

  // CSV Exporters
  document.getElementById("btn-export-expenses").onclick = exportExpensesCSV;
  document.getElementById("btn-export-settlements").onclick = exportSettlementsCSV;
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
}

function toggleSplitInputsVisibility() {
  const type = document.getElementById("exp-split-type").value;
  const partsBox = document.getElementById("participants-selection-box");
  const customBox = document.getElementById("custom-split-amounts-box");

  if (type === "personal") {
    partsBox.classList.add("hidden");
    customBox.classList.add("hidden");
  } else if (type === "equal") {
    partsBox.classList.remove("hidden");
    customBox.classList.add("hidden");
  } else if (type === "custom") {
    partsBox.classList.remove("hidden");
    customBox.classList.remove("hidden");
    rebuildCustomSplitInputs();
  }
}

function rebuildCustomSplitInputs() {
  const container = document.getElementById("exp-custom-amounts-list");
  container.innerHTML = "";

  const checkedUsers = Array.from(document.querySelectorAll('input[name="exp-parts-checkbox"]:checked'))
                            .map(chk => chk.value);
  
  // Set labels JPY or TWD
  const cur = document.getElementById("exp-currency").value;
  document.getElementById("custom-split-currency-label").textContent = cur;

  if (checkedUsers.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem; color:var(--danger)">請至少選擇一個分攤對象。</div>`;
    return;
  }

  // Pre-fill placeholder allocations
  const totalAmt = Number(document.getElementById("exp-amount").value) || 0;
  const splitPlaceholder = (totalAmt / checkedUsers.length).toFixed(1);

  checkedUsers.forEach(uid => {
    const name = getUsernameById(uid);
    const row = document.createElement("div");
    row.className = "custom-amount-row";
    row.innerHTML = `
      <span>${name}:</span>
      <input type="number" step="any" min="0" class="custom-split-user-input" data-uid="${uid}" placeholder="${splitPlaceholder}" required>
    `;
    container.appendChild(row);
  });
}

// --------------------------------------------------------------------------
// 6.1 Expense Form Submits & Handlers
// --------------------------------------------------------------------------

function openExpenseModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-expense");
  modal.classList.add("active");

  const form = document.getElementById("form-expense");
  form.reset();

  const titleNode = document.getElementById("expense-modal-title");
  const idInput = document.getElementById("expense-id-input");

  // Re-check all users checkboxes
  document.querySelectorAll('input[name="exp-parts-checkbox"]').forEach(c => c.checked = true);

  if (id) {
    titleNode.textContent = "編輯支出項目";
    idInput.value = id;

    // Load expense info
    const e = APP_STATE.expenses.find(item => item.id === id);
    if (e) {
      document.getElementById("exp-date").value = e.date;
      document.getElementById("exp-category").value = e.category;
      document.getElementById("exp-item-name").value = e.itemName;
      document.getElementById("exp-amount").value = e.amount;
      document.getElementById("exp-currency").value = e.currency;
      document.getElementById("exp-payer").value = e.payerId;
      document.getElementById("exp-split-type").value = e.splitType;
      document.getElementById("exp-payment-method").value = e.paymentMethod || "信用卡";
      document.getElementById("exp-settlement-status").value = e.settlementStatus;
      document.getElementById("exp-note").value = e.note || "";

      // set participants checks
      document.querySelectorAll('input[name="exp-parts-checkbox"]').forEach(chk => {
        chk.checked = e.participants.includes(chk.value);
      });

      toggleSplitInputsVisibility();

      // Set custom amounts if exists
      if (e.splitType === "custom" && e.customAmounts) {
        setTimeout(() => {
          document.querySelectorAll(".custom-split-user-input").forEach(input => {
            const uid = input.getAttribute("data-uid");
            if (e.customAmounts[uid] !== undefined) {
              input.value = e.customAmounts[uid];
            }
          });
        }, 100);
      }
    }
  } else {
    titleNode.textContent = "新增支出項目";
    idInput.value = "";
    document.getElementById("exp-date").value = new Date().toISOString().substring(0, 10);
    toggleSplitInputsVisibility();
  }
}

function onExpenseFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("expense-id-input").value;
  const date = document.getElementById("exp-date").value;
  const category = document.getElementById("exp-category").value;
  const itemName = document.getElementById("exp-item-name").value;
  const amount = Number(document.getElementById("exp-amount").value) || 0;
  const currency = document.getElementById("exp-currency").value;
  const payerId = document.getElementById("exp-payer").value;
  const splitType = document.getElementById("exp-split-type").value;
  const paymentMethod = document.getElementById("exp-payment-method").value;
  const settlementStatus = document.getElementById("exp-settlement-status").value;
  const note = document.getElementById("exp-note").value;

  const checkedParts = Array.from(document.querySelectorAll('input[name="exp-parts-checkbox"]:checked'))
                            .map(chk => chk.value);

  // Validate splits inputs details
  const customAmounts = {};
  if (splitType === "custom") {
    let customSum = 0;
    let hasValidationError = false;

    document.querySelectorAll(".custom-split-user-input").forEach(input => {
      const uid = input.getAttribute("data-uid");
      const val = Number(input.value) || 0;
      customAmounts[uid] = val;
      customSum += val;
    });

    // Check sum match
    const diff = Math.abs(customSum - amount);
    if (diff > 0.5) {
      document.getElementById("custom-split-error-msg").textContent = `各人分攤總和 (${customSum.toLocaleString()}) 與支出總金額 (${amount.toLocaleString()}) 不符，請校對數值！`;
      return;
    }
  }

  document.getElementById("custom-split-error-msg").textContent = "";

  const expenseItem = {
    id: id || `exp-${Date.now()}`,
    date,
    category,
    itemName,
    amount,
    currency,
    payerId,
    splitType,
    participants: splitType === "personal" ? [payerId] : checkedParts,
    customAmounts,
    paymentMethod,
    settlementStatus,
    note
  };

  if (id) {
    // Modify existing record
    const idx = APP_STATE.expenses.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.expenses[idx] = expenseItem;
  } else {
    // Add new
    APP_STATE.expenses.push(expenseItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderExpenses();
  if (window.lucide) window.lucide.createIcons();
}

// --------------------------------------------------------------------------
// 6.2 Itinerary Form Submits & Handlers
// --------------------------------------------------------------------------

function openItineraryModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-itinerary");
  modal.classList.add("active");

  const form = document.getElementById("form-itinerary");
  form.reset();

  const titleNode = document.getElementById("itinerary-modal-title");
  const idInput = document.getElementById("itinerary-id-input");

  if (id) {
    titleNode.textContent = "編輯行程項目";
    idInput.value = id;

    const iti = APP_STATE.itineraries.find(item => item.id === id);
    if (iti) {
      document.getElementById("iti-date").value = iti.date;
      document.getElementById("iti-category").value = iti.category;
      document.getElementById("iti-start-time").value = iti.startTime || "";
      document.getElementById("iti-end-time").value = iti.endTime || "";
      document.getElementById("iti-area").value = iti.area;
      document.getElementById("iti-priority").value = iti.priority || "medium";
      document.getElementById("iti-title").value = iti.title;
      document.getElementById("iti-location-name").value = iti.locationName || "";
      document.getElementById("iti-google-map-url").value = iti.googleMapUrl || "";
      document.getElementById("iti-transport-note").value = iti.transportNote || "";
      document.getElementById("iti-reservation-status").value = iti.reservationStatus || "none";
      document.getElementById("iti-is-flexible").value = String(iti.isFlexible || false);
      document.getElementById("iti-backup-plan").value = iti.backupPlan || "";
      document.getElementById("iti-note").value = iti.note || "";
    }
  } else {
    titleNode.textContent = "新增行程項目";
    idInput.value = "";
    document.getElementById("iti-date").value = SELECTED_ITINERARY_DATE;
  }
}

function onItineraryFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("itinerary-id-input").value;
  const date = document.getElementById("iti-date").value;
  const category = document.getElementById("iti-category").value;
  const startTime = document.getElementById("iti-start-time").value;
  const endTime = document.getElementById("iti-end-time").value;
  const area = document.getElementById("iti-area").value;
  const priority = document.getElementById("iti-priority").value;
  const title = document.getElementById("iti-title").value;
  const locationName = document.getElementById("iti-location-name").value;
  const googleMapUrl = document.getElementById("iti-google-map-url").value;
  const transportNote = document.getElementById("iti-transport-note").value;
  const reservationStatus = document.getElementById("iti-reservation-status").value;
  const isFlexible = document.getElementById("iti-is-flexible").value === "true";
  const backupPlan = document.getElementById("iti-backup-plan").value;
  const note = document.getElementById("iti-note").value;

  const itineraryItem = {
    id: id || `iti-${Date.now()}`,
    date,
    category,
    startTime,
    endTime,
    area,
    priority,
    title,
    locationName,
    googleMapUrl,
    transportNote,
    reservationStatus,
    isFlexible,
    backupPlan,
    note
  };

  if (id) {
    const idx = APP_STATE.itineraries.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.itineraries[idx] = itineraryItem;
  } else {
    APP_STATE.itineraries.push(itineraryItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  
  // Set date viewport to the edited day
  SELECTED_ITINERARY_DATE = date;
  renderItinerary();
  if (window.lucide) window.lucide.createIcons();
}

// --------------------------------------------------------------------------
// 6.3 Todo Form Submits & Handlers
// --------------------------------------------------------------------------

function openTodoModal(id) {
  closeAllModals();
  const modal = document.getElementById("modal-todo");
  modal.classList.add("active");

  const form = document.getElementById("form-todo");
  form.reset();

  const titleNode = document.getElementById("todo-modal-title");
  const idInput = document.getElementById("todo-id-input");

  if (id) {
    titleNode.textContent = "編輯待補項目";
    idInput.value = id;

    const todo = APP_STATE.todos.find(item => item.id === id);
    if (todo) {
      document.getElementById("todo-title").value = todo.title;
      document.getElementById("todo-category").value = todo.category;
      document.getElementById("todo-priority").value = todo.priority;
      document.getElementById("todo-owner").value = todo.ownerId || "";
      document.getElementById("todo-status").value = todo.status;
      document.getElementById("todo-due-date").value = todo.dueDate || "";
      document.getElementById("todo-note").value = todo.note || "";
    }
  } else {
    titleNode.textContent = "新增待補項目";
    idInput.value = "";
    document.getElementById("todo-status").value = "open";
  }
}

function onTodoFormSubmit(evt) {
  evt.preventDefault();

  const id = document.getElementById("todo-id-input").value;
  const title = document.getElementById("todo-title").value;
  const category = document.getElementById("todo-category").value;
  const priority = document.getElementById("todo-priority").value;
  const ownerId = document.getElementById("todo-owner").value;
  const status = document.getElementById("todo-status").value;
  const dueDate = document.getElementById("todo-due-date").value;
  const note = document.getElementById("todo-note").value;

  const todoItem = {
    id: id || `todo-${Date.now()}`,
    title,
    category,
    priority,
    ownerId: ownerId || null,
    status,
    dueDate,
    note
  };

  if (id) {
    const idx = APP_STATE.todos.findIndex(item => item.id === id);
    if (idx !== -1) APP_STATE.todos[idx] = todoItem;
  } else {
    APP_STATE.todos.push(todoItem);
  }

  saveState(APP_STATE);
  closeAllModals();
  renderTodos();
  if (window.lucide) window.lucide.createIcons();
}


// ==========================================================================
// 7. CSV Export Logic with BOM to support Excel Chinese encoding
// ==========================================================================

function downloadCSVFile(csvContent, filename) {
  const bom = "\uFEFF"; // UTF-8 BOM
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function exportExpensesCSV() {
  const headers = ["日期", "項目", "類別", "金額", "幣別", "付款者", "分攤方式", "結清狀態", "備註"];
  
  const rows = APP_STATE.expenses.map(e => {
    const payerName = getUsernameById(e.payerId);
    const statusText = e.settlementStatus === "settled" ? "已結清" : "未結清";
    return [
      e.date,
      `"${e.itemName.replace(/"/g, '""')}"`,
      e.category,
      e.amount,
      e.currency,
      payerName,
      e.splitType,
      statusText,
      `"${(e.note || "").replace(/"/g, '""')}"`
    ];
  });

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  downloadCSVFile(csvContent, "東京行_支出記錄.csv");
}

function exportSettlementsCSV() {
  const results = runSettlementCalculator();
  
  // Headers for details
  const headers = ["姓名", "角色", "代墊金額 (TWD)", "代墊金額 (JPY)", "應付金額 (TWD)", "應付金額 (JPY)", "差額 (台幣折算)"];
  const rows = Object.values(results).map(r => [
    r.name,
    r.role,
    Math.round(r.paidTwd),
    Math.round(r.paidJpy),
    Math.round(r.shareTwd),
    Math.round(r.shareJpy),
    Math.round(r.balanceTwd)
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  downloadCSVFile(csvContent, "東京行_分帳統計.csv");
}


// ==========================================================================
// 8. Application Initializer
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initFormControllers();
  initTicketLightbox();
});
