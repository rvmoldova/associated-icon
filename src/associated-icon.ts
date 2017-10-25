import 'reflect-metadata';
import 'source-map-support/register';
import 'ts-helpers';

import { type } from 'os';
import { spawn } from 'child_process';
import { join } from 'path';

import { AssociatedIconInterface, IconResponseInterface } from '../index';

class AssociatedIcon implements AssociatedIconInterface {
    constructor() { }

    getBase64Icon(appPath: string): Promise<IconResponseInterface | Error> {
        if (type() === 'Windows_NT') {
            return this.getBase64IconWindows(appPath);
        } else {
            console.warn(`Not supported yet on platform ${type()}`);
            return Promise.resolve(<IconResponseInterface>{ Path: appPath, Base64Data: '' });
        }
    }

    private getBase64IconWindows(path: string): Promise<IconResponseInterface | Error> {
        return new Promise((resolve, reject) => {
            let process = spawn(join(__dirname, 'bin', 'windows', 'WinAssociatedIcon.exe'), [path]);
            let outData = '';
            process.stdout.on('data', (data) => {
                outData += data.toString();
            });
            process.on('close', (code) => {
                if (code === 0) {
                    try {
                        let data = JSON.parse(outData);
                        return resolve(data);
                    } catch (error) {
                        return reject(error.message);
                    }
                } else {
                    return reject(`Error Code: ${code}`);
                }
            });
        });
    }
}

export default AssociatedIcon;
