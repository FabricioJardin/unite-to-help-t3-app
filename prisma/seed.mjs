import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

/** @type Array<string> */
const initialCauses = [
  "Ações Emergênciais",
  "Cidadania",
  "Cidade Inteligentes",
  "Combate à Pobreza",
  "Consumo Consciente",
  "Crianças",
  "Cultura e Arte",
  "Dependentes Químicos",
  "Direitos Humanos",
  "Educação",
  "Esportes",
  "Idosos",
  "Igualdade de Gênero",
  "Inclusão",
  "Meio Ambiente",
  "Mulheres",
  "Música",
  "Pessoas com Câncer",
  "Pessoas com Deficiência",
  "Pessoas com Doenças Raras",
  "Pessoas em Situação de Rua",
  "Proteção Animal",
  "Refugiados",
  "Saúde",
  "Treinamento Profissional",
];

async function main() {
  await prisma.$transaction(
    initialCauses.map((name) =>
      prisma.cause.create({
        data: {
          id: randomUUID(),
          name,
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
