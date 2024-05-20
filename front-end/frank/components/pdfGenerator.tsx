import jsPDF from 'jspdf';
import { format } from "date-fns";
import { ButtonGlass } from '../src/assets/button';

async function generatePDF(data: any) {
  if (!data) {
    console.error('Dados não estão definidos');
    return;
  }

  function addPageTitle(doc: any, title: string) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
  }

  const converted = (numeroString: any) => {
    let numeroConvertido = numeroString.toString(); 
  
    numeroConvertido = "R$" + numeroConvertido.replace('.', ',');
    
   
    if (parseFloat(numeroString) >= 1000) {
       
        const numeroParts = numeroConvertido.split(',');
        const parteInteira = numeroParts[0];
        let parteDecimal = numeroParts[1] || ""; 
        parteDecimal += "00"; 
        parteDecimal = parteDecimal.slice(0, 2); 
        numeroConvertido = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + parteDecimal;
    }
    
    return numeroConvertido;
}

  const dadoBancario = await data.dadosBancarios?.[0];
  const dadoPessoal = await data.dadosPessoais;
  const dadoBeneficio = await data.dadosBeneficio[0];
  const emprestim = await data.emprestimos.length;
  const emprestimo = await data.emprestimos;
  const rmc = await data.rmc;
  const rcc = await data.rcc
  const formatedData = format(new Date(dadoPessoal.date), "dd-MM-yyyy");

  const doc = new jsPDF({
    orientation: 'landscape', 
    unit: 'mm', 
    format: 'a4' 
  });

  

  addPageTitle(doc, "Extrato INSS")
  let startY = 40;
  const lineHeight = 10;
  function addTextPair(text1: string, text2: string, y: number, lineHeight: number = 10, fontSize: number = 8) {
    const [label1, value1] = text1.split(':');
    const [label2, value2] = text2.split(':');

    const label1X = 15;
    const value1X = 70; 

    const label2X = 135;
    const value2X = 190; 

    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(label1 + ':', label1X, y);
    doc.text(label2 + ':', label2X, y);

    doc.setFont('helvetica', 'normal');
    doc.text(value1.trim(), value1X, y);
    doc.text(value2.trim(), value2X, y);

    return y + lineHeight;
}

  addTextPair(`Nome :        ${dadoPessoal?.nome}`, `Especie : ${dadoBeneficio.especie}`, startY);
  addTextPair(`Situação :      ${dadoBeneficio?.situacao}`, `Bloqueio Emprestimo : ${dadoBeneficio?.bloqueioEmprestimo == true ? 'Sim' : 'Não'}`, startY + lineHeight);
  addTextPair(`Elegível para Empréstimo :    ${dadoBeneficio?.elegivel == true ? 'Sim' : 'Não'}`, `Possui Procurador : ${dadoBeneficio?.possuiProcurador == true ? 'Sim' : 'Não'}`, startY + 2 * lineHeight);
  addTextPair(`Possui Representante :    ${dadoBeneficio?.representanteLegal == true ? 'Sim' : 'Não'}`, `Pensão Alimentícia : ${dadoBeneficio?.pensao == true ? 'Sim' : 'Não'}`, startY + 3 * lineHeight);
  addTextPair(`Meio de Pagamento :      ${dadoBancario?.tipoMeioPagamento}`, `Banco : ${dadoBancario?.nomeBanco}`, startY + 4 * lineHeight);
  addTextPair(`Agencia :     ${dadoBancario?.agencia}`, `Conta: ${dadoBancario?.codigoBanco}`, startY + 5 * lineHeight);
  addTextPair(`Valor Base:    ${dadoBeneficio?.basedeCalculo}`, `Empréstimos Ativos :${emprestim}`, startY + 6 * lineHeight);
  addTextPair(`Margem Consignável :    ${converted(dadoBeneficio?.valorMargemConsignavelEmp)}`, `Margem Disponível Empréstimo : ${dadoBeneficio?.valorMargemDisponivelEmp}`, startY + 7 * lineHeight);
  addTextPair(`Margem Utilizada Empréstimo :   ${converted(dadoBeneficio?.valorMargemUtilizadaEmp)}`, `Margem Disponível RMC : ${dadoBeneficio?.valorMargemDisponivelRMC}`, startY + 8 * lineHeight);
  addTextPair(`Margem Disponível RCC :     ${dadoBeneficio?.valorMargemDisponivelRCC}`, `CPF: ${dadoPessoal?.cpf}`, startY + 9 * lineHeight);
  addTextPair(`Data de nascimento:      ${formatedData}`, `Benefício: ${dadoBeneficio.beneficio}`, startY + 10 * lineHeight);

  doc.addPage('a4', 'landscape');

 
  

  let tableData = [
    ['Contrato', 'Banco', 'Data inclusão', 'Inicio Desconto', 'Fim Desconto', 'Situação', 'Qtd. Parcelas', 'Valor Emprestado', 'Valor Liberado', 'Valor Parcela', 'Saldo Devedor']
  ];

  
  const colWidths = [25, 47, 24, 24, 24, 24, 25, 23, 25, 25, 25];
  

  addPageTitle(doc, "Emprestimos Bancarios")
  doc.setFontSize(8);
  emprestimo.forEach((element: { numeroContrato: { toString: () => string; }; nomeBanco: { toString: () => string; }; dataAverbacao: { toString: () => string; }; competenciaInicio: { toString: () => string; }; competenciaFim: { toString: () => string; }; situacao: { toString: () => string; }; qtdParcelas: number; valorEmprestado: { toString: () => string; }; valorLiberado: { toString: () => string; }; valorParcela: number; }) => {
    tableData.push([
      element.numeroContrato.toString(),
      element.nomeBanco.toString(),
      element.dataAverbacao.toString(),
      element.competenciaInicio.toString(),
      element.competenciaFim.toString(),
      element.situacao.toString(),
      element.qtdParcelas.toString(),
      converted(element.valorEmprestado.toString()) ,
      converted(element.valorLiberado.toString()),
      converted(element.valorParcela.toString()),
      converted((element.qtdParcelas * element.valorParcela).toString())
    ]);
  });

  startY = 20;

  tableData.forEach((rowData) => {
    rowData.forEach((cellData, cellIndex) => {
      const x = (doc.internal.pageSize.getWidth() - colWidths.reduce((acc, curr) => acc + curr, 0)) / 2 + colWidths.slice(0, cellIndex).reduce((acc, curr) => acc + curr, 0);
      doc.rect(x, startY, colWidths[cellIndex], lineHeight);
      doc.text(cellData, x + colWidths[cellIndex] / 2, startY + lineHeight / 2, { align: 'center' });
    });
    startY += lineHeight;
  });

  doc.addPage('a4', 'landscape');

  doc.setFontSize(8);
  addPageTitle(doc, "Contratos Rmc")

  startY = 50;

  tableData = [
    ["Contrato", "Tipo Empréstimo", "Banco", "Data Inclusão", "Situação", "Limite Cartão", "Valor Reservado"]
  ];

  const colWidthds = [40, 40, 40, 40, 40, 40, 40];

  rmc.forEach((element: { numeroEmprestimo: { toString: () => string; }; tipoEmprestimo: { toString: () => string; }; nomeBanco: { toString: () => string; }; dataInclusao: { toString: () => string; }; situacao: { toString: () => string; }; limite: { toString: () => string; }; valor: { toString: () => string; }; }) => {
    tableData.push([
      element.numeroEmprestimo.toString(),
      element.tipoEmprestimo.toString(),
      element.nomeBanco.toString(),
      element.dataInclusao.toString(),
      element.situacao.toString(),
      converted(element.limite.toString()),
      converted(element.valor.toString())
    ]);
  });

  tableData.forEach((rowData, rowIndex) => {
    rowData.forEach((cellData, cellIndex) => {
      const x = (doc.internal.pageSize.getWidth() - colWidthds.reduce((acc, curr) => acc + curr, 0)) / 2 + colWidthds.slice(0, cellIndex).reduce((acc, curr) => acc + curr, 0);
      doc.rect(x, startY, colWidthds[cellIndex], lineHeight * 1.5);
      if (rowIndex === 0) {
        doc.setFontSize(8); 
      } else {
        doc.setFontSize(7); 
      }
      doc.text(cellData, x + colWidthds[cellIndex] / 2, startY + lineHeight * 0.75, { align: 'center' });
    });
    startY += lineHeight * 1.5;
  });

  doc.addPage('a4', 'landscape');

  const rcctableData = [
    ["Contrato", "Tipo Empréstimo", "Banco", "Data Inclusão", "Situação", "Limite Cartão", "Valor Reservado"]
  ];
  doc.setFontSize(10);
  addPageTitle(doc, "Contratos Rcc")
  rcc.forEach((element: { numeroEmprestimo: { toString: () => string; }; tipoEmprestimo: { toString: () => string; }; nomeBanco: { toString: () => string; }; dataInclusao: { toString: () => string; }; situacao: { toString: () => string; }; limite: { toString: () => string; }; valor: { toString: () => string; }; }) => {
    rcctableData.push([
      element.numeroEmprestimo.toString(),
      element.tipoEmprestimo.toString(),
      element.nomeBanco.toString(),
      element.dataInclusao.toString(),
      element.situacao.toString(),
      converted(element.limite.toString()),
      converted(element.valor.toString())
    ]);
  });

  rcctableData.forEach((rowData, rowIndex) => {
    rowData.forEach((cellData, cellIndex) => {
      const x = (doc.internal.pageSize.getWidth() - colWidthds.reduce((acc, curr) => acc + curr, 0)) / 2 + colWidthds.slice(0, cellIndex).reduce((acc, curr) => acc + curr, 0);
      doc.rect(x, startY, colWidthds[cellIndex], lineHeight * 1.5);
      if (rowIndex === 0) {
        doc.setFontSize(8); 
      } else {
        doc.setFontSize(7); 
      }
      doc.text(cellData, x + colWidthds[cellIndex] / 2, startY + lineHeight * 0.75, { align: 'center' });
    });
    startY += lineHeight * 1.5;
  });

  doc.save(`nb ${data.dadosPessoais.nb}.pdf`);
}

function PDFGenerator({ send }: any) {
  return (
    <div>
      <div onClick={() => generatePDF(send)}>
        <ButtonGlass ></ButtonGlass>
      </div>
    </div>
  );
}

export default PDFGenerator;