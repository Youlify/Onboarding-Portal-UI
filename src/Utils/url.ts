const replaceTmpUrlByParams = (url: string, params?: Record<string, any>) => {
  let newUrl = url;
  if (!params) return newUrl;
  Object.keys(params).forEach((key) => {
    newUrl = newUrl.replace(`{${key}}`, params[key]);
  });
  return newUrl;
};

export { replaceTmpUrlByParams };
