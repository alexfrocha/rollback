import axios from "axios"

const BASE_API = process.env.REACT_APP_BASEAPI_URL;

function getAllArchivesByFolderId(folderId: string) {
    axios.get(`${BASE_API}/api/archives/folder/${folderId}`).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log("Aconteceu um erro enquanto fazia requisição: " + error)
    })
}

export {getAllArchivesByFolderId}