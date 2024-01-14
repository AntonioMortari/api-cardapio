import 'dotenv/config'

const PORT = process.env.PORT || 3000
const MONGO_CONNECT = process.env.MONGO_CONNECT || ''

export { MONGO_CONNECT, PORT }