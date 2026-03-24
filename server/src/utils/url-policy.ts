const allowedHosts = new Set([
  "apps.kpcl.example",
  "intranet.kpcl.example",
  "hr.kpcl.example",
]);

export const validateExternalUrl = (value: string): string => {
  const parsed = new URL(value);

  if (parsed.protocol !== "https:" || !allowedHosts.has(parsed.host)) {
    throw new Error(`External URL failed policy validation: ${value}`);
  }

  return value;
};
