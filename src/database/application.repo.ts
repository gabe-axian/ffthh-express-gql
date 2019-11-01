import BaseRepo, { IQueryParam } from "./base-repo";
import mssql from "mssql";

class ApplicationRepo {
  constructor() {}

  async getPeople(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from application.people`);
  }

  async getPerson(id: number) {
    return await BaseRepo.Instance.executeQuery(`select * from application.people where personid = @id`, [{name: 'id', type: mssql.Int, value: id} as IQueryParam])
  }
}

export default ApplicationRepo;