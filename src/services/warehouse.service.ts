import WarehouseRepo from "../database/warehouse.repo";

class WarehouseService {
  private _repo: WarehouseRepo;
  constructor() {
    this._repo = new WarehouseRepo();
  }

  async getStockItems(count: number) {
    return this._repo.getStockItems(count);
  }
}

export default WarehouseService;