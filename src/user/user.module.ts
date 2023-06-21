import { Module } from "@nestjs/common/decorators/modules";
import { UserController } from "./user.controller";
import { UserServices } from "./user.services";
import { PrismaModule } from "./prisma/prisma.module";


@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserServices],
    exports: []
})



export class UserModule {}