import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtResponse } from 'src/infrastructure/interfaces/IJwtResponse';

@Injectable()
export class AuthenticationService {
  constructor(private readonly _jwtService: JwtService) {}

  public validate() {
    return true;
  }

  public getJWT(payload: any, withBearerString = false): IJwtResponse {
    if (this.validate) {
      return {
        access_token: withBearerString
          ? `Bearer ${this._jwtService.sign(payload)}`
          : `${this._jwtService.sign(payload)}`,
      };
    }
  }
}
