import { RecoilRoot } from 'recoil';
import { Router } from './router/Router';

export const App = () => {
  return (
    <div className="">
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </div>
  );
};
