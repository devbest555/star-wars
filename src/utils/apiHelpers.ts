import axios from "axios"

export const getFilmDetails = async (link: string) => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(link).then((res) => {
                if (res.status === 200) {
                    resolve(res.data)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
