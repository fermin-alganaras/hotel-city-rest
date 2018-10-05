let config = require('./config');

let smtpTransport = {
      host: "www.nuevohotelcity.com",
      secure: true,
      port: 465,
      auth: {
          user: config.username,
          pass: config.password
      },
      tls: {
        rejectUnauthorized: false
      }
    };

module.exports = smtpTransport;
