import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'web_shop',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migration/*.ts'],
})
