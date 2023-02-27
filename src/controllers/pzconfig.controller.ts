import { config, configPath } from '@/server';
import { NextFunction, Request, Response } from 'express';
import PZConfigService, { IPZConfig } from '@/services/pzconfig.service';

class PZConfigController {
  public configService = new PZConfigService();
  public pzconfig = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const settings = this.configService.parseConfig(config);
      res.send(settings);
    } catch (error) {
      next(error);
    }
  };

  public writePzConfig = (req: Request, res: Response, next: NextFunction): void => {
    try {
      console.log(req.body);
      const payload: IPZConfig = req.body;
      // TODO: UPDATE CONFIG PATH
      this.configService.writePayload(payload, configPath);
      res.send();
    } catch (error) {
      next(error);
    }
  };
}

export default PZConfigController;
