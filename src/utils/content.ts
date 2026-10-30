import defaultPlans from '../data/plans.json';
import defaultPromotions from '../data/promotions.json';
import defaultSettings from '../data/settings.json';
import defaultBlog from '../data/blog.json';

// Storage keys for client-side persistence
const KEYS = {
  PLANS: 'voltag_cms_plans',
  PROMOTIONS: 'voltag_cms_promotions',
  SETTINGS: 'voltag_cms_settings',
  BLOG: 'voltag_cms_blog',
  AUTH: 'voltag_cms_auth',
};

export const getPlans = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(KEYS.PLANS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error loading plans:', e);
    }
  }
  return defaultPlans;
};

export const getPromotions = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(KEYS.PROMOTIONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error loading promotions:', e);
    }
  }
  return defaultPromotions;
};

export const getSettings = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error loading settings:', e);
    }
  }
  return defaultSettings;
};

export const getBlogPosts = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(KEYS.BLOG);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error loading blog posts:', e);
    }
  }
  return defaultBlog;
};

// Client-side save functions for the Admin UI
export const savePlansLocally = (plans: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
    window.dispatchEvent(new CustomEvent('voltag-cms-update', { detail: { type: 'plans', data: plans } }));
  }
};

export const savePromotionsLocally = (promos: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(promos));
    window.dispatchEvent(new CustomEvent('voltag-cms-update', { detail: { type: 'promotions', data: promos } }));
  }
};

export const saveSettingsLocally = (settings: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('voltag-cms-update', { detail: { type: 'settings', data: settings } }));
  }
};

export const saveBlogPostsLocally = (posts: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.BLOG, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('voltag-cms-update', { detail: { type: 'blog', data: posts } }));
  }
};

export { defaultPlans, defaultPromotions, defaultSettings, defaultBlog };
