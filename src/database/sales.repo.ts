import BaseRepo, { IQueryParam } from "./base-repo";
import mssql from "mssql";

class SalesRepo {
  constructor() {}

  async getSalesOrders(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from sales.orders order by lastEditedWhen desc`);
  }

  // async getSalesOrdersForCustomer(id: number): Promise<Maybe<any>> {
  //   return await BaseRepo.Instance.executeQuery(`select * from sales.orders where customerid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  // }

  async getSalesOrder(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.orders where orderid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }

  async getCustomer(id: number) {
    const res = await BaseRepo.Instance.executeQuery<any[]>(`select * from sales.customers where customerid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
    return res[0];
  }

  async getCustomerCategory(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.customercategories where customercategoryid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesOrderLine(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesorderlines where orderlineid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesOrderLinesByOrderId(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesorderlines where orderid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesInvoice(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesInvoices where invoiceid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesInvoiceLine(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesInvoicelines where invoicelineid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
  async getSalesInvoiceLineByInvoice(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from sales.salesInvoicelines where invoiceId = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }

  async addCustomerCategory(categoryName: string) {
    return await BaseRepo.Instance.executeQuery(`insert into sales.CustomerCategories(CustomerCategoryName, LastEditedBy) values (@name, 1)`, [{name: 'name', type: mssql.Int, value: categoryName} as IQueryParam])
  }

  async updateCustomersCategory(customerId: number, categoryId: number) {
    const res = await BaseRepo.Instance.executeQuery(`update sales.Customers set CustomerCategoryID = @categoryId where CustomerID = @customerId`, 
      [{name: 'categoryId', type: mssql.Int, value: categoryId} as IQueryParam, {name: 'customerId', type: mssql.Int, value: customerId} as IQueryParam]);
    return await this.getCustomer(customerId);
  }
}

export default SalesRepo;