import bcrypt from 'bcrypt'

class HashingService {

    saltRounds = 10

    encrypt = async (password) => bcrypt.hashSync(password, this.saltRounds);

    decrypt = async (hash, password) => bcrypt.compareSync(password, hash)
}

export default new HashingService()