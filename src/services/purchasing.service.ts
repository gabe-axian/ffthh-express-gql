import PurchasingRepo from "../database/purchasing.repo";

class PurchasingService {
  private _repo: PurchasingRepo;
  constructor() {
    this._repo = new PurchasingRepo();
  }

  async getPurchaseOrders(count: number) {
    return this._repo.getPurchaseOrders(count);
  }

  async getPurchaseOrder(id: number) {
    return this._repo.getPurchaseOrder(id);
  }
}

export default PurchasingService;