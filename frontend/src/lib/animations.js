
// Animation utility functions for smooth transitions

export const staggeredChildren = (delay = 100) => {
  return {
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: delay / 1000,
        },
      },
    },
    initial: "hidden",
    animate: "visible",
  };
};

export const fadeInUp = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  },
};

export const scaleIn = {
  variants: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
  },
};

// Function to add delay to elements for staggered animations
export const withDelay = (index, baseDelay = 100) => {
  return {
    style: {
      '--delay': `${index * baseDelay}ms`,
    },
    className: 'animate-delayed animation-fill-both',
  };
};
