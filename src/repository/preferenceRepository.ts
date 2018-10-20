import { get } from 'request';
import { PREFERENCE_URL } from '../utils/secrets';
import { BadRequest } from '../utils/exceptions';

export function preferenceUser(token: string): any {
    return new Promise((resolve, reject) => {
        get(PREFERENCE_URL, { headers: { 'Authorization': token }}, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(new BadRequest('Error requesting to preference service'));
            }
        });
    });
}