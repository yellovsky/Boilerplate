import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  ISODate,
  type PermissionPolicy,
  type PermissionPolicyAction,
  permissionPolicyActionSchema,
} from '@repo/api-models';

import type { JSONLike } from 'src/shared/utils/json-like';

import type { PermissionPolicyEntity } from 'src/modules/casbin';

export class PermissionPolicyDto implements JSONLike<PermissionPolicy> {
  @ApiProperty({
    description: 'Permission policy ID',
    example: 'f4d3d5f8-1234-4567-b89e-1234567890ab',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    description: 'Prmission policy action (what is allowed to subject to do with object type)',
    enum: permissionPolicyActionSchema._def.options.map((o) => o._def.value),
  })
  action: PermissionPolicyAction;

  @ApiProperty({
    description: 'Permission policy conditions',
    example: 'r.sub == r.obj.id',
    nullable: true,
    type: String,
  })
  condition: string | null;

  @ApiProperty({
    description: 'Note',
    example: 'User can read own account',
    type: String,
  })
  note: string | null;

  @ApiProperty({
    description: 'Prmission policy object (to what object this permission allows/forbids action)',
    example: 'account',
    type: String,
  })
  objectType: string;

  @ApiProperty({
    description: 'Prmission policy subject (to whom this permission allows/forbids action)',
    example: '123e4567-e89b-12d3-a456-426655440000',
    type: String,
  })
  subject: string;

  @ApiProperty({
    description: 'Created at ISO 8601 formatted date string',
    example: '2023-10-05T14:48:00.000Z',
    format: 'ISO 8601',
    type: String,
  })
  @Transform(ISODate.transformApiProperty)
  createdAt: ISODate;

  @ApiProperty({
    description: 'Updated at ISO 8601 formatted date string',
    example: '2023-10-05T14:48:00.000Z',
    format: 'ISO 8601',
    type: String,
  })
  @Transform(ISODate.transformApiProperty)
  updatedAt: ISODate;

  static fromEntity(entity: PermissionPolicyEntity): PermissionPolicyDto {
    return new PermissionPolicyDto(
      entity.id,
      entity.action,
      entity.condition,
      entity.note,
      entity.objectType,
      entity.subject,
      entity.createdAt,
      entity.updatedAt
    );
  }

  constructor(
    id: string,
    action: PermissionPolicyAction,
    condition: string | null,
    note: string | null,
    objectType: string,
    subject: string,
    createdAt: ISODate,
    updatedAt: ISODate
  ) {
    this.id = id;
    this.action = action;
    this.condition = condition;
    this.note = note;
    this.objectType = objectType;
    this.subject = subject;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
