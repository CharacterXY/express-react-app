/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreatingDatabaseWebShop1714942744115
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'user_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'user_firstName',
            type: 'character varying',
            length: '50',
          },
          {
            name: 'user_lastName',
            type: 'character varying',
            length: '50',
          },
          {
            name: 'user_password',
            type: 'character varying',
            length: '250',
          },
          {
            name: 'user_createdAt',
            type: 'timestamp',
          },
          {
            name: 'user_isActive',
            type: 'boolean',
          },
          {
            name: 'user_email',
            type: 'character varying',
            length: '50',
          },
          {
            name: 'user_role',
            type: 'character varying',
            length: '50',
          },
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'category_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'category_name',
            type: 'character varying',
            length: '50',
          },
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'product_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'product_title',
            type: 'character varying',
            length: '250',
          },
          {
            name: 'product_description',
            type: 'text',
          },
          {
            name: 'product_rating',
            type: 'numeric',
          },
          {
            name: 'product_code',
            type: 'character varying',
            length: '50',
          },
          {
            name: 'product_stock',
            type: 'integer',
          },
          {
            name: 'product_brend',
            type: 'character varying',
            length: '50',
          },
          {
            name: 'category_id',
            type: 'integer',
          },
          {
            name: 'product_isavailable',
            type: 'boolean',
          },
          {
            name: 'product_atdiscount',
            type: 'boolean',
          },
          {
            name: 'product_discount',
            type: 'integer',
          },
        ],
        /*     foreignKeys: [
                {
                    columnNames: ["category_id"],
                    referencedTableName: "categories",
                    referencedColumnNames: ["category_id"],
                    onDelete: "CASCADE"
                } */
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'cart',
        columns: [
          {
            name: 'cart_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'total',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
        ],
        /*         foreignKeys: [
                {
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["user_id"],
                    onDelete: "CASCADE"
                }
            ] */
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'size',
        columns: [
          {
            name: 'size_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'size_name',
            type: 'character varying',
            length: '50',
          },
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'cart_items',
        columns: [
          {
            name: 'cart_item_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'cart_id',
            type: 'integer',
          },
          {
            name: 'product_id',
            type: 'integer',
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'size_id',
            type: 'integer',
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
        ],
        /*      foreignKeys: [
                {
                    columnNames: ["size_id"],
                    referencedTableName: "size",
                    referencedColumnNames: ["size_id"],
                    onDelete: "CASCADE"
                },
            
                    {
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["product_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["cart_id"],
                        referencedTableName: "cart",
                        referencedColumnNames: ["cart_id"],
                        onDelete: "CASCADE"
                    }
                ] */
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'product_pictures',
        columns: [
          {
            name: 'picture_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'product_id',
            type: 'integer',
          },
          {
            name: 'picture_url',
            type: 'character varying',
            length: '255',
          },
        ],
        /*   foreignKeys: [
                {
                    columnNames: ["product_id"],
                    referencedTableName: "products",
                    referencedColumnNames: ["product_id"],
                    onDelete: "CASCADE"
                }
            ] */
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'product_sizes',
        columns: [
          {
            name: 'product_size_id',
            type: 'serial',
          },
          {
            name: 'product_id',
            type: 'integer',
          },
          {
            name: 'size_id',
            type: 'integer',
          },
          {
            name: 'stock',
            type: 'integer',
          },
        ],
        /*    foreignKeys: [
                {
                    columnNames: ["product_id"],
                    referencedTableName: "product",
                    referencedColumnNames: ["product_id"],
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["size_id"],
                    referencedTableName: "size_id",
                    referencedColumnNames: ["size_id"]
                } */
      }),
      true,
    )

    await queryRunner.createForeignKey(
      'product_sizes',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['product_id'],
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'product_sizes',
      new TableForeignKey({
        columnNames: ['size_id'],
        referencedTableName: 'size',
        referencedColumnNames: ['size_id'],
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'product_pictures',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['product_id'],
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['product_id'],
        onDelete: 'CASCADE',
      }),
    )
    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        columnNames: ['size_id'],
        referencedTableName: 'size',
        referencedColumnNames: ['size_id'],
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        columnNames: ['cart_id'],
        referencedTableName: 'cart',
        referencedColumnNames: ['cart_id'],
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Uklanjanje stranih ključeva za cart_items
    await queryRunner.dropForeignKey('cart_items', 'fk_cart_items_cart_id')
    await queryRunner.dropForeignKey('cart_items', 'fk_cart_items_product_id')
    await queryRunner.dropForeignKey('cart_items', 'fk_cart_items_size_id')

    // Uklanjanje stranih ključeva za product_pictures
    await queryRunner.dropForeignKey(
      'product_pictures',
      'fk_product_pictures_product_id',
    )

    // Uklanjanje stranih ključeva za product_sizes
    await queryRunner.dropForeignKey(
      'product_sizes',
      'fk_product_sizes_product_id',
    )
    await queryRunner.dropForeignKey(
      'product_sizes',
      'fk_product_sizes_size_id',
    )

    // Brisanje tablica
    await queryRunner.dropTable('cart_items')
    await queryRunner.dropTable('product_pictures')
    await queryRunner.dropTable('product_sizes')
    await queryRunner.dropTable('products')
    await queryRunner.dropTable('categories')
    await queryRunner.dropTable('size')
    await queryRunner.dropTable('cart')
    await queryRunner.dropTable('users')
  }
}
