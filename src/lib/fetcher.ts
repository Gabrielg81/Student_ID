export const fetcher = async (url: RequestInfo) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
