import BaseRepo, { IQueryParam } from "./base-repo";
import mssql from "mssql";

class SalesRepo {
  constructor() {}

  async getSalesOrders(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from sales.orders order by lastEditedWhen desc`);
  }

  async getSalesOrder(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.orders where orderid = @order_id`, [{name: 'order_id', type: mssql.Int, value: id} as IQueryParam])
  }

  async getCustomer(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.customers where customerid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }

  async getCustomerCategory(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.customercategories where customercategoryid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesOrderLine(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesorderlines where orderlineid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesInvoice(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesInvoices where invoiceid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesInvoiceLine(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesInvoicelines where invoicelineid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
}

export default SalesRepo;