import type { SimOption } from '@/types';
import { withTwd } from './exchange-rates';

export const SIM_OPTIONS: SimOption[] = [
  {
    id: 'ais-sim2fly-asia',
    name: 'AIS SIM2Fly Asia',
    type: 'regional',
    coverage: ['泰國', '寮國', '越南', '新加坡', '馬來西亞', '等 14 國'],
    duration: '8 天',
    data: '6GB（超過降速吃到飽）',
    price: withTwd({ amount: 400, currency: 'TWD' }),
    pros: [
      '一卡通用，不必換 SIM',
      '台灣可先買（蝦皮、YesSIM 等）',
      '啟用自動，抵達即可用',
    ],
    cons: ['6GB 高速用完會限速', '通話費率高（建議用 WhatsApp/LINE 通話）'],
    isRecommended: true,
    purchaseUrl: 'https://www.ais.co.th/esim/en/',
  },
  {
    id: 'ais-tourist-sim',
    name: 'AIS Tourist SIM（泰國原生）',
    type: 'physical',
    coverage: ['泰國'],
    duration: '8 天',
    data: '15GB',
    price: withTwd({ amount: 349, currency: 'THB' }),
    pros: ['原生卡網速最快', '曼谷 7-11 或機場可買', '吃到飽體驗最佳'],
    cons: ['僅限泰國，入寮國需換卡', '需現場買'],
    isRecommended: false,
  },
  {
    id: 'unitel-laos',
    name: 'Unitel（寮國原生）',
    type: 'physical',
    coverage: ['寮國'],
    duration: '7–15 天',
    data: '5–15GB',
    price: withTwd({
      amount: 50000,
      currency: 'LAK',
      isRange: true,
      maxAmount: 150000,
    }),
    pros: ['寮國網速最穩', 'LPQ 機場大廳即有櫃檯', '費用親民'],
    cons: ['僅限寮國', '與泰國需切換'],
    isRecommended: false,
  },
  {
    id: 'airalo-asialink',
    name: 'Airalo Asialink eSIM',
    type: 'esim',
    coverage: ['泰國', '寮國', '越南', '等亞洲 14 國'],
    duration: '7 天',
    data: '3GB',
    price: withTwd({ amount: 13, currency: 'USD' }),
    pros: ['eSIM 即買即裝', '無需換卡', '多國漫遊'],
    cons: ['部分手機不支援 eSIM', '3GB 對影片使用者偏少'],
    isRecommended: false,
    purchaseUrl: 'https://www.airalo.com/asia-esim/asialink',
  },
];

export const SIM_RECOMMENDATION =
  '**4–5 人推薦組合**：1–2 人裝 AIS Tourist SIM（泰國原生吃到飽）在曼谷分享熱點，其他人用 SIM2Fly Asia 跨國通用。抵龍坡邦後全員仍可用 SIM2Fly，流量多者可另購 Unitel 補上。';
