Package.describe({
    name: 'yasaricli:lxc',
    summary: 'LXC Linux Containers Interface for meteor',
    version: '0.0.7',
    git: 'https://github.com/yasaricli/meteor-lxc.git'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.2.1');
    api.use(['underscore', 'yasaricli:slugify'], 'server');
    api.addFiles('lxc.js', 'server');
});
