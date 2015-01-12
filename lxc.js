(function() {
    var root = this,
        child = Npm.require('child_process'),
        ShortCuts = {
            run: function(command, complete, stdout) { 
                var C = child.exec(command, function() {
                        stdout && stdout.apply(this, arguments);
                    }),
                    match = command.match(/-n (.*)/g);

                // exit
                C.on('exit', function(code) {
                    complete(!!code, match[0].split(' ')[1]); // error, name
                });
            },
            outputEach: function(out, callback) {
                var output = out.split("\n");
                _.forEach(output, function(d) {
                    callback(d);
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
                var Info= {};
                ShortCuts.outputEach(out, function(d) {
                    var list = d.split(':'),
                        key = list[0],
                        val = list[1];
                    if (!Info[key] && val) {
                        Info[key.toLowerCase()] = val.trim();
                    }
                });
                complete && complete(!!err, Info);
            });
        },
        clone: function(name, newname, complete, start) {
            var self = this;
            ShortCuts.run('lxc-clone -o '+ name +' -n ' + newname, function(err) {

                // if not error and start then
                if (!err && start) {

                    // start
                    self.start(newname, complete);

                // if error or completed then 
                } else { complete(err); }
            });
        },
        ls: function(complete) {
            ShortCuts.run('lxc-ls --fancy', function() {}, function(err, out) {
                var result = { RUNNING: [], STOPPED: [] };
                if (!err) {
                    ShortCuts.outputEach(out, function(d) {
                        var list = _.compact(d.split(' ')),
                            islabel = list[0] == 'NAME' || list.length === 1;
                        if (!islabel && list.length) {
                            // NAME, STATE, IPV4, IPV6, AUTOSTART
                            result[list[1]].push({
                                name: list[0],
                                state: list[1],
                                ipv4: list[2],
                                ipv6: list[3],
                                autostart: list[4]
                            });
                        }
                    }); 
                    complete(result);
                }
            });
        }
    };
}).call(this);
