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

var notes = require("../model/notes.js");
var links = require("../model/links.js");

module.exports = function(app, db) {
     notes.setDB(db);
     links.setDB(db);

     app.put("/dashboard/notes/", function(request, response) {
          var sectionid = request.body.sectionid;
          var name = request.body.name;
          var content = request.body.content;

          // Create the link for the note.
          notes.createNote(sectionid, name, content, function(linkid) {
               var data = {
                    "status": 200,
                    "action": "create",
                    "datatype": "note",
                    "id": linkid
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          })
     });

     app.get("/dashboard/notes/:noteid", function(request, response) {
          var noteid = request.params.noteid;

          links.getLink(noteid, function(data) {
               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     app.post("/dashboard/notes/:noteid", function(request, response) {
          var linkid = request.params.noteid;
          var name = request.body.name;
          var content = request.body.content;

          notes.updateNote(linkid, name, content, function() {
               var data = {
                    "status": 200,
                    "action": "update",
                    "datatype": "note",
                    "id": linkid,
                    "name": name
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     app.delete("/dashboard/notes/:noteid", function(request, response) {
          var noteid = request.params.noteid;

          links.deleteLink(noteid, function(linkid) {
               var data = {
                    "status": 200,
                    "action": "delete",
                    "datatype": "note",
                    "id": linkid
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });
};