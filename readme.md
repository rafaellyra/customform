customform.js v0.2 beta


A simple class to help customize form elements
_______________________________________________

how it works:
=====================
this class create html customizable elements who dialog with de form elements.
we don't have styles, we just create the elements, you style there.

rules:
=====================
1. all inputs need to have a name attribute.
2. it's good all elements have a wrapper (I personally use a p element), but this

using:
=====================

instance the class in a variable passing a object, this object need to have a selector to a form.
an optional selector for the childs can be passed like the examples on the index page.

properties:
=====================

all custom elements have a id composed by the tagname concatenated with the name of element (separated by a underscore)

selects:
is createad a span with the class select.
when disabled is added a 'disabled' class

inputs checkbox/radio:
is createad a span with the class select.
when clicked is added a 'click' class. (removed on the end of the click);
when checked is added a 'checked' class.