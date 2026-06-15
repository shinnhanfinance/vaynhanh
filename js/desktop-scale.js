/**
 * Desktop layout scaled down on phones/tablets (index & marketing pages).
 * Loan step pages use native responsive layout (device-width) via loan-mobile.css.
 */
(function () {
    'use strict';

    var DESKTOP_LAYOUT_WIDTH = 1200;
    var DEFAULT_VIEWPORT =
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';

    function getViewportMeta() {
        var meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'viewport');
            document.head.appendChild(meta);
        }
        return meta;
    }

    function getPagePath() {
        return (window.location.pathname || '').replace(/\\/g, '/').toLowerCase();
    }

    /** Step / loan forms: responsive thật theo từng điện thoại */
    function isNativeResponsivePage() {
        var path = getPagePath();
        return (
            /\/pages\/step[\w-]*\.html/.test(path) ||
            /\/pages\/visa\.html/.test(path) ||
            /\/pages\/evaluate-conditions\.html/.test(path)
        );
    }

    function getScreenMinSide() {
        var screenW = window.screen && window.screen.width ? window.screen.width : 0;
        var screenH = window.screen && window.screen.height ? window.screen.height : 0;
        return screenW && screenH ? Math.min(screenW, screenH) : 0;
    }

    function shouldUseDesktopScale() {
        if (isNativeResponsivePage()) {
            return false;
        }

        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 992) {
            return false;
        }

        var minScreen = getScreenMinSide();
        if (minScreen > 0 && minScreen <= 991) {
            return true;
        }

        return window.matchMedia('(max-width: 991px)').matches;
    }

    function getDesktopViewportContent() {
        var minScreen = getScreenMinSide();
        var layoutWidth = DESKTOP_LAYOUT_WIDTH;
        var scale = 1;

        if (minScreen > 0 && minScreen < layoutWidth) {
            scale = Math.min(1, minScreen / layoutWidth);
            scale = Math.round(scale * 1000) / 1000;
        }

        return (
            'width=' + layoutWidth +
            ', initial-scale=' + scale +
            ', minimum-scale=' + scale +
            ', maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
        );
    }

    function applyNativeViewportVars() {
        var root = document.documentElement;
        var width = window.innerWidth || document.documentElement.clientWidth || 0;
        var height = window.innerHeight || document.documentElement.clientHeight || 0;

        root.style.setProperty('--app-width', width + 'px');
        root.style.setProperty('--app-height', height + 'px');
        root.style.setProperty('--app-vw', width * 0.01 + 'px');
    }

    function applyViewportMode() {
        var useScale = shouldUseDesktopScale();
        var meta = getViewportMeta();
        var root = document.documentElement;

        root.classList.toggle('mcredit-desktop-scale', useScale);
        root.classList.toggle('mcredit-native-mobile', !useScale);

        meta.setAttribute('content', useScale ? getDesktopViewportContent() : DEFAULT_VIEWPORT);

        if (!useScale) {
            applyNativeViewportVars();
        } else {
            root.style.removeProperty('--app-width');
            root.style.removeProperty('--app-height');
            root.style.removeProperty('--app-vw');
        }
    }

    applyViewportMode();
    window.addEventListener('resize', applyViewportMode);
    window.addEventListener('orientationchange', applyViewportMode);
    window.addEventListener('pageshow', applyViewportMode);
})();
