(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['links/create'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"create-link-modal\" class=\"ui modal\">\n     <input type=\"hidden\" id=\"new-link-section-id\" value=\"\" />\n     <div class=\"header\">\n          New Link\n     </div>\n     <div class=\"content\">\n          <div class=\"ui form\">\n               <div class=\"field\">\n                    <label for=\"new-link-name\">Name</label>\n                    <input id=\"new-link-name\" type=\"text\" />\n               </div>\n               <div class=\"field\">\n                    <label for=\"new-link-url\">URL</label>\n                    <input id=\"new-link-url\" type=\"text\" />\n               </div>\n          </div>\n     </div>\n     <div id=\"new-link-actions\" class=\"actions\">\n     </div>\n</div>";
  },"useData":true});
templates['links/delete'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"delete-link-modal\" class=\"ui basic modal\">\n     <input type=\"hidden\" id=\"delete-link-id\" value=\"\" />Are you sure you want to delete link <b id=\"delete-link-label\"></b>?\n     <div id=\"delete-link-actions\" class=\"actions\">\n     </div>\n</div>";
  },"useData":true});
templates['links/edit'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"edit-link-modal\" class=\"ui modal\">\n     <input type=\"hidden\" id=\"edit-link-id\" value=\"\" />\n     <div class=\"header\">\n          Edit Link\n     </div>\n     <div class=\"content\">\n          <div class=\"ui form\">\n               <div class=\"field\">\n                    <label for=\"edit-link-name\">Name</label>\n                    <input id=\"edit-link-name\" type=\"text\" />\n               </div>\n               <div class=\"field\">\n                    <label for=\"edit-link-url\">URL</label>\n                    <input id=\"edit-link-url\" type=\"text\" />\n               </div>\n          </div>\n     </div>\n     <div id=\"edit-link-actions\" class=\"actions\">\n     </div>\n</div>";
  },"useData":true});
templates['menu/menu'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"ui menu\">\n     <div class=\"item\">My Workroom</div>\n     <div class=\"right edits item\">\n          <div id=\"edits-button\" class=\"mini ui teal button\">Edit</div>\n     </div>\n     <div class=\"right edits-complete item\">\n          <div id=\"edits-complete-button\" class=\"mini ui teal button\">Done Editing</div>\n     </div>\n     <div class=\"right default item\">\n          <div id=\"new-section\" class=\"mini ui button\">New Section</div>\n     </div>\n</div>";
  },"useData":true});
templates['sections/create'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"new-section-modal\" class=\"ui modal\">\n     <div class=\"header\">\n          New Section\n     </div>\n     <div class=\"content\">\n          <div id=\"new-section-create-form\" class=\"ui form\">\n               <div class=\"field\">\n                    <label for=\"new-section-name\">Name</label>\n                    <input id=\"new-section-name\" name=\"new-section-name\" type=\"text\" />\n               </div>\n          </div>\n     </div>\n     <div class=\"actions\">\n          <div id=\"new-section-cancel\" class=\"ui button\">\n               Cancel\n          </div>\n          <div id=\"new-section-create\" class=\"ui teal submit button\">\n               Create\n          </div>\n     </div>\n</div>";
  },"useData":true});
templates['sections/delete'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"delete-section-modal\" class=\"ui basic modal\">\n     <input type=\"hidden\" id=\"delete-section-id\" value=\"\" />Are you sure you want to delete section <b id=\"delete-section-label\"></b>?\n     <div id=\"delete-section-actions\" class=\"actions\">\n     </div>\n</div>";
  },"useData":true});
templates['sections/edit'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"edit-section-modal\" class=\"ui modal\">\n     <input type=\"hidden\" id=\"edit-section-id\" value=\"\" />\n     <div class=\"header\">\n          Edit Section\n     </div>\n     <div class=\"content\">\n          <div class=\"ui form\">\n               <div class=\"field\">\n                    <label for=\"edit-section-name\">Name</label>\n                    <input id=\"edit-section-name\" type=\"text\" />\n               </div>\n          </div>\n     </div>\n     <div id=\"edit-section-actions\" class=\"actions\">\n     </div>\n</div>";
  },"useData":true});
})();