import mssql from "mssql";
import { CommonConnectionOptions } from "tls";

class BaseRepo {
private _pool: any;
  private static _instance: BaseRepo;
  constructor() {
    this._pool = new mssql.ConnectionPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_HOST || 'localhost', // You can use 'localhost\\instance' to connect to named instance
      database: 'WideWorldImporters',
  
      options: {
          encrypt: true // Use this if you're on Windows Azure
      }
    });
  }

  private errorHandler(error: any) {
    console.log(error);
  }

  public async executeQuery<T>(query: string, args?: IQueryParam[]): Promise<T> {
    if (!this._pool.connected && !this._pool.connecting) {
      await this._pool.connect();
    }
    let result;
    if (args && args.length > 0) {
      const req = this._pool.request();
      args.forEach(arg => {
        req.input(arg.name, arg.type, arg.value)
      });
      const {output, recordset, recordsets, rowsAffected} = await req.query(query);
      result = recordset;
    } else {
      const {output, recordset, recordsets, rowsAffected} = await this._pool.request().query(query);
      result = recordset;
    }
    return result;
  }

  // public async executeTransaction<T>(fn: (connection: any) => Promise<Maybe<T>>): Promise<Maybe<T>> {
  //   const transaction = this._pool.transaction();
  //   transaction.begin((err: any) => {
  //       // ... error checks
    
  //       const request = new mssql.Request(transaction)
  //       request.query('insert into mytable (mycolumn) values (12345)', (err, result) => {
  //           // ... error checks
    
  //           transaction.commit(err => {
  //               // ... error checks
    
  //               console.log("Transaction committed.")
  //           })
  //       })
  //   })

  //   const conn = await this._pool.getConnection();
  //   try {
  //     await conn.beginTransaction();
  //     const result = await fn(conn);
  //     await conn.commit();
  //     return result;
  //   } catch (error) {
  //     // TODO: Implement better error logging
  //     console.log(error);
  //     await conn.rollback();
  //   } finally {
  //     conn.release();
  //   }
  // }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
export interface IQueryParam {
  name: string,
  type: any,
  value: any
}
export default BaseRepo;