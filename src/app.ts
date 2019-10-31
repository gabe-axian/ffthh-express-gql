import express from "express";
import SalesOrdersRepo from "./database/sales.repo";
import SalesService from "./services/sales.service";
import PurchasingService from "./services/purchasing.service";
import WarehouseService from "./services/warehouse.service";
import ApplicationService from "./services/application.service";

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
    ROUTES
    <a href='/application/people' >people: "/application/people"</a><br />
    <a href='/purchasing/po' >purchaseOrders: "/purchasing/po"</a><br />
    <a href='/sales/order' >salesOrders: "/sales/order"</a><br />
    <a href='/warehouse/stockItem' >stockItems: "/warehouse/stockItem"</a><br />
    </html>`;
    // Regular routes
    this.app.get('/', async (req, res) => res.send( `<html><pre>${routeMap}</pre></html>`));
    this.app.get('/application/people', async (req, res) => res.send(await appSvc.getPeople(10)));
    this.app.get('/purchasing/po', async (req, res) => res.send(await purchSvc.getPurchaseOrders(10)));
    this.app.get('/sales/order', async (req, res) => res.send(await soSvc.getSalesOrders(10)));
    this.app.get('/warehouse/stockItem', async (req, res) => res.send(await whsSvc.getStockItems(10)));


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