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

class Mindgallery_Admin {

	private $plugin_name;

	private $version;

	public function __construct( $plugin_name, $version, $textdomain ) {
		
		$this->textdomain = $textdomain;
		$this->plugin_name = $plugin_name;
		$this->version = $version;
		
		add_action( 'admin_init', array( $this , 'mindgallery_admin_init' ), 5 );
		
		//register our Mindgallery_options_page to the admin_menu action hook		
		add_action( 'admin_menu', array( $this , 'mindgallery_options_page'),5 );
		
	}

	/**
	* Register the JavaScript for the admin-facing side of the site.
	* @since    1.0.0
	*/

	public function enqueue_scripts () {

		// nothing here since the only code enqueued is the block editor added to enqueueue_block_editor_assets hook
		
	}


	public function enqueue_styles () {

		wp_enqueue_style ( 'mindgallery/admin-style', plugin_dir_url( __DIR__ ) . 'assets/css/mg-backend.css', [], $this->version );
		
	}


	/**
	* Here comes the main Guttenberg editor script.
	* @since    1.9.1
	*
	*/
	public function enqueue_block_editor () {

		wp_enqueue_script( 'mindgallery/block', plugin_dir_url( __DIR__ ) . 'assets/js/index.js', [ 'wp-blocks', 'wp-editor', 'wp-element' ], $this->version);
	}
	
	/**
	 * Creates Settings Menu in Admin bar
	 * @since    1.0.0
	 */

	public function mindgallery_admin_init () {
		
		// register a new setting for "mindgallery" page

		register_setting ( 'mindgallery', 'mindgallery_options' );
		
		
		
		// register a new section in the "mindgallery" page

		add_settings_section (
			'mindgallery settings',
			__( 'Mindgallery settings', 'mindgallery' ),
			array( 'Mindgallery_Admin', 'mindgallery_section_developers_cb' ),
			'mindgallery'
		);

		
				// register a new field in the "mindgallery_section_developers" section, inside the "mindgallery" page
		add_settings_field(

				'mindgallery_field_default', // as of WP 4.6 this value is used only internally
				// use $args' label_for to populate the id inside the callback
				__( 'Pill', 'mindgallery' ),
				array ( 'Mindgallery_Admin', 'mindgallery_field_default_cb' ),
				'mindgallery',
				'mindgallery settings',
				[
						'label_for' => 'mindgallery_field_default',
						'class' => 'mindgallery_row',
						'mindgallery_custom_data' => 'custom',
				]
		);
		
		// checkbox on the background gallery type
		add_settings_field(
				'mindgallery_field_type_bkg_available', // as of WP 4.6 this value is used only internally
				// use $args' label_for to populate the id inside the callback
				__( 'Allow gallery type Background', 'mindgallery' ),
				array( 'Mindgallery_Admin', 'mindgallery_field_type_bkg_available_cb' ),
				'mindgallery',
				'mindgallery settings',
				[
						'label_for' => 'mindgallery_field_type_bkg_available',
						'class' => 'mindgallery_row',
						'mindgallery_custom_data' => 'custom',
				]
				);
		
	}
	 
	/**
	 * top level menu
	 */
	public function mindgallery_options_page() {
	 	// add top level menu page
	 	add_menu_page(
	 	'Mindgallery',
	 	'Mindgallery Options',
	 	'manage_options',
	 	'mindgallery',
	 	array('Mindgallery_Admin', 'mindgallery_options_page_html')
		 );
	}

	public function mindgallery_options_page_html() {

		// check user capabilities
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
	
		// add error/update messages
	
		// check if the user have submitted the settings
		// wordpress will add the "settings-updated" $_GET parameter to the url
		if ( isset( $_GET['settings-updated'] ) ) {
			// add settings saved message with the class of "updated"
			add_settings_error( 'mindgallery_messages', 'mindgallery_message', __( 'Settings Saved', 'mindgallery' ), 'updated' );
		}
	
		// show error/update messages
		settings_errors( 'mindgallery_messages' );
		?>
			 <div class="wrap">
				 <h1><?php echo $this->plugin_name; ?></h1>
				 <form action="options.php" method="post">
				 <?php
				 // output security fields for the registered setting "wporg"
				 settings_fields( 'mindgallery' );
				 // output setting sections and their fields
				 // (sections are registered for "wporg", each field is registered to a specific section)
				 do_settings_sections( 'mindgallery' );
				 // output save settings button
				 submit_button( 'Save Settings' );
				 ?>
				 </form>
			</div>
			<?php 
	
	}


	/**
	*  developers section cb
	*
	* section callbacks can accept an $args parameter, which is an array.
	* $args have the following keys defined: title, id, callback.
	* the values are defined at the add_settings_section() function.
	*
	*/
	public function mindgallery_section_developers_cb( $args ) {
		?>
		 	<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Follow the white rabbit.', 'mindgallery' ); ?></p>
		<?php 
		}


	/**
	* pill field cb
	*
	* field callbacks can accept an $args parameter, which is an array.
	* $args is defined at the add_settings_field() function.
	* wordpress has magic interaction with the following keys: label_for, class.
	* the "label_for" key value is used for the "for" attribute of the <label>.
	* the "class" key value is used for the "class" attribute of the <tr> containing the field.
	* you can add custom key value pairs to be used inside your callbacks.
 	*
	*/
	public function mindgallery_field_default_cb( $args ) {
		// get the value of the setting we've registered with register_setting()
		$options = get_option( 'mindgallery_options' );
		// output the field
		?>
		<select id="<?php echo esc_attr( $args['label_for'] ); ?>"
			data-custom="<?php echo esc_attr( $args['mindgallery_custom_data'] ); ?>"
			name="mindgallery_options[<?php echo esc_attr( $args['label_for'] ); ?>]"
		>
			<option value="default" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'default', false ) ) : ( '' ); ?>>
		 		<?php esc_html_e( 'Default', 'mindgallery' ); ?>
			</option>
		
			<option value="lightbox" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'lightbox', false ) ) : ( '' ); ?>>
		 		<?php esc_html_e( 'Lightbox', 'mindgallery' ); ?>
			</option>

			<?php if ($options['mindgallery_field_type_bkg_available']):?>
				<option value="background" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'background', false ) ) : ( '' ); ?>>
		 			<?php esc_html_e( 'Background', 'mindgallery' ); ?>
				</option>
			<?php endif;?>
		</select>
		 		
		<p class="description">
		 	<?php esc_html_e( 'You take the blue pill and the story ends. You wake in your bed and you believe whatever you want to believe.', 'mindgallery' ); ?>
		</p>
		<p class="description">
		 	<?php esc_html_e( 'You take the red pill and you stay in Wonderland and I show you how deep the rabbit-hole goes.', 'mindgallery' ); ?>
		</p>
		<?php
	}


	public function mindgallery_field_type_bkg_available_cb( $args ) {
		// get the value of the setting we've registered with register_setting()
		$options = get_option( 'mindgallery_options' );
		// output the field
		?>
		<input type="checkbox" id="<?php echo esc_attr( $args['label_for'] ); ?>"
			data-custom="<?php echo esc_attr( $args['mindgallery_custom_data'] ); ?>"
			name="mindgallery_options[<?php echo esc_attr( $args['label_for'] ); ?>]"
			<?php echo ($options[ $args['label_for'] ] ? 'checked' : '');?>
		>
				 <p class="description">
				 <?php esc_html_e( 'Check if You want the background gallery type displayed.', 'mindgallery' ); ?>
				 </p>
				 <?php
	}
}




		

 



 