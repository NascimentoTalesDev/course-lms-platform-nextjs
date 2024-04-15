import axios from 'axios'
import { version, base } from "@/lib/config-api"

export default axios.create({
    baseURL: `${base}/${version}`
})