/**
 * node-workroom; sections.js
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

var sections = require("../model/sections.js");

module.exports = function(app, db) {
     sections.setDB(db);

     // Create via HTTP PUT.
     app.put("/dashboard/sections/", function(request, response) {
          var name = request.body.name;

          sections.createSection(name, function(id) {
               var data = {
                    "status": 200,
                    "action": "create",
                    "datatype": "section",
                    "id": id,
                    "name": name
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     // Read all via HTTP GET.
     app.get("/dashboard/sections/", function(request, response) {
          sections.getSections(function(data) {
               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     // Read one via HTTP GET.
     app.get("/dashboard/sections/:sectionid", function(request, response) {
          var id = request.params.sectionid;

          sections.getSection(id, function(data) {
               response.writeHead(200, {
                    "Content-Type": "application/json"
               });

               // Return the first element since only one document will be returned.
               response.end(JSON.stringify(data));
          });
     });

     // Update via HTTP POST.
     app.post("/dashboard/sections/:sectionid", function(request, response) {
          var id = request.params.sectionid;
          var name = request.body.name;

          sections.updateSection(id, name, function() {
               var data = {
                    "status": 200,
                    "action": "update",
                    "datatype": "section",
                    "id": id,
                    "name": name
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     // Delete one via HTTP DELETE.
     app.delete("/dashboard/sections/:sectionid", function(request, response) {
          var id = request.params.sectionid;

          sections.deleteSection(id, function() {
               var data = {
                    "status": 200,
                    "action": "delete",
                    "datatype": "section",
                    "id": id
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });
};