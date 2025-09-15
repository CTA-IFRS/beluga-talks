
function __makeTranslationTable(){
    var en =  {
        "SIM": "YES",
        "NÃO": "NO",
        "Modo escuro": "Dark mode",
        "Varredura": "Scan",
        "Velocidade": "Speed",
        "Teclado alfabético": "Alphabetic keyboard", 
        "Teclado numérico": "Numeric keypad",
        "Apagar": "Erase",
        "Limpar": "Clear",
        "Espaço": "Space",
        "Varredura desabilitada": "Scanning disabled",
        "Varredura habilitada": "Scanning enabled", 
        "Velocidade em ": "Speed ",
        "Modo escuro desabilitado": "Dark mode disabled",
        "Modo escuro habilitado": "Dark mode enabled",
        "Fechar menu de configuração": "Close settings menu",
        "Abrir menu de configuração": "Open settings menu"
    }

    var table = {
        "en": en,
        "en-US": en
    };
    return table;
}

function __getLang() {
    var urlParams = new URLSearchParams(document.location.search);
    var lang = (urlParams.get("lang") 
            || navigator.language 
            || document.documentElement.lang);

    switch(lang) {
        case "en":
        case "en-US":
            return lang;
        default:
            return "pt-BR";  
    }
}

function __t(word) {
    if (typeof __t.table == "undefined"){
        __t.table = __makeTranslationTable();
    }

    var lang = __getLang();
    if (lang == "pt-BR" || !__t.table.hasOwnProperty(lang)) {
        return word;
    } else {
        if (__t.table[lang].hasOwnProperty(word))
            return __t.table[lang][word];

        return word;
    }

}

