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

     var createHeader = function(sectionName, sectionid) {
          $("<h2/>", {
              "id": sectionid + "-header"
          }).html(sectionName).appendTo("#" + sectionid);

          $("<div/>", {
               "id": sectionid + "-delete",
               "class": "mini ui button"
          }).html("Delete").appendTo("#" + sectionid + "-header");

          $("#" + sectionid + "-delete").click(function() {
               $("#delete-section-modal").modal("show");

               $("#delete-section-actions").html("");

               $("<div/>", {
                    "id": "cancel-" + sectionid,
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
               });
          });

          $(document).on("click", "#cancel-" + sectionid, function() {
               $("#delete-section-modal").modal("hide");
          });
     };

     var createLink = function(link, appendTo) {
          $("<a/>", {
               "id": link.id,
               "href": link.url
          }).html(link.name).appendTo(appendTo);
     };

     var createContentSection = function(links, sectionid) {
          $("<div/>", {
               "class": "ui raised segment",
               "id": sectionid + "-content"
          }).appendTo("#" + sectionid);

          $("<ul/>").appendTo("#" + sectionid + "-content");

          for (var j = 0; j < links.length; ++j) {
               var link = links[j];

               $("<li/>", {
                    "id": link.id + "-entry"
               }).appendTo("#" + sectionid + "-content");

               createLink(link, "#" + link.id + "-entry");
          }
     };

     var createSection = function(data) {
          for (var i = 0; i < data.length; ++i) {
               var section = data[i];
               var links = section.links;

               $("<div/>", {
                    "id": section._id
               }).appendTo("#dashboard-content");

               createHeader(section.name, section._id);
               createContentSection(links, section._id);
          }
     };

     var refreshPage = function() {
          $("#dashboard-content").html("");
          $.get("/dashboard/sections/", function(data) {
               createSection(data);
          }, "json");
     };

     $("#new-section").click(function() {
          $("#new-section-modal").modal("show");
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

     refreshPage();
});