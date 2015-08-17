# Elastic Columns

A jQuery plugin designed to be used as an alternative to the well-known [Isotope](isotope.metafizzy.co) library - [View demo](http://johansatge.github.io/elastic-columns/).

---

* [Installation](#installation)
* [Basic usage](#basic-usage)
* [API](#api)
  * [Refreshing the layout](#refreshing-the-layout)
  * [Modifying settings on the fly](#modifying-settings-on-the-fly)
  * [Destroying the layout](#destroying-the-layout)
  * [Ignoring items](#ignoring-items)
* [Changelog](#changelog)
* [License](#license)

## Installation

With Bower:

```bash
bower install elastic-columns
```

Alternatively, checkout the project and install the minified script whenever you want in your project.

## Basic usage

This code will set the position of the children nodes in your container.

```javascript
$('.container').elasticColumns(
{
    columns:        3,  // the number of colums
    innerMargin:    10, // the gap between two tiles
    outerMargin:    20  // the gap between the tiles and
                           the edge of the container
});
```

## API

### Refreshing the layout

You may want to refresh the layout when the user resizes the window, or when you add new items to the grid (by appending nodes to your container).

```javascript
$('.container').elasticColumns('refresh');
```

*If you append pictures, be sure to wait for them to be loaded before refreshing the layout, or the calculations may be false.*

### Modifying settings on the fly

You can change the plugin settings at any time.

```javascript
$('.container').elasticColumns('set', 'columns', 4);
```

*When you are updating a parameter, don't forget to refresh the grid.*

### Destroying the layout

You can restore the layout to its initial state.

```javascript
$('.container').elasticColumns('destroy');
```

### Ignoring items

You may add the `elastic-columns-ignore` class to some items if you don't want them to be positionned on the grid.
This can be useful if you are filtering the grid content and don't want to remove items on the fly.

```html
<div class="item elastic-columns-ignore"></div>
```

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| `0.2.0` | August 17th, 2015 | Added the demo files in the main branch |
| `0.1.1` | July 26th, 2014 | Added a method to remove the styles set by the plugin. |
| `0.1` | January 29th, 2014 | Initial version |

## License

This project is released under the [MIT License](LICENSE).
