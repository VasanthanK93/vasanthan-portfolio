import React, { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  glowing?: boolean;
  as?: React.ElementType;
  href?: string;
  target?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      gradient = false,
      glowing = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center font-medium 
      transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      transform hover:scale-105 active:scale-95
      overflow-hidden group
    `;

    const variants = {
      primary: gradient
        ? `bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
           bg-size-200 bg-pos-0 hover:bg-pos-100
           text-white border-0 focus:ring-blue-500
           shadow-lg hover:shadow-xl`
        : `bg-blue-600 hover:bg-blue-700 active:bg-blue-800
           text-white border-0 focus:ring-blue-500
           shadow-lg hover:shadow-xl`,
      
      secondary: `bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                  text-gray-900 border border-gray-300 focus:ring-gray-500
                  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100
                  dark:border-gray-600`,
      
      outline: `bg-transparent hover:bg-blue-50 active:bg-blue-100
                text-blue-600 border-2 border-blue-600 focus:ring-blue-500
                dark:hover:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400`,
      
      ghost: `bg-transparent hover:bg-gray-100 active:bg-gray-200
              text-gray-700 border-0 focus:ring-gray-500
              dark:hover:bg-gray-800 dark:text-gray-300`,
      
      destructive: `bg-red-600 hover:bg-red-700 active:bg-red-800
                    text-white border-0 focus:ring-red-500
                    shadow-lg hover:shadow-xl`,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
      md: 'px-4 py-2 text-sm rounded-lg gap-2',
      lg: 'px-6 py-3 text-base rounded-lg gap-2',
      xl: 'px-8 py-4 text-lg rounded-xl gap-3',
    };

    const glowEffect = glowing
      ? `before:absolute before:inset-0 before:rounded-[inherit] 
         before:bg-gradient-to-r before:from-blue-500 before:to-purple-500
         before:opacity-0 hover:before:opacity-20 before:blur-xl before:-z-10
         before:transition-opacity before:duration-300`
      : '';

    const rippleEffect = `
      after:absolute after:inset-0 after:rounded-[inherit]
      after:bg-white/20 after:scale-0 after:opacity-0
      active:after:scale-100 active:after:opacity-100
      after:transition-all after:duration-200
    `;

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          rounded && 'rounded-full',
          fullWidth && 'w-full',
          glowEffect,
          rippleEffect,
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          </div>
        )}

        {/* Button content */}
        <span className={cn('flex items-center gap-inherit', loading && 'opacity-0')}>
          {leftIcon && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              {leftIcon}
            </span>
          )}
          
          {children && (
            <span className="relative overflow-hidden">
              <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                {children}
              </span>
              <span className="absolute inset-0 translate-y-full transition-transform duration-200 group-hover:translate-y-0">
                {children}
              </span>
            </span>
          )}
          
          {rightIcon && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-1">
              {rightIcon}
            </span>
          )}
        </span>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button variant
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'leftIcon' | 'rightIcon'> & { icon: React.ReactNode }>(
  ({ icon, className, size = 'md', rounded = true, ...props }, ref) => {
    const iconSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
    };

    return (
      <Button
        ref={ref}
        className={cn(iconSizes[size], 'p-0', className)}
        size={size}
        rounded={rounded}
        {...props}
      >
        <span className="flex items-center justify-center w-full h-full">
          {icon}
        </span>
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

// Button Group component
export const ButtonGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
}> = ({ children, className, orientation = 'horizontal', attached = true }) => {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        attached && orientation === 'horizontal' && '[&>*:not(:first-child)]:ml-0 [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0',
        attached && orientation === 'vertical' && '[&>*:not(:first-child)]:mt-0 [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0',
        !attached && (orientation === 'horizontal' ? 'gap-2' : 'gap-2'),
        className
      )}
    >
      {children}
    </div>
  );
};

// Floating Action Button
export const FloatingActionButton: React.FC<ButtonProps & { position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' }> = ({
  position = 'bottom-right',
  className,
  ...props
}) => {
  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  };

  return (
    <Button
      className={cn(
        positions[position],
        'w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl z-50',
        'bg-gradient-to-r from-blue-500 to-purple-600',
        'hover:from-blue-600 hover:to-purple-700',
        'transform hover:scale-110 active:scale-95',
        className
      )}
      {...props}
    />
  );
};

export default Button;