import user from '../schema/users.js'
import axios from 'axios'
import path from 'path'

class BaseService {

    activate = async (_id, state) => {
        await user.updateOne({ _id }, { isActive: state })
    }

    register = async (body) => {
        console.log(body);
        let respose = await axios.post(path.join(process.env.BACK_URL, '/auth/signUp'), body)
        return respose.data
    }

}

export default new BaseService()