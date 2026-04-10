const allowedHosts = new Set([
  "apps.kpcl.example",
  "intranet.kpcl.example",
  "hr.kpcl.example",
  "192.168.0.22",
  "192.168.0.23",
  "192.168.0.35",
]);

export const validateExternalUrl = (value: string): string => {
  const parsed = new URL(value);

  const allowedProtocols =
    parsed.host === "192.168.0.22" ||
    parsed.host === "192.168.0.23" ||
    parsed.host === "192.168.0.35"
      ? new Set(["http:"])
      : new Set(["https:"]);

  if (!allowedProtocols.has(parsed.protocol) || !allowedHosts.has(parsed.host)) {
    throw new Error(`External URL failed policy validation: ${value}`);
  }

  return value;
};
