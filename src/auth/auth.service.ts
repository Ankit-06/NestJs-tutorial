import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);

        // save the user in the DB
        let user;
        try {
            user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }

            throw error;
        }

        delete user.hash;

        // return the saved user
        return user;
    }

    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // if user does not exist throw exception

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password);

        // if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect');
        }

        delete user.hash;

        // return the user
        return user;
    }
}
