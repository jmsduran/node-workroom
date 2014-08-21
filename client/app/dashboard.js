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
     var configureEditSectionButton = function(sectionid, sectionName) {
          $("<div/>", {
               "id": sectionid + "-edit",
               "class": "mini ui default button left-button-spacing"
          }).html("Edit").appendTo("#" + sectionid + "-header-buttons");

          $("#" + sectionid + "-edit").click(function() {
               $("#edit-section-modal").modal("show");

               $("#edit-section-actions").html("");

               $("<div/>", {
                    "id": "cancel-edit-" + sectionid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#edit-section-actions");

               $("<div/>", {
                    "id": "edit-" + sectionid,
                    "class": "ui teal button"
               }).html("Update").appendTo("#edit-section-actions");

               $("#edit-section-name").val(sectionName);
               $("#edit-section-id").val(sectionid);
          });

          $(document).on("click", "#edit-" + sectionid, function() {
               $.ajax({
                    url: "/dashboard/sections/" + $("#edit-section-id").val(),
                    type: "POST",
                    data: {
                         "name":  $("#edit-section-name").val()
                    },
                    success: function(result) {
                         $("#edit-section-modal").modal("hide");
                         refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-edit-" + sectionid, function() {
               $("#edit-section-modal").modal("hide");
          });
     };

     var configureDeleteSectionButton = function(sectionid, sectionName) {
          $("<div/>", {
               "id": sectionid + "-delete",
               "class": "mini ui default button"
          }).html("Delete").appendTo("#" + sectionid + "-header-buttons");

          $("#" + sectionid + "-delete").click(function() {
               $("#delete-section-modal").modal("show");

               $("#delete-section-actions").html("");

               $("<div/>", {
                    "id": "cancel-delete-" + sectionid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#delete-section-actions");

               $("<div/>", {
                    "id": "delete-" + sectionid,
                    "class": "ui red button"
               }).html("Delete").appendTo("#delete-section-actions");

               $("#delete-section-id").val(sectionid);
               $("#delete-section-label").html(sectionName);
          });

          $(document).on("click", "#delete-" + sectionid,function() {
               $.ajax({
                    url: "/dashboard/sections/" + $("#delete-section-id").val(),
                    type: "DELETE",
                    success: function(result) {
                         $("#delete-section-modal").modal("hide");
                         refreshPage();
                    }
               })
          });

          $(document).on("click", "#cancel-delete-" + sectionid, function() {
               $("#delete-section-modal").modal("hide");
          });
     };

     var configureEditLinkButton = function(linkid, linkName, linkURL) {
          $("<div/>", {
               "id": linkid + "-edit",
               "class": "mini ui default button left-button-spacing"
          }).html("Edit").appendTo("#" + linkid + "-entry-buttons");

          $("#" + linkid + "-edit").click(function() {
               $("#edit-link-modal").modal("show");

               $("#edit-link-actions").html("");

               $("<div/>", {
                    "id": "cancel-edit-" + linkid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#edit-link-actions");

               $("<div/>", {
                    "id": "edit-" + linkid,
                    "class": "ui teal button"
               }).html("Update").appendTo("#edit-link-actions");

               $("#edit-link-name").val(linkName);
               $("#edit-link-url").val(linkURL);
               $("#edit-link-id").val(linkid);
          });

          $(document).on("click", "#edit-" + linkid, function() {
               $.ajax({
                    url: "/dashboard/links/" + $("#edit-link-id").val(),
                    type: "POST",
                    data: {
                         "name":  $("#edit-link-name").val(),
                         "url": $("#edit-link-url").val()
                    },
                    success: function(result) {
                         $("#edit-link-modal").modal("hide");
                         refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-edit-" + linkid, function() {
               $("#edit-link-modal").modal("hide");
          });
     };

     var configureDeleteLinkButton = function(linkid, linkName) {
          $("<div/>", {
               "id": linkid + "-delete",
               "class": "mini ui default button"
          }).html("Delete").appendTo("#" + linkid + "-entry-buttons");

          $("#" + linkid + "-delete").click(function() {
               $("#delete-link-modal").modal("show");

               $("#delete-link-actions").html("");

               $("<div/>", {
                    "id": "cancel-delete-" + linkid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#delete-link-actions");

               $("<div/>", {
                    "id": "delete-" + linkid,
                    "class": "ui red button"
               }).html("Delete").appendTo("#delete-link-actions");

               $("#delete-link-id").val(linkid);
               $("#delete-link-label").html(linkName);
          });

          $(document).on("click", "#delete-" + linkid,function() {
               $.ajax({
                    url: "/dashboard/links/" + $("#delete-link-id").val(),
                    type: "DELETE",
                    success: function(result) {
                         $("#delete-link-modal").modal("hide");
                         refreshPage();
                    }
               })
          });

          $(document).on("click", "#cancel-delete-" + linkid, function() {
               $("#delete-link-modal").modal("hide");
          });
     };

     var configureAddLinkButton = function(sectionid) {
          $("<div/>", {
               "id": sectionid + "-create-link",
               "class": "mini ui default button"
          }).html("Add Link").appendTo("#" + sectionid + "-content");

          $("#" + sectionid + "-create-link").click(function() {
               $("#create-link-modal").modal("show");

               $("#new-link-actions").html("");
               $("#new-link-name").val("");
               $("#new-link-url").val("");
               $("#new-link-section-id").val(sectionid);

               $("#create-link-actions").html("");

               $("<div/>", {
                    "id": "cancel-create-link-" + sectionid,
                    "class": "ui button"
               }).html("Cancel").appendTo("#new-link-actions");

               $("<div/>", {
                    "id": "create-link-" + sectionid,
                    "class": "ui teal button"
               }).html("Add").appendTo("#new-link-actions");

               $("#new-link-section-id").val(sectionid);
          });

          $(document).on("click", "#create-link-" + sectionid, function() {
               $.ajax({
                    url: "/dashboard/links",
                    type: "PUT",
                    data: {
                         "name": $("#new-link-name").val(),
                         "url": $("#new-link-url").val(),
                         "sectionid": $("#new-link-section-id").val()
                    },
                    success: function() {
                         $("#create-link-modal").modal("hide");
                         refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-create-link-" + sectionid, function() {
               $("#create-link-modal").modal("hide");
          });
     };

     var createHeader = function(sectionName, sectionid) {
          $("<h2/>", {
              "id": sectionid + "-header",
              "class": "ui top attached header"
          }).html(sectionName).appendTo("#" + sectionid);

          $("<span/>", {
              "id": sectionid + "-header-buttons",
              "style": "display: inline-block;"
          }).appendTo("#" + sectionid + "-header");

          configureEditSectionButton(sectionid, sectionName);
          configureDeleteSectionButton(sectionid, sectionName);
     };

     var createLink = function(link, appendTo) {
          $("<a/>", {
               "id": link.id,
               "href": link.url
          }).html(link.name).click(function (e) {
               e.preventDefault();
               e.stopPropagation();
               console.log($(this).attr("href") + " clicked!");
          }).appendTo(appendTo);

          $("<span/>", {
               "id": link.id + "-entry-buttons",
               "style": "display: inline-block;"
          }).appendTo(appendTo);

     };

     var createContentSection = function(links, sectionid) {
          $("<div/>", {
               "class": "ui segment attached",
               "id": sectionid + "-content"
          }).appendTo("#" + sectionid);

          $("<ul/>").appendTo("#" + sectionid + "-content");

          for (var j = 0; j < links.length; ++j) {
               var link = links[j];

               $("<li/>", {
                    "id": link.id + "-entry"
               }).appendTo("#" + sectionid + "-content");

               createLink(link, "#" + link.id + "-entry");
               configureEditLinkButton(link.id, link.name, link.url);
               configureDeleteLinkButton(link.id, link.name);
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

               createHeader(section.name, section._id);
               createContentSection(links, section._id);
               configureAddLinkButton(section._id);
          }
     };

     var refreshPage = function() {
          $("#dashboard-content").html("");
          $(document).unbind();
          $.get("/dashboard/sections/", function(data) {
               createSection(data);
          }, "json");
     };

     $("#new-section").click(function() {
          $("#new-section-modal").modal("show");
          $("#new-section-name").val("");
     });

     $("#new-section-cancel").click(function() {
          $("#new-section-modal").modal("hide");
     });

     $("#new-section-create").click(function() {
          $.ajax({
               url: "/dashboard/sections",
               type: "PUT",
               data: {
                    name: $("#new-section-name").val()
               },
               success: function(result) {
                    refreshPage();
               }
          });
     });

     $("#toggle-visibility-button").click(function() {
          $(".default").toggle();
     });

     refreshPage();
});