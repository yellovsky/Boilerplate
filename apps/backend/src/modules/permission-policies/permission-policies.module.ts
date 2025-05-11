import { Module } from '@nestjs/common';

import { CasbinModule } from 'src/modules/casbin';
import { PrismaModule } from 'src/modules/prisma';

import { GetPermissionPoliciesListUseCase } from './application/use-cases/get-permission-policies-list.use-case';
import { PERMISSION_POLICY_ACCESS_CONTROL_SRV } from './domain/interfaces/permission-policies-access.service.interface';
import { PermissionPoliciesAccessControlServiceImpl } from './application/services/permission-policies-access.service';
import { PermissionPoliciesControllerV1 } from './permission-policies.controller-v1';

@Module({
  controllers: [PermissionPoliciesControllerV1],
  imports: [PrismaModule, CasbinModule],
  providers: [
    GetPermissionPoliciesListUseCase,
    {
      provide: PERMISSION_POLICY_ACCESS_CONTROL_SRV,
      useClass: PermissionPoliciesAccessControlServiceImpl,
    },
  ],
})
export class PermissionPoliciesModule {}
