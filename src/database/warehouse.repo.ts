import BaseRepo from "./base-repo";

class WarehouseRepo {
  constructor() {}

  async getStockItems(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from warehouse.stockitems`);
  }
}

export default WarehouseRepo;