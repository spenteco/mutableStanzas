## The Mutable Stanzas

Code and data to generate and run [The Mutable Stanzas](http://montaukedp.com/apps/mutableStanzas/).

The code consists of three parts:

1.  Processes to prepare lines from Faerie Queene, and to repair bogus characters in the source document (extractAdelaide.py, fixCharacters.py).  extractAdelaide.py writes two javascript files which are pulled into the web interface

2.  HTML, CSS, javascript and SVG components which present the interface to the user.  SVG's are the output of a process of manually scaling and cropping images, then converting then to SVG via potrace.

3.  A primitive URL shortener to provide stable URL's to particular states of the interface.
