export type CurrencyCode = 'THB' | 'LAK' | 'USD' | 'TWD';
export type CityId = 'bangkok' | 'luangprabang' | 'in-transit';

export interface Price {
  amount: number;
  currency: CurrencyCode;
  twdEquivalent?: number;
  isRange?: boolean;
  maxAmount?: number;
}

export type PoiType =
  | 'temple'
  | 'museum'
  | 'restaurant'
  | 'experience'
  | 'market'
  | 'landmark'
  | 'hotel'
  | 'transport'
  | 'cafe'
  | 'shop'
  | 'nature';

export interface PoiItem {
  id: string;
  name: string;
  nameLocal?: string;
  nameEn?: string;
  type: PoiType;
  city: CityId;
  address?: string;
  description: string;
  shortDescription?: string;
  openHours?: string;
  price?: Price;
  googleMapsUrl: string;
  wikipediaUrl?: string;
  officialUrl?: string;
  tips?: string[];
  dressCode?: string;
  highlights?: string[];
  imageUrl?: string;
}

export type ItineraryCategory =
  | 'sightseeing'
  | 'meal'
  | 'transport'
  | 'rest'
  | 'shopping'
  | 'experience'
  | 'check-in'
  | 'check-out';

export interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  poiId?: string;
  price?: Price;
  tips?: string[];
  category: ItineraryCategory;
  isOptional?: boolean;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  city: CityId;
  theme: string;
  subtitle?: string;
  items: ItineraryItem[];
  tips?: string[];
  dailyBudget?: Price;
}

export type FlightSegment = 'tpe-bkk' | 'bkk-lpq' | 'lpq-tpe';

export interface Flight {
  id: string;
  segment: FlightSegment;
  airline: string;
  airlineCode: string;
  flightNumber?: string;
  departure: {
    airport: string;
    airportName: string;
    time?: string;
  };
  arrival: {
    airport: string;
    airportName: string;
    time?: string;
  };
  duration: string;
  includesBaggage: boolean;
  baggageAllowance?: string;
  includesMeal: boolean;
  priceRange: Price;
  notes?: string[];
  isRecommended: boolean;
  warning?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: CityId;
  district: string;
  priceRange: Price;
  features: string[];
  googleMapsUrl: string;
  bookingUrls?: Array<{ platform: string; url: string }>;
  suitableFor: string;
  isRecommended: boolean;
  roomArrangement?: string;
  totalPricePerNight?: Price;
}

export type BudgetTier = 'frugal' | 'mid' | 'comfort';

export interface BudgetBreakdown {
  category: string;
  frugal: number;
  mid: number;
  comfort: number;
  unit: 'per-person' | 'per-group';
  note?: string;
}

export type ChecklistGroup =
  | 'documents'
  | 'booking'
  | 'packing'
  | 'apps'
  | 'insurance';

export interface ChecklistItem {
  id: string;
  group: ChecklistGroup;
  text: string;
  dueDate?: string;
  important: boolean;
  details?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  phoneDisplay: string;
  description: string;
  region: 'taiwan' | 'thailand' | 'laos' | 'global';
}

export interface ExchangeRate {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  updatedAt: string;
}

export interface EtiquetteRule {
  id: string;
  category: 'temple-dress' | 'alms-giving' | 'thai-royal' | 'general';
  title: string;
  description: string;
  severity: 'critical' | 'important' | 'tip';
  dos?: string[];
  donts?: string[];
}

export interface VisaInfo {
  country: 'thailand' | 'laos';
  type: string;
  duration: string;
  cost?: Price;
  requirements: string[];
  applicationUrl?: string;
  notes: string[];
  isRecommended?: boolean;
}

export interface SimOption {
  id: string;
  name: string;
  type: 'physical' | 'esim' | 'regional';
  coverage: string[];
  duration: string;
  data: string;
  price: Price;
  pros: string[];
  cons: string[];
  isRecommended?: boolean;
  purchaseUrl?: string;
}
