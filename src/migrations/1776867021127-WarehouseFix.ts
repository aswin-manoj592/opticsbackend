import { MigrationInterface, QueryRunner } from "typeorm";

export class WarehouseFix1776867021127 implements MigrationInterface {
    name = 'WarehouseFix1776867021127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`barcode\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`brand\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`colour\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`colourCode\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`cost\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`frameType\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`hsnCode\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`lensColour\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`madeBy\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`model\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`modelCode\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`nonStock\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`noOfSticker\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`power\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`productName\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`rate\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`taxGroup\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`warehouseCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`warehouseName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`likes\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`salesman\` ADD \`branchId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`salesman\` DROP COLUMN \`branchId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`likes\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`warehouseName\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`warehouseCode\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`taxGroup\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`rate\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`productName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`power\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`noOfSticker\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`nonStock\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`modelCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`model\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`madeBy\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`lensColour\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`hsnCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`frameType\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`cost\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`colourCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`colour\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`category\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`brand\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`barcode\` varchar(255) NULL`);
    }

}
