import { MigrationInterface, QueryRunner } from "typeorm";

export class Uniquemail1719147381339 implements MigrationInterface {
    name = 'Uniquemail1719147381339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_c0ef527349a6916330d3d3ec2a3" UNIQUE ("mail")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_c0ef527349a6916330d3d3ec2a3"`);
    }

}
