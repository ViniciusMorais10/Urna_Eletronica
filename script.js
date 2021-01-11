let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricaoGeral = document.querySelector('.d1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1-right');
let numeros = document.querySelector('.d1-3');

let etapaAtual = 0;
let numero = '';
let votobranco = false;

function comecarEtapa(){

    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votobranco = false;

    for( let i=0; i<etapa.numeros; i++){
        if(i===0){
            numeroHtml+='<div class="numero pisca"></div>'
        } else {
        numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricaoGeral.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero == numero){
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length >0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricaoGeral.innerHTML= `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';
      

        let fotosCandidato = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosCandidato+= `<div class="d-1-img small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>'`;  
            }else {
            fotosCandidato+= `<div class="d-1-img"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>'`;
            }
        }

        lateral.innerHTML = fotosCandidato;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricaoGeral.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
    console.log(candidato);

}

function clicou (n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }
}

function branco(){
        numero = ''
        votobranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = ''
        descricaoGeral.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    
}

function corrige(){
   comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoconfirmado = false;

    if(votobranco === true){
        console.log("Confirmando como Branco!");
        votoconfirmado = true
    } else if(numero.length === etapa.numeros) {
        votoconfirmado =true;
       console.log("confirmando como "+numero); 
    }

    if(votoconfirmado){
        etapaAtual++;
       if(etapas[etapaAtual] !== undefined){
           comecarEtapa();
       } else {
           document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
       }

    }
}

comecarEtapa();