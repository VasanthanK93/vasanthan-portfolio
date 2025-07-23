import React, { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
  gradient?: boolean;
  glow?: boolean;
  borderAnimation?: boolean;
  children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      hover = true,
      interactive = false,
      gradient = false,
      glow = false,
      borderAnimation = false,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyles = `
      relative rounded-xl transition-all duration-300 ease-in-out
      group overflow-hidden
    `;

    const variants = {
      default: `
        bg-white border border-gray-200 shadow-sm
        dark:bg-gray-900 dark:border-gray-800
        ${hover ? 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700' : ''}
        ${interactive ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' : ''}
      `,
      
      elevated: `
        bg-white shadow-lg border-0
        dark:bg-gray-900
        ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        ${interactive ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' : ''}
      `,
      
      outlined: `
        bg-transparent border-2 border-gray-300 shadow-none
        dark:border-gray-700
        ${hover ? 'hover:border-blue-500 hover:shadow-md dark:hover:border-blue-400' : ''}
        ${interactive ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' : ''}
      `,
      
      filled: `
        bg-gray-50 border border-gray-200 shadow-sm
        dark:bg-gray-800 dark:border-gray-700
        ${hover ? 'hover:bg-gray-100 hover:shadow-md dark:hover:bg-gray-750' : ''}
        ${interactive ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' : ''}
      `,
      
      glass: `
        backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl
        dark:bg-gray-900/10 dark:border-gray-700/20
        ${hover ? 'hover:bg-white/20 hover:border-white/30 dark:hover:bg-gray-900/20' : ''}
        ${interactive ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' : ''}
      `,
    };

    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const gradientBg = gradient
      ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950'
      : '';

    const glowEffect = glow
      ? `before:absolute before:inset-0 before:rounded-[inherit] 
         before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20
         before:opacity-0 hover:before:opacity-100 before:blur-xl before:-z-10
         before:transition-opacity before:duration-500`
      : '';

    const borderAnimationEffect = borderAnimation
      ? `before:absolute before:inset-0 before:rounded-[inherit] 
         before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-blue-500
         before:p-[2px] before:-z-10 before:opacity-0 hover:before:opacity-100
         before:transition-opacity before:duration-300
         before:bg-size-200 before:animate-gradient-x`
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          gradientBg,
          glowEffect,
          borderAnimationEffect,
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Animated border for borderAnimation variant */}
        {borderAnimation && (
          <div className="absolute inset-[2px] rounded-[calc(0.75rem-2px)] bg-white dark:bg-gray-900 z-10" />
        )}

        {/* Shine effect */}
        {hover && (
          <div 
            className={cn(
              "absolute inset-0 -translate-x-full transition-transform duration-1000",
              "bg-gradient-to-r from-transparent via-white/10 to-transparent",
              "skew-x-12 pointer-events-none",
              isHovered && "translate-x-full"
            )}
          />
        )}

        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header component
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title component
export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>(
  ({ className, as: Component = 'h3', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'text-xl font-bold leading-none tracking-tight',
        'text-gray-900 dark:text-gray-100',
        'group-hover:text-blue-600 dark:group-hover:text-blue-400',
        'transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description component
export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-sm text-gray-600 dark:text-gray-400',
        'leading-relaxed',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content component
export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

// Card Footer component
export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between pt-4 mt-auto',
        'border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

// Special card variants
export const ProjectCard: React.FC<{
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  className?: string;
}> = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  className
}) => (
  <Card
    variant="elevated"
    hover
    interactive
    glow
    className={cn('h-full flex flex-col', className)}
  >
    {image && (
      <div className="relative h-48 -mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    )}

    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>

    <CardContent className="flex-1">
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md dark:bg-blue-900 dark:text-blue-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </CardContent>

    <CardFooter className="gap-2">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-center transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          Code
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition-colors"
        >
          Live Demo
        </a>
      )}
    </CardFooter>
  </Card>
);

export const SkillCard: React.FC<{
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  category: string;
  className?: string;
}> = ({
  name,
  icon,
  proficiency,
  category,
  className
}) => (
  <Card
    variant="outlined"
    hover
    interactive
    className={cn('text-center group-hover:border-blue-500', className)}
  >
    <div className="flex flex-col items-center space-y-3">
      <div className="text-3xl text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 group-hover:bg-blue-500"
          style={{ width: `${(proficiency / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {category}
      </span>
    </div>
  </Card>
);

export default Card;