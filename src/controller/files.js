/**
 * node-workroom; files.js
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

var fs = require("fs");

module.exports = function(app) {
     app.get("/", function(request, response) {
          fs.readFile("./src/view/html/dashboard.html", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/html"
               });
               response.end(data);
          });
     });

     app.get("/semantic-ui/css/semantic.min.css", function(request, response) {
          fs.readFile("./src/view/lib/semantic-ui/css/semantic.min.css", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/css"
               });
               response.end(data);
          });
     });

     app.get("/jquery/1.11.1/jquery.min.js", function(request, response) {
          fs.readFile("./src/view/lib/jquery/1.11.1/jquery.min.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/handlebars/2.0.0/handlebars.runtime.js", function(request, response) {
          fs.readFile("./node_modules/handlebars/dist/handlebars.runtime.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/semantic-ui/javascript/semantic.min.js", function(request, response) {
          fs.readFile("./src/view/lib/semantic-ui/javascript/semantic.min.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/app/dashboard.js", function(request, response) {
          fs.readFile("./src/view/js/dashboard.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/app/menu.js", function(request, response) {
          fs.readFile("./src/view/js/menu.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/app/sections.js", function(request, response) {
          fs.readFile("./src/view/js/sections.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/app/links.js", function(request, response) {
          fs.readFile("./src/view/js/links.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/app/notes.js", function(request, response) {
          fs.readFile("./src/view/js/notes.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });

     app.get("/app/view.compiled.js", function(request, response) {
          fs.readFile("./src/view/js/view.compiled.js", function(err, data) {
               response.writeHead(200, {
                    "Content-Type": "text/javascript"
               });
               response.end(data);
          });
     });
};
