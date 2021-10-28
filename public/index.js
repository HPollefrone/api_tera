
/*FUNCTIONS HERE*/

 function similarity(s1, s2) {
     var longer = s1;
     var shorter = s2;
     if (s1.length < s2.length) {
       longer = s2;
       shorter = s1;
     }
     var longerLength = longer.length;
     if (longerLength == 0) {
       return 1.0;
     }
     return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
   }
 function editDistance(s1, s2) {
     s1 = s1.toLowerCase();
     s2 = s2.toLowerCase();
  
     var costs = new Array();
     for (var i = 0; i <= s1.length; i++) {
       var lastValue = i;
       for (var j = 0; j <= s2.length; j++) {
         if (i == 0)
           costs[j] = j;
         else {
           if (j > 0) {
             var newValue = costs[j - 1];
             if (s1.charAt(i - 1) != s2.charAt(j - 1))
               newValue = Math.min(Math.min(newValue, lastValue),
                 costs[j]) + 1;
             costs[j - 1] = lastValue;
             lastValue = newValue;
           }
         }
       }
       if (i > 0)
         costs[s2.length] = lastValue;
    }
    return costs[s2.length];
   }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  
async function printAdressWithDelay(item, address, userData) {
    console.log('Taking a break...');
    
    spinnerLoading.remove()
    await sleep(1000); 
    
    console.log("EXECUTANDO printAddress --- posição do array", item)  
    printAddress(item, address, userData)
    console.log('Two seconds later...');
    //const userData = userData
  
  }
async function printAddress(item, address, userData) {
    
    
    const arrayApi = await address;
    console.log(arrayApi)
    /* Defining sacados */
    try{
        if (item == 0){            
            for (let socio in arrayApi.socios){
                console.log(socio)
                nomeDoCedente = JSON.stringify(arrayApi.socios[socio].nome)
                nomesDosCedentes.push(nomeDoCedente)
                //document.getElementById("#div-cedente").innerHTML = "<p><b>Nome do Sacado: </b>" + nomeDoSacado + "</p>";
                const p = document.createElement("p")
                p.innerHTML = "<b>Nome Do Cedente:</b> " + `${nomeDoCedente}`
                document.getElementById("#cedente").appendChild(p)
               //document.body.innerHTML  += "<p><b>Nome do Cedente: </b>" + nomeDoCedente + "</p>";
            }
            console.log("Nomes dos Cedentes: ", nomesDosCedentes);
            cedenteIsOkFlag = true;
        }
    }catch(error){
        console.log("Erro:" , error.message)
    }

    let obj = arrayApi.socios
    let razaoSocial = arrayApi.razao_social
    let sobrenomesSimilaresFlag

    if (item > 0 && cedenteIsOkFlag ) {        
          if(obj.length < 1){
            console.log("razao social= "  + JSON.stringify(razaoSocial));
            console.log("Qualificacao do responsavel "  + JSON.stringify(arrayApi.qualificacao_do_responsavel.descricao));
            //document.body.innerHTML  +="<p><b>" +JSON.stringify(arrayApi.qualificacao_do_responsavel.descricao).replace(/\"/g, '') + "</b>:" + JSON.stringify(razaoSocial)+ "</p>";
            console.log(typeof JSON.stringify(razaoSocial));
            
            if (nomesDosCedentes && (item > 0)){ 
              nomedoSacado = JSON.stringify(razaoSocial).split(/\d+/)[0]
              console.log("nome do cedente LIMPO: ", nomedoSacado );            
              sobrenomedoSacado = nomedoSacado.slice(nomedoSacado.indexOf(" ")+1)
              for (sobrenome in nomesDosCedentes){
                sobrenomeDoCedente = nomesDosCedentes[sobrenome].slice(nomedoSacado.indexOf(" ")+1)
                sobrenomesSimilaresFlag = similarity(sobrenomeDoCedente, sobrenomedoSacado )
                if (sobrenomesSimilaresFlag > 0.51){
                  console.log("Sobrenomes similares detectado [cedente] = [tratante]: ", sobrenomedoSacado, "e ", sobrenomeDoCedente  );
                  console.log("nome do Sacadp " + nomedoSacado);
                  console.log("nome do Cedente " + nomesDosCedentes[sobrenome]);
                  cnpjDoSacado = JSON.stringify(arrayApi.estabelecimento.cnpj)
                  console.log(arrayApi.estabelecimento.cnpj + "cnpj sacado")

                  const p = document.createElement("p")
                  p.innerHTML = `⚠️ Atenção!  Nomes Similares:   ${nomedoSacado} e ${nomesDosCedentes[sobrenome]}`
                  document.getElementById("#texto1").appendChild(p)
                 
                  

                }
              }

          }
          } 
          else {
            for (let prop in obj){
            console.log("obj." + prop + " = "  + JSON.stringify(obj[prop].nome));
            console.log("obj." + prop + " = "  + JSON.stringify(obj[prop].qualificacao_socio));
           // document.body.innerHTML  +="<p><b>Quadro societário: </b>" +JSON.stringify(obj[prop].qualificacao_socio)+":"+JSON.stringify(obj[prop].nome)+ "</p>";
            console.log(typeof JSON.stringify(obj[prop]));

            if (nomesDosCedentes && (item > 0)){ 
              nomedoSacado = JSON.stringify(obj[prop].nome)            
              sobrenomedoSacado = nomedoSacado.slice(nomedoSacado.indexOf(" ")+1)
              for (sobrenome in nomesDosCedentes){
                sobrenomeDoCedente = nomesDosCedentes[sobrenome].slice(nomedoSacado.indexOf(" ")+1)
                sobrenomesSimilaresFlag = similarity(sobrenomeDoCedente, sobrenomedoSacado )
                if (sobrenomesSimilaresFlag > 0.51){
                  console.log("Sobrenomes similares detectado [cedente] = [tratante]: ", sobrenomedoSacado, "e ", sobrenomeDoCedente  );
                  console.log("nome do sacado " + nomedoSacado);
                  console.log("nome do cedente " + nomesDosCedentes[sobrenome]);

                  cnpjDoSacado = JSON.stringify(arrayApi.estabelecimento.cnpj)
                  console.log(arrayApi.estabelecimento.cnpj + "Cnpj sacado")

                  const p = document.createElement("p")
                  p.innerHTML = `⚠️ Atenção! Nomes Similares: "  ${nomedoSacado} e ${nomesDosCedentes[sobrenome]}`
                  document.getElementById("#texto").appendChild(p)

                  similarityFlag = true;

                  

                }
              }
 
          }

          }            

        }
        if (similarityFlag && (similarityFlagCount < 1) ) {
          document.getElementById("#cnpjSacado").innerHTML = "<p><b>CNPJ Sacado: </b>" +  cnpjDoSacado + "</p>";
        
          similarityFlagCount += 1;
          
          //similarityFlag = false;
        } else if((similarityFlagCount < 1) && item == (userData.length - 1)){
          document.getElementById("#cnabOk").innerHTML = "<p><b> ✅ NÃO FORAM ENCONTRADAS SIMILARIDADES ENTRE OS NOMES</b></p>";
         // document.body.innerHTML  += "<p><b>NÃO FORAM ENCONTRADAS SIMILARIDADES ENTRE OS NOMES</b></p>";
          
          //similarityFlagCount += 1;
        }

    } 
   // document.body.innerHTML  +="<hr>";
   return   similarityFlag;
};

function clearContent(){
  nomesDosCedentes = []
  //cnpjDoCedente = ''
  document.getElementById('#texto').innerHTML = '';
  document.getElementById('#texto1').innerHTML = '';
  document.getElementById('#cedente').innerHTML = '';
  document.getElementById('#cnpjSacado').innerHTML= '';
  document.getElementById('#cnabOk').innerHTML= '';

  console.clear();
  similarityFlag = false;
  similarityFlagCount = 0;
  sobrenomeDoCedente = '';
  sobrenomedoSacado = '';
  nomedoSacado = '' ;
  cedenteIsOkFlag = false;

};

function enableSpinner(){
  var x = document.getElementById('#carregando').style.display;
  if( x.style.display === "none"){
      x.style.display  = "block";
  }else{
    x.style.display = "none";
  }
};

function  handleFile(files){
  const reader = new FileReader();
  reader.onload = (event) => {
      let data = event.target.result;
      var treatedData = data.toString();
      var regexp = /000\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d[a-zA-Z]+/gi;
      var matches_array = treatedData.match(regexp);
      var userData = [...new Set(matches_array)]; // -> tratamento para cnpj duplicado


      for (line in userData) {  
          // tratamento para buscar primeiro cnpj
              var cnpjWithLetters = userData[line].split(/[a-zA-Z]+/)[0];
              var cnpjTreated = cnpjWithLetters.substring(cnpjWithLetters.length - 14);
              console.log()
              const address = fetch(`https://comercial.cnpj.ws/cnpj/${cnpjTreated}?token=${token}`)
              .then((response) => response.json())
              .then((cnpjTreated) => {
              return cnpjTreated;
      });        

      printAdressWithDelay(line, address, userData)
  }   
}
  reader.readAsText(files[0]);   
};

/*Define header parameters */
const token = "TYBtP0iLWfu34TXKLWWCgVNcsJFrdSJJ4JNa3zwIX81-"

/*define variables */


let nomesDosCedentes = []
let nomeDoCedente
let cedenteIsOkFlag
let similarityFlag = false
let similarityFlagCount = 0

let cnpjDoSacado
let delayInMilliseconds = 1000; //1 second
let sobrenomeDoCedente
let sobrenomedoSacado
let nomedoSacado
let result

const spinnerLoading = document.querySelector('#loading')





    

     
    


