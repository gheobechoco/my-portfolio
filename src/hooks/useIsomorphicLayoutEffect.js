import { useEffect, useLayoutEffect } from 'react';

/**
 * Hook useIsomorphicLayoutEffect qui utilise useLayoutEffect côté client
 * et useEffect côté serveur pour éviter les warnings SSR
 */
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;