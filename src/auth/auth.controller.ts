import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserServices } from "src/user/user.services";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly userService: UserServices,
                private readonly authService: AuthService){}


    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        console.log("entrou")
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() Body: AuthRegisterDTO){
        return this.authService.register(Body)

    }
    

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {password, token}:AuthResetDTO){
        return this.authService.reset(password, token)
    }

    @Post('me')
    async me(@Body() Body){
        
        return await this.authService.checkToken(Body.token)
        
    }

}