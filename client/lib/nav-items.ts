export type NavItem = {
  label: string;
  route: string;
  type: 'lucide' | 'emoji';
  icon?: string;
  emoji?: string;
  itemColor: string;
};

export const navItems: NavItem[] = [
  { label: 'Dashboard',       route: '/dashboard',           type: 'lucide', icon: 'LayoutDashboard', itemColor: '#3B82F6' },
  { label: 'Users',           route: '/users',               type: 'lucide', icon: 'Users',           itemColor: '#10B981' },
  { label: 'Content',         route: '/content',             type: 'emoji',  emoji: '📚',             itemColor: '#F59E0B' },
  { label: 'AI Monitor',      route: '/ai-monitor',          type: 'lucide', icon: 'Cpu',             itemColor: '#8B5CF6' },
  { label: 'Revenue',         route: '/revenue',             type: 'lucide', icon: 'TrendingUp',      itemColor: '#10B981' },
  { label: 'Retention',       route: '/retention',           type: 'emoji',  emoji: '❤️',             itemColor: '#EF4444' },
  { label: 'Recovery',        route: '/recovery',            type: 'emoji',  emoji: '🔄',             itemColor: '#06B6D4' },
  { label: 'Funnel',          route: '/funnel',              type: 'lucide', icon: 'Filter',          itemColor: '#EC4899' },
  { label: 'Exam Calendar',   route: '/exam-calendar',       type: 'emoji',  emoji: '📆',             itemColor: '#F59E0B' },
  { label: 'Content Perf',    route: '/content-performance', type: 'emoji',  emoji: '📊',             itemColor: '#3B82F6' },
  { label: 'Essay Monitor',   route: '/essay-monitor',       type: 'emoji',  emoji: '📝',             itemColor: '#8B5CF6' },
  { label: 'Audit Trail',     route: '/audit-trail',         type: 'lucide', icon: 'Shield',          itemColor: '#06B6D4' },
  { label: 'AI Predictor',    route: '/ai-predictor',        type: 'lucide', icon: 'Sparkles',        itemColor: '#EC4899' },
  { label: 'Notifications',   route: '/notifications',       type: 'lucide', icon: 'Bell',            itemColor: '#F59E0B' },
  { label: 'Settings',        route: '/settings',            type: 'lucide', icon: 'Settings',        itemColor: '#94A3B8' },
];
