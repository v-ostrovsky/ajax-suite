define([ './application/@dir', './button/@dir', './buttonFile/@dir', './buttonToggle/@dir', './control/@dir', './dropdown/@dir', './entry/@dir', './field/@dir', './form/@dir', './input/@dir', './label/@dir', './list/@dir', './panel/@dir', './radio/@dir', './router/@dir', './select/@dir', './table/@dir', './tableEntry/@dir', './tableHandle/@dir', './tableHeader/@dir', './tableHeaderField/@dir',
		'./tableList/@dir', './tableListEntry/@dir', './tableListField/@dir', './tableListFooter/@dir', './tableListHeader/@dir', './tableListHeaderField/@dir', './tableTreeEntry/@dir', './tabs/@dir', './tree/@dir', './treeBranch/@dir' ],
		function(application, button, buttonFile, buttonToggle, control, dropdown, entry, field, form, input, label, list, panel, radio, router, select, table, tableEntry, tableHandle, tableHeader, tableHeaderField, tableList, tableListEntry, tableListField, tableListFooter, tableListHeader, tableListHeaderField, tableTreeEntry, tabs, tree, treeBranch) {
			"use strict";

			/*
			 * ------------- UTILITIES --------------
			 */
			function bindBuilder(name, builder, properties) {
				return function(context) {
					return builder(context, name, properties || {});
				};
			}

			return {
				bindBuilder : bindBuilder,
				application : application,
				button : button,
				buttonFile : buttonFile,
				buttonToggle : buttonToggle,
				control : control,
				dropdown : dropdown,
				entry : entry,
				field : field,
				form : form,
				input : input,
				label : label,
				list : list,
				panel : panel,
				radio : radio,
				router : router,
				select : select,
				table : table,
				tableEntry : tableEntry,
				tableHandle : tableHandle,
				tableHeader : tableHeader,
				tableHeaderField : tableHeaderField,
				tableList : tableList,
				tableListEntry : tableListEntry,
				tableListField : tableListField,
				tableListFooter : tableListFooter,
				tableListHeader : tableListHeader,
				tableListHeaderField : tableListHeaderField,
				tableTreeEntry : tableTreeEntry,
				tabs : tabs,
				tree : tree,
				treeBranch : treeBranch
			};
		});