//owlNrow plugin
;(function ($, window, document, undefined) {
    OwlNrow = function (scope) {
        this.owl = scope;
        this.owl.options = $.extend({}, OwlNrow.Defaults, this.owl.options);
        //link callback events with owl carousel here

        this.handlers = {
            'initialize.owl.carousel': $.proxy(function (e) {
                if (this.owl.settings.owlNrow) {
                    this.build2row(this);
                }
            }, this)
        };

        this.owl.$element.on(this.handlers);
    };

    OwlNrow.Defaults = {
        owlNrow: false,
        owlNrowTarget: 'item',
        owlNrowContainer: 'owlNrow-item',
        owlNrowDirection: 'utd', // ltr,
        owlNrowN: 2,
    };

    //mehtods:
    OwlNrow.prototype.build2row = function(thisScope){
    
        var carousel = $(thisScope.owl.$element);
        var carouselItems = carousel.find('.' + thisScope.owl.options.owlNrowTarget);

        var elements = [];
        for (var i=0;i<thisScope.owl.options.owlNrowN;i++){
            elements.push([])
        }

        // var aEvenElements = [];
        // var aOddElements = [];

        $.each(carouselItems, function (index, item) {
            elements[index % thisScope.owl.options.owlNrowN].push(item);
            // if ( index % thisScope.owl.options.owlNrowN === 0 ) {
            //     aEvenElements.push(item);
            // } else {
            //     aOddElements.push(item);
            // }
        });

        // console.log(thisScope.owl.options.owlNrowN);

        carousel.empty();

        // switch (thisScope.owl.options.owlNrowDirection) {
            // case 'ltr':
                // thisScope.leftToright(thisScope, carousel, carouselItems);
                // break;

            // default :
            thisScope.upTodown(thisScope, elements, carousel);
        // }////

    };

    // OwlNrow.prototype.leftToright = function(thisScope, carousel, carouselItems){

    //     var o2wContainerClass = thisScope.owl.options.owlNrowContainer;
    //     var owlMargin = thisScope.owl.options.margin;

    //     var carouselItemsLength = carouselItems.length;

    //     var firsArr = [];
    //     var secondArr = [];

    //     //console.log(carouselItemsLength);

    //     if (carouselItemsLength % thisScope.owl.options.owlNrowN >= 1) {
    //         carouselItemsLength = ((carouselItemsLength - 1) / thisScope.owl.options.owlNrowN) + 1;
    //     } else {
    //         carouselItemsLength = carouselItemsLength/thisScope.owl.options.owlNrowN;
    //     }

    //     console.log(carouselItemsLength);

    //     $.each(carouselItems, function (index, item) {


    //         if (index < carouselItemsLength) {
    //             firsArr.push(item);
    //         } else {
    //             secondArr.push(item);
    //         }
    //     });

    //     $.each(firsArr, function (index, item) {
    //         var rowContainer = $('<div class="' + o2wContainerClass + '"/>');

    //         var firstRowElement = firsArr[index];
    //             firstRowElement.style.marginBottom = owlMargin + 'px';

    //         rowContainer
    //             .append(firstRowElement)
    //             .append(secondArr[index]);

    //         carousel.append(rowContainer);
    //     });

    // };

    OwlNrow.prototype.upTodown = function(thisScope, elements, carousel){

        var o2wContainerClass = thisScope.owl.options.owlNrowContainer;
        var owlMargin = thisScope.owl.options.margin;

        // console.log(aEvenElements);

        $.each(elements[0], function (index, item) {

            var rowContainer = $('<div class="' + o2wContainerClass + '"/>');
            for(var i=0;i<elements.length-1;i++){
                var element = elements[i][index];
                element.style.marginBottom = owlMargin + 'px';
                rowContainer.append(element);
            }
            rowContainer.append(elements[elements.length-1][index])
            // var evenElement = aEvenElements[index];

            // evenElement

            // rowContainer
                // .append(evenElement)
                // .append(aOddElements[index]);

            carousel.append(rowContainer);
        });
    };

    /**
     * Destroys the plugin.
     */
    OwlNrow.prototype.destroy = function() {
        var handler, property;

        for (handler in this.handlers) {
            this.owl.dom.$el.off(handler, this.handlers[handler]);
        }
        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] !== 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins['owlNrow'] = OwlNrow;
})( window.Zepto || window.jQuery, window,  document );
//end of owlNrow plugin