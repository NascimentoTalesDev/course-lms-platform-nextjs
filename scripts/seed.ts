const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

const main = async() => {
    try {
        await database.category.createMany({
            data: [
                { name: "Ciências da computação" },
                { name: "Negócios" },
                { name: "Marketing" },
                { name: "Saúde e fitness" },
                { name: "Música" },
                { name: "Desenvolvimento pesoal" },
                { name: "Designer" },
                { name: "Ti e software" },
                { name: "Finanças e contabilidade" },
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