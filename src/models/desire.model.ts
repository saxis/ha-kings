export class Desire {
  name: string;
  detail?: string;
  year?: number;
  amount?: number;
  scheduled?: boolean;
  fulfilled?: boolean;
  recipient?: string;
  owner: string;

  constructor(name, detail, year, amount, scheduled, fulfilled, recipient, owner) {
    this.name = name;
    this.detail = detail;
    this.year = year;
    this.amount = amount;
    this.scheduled = scheduled;
    this.fulfilled = fulfilled;
    this.recipient = recipient;
    this.owner = owner;
  }
}
