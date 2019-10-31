import ApplicationRepo from "../database/application.repo";

class ApplicationService {
  private _repo: ApplicationRepo;
  constructor() {
    this._repo = new ApplicationRepo();
  }

  async getPeople(count: number) {
    return this._repo.getPeople(count);
  }
}

export default ApplicationService;