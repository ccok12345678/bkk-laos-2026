export interface CityWeather {
  city: 'bangkok' | 'luangprabang';
  name: string;
  month: string;
  daytime: string;
  nighttime: string;
  notes: string[];
  packing: string[];
}

export const WEATHER_INFO: CityWeather[] = [
  {
    city: 'bangkok',
    name: '曼谷',
    month: '12 月初（涼季）',
    daytime: '30–33°C',
    nighttime: '22–25°C',
    notes: [
      '涼季最舒適月份，幾乎不下雨',
      'UV 仍強，需防曬',
      '早晚溫差小',
    ],
    packing: [
      '短袖 / 薄長袖上衣',
      '寺廟用長褲 / 長裙',
      '防曬乳 SPF 50+',
      '防蚊液',
    ],
  },
  {
    city: 'luangprabang',
    name: '龍坡邦',
    month: '12 月初（乾季）',
    daytime: '25–27°C',
    nighttime: '10–15°C（月底可達 10°C）',
    notes: [
      '清晨布施與日出約 10–12°C，務必備薄外套',
      '無煙霾，空氣清朗',
      '早晚溫差大（白天可穿短袖，夜晚需外套）',
      '旅遊旺季起點',
    ],
    packing: [
      '薄羽絨或刷毛外套（清晨）',
      '長袖上衣',
      '寺廟用長褲',
      '防滑鞋（光西瀑布必備）',
      '披肩（皇宮博物館、寺廟）',
      '手電筒或手機燈（夜間街道無路燈）',
    ],
  },
];

export const WEATHER_SUMMARY =
  '12 月初為兩地最佳季節：曼谷涼季舒適、龍坡邦乾季清朗，唯龍坡邦清晨可降至 10°C，務必備薄外套。';
