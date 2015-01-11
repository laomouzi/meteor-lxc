(function() {
    var root = this,
        child = Npm.require('child_process'),
        ShortCuts = {
            run: function(command, complete, stdout) { 

                // run command
                var C = child.exec(command, function() {
                    stdout && stdout.apply(this, arguments);
                });

                // exit
                C.on('exit', function(code) {
                    complete(!!code);
                });
            }
        }; 
    
    root.Lxc = {
        create: function(name, template, complete) {
            ShortCuts.run('lxc-create -n ' + name + ' -t' + template, complete);
        },
        destroy: function(name, complete) {
            ShortCuts.run('lxc-destroy -n ' + name, complete);
        },
        start: function(name, complete) {
            ShortCuts.run('lxc-start -n ' + name + ' -d', complete);
        },
        stop: function(name, complete, out) {
            ShortCuts.run('lxc-stop -n ' + name, complete);
        },
        info: function(name, complete) {
            ShortCuts.run('lxc-info -n ' + name, function() {}, function(err, out) {
                var Info= {},
                    output = out.split("\n");
                _.forEach(output, function(key) {
                    var split = key.split(':'),
                        key = split[0];
                    if (!Info[key] && split[1]) {
                        Info[key.toLowerCase()] = split[1].trim();
                    }
                });
                complete && complete(!!err, Info);
            });
        }
    };
}).call(this);
