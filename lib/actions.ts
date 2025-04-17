import { refreshCookie } from './neteasecloud/loginActions';

export const refreshAndExecute = <T>(action: () => Promise<T>): Promise<T> => {
  refreshCookie;
  return action();
};
