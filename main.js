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
//var notesdb = new nb({filename: "./server/db/notestore.db", autoload: true});

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

var createNote = function(sectionid, name, content, callback) {
     createLinkResource("internal-note", sectionid, name, undefined, content, callback);
};

var createLink = function(sectionid, name, url, callback) {
     createLinkResource("external-url", sectionid, name, url, undefined, callback);
};

var createLinkResource = function(type, sectionid, name, url, content, callback) {
     db.find({"_id": sectionid}, function(err, docs) {
          var idcounter = docs[0].idcounter;
          var linkid = sectionid + "-" + idcounter;

          if (url !== undefined && type === "external-url") {
               // Create the new link, assigning it a unique id, which is a
               // combination of the parent sections and current id counter value.
               var newlink = {
                    "links": {
                         "id": linkid,
                         "type": type,
                         "name": name,
                         "url": url
                    }
               };

          } else if(content !== undefined && type === "internal-note") {
               // Create the new note, assigning it a unique id, which is a
               // combination of the parent sections and current id counter value.
               var newlink = {
                    "links": {
                         "id": linkid,
                         "type": type,
                         "name": name,
                         "content": content
                    }
               };

          } else {
               console.log("createLinkResource() encountered an unrecognized type.");
          }

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
                    callback(linkid);
               }
          );
     });
};

// Create via HTTP PUT.
app.put("/dashboard/links/", function(request, response) {
     var sectionid = request.body.sectionid;
     var name = request.body.name;
     var url = request.body.url;
     var type = "external-url";

     createLink(sectionid, name, url, function(linkid) {
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

var getLink = function(linkid, callback) {
     db.find({"links.id": linkid}, function(err, docs) {
          var data = {};
          var links = docs[0].links;

          for (var i = 0; i < links.length; ++i) {
               if (links[i].id === linkid) {
                   data = links[i];
                   break;
               }
          }

          callback(data);
     });
};

// Read one via HTTP GET.
app.get("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;

     getLink(id, function(data) {
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

var updateLink = function(id, name, url, callback) {
     updateLinkResource("external-url", id, name, url, undefined, callback);
};

var updateNote = function(id, name, content, callback) {
     updateLinkResource("internal-note", id, name, undefined, content, callback);
};

var updateLinkResource = function(type, id, name, url, content, callback) {
     var idarray = id.split("-");

     // Delete the link.
     db.update({"_id": idarray[0]}, {"$pull": {"links": {"id": id}}}, {},
          function() {
               // Create a new link, which has the same id of the deleted one.
               db.find({"_id": idarray[0]}, function(err, docs) {
                    var linkid = id;

                    if (type === "external-url" && url !== undefined) {
                         // Create the new link, assigning it a unique id, which is a
                         // combination of the parent sections and current id counter value.
                         var newlink = {
                              "links": {
                                   "id": linkid,
                                   "type": type,
                                   "name": name,
                                   "url": url
                              }
                         };

                    } else if (type === "internal-note" && content !== undefined) {
                         // Create the new note, assigning it a unique id, which is a
                         // combination of the parent sections and current id counter value.
                         var newlink = {
                              "links": {
                                   "id": linkid,
                                   "type": type,
                                   "name": name,
                                   "content": content
                              }
                         };

                    } else {
                         console.log("Unrecognized link type encountered in updateLinkResource().");
                    }

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
                              callback();
                         }
                    );
               });
          }
     );
};

// Update via HTTP POST.
app.post("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;
     var name = request.body.name;
     var url = request.body.url;
     var type = "external-url";

     updateLink(id, name, url, function() {
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

var deleteLink = function(linkid, callback) {
     var idarray = linkid.split("-");

     db.update({"_id": idarray[0]}, {"$pull": {"links": {"id": linkid}}}, {},
          function() {
               callback(linkid);
          }
     );
};

// Delete one via HTTP DELETE.
app.delete("/dashboard/links/:linkid", function(request, response) {
     var id = request.params.linkid;

     deleteLink(id, function(linkid) {
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
     createNote(sectionid, name, content, function(linkid) {
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

     getLink(noteid, function(data) {
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify(data));
     });
});

app.post("/dashboard/notes/:noteid", function(request, response) {
     var linkid = request.params.noteid;
     var name = request.body.name;
     var content = request.body.content;

     updateNote(linkid, name, content, function() {
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

     deleteLink(noteid, function(linkid) {
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
