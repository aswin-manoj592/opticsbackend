import { MigrationInterface, QueryRunner } from "typeorm";

export class WarehouseFix1776867021127 implements MigrationInterface {
    name = 'WarehouseFix1776867021127'

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnsToDrop = [
            'barcode',
            'brand',
            'category',
            'code',
            'colour',
            'colourCode',
            'cost',
            'frameType',
            'hsnCode',
            'lensColour',
            'madeBy',
            'model',
            'modelCode',
            'nonStock',
            'noOfSticker',
            'power',
            'productName',
            'rate',
            'taxGroup'
        ];

        // Drop unwanted columns safely
        for (const column of columnsToDrop) {
            if (await queryRunner.hasColumn("warehouse", column)) {
                await queryRunner.query(
                    `ALTER TABLE \`warehouse\` DROP COLUMN \`${column}\``
                );
            }
        }

        // Add new warehouse columns safely
        if (!await queryRunner.hasColumn("warehouse", "warehouseCode")) {
            await queryRunner.query(
                `ALTER TABLE \`warehouse\` ADD \`warehouseCode\` varchar(255) NOT NULL`
            );
        }

        if (!await queryRunner.hasColumn("warehouse", "warehouseName")) {
            await queryRunner.query(
                `ALTER TABLE \`warehouse\` ADD \`warehouseName\` varchar(255) NOT NULL`
            );
        }

        if (!await queryRunner.hasColumn("warehouse", "location")) {
            await queryRunner.query(
                `ALTER TABLE \`warehouse\` ADD \`location\` varchar(255) NULL`
            );
        }

        // Add likes column to product
        if (!await queryRunner.hasColumn("product", "likes")) {
            await queryRunner.query(
                `ALTER TABLE \`product\` ADD \`likes\` int NOT NULL DEFAULT '0'`
            );
        }

        // Add branchId to salesman
        if (!await queryRunner.hasColumn("salesman", "branchId")) {
            await queryRunner.query(
                `ALTER TABLE \`salesman\` ADD \`branchId\` int NULL`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // Remove branchId safely
        if (await queryRunner.hasColumn("salesman", "branchId")) {
            await queryRunner.query(
                `ALTER TABLE \`salesman\` DROP COLUMN \`branchId\``
            );
        }

        // Remove likes safely
        if (await queryRunner.hasColumn("product", "likes")) {
            await queryRunner.query(
                `ALTER TABLE \`product\` DROP COLUMN \`likes\``
            );
        }

        // Remove warehouse columns safely
        if (await queryRunner.hasColumn("warehouse", "location")) {
            await queryRunner.query(
                `ALTER TABLE \`warehouse\` DROP COLUMN \`location\``
            );
        }

        if (await queryRunner.hasColumn("warehouse", "warehouseName")) {
            await queryRunner.query(
                `ALTER TABLE \`warehouse\` DROP COLUMN \`warehouseName\``
            );
        }

        if (await queryRunner.hasColumn("warehouse", "warehouseCode")) {
            await queryRunner.query(
                `ALTER TABLE \`warehouse\` DROP COLUMN \`warehouseCode\``
            );
        }

        // Restore old warehouse columns safely
        const columnsToAdd = [
            { name: 'taxGroup', type: 'varchar(255) NULL' },
            { name: 'rate', type: 'int NULL' },
            { name: 'productName', type: 'varchar(255) NULL' },
            { name: 'power', type: 'varchar(255) NULL' },
            { name: 'noOfSticker', type: 'int NULL' },
            { name: 'nonStock', type: "tinyint NOT NULL DEFAULT '0'" },
            { name: 'modelCode', type: 'varchar(255) NULL' },
            { name: 'model', type: 'varchar(255) NULL' },
            { name: 'madeBy', type: 'varchar(255) NULL' },
            { name: 'lensColour', type: 'varchar(255) NULL' },
            { name: 'hsnCode', type: 'varchar(255) NULL' },
            { name: 'frameType', type: 'varchar(255) NULL' },
            { name: 'cost', type: 'int NULL' },
            { name: 'colourCode', type: 'varchar(255) NULL' },
            { name: 'colour', type: 'varchar(255) NULL' },
            { name: 'code', type: 'varchar(255) NOT NULL' },
            { name: 'category', type: 'varchar(255) NULL' },
            { name: 'brand', type: 'varchar(255) NULL' },
            { name: 'barcode', type: 'varchar(255) NULL' }
        ];

        for (const col of columnsToAdd) {
            if (!await queryRunner.hasColumn("warehouse", col.name)) {
                await queryRunner.query(
                    `ALTER TABLE \`warehouse\` ADD \`${col.name}\` ${col.type}`
                );
            }
        }
    }
}