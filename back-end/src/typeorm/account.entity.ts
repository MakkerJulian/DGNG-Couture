import { IsEmail, IsIn } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @IsEmail()
  mail: string;

  @Column()
  password: string;

  @Column()
  @IsIn(['research','salaes'])
  role: string;
}
