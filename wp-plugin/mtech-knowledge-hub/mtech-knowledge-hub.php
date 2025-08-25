<?php
/**
 * Plugin Name: MTech Knowledge Hub
 * Description: Embeds the MTech Snow Equipment Knowledge Hub React app with dev-server HMR fallback.
 * Version: 0.1.0
 * Author: ARM TruckCorp / MTech
 */

if (!defined('ABSPATH')) { exit; }

// Detect shortcode presence to conditionally enqueue assets
$GLOBALS['mtech_kh_shortcode_present'] = false;

function mtech_kh_detect_shortcode($posts) {
  if (empty($posts)) { return $posts; }
  foreach ($posts as $post) {
    if (is_object($post) && isset($post->post_content) && strpos($post->post_content, '[mtech_knowledge_hub') !== false) {
      $GLOBALS['mtech_kh_shortcode_present'] = true;
      break;
    }
  }
  return $posts;
}
add_filter('the_posts', 'mtech_kh_detect_shortcode');

function mtech_kh_dev_origin() {
  $origin = defined('MTECH_KH_DEV_ORIGIN') ? MTECH_KH_DEV_ORIGIN : 'http://localhost:5173';
  /**
   * Filter the dev origin used for HMR (useful in Docker: host.docker.internal).
   */
  return apply_filters('mtech_kh_dev_origin', $origin);
}

function mtech_kh_is_vite_running($url) {
  $response = wp_remote_get($url, [ 'timeout' => 0.5 ]);
  return !is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200;
}

function mtech_kh_enqueue_assets() {
  if (is_admin()) { return; }
  if (!$GLOBALS['mtech_kh_shortcode_present']) { return; }

  $dev = defined('MTECH_KH_DEV') && MTECH_KH_DEV;
  $dev_origin = rtrim(mtech_kh_dev_origin(), '/');
  $vite_client = $dev_origin . '/@vite/client';
  $vite_entry  = $dev_origin . '/src/main.tsx';

  if ($dev && mtech_kh_is_vite_running($vite_client)) {
    wp_enqueue_script('mtech-kh-vite-client', $vite_client, [], null, true);
    wp_enqueue_script('mtech-kh-app', $vite_entry, ['mtech-kh-vite-client'], null, true);
  } else {
    $base = plugin_dir_url(__FILE__) . 'assets/';
    $css  = plugin_dir_path(__FILE__) . 'assets/knowledge-hub.css';
    $js   = plugin_dir_path(__FILE__) . 'assets/knowledge-hub.js';
    $ver_css = file_exists($css) ? filemtime($css) : null;
    $ver_js  = file_exists($js) ? filemtime($js) : null;

    wp_enqueue_style('mtech-kh-style', $base . 'knowledge-hub.css', [], $ver_css);
    wp_enqueue_script('mtech-kh-app', $base . 'knowledge-hub.js', [], $ver_js, true);
  }
}

add_action('wp_enqueue_scripts', 'mtech_kh_enqueue_assets');

function mtech_kh_shortcode($atts) {
  $atts = shortcode_atts(['id' => 'mtech-knowledge-hub-root'], $atts);
  // Ensure assets enqueue if shortcode rendered via widgets/builders
  $GLOBALS['mtech_kh_shortcode_present'] = true;
  return '<div id="' . esc_attr($atts['id']) . '"></div>';
}
add_shortcode('mtech_knowledge_hub', 'mtech_kh_shortcode');


