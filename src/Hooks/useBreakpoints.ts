import { useEffect, useState } from "react";
import { useResponsive } from "ahooks";

export type BreakpointsKeyType = (typeof breakpoints)[number];

const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;

const useBreakpoints = () => {
  const [breakpointActive, setBreakpointActive] =
    useState<Record<BreakpointsKeyType, boolean>>();
  // @ts-ignore
  const responsive: Record<BreakpointsKeyType, boolean> = useResponsive();
  const isMobile = responsive.xs;
  const isTablet = responsive.sm;
  const isDesktop = responsive.md || responsive.lg || responsive.xl;

  const breakpointActiveJudge = () => {
    const breakpointActive = {} as Record<BreakpointsKeyType, boolean>;
    for (let i = 0; i < breakpoints.length; i++) {
      const breakpoint = breakpoints[i];
      if (i === breakpoints.length - 1) {
        breakpointActive[breakpoint] = !!responsive?.[breakpoint];
      } else {
        if (responsive?.[breakpoint] && responsive?.[breakpoints[i + 1]]) {
          breakpointActive[breakpoint] = false;
        } else {
          breakpointActive[breakpoint] = !!responsive?.[breakpoint];
        }
      }
    }
    setBreakpointActive(breakpointActive);
  };

  useEffect(breakpointActiveJudge, [responsive]);

  return {
    responsive,
    breakpointActive,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useBreakpoints;
