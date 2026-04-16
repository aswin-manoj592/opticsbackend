const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'optical_crm'
    });

    const queries = [
        "DESCRIBE sale_item;",
        "DESCRIBE stock;",
        "DESCRIBE sales_order;",
        "DESCRIBE sales_order_item;",
        "DESCRIBE product;"
    ];

    for (const q of queries) {
        console.log(`\n\n--- ${q} ---`);
        const [rows, fields] = await connection.query(q);
        console.table(rows);
    }

    await connection.end();
}

main().catch(console.error);
