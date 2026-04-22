import type { ChecklistItem } from '@/types';

export const CHECKLIST: ChecklistItem[] = [
  // ===== Documents =====
  {
    id: 'passport-validity',
    group: 'documents',
    text: '護照效期至 2027 年 6 月以後，至少 1 張空白簽證頁',
    important: true,
  },
  {
    id: 'tdac',
    group: 'documents',
    text: '出發前 72 小時內填寫泰國 TDAC 數位入境卡',
    dueDate: '2026-11-28',
    important: true,
    details: 'tdac.immigration.go.th',
  },
  {
    id: 'ldif',
    group: 'documents',
    text: '入境寮國前 7 天內填寫 LDIF 電子入境卡',
    dueDate: '2026-11-26',
    important: true,
  },
  {
    id: 'laos-voa-cash',
    group: 'documents',
    text: '備妥 USD 41 小鈔 + 2 吋大頭照 1 張（寮國落地簽）',
    important: true,
  },
  {
    id: 'passport-photocopy',
    group: 'documents',
    text: '護照影本、保險卡影本各一份隨身備份（與正本分開放）',
    important: false,
  },

  // ===== Booking =====
  {
    id: 'flights',
    group: 'booking',
    text: '7 月底前訂機票（尤其 4–5 人聯程回程連坐）',
    dueDate: '2026-07-31',
    important: true,
  },
  {
    id: 'hotel-lpq',
    group: 'booking',
    text: '1–2 個月前訂龍坡邦飯店（旺季熱門飯店易售罄）',
    dueDate: '2026-10-01',
    important: true,
  },
  {
    id: 'hotel-bkk',
    group: 'booking',
    text: '曼谷飯店訂房',
    dueDate: '2026-10-15',
    important: false,
  },
  {
    id: 'mandalao',
    group: 'booking',
    text: '預約 MandaLao 大象營（官網，提前 1–2 週）',
    dueDate: '2026-11-15',
    important: true,
    details: 'mandalaotours.com',
  },
  {
    id: 'ock-pop-tok',
    group: 'booking',
    text: '預約 Ock Pop Tok 紡織工作坊',
    dueDate: '2026-11-15',
    important: false,
    details: 'ockpoptok.com',
  },
  {
    id: 'alms-sticky-rice',
    group: 'booking',
    text: '洽飯店代購糯米飯（布施用）並確認當日布施時間',
    important: false,
  },

  // ===== Packing =====
  {
    id: 'warm-jacket',
    group: 'packing',
    text: '薄羽絨或刷毛外套（龍坡邦清晨 10–15°C）',
    important: true,
  },
  {
    id: 'temple-clothes',
    group: 'packing',
    text: '寺廟用長褲 + 有袖上衣或披肩',
    important: true,
  },
  {
    id: 'non-slip-shoes',
    group: 'packing',
    text: '防滑鞋（光西瀑布岩石極滑）',
    important: true,
  },
  {
    id: 'sunscreen',
    group: 'packing',
    text: '防曬乳 SPF 50+',
    important: false,
  },
  {
    id: 'rain-jacket',
    group: 'packing',
    text: '輕便雨衣',
    important: false,
  },
  {
    id: 'mosquito-repellent',
    group: 'packing',
    text: '防蚊液',
    important: false,
  },
  {
    id: 'personal-meds',
    group: 'packing',
    text: '個人藥品（腸胃藥、頭痛藥、防中暑）',
    important: true,
  },
  {
    id: 'usd-cash',
    group: 'packing',
    text: 'USD 100 / 50 / 20 小鈔（新版無折痕匯率最好）',
    important: true,
  },
  {
    id: 'power-adapter',
    group: 'packing',
    text: '泰 / 寮通用轉接頭（Type A/C 雙孔）',
    important: false,
  },

  // ===== Apps =====
  {
    id: 'app-grab',
    group: 'apps',
    text: 'Grab 叫車 App（泰國必備）',
    important: true,
  },
  {
    id: 'app-translate',
    group: 'apps',
    text: 'Google Translate 離線泰 / 寮文包',
    important: false,
  },
  {
    id: 'app-maps',
    group: 'apps',
    text: 'Google Maps 離線地圖（曼谷 / 龍坡邦）',
    important: true,
  },
  {
    id: 'app-mapsme',
    group: 'apps',
    text: 'Maps.me（離線備援）',
    important: false,
  },
  {
    id: 'app-xe',
    group: 'apps',
    text: 'XE Currency 匯率 App',
    important: false,
  },
  {
    id: 'app-klook',
    group: 'apps',
    text: 'Klook（景點門票、體驗預訂）',
    important: false,
  },

  // ===== Insurance =====
  {
    id: 'travel-insurance',
    group: 'insurance',
    text: '購買海外醫療 300 萬 + 緊急救援 旅平險（7 天約 NT$500–1,500/人）',
    important: true,
  },
  {
    id: 'mofa-register',
    group: 'insurance',
    text: '外交部旅外國人動態登錄',
    important: false,
    details: 'register.boca.gov.tw',
  },
];

export const CHECKLIST_GROUP_LABELS = {
  documents: '證件與文件',
  booking: '訂票與預約',
  packing: '行李打包',
  apps: '必備 App',
  insurance: '保險與登錄',
} as const;
