import 'reflect-metadata';
import 'source-map-support/register';
import 'ts-helpers';

import { execFile as execFileTemp, spawn } from 'child_process';
import { type } from 'os';
import { join } from 'path';
import { promisify } from 'util';

import { AssociatedIconInterface, IconResponseInterface } from '../index';

const execFile = promisify(execFileTemp);

const bin = {
    Windows_NT: join(__dirname, 'bin', 'windows', 'WinAssociatedIcon.exe'),
    Darwin: join(__dirname, 'bin', 'mac', 'MacAssociatedIcon'),
};

class AssociatedIcon implements AssociatedIconInterface {
    private _execFile = false;

    constructor(_execFile = false) {
        this._execFile = _execFile;
    }

    getBase64Icon(appPath: string): Promise<IconResponseInterface | Error> {
        if (bin[type()]) {
            return this.getIcon(appPath, bin[type()]);
        } else {
            console.warn(`Not supported yet on platform ${type()}`);
            return Promise.resolve(<IconResponseInterface>{ Path: appPath, Base64Data: '' });
        }
    }

    private getIcon(path: string, bin: string): Promise<IconResponseInterface | Error> {
        if (this._execFile)
            return new Promise(async (resolve, reject) => {
                try {
                    const { stdout } = await execFile(bin, [path]);
                    resolve(JSON.parse(stdout));
                } catch (e) {
                    reject(e.message);
                }
            });
        else
            return new Promise((resolve, reject) => {
                let process = spawn(bin, [path]);
                let outData = '';
                process.stdout.on('data', (data) => {
                    outData += data.toString();
                });
                process.on('close', (code) => {
                    if (code === 0) {
                        try {
                            return resolve(JSON.parse(outData));
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
