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
                    window.APP.refreshPage();
               }
          });
     });
});