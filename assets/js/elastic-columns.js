/**
 * Elastic Columns v0.1
 * http://johansatge.github.io/elastic-columns
 */
(function($)
{
    $.elasticColumns = function(element, options)
    {
        this.defaults =
        {
            columns:        3,
            innerMargin:    10,
            outerMargin:    10
        };
        this.settings =   {};
        this.$element =   $(element);
        this.columns =    [];

        /**
         * Inits
         */
        this.init = function()
        {
            this.settings = $.extend({}, this.defaults, options);
            this.buildLayout();
        };
        /**
         * Builds the layout using the given settings
         */
        this.buildLayout = function()
        {
            var $items =           this.$element.children();
            var container_width =  this.$element.width();
            var column_width =     (container_width - (this.settings.innerMargin * (this.settings.columns - 1)) - (this.settings.outerMargin * 2)) / this.settings.columns;
            for(var index = 0; index < this.settings.columns; index += 1)
            {
                this.columns[index] = this.settings.outerMargin;
            }

            // Iterates into elements
            for(var item_id = 0; item_id < $items.length; item_id += 1)
            {
                var $item = $($items.get(item_id));

                // Looks for the smallest column
                var smallest_column = 0;
                for(var column_id = 0; column_id < this.settings.columns; column_id += 1)
                {
                    if (this.columns[column_id] < this.columns[smallest_column])
                    {
                        smallest_column = column_id;
                    }
                }

                // Gets the item padding
                var horizontal_padding =    parseInt($item.css('padding-left') )+ parseInt($item.css('padding-right'));
                var vertical_padding =      parseInt($item.css('padding-top') )+ parseInt($item.css('padding-bottom'));

                // Sets the item CSS properties
                $item.css('position', 'absolute');
                $item.css('width', (column_width - horizontal_padding) + 'px');
                $item.css('left', (this.settings.outerMargin + (this.settings.innerMargin * smallest_column) + (smallest_column * column_width)) + 'px');
                $item.css('top', this.columns[smallest_column] + 'px');

                // Updates columns height
                this.columns[smallest_column] += $item.height() + this.settings.innerMargin + vertical_padding;
            }

            // Looks for the highest column and sets the container height
            var highest_column = 0;
            for(var column_id = 0; column_id < this.settings.columns; column_id += 1)
            {
                if (this.columns[column_id] > this.columns[highest_column])
                {
                    highest_column = column_id;
                }
            }
            this.$element.height(this.columns[highest_column] + 'px');
        };
    }
    $.fn.elasticColumns = function(options, option, value)
    {
        return this.each(function()
        {
            // Plugin instanciation
            var plugin = $(this).data('elasticColumns');
            if (typeof plugin == 'undefined')
            {
                plugin = new $.elasticColumns(this, options);
                $(this).data('elasticColumns', plugin);
                plugin.init();
            }
            // API calls
            else
            {
                if (options == 'refresh')
                {
                    plugin.buildLayout(false);
                }
                if (options == 'set')
                {
                    plugin.settings[option] = value;
                }
            }
        });
    }
})(jQuery);