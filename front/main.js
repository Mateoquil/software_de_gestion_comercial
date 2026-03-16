

console.log("estoy aqui")
const consultarApi = async (url) =>{
    const api = await fetch(url)
    const rspApi = await api.json()
    console.log(rspApi)
}

consultarApi("http://localhost:3000/api/traer-productos")
// consultarApi("https://pokeapi.co/api/v2/pokemon/ditto")