# Your first test

Before writing your first test you will have to know some things.

atoum will help you test **classes** through theirs **public methods**. Each test **must** have a class counterpart: atoum
will try to automatically find this class based on the tested class fully-qualified name.

For example, if you want to test the `atoum\trying\dummy` class you will have to write you test in the `atoum\trying\tests\units\dummy`
class. atoum requires you to put your test classes in the `tests\units` namespace. If you put your test in `tests\units\atoum\trying\dummy`
it will also work.

In this test class, you **must** implement test methods. Their name **must** begin with `test`. This is the only thing resuired.
You can choose whatever you want after the `test` word.

When you hit `[ENTER]` you will be prompted with a VIM editor and an empty file
in which you have to write the class for the test to pass. Once you close the editor (`:wq`)
atoum will try to run the tests files.
