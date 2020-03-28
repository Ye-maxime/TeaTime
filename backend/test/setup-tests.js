// #测试模式下环境变量
process.env.NODE_ENV='test';
process.env.PORT=4000;

process.env.DB_HOST='localhost';
process.env.DB_NAME='teatime';
process.env.DB_USER_NAME='postgres';
process.env.DB_PWD='root';

process.env.REDIS_HOST='localhost';

process.env.RABBITMQ_CONN_URL='amqp://localhost';