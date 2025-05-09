import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { BcryptService } from '../../domain/interfaces/bcrypt.service.interface';
import { ROUNDS_OF_HASHING } from '../../config/constants';

@Injectable()
export class BcryptServiceImpl implements BcryptService {
  hash(pwd: string, roundsOfHashing = ROUNDS_OF_HASHING): Promise<string> {
    return bcrypt.hash(pwd, roundsOfHashing);
  }

  compare(pwd: string, pwdToCompare: string): Promise<boolean> {
    return bcrypt.compare(pwd, pwdToCompare);
  }
}
