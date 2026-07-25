# @sit-canvas/canvas-react

React components for the SIT Canvas Design System, Singapore Institute of Technology's own design
system, forked and rebranded from GovTechSG/sgds-govtech-react.

`@sit-canvas/canvas-react` takes references from [react-bootstrap](https://react-bootstrap.github.io/)

## Version Compatibility

See the below table on which version of `@sit-canvas/canvas-css` you should be using in your project.

| @sit-canvas/canvas-css version | @sit-canvas/canvas-react version |
| ------------------------------- | --------------------------------- |
| v1.x                             | v2.x                               |

## Installation

`@sit-canvas/canvas-react` is not shipped with any included CSS. Apply `@sit-canvas/canvas-css` styles by installing the module or using CDN.

`@sit-canvas/canvas-react` uses `bootstrap-icons` for certain components like Form, but does not ship with it. Install `bootstrap-icons` or use CDN if you need it. Please refer to [bootstrap-icons](https://icons.getbootstrap.com/#usage) for usage instructions

```js

npm install @sit-canvas/canvas-react

//not required if using CDN
npm install @sit-canvas/canvas-css bootstrap-icons

```

## Importing Components

You should import individual components like: `@sit-canvas/canvas-react/Button` rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.

```js
import { Button } from '@sit-canvas/canvas-react/Button';

// or less ideally
import { Button } from '@sit-canvas/canvas-react';
```

## Stylesheets

#### Using CSS / SASS

```js
// In your entry point
// import CSS or
import '@sit-canvas/canvas-css/css/sit-canvas.css';
// import SASS
import '@sit-canvas/canvas-css/sass/sit-canvas.scss';
```

#### Using CDN

```js

//index.html
<link href='https://cdn.jsdelivr.net/npm/@sit-canvas/canvas-css/css/sit-canvas.css' rel='stylesheet' type='text/css'/>

//index.css
@import url('https://cdn.jsdelivr.net/npm/@sit-canvas/canvas-css/css/sit-canvas.css');

```

# Advanced Usage


## "as" Prop API

With certain Canvas React components, you may want to modify the component or HTML tag that is rendered.

If you want to keep all the styling of a particular component but switch the component that is finally rendered (whether it's a different Canvas React component, a different custom component, or a different HTML tag), you can use the "as" Prop to do so.

See [example](https://react-bootstrap.github.io/docs/getting-started/introduction#as-prop-api)
