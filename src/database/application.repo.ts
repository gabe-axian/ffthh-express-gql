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

  async addPerson(name: string) {
    return await BaseRepo.Instance.executeQuery(`insert into Application.People (
      FullName, 
      PreferredName, 
      IsPermittedToLogon, 
      IsExternalLogonProvider, 
      IsSystemUser, 
      IsEmployee, 
      IsSalesperson, 
      LastEditedBy) 
    values (@fullName, @fullName, 1, 1, 0, 0, 0, 1)`, [{name: 'fullName', type: mssql.Int, value: name} as IQueryParam])
  }
}

export default ApplicationRepo;