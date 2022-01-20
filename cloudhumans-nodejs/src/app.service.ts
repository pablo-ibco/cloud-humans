import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverUp(): string {
    return 'Server Up!';
  }
}
