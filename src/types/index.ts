// types/index.ts

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  medium?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'mobile' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Expert
  icon?: string; // Icon name or URL
  color?: string; // Hex color for the skill
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  images?: string[]; // Additional project images
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string; // undefined means current job
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
  companyLogo?: string;
  companyUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  location: string;
  logo?: string;
}

// export interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   url: string;
//   publishedAt: string;
//   readTime?: number;
//   tags?: string[];
//   image?: string;
// }

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  image?: string;
  url?: string;
}

export interface Stats {
  yearsOfExperience: number;
  projectsCompleted: number;
  clientsSatisfied: number;
  linesOfCode?: number;
  githubStars?: number;
  blogPosts?: number;
}

export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  accent: string;
}

// Animation-related types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

export interface ScrollAnimation {
  threshold: number;
  triggerOnce: boolean;
}

// Component Props Types
export interface MotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: any;
}

export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  workExperience: WorkExperience[];
  education: Education[];
  testimonials?: Testimonial[];
  stats: Stats;
  socialLinks: SocialLink[];
  blogPosts?: BlogPost[];
  seo: SEOData;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormResponse extends ApiResponse<null> {
  emailSent?: boolean;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Filter Types
export type ProjectFilter = 'all' | Project['category'] | Project['status'];
export type SkillFilter = 'all' | Skill['category'];

// Component State Types
export interface ProjectsState {
  projects: Project[];
  filteredProjects: Project[];
  currentFilter: ProjectFilter;
  loading: boolean;
  error?: string;
}

export interface SkillsState {
  skills: Skill[];
  filteredSkills: Skill[];
  currentFilter: SkillFilter;
  selectedSkill?: Skill;
}

export interface ContactState {
  form: ContactForm;
  loading: boolean;
  success: boolean;
  error?: string;
}

// Hook Return Types
export interface UseThemeReturn {
  theme: Theme['mode'];
  toggleTheme: () => void;
  isDark: boolean;
}

export interface UseScrollReturn {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isScrolled: boolean;
}

export interface UseIntersectionReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

export interface UseTypingReturn {
  displayText: string;
  isComplete: boolean;
  currentIndex: number;
}

// Animation Variants
export interface AnimationVariants {
  hidden: any;
  visible: any;
  exit?: any;
}

// Form Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormValidationReturn {
  errors: ValidationErrors;
  validate: (name: string, value: string) => boolean;
  validateAll: (data: Record<string, string>) => boolean;
  clearError: (name: string) => void;
  clearAllErrors: () => void;
}

// Media Query Types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface UseMediaQueryReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeScreen: boolean;
  currentBreakpoint: Breakpoint;
}

export interface CounterAnimationProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  easingFunction?: (t: number) => number;
  onStart?: () => void;
  onComplete?: () => void;
  onUpdate?: (value: number) => void;
  triggerOnScroll?: boolean;
  scrollThreshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface ScrollAnimationOptions {
    amount?: number | 'some' | 'all';
    triggerOnce?: boolean;
    rootMargin?: string;
  }

export interface MediumArticle {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail?: string;
  description: string;
  content: string;
  enclosure?: {
    link: string;
    type: string;
  };
  categories: string[];
}

export interface RSS2JSONResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumArticle[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  readTime: number;
  thumbnail: string;
  url: string;
  tags: string[];
  isExternal: boolean;
}
