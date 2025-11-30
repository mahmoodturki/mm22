import { LinkItem, TrafficSource } from './types';

export const TARGET_LINKS: LinkItem[] = [
  { id: 1, url: 'https://otieu.com/4/10258262' },
  { id: 2, url: 'https://otieu.com/4/10258255' },
  { id: 3, url: 'https://otieu.com/4/10258263' },
  { id: 4, url: 'https://otieu.com/4/10258265' },
  { id: 5, url: 'https://otieu.com/4/10258266' }
];

export const INITIAL_TRAFFIC_SOURCES: TrafficSource[] = [
  { id: 'fb', name: 'فيسبوك', visits: 1240, color: '#1877F2', iconName: 'Facebook' },
  { id: 'ig', name: 'انستغرام', visits: 856, color: '#E4405F', iconName: 'Instagram' },
  { id: 'tw', name: 'تويتر (X)', visits: 620, color: '#1DA1F2', iconName: 'Twitter' },
  { id: 'yt', name: 'يوتيوب', visits: 2100, color: '#FF0000', iconName: 'Youtube' },
  { id: 'tk', name: 'تيك توك', visits: 3400, color: '#000000', iconName: 'Linkedin' }, // Using Linkedin icon as placeholder for tiktok if needed, or generic
  { id: 'wb', name: 'مباشر', visits: 540, color: '#10B981', iconName: 'Globe' },
];

export const SOURCE_NAMES = ['فيسبوك', 'انستغرام', 'تويتر', 'يوتيوب', 'بحث جوجل', 'مباشر'];
