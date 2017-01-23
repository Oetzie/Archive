<?php

	/**
	 * Webshop
	 *
	 * Copyright 2016 by Oene Tjeerd de Bruin <info@oetzie.nl>
	 *
	 * This file is part of Webshop, a real estate property listings component
	 * for MODX Revolution.
	 *
	 * Webshop is free software; you can redistribute it and/or modify it under
	 * the terms of the GNU General Public License as published by the Free Software
	 * Foundation; either version 2 of the License, or (at your option) any later
	 * version.
	 *
	 * Webshop is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License along with
	 * Webshop; if not, write to the Free Software Foundation, Inc., 59 Temple Place,
	 * Suite 330, Boston, MA 02111-1307 USA
	 */

	$_lang['archive'] 												= 'Manager archieven';
	$_lang['archive.desc'] 											= 'Beheer of wijzig manager archieven.';
	
	$_lang['area_archive']											= 'Archief';
	
	$_lang['archive.archiveresource']								= 'Archief pagina';
	
	$_lang['archive.type']											= 'Archief';
	$_lang['archive.types']											= 'Archieven';
	$_lang['archive.types_desc']									= 'Hier kun je alle beschikbare archieven beheren. Een archief kun je toepassen op een pagina die als container functioneert, het zal alle onderliggende pagina\'s van die container verbergen uit de structuur aan de linkerkant.';
	$_lang['archive.type_create']									= 'Nieuw archief';
	$_lang['archive.type_update']									= 'Archief wijzigen';
	$_lang['archive.type_duplicate']								= 'Archief kopiëren';
	$_lang['archive.type_remove']									= 'Archief verwijderen';
	$_lang['archive.type_remove_confirm']							= 'Weet je zeker dat je dit archief wilt verwijderen? Alle onderliggende pagina\'s zullen weer ontkoppeld worden.';
	$_lang['archive.types_remove_selected']							= 'Geselecteerde archieven verwijderen';
	$_lang['archive.types_remove_selected_confirm']					= 'Weet je zeker dat je de geselecteerde archieven wilt verwijderen? Alle onderliggende pagina\'s zullen weer ontkoppeld worden.';
	$_lang['archive.type_link_resources']							= 'Pagina\'s koppelen';
	$_lang['archive.type_link_resources_confirm']					= 'Weet je zeker dat je alle onderliggende pagina\'s met de template "[[+template]]" wilt koppelen aan dit archief?';
	$_lang['archive.type_unlink_resources']							= 'Pagina\'s ontkoppelen';
	$_lang['archive.type_unlink_resources_confirm']					= 'Weet je zeker dat je alle onderliggende pagina\'s met de template "[[+template]]" wilt ontkoppelen van dit archief?';
	
	$_lang['archive.resource']										= 'Pagina';
	$_lang['archive.resources']										= 'Pagina\'s';
	$_lang['archive.resources_desc']								= 'Hier kun je alle onderliggende pagina\'s beheren.';
	$_lang['archive.resource_show'	]								= 'Pagina bekijken';
	$_lang['archive.resource_create']								= 'Nieuwe pagina';
	$_lang['archive.resource_update']								= 'Pagina wijzigen';
	$_lang['archive.resource_duplicate']							= 'Pagina kopiëren';
	$_lang['archive.resource_remove']								= 'Pagina verwijderen';
	$_lang['archive.resource_remove_confirm']						= 'Weet je zeker dat je deze pagina wilt verwijderen?';
	$_lang['archive.resources_remove_selected']						= 'Geselecteerde pagina\'s verwijderen';
	$_lang['archive.resources_remove_selected_confirm']				= 'Weet je zeker dat je de geselecteerde pagina\'s wilt verwijderen?';
	$_lang['archive.resource_recover']								= 'Pagina herstellen';
	$_lang['archive.resource_publish']								= 'Pagina publiceren';
	$_lang['archive.resource_publish_confirm']						= 'De ingestelde (de)publicatiedatums zullen worden verwijderd tijdens het publiceren. Indien je wenst dat deze datums behouden worden, kies er dan voor om de pagina te wijzigen. Weet je zeker dat je deze pagina wilt publiceren?';
	$_lang['archive.resource_unpublish']							= 'Pagina de-publiceren';
	$_lang['archive.resource_unpublish_confirm']					= 'De ingestelde (de)publicatiedatums zullen worden verwijderd tijdens het de-publiceren. Indien je wenst dat deze datums behouden worden, kies er dan voor om de pagina te wijzigen. Weet je zeker dat je deze pagina wilt de-publiceren?';
	
	$_lang['archive.label_type_name']								= 'Naam';
	$_lang['archive.label_type_name_desc']							= 'De naam van het archief, dit kan een lexicon sleutel zijn.';
	$_lang['archive.label_type_description']						= 'Omschrijving';
	$_lang['archive.label_type_description_desc']					= 'De omschrijving van het archief, dit kan een lexicon sleutel zijn.';
	$_lang['archive.label_type_title']								= 'Titel';
	$_lang['archive.label_type_title_desc']							= 'De titel van het archief, deze word op de pagina getoond. Dit kan een lexicon sleutel zijn.';
	$_lang['archive.label_type_position']							= 'Positie';
	$_lang['archive.label_type_position_desc']						= 'De positie van het archief, dit kan "tabblad" of "content" zijn. Standaard is "tabblad".';
	$_lang['archive.label_type_sort']								= 'Sorteer volgorde';
	$_lang['archive.label_type_sort_desc']							= 'De volgorde waar de pagina\'s op gesorteerd moeten worden in het archief.';
	$_lang['archive.label_type_sort_field']							= 'Sorteer veld';
	$_lang['archive.label_type_sort_field_desc']					= 'Het veld waar de pagina\'s op gestoord moeten worden in het archief.';
	$_lang['archive.label_type_sort_dir']							= 'Sorteer volgorde';
	$_lang['archive.label_type_sort_dir_desc']						= 'De volgorde waar de pagina\'s op gesorteerd worden in het archief.';
	$_lang['archive.label_type_template']							= 'Template';
	$_lang['archive.label_type_template_desc']						= 'De template van het archief.';
	$_lang['archive.label_type_template_child']						= 'Onderliggende template';
	$_lang['archive.label_type_template_child_desc']				= 'De onderliggende template van het archief.';
	$_lang['archive.label_type_class']								= 'Pagina klasse';
	$_lang['archive.label_type_class_desc']							= 'De pagina klasse van de het archief, standaard is "ArchiveResource".';
	$_lang['archive.label_type_link_resources']						= 'De onderliggende pagina\'s koppelen aan dit archief.';
	$_lang['archive.label_type_link_resources_desc']				= '';
	
	$_lang['archive.label_resource_title']							= 'Titel';
	$_lang['archive.label_resource_title_desc']						= '';
	$_lang['archive.label_resource_published']						= 'Gepubliceerd';
	$_lang['archive.label_resource_published_desc']					= '';
	$_lang['archive.label_resource_publishedon']					= 'Gepubliceerd op';
	$_lang['archive.label_resource_publishedon_desc']				= '';
	$_lang['archive.label_resource_title_duplicate']				= 'Nieuwe titel';
	$_lang['archive.label_resource_title_duplicate_desc']			= 'De nieuwe titel van de pagina.';
	$_lang['archive.label_resource_parent']							= 'Bovenliggende pagina';
	$_lang['archive.label_resource_parent_desc']					= 'Selecteer de nieuwe bovenliggende pagina, laat dit veld leeg om de huidige bovenliggende pagina te gebruiken.';
	
	$_lang['archive.position_tab']									= 'Tabblad';
	$_lang['archive.position_content']								= 'Content';
	$_lang['archive.sort_dir_asc']									= 'Oplopend';
	$_lang['archive.sort_dir_desc']									= 'Aflopend';
	$_lang['archive.sort_field_id']									= 'ID';
	$_lang['archive.sort_field_pagetitle']							= 'Titel';
	$_lang['archive.sort_field_longtitle']							= 'Lange titel';
	$_lang['archive.sort_field_description']						= 'Omschrijving';
	$_lang['archive.sort_field_menuindex']							= 'Menu volgorde';
	$_lang['archive.sort_field_createdon']							= 'Aanmaakdatum';
	$_lang['archive.sort_field_editedon']							= 'Wijzigingsdatum';
	$_lang['archive.sort_field_publishedon']						= 'Publicatiedatum';
	$_lang['archive.sort_field_deletedon']							= 'Verwijderingsdatum';
	$_lang['archive.sort_field_menutitle']							= 'Menutitel';
	$_lang['archive.archive_error_exists']							= 'Er bestaat al een archief voor deze template.';
		
?>