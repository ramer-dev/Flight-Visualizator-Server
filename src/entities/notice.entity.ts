import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Notice {
    @ApiProperty({example:1})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({example:"제목"})
    @Column()
    title: string;

    @ApiProperty({example:"내용"})
    @Column()
    context: string;

    @ApiProperty({example:"2023-00-00"})
    @Column()
    date:Date;

    @ApiProperty({example:"정기검사"})
    @Column()
    type:string;

    @ApiProperty({example:"1.1.1"})
    @Column()
    version:string;

    @ApiProperty({example:"사용자명"})
    @Column()
    user:string;
    
    @UpdateDateColumn()
    @ApiProperty({example:"2023-00-00"})
    updatedAt:Date;

    @DeleteDateColumn()
    @ApiProperty({example:"2023-00-00"})
    deletedAt:Date;
} 