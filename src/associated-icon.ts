import 'reflect-metadata';
import 'source-map-support/register';
import 'ts-helpers';

import { type } from 'os';
import { spawn } from 'child_process';
import { join } from 'path';

import { AssociatedIconInterface, IconResponseInterface } from '../index';

const bin = {
    Windows_NT: join(__dirname, 'bin', 'windows', 'WinAssociatedIcon.exe'),
    Darwin: join(__dirname, 'bin', 'mac', 'MacAssociatedIcon'),
};

class AssociatedIcon implements AssociatedIconInterface {
    constructor() { }

    getBase64Icon(appPath: string): Promise<IconResponseInterface | Error> {
        if (bin[type()]) {
            return this.getIcon(appPath, bin[type()]);
        } else {
            console.warn(`Not supported yet on platform ${type()}`);
            return Promise.resolve(<IconResponseInterface>{ Path: appPath, Base64Data: '' });
        }
    }

    private getIcon(path: string, bin: string): Promise<IconResponseInterface | Error> {
        return new Promise((resolve, reject) => {
            let process = spawn(bin, [path]);
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
