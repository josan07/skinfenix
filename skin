// ==UserScript==
// @name         FenixOnSteroids
// @namespace    http://tampermonkey.net/
// @version      2.21
// @description  Melhor interface para as páginas das cadeiras
// @author       josan07
// @match        *://fenix.tecnico.ulisboa.pt/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // ESTADO E ARMAZENAMENTO
    // ==========================================
    const themeStorageKey = 'fenix-theme-preference';
    const colorStorageKey = 'fenix-color-preference';

    let currentTheme = localStorage.getItem(themeStorageKey) || 'dark';
    let currentColor = localStorage.getItem(colorStorageKey) || 'tecnico';

    document.documentElement.setAttribute('data-theme', currentTheme);

    // Definição das paletas de cor
    const colorPalettes = {
        'tecnico': { name: 'Técnico', base: '#009de0', hover: '#007dba' },
        'gay':     { name: 'Arco-Íris', base: '#d100c8', hover: '#ff007f' },
        'red':     { name: 'Vermelho', base: '#e63946', hover: '#d62828' },
        'green':   { name: 'Verde', base: '#2a9d8f', hover: '#21867a' }
    };

    // Aplica as variáveis de cor dinamicamente na raiz (HTML)
    function applyColor(colorKey) {
        const theme = colorPalettes[colorKey];
        const rootStyle = document.documentElement.style;

        rootStyle.setProperty('--accent-blue', theme.base);
        rootStyle.setProperty('--accent-blue-hover', theme.hover);
        rootStyle.setProperty('--active-pill-bg', theme.base);

        localStorage.setItem(colorStorageKey, colorKey);
        currentColor = colorKey;

        // Injeta a cor atual como atributo para o CSS condicional
        document.documentElement.setAttribute('data-color', colorKey);
    }

    // Inicializa a cor
    applyColor(currentColor);

    // ==========================================
    // ESTILOS GERAIS (CSS)
    // ==========================================
    const customCSS = `
        /* ===================================================
           IMPORTAÇÃO DE FONTES DO GITHUB
           =================================================== */
        @font-face { font-family: 'Klavika'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/Klavika-Regular.otf') format('opentype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: 'Klavika'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/klavika-medium.otf') format('opentype'); font-weight: 500; font-style: normal; }
        @font-face { font-family: 'Klavika'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/klavika-bold.otf') format('opentype'); font-weight: 700; font-style: normal; }

        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Light.ttf') format('truetype'); font-weight: 300; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-SemiBold.ttf') format('truetype'); font-weight: 600; font-style: normal; }
        @font-face { font-family: 'Source Sans 3'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/SourceSans3-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; }

        /* FONTES MINECRAFT PARA O MODO ARCO-ÍRIS */
        @font-face { font-family: 'Minecraft'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/MinecraftRegular.otf') format('opentype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: 'Minecraft'; src: url('https://raw.githubusercontent.com/josan07/fonts/main/MinecraftBold.otf') format('opentype'); font-weight: 700; font-style: normal; }

        /* ===================================================
           PALETAS DE CORES BASE (Fundo e Texto)
           =================================================== */
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
        }

        /* ===================================================
           ESTILOS GERAIS DO FÉNIX E TÍTULOS REFORÇADOS
           =================================================== */
        body, html {
            background-color: var(--bg-body) !important;
            color: var(--text-main) !important;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        body, html, p, span, div, li {
            font-family: 'Source Sans 3', sans-serif !important;
            font-weight: 400 !important;
            font-size: 15px;
        }

        .small, small, p[style*="color:#888"], span[style*="color:#888"], span[style*="color:#ddd"] {
            font-weight: 300 !important;
            color: var(--text-muted) !important;
        }

        h1, h2, h3, h4, h5, h6, .modal-title {
            font-family: 'Klavika', sans-serif !important;
            color: var(--text-main) !important;
        }
        h3 { font-weight: 500 !important; }

        /* MEGA ESPAÇAMENTO PARA O TÍTULO RESPIRAR */
        .page-header {
            margin-top: 60px !important;
            padding-bottom: 15px !important;
            border-bottom: 1px solid var(--border-color) !important;
        }

        #content-block > h2:first-of-type,
        .main-content > h2:first-of-type,
        .container > h2:first-of-type {
            margin-top: 60px !important;
            margin-bottom: 30px !important;
        }

        .site-header, .site-header a:first-child {
            font-family: 'Klavika', sans-serif !important;
            font-size: 38px !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
        }

        .site-header a[data-toggle="modal"] {
            font-family: 'Source Sans 3', sans-serif !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            vertical-align: middle;
        }

        h5, h5 a {
            font-family: 'Klavika', sans-serif !important;
            font-weight: 500 !important;
            font-size: 20px !important;
        }

        a {
            font-family: 'Source Sans 3', sans-serif !important;
            font-weight: 500 !important;
            color: var(--accent-blue) !important;
            transition: color 0.2s ease-in-out;
        }
        a:hover {
            color: var(--accent-blue-hover) !important;
            text-decoration: underline !important;
        }

        table, .table, th, td, [class*="tstyle"], .infoop {
            background-color: transparent !important;
            color: var(--text-main) !important;
            border-color: var(--border-color) !important;
            font-family: 'Source Sans 3', sans-serif !important;
        }

        .table th, th, .infoop {
            background-color: var(--bg-hover) !important;
            font-weight: 600 !important;
        }

        .table-hover > tbody > tr:hover > td,
        .table-hover > tbody > tr:hover > th {
            background-color: var(--bg-hover) !important;
        }

        input[type="text"], input[type="password"], input[type="email"], input[type="number"],
        textarea, select, .form-control {
            background-color: var(--input-bg) !important;
            color: var(--text-main) !important;
            border: 1px solid var(--border-color) !important;
            border-radius: 4px !important;
            padding: 4px 8px !important;
        }

        input:focus, textarea:focus, select:focus, .form-control:focus {
            border-color: var(--accent-blue) !important;
            outline: none !important;
            box-shadow: 0 0 5px var(--accent-blue) !important;
        }

        /* ===================================================
           BARRA DE CIMA REFORÇADA E CONSOLIDAÇÃO DE MENUS
           =================================================== */
        #headcounter .container {
            display: flex !important;
            justify-content: flex-start !important; /* Força os elementos do fluxo normal para a esquerda */
            align-items: center !important;
            width: 100% !important;
            max-width: 1200px !important; /* Ou a largura que preferires */
            margin: 0 auto !important;
            position: relative !important;
        }

        /* Garante que o Logo se encosta à esquerda e empurra o resto se necessário */
        .site-header a:first-child,
        .navbar-brand,
        .navbar-header {
            margin-right: auto !important;
            margin-left: 0 !important;
            display: inline-block !important;
        }

        /* Conjunto final de Menus e Botões no topo direito */
        .headerMenuPositioningCluster {
            display: flex !important;
            align-items: center !important;
            gap: 15px !important;
            font-family: 'Source Sans 3', sans-serif !important;
            position: absolute !important;
            right: 0px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .headerMenuPositioningCluster a,
        .headerMenuPositioningCluster button {
            text-decoration: none !important;
            border-radius: 4px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            transition: all 0.2s !important;
            vertical-align: middle !important;
            margin: 0 !important;
        }

        /* Ajuste fino nos links de língua para o topo */
        .headerMenuPositioningCluster a[href*="locale"] {
            text-transform: uppercase !important;
            color: var(--text-main) !important;
        }

        #content-block, .main-content {
            background-color: var(--bg-content) !important;
            color: var(--text-main) !important;
            padding: 25px !important;
            border-radius: 8px !important;
            border: 1px solid var(--border-color) !important;
            box-shadow: 0 4px 15px var(--shadow-color);
            margin-bottom: 30px !important;
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        nav.col-sm-3, .sidebar-module {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }

        .panel, .well, .modal-content, .alert {
            background-color: var(--bg-content) !important;
            color: var(--text-main) !important;
            border-color: var(--border-color) !important;
            transition: background-color 0.3s ease;
        }

        /* --- MENUS E BARRAS ATIVAS --- */
        .nav-pills > li > a {
            color: var(--text-main) !important;
            background-color: transparent !important;
            border-radius: 6px !important;
            font-weight: 500 !important;
            transition: background-color 0.2s ease;
        }
        .nav-pills > li > a:hover {
            background-color: var(--bg-hover) !important;
        }

        .nav-pills > li.active > a:not([href*="rss"]),
        .nav-pills > li.active > a:not([href*="rss"]):hover,
        .nav-pills > li.active > a:not([href*="rss"]):focus {
            background-color: var(--active-pill-bg) !important;
            color: var(--active-pill-text) !important;
            font-weight: 600 !important;
        }

        .nav-tabs { border-bottom-color: var(--border-color) !important; }
        .nav-tabs > li > a { font-weight: 500 !important; }
        .nav-tabs > li > a:hover {
            background-color: var(--bg-hover) !important;
            border-color: var(--border-color) !important;
        }
        .nav-tabs > li.active > a,
        .nav-tabs > li.active > a:hover,
        .nav-tabs > li.active > a:focus {
            background-color: var(--bg-body) !important;
            color: var(--text-main) !important;
            border-color: var(--border-color) !important;
            border-bottom-color: transparent !important;
        }

        hr, footer { border-top-color: var(--border-color) !important; }
        .modal-header, .modal-footer { border-color: var(--border-color) !important; }

        .badge {
            background-color: var(--bg-hover) !important;
            color: var(--text-main) !important;
            font-family: 'Source Sans 3', sans-serif !important;
            font-weight: 600 !important;
            border: 1px solid var(--border-color) !important;
        }

        div[style*="background-color: white"], div[style*="background-color: #fff"], div[style*="background-color:#ffffff"],
        td[style*="background-color: white"], th[style*="background-color: white"] {
            background-color: transparent !important;
        }

        .img-circle {
            border: 2px solid var(--border-color) !important;
            padding: 2px !important;
            background-color: var(--bg-body) !important;
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        /* ===================================================
           CORREÇÃO DE ÍCONES (RSS / Sidebar)
           =================================================== */
        .nav-pills > li { position: relative; }

        .nav-pills > li > a:not([href*="rss"]) {
            padding-right: 35px !important;
            position: relative;
            z-index: 1 !important;
        }

        .nav-pills > li > a[href*="rss"] {
            position: absolute !important;
            right: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            padding: 0 !important;
            margin: 0 !important;
            background-color: transparent !important;
            border: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 10 !important;
        }

        .nav-pills > li > a[href*="rss"] img {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            transition: filter 0.2s ease;
        }

        .nav-pills > li > a[href*="rss"] img { filter: opacity(0.5); }
        .nav-pills > li > a[href*="rss"]:hover img { filter: opacity(0.8); }

        html[data-theme="dark"] .nav-pills > li > a[href*="rss"] img { filter: invert(1) opacity(0.6); }
        html[data-theme="dark"] .nav-pills > li > a[href*="rss"]:hover img { filter: invert(1) opacity(0.9); }

        .nav-pills > li.active > a[href*="rss"] img {
            filter: brightness(0) invert(1) !important;
            opacity: 1 !important;
        }

        /* ===================================================
           LOGÓTIPOS PERSONALIZADOS DO GITHUB
           =================================================== */
        .navbar-brand img,
        .navbar-header img,
        .site-header a:first-child > img,
        a[href*="tecnico.ulisboa.pt"] img {
            content: url('https://raw.githubusercontent.com/josan07/fonts/main/fenix.png') !important;
            max-height: 90px !important; /* MEGA AUMENTO */
            width: auto !important;
            object-fit: contain !important;
            transition: content 0.3s ease-in-out;
            margin-left: 0 !important; /* Garante que a imagem fica encostada à margem esquerda do link */
        }

        /* Modo Escuro - Muda automaticamente para fenixdark.png */
        html[data-theme="dark"] .navbar-brand img,
        html[data-theme="dark"] .navbar-header img,
        html[data-theme="dark"] .site-header a:first-child > img,
        html[data-theme="dark"] a[href*="tecnico.ulisboa.pt"] img {
            content: url('https://raw.githubusercontent.com/josan07/fonts/main/fenixdark.png') !important;
        }


        /* ===================================================
           MODO GAY (THE ULTIMATE PRIDE + MINECRAFT)
           =================================================== */

        :root {
            var(--pride-gradient): linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D);
        }

        @keyframes rainbowBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        html[data-color="gay"] .nav-pills > li.active > a:not([href*="rss"]),
        html[data-color="gay"] .nav-pills > li.active > a:not([href*="rss"]):hover,
        html[data-color="gay"] .nav-tabs > li.active > a,
        html[data-color="gay"] .nav-tabs > li.active > a:hover,
        html[data-color="gay"] .nav-tabs > li.active > a:focus {
            background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D) !important;
            background-size: 300% 300% !important;
            animation: rainbowBG 6s ease infinite !important;
            color: white !important;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.8) !important;
            border-color: transparent !important;
        }

        html[data-color="gay"] #headcounter {
            border-bottom: 3px solid transparent !important;
            border-image: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D) 1 !important;
        }

        html[data-color="gay"] .badge {
            background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D) !important;
            background-size: 300% 300% !important;
            animation: rainbowBG 6s ease infinite !important;
            color: white !important;
            border: none !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.6) !important;
        }

        /* Força todos os títulos a usarem a fonte Minecraft neste modo e aplica o gradiente animado */
        html[data-color="gay"] h1,
        html[data-color="gay"] h2,
        html[data-color="gay"] h3,
        html[data-color="gay"] h4,
        html[data-color="gay"] h5,
        html[data-color="gay"] h6,
        html[data-color="gay"] .modal-title,
        html[data-color="gay"] .site-header,
        html[data-color="gay"] .site-header a,
        html[data-color="gay"] .page-header h2 {
            font-family: 'Minecraft', sans-serif !important;
            background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D);
            background-size: 300% 300%;
            animation: rainbowBG 6s ease infinite;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            color: transparent !important;
            text-shadow: none !important;
        }
    `;

    const styleElem = document.createElement('style');
    styleElem.id = 'fenix-custom-theme-style';
    styleElem.innerHTML = customCSS;
    document.head.appendChild(styleElem);

    // ==========================================
    // INTERFACE DOS BOTÕES E CONSOLIDAÇÃO DE MENUS
    // ==========================================
    function initUI() {
        const topHeaderContainer = document.querySelector('#headcounter .container');
        if (!topHeaderContainer) return;

        // --- A. Conjunto de Menus do Topo ---
        const finalHeaderCluster = document.createElement('div');
        finalHeaderCluster.classList.add('headerMenuPositioningCluster');

        // --- B. Clonagem Inteligente do Conjunto de Menus da Lateral ---
        // Localiza o conjunto original na barra lateral
        const oldLinksParentDiv = document.querySelector('.col-sm-3.hidden-xs > div');

        if (oldLinksParentDiv) {
            // Localiza todos os links (Línguas, etc.) dentro dele
            const sideLinks = oldLinksParentDiv.querySelectorAll('a');

            // Clona e move os links para o novo menu no topo
            sideLinks.forEach(link => {
                const clink = link.cloneNode(true);
                finalHeaderCluster.appendChild(clink);
            });

            // Elimina o contentor antigo da lateral para libertar espaço
            const oldLinksGrandparent = oldLinksParentDiv.closest('.col-sm-3.hidden-xs');
            if (oldLinksGrandparent) {
                oldLinksGrandparent.remove();
            } else {
                oldLinksParentDiv.remove();
            }
        }

        // --- 1. Botão Homepage ---
        const homeBtn = document.createElement('a');
        homeBtn.href = 'https://fenix.tecnico.ulisboa.pt/messaging';
        homeBtn.innerText = 'Homepage';
        homeBtn.style.padding = '4px 10px';
        homeBtn.style.background = 'transparent';

        // Adiciona ao cluster
        finalHeaderCluster.appendChild(homeBtn);

        // --- 2. Menu Integrado Unificado (Tema e Cores) ---
        const combinedThemeContainer = document.createElement('div');
        combinedThemeContainer.style.position = 'relative';
        combinedThemeContainer.style.display = 'inline-block';
        combinedThemeContainer.style.margin = '0';
        combinedThemeContainer.style.padding = '0';
        combinedThemeContainer.style.verticalAlign = 'middle';

        const themeBtn = document.createElement('button');
        themeBtn.innerHTML = 'Tema ▼';
        themeBtn.style.padding = '4px 10px';
        themeBtn.style.cursor = 'pointer';
        themeBtn.style.background = 'transparent';

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
        themeMenu.style.minWidth = '130px';
        themeMenu.style.overflow = 'hidden';

        // 2.1 Opção: Alternar Escuro/Claro (com texto limpo)
        const toggleItem = document.createElement('div');
        toggleItem.style.padding = '8px 12px';
        toggleItem.style.cursor = 'pointer';
        toggleItem.style.fontSize = '13px';
        toggleItem.style.color = 'var(--text-main)';
        toggleItem.style.fontWeight = '600';
        toggleItem.style.transition = 'background-color 0.2s';

        function updateToggleText() {
            toggleItem.innerText = currentTheme === 'dark' ? 'Modo: Claro' : 'Modo: Escuro';
        }
        updateToggleText();

        toggleItem.onmouseover = () => toggleItem.style.backgroundColor = 'var(--bg-hover)';
        toggleItem.onmouseout = () => toggleItem.style.backgroundColor = 'transparent';

        toggleItem.onclick = (e) => {
            e.stopPropagation();
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem(themeStorageKey, currentTheme);
            document.documentElement.setAttribute('data-theme', currentTheme);
            updateToggleText();
            updateButtonVisuals();
        };
        themeMenu.appendChild(toggleItem);

        // Separador Visual
        const separator = document.createElement('div');
        separator.style.height = '1px';
        separator.style.backgroundColor = 'var(--border-color)';
        separator.style.margin = '4px 0';
        themeMenu.appendChild(separator);

        // 2.2 Opções: Paleta de Cores (sem emojis)
        Object.keys(colorPalettes).forEach(key => {
            const item = document.createElement('div');
            item.style.padding = '8px 12px';
            item.style.cursor = 'pointer';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.fontSize = '13px';
            item.style.color = 'var(--text-main)';
            item.style.transition = 'background-color 0.2s';

            item.onmouseover = () => item.style.backgroundColor = 'var(--bg-hover)';
            item.onmouseout = () => item.style.backgroundColor = 'transparent';

            const colorDot = document.createElement('span');
            colorDot.style.display = 'inline-block';
            colorDot.style.width = '12px';
            colorDot.style.height = '12px';
            colorDot.style.borderRadius = '50%';

            if (key === 'gay') {
                colorDot.style.background = 'linear-gradient(45deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D)';
            } else {
                colorDot.style.backgroundColor = colorPalettes[key].base;
            }

            colorDot.style.marginRight = '8px';
            colorDot.style.border = '1px solid var(--border-color)';

            item.appendChild(colorDot);
            item.appendChild(document.createTextNode(colorPalettes[key].name));

            item.onclick = () => {
                applyColor(key);
                themeMenu.style.display = 'none';
            };

            themeMenu.appendChild(item);
        });

        // Eventos do Dropdown
        themeBtn.onclick = (e) => {
            e.stopPropagation();
            themeMenu.style.display = themeMenu.style.display === 'none' ? 'block' : 'none';
        };

        document.addEventListener('click', () => {
            themeMenu.style.display = 'none';
        });

        combinedThemeContainer.appendChild(themeBtn);
        combinedThemeContainer.appendChild(themeMenu);

        // Adiciona ao cluster
        finalHeaderCluster.appendChild(combinedThemeContainer);

        // --- 3. Lógica de Atualização Visual dos Botões ---
        function updateButtonVisuals() {
            const isDark = (currentTheme === 'dark');
            const borderColor = isDark ? '1px solid #555' : '1px solid #ccc';
            const textColor = isDark ? '#e0e0e0' : '#333333';

            // Homepage e Cor dropdown
            homeBtn.style.color = textColor;
            homeBtn.style.border = borderColor;
            themeBtn.style.color = textColor;
            themeBtn.style.border = borderColor;
        }

        updateButtonVisuals();

        // --- 4. Inserção final no DOM ---
        // Coloca o novo cluster consolidado no topodireito do cabeçalho
        topHeaderContainer.appendChild(finalHeaderCluster);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        initUI();
    }

})();
