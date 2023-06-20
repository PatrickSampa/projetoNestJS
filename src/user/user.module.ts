import { Module } from "@nestjs/common/decorators/modules";
import { UserController } from "./user.controller";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [],
    exports: []
})



export class UserModule {}