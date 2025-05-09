
function Layout() {
    var obj = {};

    obj.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
                   "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
                   "Y", "Z"];

    obj.buildStringButton = function (letter, groups, nextGroup) {
        return '<div class="col w-100 h-100"> \
                    <button type="button" onclick="escreve(\'' + letter.toLowerCase() + '\')" '
                    + 'data-in-groups="'+ groups + '" data-next-group="'+ nextGroup + '" '
                    + 'class="btn btn-outline-primary w-100 h-100"><span>' + letter + '</span></button>\
                </div>';
    }

    obj.buildStringPredictorButton = function (letter, groups, nextGroup) {
        return '<div class="col w-100 h-100"> \
                    <button type="button" onclick="escreve_predicao(\'' + letter.toLowerCase() + '\')" '
                    + 'data-in-groups="'+ groups + '" data-next-group="'+ nextGroup + '" '
                    + 'class="btn btn-outline-primary w-100 h-100 predictor-button"><span>' + letter + '</span></button>\
                </div>';
    }

    obj.buildSpaceButton = function (label, groups, nextGroup) {
        return '<div class="col w-100 h-100"> \
                    <button type="button" onclick="space()" '
                    + 'data-in-groups="'+ groups + '" data-next-group="'+ nextGroup + '" '
                    + 'aria-label="Adicionar espaço" '
                    + 'class="btn btn-outline-primary w-100 h-100"><span>' + label + '</span></button>\
                </div>';
    }

    obj.buildToggleKeyboardButton = function () {
        return '<div class="col w-100 h-100">\
                <button type="button" data-in-groups="specials" id="botaoTrocaTeclado" \
                    aria-label="Trocar teclado" \
                    onclick="trocaTeclado()" class="btn btn-outline-primary w-100 h-100"><span>\
                    <span class="to-digit">123</span>\
                    <span class="to-alpha">ABC</span>\
                </span></button>\
            </div>';
    }

    obj.buildToggleScanButton = function (group) {
        return '<div class="col  w-100 h-100">\
            <button type="button" data-in-groups="controls" data-next-group="group-1" \
                onclick="alternarScan(\'' + group + '\')" id="alternar-scan" \
                class="btn btn-outline-primary controller  w-100 h-100"> \
                <i class="fas fa-keyboard"></i>\
            </button>\
        </div>';
    }

    obj.buildEraseButton = function () {
        return '<div class="col  w-100 h-100">\
                <button type="button" data-in-groups="controls" data-next-group="group-1" \
                    onclick="erase()" \
                    aria-label="Apagar último caractere adicionado" \
                    id="backspace" class="btn btn-outline-primary  w-100 h-100">\
                    <i class="fas fa-backspace"></i>\
                </button>\
            </div>';
    }

    obj.buildClearButton = function () {
        return '<div class="col  w-100 h-100">\
                    <button type="button" data-in-groups="controls" data-next-group="group-1" \
                        onclick="clearText()" \
                        aria-label="Limpar caixa de texto" \
                        class="btn btn-outline-primary w-100 h-100">\
                        <i class="fas fa-sync-alt"></i>\
                    </button>\
                </div>';
    }

    obj.buildSpeakButton = function () {
        return '<div class="col  w-100 h-100">\
                    <button type="button" data-in-groups="controls" data-next-group="group-1" \
                        onclick="speakLoud()" \
                        aria-label="Ler o conteúdo da caixa de texto" \
                        class="btn btn-outline-primary w-100 h-100">\
                        <i class="fas fa-volume-up"></i>\
                    </button>\
                </div>';
    }

    obj.buildTextArea = function (numRows) {
        return '<form class="col">\
                    <label for="text" class="sr-only" id="label">Campo de texto</label>\
                    <textarea id="text" class="form-control" rows="' + numRows + '" readonly></textarea>\
                </form>';
    }

    obj.buildLayoutForSmallScreen = function (dest) {
        var tags = "";
        tags += '<div class="row text sc-row">';
        tags += this.buildTextArea(3);
        tags += '</div>';
        tags += '<div class="row control sc-row" data-in-groups="group-1 group-2" data-next-group="controls">';
        tags += this.buildSpeakButton();
        tags += this.buildEraseButton();
        tags += this.buildClearButton();
        tags += '</div>';

        // Predictor
        tags += '<div class="row sc-row alpha-row">';
        tags += '<div class="col h-100">';
        tags += '<div data-in-groups="group-1"\
                        data-next-group="predictor" class="row h-100 alpha predictor-pool">'
       
        tags += '</div>';
        tags += '</div>';
        tags += '</div>';
        
        // letters
        for (var i = 0; i < 24; i += 4) {
            tags += '<div class="row sc-row alpha-row alpha" data-in-groups="group-1"\
                     data-next-group="' + 'alpha-' + Math.trunc(i/4) + '">';
            for (var l = i; l < i+4; l++) {
                tags += this.buildStringButton(this.letters[l], 'alpha-' + Math.trunc(i/4), 'group-1');
            }
            tags += '</div>';
        }
        tags += '<div class="row sc-row alpha-row alpha" data-in-groups="group-1" data-next-group="alpha-6">';
        tags += '<div class="col w-100 h-100"></div>'
                + this.buildStringButton("Y", "alpha-6", "group-1")
                + this.buildStringButton("Z", "alpha-6", "group-1")
                + '<div class="col w-100 h-100"></div>';
        tags += '</div>';

        //digits
        for (var i = 0; i < 9; i += 3) {
            tags += '<div class="row sc-row digit-row" data-in-groups="group-2"\
                     data-next-group="' + 'digit-' + Math.trunc(i/3) + '">';
            for (var l = i; l < i+3; l++) {
                tags += this.buildStringButton(l.toString(), 'digit-' + Math.trunc(i/3), 'group-2');
            }
            tags += '</div>';
        }
        tags += '<div class="row sc-row digit-row" data-in-groups="group-2" data-next-group="digit-3">';
        tags += '<div class="col w-100 h-100"></div>'
                + this.buildStringButton("9", "digit-3", "group-2")
                + '<div class="col w-100 h-100"></div>';
        tags += '</div>';


        tags += '<div class="row sc-row specials" data-in-groups="group-1 group-2" data-next-group="specials">'
                + this.buildSpaceButton('__', 'specials', 'group-1')
                + this.buildStringButton('SIM', 'specials', 'group-1')
                + this.buildStringButton('NÃO', 'specials', 'group-1')
                + this.buildToggleKeyboardButton()
                + '</div>';

        document.querySelector(dest).innerHTML = tags;
    }	

    
    obj.buildLayoutForBigScreen = function (dest) {
        var tags = '<div class="row h-100">';
        tags += '<div class="col h-100">';
        tags += '<div class="row sc-row">';
        tags += '<div class="col-8 h-100 text"><div class="sc-row row h-100">'
        tags += this.buildTextArea(2);
        tags += '</div></div>';
        tags += '<div class="col"><div data-in-groups="group-1 group-2" data-next-group="controls" class="sc-row control row h-100">'
        tags += this.buildSpeakButton();
        tags += this.buildEraseButton();
        tags += this.buildClearButton();    
        tags += '</div></div>';
        tags += '</div>';

        // Predictor
        tags += '<div class="row sc-row alpha-row">';
        tags += '<div class="col h-100">';
        tags += '<div data-in-groups="group-1"\
                        data-next-group="predictor" class="row h-100 alpha predictor-pool">'
       
        tags += '</div>';
        tags += '</div>';
        tags += '</div>';

        // letters
        for (var i = 0; i < 26; i += 9) {
            tags += '<div class="row alpha-row sc-row">';
            for (var l = i; l < i+9; l++) {
                if (l % 3 == 0) {
                    tags += '<div class="col h-100"><div data-in-groups="group-1"\
                        data-next-group="' + 'alpha-' + Math.trunc(l/3) + '" class="row h-100 alpha">';
                }
                if (l < 26) tags += this.buildStringButton(this.letters[l], 'alpha-' + Math.trunc(l/3), 'group-1');    
                if (l + 1 == 26) {
                    tags += '<div class="col h-100"></div>';
                }
                if ((l+1) % 3 == 0) {
                    tags += '</div></div>';
                }
            }
            tags += '</div>';
        }

        //digits
        for (var i = 0; i < 8; i += 4) {
            tags += '<div class="row sc-row digit-row" data-in-groups="group-2"\
                     data-next-group="' + 'digit-' + Math.trunc(i/4) + '">';
            for (var l = i; l < i+4; l++) {
                tags += this.buildStringButton(l.toString(), 'digit-' + Math.trunc(i/4), 'group-2');
            }
            tags += '</div>';
        }
        tags += '<div class="row sc-row digit-row" data-in-groups="group-2" data-next-group="digit-2">';
        tags += '<div class="col w-100 h-100"></div>'
                + this.buildStringButton("8", "digit-2", "group-2")
                + this.buildStringButton("9", "digit-2", "group-2")
                + '<div class="col w-100 h-100"></div>';
        tags += '</div>';

        tags += '</div>';
    
        
        tags += '<div class="col-1 h-100 specials" data-in-groups="group-1 group-2" data-next-group="specials">';
        tags += '<div class="row h-100 sc-row">'
                + this.buildSpaceButton('__', 'specials', 'group-1')
                + this.buildStringButton('SIM', 'specials', 'group-1')
                + this.buildStringButton('NÃO', 'specials', 'group-1')
                + this.buildToggleKeyboardButton()
                + '</div>';
        tags += '</div>';

        tags += '</div>';
        document.querySelector(dest).innerHTML = tags;
    }

    return obj;
}
