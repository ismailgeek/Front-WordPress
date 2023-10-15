<?php

/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Astra
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

?>
<?php astra_content_bottom(); ?>
</div> <!-- ast-container -->
</div><!-- #content -->
<?php
astra_content_after();

astra_footer_before();

astra_footer();

astra_footer_after();
?>
</div><!-- #page -->
<?php
astra_body_bottom();
wp_footer();
?>
<!-- APP.js FILE -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXgdJHvY-8st45Qxh9_u_JJvtpLSfSdz4">
</script>
<script defer src="/wp-content/themes/fontainebleau-child/js/components.js"></script>
<script defer src="/wp-content/themes/fontainebleau-child/js/main.js"></script>
</body>

</html>