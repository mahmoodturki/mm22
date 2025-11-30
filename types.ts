import { LucideIcon } from 'lucide-react';

export interface TrafficSource {
  id: string;
  name: string;
  visits: number;
  color: string;
  iconName: 'Facebook' | 'Instagram' | 'Twitter' | 'Youtube' | 'Linkedin' | 'Globe';
}

export interface VisitorData {
  id: string;
  totalVisits: number;
  currentLinkIndex: number;
  source: string;
}

export interface LinkItem {
  url: string;
  id: number;
}
