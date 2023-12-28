import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigModel } from '../../../infrastructure/config/AppConfigModel';

@Injectable()
export class AppConfigService {
  constructor(private readonly _config: ConfigService) {}

  public get config(): AppConfigModel {
    return this._config.get('appConfig');
  }
}
