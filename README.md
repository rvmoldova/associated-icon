# Associated Icon v1.1.3

### Instalation

```
npm install associated-icon
```
### Supported Platforms

- Windows
- MacOS X

### Use example

```ts
import AssociatedIcon from 'associated-icon';

async function main() {
    let associatedIcon = new AssociatedIcon(); // or new AssociatedIcon(true); (this will use execFile instead of spawn, so this will work in electron)
    let response = await associatedIcon.getBase64Icon('[PATH_TO_APPLICATION_OR_SHORTCUT]');
    response.Base64Data // App icon in base64
    response.Path // if it's shortcut, here will be original exe's path
}

main();
```