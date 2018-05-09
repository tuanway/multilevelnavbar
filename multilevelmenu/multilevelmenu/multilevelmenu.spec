{
	"name": "multilevelmenu-multilevelmenu",
	"displayName": "multilevelmenu",
	"version": 1,
	"definition": "multilevelmenu/multilevelmenu/multilevelmenu.js",
	"serverscript" : "multilevelmenu/multilevelmenu/multilevelmenu_server.js",
	"libraries": [],
	"model":
	{
		"menu"						: {"type": "MenuItem[]" },
		"brandText"					: {"type": "tagstring", "default": ""},
		"brandIconStyleClass"		: {"type": "styleclass", "default": ""},
		"brandImage"				: {"type": "media", "default": ""},
		"brandImageStyleClass"		: {"type": "styleclass", "default": ""},
		"styleClass"				: {"type": "styleclass" }
	},
	"types": {
		"MenuItem": {
			"itemId"							: {"type": "string"},
			"menuItems"							: {"type": "MenuItem[]" },
			"text"								: {"type": "tagstring"},
			"enabled"							: {"type": "enabled", "default": true},
			"isDivider"							: {"type": "boolean","default": false},
			"styleClass"						: {"type": "styleclass" },
			"iconStyleClass"					: {"type": "styleclass" },
			"imageSrc"							: {"type": "media"},
			"imageStyleClass"					: {"type": "styleclass"}
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