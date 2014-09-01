(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['menu/menu'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"ui menu\">\n     <div class=\"item\">My Workroom</div>\n     <div class=\"right edits item\">\n          <div id=\"edits-button\" class=\"mini ui teal button\">Edit</div>\n     </div>\n     <div class=\"right edits-complete item\">\n          <div id=\"edits-complete-button\" class=\"mini ui teal button\">Done Editing</div>\n     </div>\n     <div class=\"right default item\">\n          <div id=\"new-section\" class=\"mini ui button\">New Section</div>\n     </div>\n</div>";
  },"useData":true});
})();