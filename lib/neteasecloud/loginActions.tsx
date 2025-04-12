'use server';

// 游客登录
export const loginNetease = async (): Promise<Response> => {
  const baseUrl = process.env.NETEASE_CLOUD_MUSIC_API_HOST ?? '';
  const url = `${baseUrl}/register/anonimous`;
  const result = await fetch(url, {
    method: 'POST',
  });
  return result;
};
