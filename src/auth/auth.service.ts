import { BadRequestException, Body, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { User } from "@prisma/client";
import { PrismaService } from "src/user/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserServices } from "src/user/user.services";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService,
                private readonly prisma: PrismaService,
                private readonly userService: UserServices){}

     createToken(user:User){
        return this.jwtService.sign({
            id:user.id,
            name: user.name,
            email: user.email
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: 'login',
            audience: 'users'
        });
    }

     checkToken(token: string){
        try{
            const data =  this.jwtService.verify(token,{
                audience: 'users',
                issuer: 'login'
            })
            return data
        }catch (e){
            throw new BadRequestException(e)
        }
        
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });
        console.log("Login: " + user)
        if(!user){
            throw new UnauthorizedException('Email e/ou senha incorretos')
        }

        return this.createToken(user);
    }

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        });
        if(!user){
            throw new UnauthorizedException('Email e/ou senha incorretos')
        }
        //ENVIAR O EMAIL PARA O USER
        return true
    
    }

    async reset(password: string, token:string){
        //validar o token
        const id = 0;

        const user = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                password,
            },
        })
        return this.createToken(user);
    }


    async register(data: AuthRegisterDTO){
        const UserExistente = await this.UserJaCadastrado(data.email)
/*         console.log(UserExistente)
        console.log(JSON.stringify(UserExistente)) */
        if(UserExistente){
            console.log("entrou if")
            throw new ConflictException("Usuário já existe")
        }
        console.log("PASSOU")
        const user = await this.userService.create(data);

        return this.createToken(user);
        
    }

    async UserJaCadastrado(email: string){
        return await this.prisma.user.findFirst({
            where :{
                email
            }
        })
    }


    

}