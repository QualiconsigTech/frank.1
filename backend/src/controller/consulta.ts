import { ListaDadosPessoais } from "./../models/base";
import { Prisma, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { getConsulta, Simula } from "../../src/importedApi";

export const rout = Router();

const prisma = new PrismaClient();

// rout.post("/consult", async (req, res) => {
//   const nb = req.body.nb

//   if (nb) {
//     const isInDatabase = await prisma.dadosPessoais.findUnique({
//       where: {
//         nb: nb
//       }
//     })

//     if (isInDatabase) {
//       const latest = new Date(isInDatabase.date);
//       const hoje = new Date();

//       const lstDataBank = await prisma.listaDadosBancario.findUnique({
//         where: {
//           nb: nb
//         }
//       })
//       const dadoPess = await prisma.dadosPessoais.findUnique({
//         where: {
//           nb: nb
//         }
//       })
//       const listaDadosBeneficio = await prisma.listaDadosBeneficio.findUnique({
//         where: {
//           nb: nb
//         }
//       })

//       const diferencaMilissegundos: number = hoje.getTime() - latest.getTime();
//       const diferencaDias = Math.floor(
//         diferencaMilissegundos / (1000 * 60 * 60 * 24)
//       );

//       if (diferencaDias > 5) {
//         try {
//           const consultaData = await getConsulta(nb);
//           const listaDados = consultaData.body.listaDadosPessoais;
//           const listaBeneficio = consultaData.body.listaDadosBeneficio;
//           const listaDadoBank = consultaData.body.listaDadosBancario;
//           const listRmc = consultaData.body.listaRMC[0];
//           const rmc = consultaData.body.novos_RCC;
//           const listaEmprestimos = consultaData.body.listaEmprestimos;
//           const convertedCpf = parseInt(listaDados.cpf);

//           await prisma.dadosPessoais.update({
//             where: {
//               nb: nb,
//             },
//             data: {
//               nb: listaDados.nb,
//               cpf: convertedCpf,
//               ddb: listaDados.ddb,
//               nome: listaDados.nome,
//               dt_nascimento: listaDados.dt_nascimento,
//               sexo: listaDados.sexo,
//               date: new Date(),
//             },
//           });
//           await prisma.listaDadosBeneficio.update({
//             where: {
//               nb: nb,
//             },
//             data: {
//               beneficio: listaBeneficio.beneficio,
//               especie: listaBeneficio.especie,
//               situacao: listaBeneficio.situacao,
//               pensao: listaBeneficio.pensao,
//               representanteLegal: listaBeneficio.representanteLegal,
//               possuiProcurador: listaBeneficio.possuiProcurador,
//               elegivel: listaBeneficio.elegivel,
//               bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
//               valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
//               valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
//               valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
//               valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
//               valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
//               basedeCalculo: listaBeneficio.basedeCalculo,
//               nb: listaDados.nb,
//             },
//           });

//           await prisma.listaDadosBancario.update({
//             where: {
//               nb: nb,
//             },
//             data: {
//               nomeBanco: listaDadoBank.nomeBanco,
//               codigoBanco: listaDadoBank.codigoBanco,
//               agencia: listaDadoBank.agencia,
//               cc: listaDadoBank.cc,
//               tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
//               nb: listaDados.nb,
//             },
//           });

//           await prisma.listaRMC.update({
//             where: {
//               nb: nb,
//             },
//             data: {
//               situacao: listRmc.situacao,
//               nomeBanco: listRmc.nomeBanco,
//               valor: listRmc.valor,
//               codigoBanco: listRmc.codigoBanco,
//               dataInclusao: listRmc.dataInclusao,
//               numeroEmprestimo: listRmc.numeroEmprestimo,
//               limite: listRmc.limite,
//               tipoEmprestimo: listRmc["tipo emprestimo"],
//               nb: listaDados.nb,
//             },
//           });

//           await prisma.listaEmprestimo.update({
//             where: {
//               nb: nb,
//             },
//             data: {
//               nomeBanco: listaEmprestimos.nomeBanco,
//               codigoBanco: listaEmprestimos.codigoBanco,
//               dataAverbacao: listaEmprestimos.dataAverbacao,
//               numeroContrato: listaEmprestimos.numeroContrato,
//               valorEmprestado: listaEmprestimos.valorEmprestado,
//               valorLiberado: listaEmprestimos.valorLiberado,
//               valorParcela: listaEmprestimos.valorParcela,
//               qtdParcelas: listaEmprestimos.qtdParcelas,
//               situacao: listaEmprestimos.situacao,
//               qtdParcelaPagas: listaEmprestimos.qtdParcelasPagas,
//               competenciaInicio: listaEmprestimos.competenciaInicio,
//               competenciaFim: listaEmprestimos.competenciaFim,
//               tipoEmprestimo: listaEmprestimos.tipo_emprestimo,
//               nb: listaDados.nb,
//             },
//           });
//           res.send(consultaData)
//         } catch (error) {
//           console.error('Erro ao obter a consulta:', error);
//           res.status(500).send('Erro ao obter a consulta');
//         }
//       }
//       res.send({lstDataBank, dadoPess, listaDadosBeneficio })
//     }

//     if (!isInDatabase) {
//       const consultaData = await getConsulta(nb);
//       res.send(consultaData)
//     }
//   }
// });

rout.get("/consultBackoffice/:nb", async (req, res) => {
  const body = req.params.nb;
  const nby = parseFloat(body);

  if (body) {
    const dadosIsInDatabase = await prisma.dadosPessoais.findUnique({
      where: {
        nb: nby,
      },
    });

    if (!dadosIsInDatabase) {
      const office = await prisma.office.findUnique({
        where: {
          officeId: '1'
        }
      })
      const credit = office?.credits
      if(office!.credits > 0) {

      
      const simul = await Simula();
      const listaDados = simul.listaDadosPessoais;
      const listaBeneficio = simul.listaDadosBeneficio;
      const listaDadoBank = simul.listaDadosBancario;
      const listaRmc = simul.listaRMC;
      const listaEmprestimos = simul.listaEmprestimos;

      const convertedCpf = parseInt(listaDados.cpf);
      await prisma.dadosPessoais.create({
        data: {
          nb: nby,
          cpf: convertedCpf,
          ddb: listaDados.ddb,
          nome: listaDados.nome,
          dt_nascimento: listaDados.dt_nascimento,
          sexo: listaDados.sexo,
        },
      });

      await prisma.listaDadosBeneficio.create({
        data: {
          beneficio: listaBeneficio.beneficio,
          especie: listaBeneficio.especie,
          situacao: listaBeneficio.situacao,
          pensao: listaBeneficio.pensao,
          representanteLegal: listaBeneficio.representanteLegal,
          possuiProcurador: listaBeneficio.possuiProcurador,
          elegivel: listaBeneficio.elegivel,
          bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
          valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
          valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
          valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
          valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
          valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
          basedeCalculo: listaBeneficio.basedeCalculo,
          nb: nby,
        },
      });

      await prisma.listaDadosBancario.create({
        data: {
          nomeBanco: listaDadoBank.nomeBanco,
          codigoBanco: listaDadoBank.codigoBanco,
          agencia: listaDadoBank.agencia,
          cc: listaDadoBank.cc,
          tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
          nb: nby,
        },
      });

      for (const rmc of listaRmc) {
        await prisma.listaRMC.create({
          data: {
            situacao: rmc.situacao,
            nomeBanco: rmc.nomeBanco,
            valor: rmc.valor,
            codigoBanco: rmc.codigoBanco,
            dataInclusao: rmc.dataInclusao,
            numeroEmprestimo: rmc.numeroEmprestimo,
            limite: rmc.limite,
            tipoEmprestimo: rmc["tipo emprestimo"],
            nb: nby,
          },
        });
      }

      for (const emprestimo of listaEmprestimos) {
        await prisma.listaEmprestimo.create({
          data: {
            nomeBanco: emprestimo.nomeBanco,
            codigoBanco: emprestimo.codigoBanco,
            dataAverbacao: emprestimo.dataAverbacao,
            numeroContrato: emprestimo.numeroContrato,
            valorEmprestado: emprestimo.valorEmprestado,
            valorLiberado: emprestimo.valorLiberado,
            valorParcela: emprestimo.valorParcela,
            qtdParcelas: emprestimo.qtdParcelas,
            situacao: emprestimo.situacao,
            qtdParcelaPagas: emprestimo.qtdParcelasPagas,
            competenciaInicio: emprestimo.competenciaInicio,
            competenciaFim: emprestimo.competenciaFim,
            tipoEmprestimo: emprestimo.tipo_emprestimo,
            nb: nby,
          },
        });
      }

      console.log("Criado");
      const dadosPessoais = await prisma.dadosPessoais.findUnique({
        where: {
          nb: nby,
        },
      });
      const dadosBancarios = await prisma.listaDadosBancario.findMany({
        where: {
          nb: nby,
        },
      });
      const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
        where: {
          nb: nby,
        },
      });
      const emprestimos = await prisma.listaEmprestimo.findMany({
        where: {
          nb: nby,
        },
      });
      const rmc = await prisma.listaRMC.findMany({
        where: {
          nb: nby,
        },
      });
      await prisma.office.update({
        where: {
          officeId: '1'
        },
        data: {
          credits: credit! - 1 
        }
      })
      res.send({
        dadosPessoais,
        dadosBancarios,
        dadosBeneficio,
        emprestimos,
        rmc,
      });

      res.send({});
    }
    } else {
      // Se os dados já existem no banco de dados
      const latest = new Date(dadosIsInDatabase.date);
      const hoje = new Date();

      const diferencaMilissegundos = hoje.getTime() - latest.getTime();
      const diferencaDias = Math.floor(
        diferencaMilissegundos / (1000 * 60 * 60 * 24)
      );

      console.log(Math.abs(diferencaDias));

      if (diferencaDias > 1) {
        const office = await prisma.office.findUnique({
          where: {
            officeId: '1'
          }
        })
        const credit = office?.credits
        if(credit! > 0) {

       
        const simul = await Simula();
        const listaDados = simul.listaDadosPessoais;
        const listaBeneficio = simul.listaDadosBeneficio;
        const listaDadoBank = simul.listaDadosBancario;
        const listaRmc = simul.listaRMC;
        const listaEmprestimos = simul.listaEmprestimos;

        const convertedCpf = parseInt(listaDados.cpf);
        await prisma.dadosPessoais.update({
          where: {
            nb: nby,
          },
          data: {
            nb: listaDados.nb,
            cpf: convertedCpf,
            ddb: listaDados.ddb,
            nome: listaDados.nome,
            dt_nascimento: listaDados.dt_nascimento,
            sexo: listaDados.sexo,
            date: new Date(),
          },
        });

        await prisma.listaDadosBeneficio.update({
          where: {
            nb: nby,
          },
          data: {
            beneficio: listaBeneficio.beneficio,
            especie: listaBeneficio.especie,
            situacao: listaBeneficio.situacao,
            pensao: listaBeneficio.pensao,
            representanteLegal: listaBeneficio.representanteLegal,
            possuiProcurador: listaBeneficio.possuiProcurador,
            elegivel: listaBeneficio.elegivel,
            bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
            valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
            valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
            valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
            valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
            valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
            basedeCalculo: listaBeneficio.basedeCalculo,
            nb: listaBeneficio.nb,
          },
        });

        await prisma.listaDadosBancario.create({
          data: {
            nomeBanco: listaDadoBank.nomeBanco,
            codigoBanco: listaDadoBank.codigoBanco,
            agencia: listaDadoBank.agencia,
            cc: listaDadoBank.cc,
            tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
            nb: nby,
          },
        });

        for (const rmc of listaRmc) {
          await prisma.listaRMC.create({
            data: {
              situacao: rmc.situacao,
              nomeBanco: rmc.nomeBanco,
              valor: rmc.valor,
              codigoBanco: rmc.codigoBanco,
              dataInclusao: rmc.dataInclusao,
              numeroEmprestimo: rmc.numeroEmprestimo,
              limite: rmc.limite,
              tipoEmprestimo: rmc["tipo emprestimo"],
              nb: nby,
            },
          });
        }

        for (const emprestimo of listaEmprestimos) {
          await prisma.listaEmprestimo.create({
            data: {
              nomeBanco: emprestimo.nomeBanco,
              codigoBanco: emprestimo.codigoBanco,
              dataAverbacao: emprestimo.dataAverbacao,
              numeroContrato: emprestimo.numeroContrato,
              valorEmprestado: emprestimo.valorEmprestado,
              valorLiberado: emprestimo.valorLiberado,
              valorParcela: emprestimo.valorParcela,
              qtdParcelas: emprestimo.qtdParcelas,
              situacao: emprestimo.situacao,
              qtdParcelaPagas: emprestimo.qtdParcelasPagas,
              competenciaInicio: emprestimo.competenciaInicio,
              competenciaFim: emprestimo.competenciaFim,
              tipoEmprestimo: emprestimo.tipo_emprestimo,
              nb: nby,
            },
          });
        }

        const dadosPessoais = await prisma.dadosPessoais.findUnique({
          where: {
            nb: nby,
          },
        });
        const dadosBancarios = await prisma.listaDadosBancario.findMany({
          where: {
            nb: nby,
          },
        });
        const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
          where: {
            nb: nby,
          },
        });
        const emprestimos = await prisma.listaEmprestimo.findMany({
          where: {
            nb: nby,
          },
        });
        const rmc = await prisma.listaRMC.findMany({
          where: {
            nb: nby,
          },
        });

        await prisma.office.update({
          where: {
            officeId: '1'
          },
          data: {
            credits: credit! - 1 
          }
        })

        res.send({
          dadosPessoais,
          dadosBancarios,
          dadosBeneficio,
          emprestimos,
          rmc,
        });

        console.log("Atualizado");
      }
      }
      const dadosPessoais = await prisma.dadosPessoais.findUnique({
        where: {
          nb: nby,
        },
      });
      const dadosBancarios = await prisma.listaDadosBancario.findMany({
        where: {
          nb: nby,
        },
      });
      const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
        where: {
          nb: nby,
        },
      });
      const emprestimos = await prisma.listaEmprestimo.findMany({
        where: {
          nb: nby,
        },
      });
      const rmc = await prisma.listaRMC.findMany({
        where: {
          nb: nby,
        },
      });

      res.send({
        dadosPessoais,
        dadosBancarios,
        dadosBeneficio,
        emprestimos,
        rmc,
      });
      console.log("lido do banco");
    }
  }
});

rout.get("/consultAdm/:nb", async (req, res) => {
  const body = req.params.nb;
  const nby = parseFloat(body);

  if (body) {
    const dadosIsInDatabase = await prisma.dadosPessoais.findUnique({
      where: {
        nb: nby,
      },
    });

    if (!dadosIsInDatabase) {
      const office = await prisma.office.findUnique({
        where: {
          officeId: '3'
        }
      })
      const credit = office?.credits
      if(office!.credits > 0) {

      
      const simul = await Simula();
      const listaDados = simul.listaDadosPessoais;
      const listaBeneficio = simul.listaDadosBeneficio;
      const listaDadoBank = simul.listaDadosBancario;
      const listaRmc = simul.listaRMC;
      const listaEmprestimos = simul.listaEmprestimos;

      const convertedCpf = parseInt(listaDados.cpf);
      await prisma.dadosPessoais.create({
        data: {
          nb: nby,
          cpf: convertedCpf,
          ddb: listaDados.ddb,
          nome: listaDados.nome,
          dt_nascimento: listaDados.dt_nascimento,
          sexo: listaDados.sexo,
        },
      });

      await prisma.listaDadosBeneficio.create({
        data: {
          beneficio: listaBeneficio.beneficio,
          especie: listaBeneficio.especie,
          situacao: listaBeneficio.situacao,
          pensao: listaBeneficio.pensao,
          representanteLegal: listaBeneficio.representanteLegal,
          possuiProcurador: listaBeneficio.possuiProcurador,
          elegivel: listaBeneficio.elegivel,
          bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
          valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
          valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
          valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
          valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
          valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
          basedeCalculo: listaBeneficio.basedeCalculo,
          nb: nby,
        },
      });

      await prisma.listaDadosBancario.create({
        data: {
          nomeBanco: listaDadoBank.nomeBanco,
          codigoBanco: listaDadoBank.codigoBanco,
          agencia: listaDadoBank.agencia,
          cc: listaDadoBank.cc,
          tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
          nb: nby,
        },
      });

      for (const rmc of listaRmc) {
        await prisma.listaRMC.create({
          data: {
            situacao: rmc.situacao,
            nomeBanco: rmc.nomeBanco,
            valor: rmc.valor,
            codigoBanco: rmc.codigoBanco,
            dataInclusao: rmc.dataInclusao,
            numeroEmprestimo: rmc.numeroEmprestimo,
            limite: rmc.limite,
            tipoEmprestimo: rmc["tipo emprestimo"],
            nb: nby,
          },
        });
      }

      for (const emprestimo of listaEmprestimos) {
        await prisma.listaEmprestimo.create({
          data: {
            nomeBanco: emprestimo.nomeBanco,
            codigoBanco: emprestimo.codigoBanco,
            dataAverbacao: emprestimo.dataAverbacao,
            numeroContrato: emprestimo.numeroContrato,
            valorEmprestado: emprestimo.valorEmprestado,
            valorLiberado: emprestimo.valorLiberado,
            valorParcela: emprestimo.valorParcela,
            qtdParcelas: emprestimo.qtdParcelas,
            situacao: emprestimo.situacao,
            qtdParcelaPagas: emprestimo.qtdParcelasPagas,
            competenciaInicio: emprestimo.competenciaInicio,
            competenciaFim: emprestimo.competenciaFim,
            tipoEmprestimo: emprestimo.tipo_emprestimo,
            nb: nby,
          },
        });
      }

      console.log("Criado");
      const dadosPessoais = await prisma.dadosPessoais.findUnique({
        where: {
          nb: nby,
        },
      });
      const dadosBancarios = await prisma.listaDadosBancario.findMany({
        where: {
          nb: nby,
        },
      });
      const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
        where: {
          nb: nby,
        },
      });
      const emprestimos = await prisma.listaEmprestimo.findMany({
        where: {
          nb: nby,
        },
      });
      const rmc = await prisma.listaRMC.findMany({
        where: {
          nb: nby,
        },
      });
      await prisma.office.update({
        where: {
          officeId: '3'
        },
        data: {
          credits: credit! - 1 
        }
      })
      res.send({
        dadosPessoais,
        dadosBancarios,
        dadosBeneficio,
        emprestimos,
        rmc,
      });

      res.send({});
    }
    } else {
      // Se os dados já existem no banco de dados
      const latest = new Date(dadosIsInDatabase.date);
      const hoje = new Date();

      const diferencaMilissegundos = hoje.getTime() - latest.getTime();
      const diferencaDias = Math.floor(
        diferencaMilissegundos / (1000 * 60 * 60 * 24)
      );

      console.log(Math.abs(diferencaDias));

      if (diferencaDias > 1) {
        const office = await prisma.office.findUnique({
          where: {
            officeId: '3'
          }
        })
        const credit = office?.credits
        if(credit! > 0) {

       
        const simul = await Simula();
        const listaDados = simul.listaDadosPessoais;
        const listaBeneficio = simul.listaDadosBeneficio;
        const listaDadoBank = simul.listaDadosBancario;
        const listaRmc = simul.listaRMC;
        const listaEmprestimos = simul.listaEmprestimos;

        const convertedCpf = parseInt(listaDados.cpf);
        await prisma.dadosPessoais.update({
          where: {
            nb: nby,
          },
          data: {
            nb: listaDados.nb,
            cpf: convertedCpf,
            ddb: listaDados.ddb,
            nome: listaDados.nome,
            dt_nascimento: listaDados.dt_nascimento,
            sexo: listaDados.sexo,
            date: new Date(),
          },
        });

        await prisma.listaDadosBeneficio.update({
          where: {
            nb: nby,
          },
          data: {
            beneficio: listaBeneficio.beneficio,
            especie: listaBeneficio.especie,
            situacao: listaBeneficio.situacao,
            pensao: listaBeneficio.pensao,
            representanteLegal: listaBeneficio.representanteLegal,
            possuiProcurador: listaBeneficio.possuiProcurador,
            elegivel: listaBeneficio.elegivel,
            bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
            valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
            valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
            valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
            valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
            valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
            basedeCalculo: listaBeneficio.basedeCalculo,
            nb: listaBeneficio.nb,
          },
        });

        await prisma.listaDadosBancario.create({
          data: {
            nomeBanco: listaDadoBank.nomeBanco,
            codigoBanco: listaDadoBank.codigoBanco,
            agencia: listaDadoBank.agencia,
            cc: listaDadoBank.cc,
            tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
            nb: nby,
          },
        });

        for (const rmc of listaRmc) {
          await prisma.listaRMC.create({
            data: {
              situacao: rmc.situacao,
              nomeBanco: rmc.nomeBanco,
              valor: rmc.valor,
              codigoBanco: rmc.codigoBanco,
              dataInclusao: rmc.dataInclusao,
              numeroEmprestimo: rmc.numeroEmprestimo,
              limite: rmc.limite,
              tipoEmprestimo: rmc["tipo emprestimo"],
              nb: nby,
            },
          });
        }

        for (const emprestimo of listaEmprestimos) {
          await prisma.listaEmprestimo.create({
            data: {
              nomeBanco: emprestimo.nomeBanco,
              codigoBanco: emprestimo.codigoBanco,
              dataAverbacao: emprestimo.dataAverbacao,
              numeroContrato: emprestimo.numeroContrato,
              valorEmprestado: emprestimo.valorEmprestado,
              valorLiberado: emprestimo.valorLiberado,
              valorParcela: emprestimo.valorParcela,
              qtdParcelas: emprestimo.qtdParcelas,
              situacao: emprestimo.situacao,
              qtdParcelaPagas: emprestimo.qtdParcelasPagas,
              competenciaInicio: emprestimo.competenciaInicio,
              competenciaFim: emprestimo.competenciaFim,
              tipoEmprestimo: emprestimo.tipo_emprestimo,
              nb: nby,
            },
          });
        }

        const dadosPessoais = await prisma.dadosPessoais.findUnique({
          where: {
            nb: nby,
          },
        });
        const dadosBancarios = await prisma.listaDadosBancario.findMany({
          where: {
            nb: nby,
          },
        });
        const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
          where: {
            nb: nby,
          },
        });
        const emprestimos = await prisma.listaEmprestimo.findMany({
          where: {
            nb: nby,
          },
        });
        const rmc = await prisma.listaRMC.findMany({
          where: {
            nb: nby,
          },
        });

        await prisma.office.update({
          where: {
            officeId: '3'
          },
          data: {
            credits: credit! - 1 
          }
        })

        res.send({
          dadosPessoais,
          dadosBancarios,
          dadosBeneficio,
          emprestimos,
          rmc,
        });

        console.log("Atualizado");
      }
      }
      const dadosPessoais = await prisma.dadosPessoais.findUnique({
        where: {
          nb: nby,
        },
      });
      const dadosBancarios = await prisma.listaDadosBancario.findMany({
        where: {
          nb: nby,
        },
      });
      const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
        where: {
          nb: nby,
        },
      });
      const emprestimos = await prisma.listaEmprestimo.findMany({
        where: {
          nb: nby,
        },
      });
      const rmc = await prisma.listaRMC.findMany({
        where: {
          nb: nby,
        },
      });

      res.send({
        dadosPessoais,
        dadosBancarios,
        dadosBeneficio,
        emprestimos,
        rmc,
      });
      console.log("lido do banco");
    }
  }
});


rout.get("/consult/:nb", async (req, res) => {
  const body = req.params.nb;
  const nby = parseFloat(body);

  if (body) {
    const dadosIsInDatabase = await prisma.dadosPessoais.findUnique({
      where: {
        nb: nby,
      },
    });

    if (!dadosIsInDatabase) {
      const office = await prisma.office.findUnique({
        where: {
          officeId: '2'
        }
      })
      const credit = office?.credits
      if(office!.credits > 0) {
      const simul = await Simula();
      const listaDados = simul.listaDadosPessoais;
      const listaBeneficio = simul.listaDadosBeneficio;
      const listaDadoBank = simul.listaDadosBancario;
      const listaRmc = simul.listaRMC;
      const listaEmprestimos = simul.listaEmprestimos;

      const convertedCpf = parseInt(listaDados.cpf);
      await prisma.dadosPessoais.create({
        data: {
          nb: nby,
          cpf: convertedCpf,
          ddb: listaDados.ddb,
          nome: listaDados.nome,
          dt_nascimento: listaDados.dt_nascimento,
          sexo: listaDados.sexo,
        },
      });

      await prisma.listaDadosBeneficio.create({
        data: {
          beneficio: listaBeneficio.beneficio,
          especie: listaBeneficio.especie,
          situacao: listaBeneficio.situacao,
          pensao: listaBeneficio.pensao,
          representanteLegal: listaBeneficio.representanteLegal,
          possuiProcurador: listaBeneficio.possuiProcurador,
          elegivel: listaBeneficio.elegivel,
          bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
          valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
          valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
          valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
          valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
          valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
          basedeCalculo: listaBeneficio.basedeCalculo,
          nb: nby,
        },
      });

      await prisma.listaDadosBancario.create({
        data: {
          nomeBanco: listaDadoBank.nomeBanco,
          codigoBanco: listaDadoBank.codigoBanco,
          agencia: listaDadoBank.agencia,
          cc: listaDadoBank.cc,
          tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
          nb: nby,
        },
      });

      for (const rmc of listaRmc) {
        await prisma.listaRMC.create({
          data: {
            situacao: rmc.situacao,
            nomeBanco: rmc.nomeBanco,
            valor: rmc.valor,
            codigoBanco: rmc.codigoBanco,
            dataInclusao: rmc.dataInclusao,
            numeroEmprestimo: rmc.numeroEmprestimo,
            limite: rmc.limite,
            tipoEmprestimo: rmc["tipo emprestimo"],
            nb: nby,
          },
        });
      }

      for (const emprestimo of listaEmprestimos) {
        await prisma.listaEmprestimo.create({
          data: {
            nomeBanco: emprestimo.nomeBanco,
            codigoBanco: emprestimo.codigoBanco,
            dataAverbacao: emprestimo.dataAverbacao,
            numeroContrato: emprestimo.numeroContrato,
            valorEmprestado: emprestimo.valorEmprestado,
            valorLiberado: emprestimo.valorLiberado,
            valorParcela: emprestimo.valorParcela,
            qtdParcelas: emprestimo.qtdParcelas,
            situacao: emprestimo.situacao,
            qtdParcelaPagas: emprestimo.qtdParcelasPagas,
            competenciaInicio: emprestimo.competenciaInicio,
            competenciaFim: emprestimo.competenciaFim,
            tipoEmprestimo: emprestimo.tipo_emprestimo,
            nb: nby,
          },
        });
      }

      console.log("Criado");
      const dadosPessoais = await prisma.dadosPessoais.findUnique({
        where: {
          nb: nby,
        },
      });
      const dadosBancarios = await prisma.listaDadosBancario.findMany({
        where: {
          nb: nby,
        },
      });
      const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
        where: {
          nb: nby,
        },
      });
      const emprestimos = await prisma.listaEmprestimo.findMany({
        where: {
          nb: nby,
        },
      });
      const rmc = await prisma.listaRMC.findMany({
        where: {
          nb: nby,
        },
      });
      await prisma.office.update({
        where: {
          officeId: '2'
        },
        data: {
          credits: credit! - 1 
        }
      })

      res.send({
        dadosPessoais,
        dadosBancarios,
        dadosBeneficio,
        emprestimos,
        rmc,
      });

      res.send({});
    }
    } else {
      // Se os dados já existem no banco de dados
      const latest = new Date(dadosIsInDatabase.date);
      const hoje = new Date();

      const diferencaMilissegundos = hoje.getTime() - latest.getTime();
      const diferencaDias = Math.floor(
        diferencaMilissegundos / (1000 * 60 * 60 * 24)
      );

      console.log(Math.abs(diferencaDias));

      if (diferencaDias > 5) {
        const office = await prisma.office.findUnique({
          where: {
            officeId: '2'
          }
        })
        const credit = office?.credits
        if(credit! > 0) {
        const simul = await Simula();
        const listaDados = simul.listaDadosPessoais;
        const listaBeneficio = simul.listaDadosBeneficio;
        const listaDadoBank = simul.listaDadosBancario;
        const listaRmc = simul.listaRMC;
        const listaEmprestimos = simul.listaEmprestimos;

        const convertedCpf = parseInt(listaDados.cpf);
        await prisma.dadosPessoais.update({
          where: {
            nb: nby,
          },
          data: {
            nb: listaDados.nb,
            cpf: convertedCpf,
            ddb: listaDados.ddb,
            nome: listaDados.nome,
            dt_nascimento: listaDados.dt_nascimento,
            sexo: listaDados.sexo,
            date: new Date(),
          },
        });

        await prisma.listaDadosBeneficio.update({
          where: {
            nb: nby,
          },
          data: {
            beneficio: listaBeneficio.beneficio,
            especie: listaBeneficio.especie,
            situacao: listaBeneficio.situacao,
            pensao: listaBeneficio.pensao,
            representanteLegal: listaBeneficio.representanteLegal,
            possuiProcurador: listaBeneficio.possuiProcurador,
            elegivel: listaBeneficio.elegivel,
            bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
            valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
            valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
            valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
            valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
            valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
            basedeCalculo: listaBeneficio.basedeCalculo,
            nb: listaBeneficio.nb,
          },
        });

        await prisma.listaDadosBancario.create({
          data: {
            nomeBanco: listaDadoBank.nomeBanco,
            codigoBanco: listaDadoBank.codigoBanco,
            agencia: listaDadoBank.agencia,
            cc: listaDadoBank.cc,
            tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
            nb: nby,
          },
        });

        for (const rmc of listaRmc) {
          await prisma.listaRMC.create({
            data: {
              situacao: rmc.situacao,
              nomeBanco: rmc.nomeBanco,
              valor: rmc.valor,
              codigoBanco: rmc.codigoBanco,
              dataInclusao: rmc.dataInclusao,
              numeroEmprestimo: rmc.numeroEmprestimo,
              limite: rmc.limite,
              tipoEmprestimo: rmc["tipo emprestimo"],
              nb: nby,
            },
          });
        }

        for (const emprestimo of listaEmprestimos) {
          await prisma.listaEmprestimo.create({
            data: {
              nomeBanco: emprestimo.nomeBanco,
              codigoBanco: emprestimo.codigoBanco,
              dataAverbacao: emprestimo.dataAverbacao,
              numeroContrato: emprestimo.numeroContrato,
              valorEmprestado: emprestimo.valorEmprestado,
              valorLiberado: emprestimo.valorLiberado,
              valorParcela: emprestimo.valorParcela,
              qtdParcelas: emprestimo.qtdParcelas,
              situacao: emprestimo.situacao,
              qtdParcelaPagas: emprestimo.qtdParcelasPagas,
              competenciaInicio: emprestimo.competenciaInicio,
              competenciaFim: emprestimo.competenciaFim,
              tipoEmprestimo: emprestimo.tipo_emprestimo,
              nb: nby,
            },
          });
        }

        const dadosPessoais = await prisma.dadosPessoais.findUnique({
          where: {
            nb: nby,
          },
        });
        const dadosBancarios = await prisma.listaDadosBancario.findMany({
          where: {
            nb: nby,
          },
        });
        const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
          where: {
            nb: nby,
          },
        });
        const emprestimos = await prisma.listaEmprestimo.findMany({
          where: {
            nb: nby,
          },
        });
        const rmc = await prisma.listaRMC.findMany({
          where: {
            nb: nby,
          },
        });
        await prisma.office.update({
          where: {
            officeId: '2'
          },
          data: {
            credits: credit! - 1 
          }
        })

        res.send({
          dadosPessoais,
          dadosBancarios,
          dadosBeneficio,
          emprestimos,
          rmc,
        });

        console.log("Atualizado");
      }
      }
      const dadosPessoais = await prisma.dadosPessoais.findUnique({
        where: {
          nb: nby,
        },
      });
      const dadosBancarios = await prisma.listaDadosBancario.findMany({
        where: {
          nb: nby,
        },
      });
      const dadosBeneficio = await prisma.listaDadosBeneficio.findMany({
        where: {
          nb: nby,
        },
      });
      const emprestimos = await prisma.listaEmprestimo.findMany({
        where: {
          nb: nby,
        },
      });
      const rmc = await prisma.listaRMC.findMany({
        where: {
          nb: nby,
        },
      });

      res.send({
        dadosPessoais,
        dadosBancarios,
        dadosBeneficio,
        emprestimos,
        rmc,
      });
      console.log("lido do banco");
    }
  }
});

rout.get("/teste", (req, res) => {
  res.send({
    listaDadosPessoais: {
      nb: 2233,
      cpf: 9246264886,
      ddb: "2001-01-09",
      nome: "WANDERCY MARTINS DA CRUZ",
      dt_nascimento: "1953-11-05",
      sexo: "Feminino",
    },
    listaDadosBeneficio: {
      beneficio: 1193267045,
      especie: "21 - PENSAO POR MORTE PREVIDENCIARIA",
      situacao: "ATIVO",
      pensao: false,
      representanteLegal: false,
      possuiProcurador: false,
      elegivel: true,
      bloqueioEmprestimo: false,
      valorMargemDisponivelRCC: 70.6,
      valorMargemConsignavelEmp: 494.2,
      valorMargemDisponivelEmp: 93.46,
      valorMargemUtilizadaEmp: 400.74,
      valorMargemDisponivelRMC: 0,
      basedeCalculo: 1412,
    },
    listaDadosBancario: {
      nomeBanco: "CAIXA ECONOMICA FEDERAL",
      codigoBanco: 104,
      agencia: "1006",
      cc: "9710793140",
      tipoMeioPagamento: "CONTA-CORRENTE",
    },
    listaRMC: [
      {
        situacao: "ATIVA",
        nomeBanco: "BANCO BMG SA",
        valor: 54.9,
        codigoBanco: 318,
        dataInclusao: "01/11/2015",
        numeroEmprestimo: "11483685",
        limite: 1175,
        "tipo emprestimo": 76,
      },
    ],
    novos_RCC: [],
    listaEmprestimos: [
      {
        nomeBanco: "QI SOCIEDADE DE CREDITO S.A.",
        codigoBanco: 329,
        dataAverbacao: "02/02/2023",
        numeroContrato: "0004033355WMD",
        valorEmprestado: 14616.84,
        valorLiberado: 6515.11,
        valorParcela: 174.01,
        qtdParcelas: 84,
        situacao: "ATIVA",
        qtdParcelasPagas: 14,
        competenciaInicio: "03/2023",
        competenciaFim: "02/2030",
        tipo_emprestimo: 98,
      },
      {
        nomeBanco: "CAIXA ECONOMICA FEDERAL",
        codigoBanco: 104,
        dataAverbacao: "22/10/2020",
        numeroContrato: "211006110001687465",
        valorEmprestado: 5646.08,
        valorLiberado: 4400,
        valorParcela: 88.22,
        qtdParcelas: 64,
        situacao: "ATIVA",
        qtdParcelasPagas: 42,
        competenciaInicio: "11/2020",
        competenciaFim: "02/2026",
        tipo_emprestimo: 98,
      },
      {
        nomeBanco: "BANCO C6 CONSIGNADO",
        codigoBanco: 626,
        dataAverbacao: "24/11/2020",
        numeroContrato: "010014343686",
        valorEmprestado: 6721.68,
        valorLiberado: 3231.83,
        valorParcela: 80.02,
        qtdParcelas: 84,
        situacao: "ATIVA",
        qtdParcelasPagas: 40,
        competenciaInicio: "12/2020",
        competenciaFim: "11/2027",
        tipo_emprestimo: 98,
      },
      {
        nomeBanco: "BANCO C6 CONSIGNADO",
        codigoBanco: 626,
        dataAverbacao: "11/11/2020",
        numeroContrato: "010014013772",
        valorEmprestado: 4913.16,
        valorLiberado: 2353.72,
        valorParcela: 58.49,
        qtdParcelas: 84,
        situacao: "ATIVA",
        qtdParcelasPagas: 41,
        competenciaInicio: "12/2020",
        competenciaFim: "11/2027",
        tipo_emprestimo: 98,
      },
    ],
  });
});

// rout.post("/consultaBackoffice", async (req, res) => {
//   const body = req.body.listaDadosPessoais;
//   const nby = body.nb;
//   if (body) {
//     const dadosIsInDatabase = await prisma.dadosPessoais.findUnique({
//       where: {
//         nb: nby,
//       },
//     });
//     if (dadosIsInDatabase == null) {
//       const listaDados = req.body.listaDadosPessoais;
//       const listaBeneficio = req.body.listaDadosBeneficio;
//       const listaDadoBank = req.body.listaDadosBancario;
//       const listRmc = req.body.listaRMC[0];
//       const rmc = req.body.novos_RCC;
//       const listaEmprestimos = req.body.listaEmprestimos;

//       const convertedCpf = parseInt(listaDados.cpf);
//       await prisma.dadosPessoais.create({
//         data: {
//           nb: listaDados.nb,
//           cpf: convertedCpf,
//           ddb: listaDados.ddb,
//           nome: listaDados.nome,
//           dt_nascimento: listaDados.dt_nascimento,
//           sexo: listaDados.sexo,
//         },
//       });
//       await prisma.listaDadosBeneficio.create({
//         data: {
//           beneficio: listaBeneficio.beneficio,
//           especie: listaBeneficio.especie,
//           situacao: listaBeneficio.situacao,
//           pensao: listaBeneficio.pensao,
//           representanteLegal: listaBeneficio.representanteLegal,
//           possuiProcurador: listaBeneficio.possuiProcurador,
//           elegivel: listaBeneficio.elegivel,
//           bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
//           valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
//           valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
//           valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
//           valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
//           valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
//           basedeCalculo: listaBeneficio.basedeCalculo,
//           nb: listaDados.nb,
//         },
//       });

//       await prisma.listaDadosBancario.create({
//         data: {
//           nomeBanco: listaDadoBank.nomeBanco,
//           codigoBanco: listaDadoBank.codigoBanco,
//           agencia: listaDadoBank.agencia,
//           cc: listaDadoBank.cc,
//           tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
//           nb: listaDados.nb,
//         },
//       });

//       await prisma.listaRMC.create({
//         data: {
//           situacao: listRmc.situacao,
//           nomeBanco: listRmc.nomeBanco,
//           valor: listRmc.valor,
//           codigoBanco: listRmc.codigoBanco,
//           dataInclusao: listRmc.dataInclusao,
//           numeroEmprestimo: listRmc.numeroEmprestimo,
//           limite: listRmc.limite,
//           tipoEmprestimo: listRmc["tipo emprestimo"],
//           nb: listaDados.nb,
//         },
//       });

//       await prisma.listaEmprestimo.create({
//         data: {
//           nomeBanco: listaEmprestimos.nomeBanco,
//           codigoBanco: listaEmprestimos.codigoBanco,
//           dataAverbacao: listaEmprestimos.dataAverbacao,
//           numeroContrato: listaEmprestimos.numeroContrato,
//           valorEmprestado: listaEmprestimos.valorEmprestado,
//           valorLiberado: listaEmprestimos.valorLiberado,
//           valorParcela: listaEmprestimos.valorParcela,
//           qtdParcelas: listaEmprestimos.qtdParcelas,
//           situacao: listaEmprestimos.situacao,
//           qtdParcelaPagas: listaEmprestimos.qtdParcelasPagas,
//           competenciaInicio: listaEmprestimos.competenciaInicio,
//           competenciaFim: listaEmprestimos.competenciaFim,
//           tipoEmprestimo: listaEmprestimos.tipo_emprestimo,
//           nb: listaDados.nb,
//         },
//       });

//       res.send(req.body);
//       console.log(listaEmprestimos.nomeBanco);
//     } else {
//       const latest = new Date(dadosIsInDatabase.date);
//       const hoje = new Date();

//       const diferencaMilissegundos: number = hoje.getTime() - latest.getTime();
//       const diferencaDias = Math.floor(
//         diferencaMilissegundos / (1000 * 60 * 60 * 24)
//       );
//       console.log(Math.abs(diferencaDias));

//       if (diferencaDias > 1) {
//         const listaDados = req.body.listaDadosPessoais;
//         const listaBeneficio = req.body.listaDadosBeneficio;
//         const listaDadoBank = req.body.listaDadosBancario;
//         const listRmc = req.body.listaRMC[0];
//         const rmc = req.body.novos_RCC;
//         const listaEmprestimos = req.body.listaEmprestimos;

//         const convertedCpf = parseInt(listaDados.cpf);
//         await prisma.dadosPessoais.update({
//           where: {
//             nb: nby,
//           },
//           data: {
//             nb: listaDados.nb,
//             cpf: convertedCpf,
//             ddb: listaDados.ddb,
//             nome: listaDados.nome,
//             dt_nascimento: listaDados.dt_nascimento,
//             sexo: listaDados.sexo,
//             date: new Date(),
//           },
//         });
//         await prisma.listaDadosBeneficio.update({
//           where: {
//             nb: nby,
//           },
//           data: {
//             beneficio: listaBeneficio.beneficio,
//             especie: listaBeneficio.especie,
//             situacao: listaBeneficio.situacao,
//             pensao: listaBeneficio.pensao,
//             representanteLegal: listaBeneficio.representanteLegal,
//             possuiProcurador: listaBeneficio.possuiProcurador,
//             elegivel: listaBeneficio.elegivel,
//             bloqueioEmprestimo: listaBeneficio.bloqueioEmprestimo,
//             valorMargemDisponivelRCC: listaBeneficio.valorMargemDisponivelRCC,
//             valorMargemConsignavelEmp: listaBeneficio.valorMargemConsignavelEmp,
//             valorMargemDisponivelEmp: listaBeneficio.valorMargemDisponivelEmp,
//             valorMargemUtilizadaEmp: listaBeneficio.valorMargemUtilizadaEmp,
//             valorMargemDisponivelRMC: listaBeneficio.valorMargemDisponivelRMC,
//             basedeCalculo: listaBeneficio.basedeCalculo,
//             nb: listaDados.nb,
//           },
//         });

//         await prisma.listaDadosBancario.update({
//           where: {
//             nb: nby,
//           },
//           data: {
//             nomeBanco: listaDadoBank.nomeBanco,
//             codigoBanco: listaDadoBank.codigoBanco,
//             agencia: listaDadoBank.agencia,
//             cc: listaDadoBank.cc,
//             tipoMeioPagamento: listaDadoBank.tipoMeioPagamento,
//             nb: listaDados.nb,
//           },
//         });

//         await prisma.listaRMC.update({
//           where: {
//             nb: nby,
//           },
//           data: {
//             situacao: listRmc.situacao,
//             nomeBanco: listRmc.nomeBanco,
//             valor: listRmc.valor,
//             codigoBanco: listRmc.codigoBanco,
//             dataInclusao: listRmc.dataInclusao,
//             numeroEmprestimo: listRmc.numeroEmprestimo,
//             limite: listRmc.limite,
//             tipoEmprestimo: listRmc["tipo emprestimo"],
//             nb: listaDados.nb,
//           },
//         });

//         await prisma.listaEmprestimo.update({
//           where: {
//             nb: nby,
//           },
//           data: {
//             nomeBanco: listaEmprestimos.nomeBanco,
//             codigoBanco: listaEmprestimos.codigoBanco,
//             dataAverbacao: listaEmprestimos.dataAverbacao,
//             numeroContrato: listaEmprestimos.numeroContrato,
//             valorEmprestado: listaEmprestimos.valorEmprestado,
//             valorLiberado: listaEmprestimos.valorLiberado,
//             valorParcela: listaEmprestimos.valorParcela,
//             qtdParcelas: listaEmprestimos.qtdParcelas,
//             situacao: listaEmprestimos.situacao,
//             qtdParcelaPagas: listaEmprestimos.qtdParcelasPagas,
//             competenciaInicio: listaEmprestimos.competenciaInicio,
//             competenciaFim: listaEmprestimos.competenciaFim,
//             tipoEmprestimo: listaEmprestimos.tipo_emprestimo,
//             nb: listaDados.nb,
//           },
//         });
//         console.log("Atualizado");
//       }

//       res.send(dadosIsInDatabase);
//       console.log("lido do banco");
//     }
//   }
// })
