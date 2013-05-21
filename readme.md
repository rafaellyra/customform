customform.js v0.2 beta


A simple class to help you to customize form elements
_______________________________________________

how it works:
=====================
this class creates customizable html elements that fit with form elements.
we don't have styles, we just create the elements, you style them.

rules:
=====================
1. all inputs need an attribute name.
2. it's better all elements have a wrapper (I personally use a p element), but this

using:
=====================

instance the object passing an object. This object needs a selector to a form.
an optional selector for the childreen can be passed like explained in the examples in the index page.

properties:
=====================

all custom elements have an id composed by the tagname concatenated with the name of the element (separated by a underscore)

selects:
creates a span with the class select.
when disabled, adds a 'disabled' class

inputs checkbox/radio:
creates a span with the class select.
when clicked, adds a 'click' class. (removed on the end of the click);
when checked, adds a 'checked' class.