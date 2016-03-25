# VanillaGram
> VanillaJS script to apply filters for images similar to Instagram

![](https://raw.github.com/pinceladasdaweb/vanillagram/master/screenshot.png)

## Demo

View [demo here](https://pinceladasdaweb.github.io/vanillagram/)

## Install

You can get it on npm.

```sh
npm install vanillagram --save
```

## Download

If you're not into package management, just [download a ZIP](https://github.com/pinceladasdaweb/vanillagram/archive/master.zip) file.

## How to use?

First, include the script located on the `dist` folder.

```html
<script src="dist/vanillagram.min.js"></script>
```

Now, you need to instantiate it by passing a DOM selector and [options](https://pinceladasdaweb.github.io/vanillagram/#options).

```js
VanillaGram('.filter1', {
    filter: 'fade',
    lightleak: 'lightleak1',
    shadow: 'drama'
});
```

##Browser Support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 9+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Thanks

Many thanks to [Vivien Ilett](http://www.vivienilett.com/simplefilter/), who originally created the plugin for jQuery.

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/vanillagram/releases) for detailed changelog.

## License
[MIT](LICENSE)