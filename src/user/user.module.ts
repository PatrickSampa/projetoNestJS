import { Module } from "@nestjs/common/decorators/modules";
import { UserController } from "./user.controller";
import { UserServices } from "./user.services";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { forwardRef } from '@nestjs/common'

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserServices],
    exports: [UserServices]
})



export class UserModule {}