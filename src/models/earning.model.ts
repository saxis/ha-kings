export class Earning {
  source: string;
  date: string;
  amount: number;
  owner: string;

  constructor(source, date, amount, owner) {
    this.source = source;
    this.date = date;
    this.amount = amount;
    this.owner = owner;
  }
}
