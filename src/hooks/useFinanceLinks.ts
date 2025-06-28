
import { useState, useEffect } from 'react';

export interface FinanceLink {
  id: string;
  product_id: number;
  product_name: string;
  finance_url: string;
  monthly_payment: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Updated mock data with working FinanceIt URLs
const mockFinanceLinks: FinanceLink[] = [
  // Heat Pumps
  {
    id: '1',
    product_id: 1,
    product_name: 'Kepler Central Heat Pump 2 ton (-15)',
    finance_url: 'https://www.financeit.ca/s/IlixFg',
    monthly_payment: 43.12,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    product_id: 2,
    product_name: 'Kepler Central Heat Pump 2 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/kepler2ton30',
    monthly_payment: 45.92,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    product_id: 3,
    product_name: 'Kepler Central Heat Pump 3 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/kepler3ton30',
    monthly_payment: 56.46,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    product_id: 4,
    product_name: 'Kepler Central Heat Pump 4 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/kepler4ton30',
    monthly_payment: 75.88,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    product_id: 5,
    product_name: 'Tosot Central Heat Pump 2-3 ton',
    finance_url: 'https://www.financeit.ca/s/tosot23ton',
    monthly_payment: 59.03,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '20',
    product_id: 20,
    product_name: 'Novair Central Heat Pump 1.5 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/novair15ton',
    monthly_payment: 42.82,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '21',
    product_id: 21,
    product_name: 'Novair Central Heat Pump 2 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/novair2ton',
    monthly_payment: 45.30,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '22',
    product_id: 22,
    product_name: 'Novair Central Heat Pump 2.5 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/novair25ton',
    monthly_payment: 49.40,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '23',
    product_id: 23,
    product_name: 'Novair Central Heat Pump 3 ton (-30)',
    finance_url: 'https://www.financeit.ca/s/novair3ton',
    monthly_payment: 53.70,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Smart Battery Systems
  {
    id: '10',
    product_id: 10,
    product_name: 'Smart Power Home 10kWh',
    finance_url: 'https://www.financeit.ca/s/smartpower10kwh',
    monthly_payment: 116.84,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '11',
    product_id: 11,
    product_name: 'Smart Power Home 15kWh',
    finance_url: 'https://www.financeit.ca/s/smartpower15kwh',
    monthly_payment: 171.84,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    product_id: 12,
    product_name: 'Smart Power Home 20kWh',
    finance_url: 'https://www.financeit.ca/s/smartpower20kwh',
    monthly_payment: 217.20,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Furnaces
  {
    id: '16',
    product_id: 16,
    product_name: 'Lennox ML296XV045',
    finance_url: 'https://www.financeit.ca/s/2H0lJA',
    monthly_payment: 35.92,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '13',
    product_id: 13,
    product_name: 'Lennox ML296XV070',
    finance_url: 'https://www.financeit.ca/s/kFr7Lw',
    monthly_payment: 37.36,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '14',
    product_id: 14,
    product_name: 'Lennox ML296XV090',
    finance_url: 'https://www.financeit.ca/s/HDwRnw',
    monthly_payment: 41.06,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Tankless Water Heaters - Fixed duplicate IDs
  {
    id: '17',
    product_id: 17,
    product_name: 'Rinnai RX160iN',
    finance_url: 'https://www.financeit.ca/s/rinnai160in',
    monthly_payment: 33.86,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '18',
    product_id: 18,
    product_name: 'Rinnai RX199iN',
    finance_url: 'https://www.financeit.ca/s/rinnai199in',
    monthly_payment: 39.00,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '15',
    product_id: 15,
    product_name: 'Kepler JSG52-32PCH/199KNP',
    finance_url: 'https://www.financeit.ca/s/keplertankless',
    monthly_payment: 32.84,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Air Conditioners
  {
    id: '101',
    product_id: 101,
    product_name: 'Midea 2 ton MOVA-24CN1-M134G',
    finance_url: 'https://www.financeit.ca/s/IS61pg',
    monthly_payment: 22.51,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '102',
    product_id: 102,
    product_name: 'Midea 2.5 ton MOVA-30CN1-M134G',
    finance_url: 'https://www.financeit.ca/s/midea25ton',
    monthly_payment: 24.11,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '103',
    product_id: 103,
    product_name: 'Midea 3 ton MOVA-36CN1-M134G',
    finance_url: 'https://www.financeit.ca/s/midea3ton',
    monthly_payment: 28.11,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '104',
    product_id: 104,
    product_name: 'Lennox 2 ton ML14XC024',
    finance_url: 'https://www.financeit.ca/s/lennox2tonac',
    monthly_payment: 25.66,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '105',
    product_id: 105,
    product_name: 'Lennox 2.5 ton ML14XC030',
    finance_url: 'https://www.financeit.ca/s/lennox25tonac',
    monthly_payment: 29.12,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '106',
    product_id: 106,
    product_name: 'Lennox 3 ton ML14XC036',
    finance_url: 'https://www.financeit.ca/s/lennox3tonac',
    monthly_payment: 33.37,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '107',
    product_id: 107,
    product_name: 'Lennox 3.5 ton ML14XC42',
    finance_url: 'https://www.financeit.ca/s/lennox35tonac',
    monthly_payment: 37.73,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useFinanceLinks = () => {
  const [financeLinks, setFinanceLinks] = useState<FinanceLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinanceLinks();
  }, []);

  const fetchFinanceLinks = async () => {
    try {
      setLoading(true);
      // For now, use mock data
      // TODO: Replace with actual Supabase query once table is created
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      setFinanceLinks(mockFinanceLinks);
      console.log('Finance links loaded:', mockFinanceLinks.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch finance links');
      console.error('Error fetching finance links:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFinanceLinkForProduct = (productId: number): FinanceLink | null => {
    const link = financeLinks.find(link => link.product_id === productId) || null;
    console.log(`Finance link for product ${productId}:`, link);
    return link;
  };

  // For multiple products, get the link for the highest value product
  const getFinanceLinkForProducts = (productIds: number[]): FinanceLink | null => {
    const availableLinks = financeLinks.filter(link => 
      productIds.includes(link.product_id)
    );
    
    if (availableLinks.length === 0) return null;
    
    // Return the link with the highest monthly payment (indicating highest value)
    return availableLinks.reduce((highest, current) => 
      current.monthly_payment > highest.monthly_payment ? current : highest
    );
  };

  return {
    financeLinks,
    loading,
    error,
    getFinanceLinkForProduct,
    getFinanceLinkForProducts,
    refetch: fetchFinanceLinks
  };
};
