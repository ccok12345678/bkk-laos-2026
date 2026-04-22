import type { VisaInfo } from '@/types';
import { withTwd } from './exchange-rates';

export const VISA_INFO: VisaInfo[] = [
  {
    country: 'thailand',
    type: '免簽證入境（持中華民國護照）',
    duration: '最多停留 60 天',
    requirements: [
      '護照效期 6 個月以上',
      '回程機票證明（入境可能抽查）',
      '抵泰前 72 小時內填寫 TDAC 數位入境卡',
      '2026 年 2 月起可能徵收 300 THB 入境費（出發前請確認）',
    ],
    applicationUrl: 'https://tdac.immigration.go.th',
    notes: [
      '2024/7/15 起為永久免簽',
      'TDAC 取代紙本入境卡，務必於 72 小時內線上填妥',
      '落地 e-Gate 目前不開放台灣護照，走人工櫃檯',
    ],
    isRecommended: true,
  },
  {
    country: 'laos',
    type: '落地簽證 VOA（最推薦）',
    duration: '停留 30 天',
    cost: withTwd({ amount: 41, currency: 'USD' }),
    requirements: [
      'USD 40 + 機場手續費 USD 1（建議備 USD 小鈔）',
      '2 吋大頭照 1 張',
      '護照效期 6 個月以上',
      '入境前 7 天內填寫 LDIF 電子入境卡',
    ],
    applicationUrl: 'https://laoevisa.gov.la',
    notes: [
      '龍坡邦機場航班少、排隊不久，落地簽最划算',
      '費用請備 USD 現金，機場匯率差',
      'eVisa 另計 USD 50–52，3 個工作天處理（時間充裕可選）',
      '2025 起新增 LDIF 線上入境卡，入境前 7 天內填寫',
    ],
    isRecommended: true,
  },
  {
    country: 'laos',
    type: '電子簽證 eVisa（備案）',
    duration: '停留 30 天',
    cost: withTwd({ amount: 52, currency: 'USD' }),
    requirements: [
      '線上填寫 + 信用卡繳費',
      '護照掃描 + 數位照片',
      '3 個工作天處理',
    ],
    applicationUrl: 'https://laoevisa.gov.la',
    notes: [
      '費用較 VOA 貴約 USD 10',
      '適合不想在機場排隊或搭乘陸路入境者',
    ],
  },
];

export const TDAC_STEPS = [
  '抵泰前 72 小時內進入 tdac.immigration.go.th 官網',
  '選「Arrival Card」並同意條款',
  '填寫個人資料、航班資訊、在泰住宿地址',
  '確認送出後保存 QR Code 或列印備用',
  '抵達時向海關出示 QR Code',
] as const;

export const LAOS_VOA_STEPS = [
  '下飛機後隨人流至 Visa on Arrival 櫃檯',
  '繳交申請表 + 護照 + 2 吋照片 + USD 41',
  '等 5–15 分鐘領回護照取得簽證貼紙',
  '通關、提取行李',
] as const;
