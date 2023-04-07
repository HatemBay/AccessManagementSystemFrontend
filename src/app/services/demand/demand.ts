import { Customer } from "../customer/customer";

export class Demand {
  id?: number;
  customer?: Customer;
  concernedSite?: string;
  concernedLocal?: string;
  demandObject?: string;
  equipmentAdd?: string;
  equipmentRecovery?: string;
  visitDayStart?: string;
  visitDayEnd?: string;
  visitDateStart?: Date;
  visitDateEnd?: Date;
  refusalReason?: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}
