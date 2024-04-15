module.exports  = {
    version: "v1",
    base: process.env.NODE_ENV === "production" ? "https://site.com/api" : "http://localhost:3000/api"
}