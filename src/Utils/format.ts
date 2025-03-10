const formatPrice = (
  price?: number | string,
  prefix?: string,
  backupStr?: string
) => {
  if (price === undefined || price === null || price === "")
    return backupStr || "-";
  const prefixStr = prefix || "$";
  return `${prefixStr}${Number(price).toFixed(2)}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
};

export { formatPrice };
