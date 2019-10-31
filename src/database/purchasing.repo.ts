import BaseRepo from "./base-repo";

class PurchasingRepo {
  constructor() {}

  async getPurchaseOrders(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from purchasing.purchaseOrders`);
  }
}

export default PurchasingRepo;