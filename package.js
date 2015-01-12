Package.describe({
    name: 'yasaricli:lxc',
    summary: 'LXC Linux Containers Interface for meteor',
    version: '0.0.3',
    git: 'https://github.com/yasaricli/meteor-lxc.git'
});

Npm.depends({
    'child': '0.0.2' 
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.2.1');
    api.use('underscore', 'server');
    api.addFiles('lxc.js', 'server');
});
