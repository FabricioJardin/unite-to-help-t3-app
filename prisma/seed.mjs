import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type Array<import("@prisma/client").Cause> */
const initialCauses = [
  {
    id: "340d9d5e-e958-11ed-a05b-0242ac120003",
    name: "Ações Emergênciais",
  },
  {
    id: "340da48e-e958-11ed-a05b-0242ac120003",
    name: "Cidadania",
  },
  {
    id: "340da6c8-e958-11ed-a05b-0242ac120003",
    name: "Cidade Inteligentes",
  },
  {
    id: "340da8a8-e958-11ed-a05b-0242ac120003",
    name: "Combate à Pobreza",
  },
  {
    id: "340daaa6-e958-11ed-a05b-0242ac120003",
    name: "Consumo Consciente",
  },
  {
    id: "340dacb8-e958-11ed-a05b-0242ac120003",
    name: "Crianças",
  },
  {
    id: "340dae98-e958-11ed-a05b-0242ac120003",
    name: "Cultura e Arte",
  },
  {
    id: "340db08c-e958-11ed-a05b-0242ac120003",
    name: "Dependentes Químicos",
  },
  {
    id: "340db2a8-e958-11ed-a05b-0242ac120003",
    name: "Direitos Humanos",
  },
  {
    id: "340db866-e958-11ed-a05b-0242ac120003",
    name: "Educação",
  },
  {
    id: "340dba6e-e958-11ed-a05b-0242ac120003",
    name: "Esportes",
  },
  {
    id: "340dbc44-e958-11ed-a05b-0242ac120003",
    name: "Idosos",
  },
  {
    id: "340dbe2e-e958-11ed-a05b-0242ac120003",
    name: "Igualdade de Gênero",
  },
  {
    id: "340dc00e-e958-11ed-a05b-0242ac120003",
    name: "Inclusão",
  },
  {
    id: "340dc1f8-e958-11ed-a05b-0242ac120003",
    name: "Meio Ambiente",
  },
  {
    id: "340dc3ec-e958-11ed-a05b-0242ac120003",
    name: "Mulheres",
  },
  {
    id: "340dc842-e958-11ed-a05b-0242ac120003",
    name: "Música",
  },
  {
    id: "340dca54-e958-11ed-a05b-0242ac120003",
    name: "Pessoas com Câncer",
  },
  {
    id: "340dcc48-e958-11ed-a05b-0242ac120003",
    name: "Pessoas com Deficiência",
  },
  {
    id: "340dce28-e958-11ed-a05b-0242ac120003",
    name: "Pessoas com Doenças Raras",
  },
  {
    id: "340dd01c-e958-11ed-a05b-0242ac120003",
    name: "Pessoas em Situação de Rua",
  },
  {
    id: "340dd206-e958-11ed-a05b-0242ac120003",
    name: "Proteção Animal",
  },
  {
    id: "340dd3fa-e958-11ed-a05b-0242ac120003",
    name: "Refugiados",
  },
  {
    id: "340dd864-e958-11ed-a05b-0242ac120003",
    name: "Saúde",
  },
  {
    id: "340dda76-e958-11ed-a05b-0242ac120003",
    name: "Treinamento Profissional",
  },
];

async function main() {
  await prisma.$transaction(
    initialCauses.map(({ id, name }) =>
      prisma.cause.upsert({
        create: {
          id,
          name,
        },
        update: {},
        where: {
          id,
        },
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
