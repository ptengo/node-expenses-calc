var spawn = require('child_process').spawn;

var resolve = function resolve(str) {
  return str.replace(/%([^%]+)%/g, function(_,n) {
    return process.env[n];
  });
};

var dbName = 'expcalc';
var mongoStart = 'service mongod start';
var eraseDB = `mongo ${dbName} --eval "db.dropDatabase()"`;
var processList = [mongoStart, eraseDB];
processList.forEach(el => {
  var prc = spawn(el).on('error', function(err) {throw err});
  
  // prc.stdout.setEncoding('utf8');
  // prc.stdout.on('data', function (data) {
  //     console.log(data);
  // });
  
  // prc.on('close', function (code) {
  //     console.log('process exit code ' + code);
  // });

})

process.on('SIGINT', function(code, signal) {
  prc.kill('SIGINT');
});