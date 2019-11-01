import "reflect-metadata";
import express from "express";
import graphqlHTTP from "express-graphql";
import SalesService from "./services/sales.service";
import PurchasingService from "./services/purchasing.service";
import WarehouseService from "./services/warehouse.service";
import ApplicationService from "./services/application.service";
import { buildSchema } from "type-graphql";
import { CustomerResolver } from "./resolvers/customer.resolver";

class App {
  private _port: any;
  public app: express.Application;

  constructor(port: any) {
    this._port = port;
    this.app = express();
    this.setupCORS();
  }

  private setupCORS() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Method", "GET,POST,OPTIONS");
      if ('OPTIONS' === req.method) {
        res.status(200).send("OK");
      } else {
        next();
      }
    });
  }

  public async listen() {
    const router = express.Router();
    const soSvc = new SalesService();
    const purchSvc = new PurchasingService();
    const whsSvc = new WarehouseService();
    const appSvc = new ApplicationService();
    const routeMap = `<html>
    ROUTES<br />
    <a href='/application/people' >top 10 people: "/application/people"</a><br />
    <a href='/purchasing/po' >top 10 purchaseOrders: "/purchasing/po"</a><br />
    <a href='/sales/order' >top 10 salesOrders: "/sales/order"</a><br />
    <a href='/warehouse/stockItem' >top 10 stockItems: "/warehouse/stockItem"</a><br />
    </html>`;
    // Regular routes
    this.app.get('/', async (req, res) => res.send( `<html><pre>${routeMap}</pre></html>`));
    this.app.get('/application/people', async (req, res) => res.send(await appSvc.getPeople(10)));
    this.app.get('/application/people/1', async (req, res) => res.send(await appSvc.getPerson(1)));
    this.app.get('/purchasing/po', async (req, res) => res.send(await purchSvc.getPurchaseOrders(10)));
    this.app.get('/purchasing/po/1', async (req, res) => res.send(await purchSvc.getPurchaseOrder(1)));
    this.app.get('/sales/order', async (req, res) => res.send(await soSvc.getSalesOrders(10)));
    this.app.get('/sales/order/1', async (req, res) => res.send(await soSvc.getSalesOrder(1)));
    this.app.get('/warehouse/stockItem', async (req, res) => res.send(await whsSvc.getStockItems(10)));
    this.app.get('/warehouse/stockItem/1', async (req, res) => res.send(await whsSvc.getStockItem(1)));
  
    const schema = await buildSchema({
      resolvers: [CustomerResolver],
      validate: false,
      emitSchemaFile: true
    })
    this.app.use(
      graphqlHTTP({
        schema: schema,
        graphiql: true,
      }),
    );

    // 404s
    this.app.use((req, res) => {
      res.status(404).send("These are not the droids you're looking for...");
    });

    // tslint:disable-next-line:no-console
    this.app.listen(this._port, () => {
      console.log( `server started at http://localhost:${ this._port }` );
    });
  }
}

export default App;