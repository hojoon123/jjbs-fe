// 토큰을 포함하여 fetch 요청을 처리하는 함수
export const fetchWithToken = async (url: string, method: string, body?: Record<string, unknown>) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : null,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status}`);
  }

  return response.json();
};