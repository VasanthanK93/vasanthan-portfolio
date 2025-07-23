import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 600,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransitionStyles = () => {
    const baseTransition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    switch (direction) {
      case 'up':
        return {
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'down':
        return {
          transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'left':
        return {
          transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'right':
        return {
          transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'fade':
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={className}
      style={getTransitionStyles()}
    >
      {children}
    </div>
  );
};

// Higher-order component for wrapping entire page sections
export const withPageTransition = <P extends object>(
  Component: React.ComponentType<P>,
  transitionProps?: Partial<PageTransitionProps>
) => {
  const WrappedComponent = (props: P) => (
    <PageTransition {...transitionProps}>
      <Component {...props} />
    </PageTransition>
  );
  
  return WrappedComponent;
};

// Staggered children animation component
interface StaggeredTransitionProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  childTransition?: Partial<PageTransitionProps>;
}

export const StaggeredTransition: React.FC<StaggeredTransitionProps> = ({
  children,
  className = '',
  staggerDelay = 100,
  childTransition = {}
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <PageTransition
          key={index}
          delay={index * staggerDelay}
          {...childTransition}
        >
          {child}
        </PageTransition>
      ))}
    </div>
  );
};

// Route transition wrapper with entrance/exit animations
interface RouteTransitionProps {
  children: React.ReactNode;
  pathname: string;
  className?: string;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  pathname,
  className = ''
}) => {
  const [currentPath, setCurrentPath] = React.useState(pathname);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (pathname !== currentPath) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentPath(pathname);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: isTransitioning ? 'translateY(-20px)' : 'translateY(0)',
          opacity: isTransitioning ? 0 : 1
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Reveal animation for elements coming into view
interface RevealTransitionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  duration?: number;
  once?: boolean;
}

export const RevealTransition: React.FC<RevealTransitionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  direction = 'up',
  duration = 600,
  once = true
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once && hasBeenVisible) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once, hasBeenVisible]);

  const getRevealStyles = () => {
    const baseTransition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    switch (direction) {
      case 'up':
        return {
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'down':
        return {
          transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'left':
        return {
          transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'right':
        return {
          transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'scale':
        return {
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
      case 'fade':
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={getRevealStyles()}
    >
      {children}
    </div>
  );
};

export default PageTransition;