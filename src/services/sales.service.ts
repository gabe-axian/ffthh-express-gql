import SalesRepo from "../database/sales.repo";

class SalesService {
  private _repo: SalesRepo;
  constructor() {
    this._repo = new SalesRepo();
  }

  async getSalesOrders(count: number) {
    return this._repo.getSalesOrders(count);
  }
}

export default SalesService;