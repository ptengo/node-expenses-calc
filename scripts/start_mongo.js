var spawn = require('child_process').spawn;

var globalEntities = require('../entities/global.entities');

var resolve = function resolve(str) {
  return str.replace(/%([^%]+)%/g, function(_,n) {
    return process.env[n];
  });
};

const args = require('minimist')(process.argv.slice(2));
const operativeSystem = args['os'];
if (operativeSystem) {
  if (operativeSystem === globalEntities.operative_system.LINUX) {
    var dbName = 'expcalc';
    var mongoStart = 'service mongod start';
    var eraseDB = `mongo ${dbName} --eval "db.dropDatabase()"`;
    var processList = [mongoStart, eraseDB];
    processList.forEach(el => {
      var prc = spawn(el).on('error', function(err) {throw err});
    
      prc.stdout.setEncoding('utf8');
      prc.stdout.on('data', function (data) {
          console.log(data);
      });
      
      prc.on('close', function (code) {
          console.log('process exit code ' + code);
      });
  
    });
  } else if (operativeSystem === globalEntities.operative_system.WINDOWS){
    var mongoRoute = resolve('%ProgramFiles%\\MongoDB\\Server\\3.6\\bin\\mongod.exe'); //ruta del mongod.exe
    var dbRoute = resolve('%HOMEPATH%\\Documents\\Programming\\mongoDB\\DB'); //ruta on es guardara la base de dades
    
    var prc = spawn(mongoRoute,  ['--dbpath', dbRoute]);
    
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        console.log(data);
    });
    
    prc.on('close', function (code) {
        console.log('process exit code ' + code);
    });
  } else {
    console.error('Introduced operating system not recognized');  
  }
} else {
  console.error('Please introduce operative system as an argument \n Example: npm run mongo -- --os linux');
}

process.on('SIGINT', function(code, signal) {
  prc.kill('SIGINT');
});