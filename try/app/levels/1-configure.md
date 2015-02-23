# Configure atoum

Atoum uses a standard PHP file as its main configuration file. This file **should be**
named `.atoum.php` and be available in the current working directory for atoum
to load it automatically.

When running atoum it will search for any `.atoum.php` file in the current working
directory and in all of its parents until the root of the filesystem.

Given you have a tree looking like the following:

```
/
── repositories
    ├── atoum
    │   └── noun
    │       └── .atoum.php
    └── .atoum.php
```

If you run `atoum` in `/repositories/atoum/noun` two configuration files will be
loaded in the following order:

* `/repositories/.atoum.php`
* `/repositories/atoum/noun/.atoum.php`

This allows you to put default configurations in higher level directories while
keeping specific porject configuration file clear.

Inside each of your configuration file you will have access to two variables:

* `$script` an instanceof [mageekguy\atoum\configurator](https://github.com/atoum/atoum/blob/master/classes/configurator.php)
* `$runner` an instanceof [mageekguy\atoum\runner](https://github.com/atoum/atoum/blob/master/classes/runner.php)

## `$script`

Through this variable you will be able to configure `atoum` just like you would have
done using command line arguments.

For example, to run a specific test file using command line arguments, you would run `atoum -f /path/to/test.php`.
Through `$script` you will do `$script->files(array('/path/to/test.php'));`. It's easy to guess the `$script` method to call
from its CLI argument counterpart : simply take the long argument name and remove every dash (`-`) from it.

## `$runner`

Through this variable you will be able to configure `atoum` internals. For example, if you want to add
a new report (there are of them available) or enable an extension you will do it through `$runner`.
