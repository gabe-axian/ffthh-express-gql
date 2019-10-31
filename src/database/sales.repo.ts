import BaseRepo from "./base-repo";

class SalesRepo {
  constructor() {}

  async getSalesOrders(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from sales.orders order by lastEditedWhen desc`);
  }
}

export default SalesRepo;