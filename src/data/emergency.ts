import type { EmergencyContact } from '@/types';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'taipei-thailand',
    name: '駐泰國台北經濟文化辦事處',
    phone: '+6621193555',
    phoneDisplay: '+66-2-119-3555',
    description: '泰國境內旅外國人急難救助',
    region: 'thailand',
  },
  {
    id: 'taipei-vietnam-laos',
    name: '駐越南台北經濟文化辦事處（兼轄寮國）',
    phone: '+84903404581',
    phoneDisplay: '+84-903-404-581',
    description: '寮國無館處，急難由駐越南辦事處兼轄',
    region: 'laos',
  },
  {
    id: 'mofa-emergency',
    name: '外交部緊急聯絡中心',
    phone: '+886800085095',
    phoneDisplay: '+886-800-085-095',
    description: '24 小時免付費（自國外撥打收當地費用）',
    region: 'global',
  },
  {
    id: 'thailand-police',
    name: '泰國警察',
    phone: '191',
    phoneDisplay: '191',
    description: '泰國境內報警',
    region: 'thailand',
  },
  {
    id: 'thailand-tourist-police',
    name: '泰國觀光警察',
    phone: '1155',
    phoneDisplay: '1155',
    description: '泰國 24 小時觀光客協助（英語）',
    region: 'thailand',
  },
  {
    id: 'thailand-ambulance',
    name: '泰國救護車',
    phone: '1669',
    phoneDisplay: '1669',
    description: '泰國境內醫療急救',
    region: 'thailand',
  },
  {
    id: 'laos-police',
    name: '寮國警察',
    phone: '191',
    phoneDisplay: '191',
    description: '寮國境內報警',
    region: 'laos',
  },
  {
    id: 'laos-ambulance',
    name: '寮國救護車',
    phone: '195',
    phoneDisplay: '195',
    description: '寮國境內醫療急救',
    region: 'laos',
  },
  {
    id: 'laos-fire',
    name: '寮國消防',
    phone: '190',
    phoneDisplay: '190',
    description: '寮國境內火警',
    region: 'laos',
  },
];

export const EMERGENCY_REGION_LABELS = {
  taiwan: '台灣',
  thailand: '泰國',
  laos: '寮國',
  global: '通用',
} as const;
