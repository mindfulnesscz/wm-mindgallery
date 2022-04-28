<?php
/*
 Plugin Name: WMWP Mindgallery
 Plugin URI: http://www.petrmucha.cz/blog/mindgallery
 Description:Easily display all your WordPress usersname on wordpress website.
 Version: 2.1.1
 Author: Webmajstr
 Author URI: http://www.webmajstr.cz/
 Text Domain: wm_mindgallery
*/


/*  Copyright 2021 Webmajstr

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, please find it at https://www.webmajstr.cz/licenses/wm-mindgallery-license
*/

// If this file is called directly, abort.
if (!defined('WPINC')) {
  die;
}

/**
 * First things first.
 */
define('WM_MINDGALLERY_VERSION', '2.1.1');
define('WM_MINDGALLERY_TEXTDOMAIN', 'wm_mindgallery');

/**
 * The code that runs during plugin activation.
 */
function activate_mindgallery()
{
  require_once plugin_dir_path(__FILE__) . 'includes/class-mindgallery-activator.php';
  Mindgallery_Activator::activate();
}


/**
 * The code that runs during plugin deactivation.
 */
function deactivate_mindgallery()
{
  require_once plugin_dir_path(__FILE__) . 'includes/class-mindgallery-deactivator.php';
  Mindgallery_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_mindgallery');
register_deactivation_hook(__FILE__, 'deactivate_mindgallery');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-mindgallery.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */

function run_mindgallery()
{

  $plugin = new Mindgallery('wm-mindgallery', WM_MINDGALLERY_VERSION, WM_MINDGALLERY_TEXTDOMAIN);
  $plugin->run();
}

run_mindgallery();
