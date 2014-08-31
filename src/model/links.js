/**
 * node-workroom; links.js
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

exports.createLink = function(sectionid, name, url, callback) {
     resource.createLinkResource("external-url", sectionid, name, url, undefined, callback);
};

exports.getLink = function(id, callback) {
     db.find({"links.id": id}, function(err, docs) {
          var data = {};
          var links = docs[0].links;

          for (var i = 0; i < links.length; ++i) {
               if (links[i].id === id) {
                   data = links[i];
                   break;
               }
          }

          callback(data);
     });
};

exports.updateLink = function(id, name, url, callback) {
     resource.updateLinkResource("external-url", id, name, url, undefined, callback);
};

exports.deleteLink = function(linkid, callback) {
     var idarray = linkid.split("-");

     db.update({"_id": idarray[0]}, {"$pull": {"links": {"id": linkid}}}, {},
          function() {
               callback(linkid);
          }
     );
};
