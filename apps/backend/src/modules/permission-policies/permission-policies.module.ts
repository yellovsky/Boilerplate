import { Module } from '@nestjs/common';

import { CasbinModule } from 'src/modules/casbin';
import { PrismaModule } from 'src/modules/prisma';

import { PERMISSION_POLICY_ACCESS_CONTROL_SRV } from './interfaces/permission-policies-access.service.interface';
import { PermissionPoliciesControllerV1 } from './permission-policies.controller-v1';
import { PermissionPoliciesAccessControlServiceImpl } from './services/permission-policies-access.service';
import { GetPermissionPoliciesListUseCase } from './use-cases/get-permission-policies-list.use-case';

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
