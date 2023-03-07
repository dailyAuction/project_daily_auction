import { lazy } from 'react';

// promise를 반환하는 named export 컴포넌트와
// 그 컴포넌트의 이름을 인자로 받아옵니다.
export function lazyImport<T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  // lazy loading으로 named 컴포넌트를 import 하고, 컴포넌트의 키 값으로 불러온 컴포넌트에 접근할 수 있도록 합니다.
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

// React.lazy는 현재까지 default export 에 대해서만 지원되므로, 위와 같이 프로미스를 반환받아 위와 같이 변환이 필요합니다.
// code reference : https://github.com/facebook/react/issues/14603#issuecomment-726551598
