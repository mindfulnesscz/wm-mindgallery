<?php
/*
Plugin Name: Mindgallery Block
Description: Gutenberg plugin for MindGallery
Author: Petr Mucha
Version: 0.8.5
Author URI: https://www.petrmucha.cz/
*/

$GLOBALS['mindgallery_version'] = '0.8.5';

function mindgallery_block_editor_assets() {

    wp_enqueue_script(
        'mindgallery/block',
        plugins_url("/build/index.js",__FILE__),
        ['wp-blocks', 'wp-editor', 'wp-element'], $GLOBALS['mindgallery_version']
    );
}

add_action('enqueue_block_editor_assets', 'mindgallery_block_editor_assets');

function mindgallery_display_enqueue_script() {
    
    wp_enqueue_script( 'mindgallery/display', plugin_dir_url( "/build/mindgallery.js", __FILE__ ), ['jquery'], $GLOBALS['mindgallery_version'] );
    wp_enqueue_script( 'mindgallery/display_prepare', plugin_dir_url( "/build/display_prepare.js", __FILE__ ), ['mindgallery/display'], $GLOBALS['mindgallery_version']);

}

add_action('wp_enqueue_scripts', 'mindgallery_display_enqueue_script');






