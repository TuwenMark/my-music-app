import { refreshCookie } from './neteasecloud/loginActions';

const refreshAndExecute = <T>(action: () => Promise<T>): Promise<T> => {
  refreshCookie;
  return action();
};
