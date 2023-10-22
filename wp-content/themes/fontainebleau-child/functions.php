<?php

/**
 * fontainebleau child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package fontainebleau child
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define('CHILD_THEME_FONTAINEBLEAU_CHILD_VERSION', '1.0.0');

/**
 * Enqueue styles
 */
function child_enqueue_styles()
{

	wp_enqueue_style('fontainebleau-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_FONTAINEBLEAU_CHILD_VERSION, 'all');
}

add_action('wp_enqueue_scripts', 'child_enqueue_styles', 15);

function fixed_menu()
{
?>
	<script>
		// Function to toggle the fixed menu class
		function toggleFixedMenu() {
			const menu = document.querySelector('#menu-section');
			const homeMenu = document.querySelector('.home section#menu-section');
			if (window.scrollY > 100) {
				menu.classList.add('fixed-menu');
				if (homeMenu) {
					homeMenu.style.display = 'block';
				}
			} else {
				menu.classList.remove('fixed-menu');
				if (homeMenu) {
					homeMenu.style.display = 'none';
				}
			}
		}

		// Attach the scroll event listener to the window
		window.addEventListener('scroll', toggleFixedMenu);
	</script>
<?php
}
add_action('wp_head', 'fixed_menu');
