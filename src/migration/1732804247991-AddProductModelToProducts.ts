import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductModelToProducts1732804247991 implements MigrationInterface {
    name = 'AddProductModelToProducts1732804247991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "product_model" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_model"`);
    }

}
