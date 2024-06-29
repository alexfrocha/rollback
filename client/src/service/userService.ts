import axios from "axios";
import { BASE_API, defaultErrorRequestMessage } from "./settings";

export async function createUser({username, password}: {username: string, password: string}) {
    let createdUser: {
        username?: string,
        id?: string,
        password?: string
    } = {}
    await axios.post(`${BASE_API}/api/user/`, {
        username,
        password
    }).then((response) => {
        createdUser = response.data
    }).catch((error) => {
        console.log(defaultErrorRequestMessage + error)
    })
    return createdUser
}

export async function getUserById({id}: {id: string}) {
    let requestedUser: {
        username?: string,
        id?: string,
        password?: string

    } = {}
    await axios.get(`${BASE_API}/api/user/${id}`)
        .then((response) => {
            console.log(response.data)
            requestedUser = response.data
        })
        .catch((error) => {
            console.log(defaultErrorRequestMessage + error)
        })
    return requestedUser
}

export async function getUserByUsername({username}: {username: string}) {
    let requestedUser: {
        username?: string,
        id?: string,
        password?: string
    } = {}
    await axios.get(`${BASE_API}/api/user/username/${username}`)
        .then((response) => {
            requestedUser = response.data
        })
        .catch((error) => {
            console.log(defaultErrorRequestMessage + error)
        })
    return requestedUser
}