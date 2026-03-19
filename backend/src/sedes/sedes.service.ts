import { Injectable } from '@nestjs/common';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SedesService {
  constructor(private prisma: PrismaService) {}

  create(createSedeDto: CreateSedeDto) {
    return this.prisma.sede.create({ data: createSedeDto });
  }

  findAll() {
    return this.prisma.sede.findMany();
  }

  findOne(id: string) {
    return this.prisma.sede.findUnique({ where: { id } });
  }

  update(id: string, updateSedeDto: UpdateSedeDto) {
    return this.prisma.sede.update({ where: { id }, data: updateSedeDto });
  }

  remove(id: string) {
    return this.prisma.sede.delete({ where: { id } });
  }
}