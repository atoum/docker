# Configure atoum

Now, let's try to write your first atoum configuration file.

In the previous step, we saw that to tell `atoum` to run a file we **must** use
the `--files` command line argument which translates to the `$script->files()`
method.

Telling atoum to run all the tests in a directory is done via the `--directories`
command line argument.

Given you have a test in `/tests/dummy.php` and some others in `/tests/dummies`,
write the configuration file to run those tests.

When you hit `[ENTER]` you will be prompted with a VIM editor and an empty file
in which you have to write the configurations. Once you close the editor (`:wq`)
atoum will try to run the tests files.
