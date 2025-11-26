
function __makeTranslationTable(){
    var en =  {
        "SIM": "YES",
        "NÃO": "NO",
        "Alto contraste": "Dark mode",
        "Contraste normal": "Default Mode",
        "Sépia": "Sepia",
        "Varredura": "Scan",
        "Velocidade": "Speed",
        "Aplicar": "Apply",
        "idioma selecionado": "selected language",
        "Teclado alfabético": "Alphabetic keyboard", 
        "Teclado numérico": "Numeric keypad",
        "Apagar": "Erase",
        "Limpar": "Clear",
        "Espaço": "Space",
        "Varredura desabilitada": "Scanning disabled",
        "Varredura habilitada": "Scanning enabled", 
        "Velocidade em ": "Speed ",
        "Alto contraste habilitado": "Dark mode enabled",
        "Contraste normal habilitado": "Normal mode enabled",
        "Modo sépia habilitado": "Sepia mode enabled",
        "Fechar menu de configuração": "Close settings menu",
        "Abrir menu de configuração": "Open settings menu",
        "Fechar menu": "Close menu",
        "Abrir menu": "Open menu",
        "Configurações": "Settings",
        "Sobre": "About",
        "Manual (link externo)": "Manual (external link)",
        "Sobre o Beluga Talks": "About Beluga Talks",
        "Prancha alfanumérica de CAA": "Alphanumeric AAC board",
        "O Beluga Talks é uma prancha alfanumérica de Comunicação Aumentativa e Alternativa (CAA). Através dela, é possível selecionar letras e números, formar palavras e frases e utilizar o sintetizador de voz para que o conteúdo seja lido em voz alta.": "Beluga Talks is an alphanumeric Augmentative and Alternative Communication (AAC) board. It allows users to select letters and numbers, form words and sentences, and use the voice synthesiser so the content can be read aloud.",
        "O aplicativo contém duas pranchas, sendo uma alfabética e uma numérica, contendo, também, as teclas ‘‘sim’’ e ‘‘não’’, tecla para leitura em voz alta, botão para acessar as configurações e tecla para alternar entre uma prancha e outra. Nas configurações, a ferramenta oferece opção de navegação por varredura e modo escuro.": "The app contains two boards, one alphabetic and one numeric. It also includes ‘‘yes’’ and ‘‘no’’ keys, a key for text-to-speech playback, a button to access the settings, and a key to switch between the boards. In the settings, the tool offers a scanning navigation option and a dark mode.",
        "Desenvolvido pelo Centro Técnológico de Acessibilidade do Instituto Federal de Educação, Ciências e Tecnologia do Rio Grande do Sul, disponibilizado de forma gratuita e com código fonte sob a licença GPLv3 e Creative Commons NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0).": "Developed by the Centro Técnológico de Acessibilidade do Instituto Federal de Educação, Ciências e Tecnologia do Rio Grande do Sul, it is available free of charge and its source code is released under the GPLv3 licence and the Creative Commons NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0) licence."
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

function selectLang() {
    const select = document.getElementById("langSelector");
    const lang = select.value;
    const url = new URL(window.location);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
}

window.addEventListener("DOMContentLoaded", () => {
    const currentLang = __getLang();
    const select = document.getElementById("langSelector");
    select.value = currentLang;
});

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

