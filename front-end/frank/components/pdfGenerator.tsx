import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
    height: '100vh',
    width: '60vw'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
});

const PDFViewer = ({ propsResponse }) => {
  const [responsedVl, setResponseVl] = useState();

  useEffect(() => {
    setResponseVl(propsResponse);
  }, [propsResponse]); 

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.section}>
        <Text style={styles.title}>Beneficio</Text>
          <View>
            <Text style={styles.label}>Nome : </Text>
            <Text>{propsResponse.listaDadosPessoais.nome}</Text>
          </View>
          <View>
            <Text style={styles.label}>Número Benefício : </Text>
            <Text>{propsResponse.listaDadosPessoais.nb}</Text>
          </View>
          <View>
            <Text style={styles.label}>Meio de pagamento : </Text>
            <Text>{propsResponse.listaDadosBancario.tipoMeioPagamento}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}> </Text>
          <View>
            <Text style={styles.label}>Situação : </Text>
            <Text>{propsResponse.listaDadosBeneficio.situacao}</Text>
          </View>
          <View>
            <Text style={styles.label}>Bloqueio de Empréstimo : </Text>
            <Text>{propsResponse.listaDadosBeneficio.bloqueioEmprestimo ? 'Sim' : 'Não'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Elegível Para Empréstimo : </Text>
            <Text>{propsResponse.listaDadosBeneficio.elegivel ? 'Sim' : 'Não'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Possui Procurador : </Text>
            <Text>{propsResponse.listaDadosBeneficio.possuiProcurador ? 'Sim' : 'Não'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Representante Legal : </Text>
            <Text>{propsResponse.listaDadosBeneficio.representanteLegal ? 'Sim' : 'Não'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Banco : </Text>
            <Text>{propsResponse.listaDadosBancario.nomeBanco}</Text>
          </View>
          <View>
            <Text style={styles.label}>Agencia : </Text>
            <Text>{propsResponse.listaDadosBancario.codigoBanco}</Text>
          </View> 
          <View>
            <Text style={styles.label}>Conta : </Text>
            <Text>{propsResponse.listaDadosBancario.cc}</Text>
          </View> 
          <View>
            <Text style={styles.label}>Valor Base : </Text>
            <Text>{propsResponse.listaEmprestimo.valorLiberado}</Text>
          </View> 
          <View>
            <Text style={styles.label}>Empréstimos ativos : </Text>
            <Text></Text>
          </View> 
          <View>
            <Text style={styles.label}>Empréstimos Portabilidade : </Text>
            <Text></Text>
          </View>
          <View>
            <Text style={styles.label}>Empréstimos Refinanciamento : </Text>
            <Text></Text>
          </View>
          <View>
            <Text style={styles.label}>Empréstimos Suspenso : </Text>
            <Text></Text>
          </View>
          <View>
            <Text style={styles.label}>Margem consignável : </Text>
            <Text></Text>
          </View>
          <View>
            <Text>Margem disponivel Empréstimo: </Text>
          </View>
          <View>
            <Text>Margem Utilizada Empréstimo: </Text>
          </View>
          <View>
            <Text>Margem Disponível RMC: </Text>
          </View>
          <View>
            <Text>Margem Reservada RMC: </Text>
          </View>
          <View>
            <Text>Margem Disponível RCC: </Text>
          </View>
          <View>
            <Text>Margem Reservada RCC: </Text>
          </View>
          <View>
            <Text>CPF: </Text>
          </View>
          <View>
            <Text>Data de Nascimento : </Text>
          </View>
          <View>
            <Text>Data de Extração : </Text>
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default PDFViewer;
