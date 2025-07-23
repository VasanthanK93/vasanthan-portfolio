import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  animated?: boolean;
  pulse?: boolean;
  glow?: boolean;
  gradient?: boolean;
  removable?: boolean;
  icon?: React.ReactNode;
  dot?: boolean;
  count?: number;
  maxCount?: number;
  interactive?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      rounded = false,
      animated = false,
      pulse = false,
      glow = false,
      gradient = false,
      removable = false,
      icon,
      dot = false,
      count,
      maxCount = 99,
      interactive = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = () => {
      if (onRemove) {
        setIsRemoving(true);
        setTimeout(() => {
          onRemove();
        }, 200);
      }
    };

    const displayCount = count !== undefined ? (count > maxCount ? `${maxCount}+` : count.toString()) : null;

    const baseStyles = `
      inline-flex items-center justify-center font-medium
      transition-all duration-200 ease-in-out
      select-none shrink-0
      ${animated ? 'transform hover:scale-105 active:scale-95' : ''}
      ${interactive ? 'cursor-pointer' : ''}
      ${pulse ? 'animate-pulse' : ''}
      ${isRemoving ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
    `;

    const variants = {
      default: gradient
        ? `bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0
           hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg`
        : `bg-blue-100 text-blue-800 border border-blue-200
           hover:bg-blue-200 hover:border-blue-300
           dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800`,

      secondary: `bg-gray-100 text-gray-800 border border-gray-200
                  hover:bg-gray-200 hover:border-gray-300
                  dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700`,

      success: gradient
        ? `bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0
           hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg`
        : `bg-green-100 text-green-800 border border-green-200
           hover:bg-green-200 hover:border-green-300
           dark:bg-green-900/30 dark:text-green-400 dark:border-green-800`,

      warning: gradient
        ? `bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0
           hover:from-yellow-600 hover:to-orange-600 shadow-md hover:shadow-lg`
        : `bg-yellow-100 text-yellow-800 border border-yellow-200
           hover:bg-yellow-200 hover:border-yellow-300
           dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800`,

      error: gradient
        ? `bg-gradient-to-r from-red-500 to-rose-600 text-white border-0
           hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg`
        : `bg-red-100 text-red-800 border border-red-200
           hover:bg-red-200 hover:border-red-300
           dark:bg-red-900/30 dark:text-red-400 dark:border-red-800`,

      info: gradient
        ? `bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0
           hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg`
        : `bg-cyan-100 text-cyan-800 border border-cyan-200
           hover:bg-cyan-200 hover:border-cyan-300
           dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800`,

      outline: `bg-transparent border-2 border-current
                hover:bg-current hover:text-white
                text-gray-600 dark:text-gray-400`,

      ghost: `bg-transparent text-gray-600 border-0
              hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800`,
    };

    const sizes = {
      xs: 'text-xs px-1.5 py-0.5 gap-1 min-h-[18px]',
      sm: 'text-xs px-2 py-1 gap-1 min-h-[20px]',
      md: 'text-sm px-2.5 py-1 gap-1.5 min-h-[24px]',
      lg: 'text-sm px-3 py-1.5 gap-2 min-h-[28px]',
      xl: 'text-base px-4 py-2 gap-2 min-h-[32px]',
    };

    const roundedStyles = {
      xs: rounded ? 'rounded-full' : 'rounded-sm',
      sm: rounded ? 'rounded-full' : 'rounded',
      md: rounded ? 'rounded-full' : 'rounded-md',
      lg: rounded ? 'rounded-full' : 'rounded-lg',
      xl: rounded ? 'rounded-full' : 'rounded-xl',
    };

    const glowEffect = glow
      ? `shadow-lg shadow-current/25 hover:shadow-xl hover:shadow-current/40
         dark:shadow-current/20 dark:hover:shadow-current/30`
      : '';

    // Dot badge (notification style)
    if (dot) {
      return (
        <span
          ref={ref}
          className={cn(
            'relative inline-block',
            className
          )}
          {...props}
        >
          {children}
          <span
            className={cn(
              'absolute -top-1 -right-1 block h-2 w-2 rounded-full',
              variants[variant].split(' ').filter(cls => cls.includes('bg-')).join(' '),
              pulse && 'animate-ping',
              'after:absolute after:inset-0 after:rounded-full after:bg-current after:animate-pulse'
            )}
          />
        </span>
      );
    }

    // Count badge (notification with number)
    if (displayCount !== null) {
      return (
        <span
          ref={ref}
          className={cn(
            'relative inline-block',
            className
          )}
          {...props}
        >
          {children}
          <span
            className={cn(
              baseStyles,
              variants[variant],
              'absolute -top-2 -right-2 min-w-[20px] h-5 text-xs font-bold rounded-full',
              'flex items-center justify-center px-1',
              animated && 'transform-gpu',
              glowEffect
            )}
          >
            {displayCount}
          </span>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          roundedStyles[size],
          glowEffect,
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className={cn(
            'flex-shrink-0 transition-transform duration-200',
            animated && isHovered && 'scale-110 rotate-12'
          )}>
            {icon}
          </span>
        )}

        {/* Content */}
        {children && (
          <span className="relative overflow-hidden">
            {animated ? (
              <>
                <span className={cn(
                  'block transition-transform duration-200',
                  isHovered && '-translate-y-full'
                )}>
                  {children}
                </span>
                <span className={cn(
                  'absolute inset-0 translate-y-full transition-transform duration-200',
                  isHovered && 'translate-y-0'
                )}>
                  {children}
                </span>
              </>
            ) : (
              children
            )}
          </span>
        )}

        {/* Remove button */}
        {removable && (
          <button
            onClick={handleRemove}
            className={cn(
              'flex-shrink-0 ml-1 rounded-full p-0.5 transition-colors duration-200',
              'hover:bg-white/20 focus:outline-none focus:bg-white/20',
              'transform hover:scale-110 active:scale-90'
            )}
            aria-label="Remove badge"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Shine effect for animated badges */}
        {animated && (
          <div
            className={cn(
              'absolute inset-0 -translate-x-full transition-transform duration-1000',
              'bg-gradient-to-r from-transparent via-white/10 to-transparent',
              'skew-x-12 pointer-events-none',
              isHovered && 'translate-x-full'
            )}
          />
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Skill Badge - specialized for tech skills
export const SkillBadge: React.FC<{
  name: string;
  proficiency?: 1 | 2 | 3 | 4 | 5;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}> = ({ name, proficiency, icon, color, className }) => {
  const getProficiencyVariant = (level?: number) => {
    if (!level) return 'secondary';
    if (level >= 4) return 'success';
    if (level >= 3) return 'info';
    if (level >= 2) return 'warning';
    return 'error';
  };

  return (
    <Badge
      variant={getProficiencyVariant(proficiency)}
      size="md"
      animated
      glow
      icon={icon}
      className={cn(
        'font-medium',
        color && `bg-${color}-100 text-${color}-800 border-${color}-200`,
        className
      )}
    >
      {name}
      {proficiency && (
        <span className="ml-1 text-xs opacity-75">
          {'★'.repeat(proficiency)}
        </span>
      )}
    </Badge>
  );
};

// Status Badge - for project status, etc.
export const StatusBadge: React.FC<{
  status: 'completed' | 'in-progress' | 'planned' | 'cancelled' | 'on-hold';
  className?: string;
}> = ({ status, className }) => {
  const statusConfig = {
    completed: { variant: 'success' as const, label: 'Completed', icon: '✓' },
    'in-progress': { variant: 'info' as const, label: 'In Progress', icon: '⚡' },
    planned: { variant: 'warning' as const, label: 'Planned', icon: '📋' },
    cancelled: { variant: 'error' as const, label: 'Cancelled', icon: '✕' },
    'on-hold': { variant: 'secondary' as const, label: 'On Hold', icon: '⏸' },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      size="sm"
      animated
      rounded
      className={className}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
};

// Badge Group - for displaying multiple badges
export const BadgeGroup: React.FC<{
  badges: Array<{
    label: string;
    variant?: BadgeProps['variant'];
    icon?: React.ReactNode;
  }>;
  maxVisible?: number;
  className?: string;
  staggerAnimation?: boolean;
}> = ({ badges, maxVisible, className, staggerAnimation = false }) => {
  const visibleBadges = maxVisible ? badges.slice(0, maxVisible) : badges;
  const hiddenCount = maxVisible && badges.length > maxVisible ? badges.length - maxVisible : 0;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visibleBadges.map((badge, index) => (
        <Badge
          key={index}
          variant={badge.variant || 'default'}
          size="sm"
          animated
          icon={badge.icon}
          style={staggerAnimation ? { animationDelay: `${index * 100}ms` } : undefined}
          className={staggerAnimation ? 'animate-fade-in-up' : undefined}
        >
          {badge.label}
        </Badge>
      ))}
      
      {hiddenCount > 0 && (
        <Badge variant="outline" size="sm">
          +{hiddenCount} more
        </Badge>
      )}
    </div>
  );
};

// Interactive Badge - with click handler
export const InteractiveBadge: React.FC<BadgeProps & {
  onClick?: () => void;
  selected?: boolean;
}> = ({ onClick, selected, className, ...props }) => {
  return (
    <Badge
      {...props}
      interactive
      animated
      className={cn(
        'cursor-pointer transition-all duration-200',
        selected && 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900',
        'hover:shadow-md active:shadow-sm',
        className
      )}
      onClick={onClick}
    />
  );
};

// Notification Badge - for displaying notifications
export const NotificationBadge: React.FC<{
  count: number;
  maxCount?: number;
  children: React.ReactNode;
  variant?: 'default' | 'error';
  className?: string;
}> = ({ count, maxCount = 99, children, variant = 'error', className }) => {
  if (count === 0) return <>{children}</>;

  return (
    <Badge
      variant={variant}
      count={count}
      maxCount={maxCount}
      pulse
      glow
      className={className}
    >
      {children}
    </Badge>
  );
};

export default Badge;