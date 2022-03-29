<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://petrmucha.cz/
 * @since      1.9.0
 *
 * @package    Mindgallery
 * @subpackage Mindgallery/includes
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Mindgallery
 * @subpackage Mindgallery/public
 * @author     Mindgallery <mail@petrmucha.cz>
 */
class Mindgallery_Public
{

  /**
   * The ID of this plugin.
   *
   * @since    1.9.0
   * @access   private
   * @var      string    $plugin_name    The ID of this plugin.
   */
  private $plugin_name;

  /**
   * The version of this plugin.
   *
   * @since    1.9.0
   * @access   private
   * @var      string    $version    The current version of this plugin.
   */
  private $version;

  /**
   * The version of this plugin.
   *
   * @since    1.9.1
   * @access   private
   * @var      int    $version    The current version of this plugin.
   */
  private $instance_id;


  /**
   * Initialize the class and set its properties.
   *
   * @since    1.0.0
   * @param      string    $plugin_name       The name of the plugin.
   * @param      string    $version    The version of this plugin.
   */
  public function __construct($plugin_name, $version)
  {

    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->instance_id = 0;

    //add_shortcode('display_mindgallery',  array( $this, 'display_mindgallery_func') );

    //add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );

  }

  /**
   * MAIN RENDER FUNCTION THAT SHOWS THE GALLERY AT FRONTEND
   *
   * DISABLED
   * 
   * @since    1.5.0
   * @param    string               $output           Outputed text that is going to be rendered publicly.
   * @param    Array                $attr             Atributes provided by ....
   *
   */
  public function render_mindgallery($output, $attr)
  {

    // There has been a render mindgallery code in non Guttenberg version
  }



  /**
   * Register the stylesheets for the public-facing side of the site.
   *
   * @since    1.0.0
   */

  public function enqueue_styles()
  {
    wp_enqueue_style($this->plugin_name, plugin_dir_url(__DIR__) . 'assets/css/vendors/mind-gallery-nomodule.css', array(), $this->version, 'all');
  }

  /**
   * Register the JavaScript for the public-facing side of the site.
   * There is react based gallery present at the moment
   *
   * @since    1.0.0
   */
  public function enqueue_scripts()
  {
    wp_enqueue_script('react', 'https://unpkg.com/react@17/umd/react.production.min.js', array());
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', array('react'));
    wp_enqueue_script('mindgallery-no-module-script', plugin_dir_url(__DIR__) . 'assets/js/vendors/mind-gallery-nomodule.js', array('react', 'react-dom'), $this->version, 'all');
  }

  private function get_instance_id()
  {
  }
}
