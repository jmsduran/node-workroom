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
     window.APP = {};

     window.APP.refreshPage = function() {
          $("#dashboard-content").html("");
          $(document).unbind();
          $.get("/dashboard/sections/", function(data) {
               createSection(data);
          }, "json");
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
               window.NOTES.configureViewNoteBehavior(link.id, linkElement);
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
                    window.NOTES.configureEditNoteButton(link.id);
                    window.NOTES.configureDeleteNoteButton(link.id, link.name);

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
               window.NOTES.configureAddNoteButton(section._id);
          }
     };

     window.APP.refreshPage();
});
