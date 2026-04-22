import type { EtiquetteRule } from '@/types';

export const ETIQUETTE_RULES: EtiquetteRule[] = [
  {
    id: 'temple-dress',
    category: 'temple-dress',
    title: '寺廟著裝絕對規範',
    description:
      '大皇宮、皇宮博物館等皇家寺廟嚴格執行著裝，違規一律拒絕入內。',
    severity: 'critical',
    dos: [
      '遮肩過膝（長袖或短袖上衣、長褲或長裙）',
      '進入佛殿脫鞋脫帽',
      '隨身攜帶披肩以備檢查不過',
      '大皇宮現場可租沙龍（押金 200 THB）',
    ],
    donts: [
      '不可穿無袖、短褲、破洞牛仔褲、緊身運動褲、透視衣',
      '女性不可碰觸僧侶，遞物須由男性轉交',
      '不可在佛像前合照時以腳指向佛像',
      '不可爬上佛像拍照',
    ],
  },
  {
    id: 'alms-giving',
    category: 'alms-giving',
    title: '龍坡邦清晨布施三大守則',
    description:
      'Tak Bat 為龍坡邦最神聖的宗教儀式，觀光客干擾已成當地痛點，請務必守禮。',
    severity: 'critical',
    dos: [
      '參與供養者坐矮板凳、赤腳或脫鞋',
      '拍照距離至少 3–5 米並關閉閃光燈',
      '女性不可直接遞食物給僧侶，須由男性轉交',
      '糯米飯向 Phosi 早市購買（公定價 20,000 LAK/公斤）',
      '飯店代購或請在地導覽協助',
    ],
    donts: [
      '絕對不說話、不大聲交談',
      '不閃光燈、不近距離特寫',
      '不向街邊小販買包裝餅乾糖果供養（品質差、不合儀軌）',
      '不穿無袖、短褲、緊身衣觀禮',
      '不擋住僧侶行進路線',
    ],
  },
  {
    id: 'thai-royal',
    category: 'thai-royal',
    title: '泰國「頭為尊、腳為卑」與皇室尊嚴',
    description:
      '泰國法律嚴格保護皇室尊嚴（lèse-majesté），違者可判 3–15 年，絕非兒戲。',
    severity: 'critical',
    dos: [
      '公共場所每日 08:00 與 18:00 奏國歌時全體起立',
      '電影院播國歌時起立致敬',
      '看見皇室肖像保持莊重',
      '與僧侶合照保持距離、勿觸碰',
    ],
    donts: [
      '不摸他人頭（連小孩也不行）',
      '不用腳指人或物品',
      '不踩紙鈔或硬幣（上有國王肖像）',
      '不公開議論或批評皇室',
      '不在社群媒體轉發對皇室不敬內容',
    ],
  },
  {
    id: 'general-tipping',
    category: 'general',
    title: '小費文化',
    description: '泰國與寮國皆有小費文化，非強制但普及。',
    severity: 'tip',
    dos: [
      '泰國餐廳：20–50 THB 或 10%',
      '泰式按摩：50–100 THB',
      '飯店行李員：20–50 THB/件',
      '寮國高級餐廳：5–10%',
      '寮國 SPA / 按摩：10,000–20,000 LAK',
      '包車司機一日：50,000–100,000 LAK',
    ],
  },
  {
    id: 'general-respect',
    category: 'general',
    title: '一般禮貌與尊重',
    description: '兩地皆保有佛教文化底蘊，言行低調為上。',
    severity: 'important',
    dos: [
      '合十（wai）為禮，比握手更親近',
      '進入他人住所脫鞋',
      '對長輩、僧侶主動讓座',
      '拍攝在地人請先詢問',
    ],
    donts: [
      '不大聲說話或在寺廟嬉鬧',
      '不以手指直指人或佛像',
      '不在僧侶托缽時擋道或搭訕',
      '不穿泳裝或輕便服裝進入市區寺廟區域',
    ],
  },
];
