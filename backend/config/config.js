var config = {
    port: 3000,
    site: 'http://localhost/#/',
    
    mongo: {
    hostname: 'localhost',
    port: '27017',
    
    db: 'deltax'
    },
    };
    config.mongo.url = 'mongodb://' + config.mongo.hostname + ':' + config.mongo.port + '/' + config.mongo.db;
    
    module.exports = config;