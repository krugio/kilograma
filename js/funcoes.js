$('#staticBackdrop #inputPago').mask('000.000.000.000.000.00', {reverse: true});
$('#staticBackdrop #inputPL').mask('000.000', {reverse: true});
$('#staticBackdrop #inputPerdas').mask('000.000', {reverse: true});



const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'center',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                })


//Existem lançamentos?!


     //pegamos a lista
     let iLancamentos = JSON.parse(localStorage.getItem('Lancamentos'));

     var inicio =` <table class="table table-hover table-centered mb-0">

                    <tr style="text-align: center;">
                        <th>Peso Liquido(kg)</th>
                        <th>Perda (kg)</th>
                        <th>Preço/Kg Pago</th>
                        <th>Preco/Kg <b>REAL</b></th>
                        <th>%PERDA</th>
                    </tr>`;
               
                var text="";
                for (var i = 0; i < iLancamentos.length; i++) 
                {
                    text += ` <tr style="text-align:center;">
                                    <td>${iLancamentos[i].pesoLiquido}</td>
                                    <td>${iLancamentos[i].perdaKg}</td>
                                    <td>${iLancamentos[i].precoKg}</td>
                                    <td>${iLancamentos[i].valorReal}</td>
                                    <td>${iLancamentos[i].porcentagemPerda}</td>
                                    <td>    <button type="button" class="btn btn-danger" title="Excluir Lançamento" onclick="excluir(${i});">X</button></td>
                                <tr>`;  
                    
                }
                var final =`</table>`;
    
    
                 document.getElementById('tabela').innerHTML = inicio + text + final;


                 if (iLancamentos.length > 0)
                 {
                     calculaMedias();
                 }




    function excluir(a)
    {
      //pegamos os lancamentos
      var iLancamentos = JSON.parse(localStorage.getItem('Lancamentos'));

      iLancamentos.splice(a,1);

      localStorage.setItem("Lancamentos",JSON.stringify(iLancamentos));


      Toast.fire({
                            icon: 'success',
                            title: 'Lançamento excluido com sucesso!'
                        })


    

                        setTimeout(() => {window.location.href = 'index.html'; }, 3000);


     



      
    }







    function registrar()
    {
        let pesoLi = document.getElementById('inputPL').value;
        let perda = document.getElementById('inputPerdas').value;
        let precoPago = document.getElementById('inputPago').value;


        
        //Calculamos a %PERDA 
        let calcPerda = (parseFloat(perda) * 100) / parseFloat(pesoLi);
        calcPerda.toFixed(2);

        //Calculamos o valor real do KG/PAGO
       
        let valorR = 1000 - (parseFloat(calcPerda) * 10) 
        valorR.toFixed(2);

        let valorRealFinal = (1000 * parseFloat(precoPago)) / valorR;

        
        var iLancamentos =""; 
        //Verificamos se existe ja algum lancamento!
        if (localStorage.getItem('Lancamentos') == undefined)
        {
            iLancamentos = [];
        }
        else
        {
            iLancamentos = JSON.parse(localStorage.getItem('Lancamentos'));
        }
       
        let novoLancamento = {
                                pesoLiquido: pesoLi,
                                perdaKg: perda,
                                precoKg: precoPago,
                                porcentagemPerda: calcPerda.toFixed(2),
                                valorReal: valorRealFinal.toFixed(2)

                                }

                            iLancamentos.push(novoLancamento);

                             localStorage.setItem("Lancamentos",JSON.stringify(iLancamentos));

                             Toast.fire({
                                            icon: 'success',
                                            title: 'Lançamento registrado com sucesso!'
                                         })


    

                        setTimeout(() => {window.location.href = 'index.html'; }, 3000);          
        
    }


 
function calculaMedias()
{

    var iLanc = JSON.parse(localStorage.getItem("Lancamentos"));
                 
                  var totalLiquido = 0; 
                  var totalperdaKg = 0;
                  var totalPerdaPorcentagem = 0;
                  var ppagoKg = 0;
                  var valorRe = 0;



                 
                  for(i=0; i < iLanc.length; i++)
                  {
                    totalLiquido += parseFloat(iLanc[i].pesoLiquido);
                    totalperdaKg += parseFloat(iLanc[i].perdaKg);
                    totalPerdaPorcentagem += parseFloat(iLanc[i].porcentagemPerda);
                    ppagoKg += parseFloat(iLanc[i].precoKg);
                    valorRe += parseFloat(iLanc[i].valorReal);
                  }

                  //alert(totalLiquido);
                  //alert(totalperdaKg); 
                  //alert(totalPerdaPorcentagem); 
                  ///alert(ppagoKg) ;
                  //alert(valorRe);

                 //totalComprado! 
                 document.getElementById('totalComprado').innerHTML = totalLiquido.toFixed(3);

                 //Media de Kg/Pago
                 var media = iLanc.length;
                 var mediaPago = (ppagoKg / media);
                 document.getElementById('mediaPago').innerHTML = mediaPago.toFixed(2);

                 //media Perda
                 var mediaPerda = (totalPerdaPorcentagem / media);
                 document.getElementById('mediaPerda').innerHTML = mediaPerda.toFixed(2);

                 //media Kg real
                 var mediaVreal = (valorRe / media);
                 document.getElementById('kgreal').innerHTML = mediaVreal.toFixed(2);


                  

                 


                  
 

}