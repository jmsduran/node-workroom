/**
 * node-workroom; dashboard.js
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

$(document).ready(function() {
     var configureEditNoteButton = function(linkid) {
          $("<div/>", {
               "id": linkid + "-edit",
               "class": "mini ui default button left-button-spacing"
          }).html("Edit").appendTo("#" + linkid + "-entry-buttons");

          $("#" + linkid + "-edit").click(function() {
               $("#edit-note-modal").modal("show");

               $("#edit-note-actions").html("");
               $("#edit-note-id").val(linkid);

               $("<div/>", {
                    "id": "cancel-edit-" + linkid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#edit-note-actions");

               $("<div/>", {
                    "id": "edit-" + linkid,
                    "class": "ui teal button"
               }).html("Update").appendTo("#edit-note-actions");

               $.ajax({
                    url: "/dashboard/notes/" + linkid,
                    type: "GET",
                    success: function(data) {
                         $("#edit-note-name").val(data.name);
                         $("#edit-note-content").val(data.content);
                    }
               });
          });

          $(document).on("click", "#edit-" + linkid, function() {
               $.ajax({
                    url: "/dashboard/notes/" + linkid,
                    type: "POST",
                    data: {
                         "noteid": $("#edit-note-id").val(),
                         "name":  $("#edit-note-name").val(),
                         "content": $("#edit-note-content").val()
                    },
                    success: function(result) {
                         $("#edit-note-modal").modal("hide");
                         window.APP.refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-edit-" + linkid, function() {
               $("#edit-note-modal").modal("hide");
          });
     };

     var configureDeleteNoteButton = function(linkid, linkName) {
          $("<div/>", {
               "id": linkid + "-delete",
               "class": "mini ui default button"
          }).html("Delete").appendTo("#" + linkid + "-entry-buttons");

          $("#" + linkid + "-delete").click(function() {
               $("#delete-note-modal").modal("show");

               $("#delete-note-actions").html("");

               $("<div/>", {
                    "id": "cancel-delete-" + linkid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#delete-note-actions");

               $("<div/>", {
                    "id": "delete-" + linkid,
                    "class": "ui red button"
               }).html("Delete").appendTo("#delete-note-actions");

               $("#delete-note-id").val(linkid);
               $("#delete-note-label").html(linkName);
          });

          $(document).on("click", "#delete-" + linkid,function() {
               $.ajax({
                    url: "/dashboard/notes/" + $("#delete-note-id").val(),
                    type: "DELETE",
                    success: function(result) {
                         $("#delete-note-modal").modal("hide");
                         window.APP.refreshPage();
                    }
               })
          });

          $(document).on("click", "#cancel-delete-" + linkid, function() {
               $("#delete-note-modal").modal("hide");
          });
     };

     var configureAddNoteButton = function(sectionid) {
          $("<div/>", {
               "id": sectionid + "-create-note",
               "class": "mini ui default button"
          }).html("Add Note").appendTo("#" + sectionid + "-content");

          $("#" + sectionid + "-create-note").click(function() {
               $("#create-note-modal").modal("show");

               $("#new-note-name").val("");
               $("#new-note-content").val("");
               $("#new-note-section-id").val(sectionid);
               $("#new-note-actions").html("");

               $("<div/>", {
                    "id": "cancel-create-note-" + sectionid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#new-note-actions");

               $("<div/>", {
                    "id": "create-note-" + sectionid,
                    "class": "ui teal button"
               }).html("Add").appendTo("#new-note-actions");

               $("#new-note-section-id").val(sectionid);
          });

          $(document).on("click", "#create-note-" + sectionid, function() {
               $.ajax({
                    url: "/dashboard/notes",
                    type: "PUT",
                    data: {
                         "name": $("#new-note-name").val(),
                         "content": $("#new-note-content").val(),
                         "sectionid": $("#new-note-section-id").val()
                    },
                    success: function() {
                         $("#create-note-modal").modal("hide");
                         window.APP.refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-create-note-" + sectionid, function() {
               $("#create-note-modal").modal("hide");
          });
     };

     var configureViewNoteBehavior = function(noteid, htmlselector) {
          $(htmlselector).click(function(e) {
               e.preventDefault();
               e.stopPropagation();

               $("#view-note-modal").modal("show");

               $("#view-note-name").html("");
               $("#view-note-content").html("");
               $("#view-note-actions").html("");

               $("<div/>", {
                    "id": "cancel-view-note-" + noteid,
                    "class": "ui button"
               }).html("Close").appendTo("#view-note-actions");

               $.ajax({
                    url: "/dashboard/notes/" + noteid,
                    type: "GET",
                    success: function(data) {
                         $("#view-note-header").html(data.name);
                         $("#view-note-content").html(data.content);
                    }
               });
          });

          $(document).on("click", "#cancel-view-note-" + noteid, function() {
               $("#view-note-modal").modal("hide");
          });
     };

     var createHeader = function(sectionName, sectionid) {
          $("<h2/>", {
              "id": sectionid + "-header",
              "class": "ui header"
          }).html(sectionName).appendTo("#" + sectionid + "-content");

          $("<span/>", {
              "id": sectionid + "-header-buttons",
              "style": "display: inline-block;"
          }).appendTo("#" + sectionid + "-header");

          window.SECTIONS.configureEditSectionButton(sectionid, sectionName);
          window.SECTIONS.configureDeleteSectionButton(sectionid, sectionName);
     };

     var createLink = function(link, appendTo) {
          var linkElement = $("<a/>", {
               "id": link.id,
               "href": ((typeof(link.url) !== "undefined") ? link.url : "")
          });

          if (typeof(link.type) === "undefined" || link.type === "external-url") {
               console.log(link.id + ", " + link.name + " is an external-url.");

          } else if (link.type === "internal-note") {
               configureViewNoteBehavior(link.id, linkElement);
               console.log(link.id + ", " + link.name + " is an internal-note.");

          } else {

               console.log(link.id + ", " + link.name + " is an unrecognized link type");
          }

          linkElement.html(link.name).appendTo(appendTo);

          $("<span/>", {
               "id": link.id + "-entry-buttons",
               "style": "display: inline-block;"
          }).appendTo(appendTo);

     };

     var createContentSection = function(links, sectionid, sectionName) {
          $("<div/>", {
               "class": "ui raised teal segment",
               "id": sectionid + "-content"
          }).appendTo("#" + sectionid);

          createHeader(sectionName, sectionid);

          $("<ul/>").appendTo("#" + sectionid + "-content");

          for (var j = 0; j < links.length; ++j) {
               var link = links[j];

               $("<li/>", {
                    "id": link.id + "-entry"
               }).appendTo("#" + sectionid + "-content");

               createLink(link, "#" + link.id + "-entry");

               if (typeof(link.type) === "undefined" || link.type === "external-url") {
                    window.LINKS.configureEditLinkButton(link.id, link.name, link.url);
                    window.LINKS.configureDeleteLinkButton(link.id, link.name);

               } else if (link.type === "internal-note") {
                    configureEditNoteButton(link.id);
                    configureDeleteNoteButton(link.id, link.name);

               } else {
                    console.log("Unrecognized link type encountered in createContentSection().");
               }
          }
     };

     var createSection = function(data) {
          for (var i = 0; i < data.length; ++i) {
               var section = data[i];
               var links = section.links;

               $("<div/>", {
                    "id": section._id,
                    "class": "column"
               }).appendTo("#dashboard-content");

               createContentSection(links, section._id, section.name);
               window.LINKS.configureAddLinkButton(section._id);
               configureAddNoteButton(section._id);
          }
     };

     window.APP = {};
     window.APP.refreshPage = function() {
          $("#dashboard-content").html("");
          $(document).unbind();
          $.get("/dashboard/sections/", function(data) {
               createSection(data);
          }, "json");
     };

     window.APP.refreshPage();
});