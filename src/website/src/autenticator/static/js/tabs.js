(function () {
    function URLQueryString(url) {
        this.url = String(url); this.querystringRegex = RegExp('[\?&]?([^&#=]*)=([^&#]*)*', 'g'); let queryStringItens = []; let retorno; while ((retorno = this.querystringRegex.exec(this.url)) !== null) { let queryStringItem = {}; queryStringItem[retorno[1]] = retorno[2]; queryStringItens.push(queryStringItem); }
        this.queryStringItens = queryStringItens; this.get_string = function (string) { return encodeURIComponent(string) }; this.getQuerystringValue = function (name) { let queryStringItem = getQuerystringItem(name); return queryStringItem && queryStringItem[name] }; this.getQuerystringItem = function (name) { return this.queryStringItens.filter(dict => dict[name])[0]; }; this.getQuerystringItens = function () { return this.queryStringItens; }; this.delete = function (name) { this.queryStringItens = this.queryStringItens.filter(item => Object.keys(item) != name) }; this.entries = function () { foo = { [Symbol.iterator]: () => ({ items: this.queryStringItens.slice(), next: function next() { return { done: this.items.length === 0, value: this.items.shift() } } }) }; return foo; }; this.forEach = function (callback) { this.queryStringItens.forEach(callback); }; this._getAllPair = function (name) { return this.queryStringItens.filter(item => Object.keys(item) == name); }; this._getPair = function (name) { return this._getAllPair(name)[0] || null; }; this.getAll = function (name) { return this._getAllPair(name).map(item => item[name]); }; this.get = function (name) { return this._getPair(name) && this._getPair(name)[name]; }; this.has = function (name) { return this.get(name) === null ? false : true; }; this.keys = function () { return this.queryStringItens.map(item => Object.keys(item)[0]); }; this.append = function (name, value) { let queryStringItem = {}; queryStringItem[name] = value; this.queryStringItens.push(queryStringItem); }; this.set = function (name, value) {
            let pairs = this._getAllPair(name); if (pairs) { this.delete(name); }
            this.append(name, value);
        }; this.sort = function () { this.queryStringItens.sort((x, y) => Object.keys(x) > Object.keys(y) ? 1 : -1); }; this.toString = function () { return this.queryStringItens.map(item => Object.keys(item) + '=' + Object.values(item)).join('&'); }; this.values = function () { return this.queryStringItens.map(item => Object.values(item)[0]); }; this.isEmpty = function () { return this.values().length == 0; };
    }
    initTabs = function (index) {
        let html = '<ul class="tabs with-content">'; let active_tab = false; jQuery(".tab-container:not([data-titled-tab=true])").each(function (idx) {
            let attr = ""; let css_parent = ""; let title = jQuery(this).data("title"); let tab_name = jQuery(this).data("tab"); let checked = jQuery(this).data("checked"); let counter = jQuery(this).data("counter"); let hide_tab = jQuery(this).data("hide-tab-on-counter-zero"); let info = jQuery(this).data("tab-info"); if (!tab_name) { tab_name = idx; }
            if (info) { css_parent += " tab-info"; }
            let urlQueryString = new URLQueryString(window.location.search); if (urlQueryString.has('tab')) { if (urlQueryString.get('tab') == tab_name) { css_parent += " active"; active_tab = tab_name; } } else { if (active_tab === false) { if (typeof counter === 'undefined' || counter > 0 || (counter === 0 && typeof hide_tab === 'undefined')) { css_parent += " active"; active_tab = tab_name; } } }
            let css = ""; if (checked) { if (checked == "True" || checked == "true") { css = ' class="checked"'; } else { css = ' class="unchecked"'; } }
            if (counter == 0 && hide_tab === true) { attr += ' hidden'; }
            html += '<li class="' + css_parent + '" ' + attr + '><a href="#" data-tab="' + tab_name + '"' + css + '>' + title; if (counter > 0) { html += '<span class="badge">' + counter + '</span>'; }
            html += '</a></li>';
        }); html += '</ul>'; jQuery(html).insertBefore(".tab-container:not([data-titled-tab=true]):first"); changeTabs(active_tab, true); jQuery('.tabs a').click(function () {
            let tab = jQuery(this).data("tab"); let url = ''; let urlQueryString = new URLQueryString(window.location.search); urlQueryString.set('tab', tab); url = `?${urlQueryString.toString()}`; let item = jQuery(".tab-container:not([data-titled-tab=true]):eq(" + tab + ")"); history.pushState({}, '', url); if (isNaN(tab)) { item = jQuery(".tab-container:not([data-titled-tab=true])[data-tab='" + tab + "']"); }
            if (!item.html().trim()) {
                let cursor = document.body.style.cursor; jQuery("body").css('cursor', 'wait'); jQuery.get(url, function (data) {
                    if (isNaN(tab)) { var newTabContent = jQuery(".tab-container:not([data-titled-tab=true])[data-tab='" + tab + "']", data).children(0); var element = ".tab-container:not([data-titled-tab=true])[data-tab='" + tab + "']"; } else { var newTabContent = jQuery('.tab-container:not([data-titled-tab=true]):eq(' + tab + ')', data).children(0); var element = ".tab-container:not([data-titled-tab=true]):eq(" + tab + ")"; }
                    jQuery(element).html(newTabContent); changeTabs(tab); replaceAddAnotherLinks(); initAll(element); jQuery("body").css('cursor', cursor);
                });
            } else { changeTabs(tab); }
            return false;
        }); window.addEventListener("popstate", function (e) { if (window['changed_tab']) document.location.href = document.referrer; }); onInitTabs = window['onInitTabs']; if (onInitTabs != null) onInitTabs();
    }
    changeTabs = function (index, init = false) {
        window['changed_tab'] = true; window['current_tab'] = index; let tab_name = jQuery(this).data("tab"); if (!tab_name) { tab_name = index; }
        jQuery(".pagination a").each(function () { if (tab_name) { let urlQueryString = new URLQueryString(this.href.split('?')[1]); urlQueryString.set('tab', tab_name); this.href = `?${urlQueryString.toString()}`; } }); if (!init) { jQuery(".tabs a").parent("li").removeClass('active'); jQuery(".tabs a[data-tab=" + index + "]").parent("li").addClass('active'); }
        jQuery(".tab-container:not([data-titled-tab=true])").addClass('d-none'); if (isNaN(index)) { jQuery(".tab-container:not([data-titled-tab=true])[data-tab='" + index + "']").removeClass('d-none'); } else { jQuery(".tab-container:not([data-titled-tab=true]):eq(" + index + ")").removeClass('d-none'); }
        onChangeTabs = window['onChangeTabs']; if (onChangeTabs != null) onChangeTabs(); addTabParamToLinks();
    }
    addTabParamToLinks = function () {
        let aba_atual = $('li.active a', '.tabs').data('tab'); let todos_nomes_tabs = []; jQuery('.tab-container:not([data-titled-tab=true])').each(function () { todos_nomes_tabs.push(jQuery(this).data('tab')); }); jQuery("a[href*='tab=']:not('#breadcrumbs a')", "#content").each(function () {
            let href = jQuery(this).attr('href'); if (/[?&]tab=$/.test(href) == true) { href = href.replace('tab=', 'tab=' + aba_atual); } else { jQuery.each(todos_nomes_tabs, function (index, value) { if (href.indexOf('tab=' + value) != -1) { href = href.replace('tab=' + value, 'tab=' + aba_atual); } }); }
            jQuery(this).attr('href', href);
        });
    }; jQuery(function () { initTabs(0); window['changed_tab'] = false; });
}).call(this);