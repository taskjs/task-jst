# task-jst
> Compile templates to a JST file.

## The "jst" task

### Usage Examples

```js
var jst = new (require('task-jst'))
jst.run(inputs, options, logger)
```

### Options

#### options.settings
Type: `object`

By default, uses ERB-style template delimiters, change the following template settings to use alternative delimiters.
```
{
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g,
    include      : /<%@([\s\S]+?)%>/g
}
```

## Release History
* 2015-01-06 0.1.0 Initial release.

## License
Copyright (c) 2015 Yuanyan Cao. Licensed under the MIT license.
