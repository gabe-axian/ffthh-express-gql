import SalesRepo from "../database/sales.repo";

class SalesService {
  private _repo: SalesRepo;
  constructor() {
    this._repo = new SalesRepo();
  }

  async getSalesOrders(count: number) {
    return this._repo.getSalesOrders(count);
  }

  async getSalesOrder(id: number){
    return this._repo.getSalesOrder(id);
  }
}

export default SalesService;