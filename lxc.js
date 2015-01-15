(function() {
    var root = this,
        Future = Npm.require('fibers/future'),
        Child = Npm.require('child_process'),
        ShortCuts = {
            run: function(command, out) { 
                var fut = new Future(),
                    C = Child.exec(command, function(err, data) {
                        if (out) {
                            fut.return({
                                complete: function(callback) {
                                    var Info = {};
                                    ShortCuts.outputEach(data, function(d) {
                                        var list = d.split(':'),
                                            key = list[0],
                                            val = list[1];
                                        if (!Info[key] && val) {
                                            Info[slugify(key.toLowerCase(), '')] = val.trim();
                                        }
                                    });
                                    callback(Info);
                                }
                            });
                        }
                    });

                // exit
                C.on('exit', function(err) {
                    if (!out) {
                        fut.return({
                            complete: function(callback) {
                                var match = command.match(/-n (.*)/g);
                                callback(!!err, match[0].split(' ')[1]);
                            }
                        });
                    }
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
            return ShortCuts.run('lxc-create -n ' + name + ' -t ' + (template || 'ubuntu'));
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
        clone: function(name, newname) {
            return ShortCuts.run('lxc-clone -o '+ name +' -n ' + newname);
        },
        info: function(name) {
            return ShortCuts.run('lxc-info -n ' + name, true);
        }
    };
}).call(this);
