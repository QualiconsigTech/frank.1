import jsPDF from 'jspdf';
import { compareAsc, format } from "date-fns";


async function generatePDF(data: any) {
  if (!data) {
    console.error('Dados não estão definidos');
    return;
  }

  const dadoBancario = await data.dadosBancarios?.[0];
  const dadoPessoal =  await data.dadosPessoais;
  const dadoBeneficio = await data.dadosBeneficio[0]
  const emprestim = await data.emprestimos.length
  const formatedData = format(new Date(dadoPessoal.date), "dd-MM-yyyy");
  

  const doc = new jsPDF();
    doc.text(`Nome : ${dadoPessoal.nome}`, 10, 10)
    doc.text(`Especie : ${dadoBeneficio.especie}`, 10, 20)
    doc.text(`Situação : ${dadoBeneficio.situacao}`, 10, 30)
    doc.text(`Bloqueio Emprestimo : ${dadoBeneficio.bloqueioEmprestimo == true ? 'Sim': 'Não'}`, 10,40)
    doc.text(`Elegível para Empréstimo : ${dadoBeneficio.elegivel == true ? 'Sim': 'Não'}`, 10,50)
    doc.text(`Possui Procurador : ${dadoBeneficio.possuiProcurador == true ? 'Sim': 'Não'}`, 10,60)
    doc.text(`Possui Representante : ${dadoBeneficio.representanteLegal == true ? 'Sim': 'Não'}`, 10,70)
    doc.text(`Pensão Alimentícia : ${dadoBeneficio.pensao == true ? 'Sim': 'Não'}`, 10,80)
    doc.text(`Meio de Pagamento : ${dadoBancario.tipoMeioPagamento}`, 10,90)
    doc.text(`Banco : ${dadoBancario.nomeBanco}`, 10, 100)
    doc.text(`Agencia : ${dadoBancario.agencia}`, 10, 110)
    doc.text(`Conta: ${dadoBancario.codigoBanco}`,10, 120)
    doc.text(`Valor Base: ${dadoBeneficio.basedeCalculo}`, 10, 130)
    doc.text(`Empréstimos Ativos :${emprestim}`, 10,140)
    doc.text(`Margem Consignável :${dadoBeneficio.valorMargemConsignavelEmp}`, 10,150)
    doc.text(`Margem Disponível Empréstimo : ${dadoBeneficio.valorMargemDisponivelEmp}`, 10,160)
    doc.text(`Margem Utilizada Empréstimo :${dadoBeneficio.valorMargemUtilizadaEmp}`, 10,170)
    doc.text(`Margem Disponível RMC : ${dadoBeneficio.valorMargemDisponivelRMC}`, 10,180)
    doc.text(`Margem Disponível RCC :${dadoBeneficio.valorMargemDisponivelRCC}`, 10,190)
    doc.text(`CPF: ${dadoPessoal.cpf}`, 10,200)
    doc.text(`Data de nascimento: ${formatedData}`, 10,210)
    doc.text(`Data de nascimento: ${dadoBeneficio.beneficio}`, 10,220)


  

  doc.save('example.pdf');
}

function PDFGenerator({ send }:any) {
  return (
    <div>
      <button onClick={() => generatePDF(send)}>Gerar PDF</button>
    </div>
  );
}

export default PDFGenerator;
