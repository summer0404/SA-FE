type RequestOptions = {
  headers?: Record<string, string>;
  body?: any;
};

export const get = async (url: string, options: RequestOptions = {}) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  return res;
};

export const post = async (
  url: string,
  data: any,
  options: RequestOptions = {}
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const put = async (
  url: string,
  data: any,
  options: RequestOptions = {}
) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const del = async (url: string, options: RequestOptions = {}) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  return res;
};
