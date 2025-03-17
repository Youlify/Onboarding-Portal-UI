import { Suspense, lazy } from "react";

const Suspenselazy = (lazyComponent: any) => {
  const LazyComponent = lazy(lazyComponent);
  return (props: any) => (
    <Suspense fallback={<>...</>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Suspenselazy;
