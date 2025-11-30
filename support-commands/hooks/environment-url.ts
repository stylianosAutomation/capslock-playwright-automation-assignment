//use reusable commands for brands navigation 
//import env mapping and types
import { EnvironmentName } from '../../capslock-env-configs/env.configs';
import { environmentData } from "../../environments/brands"

// Hook to get current environment and brands **reusuble -dynamic  for every URL  or loop
export const useBrandEnv = (env: EnvironmentName, urlSubstring?: string) => {
  const brands = environmentData[env].brands;

  let currentUrl: string | undefined = undefined;

  if (urlSubstring) {
    currentUrl = brands.find(b => b.url.includes(urlSubstring))?.url;
  }

  return { env, brands, currentUrl };
};