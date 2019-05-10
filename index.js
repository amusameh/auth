const dbConnection = require('./server/database/dbConnection');
const app = require('./server/app');

dbConnection()
  .then((connection) => {
    app.listen(app.get('port'), () => {
      console.log('Listening on prot: ', app.get('port'));
    });
  })
  .catch((err) => {
    debug('fail to connect to db', err);
  });