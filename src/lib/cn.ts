import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to conditionally join class names and merge Tailwind classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 * 
 * @param inputs - Class names, objects, arrays, or conditional expressions
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn('px-2 py-1', 'bg-blue-500', { 'text-white': true, 'rounded': false })
 * // Returns: 'px-2 py-1 bg-blue-500 text-white'
 * 
 * cn('px-2', 'px-4') // tailwind-merge removes conflicting classes
 * // Returns: 'px-4'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Alternative names for the same function (for flexibility)
export const classNames = cn;
export const cx = cn;

// Utility for creating component variants
export function cva(
  base: string,
  options?: {
    variants?: Record<string, Record<string, string>>;
    compoundVariants?: Array<{
      [key: string]: string | string[];
      class: string;
    }>;
    defaultVariants?: Record<string, string>;
  }
) {
  return function (props?: Record<string, string | boolean | undefined>) {
    if (!options) return cn(base);

    const { variants, compoundVariants, defaultVariants } = options;
    
    let result = base;
    
    // Apply default variants
    if (defaultVariants && props) {
      Object.entries(defaultVariants).forEach(([key, value]) => {
        if (props[key] === undefined) {
          props[key] = value;
        }
      });
    }
    
    // Apply variants
    if (variants && props) {
      Object.entries(variants).forEach(([variantKey, variantValues]) => {
        const propValue = props[variantKey];
        if (propValue && typeof propValue === 'string' && variantValues[propValue]) {
          result = cn(result, variantValues[propValue]);
        }
      });
    }
    
    // Apply compound variants
    if (compoundVariants && props) {
      compoundVariants.forEach((compound) => {
        const { class: compoundClass, ...conditions } = compound;
        
        const matches = Object.entries(conditions).every(([key, condition]) => {
          const propValue = props[key];
          
          if (Array.isArray(condition)) {
            return condition.includes(propValue as string);
          }
          
          return propValue === condition;
        });
        
        if (matches) {
          result = cn(result, compoundClass);
        }
      });
    }
    
    return result;
  };
}

// Utility for conditional classes based on state
export function conditionalClass(
  baseClass: string,
  condition: boolean | undefined,
  trueClass: string,
  falseClass?: string
): string {
  if (condition) {
    return cn(baseClass, trueClass);
  }
  return falseClass ? cn(baseClass, falseClass) : baseClass;
}

// Utility for responsive classes
export function responsiveClass(classes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  const { base, sm, md, lg, xl, '2xl': xl2 } = classes;
  
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`,
    xl2 && `2xl:${xl2}`
  );
}

// Utility for theme-based classes
export function themeClass(
  lightClass: string,
  darkClass: string,
  baseClass?: string
): string {
  return cn(baseClass, lightClass, `dark:${darkClass}`);
}

// Animation utility classes
export const animations = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  
  // Slide animations
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  
  // Bounce and elastic
  bounceIn: 'animate-bounce-in',
  elasticIn: 'animate-elastic-in',
  
  // Rotation
  rotateIn: 'animate-rotate-in',
  
  // Pulse and ping
  pulse: 'animate-pulse',
  ping: 'animate-ping',
  
  // Spin
  spin: 'animate-spin',
  spinSlow: 'animate-spin-slow',
  
  // Custom animations
  float: 'animate-float',
  shake: 'animate-shake',
  wobble: 'animate-wobble',
  heartbeat: 'animate-heartbeat',
};

// Spacing utilities
export const spacing = {
  none: 'space-y-0',
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
  '2xl': 'space-y-12',
};

// Common component class combinations
export const patterns = {
  card: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm',
  cardHover: 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200',
  button: 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  input: 'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
  link: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-colors',
  text: {
    muted: 'text-gray-600 dark:text-gray-400',
    subtle: 'text-gray-500 dark:text-gray-500',
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-700 dark:text-gray-300',
  },
  gradient: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    error: 'bg-gradient-to-r from-red-500 to-rose-600',
  },
  glass: 'backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl dark:bg-gray-900/10 dark:border-gray-700/20',
  blur: 'backdrop-blur-sm',
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    glow: 'shadow-lg shadow-blue-500/25',
  }
};

// Type definitions for better TypeScript support
export type ClassNameValue = string | number | boolean | undefined | null;
export type ClassNameObjectValue = Record<string, string | number | boolean | undefined | null>;
export type ClassNameArray = ClassNameValue[];
export type ClassNames = ClassNameValue | ClassNameObjectValue | ClassNameArray;

// Export the main function as default
export default cn;