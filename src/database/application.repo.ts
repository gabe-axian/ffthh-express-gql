import BaseRepo from "./base-repo";

class ApplicationRepo {
  constructor() {}

  async getPeople(count: number) {
    return await BaseRepo.Instance.executeQuery(`select top ${count} * from application.people`);
  }
}

export default ApplicationRepo;