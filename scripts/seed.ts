const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

const main = async() => {
    try {
        await database.category.createMany({
            data: [
                { name: "Ciências da computação" },
                { name: "Marketing" },
                { name: "Saúde e fitness" },
                { name: "Desenvolvimento pesoal" },
                { name: "Designer" },
                { name: "Ti e software" },
                { name: "Finanças e contabilidade" },
                { name: "Música" },
                { name: "Games" },
                { name: "Negócios" },
                { name: "Empreendedorismo" },
                { name: "Fotografia e video" },
                { name: "Certificações" },
            ]
        })
        
        console.log("Successfully");
    } catch (error) {
        console.log(error);
    }finally{
        database.$disconnect();
    }
}

main()