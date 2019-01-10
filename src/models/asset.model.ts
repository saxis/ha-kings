export class Asset {
  asset_denomination: string; // ether, bitcoin, fiat;
  balance: number; // btc .00000000 ether 0.0000000000000000 fiat 0.00
  purchase_price_per_full_unit: number;
  current_price_per_full_unit: number;
  purchase_time_value: number;
  current_value: number;
  owner: string;

  constructor(asset_denomination, balance, purchase_price_per_full_unit, current_price_per_full_unit,
    purchase_time_value, current_value, owner) {
    this.asset_denomination = asset_denomination;
    this.balance = balance;
    this.purchase_price_per_full_unit = purchase_price_per_full_unit;
    this.current_price_per_full_unit = current_price_per_full_unit;
    this.purchase_time_value = purchase_time_value;
    this.current_value = current_value;
    this.owner = owner;
  }

}

  // 2 things to track.
  // 1. The trade itself. - Will need to tie the asset to the trade data before releasing the application
  // 2. The asset after aquisition
  // fiat or crypto
  // number of units purchased
  // price per unit a purchase time
  // purchase or exchange fees
  // current price per unit
  // current value (curent price per unit * units)
  // dividend or not
  // interest or not
  // next dividend date
