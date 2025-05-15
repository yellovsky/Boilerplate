export interface EmailAuthProviderEntityData {
  id: string;
  accountId: string;
  providerType: 'email';
  email: string;
  passwordHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class EmailAuthProviderEntity {
  static from(data: EmailAuthProviderEntityData): EmailAuthProviderEntity {
    return new EmailAuthProviderEntity(
      data.id,
      data.accountId,
      data.providerType,
      data.email,
      data.passwordHash,
      data.createdAt,
      data.updatedAt
    );
  }

  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly providerType: 'email',
    public readonly email: string,
    private readonly _passwordHash: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  getPasswordHash(): string | null {
    return this._passwordHash;
  }
}

export interface AuthProviderEntityData {
  id: string;
  accountId: string;
  providerType: string;
  providerUserId: string | null;
  email: string | null;
  passwordHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthProviderEntity {
  static from(data: AuthProviderEntityData): EmailAuthProviderEntity | null {
    if (data.providerType === 'email') {
      return !data.email
        ? null
        : EmailAuthProviderEntity.from({
            accountId: data.accountId,
            createdAt: data.createdAt,
            email: data.email,
            id: data.id,
            passwordHash: data.passwordHash,
            providerType: data.providerType,
            updatedAt: data.updatedAt,
          });
    }

    return null;
  }

  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly providerType: 'email',
    public readonly providerUserId: string | null,
    public readonly email: string | null,
    public readonly passwordHash: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
