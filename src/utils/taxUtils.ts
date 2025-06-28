
// Province tax rates
export type Province = 
  | 'Alberta'
  | 'British Columbia'
  | 'Manitoba'
  | 'New Brunswick'
  | 'Newfoundland and Labrador'
  | 'Northwest Territories'
  | 'Nova Scotia'
  | 'Nunavut'
  | 'Ontario'
  | 'Prince Edward Island'
  | 'Quebec'
  | 'Saskatchewan'
  | 'Yukon';

interface TaxRate {
  gst: number;  // GST - Goods and Services Tax
  pst?: number; // PST - Provincial Sales Tax
  hst?: number; // HST - Harmonized Sales Tax
  qst?: number; // QST - Quebec Sales Tax
  name: string; // Display name
}

export const PROVINCES: Record<Province, TaxRate> = {
  'Alberta': { gst: 0.05, name: 'GST (5%)' },
  'British Columbia': { gst: 0.05, pst: 0.07, name: 'GST + PST (12%)' },
  'Manitoba': { gst: 0.05, pst: 0.07, name: 'GST + PST (12%)' },
  'New Brunswick': { gst: 0, hst: 0.15, name: 'HST (15%)' },
  'Newfoundland and Labrador': { gst: 0, hst: 0.15, name: 'HST (15%)' },
  'Northwest Territories': { gst: 0.05, name: 'GST (5%)' },
  'Nova Scotia': { gst: 0, hst: 0.15, name: 'HST (15%)' },
  'Nunavut': { gst: 0.05, name: 'GST (5%)' },
  'Ontario': { gst: 0, hst: 0.13, name: 'HST (13%)' },
  'Prince Edward Island': { gst: 0, hst: 0.15, name: 'HST (15%)' },
  'Quebec': { gst: 0.05, qst: 0.09975, name: 'GST + QST (14.975%)' },
  'Saskatchewan': { gst: 0.05, pst: 0.06, name: 'GST + PST (11%)' },
  'Yukon': { gst: 0.05, name: 'GST (5%)' },
};

// Calculate total tax rate for a province
export const calculateTaxRate = (province: Province): number => {
  const rates = PROVINCES[province];
  let totalRate = rates.gst || 0;
  
  if (rates.hst) totalRate += rates.hst;
  if (rates.pst) totalRate += rates.pst;
  if (rates.qst) totalRate += rates.qst;
  
  return totalRate;
};

// Calculate tax amount
export const calculateTaxAmount = (amount: number, province: Province): number => {
  return amount * calculateTaxRate(province);
};

// Calculate financing fee (7.5%)
export const calculateFinancingFee = (amount: number): number => {
  return amount * 0.075;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-CA', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
