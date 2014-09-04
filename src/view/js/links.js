/**
 * node-workroom; links.js
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
     window.LINKS = {};

     window.LINKS.configureAddLinkButton = function(sectionid) {
          $("<div/>", {
               "id": sectionid + "-create-link",
               "class": "mini ui default button"
          }).html("Add Link").appendTo("#" + sectionid + "-content");

          $("#" + sectionid + "-create-link").click(function() {
               var html = Handlebars.templates["links/create"]();
               $("<div/>").html(html).appendTo("body");

               $("#create-link-modal").modal("show");

               $("#new-link-actions").html("");
               $("#new-link-name").val("");
               $("#new-link-url").val("");
               $("#new-link-section-id").val(sectionid);

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
                         window.APP.refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-create-link-" + sectionid, function() {
               $("#create-link-modal").modal("hide");
          });
     };

     window.LINKS.configureEditLinkButton = function(linkid, linkName, linkURL) {
          $("<div/>", {
               "id": linkid + "-edit",
               "class": "mini ui default button left-button-spacing"
          }).html("Edit").appendTo("#" + linkid + "-entry-buttons");

          $("#" + linkid + "-edit").click(function() {
               var html = Handlebars.templates["links/edit"]();
               $("<div/>").html(html).appendTo("body");

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
                         "name": $("#edit-link-name").val(),
                         "url": $("#edit-link-url").val()
                    },
                    success: function(result) {
                         $("#edit-link-modal").modal("hide");
                         window.APP.refreshPage();
                    }
               });
          });

          $(document).on("click", "#cancel-edit-" + linkid, function() {
               $("#edit-link-modal").modal("hide");
          });
     };

     window.LINKS.configureDeleteLinkButton = function(linkid, linkName) {
          $("<div/>", {
               "id": linkid + "-delete",
               "class": "mini ui default button"
          }).html("Delete").appendTo("#" + linkid + "-entry-buttons");

          $("#" + linkid + "-delete").click(function() {
               var html = Handlebars.templates["links/delete"]();
               $("<div/>").html(html).appendTo("body");

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
                         window.APP.refreshPage();
                    }
               })
          });

          $(document).on("click", "#cancel-delete-" + linkid, function() {
               $("#delete-link-modal").modal("hide");
          });
     };
});
