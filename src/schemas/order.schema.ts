import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Order {
  @Field(type => Int)
  public CustomerId: number;

  @Field(type => Int)
  public OrderId: number;

  @Field()
  public OrderDate: string;
}