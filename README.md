# Associated Icon v1.0.1

### Instalation

```
npm install associated-icon
```


### Use example

```ts
import AssociatedIcon from 'associated-icon';

async function main() {
    let associatedIcon = new AssociatedIcon();
    let response = await associatedIcon.getBase64Icon('[PATH_TO_APPLICATION_OR_SHORTCUT]');
    response.Base64Data // App icon in base64
    response.Path // if it's shortcut, here will be original exe's path
}

main();
```