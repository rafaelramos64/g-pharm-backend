module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'pguser',
  password: 'pgpassword',
  database: 'g-pharm',
  define: {
    timestamps: true,
    underscored: true
  }
}
