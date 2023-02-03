import { RecoilRoot } from 'recoil';
import { Router } from './router/Router';

export const App = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background-desktop">
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </div>
  );
};
