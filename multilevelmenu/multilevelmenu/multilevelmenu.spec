{
	"name": "multilevelmenu-multilevelmenu",
	"displayName": "multilevelmenu",
	"version": 1,
	"definition": "multilevelmenu/multilevelmenu/multilevelmenu.js",
	"serverscript" : "multilevelmenu/multilevelmenu/multilevelmenu_server.js",
	"libraries": [],
	"model":
	{
		"menu"						: { "type": "MenuItem[]" },
		"brandText"					: {"type": "tagstring", "default": ""}
	},
	"types": {
		"MenuItem": {
			"itemId"							: {"type": "string"},
			"menuItems"							: {"type": "MenuItem[]" },
			"text"								: {"type": "tagstring"},
			"enabled"							: {"type": "enabled", "default": true}
		}
	},
	"handlers":
	{
	        "onMenuItemSelected" 		: {
										        "parameters" : [
										        	{ "name" : "menuItemId", "type" : "object" },
										            { "name" : "event", "type" : "JSEvent" }
										        ],
										        "returns" : "boolean"
										  }
	},	
	"api":
	{		
		"setRootMenuItems": 
		{
			"parameters": 
			[
				{	"name": "menuItems",	"type": "MenuItem[]" }
			]
		}}
	
}