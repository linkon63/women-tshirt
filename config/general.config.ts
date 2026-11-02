import { getPublicEnvValue } from "@/utils/publicEnv";

export const API_BASE_URL = getPublicEnvValue(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  "NEXT_PUBLIC_API_BASE_URL",
  "https://pjfashion.hs-inventory.softzino.xyz/api/v1"
);

export const getTenantConfig = (subdomain?: string) => {
  return {
    api: {
      baseUrl: API_BASE_URL,
    },
  };
};
