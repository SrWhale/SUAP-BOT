(function () {
    window.__admin_media_prefix__ = "/static/admin/"; django = []; django.jQuery = jQuery; open_menu_item = function (menu_item_id) { elem = jQuery("._main_menu").find("#menu-item-" + menu_item_id); elem.addClass("active"); elem.find("a").attr("aria-current", "page"); elem.parents("li").addClass("active").toggleClass("opened"); elem.parents("ul,li").show(); }; mode_responsive = function () { if ($(window).width() < 940) { $("body").addClass("hideSidebar"); } }; moduloAbas = function (aba) { if (!jQuery(aba).hasClass("active")) { jQuery(aba).parent().find("h4").removeClass("active"); jQuery(aba).addClass("active"); } }; initMenu = function () {
        menu_hide_sidebar = function () { jQuery("nav > ul > li").removeClass("hint hint-bottom"); }; jQuery("nav li.has-child > a").click(function (e) {
            e.preventDefault(); if (jQuery("body").hasClass("hideSidebar")) { menu_hide_sidebar(); jQuery("body").removeClass("hideSidebar"); }
            $(this).parent("li").toggleClass("opened"); $(this).next("ul").toggle();
        }); if (jQuery("body").hasClass("hideSidebar")) { jQuery(".toggleSidebar").find("span.fas").removeClass("fa-chevron-left").addClass("fa-chevron-right"); }
        jQuery(".toggleSidebar").click(function (e) {
            e.preventDefault(); if (jQuery("body").hasClass("hideSidebar")) { jQuery("html, body").animate({ scrollTop: "0px" }, 'slow'); menu_hide_sidebar(); jQuery("nav li.opened > ul").show("slow"); $.get("/comum/expandir_menu/"); jQuery(this).find("span.fas").removeClass("fa-chevron-right").addClass("fa-chevron-left"); } else { jQuery("nav > ul > li").addClass("hint hint-bottom"); jQuery("nav > ul > li").each(function () { var texto = jQuery(this).find("> a").text(); jQuery(this).attr("aria-label", texto); if (!jQuery("body").hasClass("anonima")) { $(this).find("ul").hide(); } }); $.get("/comum/retrair_menu/"); jQuery(this).find("span.fas").removeClass("fa-chevron-left").addClass("fa-chevron-right"); }
            jQuery("body").toggleClass("hideSidebar");
        });
    }; var popupUserTriggerAtual; var popupUserTrigger; hide_user_popup = function (popupUser) { setTimeout(function () { popupUser.removeClass("active"); }, 3000); }; show_profile_user_popup = function (profileId, url) {
        var popupUser = jQuery('.popup-user-container'); if (popupUser.length == 0 || !popupUser.hasClass('active')) {
            jQuery.ajax({ url: url + profileId + "/", async: false, method: "GET", }).done(function (data) {
                var popupUser = jQuery('.popup-user-container'); popupUser.remove(); jQuery('body').append(data); popupUser = jQuery('.popup-user-container'); var position = popupUserTrigger.offset(); position['top'] = position['top'] + 23; popupUser.css(position); popupUser.toggleClass("active"); if (popupUser.hasClass('active')) {
                    var direita = $(window).width() - (popupUser.offset().left + popupUser.width()); if (direita < (popupUser.width() + 50)) { popupUser.addClass("popup-left"); position['left'] = position['left'] - 150; popupUser.css(position); }
                    setTimeout(function () { var isHovered = jQuery('.popup-user-container:hover').length > 0; if (!isHovered) { hide_user_popup(popupUser); } }, 1000);
                }
                popupUser.hover(function () { }, function () { hide_user_popup(popupUser); });
            });
        }
    }; String.prototype.removeAccents = function () { return this.replace(/[áàãâä]/gi, "a").replace(/[éè¨ê]/gi, "e").replace(/[íìïî]/gi, "i").replace(/[óòöôõ]/gi, "o").replace(/[úùüû]/gi, "u").replace(/[ç]/gi, "c").replace(/[ñ]/gi, "n").replace(/[^a-zA-Z0-9]/g, " "); }; __treeListFilter = function (input_text, list_name) {
        var list = jQuery(list_name); jQuery('#_menu_list_expanded').remove(); var new_list = list.clone().appendTo(list.parent()); new_list.children().find('*').show(); new_list.find('li.has-child').addClass("opened"); new_list.attr('id', '_menu_list_expanded'); new_list.removeClass('_main_menu'); new_list.hide(); var input = jQuery(input_text); function filterList(ulObject, filterValue) {
            if (!ulObject.is('ul') && !ulObject.is('ol')) { return false; }
            var children = ulObject.children(); var result = false; for (var i = 0; i < children.length; i++) {
                var liObject = jQuery(children[i]); if (liObject.is('li')) {
                    var display = false; if (liObject.children().length > 0) { for (var j = 0; j < liObject.children().length; j++) { var subDisplay = filterList(jQuery(liObject.children()[j]), filterValue); display = display || subDisplay; } }
                    if (!display) { var text = liObject.text().removeAccents(); display = text.toLowerCase().indexOf(filterValue.removeAccents()) >= 0; if (display) { liObject.addClass('__show-children__'); } }
                    liObject.css('display', display ? 'block' : 'none'); result = result || display;
                }
            }
            ulObject.find('.__show-children__').find('*').show(); return result;
        }
        input.on('input', function () {
            var filter = input.val().toLowerCase(); if (filter !== '') { list.hide(); new_list.show(); new_list.find('li').removeClass('__show-children__'); filterList(new_list, filter); } else { list.show(); new_list.hide(); }
            return false;
        }); return this;
    };
    toggle_password_view = function (widget_name) { let password_button = $('#view-' + widget_name); password_button.on('click', () => { let input = $('#id_' + widget_name); if (input.prop('type') === 'password') { input.prop('type', 'text'); password_button.prop('title', 'Esconder a senha'); password_button.find('span.fa').prop('class', 'fa fa-eye-slash fa-fw'); password_button.find('span.sr-only').text('Esconder a senha'); } else { input.prop('type', 'password'); password_button.prop('title', 'Exibir a senha'); password_button.find('span.fa').prop('class', 'fa fa-eye fa-fw'); password_button.find('span.sr-only').text('Exibir a senha'); } }); }
    initBox = function (context) {
        jQuery(context).find(".box > h3").click(function () {
            jQuery(this).parent().find("> div").animate({ height: 'toggle' }); jQuery(this).parent().toggleClass("collapsed"); var atributo = jQuery(this).attr("title"); if (atributo == "Mostrar informações") { jQuery(this).attr("title", "Esconder informações"); } else { jQuery(this).attr("title", "Mostrar informações"); }
            return false;
        });
    }
    init_marcar_marcar_como_nao_lida = function (context) {
        jQuery(document).find(context).on("click", "[data-notificacao-leitura]", function (e) {
            if ($(this).data("admin")) { AtualizarLeituraNotificacoesAdmin($(this)); } else { AtualizarLeituraNotificacoes($(this)); }
            e.preventDefault();
        });
    }
    init_data_progress = function (context) {
        jQuery(context).find(".progress p").each(function () {
            var texto = jQuery(this).text(); var porcentagem = texto.indexOf("%"); if (porcentagem == -1) { var split = texto.split('/'); texto = parseInt(split[0] * 100 / split[1]) + "%"; }
            jQuery(this).css("width", texto); jQuery(this).parent().attr("data-progress", "p" + texto);
        });
    }
    init_clipboard = function (context) { jQuery(context).find("[data-clipboard]").click(function () { var copyText = $(this).data("clipboard"); var msg = "&quot;" + copyText + "&quot; copiado com sucesso."; var container = $(this).find("p[data-clipboard-msg]"); navigator.clipboard.writeText(copyText); if (container.length) { container.html(msg); } else { $(this).append("<p data-clipboard-msg>" + msg + "</p>"); } }); }
    init_action_bar = function (context) { jQuery(document).find(context).on("click", ".action-bar .has-child > a", function () { jQuery(this).next("ul").show(); return false; }); jQuery(context).find(".action-bar .has-child ul").hover(function () { }, function () { jQuery(this).hide("fast"); }); }
    initAll = function (context) {
        if (!context) var context = "body"; __treeListFilter('#__filterinput__', 'aside nav > ul'); mode_responsive(); init_action_bar(context); init_clipboard(context); jQuery(context).find("#collapseAsideRight").click(function () { jQuery("body").toggleClass("AsideRightCollapsed"); return false; }); var offset = 300, offset_opacity = 1200, scroll_top_duration = 700, $back_to_top = jQuery(context).find('.go-to-bottom'); jQuery(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out'); if ($(this).scrollTop() > offset_opacity) { $back_to_top.addClass('cd-fade-out'); }
            if ($(this).scrollTop() >= jQuery(document).height() - jQuery(window).height()) { $back_to_top.removeClass('cd-is-visible cd-fade-out'); }
        }); jQuery(context).find(".popup-profile-trigger").click(function (e) {
            popupUserTrigger = jQuery(this); var profileId = popupUserTrigger.data("profile-id"); var popupUser = jQuery('.popup-user-container'); var estahAtivo = popupUser.length > 0 && popupUser.hasClass('active'); if (estahAtivo) { popupUser.remove(); if (JSON.stringify(popupUserTriggerAtual) != JSON.stringify(popupUserTrigger)) { show_profile_user_popup(profileId, "/djtools/profile_info/"); } } else { show_profile_user_popup(profileId, "/djtools/profile_info/"); }
            popupUserTriggerAtual = popupUserTrigger; e.preventDefault();
        }); mapeamento_class_title = { csv: "Exportar para CSV", pdf: "Exportar para PDF", editar16: "Editar", remover16: "Remover", detalhar16: "Detalhar", upload16: "Enviar Arquivo", cracha16: "Gerar crachá", carteira16: "Gerar carteira" }; for (key in mapeamento_class_title) { jQuery.each(jQuery("a." + key), function (index, value) { elem = jQuery(value); if (elem.attr("title") == "") { elem.attr("title", mapeamento_class_title[key]); } }); }
        jQuery(context).find(".selector-chosen .selector-filter img").attr("src", "/static/comum/img/selector-choosen.png"); jQuery(context).find(".modulo-abas h4").click(function () { moduloAbas(this); }); jQuery(context).find(".action-bar .has-child").find("ul").each(function () { if (!jQuery(this).has("li").length) { jQuery(this).parent().hide(); } }); $('.masterTooltip').hover(function () { var title = $(this).attr('title'); $(this).data('tipText', title).removeAttr('title'); $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow'); }, function () { $(this).attr('title', $(this).data('tipText')); $('.tooltip').remove(); }).mousemove(function (e) { var mousex = e.pageX + 20; var mousey = e.pageY + 10; $('.tooltip').css({ top: mousey, left: mousex }) }); jQuery(context).find('textarea').on('keyup', function () { update_textarea_counter(jQuery(this)); }); jQuery(context).find('textarea').each(function (index) { update_textarea_counter(jQuery(this)); });
    }; jQuery.expr[":"].icontains = jQuery.expr.createPseudo(function (arg) { return function (elem) { return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0; }; }); initCepWidget = function (widget, estado, cidade, bairro, logradouro) {
        estado = estado || 'select[name=estado]'; cidade = cidade || 'select[name=cidade]'; bairro = bairro || 'input[name=bairro]'; logradouro = logradouro || 'input[name=logradouro]'; function setupWidget() { $(widget).blur(function () { var cep = $(this).val().replace('-', '').replace('.', '').trim(); if (cep) { var fieldset = $(this).closest('fieldset'); $.get("/djtools/consultar_cep/" + cep + "/", function (data) { if (data) { var dados = JSON.parse(data); fieldset.find(estado).val(dados.estado_info.codigo_ibge).trigger('change'); fieldset.find(cidade).val(dados.cidade_info.codigo_ibge).trigger('change'); fieldset.find(cidade).append("<option value='" + dados.cidade_info.codigo_ibge + "' selected>" + (dados.cidade + "/" + dados.estado) + "</option>").val(dados.cidade_info.codigo_ibge).trigger('change.select2'); fieldset.find(bairro).val(dados.bairro); fieldset.find(logradouro).val(dados.logradouro); } }); } }); }
        setTimeout(setupWidget, 3000);
    }
    formatBytes = (bytes, decimals = 2) => { if (bytes === 0) return '0 Bytes'; const k = 1024; const dm = decimals < 0 ? 0 : decimals; const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]; }
    Filevalidation = (id_field, max_file_size, types, extensions) => {
        var fi = document.getElementById(id_field); var re = /(?:\.([^.]+))?$/; if (fi.files.length > 0) {
            for (var i = 0; i <= fi.files.length - 1; i++) {
                var extension = re.exec(fi.files.item(i).name)[1]; if (types && !types.includes(fi.files.item(i).type) && extensions && !extensions.includes(extension)) {
                    alert("Formato de arquivo inválido. Por favor selecione um arquivo nos seguintes formatos: " + extensions)
                    fi.value = ""; return;
                }
                const file_bytes = fi.files.item(i).size; const max_size = formatBytes(max_file_size); if (file_bytes >= max_file_size) { alert("Arquivo muito grande, por favor selecione um arquivo menor que " + max_size); fi.value = ""; } else { document.getElementById(id_field + '_size').innerHTML = ' | Tamanho do arquivo selecionado: <strong>' + formatBytes(file_bytes) + '</strong>'; }
            }
        }
    }
    function URLQueryString(url) {
        this.url = String(url); this.querystringRegex = RegExp('[\?&]?([^&#=]*)=([^&#]*)*', 'g'); let queryStringItens = []; let retorno; while ((retorno = this.querystringRegex.exec(this.url)) !== null) { let queryStringItem = {}; queryStringItem[retorno[1]] = retorno[2]; queryStringItens.push(queryStringItem); }
        this.queryStringItens = queryStringItens; this.get_string = function (string) { return encodeURIComponent(string) }; this.getQuerystringValue = function (name) { let queryStringItem = getQuerystringItem(name); return queryStringItem && queryStringItem[name] }; this.getQuerystringItem = function (name) { return this.queryStringItens.filter(dict => dict[name])[0]; }; this.getQuerystringItens = function () { return this.queryStringItens; }; this.delete = function (name) { this.queryStringItens = this.queryStringItens.filter(item => Object.keys(item) != name) }; this.entries = function () { foo = { [Symbol.iterator]: () => ({ items: this.queryStringItens.slice(), next: function next() { return { done: this.items.length === 0, value: this.items.shift() } } }) }; return foo; }; this.forEach = function (callback) { this.queryStringItens.forEach(callback); }; this._getAllPair = function (name) { return this.queryStringItens.filter(item => Object.keys(item) == name); }; this._getPair = function (name) { return this._getAllPair(name)[0] || null; }; this.getAll = function (name) { return this._getAllPair(name).map(item => item[name]); }; this.get = function (name) { return this._getPair(name) && this._getPair(name)[name]; }; this.has = function (name) { return this.get(name) === null ? false : true; }; this.keys = function () { return this.queryStringItens.map(item => Object.keys(item)[0]); }; this.append = function (name, value) { let queryStringItem = {}; queryStringItem[name] = value; this.queryStringItens.push(queryStringItem); }; this.set = function (name, value) {
            let pairs = this._getAllPair(name); if (pairs) { this.delete(name); }
            this.append(name, value);
        }; this.sort = function () { this.queryStringItens.sort((x, y) => Object.keys(x) > Object.keys(y) ? 1 : -1); }; this.toString = function () { return this.queryStringItens.map(item => Object.keys(item) + '=' + Object.values(item)).join('&'); }; this.values = function () { return this.queryStringItens.map(item => Object.values(item)[0]); }; this.isEmpty = function () { return this.values().length == 0; };
    }
    function goToPageTop(scroll_duration = 'slow') { jQuery('html, body').animate({ scrollTop: 0 }, scroll_duration); }
}).call(this);