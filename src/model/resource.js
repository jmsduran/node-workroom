/**
 * node-workroom; resource.js
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

 var db = null;

 exports.setDB = function(database) {
      db = database;
 };

 exports.createLinkResource = function(type, sectionid, name, url, content, callback) {
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

exports.updateLinkResource = function(type, id, name, url, content, callback) {
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