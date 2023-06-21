import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { createUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "./prisma/prisma.service";
import { updatePutUserDTO } from "./dto/update-put-user.dto";
import { updatePatchUserDTO } from "./dto/update-patch-user.dto";
import { throwError } from "rxjs";


@Injectable()
export class UserServices{
    constructor(private prisma: PrismaService) {}

    async create({name, email, password}: createUserDTO){
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


        return this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }

    async updatePartial(id: number, data:updatePatchUserDTO){

        if(!(await this.show(id))){
            throw new  NotFoundException(`O usuário ${id} não existe`)
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