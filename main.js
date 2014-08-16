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

app.get("/css/dashboard.css", function(request, response) {
     fs.readFile("./client/css/dashboard.css", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/css"});
          response.end(data);
     });
});

app.get("/js/jquery/1.11.1/jquery.min.js", function(request, response) {
     fs.readFile("./client/js/jquery/1.11.1/jquery.min.js", function(err, data) {
          response.writeHead(200, {"Content-Type": "text/javascript"});
          response.end(data);
     });
});

app.get("/js/dashboard.js", function(request, response) {
     fs.readFile("./client/js/dashboard.js", function(err, data) {
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

     var data = {
          "action": "create",
          "datatype": "section",
          "name": name
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Read all via HTTP GET.
app.get("/dashboard/sections/", function(request, response) {
     var data = {
          "action": "get",
          "datatype": "sections"
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Read one via HTTP GET.
app.get("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;

     var data = {
          "action": "get",
          "datatype": "section",
          "id": id
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Update via HTTP POST.
app.post("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;
     var name = request.body.name;

     var data = {
          "action": "update",
          "datatype": "section",
          "id": id,
          "name": name
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Delete one via HTTP DELETE.
app.delete("/dashboard/sections/:sectionid", function(request, response) {
     var id = request.params.sectionid;

     var data = {
          "action": "delete",
          "datatype": "section",
          "id": id
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

/**
 * CRUD REST enpoints for link data. A link can only belong to one section.
 */

// Create via HTTP PUT.
app.put("/dashboard/links/", function(request, response) {
     var sectionid = request.body.sectionid;
     var name = request.body.name;
     var url = request.body.url;

     var data = {
          "action": "create",
          "datatype": "link",
          "sectionid": sectionid,
          "name": name,
          "url": url
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Read one via HTTP GET.
app.get("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;

     var data = {
          "action": "get",
          "datatype": "link",
          "id": id
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Update via HTTP POST.
app.post("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;
     var name = request.body.name;
     var url = request.body.url;

     var data = {
          "action": "update",
          "datatype": "link",
          "id": id,
          "name": name,
          "url": url
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

// Delete one via HTTP DELETE.
app.delete("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;

     var data = {
          "action": "delete",
          "datatype": "link",
          "id": id
     };

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(JSON.stringify(data));
});

app.listen(8080);
