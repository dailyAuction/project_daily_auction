import { useLocation } from 'react-router-dom';

type TokenFactor = {
  access: string;
  refresh: string;
};

export const useSocialToken = (): TokenFactor => {
  const location = useLocation();
  const tokenPath = location.search;
  const tokenInfo = tokenPath.split('&');
  const accessTokenInfo = tokenInfo[0].split('%20');
  const refreshTokenInfo = tokenInfo[1].split('%20');
  const access = 'Bearer ' + accessTokenInfo[1];
  const refresh = 'Bearer ' + refreshTokenInfo[1];

  return { access, refresh };
};
