import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// Enregistrer les plugins GSAP côté client seulement
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook personnalisé pour les animations GSAP avec ScrollTrigger
 */
export const useGsapAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const timelineRef = useRef(null);

  const defaultOptions = {
    trigger: null,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    markers: false,
    ...options
  };

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: defaultOptions.trigger || elementRef.current,
          start: defaultOptions.start,
          end: defaultOptions.end,
          toggleActions: defaultOptions.toggleActions,
          markers: defaultOptions.markers,
        }
      });
    }, elementRef);

    return () => ctx.revert();
  }, [defaultOptions]);

  const addAnimation = (animationConfig, position = '>') => {
    if (timelineRef.current && elementRef.current) {
      timelineRef.current.to(elementRef.current, animationConfig, position);
    }
  };

  return {
    ref: elementRef,
    addAnimation,
    timeline: timelineRef.current
  };
};

export default useGsapAnimation;