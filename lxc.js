(function() {
    var root = this,
        Future = Npm.require('fibers/future'),
        Child = Npm.require('child_process'),
        ShortCuts = {
            run: function(command, callback) { 
                var fut = new Future(),
                    C = Child.exec(command, function(err, data) {
                        callback && callback(data);
                    });

                // exit
                C.on('exit', function(err) {
                    fut.return({
                        complete: function(callback) {
                            var match = command.match(/-n (.*)/g);
                            callback(!!err, match[0].split(' ')[1]);
                        }
                    });
                });
                return fut.wait();
            },
            outputEach: function(out, callback) {
                var output = out.split("\n");
                _.forEach(output, function(d) {
                    callback(d);
                });
            }
        }; 

    root.Lxc = {
        create: function(name, template) {
            return ShortCuts.run('lxc-create -n ' + name + ' -t' + (template || 'ubuntu'));
        },
        destroy: function(name) {
            return ShortCuts.run('lxc-destroy -n ' + name);
        },
        start: function(name) {
            return ShortCuts.run('lxc-start -n ' + name + ' -d');
        },
        stop: function(name) {
            return ShortCuts.run('lxc-stop -n ' + name);
        },
        info: function(name, complete) {
            ShortCuts.run('lxc-info -n ' + name, function(out) {
                var Info= {};
                ShortCuts.outputEach(out, function(d) {
                    var list = d.split(':'),
                        key = list[0],
                        val = list[1];
                    if (!Info[key] && val) {
                        Info[key.toLowerCase()] = val.trim();
                    }
                });
                complete && complete(Info);
            });
        },
        clone: function(name, newname) {
            return ShortCuts.run('lxc-clone -o '+ name +' -n ' + newname);
        },
        ls: function(complete) {
            ShortCuts.run('lxc-ls --fancy', function(out) {
                var result = { RUNNING: [], STOPPED: [] };
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
            });
        }
    };
}).call(this);
