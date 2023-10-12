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
define( 'CHILD_THEME_FONTAINEBLEAU_CHILD_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {

	wp_enqueue_style( 'fontainebleau-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_FONTAINEBLEAU_CHILD_VERSION, 'all' );

}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );

function fixed_menu() {
    ?>
        <script>
          // Function to toggle the fixed menu class
			function toggleFixedMenu() {
			  const menu = document.querySelector('#menu-section'); // Replace with your actual menu class
			  if (window.scrollY > 100) { // Adjust the scroll threshold as needed
				menu.classList.add('fixed-menu');
				  menu.style.display = 'block';
			  } else {
				menu.classList.remove('fixed-menu');
			  }
			}

			// Attach the scroll event listener to the window
			window.addEventListener('scroll', toggleFixedMenu);
        </script>
    <?php
}
add_action('wp_head', 'fixed_menu');

function propeties_shortcode() {
	$html_content = '<div id="cards-container">
  <div class="card-item">
    <a href="#"
      ><img
        class="card-audited"
        src="/wp-front/wp-content/uploads/2023/10/itemaudited2023.png"
      />
    </a>

    <div>
      <img
        class="card-image"
        height="260"
        src="/wp-front/wp-content/uploads/2019/04/img-06-free-img.jpg"
      />
    </div>

    <h6 class="card-price">1,145 € / month</h6>

    <h3><a class="card-city" href="">Fontainebleau</a></h3>

    <div>
      <i aria-hidden="true" class="far fa-eye"></i>
      <span class="card-views">Consulted 356 times</span>
    </div>

    <div>
      <i aria-hidden="true" class="far fa-folder-open"></i>
      <span class="card-category">Studio</span>
    </div>

    <div class="card-info">
      <div class="info-item">
        <span>
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            style="enable-background: new 0 0 100 100"
            xml:space="preserve"
            width="50"
          >
            <g>
              <path
                d="M3.6,75.7h3.6V7.3l85.7-0.1v85.3l-16.7-0.1l0-16.7c0-0.9-0.4-1.9-1-2.5c-0.7-0.7-1.6-1-2.5-1h-69V75.7h3.6                            H3.6v3.6H69L69,96c0,2,1.6,3.6,3.6,3.6l23.8,0.1c1,0,1.9-0.4,2.5-1c0.7-0.7,1-1.6,1-2.5V3.6c0-1-0.4-1.9-1-2.5                            c-0.7-0.7-1.6-1-2.5-1L3.6,0.1C1.6,0.2,0,1.7,0,3.7v72c0,0.9,0.4,1.9,1,2.5c0.7,0.7,1.6,1,2.5,1V75.7z"
              ></path>
              <path
                d="M38.1,76.9v-9.5c0-1.3-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4v9.5c0,1.3,1.1,2.4,2.4,2.4                            C37,79.3,38.1,78.2,38.1,76.9"
              ></path>
              <path
                d="M38.1,50.7V15c0-1.3-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4v35.7c0,1.3,1.1,2.4,2.4,2.4                            C37,53.1,38.1,52.1,38.1,50.7"
              ></path>
              <path
                d="M2.4,38.8h33.3c1.3,0,2.4-1.1,2.4-2.4c0-1.3-1.1-2.4-2.4-2.4H2.4c-1.3,0-2.4,1.1-2.4,2.4                            C0,37.8,1.1,38.8,2.4,38.8"
              ></path>
              <path
                d="M35.7,46h31c1.3,0,2.4-1.1,2.4-2.4c0-1.3-1.1-2.4-2.4-2.4h-31c-1.3,0-2.4,1.1-2.4,2.4                            C33.3,44.9,34.4,46,35.7,46"
              ></path>
              <path
                d="M78.6,46h16.7c1.3,0,2.4-1.1,2.4-2.4c0-1.3-1.1-2.4-2.4-2.4H78.6c-1.3,0-2.4,1.1-2.4,2.4                            C76.2,44.9,77.3,46,78.6,46"
              ></path>
              <path
                d="M78.6,46h16.7c1.3,0,2.4-1.1,2.4-2.4c0-1.3-1.1-2.4-2.4-2.4H78.6c-1.3,0-2.4,1.1-2.4,2.4                            C76.2,44.9,77.3,46,78.6,46"
              ></path>
              <path
                d="M81,43.6v-7.1c0-1.3-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4v7.1c0,1.3,1.1,2.4,2.4,2.4                            C79.9,46,81,44.9,81,43.6"
              ></path>
              <path
                d="M81,43.6v-7.1c0-1.3-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4v7.1c0,1.3,1.1,2.4,2.4,2.4                            C79.9,46,81,44.9,81,43.6"
              ></path>
            </g>
          </svg>
        </span>
        <h3 class="card-surface">22 m²</h3>
      </div>

      <div class="info-item">
        <span>
          <i aria-hidden="true" class="fas fa-street-view"></i>
        </span>
        <h3 class="card-distance">0.8 km</h3>
      </div>

      <div class="info-item">
        <span>
          <i aria-hidden="true" class="fas fa-bed"></i>
        </span>
        <h3 class="card-bed">2</h3>
      </div>

      <div class="info-item">
        <span>
          <i aria-hidden="true" class="fas fa-bath"></i>
        </span>
        <h3 class="card-shower">1</h3>
      </div>
    </div>

    <div class="card-stars">
      <i class="elementor-star-full"></i>
    </div>
  </div>
</div>';
    return $html_content;
}
add_shortcode('propreties', 'propeties_shortcode');