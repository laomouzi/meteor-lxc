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
Lxc.create('example', 'ubuntu', function(err) {
    if (!err) {
        console.log('created example.');
    }
});
```

**Start container:**

```js
Lxc.start('example', function(err) {
    if (!err) {
        console.log('example started.');
    }
});
```

**Stop container:**

```js
Lxc.stop('example', function(err) {
    if (!err) {
        console.log('example stoped.');
    }
});
```

**Destroy container:**

```js
Lxc.destroy('example', function(err) {
    if (!err) {
        console.log('example destroyed.');
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
Lxc.clone('example', 'example2', function(err) { 
    if (!err) {
      console.log('clone and started example2.');
    }
}, true); // true then clone and start 
```
