
function Layout() {
    var obj = {};

    obj.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
                   "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
                   "Y", "Z"];

    obj.buildStringButton = function (letter, groups, nextGroup) {
        return '<div class="col w-100 h-100"> \
                    <button type="button" onclick="escreve(\'' + letter.toLowerCase() + '\')" '
                    + 'data-in-groups="'+ groups + '" data-next-group="'+ nextGroup + '"'
                    + 'class="btn btn-outline-primary w-100 h-100"><span>' + letter + '</span></button>\
                </div>';
    }

    obj.buildToggleKeyboardButton = function (label) {
        return '<div class="col w-100 h-100">\
                <button type="button" data-in-groups="specials" id="botaoTrocaTeclado" \
                    onclick="trocaTeclado()" class="btn btn-outline-primary w-100 h-100"><span>' 
                    + label + 
                '</span></button>\
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
                    id="backspace" class="btn btn-outline-primary  w-100 h-100">\
                    ←\
                </button>\
            </div>';
    }

    obj.buildClearButton = function () {
        return '<div class="col  w-100 h-100">\
                    <button type="button" data-in-groups="controls" data-next-group="group-1" \
                        aria-label="Botão limpar textarea" id="erase" class="btn btn-outline-primary w-100 h-100">\
                        <i class="fas fa-trash"></i>\
                    </button>\
                </div>';
    }

    obj.buildTextArea = function (numRows) {
        return '<form class="col">\
                    <label for="text" class="sr-only" id="label">Campo de texto</label>\
                    <textarea id="text" class="form-control" rows="' + numRows + '"></textarea>\
                </form>';
    }

    obj.buildLayoutForSmallScreen = function (dest) {
        var tags = "";

        tags += '<div class="row text sc-row">';
        tags += this.buildTextArea(3);
        tags += '</div>';
        tags += '<div class="row controls sc-row" data-in-groups="group-1 group-2" data-next-group="controls">';
        tags += this.buildToggleScanButton('group-1');
        tags += this.buildEraseButton();
        tags += this.buildClearButton();
        tags += '</div>';
        
        // letters
        for (var i = 0; i < 24; i += 4) {
            tags += '<div class="row sc-row alpha-row" data-in-groups="group-1"\
                     data-next-group="' + 'alpha-' + Math.trunc(i/4) + '">';
            for (var l = i; l < i+4; l++) {
                tags += this.buildStringButton(this.letters[l], 'alpha-' + Math.trunc(i/4), 'group-1');
            }
            tags += '</div>';
        }
        tags += '<div class="row sc-row alpha-row" data-in-groups="group-1" data-next-group="alpha-6">';
        tags += '<div class="col w-100 h-100"></div>'
                + this.buildStringButton("Y", "alpha-6", "group-1")
                + this.buildStringButton("Z", "alpha-6", "group-1")
                + '<div class="col w-100 h-100"></div>';
        tags += '</div>';

        //digits
        for (var i = 0; i < 9; i += 3) {
            tags += '<div class="row sc-row digit-row" data-in-groups="group-2"\
                     data-next-group="' + 'digit-' + Math.trunc(i/4) + '">';
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


        tags += '<div class="row sc-row" data-in-groups="group-1 group-2" data-next-group="specials">'
                + this.buildStringButton('__', 'specials', 'group-1')
                + this.buildStringButton('SIM', 'specials', 'group-1')
                + this.buildStringButton('NÃO', 'specials', 'group-1')
                + this.buildToggleKeyboardButton('123')
                + '</div>';

        document.querySelector(dest).innerHTML = tags;
    }	

    obj.buildLayoutForBigScreen = function (dest) {
        var tags = '<div class="row h-100">';
        tags += '<div class="col h-100">';
        tags += '<div class="row sc-row">';
        tags += '<div class="col-8 h-100"><div class="sc-row row h-100">'
        tags += this.buildTextArea(2);
        tags += '</div></div>';
        tags += '<div class="col"><div data-in-groups="group-1" data-next-group="controls" class="sc-row control row h-100">'
        tags += this.buildToggleScanButton('group-1');
        tags += this.buildEraseButton();
        tags += this.buildClearButton();    
        tags += '</div></div>';
        tags += '</div>';
        for (var i = 0; i < 26; i += 9) {
            tags += '<div class="row sc-row">';
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
        tags += '</div>';
        
        tags += '<div class="col-1 h-100 specials" data-in-groups="group-1" data-next-group="specials">';
        tags += '<div class="row sc-row">'
                + this.buildStringButton('_', 'specials', 'group-1')
                + '</div>'
                + '<div class="row sc-row">' 
                + this.buildStringButton('SIM', 'specials', 'group-1')
                + '</div>'
                + '<div class="row sc-row">'
                + this.buildStringButton('NÃO', 'specials', 'group-1')
                + '</div>'
                + '<div class="row sc-row">'
                + this.buildToggleKeyboardButton('123')
                + '</div>'
                + '</div>';
        tags += '</div>';

        tags += '</div>';

        document.querySelector(dest).innerHTML = tags;
    }

    return obj;
}
