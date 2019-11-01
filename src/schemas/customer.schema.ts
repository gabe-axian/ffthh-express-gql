import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Customer {
  @Field(type => Int)
  public CustomerID: number;
  
  @Field()
  public CustomerName: string;
}