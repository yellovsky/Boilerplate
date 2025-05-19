export interface ProfileEntityData {
  id: string;
  accountId: string;
  name: string;
  isRoot: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProfileEntity {
  // TODO ResultOrExcluded?
  static from(data: ProfileEntityData): ProfileEntity {
    return new ProfileEntity(data.id, data.accountId, data.name, data.isRoot, data.createdAt, data.updatedAt);
  }

  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly name: string,
    public readonly isRoot: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
