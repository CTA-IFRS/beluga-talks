//----------------------------
//----- ALTO CONTRASTE -------
//----------------------------

$(document).ready(function(){
    
    let altoContraste = Cookies.get('altocontraste')
    // Checa o cookie. Se está vazio coloca false. Se for true adiciona a classe CSS no body e o aria-checked
    // no botão, assim a página continua com alto contraste como o usuário já havia escolhido anteriormente
    if (altoContraste == "" || altoContraste == null){
        Cookies.set('altocontraste', false)
    }else if (altoContraste == 'true'){
        $("body").prop('class', "alto-contraste");
        $("#high_contrast").attr("aria-checked","true");
    }

    // Cada vez que o botão é clicado verifica se o alto contraste estava habilitado ou não.
    // Se estava desabilitado, ele então é ativado. Se estava habilitado então desabilita.
    $("#high_contrast").click(function () {
        if($("#high_contrast").attr("aria-checked") == 'false'){
            $("body").prop('class', "alto-contraste");
            $("#high_contrast").attr("aria-checked","true");
            Cookies.set('altocontraste', true);
        }else{
            $("body").prop('class', "");
            $("#high_contrast").attr("aria-checked","false");
            Cookies.set('altocontraste', false);
        }
	});
});