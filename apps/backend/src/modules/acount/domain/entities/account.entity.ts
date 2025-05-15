import { AuthProviderEntity, type AuthProviderEntityData, EmailAuthProviderEntity } from './auth-provider.entity';
import { ProfileEntity, type ProfileEntityData } from './profile.entity';

export interface AccountEntityData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  profiles: Array<ProfileEntity | ProfileEntityData>;
  authProviders: Array<EmailAuthProviderEntity | AuthProviderEntityData>;
}

export class AccountEntity {
  static from(data: AccountEntityData): AccountEntity {
    return new AccountEntity(
      data.id,
      data.createdAt,
      data.updatedAt,
      data.profiles.map((p) => (p instanceof ProfileEntity ? p : ProfileEntity.from(p))),
      data.authProviders
        .map((ap) => (ap instanceof EmailAuthProviderEntity ? ap : AuthProviderEntity.from(ap)))
        .filter((val) => !!val)
    );
  }

  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly profiles: ProfileEntity[],
    public readonly authProviders: EmailAuthProviderEntity[]
  ) {}
}
