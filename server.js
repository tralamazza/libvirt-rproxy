var argv = require('optimist').argv;

var virsh = require('child_process').spawn('virsh', [ '-c', argv.c || 'lxc://', 'list']);

virsh.stdout.on('data', function(data) {
  var matches = data.toString().match(/\d+\s+\S+\s+[^\n]+/gm);
  if (!matches)
    return console.log('No libvirt domains found');

  var domains = matches.map(function(line) { 
    var domain = line.split(/\s+/);
    return domain[1];
  });
  var hostname = argv.h || require('os').hostname();
  var port = argv.p || 80;
  var options = { router: { } };

  domains.forEach(function(dom) {
    var from = dom.replace('.', '-') + '.' + hostname;
    options.router[from] = dom;
  });

  console.log('Starting reverse proxy on', hostname, 'port', port);
  console.log('Routing table:', options.router);

  require('http-proxy').createServer(options).listen(port);
});
