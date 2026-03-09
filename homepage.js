// ==UserScript==
// @name         FenixOnSteroidsHpage
// @namespace    http://tampermonkey.net/
// @version      4.8
// @description  Melhor interface para Fenix - Curated Palettes & Smart Text Contrast
// @author       josan07
// @match        *://fenix.tecnico.ulisboa.pt/student*
// @match        *://fenix.tecnico.ulisboa.pt/personal*
// @match        *://fenix.tecnico.ulisboa.pt/space-management*
// @match        *://fenix.tecnico.ulisboa.pt/messaging*
// @match        *://fenix.tecnico.ulisboa.pt/cms*
// @match        *://fenix.tecnico.ulisboa.pt/learning*

// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // SCRIPT KILL SWITCH (BYPASS MODE)
    // ==========================================
    const scriptEnabledKey = 'fenix-steroids-enabled';
    const isScriptEnabled = localStorage.getItem(scriptEnabledKey) !== 'false';

    if (!isScriptEnabled) {
        document.addEventListener('DOMContentLoaded', () => {
            const navRight = document.querySelector('.navbar-right');
            if (navRight) {
                const li = document.createElement('li');
                li.innerHTML = '<a href="#" style="color:#e63946; font-weight:bold;">⚡ Steroids: OFF</a>';
                li.onclick = (e) => {
                    e.preventDefault();
                    localStorage.setItem(scriptEnabledKey, 'true');
                    location.reload();
                };
                navRight.prepend(li);
            }
        });
        return;
    }

    // ==========================================
    // STATE, LANGUAGE & STORAGE
    // ==========================================
    const themeStorageKey = 'fenix-theme-preference';
    const colorStorageKey = 'fenix-color-preference';

    const langMeta = document.querySelector('meta[http-equiv="Content-Language"]');
    const isEN = langMeta ? langMeta.content.includes('en') : false;

    let savedTheme = localStorage.getItem(themeStorageKey) || 'system';
    let isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme === 'system' ? (isSystemDark ? 'dark' : 'light') : savedTheme;

    let currentColor = localStorage.getItem(colorStorageKey) || 'tecnico';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem(themeStorageKey) === 'system' || !localStorage.getItem(themeStorageKey)) {
                location.reload();
            }
        });
    }

    // ==========================================
    // "BLACKOUT CURTAIN" ANTI-FLASHBANG
    // ==========================================
    if (currentTheme === 'dark') {
        document.documentElement.style.setProperty('background', '#121212', 'important');
        document.documentElement.style.colorScheme = 'dark';

        const flashbangShield = document.createElement('style');
        flashbangShield.id = 'anti-flashbang-ultimate';
        flashbangShield.textContent = `
            :root, html, body { background-color: #121212 !important; }
            body { opacity: 0 !important; transition: opacity 0.3s ease-in-out !important; }
            #wrap, #main-container, .container-fluid, .footer, header,
            main, #main-content-wrapper, .main-content, #content-block {
                background-color: #121212 !important;
                background-image: none !important;
            }
        `;
        document.documentElement.appendChild(flashbangShield);
    }

    // ==========================================
    // EXTENDED THEME PALETTES
    // ==========================================
    const colorPalettes = {
        'tecnico': {
            namePT: 'Técnico', nameEN: 'Técnico', base: '#009de0', hover: '#007dba',
            timetable: ['#009de0', '#007bb5', '#4db8eb', '#f1faee', '#ff9f1c', '#003f5c', '#a8dadc', '#e63946', '#2a9d8f', '#1d3557']
        },
        'red': {
            namePT: 'Vermelho', nameEN: 'Red', base: '#e63946', hover: '#d62828',
            timetable: ['#e63946', '#b82e38', '#ffb5a7', '#f1faee', '#a8dadc', '#457b9d', '#1d3557', '#ffcdb2', '#ff9f1c', '#2b2d42']
        },
        'orange': {
            namePT: 'Laranja', nameEN: 'Orange', base: '#f77f00', hover: '#d66800',
            timetable: ['#f77f00', '#d62828', '#fcbf49', '#eae2b7', '#003049', '#ff9f1c', '#fdf0d5', '#c1121f', '#669bbc', '#001219']
        },
        'lime': {
            namePT: 'Lima', nameEN: 'Lime', base: '#a4de02', hover: '#8bc401',
            timetable: ['#a4de02', '#7cb518', '#5e8c14', '#f9c22e', '#e0e1dd', '#f15bb5', '#00bbf9', '#415a77', '#1b263b', '#0d1b2a']
        },
        'purple': {
            namePT: 'Roxo', nameEN: 'Purple', base: '#9b5de5', hover: '#7b3eb5',
            timetable: ['#9b5de5', '#713eba', '#f15bb5', '#00bbf9', '#feeafa', '#00f5d4', '#fee440', '#3a0ca3', '#4361ee', '#14213d']
        },
        'silver': {
            namePT: 'Prata', nameEN: 'Silver', base: '#8d99ae', hover: '#6c7a89',
            timetable: ['#8d99ae', '#778da9', '#2b2d42', '#edf2f4', '#ef233c', '#d90429', '#bdc3c7', '#34495e', '#e0e1dd', '#1b263b']
        },
        'gay': {
            namePT: 'jeb_', nameEN: 'jeb_', base: '#d100c8', hover: '#ff007f',
            timetable: [] // Handled via special CSS gradient
        }
    };

    function applyColor(colorKey) {
        const theme = colorPalettes[colorKey];
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty('--accent-blue', theme.base);
        rootStyle.setProperty('--accent-blue-hover', theme.hover);
        rootStyle.setProperty('--active-pill-bg', theme.base);
        localStorage.setItem(colorStorageKey, colorKey);
        currentColor = colorKey;
        document.documentElement.setAttribute('data-color', colorKey);
    }

    applyColor(currentColor);

    // Determines if text should be white or dark based on the hex background
    function getContrastYIQ(hexcolor){
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? '#121212' : '#ffffff';
    }

    // ==========================================
    // ESTILOS GERAIS (CSS)
    // ==========================================
    const customCSS = `
        /* Fontes */
        @font-face { font-family: 'Klavika'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/Klavika-Regular.otf') format('opentype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: 'Klavika'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/klavika-medium.otf') format('opentype'); font-weight: 500; font-style: normal; }
        @font-face { font-family: 'Klavika'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/klavika-bold.otf') format('opentype'); font-weight: 700; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Light.ttf') format('truetype'); font-weight: 300; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-SemiBold.ttf') format('truetype'); font-weight: 600; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; }

        :root {
            --bg-body: #f0f2f5;
            --bg-header: #ffffff;
            --bg-content: #ffffff;
            --bg-hover: #e9ecef;
            --text-main: #333333;
            --text-muted: #666666;
            --border-color: #dddddd;
            --active-pill-text: #ffffff;
            --shadow-color: rgba(0,0,0,0.08);
            --input-bg: #ffffff;

            --alert-warn-bg: #fff3cd; --alert-warn-text: #856404; --alert-warn-border: #ffeeba;
            --alert-err-bg: #f8d7da;  --alert-err-text: #721c24; --alert-err-border: #f5c6cb;
            --alert-succ-bg: #d4edda; --alert-succ-text: #155724; --alert-succ-border: #c3e6cb;
            --alert-info-bg: #d1ecf1; --alert-info-text: #0c5460; --alert-info-border: #bee5eb;
        }

        html[data-theme="dark"] {
            --bg-body: #121212;
            --bg-header: #1a1a1a;
            --bg-content: #242424;
            --bg-hover: #333333;
            --text-main: #e0e0e0;
            --text-muted: #aaaaaa;
            --border-color: #3d3d3d;
            --active-pill-text: #ffffff;
            --shadow-color: rgba(0,0,0,0.3);
            --input-bg: #1e1e1e;

            --alert-warn-bg: rgba(245, 166, 35, 0.15); --alert-warn-text: #f5a623; --alert-warn-border: rgba(245, 166, 35, 0.3);
            --alert-err-bg: rgba(230, 57, 70, 0.15);   --alert-err-text: #ff6b7b; --alert-err-border: rgba(230, 57, 70, 0.3);
            --alert-succ-bg: rgba(42, 157, 143, 0.15); --alert-succ-text: #4adeca; --alert-succ-border: rgba(42, 157, 143, 0.3);
            --alert-info-bg: rgba(0, 157, 224, 0.15);  --alert-info-text: #66c2ff; --alert-info-border: rgba(0, 157, 224, 0.3);
        }

        body, html {
            background-color: var(--bg-body) !important;
            color: var(--text-main) !important;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .container-fluid, footer, main, #wrap, #main-container {
            background-color: transparent !important;
            background-image: none !important;
            border-color: var(--border-color) !important;
            box-shadow: none !important;
            border: none !important;
        }

        body, html, p, span, div, li { font-family: 'Source Sans 3', sans-serif !important; font-weight: 400 !important; font-size: 15px; }
        .small, small, p[style*="color:#888"], span[style*="color:#888"], span[style*="color:#ddd"] { font-weight: 300 !important; color: var(--text-muted) !important; }
        h1, h2, h3, h4, h5, h6, .modal-title { font-family: 'Klavika', sans-serif !important; color: var(--text-main) !important; }
        h3 { font-weight: 500 !important; }

        a { color: var(--accent-blue) !important; transition: color 0.2s ease-in-out; }
        a:hover { color: var(--accent-blue-hover) !important; text-decoration: underline !important; }

        html[data-theme="dark"] *[style*="background: white"],
        html[data-theme="dark"] *[style*="background: #fff"],
        html[data-theme="dark"] *[style*="background-color: white"],
        html[data-theme="dark"] *[style*="background-color: #fff"],
        html[data-theme="dark"] td[bgcolor="white"] { background-color: transparent !important; }

        html[data-theme="dark"] table, html[data-theme="dark"] .table, html[data-theme="dark"] th, html[data-theme="dark"] td, html[data-theme="dark"] .tstyle1, html[data-theme="dark"] .tstyle2 {
            background-color: transparent !important; color: var(--text-main) !important; border-color: var(--border-color) !important;
        }
        html[data-theme="dark"] .infoop, html[data-theme="dark"] .infoop2, html[data-theme="dark"] .table th { background-color: var(--bg-content) !important; }
        .panel { background-color: var(--bg-content) !important; border-color: var(--border-color) !important; }
        .panel-heading, .panel-footer { background-color: var(--bg-hover) !important; border-color: var(--border-color) !important; color: var(--text-main) !important; }

        /* FORMS & DROPDOWNS */
        select, input[type="text"], input[type="password"], input[type="email"], textarea, .form-control {
            background-color: var(--input-bg) !important; color: var(--text-main) !important; border: 1px solid var(--border-color) !important;
            border-radius: 4px !important; padding: 6px 12px !important; font-family: 'Source Sans 3', sans-serif !important;
            outline: none !important; transition: border-color 0.2s ease;
        }
        select:focus, input:focus, textarea:focus, .form-control:focus { border-color: var(--accent-blue) !important; box-shadow: 0 0 5px var(--accent-blue) !important; }
        html[data-theme="dark"] select option { background-color: var(--bg-content) !important; color: var(--text-main) !important; }

        /* CALENDAR CAPTIONS */
        table caption {
            background-color: var(--bg-hover) !important; color: var(--text-main) !important; font-family: 'Klavika', sans-serif !important;
            font-size: 16px !important; font-weight: 600 !important; border: 1px solid var(--border-color) !important;
            border-bottom: none !important; padding: 10px !important; border-radius: 6px 6px 0 0 !important;
        }

        /* ALERTS */
        .alert, .infoop, .infoop2, .warning0, .warning1, .error0, .error1, .success0, .success1 {
            background-image: none !important; text-shadow: none !important; box-shadow: none !important; border-radius: 4px !important;
        }
        .alert-warning, .warning0, .warning1, #alerts > div[style*="#ffe0b3"], #alerts > div[style*="rgb(255, 224, 179)"] { background-color: var(--alert-warn-bg) !important; color: var(--alert-warn-text) !important; border: 1px solid var(--alert-warn-border) !important; }
        .alert-danger, .alert-error, .error0, .error1, #alerts > div[style*="#ffb3d1"], #alerts > div[style*="rgb(255, 179, 209)"] { background-color: var(--alert-err-bg) !important; color: var(--alert-err-text) !important; border: 1px solid var(--alert-err-border) !important; }
        .alert-success, .success0, .success1, #alerts > div[style*="#d9ffb3"], #alerts > div[style*="rgb(217, 255, 179)"] { background-color: var(--alert-succ-bg) !important; color: var(--alert-succ-text) !important; border: 1px solid var(--alert-succ-border) !important; }
        .alert-info, .infoop, .infoop2, #alerts > div[style*="#ccffff"], #alerts > div[style*="rgb(204, 255, 255)"] { background-color: var(--alert-info-bg) !important; color: var(--alert-info-text) !important; border: 1px solid var(--alert-info-border) !important; }
        #alerts > div { border-radius: 4px !important; text-shadow: none !important; }

        /* HIDING NATIVE GARBAGE */
        .fenixedu-bar, .navbar-inverse { display: none !important; }
        header[role="banner"] .logo-container { display: none !important; }

        /* HEADER CLONE */
        #headcounter { position: relative !important; z-index: 99998 !important; background-color: var(--bg-body) !important; }
        #headcounter .container {
            display: flex !important; justify-content: flex-start !important; align-items: center !important;
            width: 100% !important; max-width: 1200px !important; margin: 0 auto !important; position: relative !important;
            padding-top: 50px !important; padding-bottom: 25px !important;
        }
        .headerMenuPositioningCluster {
            display: flex !important; align-items: center !important; gap: 15px !important; font-family: 'Source Sans 3', sans-serif !important;
            position: absolute !important; right: 0px !important; top: 50% !important; transform: translateY(-50%) !important;
            margin: 0 !important; padding: 0 !important; z-index: 99999 !important;
        }
        .headerMenuPositioningCluster a:not(.locale-changer), .headerMenuPositioningCluster button {
            text-decoration: none !important; border-radius: 4px !important; font-size: 13px !important; font-weight: 600 !important;
            transition: all 0.2s !important; vertical-align: middle !important; margin: 0 !important; background: transparent !important;
            border: 1px solid var(--border-color) !important; color: var(--text-main) !important; padding: 4px 10px !important; cursor: pointer !important; outline: none !important;
        }
        .headerMenuPositioningCluster a:not(.locale-changer):hover, .headerMenuPositioningCluster button:hover { background-color: var(--bg-hover) !important; }
        .headerMenuPositioningCluster a.locale-changer { text-transform: uppercase !important; color: var(--text-muted) !important; font-weight: 600 !important; font-size: 13px !important; cursor: pointer !important; padding: 0 !important; border: none !important; outline: none !important; }
        .headerMenuPositioningCluster a.locale-changer.active { color: var(--text-main) !important; text-decoration: underline !important; }

        .user-profile-cluster {
            display: flex !important; align-items: center !important; gap: 8px !important; color: var(--text-main) !important;
            font-weight: 600 !important; font-size: 13px !important; padding: 0 10px !important;
            border-left: 1px solid var(--border-color) !important; border-right: 1px solid var(--border-color) !important;
        }
        .user-profile-cluster img { width: 24px !important; height: 24px !important; border-radius: 50% !important; border: 1px solid var(--border-color) !important; padding: 0 !important; background-color: var(--bg-body) !important; }
        #headcounter img.logo { content: url('https://raw.githubusercontent.com/josan07/fonts/main/fenix.png') !important; max-height: 90px !important; width: auto !important; object-fit: contain !important; margin-left: 0 !important; }
        html[data-theme="dark"] #headcounter img.logo { content: url('https://raw.githubusercontent.com/josan07/fonts/main/fenixdark.png') !important; }

        /* TOP MENU BAR */
        header[role="banner"] { background: transparent !important; border: none !important; max-width: 1200px !important; margin: 0 auto !important; padding: 0 !important; }
        header[role="banner"] nav#topNav { width: 100% !important; padding: 0 !important; }
        header[role="banner"] nav#topNav ul.nav-pills { display: flex !important; gap: 15px !important; background: transparent !important; border: none !important; box-shadow: none !important; outline: none !important; }
        header[role="banner"] nav#topNav ul.nav-pills > li { margin: 0 !important; background: transparent !important; border: none !important; outline: none !important; }
        header[role="banner"] nav#topNav ul.nav-pills > li > a, header[role="banner"] nav#topNav ul.nav-pills > li > a:focus, header[role="banner"] nav#topNav ul.nav-pills > li > a:active {
            background: transparent !important; background-color: transparent !important; color: var(--text-muted) !important; text-transform: uppercase !important; font-weight: 700 !important;
            font-size: 13px !important; letter-spacing: 1px !important; padding: 8px 0px !important; border-radius: 0 !important; border: none !important; border-bottom: 3px solid transparent !important;
            outline: none !important; box-shadow: none !important; transition: color 0.2s ease, border-color 0.2s ease !important;
        }
        header[role="banner"] nav#topNav ul.nav-pills > li > a:hover { color: var(--text-main) !important; background: transparent !important; background-color: transparent !important; border-color: transparent !important; outline: none !important; box-shadow: none !important; }
        header[role="banner"] nav#topNav ul.nav-pills > li.active > a, header[role="banner"] nav#topNav ul.nav-pills > li.active > a:focus, header[role="banner"] nav#topNav ul.nav-pills > li.active > a:hover, header[role="banner"] nav#topNav ul.nav-pills > li.active > a:active {
            color: var(--active-pill-bg) !important; background: transparent !important; background-color: transparent !important; border: none !important; border-bottom: 3px solid var(--active-pill-bg) !important; outline: none !important; box-shadow: none !important;
        }

        /* MAIN CONTENT */
        header[role="banner"] + div { max-width: 1200px !important; margin: 0 auto !important; padding: 0 !important; }
        #main-content-wrapper, .main-content {
            background-color: var(--bg-content) !important; color: var(--text-main) !important; padding: 30px !important;
            border-radius: 8px !important; border: 1px solid var(--border-color) !important; box-shadow: 0 4px 15px var(--shadow-color) !important;
            margin-bottom: 30px !important; min-height: 500px; transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        /* Breadcrumbs */
        .breadcrumb { background-color: transparent !important; padding: 0 0 15px 5px !important; margin: 0 !important; border-radius: 0 !important; }
        .breadcrumb > li > a { color: var(--text-muted) !important; font-weight: 500 !important; outline: none !important; }
        .breadcrumb > li > a:hover { color: var(--accent-blue) !important; }
        .breadcrumb > .active { color: var(--text-main) !important; }
        .breadcrumb > li + li:before { color: var(--text-muted) !important; }

        /* SIDEBAR ESQUERDA */
        nav#context { background-color: transparent !important; border: none !important; box-shadow: none !important; padding-top: 30px !important; }
        nav#context ul.nav-pills { margin-bottom: 20px !important; }
        nav#context .nav-pills > li > a { color: var(--text-main) !important; background-color: transparent !important; border-radius: 6px !important; font-weight: 500 !important; transition: background-color 0.2s ease, color 0.2s ease !important; padding: 8px 12px !important; margin-bottom: 2px !important; }
        nav#context .nav-pills > li > a:hover { background-color: var(--bg-hover) !important; color: var(--accent-blue) !important; }
        nav#context .nav-pills > li.active > a, nav#context .nav-pills > li.active > a:hover, nav#context .nav-pills > li.active > a:focus { background-color: var(--active-pill-bg) !important; color: var(--active-pill-text) !important; font-weight: 600 !important; outline: none !important; }
        nav#context .navheader { color: var(--text-muted) !important; text-transform: uppercase !important; font-size: 11px !important; letter-spacing: 0.5px !important; margin-top: 15px !important; margin-bottom: 5px !important; padding-left: 12px !important; border-bottom: 1px solid var(--border-color) !important; padding-bottom: 6px !important; }
        nav#context .navheader strong { font-family: 'Source Sans 3', sans-serif !important; font-weight: 700 !important; }

        /* BOOTSTRAP BUTTONS FIX */
        .btn, .btn-default { background-color: var(--bg-content) !important; background-image: none !important; color: var(--text-main) !important; border: 1px solid var(--border-color) !important; text-shadow: none !important; box-shadow: none !important; transition: all 0.2s ease !important; outline: none !important; }
        .btn:hover, .btn-default:hover, .btn:focus, .btn-default:focus { background-color: var(--bg-hover) !important; color: var(--accent-blue) !important; border-color: var(--border-color) !important; outline: none !important; }
        .btn.active, .btn-default.active, .btn:active, .btn-default:active, .btn-group > .btn.active { background-color: var(--active-pill-bg) !important; color: var(--active-pill-text) !important; border-color: var(--active-pill-bg) !important; box-shadow: none !important; }

        /* ==========================================
           MODERNIZAÇÃO DO HORÁRIO
           ========================================== */
        table.timetable {
            width: 100% !important; max-width: 100% !important; table-layout: fixed !important;
            border-collapse: collapse !important; background-color: transparent !important;
            border-radius: 8px !important; overflow: hidden !important;
            box-shadow: 0 4px 15px var(--shadow-color) !important; margin: 15px 0 30px 0 !important;
            border-style: hidden !important;
        }
        table.timetable th, table.timetable th.period-hours, table.timetable th[id^="weekday"] {
            background-color: var(--bg-hover) !important; background-image: none !important;
            color: var(--text-main) !important; font-family: 'Klavika', sans-serif !important;
            font-size: 14px !important; padding: 12px 5px !important; border: 1px solid var(--border-color) !important;
            text-align: center !important; font-weight: 600 !important;
        }
        table.timetable td.period-empty-slot { background-color: var(--bg-content) !important; background-image: none !important; border: 1px solid var(--border-color) !important; }
        table.timetable th:first-child { width: 12% !important; }

        table.timetable td {
            border: 1px solid var(--border-color) !important; font-family: 'Source Sans 3', sans-serif !important;
            font-size: 12px !important; padding: 6px !important; text-align: center !important; transition: filter 0.2s ease;
            line-height: 1.4 !important;
        }
        table.timetable td.period-first-slot { border-bottom: none !important; }
        table.timetable td.period-middle-slot { border-top: none !important; border-bottom: none !important; }
        table.timetable td.period-last-slot { border-top: none !important; }

        .jumbotron { width: 100% !important; box-sizing: border-box !important; background-color: var(--bg-hover) !important; border: 1px solid var(--border-color) !important; border-radius: 8px !important; padding: 20px !important; box-shadow: none !important; margin-bottom: 25px !important; }
        .jumbotron h4 { font-family: 'Klavika', sans-serif !important; font-weight: 600 !important; color: var(--text-main) !important; }
        .jumbotron label { color: var(--text-main) !important; font-weight: 600 !important; }

        table[style*="margin-left:5px"] { margin-top: 10px !important; width: 100% !important; background-color: var(--bg-hover) !important; border: 1px solid var(--border-color) !important; border-radius: 8px !important; padding: 15px !important; display: block !important; box-shadow: none !important; box-sizing: border-box !important; }
        table[style*="margin-left:5px"] td { padding: 6px 12px !important; color: var(--text-main) !important; background-color: transparent !important; border: none !important; font-family: 'Source Sans 3', sans-serif !important; font-size: 13px !important; }
        table[style*="margin-left:5px"] b { color: var(--accent-blue) !important; font-size: 14px !important; }

        /* GAY MODE EXCEPTIONS */
        @keyframes rainbowBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        html[data-color="gay"] .cluster-btn { border: 1px solid #d100c8 !important; }
        html[data-color="gay"] header[role="banner"] nav#topNav ul.nav-pills > li.active > a { background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D) !important; background-size: 300% 300% !important; animation: rainbowBG 6s ease infinite !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; border-bottom: 3px solid #d100c8 !important; }
        html[data-color="gay"] nav#context .nav-pills > li.active > a, html[data-color="gay"] nav#context .nav-pills > li.active > a:hover, html[data-color="gay"] nav#context .nav-pills > li.active > a:focus { background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D) !important; background-size: 300% 300% !important; animation: rainbowBG 6s ease infinite !important; color: white !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.8) !important; border-color: transparent !important; }
        html[data-color="gay"] .btn.active, html[data-color="gay"] .btn-default.active { background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D) !important; background-size: 300% 300% !important; animation: rainbowBG 6s ease infinite !important; color: white !important; border-color: transparent !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.8) !important; }
    `;

    const styleElem = document.createElement('style');
    styleElem.textContent = customCSS;
    document.documentElement.appendChild(styleElem);

    function initUI() {
        if (currentTheme === 'dark' && document.body) { document.body.style.setProperty('opacity', '1', 'important'); }

        const currentPath = window.location.pathname;
        const leftMenuLinks = document.querySelectorAll('nav#context .nav-pills > li > a');
        leftMenuLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.parentElement.classList.add('active');
            }
        });

        const mainHeader = document.querySelector('header[role="banner"]');
        if (!mainHeader) return;

        let existingHeadcounter = document.getElementById('headcounter');
        if (existingHeadcounter) existingHeadcounter.remove();

        const headcounter = document.createElement('div');
        headcounter.id = 'headcounter';
        headcounter.innerHTML = `
            <div class="container">
                <a href="http://tecnico.ulisboa.pt" target="_blank" class="logo-link">
                    <img class="logo" src="/api/bennu-portal/configuration/logo" title="Técnico Lisboa">
                </a>
                <div class="headerMenuPositioningCluster"></div>
            </div>
        `;

        mainHeader.parentNode.insertBefore(headcounter, mainHeader);
        const finalHeaderCluster = headcounter.querySelector('.headerMenuPositioningCluster');

        const localeChangers = document.querySelectorAll('.locale-changer');
        localeChangers.forEach(btn => finalHeaderCluster.appendChild(btn));
        const pullRightSpan = document.querySelector('.breadcrumb .pull-right');
        if (pullRightSpan) pullRightSpan.remove();

        const combinedThemeContainer = document.createElement('div');
        combinedThemeContainer.style.position = 'relative';
        combinedThemeContainer.style.display = 'inline-block';
        combinedThemeContainer.style.verticalAlign = 'middle';

        const themeBtnText = isEN ? 'Theme ▼' : 'Tema ▼';
        const themeBtn = document.createElement('button');
        themeBtn.innerHTML = themeBtnText;
        themeBtn.className = 'cluster-btn';

        const themeMenu = document.createElement('div');
        themeMenu.style.display = 'none';
        themeMenu.style.position = 'absolute';
        themeMenu.style.top = '100%';
        themeMenu.style.right = '0';
        themeMenu.style.marginTop = '5px';
        themeMenu.style.backgroundColor = 'var(--bg-content)';
        themeMenu.style.border = '1px solid var(--border-color)';
        themeMenu.style.borderRadius = '6px';
        themeMenu.style.boxShadow = '0 4px 12px var(--shadow-color)';
        themeMenu.style.zIndex = '10000';
        themeMenu.style.minWidth = '160px';
        themeMenu.style.overflow = 'hidden';

        const toggleItem = document.createElement('div');
        toggleItem.style.padding = '8px 12px';
        toggleItem.style.cursor = 'pointer';
        toggleItem.style.fontSize = '13px';
        toggleItem.style.color = 'var(--text-main)';
        toggleItem.style.fontWeight = '600';

        function updateToggleText() {
            let modeStr = '';
            if (savedTheme === 'system') modeStr = isEN ? 'Mode: System' : 'Modo: Automático';
            else if (savedTheme === 'dark') modeStr = isEN ? 'Mode: Dark' : 'Modo: Escuro';
            else modeStr = isEN ? 'Mode: Light' : 'Modo: Claro';
            toggleItem.innerText = modeStr;
        }
        updateToggleText();

        toggleItem.onmouseover = () => toggleItem.style.backgroundColor = 'var(--bg-hover)';
        toggleItem.onmouseout = () => toggleItem.style.backgroundColor = 'transparent';

        toggleItem.onclick = (e) => {
            e.stopPropagation();
            if (savedTheme === 'system') savedTheme = 'light';
            else if (savedTheme === 'light') savedTheme = 'dark';
            else savedTheme = 'system';
            localStorage.setItem(themeStorageKey, savedTheme);
            location.reload();
        };
        themeMenu.appendChild(toggleItem);

        const disableItem = document.createElement('div');
        disableItem.style.padding = '8px 12px';
        disableItem.style.cursor = 'pointer';
        disableItem.style.fontSize = '13px';
        disableItem.style.color = '#e63946';
        disableItem.style.fontWeight = '600';
        disableItem.innerText = isEN ? 'Disable Script ⚡' : 'Desativar Script ⚡';

        disableItem.onmouseover = () => disableItem.style.backgroundColor = 'var(--bg-hover)';
        disableItem.onmouseout = () => disableItem.style.backgroundColor = 'transparent';

        disableItem.onclick = (e) => {
            e.stopPropagation();
            localStorage.setItem(scriptEnabledKey, 'false');
            location.reload();
        };
        themeMenu.appendChild(disableItem);

        const separator = document.createElement('div');
        separator.style.height = '1px';
        separator.style.backgroundColor = 'var(--border-color)';
        separator.style.margin = '4px 0';
        themeMenu.appendChild(separator);

        Object.keys(colorPalettes).forEach(key => {
            const item = document.createElement('div');
            item.style.padding = '8px 12px';
            item.style.cursor = 'pointer';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.fontSize = '13px';
            item.style.color = 'var(--text-main)';
            item.onmouseover = () => item.style.backgroundColor = 'var(--bg-hover)';
            item.onmouseout = () => item.style.backgroundColor = 'transparent';

            const colorDot = document.createElement('span');
            colorDot.style.display = 'inline-block';
            colorDot.style.width = '12px';
            colorDot.style.height = '12px';
            colorDot.style.borderRadius = '50%';
            if (key === 'gay') colorDot.style.background = 'linear-gradient(45deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D)';
            else colorDot.style.backgroundColor = colorPalettes[key].base;
            colorDot.style.marginRight = '8px';
            colorDot.style.border = '1px solid var(--border-color)';

            item.appendChild(colorDot);
            const localizedName = isEN ? colorPalettes[key].nameEN : colorPalettes[key].namePT;
            item.appendChild(document.createTextNode(localizedName));
            item.onclick = () => { applyColor(key); themeMenu.style.display = 'none'; };
            themeMenu.appendChild(item);
        });

        themeBtn.onclick = (e) => { e.stopPropagation(); themeMenu.style.display = themeMenu.style.display === 'none' ? 'block' : 'none'; };
        document.addEventListener('click', () => { themeMenu.style.display = 'none'; });

        combinedThemeContainer.appendChild(themeBtn);
        combinedThemeContainer.appendChild(themeMenu);
        finalHeaderCluster.appendChild(combinedThemeContainer);

        const oldProfileLink = document.querySelector('.navbar-right img.img-circle')?.closest('a');
        if (oldProfileLink) {
            const profileDiv = document.createElement('div');
            profileDiv.className = 'user-profile-cluster';

            const img = document.createElement('img');
            img.src = oldProfileLink.querySelector('img').src;

            const nameSpan = document.createElement('span');
            nameSpan.innerText = oldProfileLink.textContent.trim();

            profileDiv.appendChild(img);
            profileDiv.appendChild(nameSpan);

            finalHeaderCluster.appendChild(profileDiv);
        }

        const oldLogout = document.querySelector('.navbar-right a[href*="logout"]');
        if (oldLogout) {
            const logoutBtn = document.createElement('a');
            logoutBtn.href = oldLogout.href;
            logoutBtn.innerText = 'Logout';
            logoutBtn.className = 'cluster-btn';

            logoutBtn.onmouseover = () => {
                logoutBtn.style.setProperty('background-color', '#e63946', 'important');
                logoutBtn.style.setProperty('color', '#ffffff', 'important');
                logoutBtn.style.setProperty('border-color', '#e63946', 'important');
            };
            logoutBtn.onmouseout = () => {
                logoutBtn.style.setProperty('background-color', 'transparent', 'important');
                logoutBtn.style.setProperty('color', 'var(--text-main)', 'important');
                logoutBtn.style.setProperty('border-color', 'var(--border-color)', 'important');
            };

            finalHeaderCluster.appendChild(logoutBtn);
        }

        // ==========================================
        // TIMETABLE MODIFICATIONS
        // ==========================================
        const timetables = document.querySelectorAll('table.timetable');

        timetables.forEach(timetable => {
            // 1. Remove Saturday Column
            const satHeader = timetable.querySelector('#weekday5');
            if (satHeader) {
                satHeader.remove();
                const rows = timetable.querySelectorAll('tr');
                rows.forEach(row => {
                    const satFilled = row.querySelector('td[headers~="weekday5"]');
                    if (satFilled) satFilled.remove();
                    const lastChild = row.lastElementChild;
                    if (lastChild && lastChild.tagName === 'TD' && lastChild.classList.contains('period-empty-slot')) {
                        if (!lastChild.hasAttribute('colspan') || lastChild.getAttribute('colspan') === '1') {
                            lastChild.remove();
                        }
                    }
                });
            }

            // 2. Color Logic & Text Formatting for Filled Slots
            const filledSlots = timetable.querySelectorAll('td[style*="background"]');
            const originalColors = [];

            filledSlots.forEach(td => {
                const bg = td.style.backgroundColor;
                if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)' && !originalColors.includes(bg)) {
                    originalColors.push(bg);
                }
            });

            filledSlots.forEach(td => {
                // FORMAT TEXT: Find the end of the </a> tag, look for spaces, and insert <br>
                let cellHtml = td.innerHTML;
                cellHtml = cellHtml.replace(/<\/a>(?:\s|&nbsp;)*\(/i, '</a><br>(');
                td.innerHTML = cellHtml;

                // ASSIGN SPECIFIC THEME PALETTE COLORS
                const bg = td.style.backgroundColor;
                const colorIndex = originalColors.indexOf(bg);

                if (currentColor !== 'gay' && colorPalettes[currentColor].timetable) {
                    const themeColors = colorPalettes[currentColor].timetable;
                    // Loop back to the start of the 10 colors if the student has more than 10 subjects
                    const assignedHex = themeColors[colorIndex % themeColors.length];
                    const textColor = getContrastYIQ(assignedHex);

                    td.style.setProperty('background-color', assignedHex, 'important');
                    td.style.setProperty('background-image', 'none', 'important');
                    td.style.setProperty('filter', 'none', 'important');
                    td.style.setProperty('color', textColor, 'important');
                    td.style.setProperty('border-color', 'rgba(0,0,0,0.15)', 'important');

                    const innerElements = td.querySelectorAll('a, span');
                    innerElements.forEach(el => {
                        el.style.setProperty('color', textColor, 'important');
                        el.style.setProperty('text-shadow', 'none', 'important');
                        if (el.tagName === 'A') {
                            el.style.setProperty('font-weight', '700', 'important');
                        }
                    });
                } else {
                    // Fallback para o modo jeb_ (gay)
                    td.style.setProperty('background-color', 'var(--active-pill-bg)', 'important');
                    td.style.setProperty('background-image', 'none', 'important');
                    td.style.setProperty('filter', 'none', 'important');
                    td.style.setProperty('color', '#121212', 'important');

                    const innerElements = td.querySelectorAll('a, span');
                    innerElements.forEach(el => {
                        el.style.setProperty('color', '#121212', 'important');
                        el.style.setProperty('text-shadow', 'none', 'important');
                        if (el.tagName === 'A') {
                            el.style.setProperty('font-weight', '700', 'important');
                        }
                    });
                }
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initUI);
    else initUI();
})();
