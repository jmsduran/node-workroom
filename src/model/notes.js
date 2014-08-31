/**
 * node-workroom; notes.js
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

var resource = require("./resource.js");
var db = null;

exports.setDB = function(database) {
     db = database;
     resource.setDB(db);
};

exports.createNote = function(sectionid, name, content, callback) {
     resource.createLinkResource("internal-note", sectionid, name, undefined, content, callback);
};

exports.updateNote = function(id, name, content, callback) {
     resource.updateLinkResource("internal-note", id, name, undefined, content, callback);
};