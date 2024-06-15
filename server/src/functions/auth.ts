import { config } from 'dotenv';
import { jsonHandler } from '../utils';

config({ override: true });

async function auth(): Promise<void> {
    try {
        console.log('work')
    } catch (error) {
        console.log(error);
    }
}

export default jsonHandler(auth);