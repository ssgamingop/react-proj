export interface Coin {
  Id: string;
  Name: string;
  FullName: string;
  ImageUrl: string;
}

export interface CoinPrice {
  PRICE: number;
  CHANGE24HOUR: number;
  CHANGEPCT24HOUR: number;
  MKTCAP: number;
  VOLUME24HOUR: number;
}

export interface PortfolioAsset {
  id: string; // Internal id (e.g., uuid)
  coinSymbol: string;
  amount: number;
  buyPrice: number;
  dateAdded: number; // timestamp
}

export interface PriceAlert {
  id: string; // Internal id
  coinSymbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
}
