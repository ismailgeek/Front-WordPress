<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp-front-db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '@;R>CU.B:f;*OY#=03|[iB>9r#in(oPyuU$i|-GTL.$JRSU05eQHW].dc$4_<nfF' );
define( 'SECURE_AUTH_KEY',  'N/pl,M@R)GggIX@Y^vcB9h6WTSI>Cco:xC>0^ C3^#;Ok)=.>vF|]Hg;OO=_z$^*' );
define( 'LOGGED_IN_KEY',    ' wlv%^ePA8b*eq%IM !K`b29Yq8tP%JZ;E>J/j}n;QI(`ggRU@HgMoEEa7!)WRb-' );
define( 'NONCE_KEY',        'kzp}[_?{Syn3B=aKW<!<Wct$j/PA.$IP3nY+XX:l`>tv3k]PY*#w^;5jQS@BDHe&' );
define( 'AUTH_SALT',        '&@_W:+=>9BsXL.(1awTL=nrcs;Mn(_$l{94S=>1m`/C=kyVW@4+=gA+ j2<Zv3%d' );
define( 'SECURE_AUTH_SALT', '%@<@7 CTf9~Pk^m9P7nfL1llX@3;K2Q[ >$%_XM^FiIs3sb>gnu8dh4VO`>EE&W6' );
define( 'LOGGED_IN_SALT',   'y4uOV&Bna<c-ksn~5,LMm(SDdXb(gYZ-dXM|mC,*I#~Mjy9c(+Tx{{2eM|LvQI#[' );
define( 'NONCE_SALT',       ') cbN!iNDGZ{p#uUsA/!Lvt~3;`L>[vOhBG%oLaSFiR;9O}B1))sZEr;sLc3V:Rn' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'fb_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
