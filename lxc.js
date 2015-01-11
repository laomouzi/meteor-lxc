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
        create: function(name, template, complete, out) {
            ShortCuts.run('lxc-create', {
                '-n': name,
                '-t': template
            }, complete, out);
        },
        destroy: function(name, complete, out) {
            ShortCuts.run('lxc-destroy', {
                '-n': name
            }, complete, out);
        },
        start: function(name, complete, out) {
            ShortCuts.run('lxc-start', {
                '-n': name,
                '-d': ' '
            }, complete, out);
        },
        stop: function(name, complete, out) {
            ShortCuts.run('lxc-stop', {
                '-n': name
            }, complete, out);
        },
        info: function(name, complete, out) {
            var output = '';

            // info command run
            ShortCuts.run('lxc-info', { '-n': name }, function() {
                var infoList = output.split("\n"),
                    Info = {};

                // each list
                _.forEach(infoList, function(prop) {
                    var split = prop.split(':'),
                        key = split[0].trim();
                    
                    // add object key: val
                    if (!Info[key] && split[1]) Info[key] = split[1].trim();
                });

                // callback argument info object
                complete(Info);

            }, function(data) { output += data; });
        }
    };
}).call(this);
