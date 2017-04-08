this["JST"] = this["JST"] || {};

this["JST"]["addList"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p class=\"add-list\">Add a list...</p><form class='add-list-form'><input type=\"text\" placeholder=\"Add a list...\"><input type=\"submit\" value=\"Save\"><a class=\"cancel\"><i class=\"fa fa-close\"></i></a></form>";
},"useData":true});

this["JST"]["cardDetail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-eye\"></i>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"card-label-box "
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + "\"></div>";
},"5":function(container,depth0,helpers,partials,data) {
    return "<div class=\"due-date\"><i class=\"fa fa-calendar\"></i><p>"
    + container.escapeExpression((helpers.format_date || (depth0 && depth0.format_date) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dueDate : depth0),{"name":"format_date","hash":{},"data":data}))
    + "</p><a class=\"remove-date\">Remove</a></div>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comment : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.setDueDate : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.removeDueDate : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cardMove : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<li class=\"activity comment\"><p class=\"comment-desc\">"
    + alias3(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p><p class=\"timestamp\">"
    + alias3((helpers.format_timestamp || (depth0 && depth0.format_timestamp) || alias2).call(alias1,(depth0 != null ? depth0.timestamp : depth0),{"name":"format_timestamp","hash":{},"data":data}))
    + "</p></li>";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<li class=\"activity setDueDate\"><p class=\"action-desc\">The due date was set to "
    + alias3((helpers.format_date || (depth0 && depth0.format_date) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"format_date","hash":{},"data":data}))
    + "</p><p class=\"timestamp\">"
    + alias3((helpers.format_timestamp || (depth0 && depth0.format_timestamp) || alias2).call(alias1,(depth0 != null ? depth0.timestamp : depth0),{"name":"format_timestamp","hash":{},"data":data}))
    + "</p></li>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<li class=\"activity removeDueDate\"><p class=\"action-desc\">The due date was removed</p><p class=\"timestamp\">"
    + container.escapeExpression((helpers.format_timestamp || (depth0 && depth0.format_timestamp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.timestamp : depth0),{"name":"format_timestamp","hash":{},"data":data}))
    + "</p></li>";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"activity cardMove\"><p class=\"action-desc\">this card was moved from <span>"
    + alias4(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from","hash":{},"data":data}) : helper)))
    + "</span> to <span>"
    + alias4(((helper = (helper = helpers.to || (depth0 != null ? depth0.to : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to","hash":{},"data":data}) : helper)))
    + "</span></p><p class=\"timestamp\">"
    + alias4((helpers.format_timestamp || (depth0 && depth0.format_timestamp) || alias2).call(alias1,(depth0 != null ? depth0.timestamp : depth0),{"name":"format_timestamp","hash":{},"data":data}))
    + "</p></li>";
},"16":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-check\"></i>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"detail-header\"><i class=\"fa fa-close close-modal\"></i><div class=\"title-detail\"><i class=\"fa fa-envelope-open\"></i><textarea>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea><div class=\"detail-list-info\"><p class=\"move-list-action\">In list: "
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</p>"
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,(depth0 != null ? depth0.subscribed : depth0),true,{"name":"if_equal","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><div class=\"card-labels\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dueDate : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div><div class=\"detail-main\"><div class=\"label-due\"></div><div class=\"description\"><h4>description</h4><a class=\"edit-description\" href=\"#\">edit</a><p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p><form class=\"open-description\"><textarea>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea><div><input type=\"submit\" value=\"Save\"/><i class=\"fa fa-close description-close\"></i></div></form></div><div class=\"comments\"><h3>Add Comment<i class=\"fa fa-comment-o\"></i></h3><form class=\"add-comment\"><textarea></textarea><input type=\"submit\" class=\"add-comment\" value=\"Send\"/></form></div><div class=\"activity\"><h3>Activity<i class=\"fa fa-newspaper-o\"></i></h3><ul class=\"activities\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li></ul></div></div><div class=\"detail-sidebar\"><div class=\"add-options\"><h3>Add</h3><a class=\"menu-button labels\">Labels<i class=\"fa fa-tag\"></i></a><div id=\"pick-date\"><input type=\"hidden\" id=\"datepicker\"><i class=\"fa fa-calendar\"></i></div></a><h3>Actions</h3><a class=\"menu-button move-list-action\">Move<i class=\"fa fa-arrow-right\"></i></a><a class=\"menu-button copy\">Copy<i class=\"fa fa-clone\"></i></a><a class=\"menu-button subscribe\">Subscribe<i class=\"fa fa-eye\"></i>"
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,(depth0 != null ? depth0.subscribed : depth0),true,{"name":"if_equal","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a><a class=\"archive menu-button\">Archive<i class=\"fa fa-trash\"></i></a></div></div>";
},"useData":true});

this["JST"]["cards"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"card\" position-id="
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "><div class=\"label-icons\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><p>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<i class=\"fa fa-pencil\"></i></p><div class=\"card-icons\">"
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,(depth0 != null ? depth0.subscribed : depth0),true,{"name":"if_equal","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dueDate : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_not_equal || (depth0 && depth0.if_not_equal) || alias2).call(alias1,(depth0 != null ? depth0.commentCount : depth0),0,{"name":"if_not_equal","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></li>";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"label-icon "
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + "\"></div>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-eye\"></i>";
},"6":function(container,depth0,helpers,partials,data) {
    return "<span>"
    + container.escapeExpression((helpers.format_short_date || (depth0 && depth0.format_short_date) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dueDate : depth0),{"name":"format_short_date","hash":{},"data":data}))
    + "</span><i class=\"fa fa-clock-o\"></i>";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span>"
    + container.escapeExpression(((helper = (helper = helpers.commentCount || (depth0 != null ? depth0.commentCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"commentCount","hash":{},"data":data}) : helper)))
    + "</span><i class=\"fa fa-comment-o\"></i>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["copyCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<option>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</option>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<option>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</option>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<i class=\"fa fa-close\"></i><p>Copy Card</p><hr><form><p>Copy to...</p><div class=\"select-div\"><span class=\"label\">Board</span><span class=\"value\">My Board</span><select></select></div><div class=\"select-div list-select\"><span class=\"label\">List</span><span class=\"value\">"
    + alias4(((helper = (helper = helpers.listTitle || (depth0 != null ? depth0.listTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</span><select id=\"select-list\"><option>"
    + alias4(((helper = (helper = helpers.listTitle || (depth0 != null ? depth0.listTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</option>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.lists : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"select-div position-select\"><span class=\"label\">Position</span><span class=\"value\">"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</span><select id=\"select-position\"><option>"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</options>"
    + ((stack1 = (helpers.times || (depth0 && depth0.times) || alias2).call(alias1,0,(depth0 != null ? depth0.max : depth0),{"name":"times","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div id=\"copy-card-title\"><p>Title</p><textarea></textarea><input id=\"submit-move\" type=\"submit\" value=\"Create Card\"></div></form>";
},"useData":true});

this["JST"]["labels"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li><div class=\"label-bar "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "\" data-color=\""
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "\"><p>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p></div><i class=\"fa fa-trash\"></i><i class=\"fa fa-pencil\"></i></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"pick-label\"><i class=\"fa fa-close\"></i><p>Labels</p><hr><input type=\"text\" id=\"label-search\" placeholder=\"Search Labels...\"><ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.AllLabels : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul><a class=\"create-label\" href=\"#\">Create a new label</a></div><div class=\"new-label\"><i class=\"fa fa-arrow-left\"></i><i class=\"fa fa-close\"></i><p>Create Label</p><hr><form><label for=\"label-name\">Name</label><input type=\"text\" id=\"label-name\"><p>Select a color...</p><div class=\"label-colors\"><input type=\"radio\" name=\"label-color\" id=\"color-red\" value=\"red\"><label class=\"red\" for=\"color-red\"></label><input type=\"radio\" name=\"label-color\" id=\"color-orange\" value=\"orange\"><label class=\"orange\" for=\"color-orange\"></label><input type=\"radio\" name=\"label-color\" id=\"color-green\" value=\"green\"><label class=\"green\" for=\"color-green\"></label><input type=\"radio\" name=\"label-color\" id=\"color-blue\" value=\"blue\"><label class=\"blue\" for=\"color-blue\"></label><input type=\"radio\" name=\"label-color\" id=\"color-yellow\" value=\"yellow\"><label class=\"yellow\" for=\"color-yellow\"></label><input type=\"radio\" name=\"label-color\" id=\"color-purple\" value=\"purple\"><label class=\"purple\" for=\"color-purple\"></label><input type=\"radio\" name=\"label-color\" id=\"color-brown\" value=\"brown\"><label class=\"brown\" for=\"color-brown\"></label><input type=\"radio\" name=\"label-color\" id=\"color-cyan\" value=\"cyan\"><label class=\"cyan\" for=\"color-cyan\"></label><input type=\"radio\" name=\"label-color\" id=\"color-teal\" value=\"teal\"><label class=\"teal\" for=\"color-teal\"></label><input type=\"radio\" name=\"label-color\" id=\"color-salmon\" value=\"salmon\"><label class=\"salmon\" for=\"color-salmon\"></label><input type=\"radio\" name=\"label-color\" id=\"color-grey\" value=\"grey\"><label class=\"grey\" for=\"color-grey\"></label></div><input type=\"submit\" value=\"Create\"></form></div>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-eye\"></i>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<div class=\"list-header\"><h3>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3><textarea class=\"edit-title\"></textarea><a class='list-actions-button'>...</a>"
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,(depth0 != null ? depth0.subscribed : depth0),true,{"name":"if_equal","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><form class='add-card-form top'><textarea></textarea><input type=\"submit\" value=\"Save\"><a class=\"cancel\"><i class=\"fa fa-close\"></i></a></form><ul class=\"cards\"></ul><div class=\"add-card\"><p>Add a card...</p><form class='add-card-form bottom'><textarea></textarea><input type=\"submit\" value=\"Save\"><a class=\"cancel\"><i class=\"fa fa-close\"></i></a></form></div>";
},"useData":true});

this["JST"]["listActions"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>List Actions<i class=\"fa fa-close\"></i></p><hr><ul><li class=\"add-card\">Add Card...</li><li class=\"copy\">Copy List...</li><li class=\"subscribe\">Subscribe</li><hr><li class=\"move-all-cards\">Move All Cards in This List</li><li class=\"archive-cards\">Archive All Cards in This List</li><hr><li class=\"archive\">Archive This List</li></ul>";
},"useData":true});

this["JST"]["moveAllCards"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Move All Cards In List<i class=\"fa fa-close\"></i></p><hr><ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.lists : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["JST"]["moveCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<option>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</option>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<option>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</option>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<i class=\"fa fa-close\"></i><p>Move Card</p><hr><form><div class=\"select-div\"><span class=\"label\">Board</span><span class=\"value\">My Board</span><select></select></div><div class=\"select-div list-select\"><span class=\"label\">List</span><span class=\"value\">"
    + alias4(((helper = (helper = helpers.listTitle || (depth0 != null ? depth0.listTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</span><select id=\"select-list\"><option>"
    + alias4(((helper = (helper = helpers.listTitle || (depth0 != null ? depth0.listTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</option>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.lists : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"select-div position-select\"><span class=\"label\">Position</span><span class=\"value\">"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</span><select id=\"select-position\"><option>"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</options>"
    + ((stack1 = (helpers.times || (depth0 && depth0.times) || alias2).call(alias1,0,(depth0 != null ? depth0.max : depth0),{"name":"times","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><input id=\"submit-move\" type=\"submit\" value=\"Move\"></form>";
},"useData":true});

this["JST"]["search"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"search-result\"><a href=\"/list/"
    + alias4(((helper = (helper = helpers.listId || (depth0 != null ? depth0.listId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listId","hash":{},"data":data}) : helper)))
    + "/card/"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\"><div class=\"search-preview\"><p>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p></div></a><div class=\"search-description\"><p>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p><p>In list: <span>"
    + alias4(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listName","hash":{},"data":data}) : helper)))
    + "</span> on My Board</p></div></div>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<p>No cards found...</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h3>Cards</h3>"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});