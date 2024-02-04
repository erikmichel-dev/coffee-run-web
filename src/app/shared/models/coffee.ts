export interface Coffee {
  coffee_id: string;
  name: string;
  description: string;
  tier: string;
  origin: string;
  cost: number;
}

export interface CoffeeWrapper {
  message: Coffee;
}