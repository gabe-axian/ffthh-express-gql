import BaseRepo, { IQueryParam } from "./base-repo";
import mssql from "mssql";

class WarehouseRepo {
  constructor() {}

  async getStockItems(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from warehouse.stockitems`);
  }

  async getStockItem(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from warehouse.stockitems where stockitemid = @item_id`, [{name: 'item_id', type: mssql.Int, value: id} as IQueryParam])
  }

  async getStockItemHoldings(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from warehouse.stockitemholdings where stockitemid = @item_id`, [{name: 'item_id', type: mssql.Int, value: id} as IQueryParam])
  }

  async getColor(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from warehouse.colors where colorid = @item_id`, [{name: 'item_id', type: mssql.Int, value: id} as IQueryParam])
  }

  async getStockGroup(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from warehouse.stockgroups where stockgroupid = @item_id`, [{name: 'item_id', type: mssql.Int, value: id} as IQueryParam])
  }
}

export default WarehouseRepo;