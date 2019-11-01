import BaseRepo, { IQueryParam } from "./base-repo";
import mssql from "mssql";

class PurchasingRepo {
  constructor() {}

  async getPurchaseOrders(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from purchasing.purchaseOrders`);
  }
  async getPurchaseOrder(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from purchasing.purchaseOrders where purchaseOrderId = @po_id`, [{name: 'po_id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getPurchasOrderLine(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from purchasing.purchaseOrderLines where purchaseOrderLineId = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getPurchasOrderLineByPurchaseOrder(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from purchasing.purchaseOrderLines where purchaseOrderId = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSupplier(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from purchasing.suppliers where supplierid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSupplierCategory(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from purchasing.suppliercategories where suppliercategoryid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
}

export default PurchasingRepo;