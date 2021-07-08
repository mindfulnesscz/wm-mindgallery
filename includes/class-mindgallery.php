<?php 
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://www.petrmucha.cz/
 * @since      1.0.0
 *
 * @package    Mindgallery
 * @subpackage Mindgallery/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Mindgallery
 * @subpackage Mindgallery/includes
 * @author     Petr Mucha <mail@petrmucha.cz>
 */
class Mindgallery {
	/**
 	* The loader that's responsible for maintaining and registering all hooks that power
 	* the plugin.
 	*
 	* @since    1.0.0
 	* @access   protected
 	* @var      Mindgallery_Loader    $loader    Maintains and registers all hooks for the plugin.
	*/
	protected $loader;

	/**
 	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
 	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
 	 * The current version of the plugin.
 	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string
	 */
	protected $version;

	/**
 	 * The texdomain of the plugin.
 	 *
	 * @since    2.0
	 * @access   protected
	 * @var      string
	 */
	protected $textdomain;

	
	
	/**
	 * Define the core functionality of the plugin.
 	*
 	* Set the plugin name and the plugin version that can be used throughout the plugin.
 	* Load the dependencies, define the locale, and set the hooks for the admin area and
 	* the public-facing side of the site.
 	*
 	* @since    1.0.0
 	*/

	public function __construct($name, $version, $textdomain) {
	
		$this->plugin_name = $name;
		$this->version = $version;
		$this->textdomain = $textdomain;

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}
		
		/**
		 * Load the required dependencies for this plugin.
		 *
		 * Include the following files that make up the plugin:
		 *
		 * - Wpsmartflexslider_Loader. Orchestrates the hooks of the plugin.
		 * - Wpsmartflexslider_i18n. Defines internationalization functionality.
		 * - Wpsmartflexslider_Admin. Defines all hooks for the admin area.
		 * - Wpsmartflexslider_Public. Defines all hooks for the public side of the site.
		 *
		 * Create an instance of the loader which will be used to register the hooks
		 * with WordPress.
		 *
		 * @since    1.0.0
		 * @access   private
		 */
	private function load_dependencies() {
		
		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-mindgallery-loader.php';
		
		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-mindgallery-i18n.php';		
		
		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( __FILE__ ) . 'class-mindgallery-admin.php';
		
		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-mindgallery-public.php';
		

		$this->loader = new Mindgallery_Loader();
		
	}
	
	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Wpsmartflexslider_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {
	
		$plugin_i18n = new Mindgallery_i18n ( $this->textdomain );
	
		$this->loader->add_action ( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	
	}
	
	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */

	private function define_admin_hooks() {
	
		$plugin_admin = new Mindgallery_Admin ( $this->get_plugin_name (), $this->get_version (), $this->textdomain );
	
		$this->loader->add_action ( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action ( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_action ( 'enqueue_block_editor_assets', $plugin_admin, 'enqueue_block_editor');
	
	}

	
	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */	

	private function define_public_hooks() {
	
		$plugin_public = new Mindgallery_Public( $this->get_plugin_name(), $this->get_version() );
	
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		// DEPRECATED FROM NON GUTTENBERG $this->loader->add_filter( 'post_gallery', $plugin_public, "render_mindgallery", 10, 2);
	
	}
	
	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}
	
	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}
	
	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Wpsmartflexslider_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}
	
	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}
}
