import { ObjectType, Field, Int, InputType } from "type-graphql";

@ObjectType()
export class Customer {
  @Field(type => Int)
  public CustomerID: number;
  
  @Field()
  public CustomerName: string;
}

@InputType()
export class CustomerTypeUpdate {
  @Field(type => Int)
  public CustomerTypeID: number;

  @Field(type => Int)
  public CustomerID: number;
}