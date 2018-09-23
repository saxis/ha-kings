export class Obligation {
  biller: string;
  dueDate: string;
  datePaid?: string;
  expectedAmount: number;
  amountPaid?: number;
  paid?: boolean;
  owner: string;

  constructor(biller, duedate, datePaid, expectedAmount, amountPaid, paid, owner) {
    this.biller = biller;
    this.dueDate = duedate;
    this.datePaid = datePaid;
    this.expectedAmount = expectedAmount;
    this.amountPaid = amountPaid;
    this.paid = paid;
    this.owner = owner;
  }
}
