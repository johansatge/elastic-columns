
/**
 * Elastic Columns demo page
 */
function ElasticColumnsDemo()
{
    this.init();
};

/**
 * Inits the page
 */
ElasticColumnsDemo.prototype.init = function()
{
    // DOM
    this.$container =   $('.columns');
    this.$loader =      $('.loader');

    // Creates and displays the grid
    this.$container.elasticColumns(
    {
        columns:        this.getColumnsCount(),
        innerMargin:    20,
        outerMargin:    20
    });
    this.displayItems();

    // Resize event: tell the plugin to refresh the layout
    $(window).on('resize', $.proxy(this, 'onResize'));

    // Adds random items
    $('.event-add').on('click', $.proxy(this, 'onAddRandomItems'));
    $('.event-reorder').on('click', $.proxy(this, 'onRandomlyReorderItems'));
};

/**
 * Adds random items
 * @param evt
 */
ElasticColumnsDemo.prototype.onAddRandomItems = function(evt)
{
    evt.preventDefault();
    this.$loader.fadeIn(200);

    // Builds a random array
    var items = this.$container.children(':not(.elastic-columns-ignore)').get();
    for (var index = items.length - 1; index > 0; index -= 1)
    {
        var random_index =      Math.floor(Math.random() * (index + 1));
        var temp =              items[index];
        items[index] =          items[random_index];
        items[random_index] =   temp;
    }
    items = items.slice(0, 3);

    // Adds the items to the container
    for(var index = 0; index < items.length; index += 1)
    {
        var $new_item = $(items[index]).clone().hide();
        this.$container.append($new_item);
    }

    // Refresh the grid and show the items, when the content has been loaded
    var self =      this;
    var $images =   this.$container.children(':hidden').find('img');
    if ($images.length > 0)
    {
        $images.on('load', $.proxy(this, 'onNewContentLoaded'));
        $images.on('error', $.proxy(this, 'onNewContentLoaded'));
    }
    else
    {
        this.onNewContentLoaded();
    }
};

/**
 * Displays new content when it has been loaded
 */
ElasticColumnsDemo.prototype.onNewContentLoaded = function()
{
    this.$container.elasticColumns('refresh');
    this.displayItems();
};

/**
 * Randomly reorder items
 * @param evt
 */
ElasticColumnsDemo.prototype.onRandomlyReorderItems = function(evt)
{
    evt.preventDefault();
    console.log('@todo');
};

/**
 * Returns the number of columns depending on the container width
 */
ElasticColumnsDemo.prototype.getColumnsCount = function()
{
    var grid_width =    $('.columns').width();
    var column_width =  grid_width;
    var columns =       1;
    while(column_width > 350)
    {
        columns += 1;
        column_width = grid_width / columns;
    }
    return columns;
};

/**
 * Resizes the window
 */
ElasticColumnsDemo.prototype.onResize = function()
{
    this.$container.elasticColumns('refresh');
    this.$container.elasticColumns('set', 'columns', this.getColumnsCount());
};

/**
 * Displays the hidden grid items
 */
ElasticColumnsDemo.prototype.displayItems = function()
{
    var delay = 0;
    this.$container.children(':hidden:not(.elastic-columns-ignore)').each(function()
    {
        $(this).delay(delay).fadeIn(300);
        delay += 150;
    });
    this.$loader.delay(delay).fadeOut(200);

};