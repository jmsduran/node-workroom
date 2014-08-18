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

     var createHeader = function(sectionName, appendTo) {
          $("<div/>", {
               "class": "header"
          }).html(sectionName).appendTo(appendTo);
     };

     var createLink = function(link, appendTo) {
          $("<a/>", {
               "href": link.url
          }).html(link.name).appendTo(appendTo);
     };

     var createContentSection = function(links, sectionIndex) {
          $("<div/>", {
               "class": "content",
               "id": "content-" + sectionIndex
          }).appendTo("#section-" + sectionIndex);

          $("<ul/>").appendTo("#content-" + sectionIndex);

          for (var j = 0; j < links.length; ++j) {
               var link = links[j];

               $("<li/>", {
                    "id": "section-" + sectionIndex + "-link-" + j
               }).appendTo("#content-" + sectionIndex + " ul");

               createLink(link, "#section-" + sectionIndex + "-link-" + j);
          }
     };

     var createSection = function(data) {
          for (var i = 0; i < data.sections.length; ++i) {
               var section = data.sections[i];
               var links = section.links;

               $("<div/>", {
                    "class": "section",
                    "id": "section-" + i
               }).appendTo("body");

               createHeader(section.name, "#section-" + i);
               createContentSection(links, i);
          }
     };

     $.get("/dashboard/sections/read/all", function(data) {
          createSection(data);
     }, "json");
});