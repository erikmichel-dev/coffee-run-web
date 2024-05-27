import { Coffee } from "./coffee";

export interface UserData {
  user_id: string | undefined;
  grain_currency: number;
  deck: Coffee[];
}