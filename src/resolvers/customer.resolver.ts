import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import SalesRepo from "../database/sales.repo";
import { Customer } from "../schemas/customer.schema";
import { Order } from "../schemas/order.schema";
import Maybe from "graphql/tsutils/Maybe";

@Resolver(of => Customer)
export class CustomerResolver {
  private _salesRepo: SalesRepo;

  constructor() {
    this._salesRepo = new SalesRepo();
  }

  @Query(returns => Customer)
  async getCustomer(@Arg("id") id: number) {
    return await this._salesRepo.getCustomer(id);
  }

  @FieldResolver(returns => [Order])
  public Orders(@Root() customer: Customer): Promise<Maybe<Order>> {
    return this._salesRepo.getSalesOrdersForCustomer(customer.CustomerID);
  }
}