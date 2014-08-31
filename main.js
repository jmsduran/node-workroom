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

var sections = require("./src/model/sections.js");
var links = require("./src/model/links.js");
var notes = require("./src/model/notes.js");

var db = new nb({filename: "./src/model/appstore.db", autoload: true});

sections.setDB(db);
links.setDB(db);
notes.setDB(db);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

/**
 * HTML/CSS/JS Resources for the single-page dashboard application.
 */

app.get("/", function(request, response) {
     fs.readFile("./src/view/html/dashboard.html", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.end(data);
     });
});

app.get("/semantic-ui/css/semantic.min.css", function(request, response) {
     fs.readFile("./src/view/lib/semantic-ui/css/semantic.min.css", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/css"});
          response.end(data);
     });
});

app.get("/jquery/1.11.1/jquery.min.js", function(request, response) {
     fs.readFile("./src/view/lib/jquery/1.11.1/jquery.min.js", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/javascript"});
          response.end(data);
     });
});

app.get("/semantic-ui/javascript/semantic.min.js", function(request, response) {
     fs.readFile("./src/view/lib/semantic-ui/javascript/semantic.min.js", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/javascript"});
          response.end(data);
     });
});

app.get("/app/dashboard.js", function(request, response) {
     fs.readFile("./src/view/js/dashboard.js", function(err, data) {
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

     sections.createSection(name, function(id) {
          var data = {
               "status": 200,
               "action": "create",
               "datatype": "section",
               "id": id,
               "name": name
          };

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

// Read all via HTTP GET.
app.get("/dashboard/sections/", function(request, response) {
     sections.getSections(function(data) {
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

// Read one via HTTP GET.
app.get("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;

     sections.getSection(id, function(data) {
          response.writeHead(200, {"Content-Type": "application/json"});

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

          response.writeHead(200, {"Content-Type": "application/json"});
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

     links.createLink(sectionid, name, url, function(linkid) {
          var data = {
               "action": "create",
               "datatype": "link",
               "id": linkid,
               "name": name,
               "url": url
          };

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

// Read one via HTTP GET.
app.get("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;

     links.getLink(id, function(data) {
          response.writeHead(200, {"Content-Type": "application/json"});
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

          response.writeHead(200, {"Content-Type": "application/json"});
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

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     })
});

/**
 * CRUD REST enpoints for notes data. A note can only belong to one section.
 */

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

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     })
});

app.get("/dashboard/notes/:noteid", function(request, response) {
     var noteid = request.params.noteid;

     links.getLink(noteid, function(data) {
          response.writeHead(200, {"Content-Type": "application/json"});
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

          response.writeHead(200, {"Content-Type": "application/json"});
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

          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

app.listen(8080);
