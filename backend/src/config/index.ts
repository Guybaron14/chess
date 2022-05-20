import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').default('8080').asPortNumber(),
        useCors: env.get('USE_CORS').default('false').asBool(),
    },
};

export default config;
