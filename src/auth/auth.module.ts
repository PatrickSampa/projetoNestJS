import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/user/prisma/prisma.module";
import { AuthService } from "./auth.service";




@Module({
    imports: [JwtModule.register({
        secret: 'oCeo!0pb1Ka1.3!LZx]ZKsLB9hEPKlM<'
    }),
        UserModule,
        PrismaModule],
    controllers: [AuthController],
    providers:[AuthService]
})
export class AuthModule{}