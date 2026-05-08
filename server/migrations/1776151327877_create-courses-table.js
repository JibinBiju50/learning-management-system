/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('courses', {
        id: 'id',
        teacher_id: {
            type: 'integer',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE'
        },
        title: {
            type: 'varchar(255)',
            notNull: true,
        },
        description: {
            type: 'text',
        },
        price: {
            type: 'decimal(10, 2)',
            default: 0.00
        },
        status: {
            type: 'varchar(20)',
            default: 'draft'
        },
        created_at: {
            type: 'timestamp',
            default: pgm.func('NOW()')
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('courses');
};
