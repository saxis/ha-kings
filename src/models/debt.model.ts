export class Debt {
  biller: string;
  original_financed_amount: number;
  principal_balance: number;
  due_date: string;
  past_due_amount: number;
  total_amount_due: number;
  interest_rate: number;
  payoff_amount: number;
  owner: string;

  // original financed amount $33,465.72
  // principal balance: $19,323.67
  // due date string
  // past due amount: 666.45
  // total amount due: 666.45
  // Interest rate: 12.5
  // payoff amount: $19,502.35

  constructor(biller, original_financed_amount, principal_balance, due_date, past_due_amount,
    total_amount_due, interest_rate, payoff_amount, owner) {
    this.biller = biller;
    this.original_financed_amount = original_financed_amount;
    this.principal_balance = principal_balance;
    this.due_date = due_date;
    this.past_due_amount = past_due_amount;
    this.total_amount_due = total_amount_due;
    this.interest_rate = interest_rate;
    this.payoff_amount = payoff_amount;
    this.owner = owner;
  }
  // constructor(source, date, amount, owner) {
  //   this.source = source;
  //   this.date = date;
  //   this.amount = amount;
  //   this.owner = owner;
  // }
}
