<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @since      1.0.0
 * @package    Mindgallery
 * @subpackage Mindgallery/includes
 * @author     Webmajstr <info@webmajstr.cz>
 */

class Mindgallery_Admin
{

  private string $plugin_name;

  private string $version;

  private string $textdomain;

  public function __construct($plugin_name, $version, $textdomain)
  {

    $this->textdomain = $textdomain;
    $this->plugin_name = $plugin_name;
    $this->version = $version;

    add_action('admin_init', array($this, 'mindgallery_admin_init'), 5);

    //register our Mindgallery_options_page to the admin_menu action hook		
    add_action('admin_menu', array($this, 'mindgallery_options_page'), 5);
  }

  /**
   * Register the JavaScript for the admin-facing side of the site.
   * @since    1.0.0
   */

  public function enqueue_scripts()
  {

    // nothing here since the only code enqueued is the block editor added to enqueueue_block_editor_assets hook

  }


  public function enqueue_styles()
  {

    wp_enqueue_style('mindgallery/admin-style', plugin_dir_url(__DIR__) . 'assets/css/mg-backend.css', [], $this->version);
  }


  /**
   * Here comes the main Guttenberg editor script.
   * @since    1.9.1
   *
   */
  public function enqueue_block_editor()
  {

    wp_enqueue_script('mindgallery/block', plugin_dir_url(__DIR__) . 'assets/js/index.js', ['wp-blocks', 'wp-editor', 'wp-element'], $this->version);
  }

  /**
   * Creates Settings Menu in Admin bar
   * @since    1.0.0
   */

  public function mindgallery_admin_init()
  {

    // register a new setting for "mindgallery" page
    register_setting('mindgallery', 'mindgallery_options');
  }


  /**
   * top level menu
   */
  public function mindgallery_options_page()
  {
    // add top level menu page
    $page_hook_suffix = add_menu_page(
      'Mindgallery',
      'Mindgallery Options',
      'manage_options',
      'mindgallery',
      array($this, 'mindgallery_options_page_html')
    );


    // GUTTENBERG APPROACH

    //hacky way
    add_action("admin_print_scripts-{$page_hook_suffix}", array($this, 'guttenberg_options_assets'));
  }

  /**
   * inits guttenberg friendly options fields. 
   * Initially for fields that need to be accessible from block editor when generating frontend blocks.
   * 
   * @since 2.0.1
   * @access public
   * @return void
   */
  public function guttenberg_options_assets()
  {

    $deps = ['wp-api', 'wp-i18n', 'wp-components', 'wp-element'];
    wp_enqueue_script('wm_guttenberg_options', plugins_url("../assets/js/options.js", __FILE__), $deps, $this->version);
  }


  /**
   * Registers settings for guttenberg options page.
   *
   * @since     2.0.1
   * @return    void
   */
  public function guttenberg_admin()
  {

    // GUTENBERG FRIENDLY APPROACH

    register_setting(
      'mindgallery_settings',
      'mindgallery_react_mode',
      array(
        'type'         => 'boolean',
        'show_in_rest' => true,
        'default'      => false,
      )
    );
  }


  public function mindgallery_options_page_html()
  {
    // check user capabilities
    if (!current_user_can('manage_options')) {
      return;
    }
    // show error/update messages
    settings_errors('mindgallery_messages');
?>
    <div class="wrap">
      <h1><?php echo $this->plugin_name ?></h1>

      <div id="mindgallery-options-wrapper" class="wrap">
      </div>
  <?php

  }
}
