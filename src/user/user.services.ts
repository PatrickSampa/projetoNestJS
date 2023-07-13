import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { createUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "./prisma/prisma.service";
import { updatePutUserDTO } from "./dto/update-put-user.dto";
import { updatePatchUserDTO } from "./dto/update-patch-user.dto";
import { throwError } from "rxjs";
import * as bcrypt from 'bcrypt'



@Injectable()
export class UserServices{
    constructor(private prisma: PrismaService) {}

    async create({name, email, password}: createUserDTO){
        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);

        return await this.prisma.user.create({
            data:{
                email,
                name,
                password
            },
        })
    }

    async list(){

        return this.prisma.user.findMany();
    }

    async show(id:number){
        if(!(await this.prisma.user.count({
            where:{
                id
            }
        }))){
            throw new  NotFoundException(`O usuário ${id} não existe`)
        }
        
        return this.prisma.user.findUnique({
            where:{
                id,
            },
        })
    }

    async update(id: number, data:updatePutUserDTO){

        if(!(await this.show(id))){
            throw new  NotFoundException(`O usuário ${id} não existe`)
        }
        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }

    async updatePartial(id: number, {email, name, password, role}){

        if(!(await this.show(id))){
            throw new  NotFoundException(`O usuário ${id} não existe`)
        }

        const data: any = {};
        if(email){
            data.email = email;
        }
        if(name){
            data.name = name;
        }
        if(password){
            const salt = await bcrypt.genSalt();

            data.password = await bcrypt.hash(password, salt);
            
        }
        if(role){
            data.role = role
        }

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }

    async delete(id: number){

        if(!(await this.show(id))){
            throw new  NotFoundException(`O usuário ${id} não existe`)
        }


        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }


}