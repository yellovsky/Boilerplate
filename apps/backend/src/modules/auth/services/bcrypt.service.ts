import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ROUNDS_OF_HASHING } from '../config/constants';
import type { BcryptService } from '../interfaces/bcrypt.service.interface';

@Injectable()
export class BcryptServiceImpl implements BcryptService {
  hash(pwd: string, roundsOfHashing = ROUNDS_OF_HASHING): Promise<string> {
    return bcrypt.hash(pwd, roundsOfHashing);
  }

  compare(pwd: string, pwdToCompare: string): Promise<boolean> {
    return bcrypt.compare(pwd, pwdToCompare);
  }
}
