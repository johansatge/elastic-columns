(function($)
{
    $.elasticColumns = function(element, options)
    {
        var self = this;

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
            var $items =           this.$element.children(':not(.elastic-columns-ignore)');
            var container_width =  this.$element.width();
            var column_width =     (container_width - (this.settings.innerMargin * (this.settings.columns - 1)) - (this.settings.outerMargin * 2)) / this.settings.columns;
            for(var index = 0; index < this.settings.columns; index += 1)
            {
                this.columns[index] = this.settings.outerMargin;
            }

            var parent;
            var parent_top;
            var parent_left;
            var first_item = $($items.get(0));
            if (first_item) {
                parent = first_item.parent();
                var parent_left_padding = parseInt(parent.css('padding-left'));
                var parent_top_padding = parseInt(parent.css('padding-top'));
                parent_left = parent.offset().left + parent_left_padding;
                parent_top = parent.offset().top + parent_top_padding;
            }

            // Iterates into elements
            for(var item_id = 0; item_id < $items.length; item_id += 1)
            {
                var $item = $($items.get(item_id));

                // Looks for the smallest column
                var smallest_column = _getColumnWithMinHeight();

                // Sets the item CSS properties
                var is_relative = (this.settings.position === 'relative');
                $item.css('position', 'absolute');
                $item.css('width', (column_width) + 'px');
                $item.css('left', (parent_left * is_relative + this.settings.outerMargin + (this.settings.innerMargin * smallest_column) + (smallest_column * column_width)) + 'px');
                $item.css('top', (parent_top * is_relative + this.columns[smallest_column]) + 'px');

                // Updates columns height
                this.columns[smallest_column] += $item.outerHeight() + this.settings.innerMargin;
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
            this.$element.outerHeight(this.columns[highest_column] + 'px');

        };
        /**
         * Destroys the layout restoring its initial appearance
         */
        this.destroyLayout = function()
        {
            // Iterates into elements and clear the styles set by the plugin
            var $items = this.$element.children(':not(.elastic-columns-ignore)');
            for(var item_id = 0; item_id < $items.length; item_id += 1)
            {
                var $item = $($items.get(item_id));
                $item.css({'position':'','width':'','left':'','top':''});
            }

            // Restores the container's height
            this.$element.css({'height':''});
        };

        //private methods
        function _getColumnWithMinHeight() {
            var smallest_column = 0;
            for(var column_id = 0; column_id < self.settings.columns; column_id += 1)
                {
                    if (self.columns[column_id] < self.columns[smallest_column])
                    {
                        smallest_column = column_id;
                    }
                }
            return smallest_column;
        }
    };
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
                    plugin.buildLayout();
                }
                if (options == 'set')
                {
                    plugin.settings[option] = value;
                }
                if (options == 'destroy')
                {
                    plugin.destroyLayout();
                }
            }
        });
    }
})(jQuery);