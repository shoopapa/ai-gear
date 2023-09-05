export type ClerkError = {
  errors: {
    longMessage: string;
  }[];
};
export const isClerkError = (v: unknown): v is ClerkError => {
  if (v && typeof v === "object") {
    return "errors" in v;
  }
  return false;
};
