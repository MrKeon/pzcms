import PZConfigController from '@/controllers/pzconfig.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class PZConfigRoute implements Routes {
  public path = '/pzconfig';
  public router = Router();
  public pzConfigController = new PZConfigController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.pzConfigController.pzconfig);
    this.router.post(`${this.path}`, this.pzConfigController.writePzConfig);
  }
}

export default PZConfigRoute;
