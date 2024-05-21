import { MigrationInterface, QueryRunner } from "typeorm";

export class Account1716301328101 implements MigrationInterface {
    name = 'Account1716301328101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "mail" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_31e2fd7720a2da3af586f17778f" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
