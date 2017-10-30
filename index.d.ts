// Type definitions for AssociatedIcon 1.0.0
// Project: https://github.com/rvmoldova/associated-icon
// Definitions by: Labs42 <labs42.io>


export default class AssociatedIcon {
    constructor(_execFile?: boolean);
    getBase64Icon(path: string): Promise<IconResponseInterface>;
}

export interface AssociatedIconInterface {
    getBase64Icon(path: string): Promise<IconResponseInterface | Error>;
}
export interface IconResponseInterface {
    Base64Data: string;
    Path: string;
}
