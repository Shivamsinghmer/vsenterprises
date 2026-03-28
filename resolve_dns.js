const dns = require('dns');
const fs = require('fs');
dns.setServers(['8.8.8.8']); // use google dns just in case

dns.resolveTxt('vsenterprises.40wbgct.mongodb.net', (err, records) => {
  dns.resolveSrv('_mongodb._tcp.vsenterprises.40wbgct.mongodb.net', (err2, addresses) => {
    fs.writeFileSync('dns_results.json', JSON.stringify({txt: records, srv: addresses}, null, 2));
  });
});

