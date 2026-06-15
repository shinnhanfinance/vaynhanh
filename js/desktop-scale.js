/**
 * Desktop layout scaled down on phones/tablets.
 * Sets layout viewport to 1200px so the page renders like desktop, shrunk to fit.
 */
(function () {
    'use strict';

    var DESKTOP_LAYOUT_WIDTH = 1200;
    var DEFAULT_VIEWPORT =
        'width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes, viewport-fit=cover';
    var DESKTOP_VIEWPORT =
        'width=' + DESKTOP_LAYOUT_WIDTH + ', user-scalable=yes, viewport-fit=cover';

    function getViewportMeta() {
        var meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'viewport');
            document.head.appendChild(meta);
        }
        return meta;
    }

    /** Dùng kích thước màn hình thật — tránh flip-flop sau khi đổi viewport. */
    function shouldUseDesktopScale() {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 992) {
            return false;
        }

        var screenW = window.screen && window.screen.width ? window.screen.width : 0;
        var screenH = window.screen && window.screen.height ? window.screen.height : 0;
        var minScreen = screenW && screenH ? Math.min(screenW, screenH) : 0;

        if (minScreen > 0 && minScreen <= 991) {
            return true;
        }

        return window.matchMedia('(max-width: 991px)').matches;
    }

    function applyViewportMode() {
        var useScale = shouldUseDesktopScale();
        var meta = getViewportMeta();

        document.documentElement.classList.toggle('mcredit-desktop-scale', useScale);
        meta.setAttribute('content', useScale ? DESKTOP_VIEWPORT : DEFAULT_VIEWPORT);
    }

    applyViewportMode();
    window.addEventListener('resize', applyViewportMode);
    window.addEventListener('orientationchange', applyViewportMode);
})();
