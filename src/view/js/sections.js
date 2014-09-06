/**
 * node-workroom; sections.js
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
     window.SECTIONS = {};

     window.SECTIONS.configureEditSectionButton = function(sectionid, sectionName) {
          $("<div/>", {
               "id": sectionid + "-edit",
               "class": "mini ui " + window.APP.CONSTANT.EDIT + " button left-button-spacing"
          }).html("Edit").appendTo("#" + sectionid + "-header-buttons");

          $(document).on("click", "#" + sectionid + "-edit", function() {
               var html = Handlebars.templates["sections/edit"]();
               $("<div/>").html(html).appendTo("body");

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
                         "name": $("#edit-section-name").val()
                    },
                    success: function(result) {
                         $("#edit-section-modal").modal("hide");
                         window.APP.refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-edit-" + sectionid, function() {
               $("#edit-section-modal").modal("hide");
          });
     };

     window.SECTIONS.configureDeleteSectionButton = function(sectionid, sectionName) {
          $("<div/>", {
               "id": sectionid + "-delete",
               "class": "mini ui " + window.APP.CONSTANT.EDIT + " button"
          }).html("Delete").appendTo("#" + sectionid + "-header-buttons");

          $("#" + sectionid + "-delete").click(function() {
               var html = Handlebars.templates["sections/delete"]();
               $("<div/>").html(html).appendTo("body");

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

          $(document).on("click", "#delete-" + sectionid, function() {
               $.ajax({
                    url: "/dashboard/sections/" + $("#delete-section-id").val(),
                    type: "DELETE",
                    success: function(result) {
                         $("#delete-section-modal").modal("hide");
                         window.APP.refreshPage();
                    }
               })
          });

          $(document).on("click", "#cancel-delete-" + sectionid, function() {
               $("#delete-section-modal").modal("hide");
          });
     };

     window.SECTIONS.configureSectionClickEvents = function() {
          $(document).on("click", "#new-section", function() {
               var html = Handlebars.templates["sections/create"]();
               $("<div/>").html(html).appendTo("body");

               $("#new-section-modal").modal("show");
               $("#new-section-name").val("");
          });

          $(document).on("click", "#new-section-cancel", function() {
               $("#new-section-modal").modal("hide");
          });

          $(document).on("click", "#new-section-create", function() {
               $.ajax({
                    url: "/dashboard/sections",
                    type: "PUT",
                    data: {
                         name: $("#new-section-name").val()
                    },
                    success: function(result) {
                         window.APP.refreshPage();
                    }
               });
          });
     };

     // Ensures these events are available on page load.
     window.SECTIONS.configureSectionClickEvents();
});
