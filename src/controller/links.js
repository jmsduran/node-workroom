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

var links = require("../model/links.js");

module.exports = function(app, db) {
     links.setDB(db);

     // Create via HTTP PUT.
     app.put("/dashboard/links/", function(request, response) {
          var sectionid = request.body.sectionid;
          var name = request.body.name;
          var url = request.body.url;

          links.createLink(sectionid, name, url, function(linkid) {
               var data = {
                    "action": "create",
                    "datatype": "link",
                    "id": linkid,
                    "name": name,
                    "url": url
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     // Read one via HTTP GET.
     app.get("/dashboard/links/:linkid", function(request, response) {
          var id = request.params.linkid;

          links.getLink(id, function(data) {
               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     // Update via HTTP POST.
     app.post("/dashboard/links/:linkid", function(request, response) {
          var id = request.params.linkid;
          var name = request.body.name;
          var url = request.body.url;

          links.updateLink(id, name, url, function() {
               var data = {
                    "status": 200,
                    "action": "update",
                    "datatype": "link",
                    "id": id,
                    "name": name,
                    "url": url
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          });
     });

     // Delete one via HTTP DELETE.
     app.delete("/dashboard/links/:linkid", function(request, response) {
          var id = request.params.linkid;

          links.deleteLink(id, function(linkid) {
               var data = {
                    "status": 200,
                    "action": "delete",
                    "datatype": "link",
                    "id": linkid
               };

               response.writeHead(200, {
                    "Content-Type": "application/json"
               });
               response.end(JSON.stringify(data));
          })
     });
};