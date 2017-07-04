<?php

	/**
	 * Archive
	 *
	 * Copyright 2017 by Oene Tjeerd de Bruin <modx@oetzie.nl>
	 *
	 * Archive is free software; you can redistribute it and/or modify it under
	 * the terms of the GNU General Public License as published by the Free Software
	 * Foundation; either version 2 of the License, or (at your option) any later
	 * version.
	 *
	 * Archive is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License along with
	 * Archive; if not, write to the Free Software Foundation, Inc., 59 Temple Place,
	 * Suite 330, Boston, MA 02111-1307 USA
	 */

	$_lang['archive'] 												= 'Archive';
	$_lang['archive.desc'] 											= 'Manage the archives.';
	
	$_lang['area_archive']											= 'Archive';
	
	$_lang['archive.archiveresource']								= 'Archive page';
	
	$_lang['archive.type']											= 'Archive';
	$_lang['archive.types']											= 'Archives';
	$_lang['archive.types_desc']									= 'Here you can manage all the available archives.';
	$_lang['archive.type_create']									= 'New archive';
	$_lang['archive.type_update']									= 'Update archive';
	$_lang['archive.type_duplicate']								= 'Duplicate archive';
	$_lang['archive.type_remove']									= 'Delete archive';
	$_lang['archive.type_remove_confirm']							= 'Are you sure you want to delete this archive? All child pages with be unlinked.';
	$_lang['archive.types_remove_selected']							= 'Delete selected archives';
	$_lang['archive.types_remove_selected_confirm']					= 'Are you sure you want to delete the selected archives? All child pages with be unlinked.';
	$_lang['archive.type_link_resources']							= 'Pagina\'s koppelen';
	$_lang['archive.type_link_resources_confirm']					= 'Weet je zeker dat je alle onderliggende pagina\'s met de template "[[+template]]" wilt koppelen aan dit archief?';
	$_lang['archive.type_unlink_resources']							= 'Pagina\'s ontkoppelen';
	$_lang['archive.type_unlink_resources_confirm']					= 'Weet je zeker dat je alle onderliggende pagina\'s met de template "[[+template]]" wilt ontkoppelen van dit archief?';
	
	$_lang['archive.resource']										= 'Resource';
	$_lang['archive.resources']										= 'Resources';
	$_lang['archive.resources_desc']								= 'Here you can manage al the child resources.';
	$_lang['archive.resource_show'	]								= 'Show resource';
	$_lang['archive.resource_create']								= 'New resource';
	$_lang['archive.resource_update']								= 'Update resource';
	$_lang['archive.resource_duplicate']							= 'Duplicate resource';
	$_lang['archive.resource_move']									= 'Pagina verplaatsen';
	$_lang['archive.resource_remove']								= 'Delete resource';
	$_lang['archive.resource_remove_confirm']						= 'Are you sure you want to delete this resource?';
	$_lang['archive.resources_remove_selected']						= 'Delete selected resources';
	$_lang['archive.resources_remove_selected_confirm']				= 'Are you sure you want to delete the selected resources?';
	$_lang['archive.resource_recover']								= 'Recover resource';
	$_lang['archive.resource_publish']								= 'Publish resource';
	$_lang['archive.resource_publish_confirm']						= 'Publishing this resource now will remove any (un)publishing dates that may have been set. If you wish to set or keep publish or unpublish dates, please choose to edit the resource instead.<br /><br />Proceed?';
	$_lang['archive.resource_unpublish']							= 'Unpublish resource';
	$_lang['archive.resource_unpublish_confirm']					= 'Un-publishing this resource now will remove any (un)publishing dates that may have been set. If you wish to set or keep publish or unpublish dates, please choose to edit the resource instead. <br /><br />Proceed?';
	
	$_lang['archive.label_type_name']								= 'Name';
	$_lang['archive.label_type_name_desc']							= 'The name of the archive, this can be a lexicon key.';
	$_lang['archive.label_type_description']						= 'Description';
	$_lang['archive.label_type_description_desc']					= 'The description of the archive, this can be a lexicon key.';
	$_lang['archive.label_type_title']								= 'Title';
	$_lang['archive.label_type_title_desc']							= 'The title of the archive, this will been shawn at the page. This can be a lexicon key.';
	$_lang['archive.label_type_position']							= 'Position';
	$_lang['archive.label_type_position_desc']						= 'The position of the archive, this can be "tab" or "content". Default is "tabblad".';
	$_lang['archive.label_type_sort']								= 'Sort';
	$_lang['archive.label_type_sort_desc']							= 'The sort where the pages are sorted at.';
	$_lang['archive.label_type_sort_field']							= 'Sort field';
	$_lang['archive.label_type_sort_field_desc']					= 'The field where the pages are sorted at.';
	$_lang['archive.label_type_sort_dir']							= 'Sort direction';
	$_lang['archive.label_type_sort_dir_desc']						= 'The direction where the pages are sorted at.';
	$_lang['archive.label_type_template']							= 'Template';
	$_lang['archive.label_type_template_desc']						= 'The template of the archive';
	$_lang['archive.label_type_template_child']						= 'Child template';
	$_lang['archive.label_type_template_child_desc']				= 'The child template of the archive.';
	$_lang['archive.label_type_class']								= 'Class key';
	$_lang['archive.label_type_class_desc']							= 'The class key of the archive, default is "ArchiveResource".';
	$_lang['archive.label_type_link_resources']						= 'Link the child pages to this archive.';
	$_lang['archive.label_type_link_resources_desc']				= '';
	
	$_lang['archive.label_resource_title']							= 'Title';
	$_lang['archive.label_resource_title_desc']						= '';
	$_lang['archive.label_resource_published']						= 'Gepubliceerd';
	$_lang['archive.label_resource_published_desc']					= '';
	$_lang['archive.label_resource_publishedon']					= 'Published at';
	$_lang['archive.label_resource_publishedon_desc']				= '';
	$_lang['archive.label_resource_title_duplicate']				= 'New title';
	$_lang['archive.label_resource_title_duplicate_desc']			= 'The new title of the resource.';
	$_lang['archive.label_resource_parent']							= 'Parent resource';
	$_lang['archive.label_resource_parent_desc']					= 'The parent resource\'s ID number.';
	
	$_lang['archive.position_tab']									= 'Tab';
	$_lang['archive.position_content']								= 'Content';
	$_lang['archive.sort_dir_asc']									= 'Ascending ';
	$_lang['archive.sort_dir_desc']									= 'Descending';
	$_lang['archive.sort_field_id']									= 'ID';
	$_lang['archive.sort_field_pagetitle']							= 'Title';
	$_lang['archive.sort_field_longtitle']							= 'Long titel';
	$_lang['archive.sort_field_description']						= 'Description';
	$_lang['archive.sort_field_menuindex']							= 'Menu index';
	$_lang['archive.sort_field_createdon']							= 'Created';
	$_lang['archive.sort_field_editedon']							= 'Edited';
	$_lang['archive.sort_field_publishedon']						= 'Published';
	$_lang['archive.sort_field_deletedon']							= 'Deleted';
	$_lang['archive.sort_field_menutitle']							= 'Menutitel';
	$_lang['archive.archive_error_exists']							= 'There is already an archive for this template.';
	$_lang['archive.resource_error_wrong_parent']					= 'The new parent resource does not have the required template for this resource. Only the resources with the template "[[+template]]" can be a parent resource of this resource.';	
	
?>