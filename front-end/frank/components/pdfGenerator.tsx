import jsPDF from 'jspdf';
import { format } from "date-fns";
import { ButtonGlass } from '../src/assets/button';

async function generatePDF(data: any) {
  if (!data) {
    console.error('Dados não estão definidos');
    return;
  }

  const dadoBancario = await data.dadosBancarios?.[0];
  const dadoPessoal = await data.dadosPessoais;
  const dadoBeneficio = await data.dadosBeneficio[0];
  const emprestim = await data.emprestimos.length;
  const emprestimo = await data.emprestimos;
  const rmc = await data.rmc;
  const rcc = await data.rcc
  const formatedData = format(new Date(dadoPessoal.date), "dd-MM-yyyy");

  const doc = new jsPDF;

  doc.addPage('a4', 'landscape');

  let startY = 20;
  const lineHeight = 10;

  function addTextPair(text1: string, text2: string, y: number, lineHeight: number = 10, fontSize: number = 8) {
    const [label1, value1] = text1.split(':');
    const [label2, value2] = text2.split(':');

    const label1X = 15;
    const value1X = 70; // Espaço extra para a primeira coluna

    const label2X = 120;
    const value2X = 177; // Espaço extra para a segunda coluna

    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(label1 + ':', label1X, y);
    doc.text(label2 + ':', label2X, y);

    doc.setFont('helvetica', 'normal');
    doc.text(value1.trim(), value1X, y);
    doc.text(value2.trim(), value2X, y);

    // Adicionando o espaçamento entre as linhas
    return y + lineHeight;
}

  addTextPair(`Nome :        ${dadoPessoal?.nome}`, `Especie : ${dadoBeneficio.especie}`, startY);
  addTextPair(`Situação :      ${dadoBeneficio?.situacao}`, `Bloqueio Emprestimo : ${dadoBeneficio?.bloqueioEmprestimo == true ? 'Sim' : 'Não'}`, startY + lineHeight);
  addTextPair(`Elegível para Empréstimo :    ${dadoBeneficio?.elegivel == true ? 'Sim' : 'Não'}`, `Possui Procurador : ${dadoBeneficio?.possuiProcurador == true ? 'Sim' : 'Não'}`, startY + 2 * lineHeight);
  addTextPair(`Possui Representante :    ${dadoBeneficio?.representanteLegal == true ? 'Sim' : 'Não'}`, `Pensão Alimentícia : ${dadoBeneficio?.pensao == true ? 'Sim' : 'Não'}`, startY + 3 * lineHeight);
  addTextPair(`Meio de Pagamento :      ${dadoBancario?.tipoMeioPagamento}`, `Banco : ${dadoBancario?.nomeBanco}`, startY + 4 * lineHeight);
  addTextPair(`Agencia :     ${dadoBancario?.agencia}`, `Conta: ${dadoBancario?.codigoBanco}`, startY + 5 * lineHeight);
  addTextPair(`Valor Base:    ${dadoBeneficio?.basedeCalculo}`, `Empréstimos Ativos :${emprestim}`, startY + 6 * lineHeight);
  addTextPair(`Margem Consignável :    ${dadoBeneficio?.valorMargemConsignavelEmp}`, `Margem Disponível Empréstimo : ${dadoBeneficio?.valorMargemDisponivelEmp}`, startY + 7 * lineHeight);
  addTextPair(`Margem Utilizada Empréstimo :   ${dadoBeneficio?.valorMargemUtilizadaEmp}`, `Margem Disponível RMC : ${dadoBeneficio?.valorMargemDisponivelRMC}`, startY + 8 * lineHeight);
  addTextPair(`Margem Disponível RCC :     ${dadoBeneficio?.valorMargemDisponivelRCC}`, `CPF: ${dadoPessoal?.cpf}`, startY + 9 * lineHeight);
  addTextPair(`Data de nascimento:      ${formatedData}`, `Benefício: ${dadoBeneficio.beneficio}`, startY + 10 * lineHeight);

  doc.addPage('a4', 'landscape');

  doc.setFontSize(8);
  doc.text("Empréstimos Bancários", 105, 10);

  let tableData = [
    ['Contrato', 'Banco', 'Data inclusão', 'Inicio Desconto', 'Fim Desconto', 'Situação', 'Qtd. Parcelas', 'Valor Emprestado', 'Valor Liberado', 'Valor Parcela', 'Saldo Devedor']
  ];

  // Definindo as larguras das colunas
  const colWidths = [25, 32, 25, 25, 25, 25, 25, 25, 25, 25, 25];

  // Supondo que emprestimo seja a sua lista de empréstimos
  emprestimo.forEach((element: { numeroContrato: { toString: () => string; }; nomeBanco: { toString: () => string; }; dataAverbacao: { toString: () => string; }; competenciaInicio: { toString: () => string; }; competenciaFim: { toString: () => string; }; situacao: { toString: () => string; }; qtdParcelas: number; valorEmprestado: { toString: () => string; }; valorLiberado: { toString: () => string; }; valorParcela: number; }) => {
    tableData.push([
      element.numeroContrato.toString(),
      element.nomeBanco.toString(),
      element.dataAverbacao.toString(),
      element.competenciaInicio.toString(),
      element.competenciaFim.toString(),
      element.situacao.toString(),
      element.qtdParcelas.toString(),
      element.valorEmprestado.toString(),
      element.valorLiberado.toString(),
      element.valorParcela.toString(),
      (element.qtdParcelas * element.valorParcela).toString()
    ]);
  });

  startY = 20;

  // Loop através dos dados da tabela
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
  doc.text("Contratos Rmc", 105, 10);

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
      element.limite.toString(),
      element.valor.toString()
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
  doc.text("Contratos Rcc", 10,10)
  rcc.forEach((element: { numeroEmprestimo: { toString: () => string; }; tipoEmprestimo: { toString: () => string; }; nomeBanco: { toString: () => string; }; dataInclusao: { toString: () => string; }; situacao: { toString: () => string; }; limite: { toString: () => string; }; valor: { toString: () => string; }; }) => {
    rcctableData.push([
      element.numeroEmprestimo.toString(),
      element.tipoEmprestimo.toString(),
      element.nomeBanco.toString(),
      element.dataInclusao.toString(),
      element.situacao.toString(),
      element.limite.toString(),
      element.valor.toString()
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

  doc.save('example.pdf');
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