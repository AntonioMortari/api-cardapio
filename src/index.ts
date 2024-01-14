import {server} from './server'
import { PORT } from './config'

import './server/database/connect'

server.listen(PORT, () => console.log('Server is running'))