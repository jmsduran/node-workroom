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

var express = require("express");
var fs = require("fs");
var nb = require("nedb");
var app = express();
var bodyparser = require("body-parser");

var db = new nb({filename: "./server/db/appstore.db", autoload: true});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

/**
 * HTML/CSS/JS Resources for the single-page dashboard application.
 */

app.get("/", function(request, response) {
     fs.readFile("./client/html/dashboard.html", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.end(data);
     });
});

app.get("/semantic-ui/css/semantic.min.css", function(request, response) {
     fs.readFile("./client/semantic-ui/css/semantic.min.css", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/css"});
          response.end(data);
     });
});

app.get("/jquery/1.11.1/jquery.min.js", function(request, response) {
     fs.readFile("./client/jquery/1.11.1/jquery.min.js", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/javascript"});
          response.end(data);
     });
});

app.get("/semantic-ui/javascript/semantic.min.js", function(request, response) {
     fs.readFile("./client/semantic-ui/javascript/semantic.min.js", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/javascript"});
          response.end(data);
     });
});

app.get("/app/dashboard.js", function(request, response) {
     fs.readFile("./client/app/dashboard.js", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/javascript"});
          response.end(data);
     });
});

/**
 * CRUD REST endpoints for section data. A section can contain multiple links.
 */

// Create via HTTP PUT.
app.put("/dashboard/sections/", function(request, response) {
     var name = request.body.name;

     db.insert({"name": name, links: [], idcounter: 0}, function(err, newDoc) {
          var data = {
               "status": 200,
               "action": "create",
               "datatype": "section",
               "id": newDoc._id,
               "name": name
          };

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

// Read all via HTTP GET.
app.get("/dashboard/sections/", function(request, response) {
     db.find({}, function(err, docs) {
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(docs));
     });
});

// Read one via HTTP GET.
app.get("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;

    db.find({"_id": id}, function(err, docs) {
          response.writeHead(200, {"Content-Type": "application/json"});

          // Return the first element since only one document will be returned.
          response.end(JSON.stringify(docs[0]));
     });
});

// Update via HTTP POST.
app.post("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;
     var name = request.body.name;

     db.update({"_id": id}, {$set: {"name": name}}, {},
          function(err, numReplaced) {
               var data = {
                    "status": 200,
                    "action": "update",
                    "datatype": "section",
                    "id": id,
                    "name": name
               };

               response.writeHead(200, {"Content-Type": "application/json"});
               response.end(JSON.stringify(data));
          });
});

// Delete one via HTTP DELETE.
app.delete("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;

     db.remove({"_id": id}, {}, function(err, numRemoved) {
          var data = {
               "status": 200,
               "action": "delete",
               "datatype": "section",
               "id": id
          };

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

/**
 * CRUD REST enpoints for link data. A link can only belong to one section.
 */

// Create via HTTP PUT.
app.put("/dashboard/links/", function(request, response) {
     var sectionid = request.body.sectionid;
     var name = request.body.name;
     var url = request.body.url;

     db.find({"_id": sectionid}, function(err, docs) {
          var idcounter = docs[0].idcounter;
          var linkid = sectionid + "-" + idcounter;

          // Create the new link, assigning it a unique id, which is a
          // combination of the parent sections and current id counter value.
          var newlink = {
               "links": {
                    "id": linkid,
                    "name": name,
                    "url": url
               }
          };

          // Increment the link id counter.
          var incrementlink = {
               "idcounter": 1
          };

          // Append the new link into the parent section's links array.
          db.update({"_id": sectionid},
               {
                    "$push": newlink,
                    "$inc": incrementlink
               }, {},
               function() {
                    var data = {
                         "action": "create",
                         "datatype": "link",
                         "id": linkid,
                         "name": name,
                         "url": url
                    };

                    response.writeHead(200,
                         {"Content-Type": "application/json"});
                    response.end(JSON.stringify(data));
               }
          );
     });
});

// Read one via HTTP GET.
app.get("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;

     db.find({"links.id": id}, function(err, docs) {
          var data = {};
          var links = docs[0].links;

          for (var i = 0; i < links.length; ++i) {
               if (links[i].id === id) {
                   data = links[i];
                   break;
               }
          }

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

// Update via HTTP POST.
app.post("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;
     var name = request.body.name;
     var url = request.body.url;
     var idarray = id.split("-");

     // Delete the link.
     db.update({"_id": idarray[0]}, {"$pull": {"links": {"id": id}}}, {},
          function() {
               // Create a new link, which has the same id of the deleted one.
               db.find({"_id": idarray[0]}, function(err, docs) {
                    var linkid = id;

                    // Create the new link, assigning it a unique id, which is a
                    // combination of the parent sections and current id counter value.
                    var newlink = {
                         "links": {
                              "id": linkid,
                              "name": name,
                              "url": url
                         }
                    };

                    // Increment the link id counter.
                    var incrementlink = {
                         "idcounter": 1
                    };

                    // Append the new link into the parent section's links array.
                    db.update({"_id": idarray[0]},
                         {
                              "$push": newlink
                         }, {},
                         function() {
                              var data = {
                                   "action": "update",
                                   "datatype": "link",
                                   "id": linkid,
                                   "name": name,
                                   "url": url
                              };

                              response.writeHead(200,
                                   {"Content-Type": "application/json"});
                              response.end(JSON.stringify(data));
                         }
                    );
               });
          }
     );
});

// Delete one via HTTP DELETE.
app.delete("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;
     var idarray = id.split("-");

     db.update({"_id": idarray[0]}, {"$pull": {"links": {"id": id}}}, {},
          function() {
               var data = {
                    "status": 200,
                    "action": "delete",
                    "datatype": "link",
                    "id": id
               };

               response.writeHead(200, {"Content-Type": "application/json"});
               response.end(JSON.stringify(data));
          }
     );
});

app.listen(8080);
