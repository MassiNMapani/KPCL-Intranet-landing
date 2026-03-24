const allowedHosts = ["apps.kpcl.example", "intranet.kpcl.example", "hr.kpcl.example"];

const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && allowedHosts.includes(url.host);
  } catch {
    return false;
  }
};

export const validateResourceUrl = (value: string): string => {
  if (!isValidUrl(value)) {
    throw new Error(`Resource URL is not approved: ${value}`);
  }

  return value;
};
