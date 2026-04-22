import type { Hotel } from '@/types';
import { withTwd } from './exchange-rates';

export const HOTELS: Hotel[] = [
  // Bangkok
  {
    id: 'aurum-the-river-place',
    name: 'Aurum The River Place',
    city: 'bangkok',
    district: 'Tha Tien 碼頭旁（舊城）',
    priceRange: withTwd({
      amount: 2800,
      currency: 'THB',
      isRange: true,
      maxAmount: 3800,
    }),
    features: ['河岸景觀', '12 房精品', '步行 5 分到大皇宮', '精緻早餐'],
    googleMapsUrl: 'https://maps.google.com/?q=Aurum+The+River+Place+Bangkok',
    suitableFor: '2 人古蹟路線首選，舊城最具氛圍',
    isRecommended: true,
  },
  {
    id: 'shanghai-mansion',
    name: 'Shanghai Mansion Bangkok',
    city: 'bangkok',
    district: '中國城 Yaowarat',
    priceRange: withTwd({
      amount: 3000,
      currency: 'THB',
      isRange: true,
      maxAmount: 5000,
    }),
    features: ['1930 上海風 Art Deco', '74 主題房', '中國城核心位置'],
    googleMapsUrl: 'https://maps.google.com/?q=Shanghai+Mansion+Bangkok',
    suitableFor: '文化氛圍派、喜歡夜市覓食',
    isRecommended: false,
  },
  {
    id: 'mercure-sukhumvit-11',
    name: 'Mercure Sukhumvit 11',
    city: 'bangkok',
    district: 'Sukhumvit',
    priceRange: withTwd({
      amount: 2500,
      currency: 'THB',
      isRange: true,
      maxAmount: 3800,
    }),
    features: ['4 星雅高', '屋頂泳池', '近 BTS Nana'],
    googleMapsUrl:
      'https://maps.google.com/?q=Mercure+Bangkok+Sukhumvit+11',
    suitableFor: '交通便利派、需商旅等級設施',
    isRecommended: false,
  },
  {
    id: 's15-sukhumvit',
    name: 'S15 Sukhumvit',
    city: 'bangkok',
    district: 'Asoke',
    priceRange: withTwd({
      amount: 2800,
      currency: 'THB',
      isRange: true,
      maxAmount: 4000,
    }),
    features: ['BTS/MRT 雙軌交會', '現代商旅', '附設 SPA'],
    googleMapsUrl: 'https://maps.google.com/?q=S15+Sukhumvit+Hotel+Bangkok',
    suitableFor: '備選：需要最便利地鐵銜接',
    isRecommended: false,
  },

  // Luang Prabang
  {
    id: 'villa-maly',
    name: 'Villa Maly Boutique Hotel',
    city: 'luangprabang',
    district: '舊城',
    priceRange: withTwd({
      amount: 220,
      currency: 'USD',
      isRange: true,
      maxAmount: 300,
    }),
    totalPricePerNight: withTwd({
      amount: 220,
      currency: 'USD',
      isRange: true,
      maxAmount: 300,
    }),
    roomArrangement: '2 × Deluxe Twin',
    features: [
      '前寮國皇室別墅改建',
      '法式殖民建築',
      '泳池',
      '米其林推薦餐廳',
    ],
    googleMapsUrl:
      'https://maps.google.com/?q=Villa+Maly+Boutique+Hotel+Luang+Prabang',
    suitableFor: '文化氛圍最濃、欲分房住宿的 4 人',
    isRecommended: true,
  },
  {
    id: 'my-dream-boutique',
    name: 'My Dream Boutique Resort',
    city: 'luangprabang',
    district: '南康河畔',
    priceRange: withTwd({
      amount: 130,
      currency: 'USD',
      isRange: true,
      maxAmount: 180,
    }),
    totalPricePerNight: withTwd({
      amount: 130,
      currency: 'USD',
      isRange: true,
      maxAmount: 180,
    }),
    roomArrangement: '1 × 2-Bedroom Family Suite（66m²，可容 6 人）',
    features: [
      '南康河畔',
      '3 座泳池',
      '可眺望 Wat Chomsi',
      '獨立整套使用',
    ],
    googleMapsUrl:
      'https://maps.google.com/?q=My+Dream+Boutique+Resort+Luang+Prabang',
    suitableFor: '4–5 人最划算方案（總價最低，整套獨立使用）',
    isRecommended: true,
  },
  {
    id: 'le-sen',
    name: 'Le Sen Boutique Hotel & Spa',
    city: 'luangprabang',
    district: '舊城邊緣',
    priceRange: withTwd({
      amount: 152,
      currency: 'USD',
      isRange: true,
      maxAmount: 260,
    }),
    totalPricePerNight: withTwd({
      amount: 152,
      currency: 'USD',
      isRange: true,
      maxAmount: 260,
    }),
    roomArrangement: '2 × Villa',
    features: [
      'TripAdvisor 龍坡邦 #1',
      '15 房圍中庭',
      '免費接駁',
      'SPA',
    ],
    googleMapsUrl:
      'https://maps.google.com/?q=Le+Sen+Boutique+Hotel+Luang+Prabang',
    suitableFor: '4 人分男女房、口碑派',
    isRecommended: false,
  },
];
