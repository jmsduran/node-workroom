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
var app = express();

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

app.post("/dashboard/sections/create/:sectionid", function(request, response) {
     var sectionid = request.params.sectionid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"create\": \"" + sectionid + "\"}");
});

app.get("/dashboard/sections/read/:sectionid", function(request, response) {
     var sectionid = request.params.sectionid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"read\": \"" + sectionid + "\"}");
});

app.post("/dashboard/sections/update/:sectionid", function(request, response) {
     var sectionid = request.params.sectionid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"update\": \"" + sectionid + "\"}");
});

app.post("/dashboard/sections/delete/:sectionid", function(request, response) {
     var sectionid = request.params.sectionid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"delete\": \"" + sectionid + "\"}");
});

/**
 * CRUD REST enpoints for link data. A link can only belong to one section.
 */

app.post("/dashboard/links/create/:linkid", function(request, response) {
     var linkid = request.params.linkid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"create\": \"" + linkid + "\"}");
});

app.get("/dashboard/links/read/:linkid", function(request, response) {
     var linkid = request.params.linkid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"read\": \"" + linkid + "\"}");
});

app.post("/dashboard/links/update/:linkid", function(request, response) {
     var linkid = request.params.linkid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"update\": \"" + linkid + "\"}");
});

app.post("/dashboard/links/delete/:linkid", function(request, response) {
     var linkid = request.params.linkid;
     response.writeHead(200, {"Content-Type": "application/json"});
     response.end("{\"delete\": \"" + linkid + "\"}");
});

app.listen(8080);
