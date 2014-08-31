/**
 * node-workroom; main.js
 * A Node.js dashboard for the workplace.
 * Copyright (C) 2014 James M. Duran
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var bodyparser = require("body-parser");
var express = require("express");
var nb = require("nedb");
var app = express();

var db = new nb({filename: "./src/model/appstore.db", autoload: true});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

/**
 * HTML/CSS/JS Resources for the single-page dashboard application.
 */

require("./src/controller/files.js")(app);

/**
 * CRUD REST endpoints for section data. A section can contain multiple links.
 */

require("./src/controller/sections.js")(app, db);

/**
 * CRUD REST enpoints for link data. A link can only belong to one section.
 */

require("./src/controller/links.js")(app, db);

/**
 * CRUD REST enpoints for notes data. A note can only belong to one section.
 */

require("./src/controller/notes.js")(app, db);

app.listen(8080);
