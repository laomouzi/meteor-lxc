# meteor-lxc
LXC Linux Containers Interface for Meteor Package

## Install

```shell
$ meteor add yasaricli:lxc
```

## Usage

**Create container:**

The simple way *(default template is Ubuntu)*:

```js
Lxc.create('example', 'ubuntu', function(err, name) {
    if (!err) {
        console.log('created ' + name);
    }
});
```

**Start container:**

```js
Lxc.start('example', function(err, name) {
    if (!err) {
        console.log(name + ' started.');
    }
});
```

**Stop container:**

```js
Lxc.stop('example', function(err, name) {
    if (!err) {
        console.log(name + ' stoped.');
    }
});
```

**Destroy container:**

```js
Lxc.destroy('example', function(err, name) {
    if (!err) {
        console.log(name + ' destroyed.');
    }
});
```

**Get container infos:**

```js
Lxc.info('example', function(err, info) { 
    if (!err) {
      console.log(info); // { name: 'example', state: 'RUNNING', pid: '2324', ip: '10.0.3.139' }
    }
});
```

**Clone container:**

```js
Lxc.clone('example', 'example2', function(err, name) { 
    if (!err) {
      console.log('clone and started ' + name);
    }
}, true); // true then clone and start 
```
