import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const assets = [
      { id: 1, name: 'Checking', amount: 4200 },
      { id: 2, name: 'Brokerage', amount: 18500 }
    ];
    const debts = [
      { id: 1, name: 'Visa', balance: 1200, apr: 22.99, min_payment: 45 },
      { id: 2, name: 'Auto Loan', balance: 9800, apr: 5.2, min_payment: 275 }
    ];
    const goals = [
      { id: 1, name: 'Emergency Fund', target_amount: 15000, saved: 4200 }
    ];
    const income = [
      { id: 1, source: 'Salary', cadence: 'biweekly', net_amount: 3200 }
    ];
    const obligations = [
      { id: 1, name: 'Rent', cadence: 'monthly', amount: 2200 }
    ];
    const summary = { netWorth: 4200 + 18500 - (1200 + 9800), savingsRate: 0.22, dti: 0.18, runwayMonths: 4.2 };
    return { assets, debts, goals, income, obligations, summary };
  }
}
