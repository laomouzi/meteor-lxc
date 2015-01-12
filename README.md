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
      console.log('example destroy.');
  }
});
```
