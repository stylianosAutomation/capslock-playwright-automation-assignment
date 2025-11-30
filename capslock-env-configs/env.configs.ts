

export type EnvironmentName = 'production' | 'test' | 'development';
// 'production' | 'test' | 'development'
// Define the possible environment names for the app


// Configuration interface for the environment
export interface EnvironmentConfig { 
  brands: EnvironmentName// Array of brand configurations
}

// Configuration interface for a brand
export interface BrandConfig {
  name: string; // Brand name
  url: string;  // Brand URL
}