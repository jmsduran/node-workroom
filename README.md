node-workroom (v2.0.0)
=============

A Node.js dashboard for the workplace.

![Sample](https://raw.githubusercontent.com/jmsduran/node-workroom/master/img/sample.png)

Running
---

To start the node-workroom app, from the project's root directory run the following command:

```
npm install

node app.js
```

node-workroom uses handlebars templates stored in `src/view/html`. These templates are then pre-compiled into `src/view/js/view.compiled.js` and included within the app's main HTML.

Whenever these templates are modified, the following handlebars command should be run prior to deployment:

```
handlebars src/view/html -e hbs -f src/view/js/view.compiled.js
```

Dependencies
---

[Node.js] (http://nodejs.org/) is required in order to run the node-workroom app, in addition to the following dependencies:

* body-parser (version 1.6.4)
* express (version 4.8.2)
* nedb (version 0.10.7)
* handlebars (version 2.0.0-beta.1)

License
---

Released under the GPL V3 License. Refer to the `LICENSE` file in the project's root directory.