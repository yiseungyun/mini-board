import axios from "axios";
import { REGISTER_POST } from './types';

export function registerPost(dataTosubmit) {
    const request = axios.post('/api/posts', dataTosubmit)
    .then(response => response.data)

    return {
        type: REGISTER_POST,
        payload: request
    }
}

