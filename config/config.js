module.exports = {
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
    MYSQL_DBNAME: process.env.MYSQL_DBNAME || 'todo4',
    MYSQL_HOST: process.env.MYSQL_HOST || 'host.docker.internal',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306
}