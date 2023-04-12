import { Customer } from "../customer/customer";

export class Demand {
  id?: number;
  user?: Customer;
  concernedSite?: string;
  concernedLocal?: string;
  demandObject?: string;
  equipmentAdd?: string;
  equipmentRecovery?: string;
  visitDayStart?: Date;
  visitDayEnd?: Date;
  visitDateStart?: string;
  visitDateEnd?: string;
  refusalReason?: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}
