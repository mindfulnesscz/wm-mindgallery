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
class Mindgallery_Public {

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
	public function __construct( $plugin_name, $version ) {

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
	public function render_mindgallery( $output, $attr ) { 
	
		 // There has been a render mindgallery code in non Guttenberg version
	}

	
	
		/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	
	 public function enqueue_styles() {

		/**
		 * Since this version of the gallery is only preparation for the new Typescriped modern one, there are no frontend styles at the moment
		 * Current version only uses foundation Orbit component 
		 */
		//wp_enqueue_style( $this->plugin_name, plugin_dir_url(__DIR__) . 'assets/css/mindgallery.1.9.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * Since this version of the gallery is only preparation for the new Typescriped modern one, there are no frontend scripts at the moment
		 * Current version only uses foundation Orbit component 
		 */
		
		// sice 1.9.2.
			
	}

	private function get_instance_id() {
		
	}

}
