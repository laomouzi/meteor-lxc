(function() {
    var root = this,
        child = Npm.require('child'),
        ShortCuts = {
            run: function(command, argsObj, complete, out) { 
                var args = '';

                // append args string
                _.each(argsObj, function(val, key) { args += key + ' ' + val + ' ';  });

                // Runn
                child({
                    command: command,
                    args: args.split(' '),
                    cbStdout: function(data) {
                        out && out(''+data, argsObj['-n'], argsObj['-t']);
                    },
                    cbClose : function(exitCode) {
                        complete(!!exitCode, argsObj['-n'], argsObj['-t']);
                    }
                }).start();
            }
        }; 
    
    root.Lxc = {
        create: function(name, template, complete, data) {
            ShortCuts.run('lxc-create', {
                '-n': name,
                '-t': template
            }, complete, data);
        },
        destroy: function(name, complete, data) {
            ShortCuts.run('lxc-destroy', {
                '-n': name
            }, complete, data);
        }
    };
}).call(this);
