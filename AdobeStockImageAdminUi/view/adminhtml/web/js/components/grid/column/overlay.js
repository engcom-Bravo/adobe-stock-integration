// jscs:disable
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
// jscs:enable
define([
    'Magento_Ui/js/grid/columns/overlay',
    'ko'
], function (overlay, ko) {
    'use strict';

    return overlay.extend({
        defaults: {
            provider: 'name = adobe_stock_images_listing.adobe_stock_images_listing_data_source, ns = adobe_stock_images_listing',
            modules: {
                rows: '${ $.provider }'
            },
            listens: {
                '${ $.provider }:data.items': 'setLabels'
            },
            isLicensed: {
		    items: {}
            }
        },

        /**
         * Init observable variables
         * @return {Object}
         */
        initObservable: function () {
            this._super()
                .observe([
                    'isLicensed'
               ]);

            return this;
        },

        /**
	 * Set Licensed lable to the image.
	 */
        setLabels: function () {
	    var isLicensed = this.isLicensed();
            this.rows().data.items.forEach((item) => {
		    isLicensed.items[item.id] = [{visibility: false, overlay: ''}];
               
                if (item.is_licensed) { //jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                    isLicensed.items[item.id].overlay = 'Licensed';
                    isLicensed.items[item.id].visibility = true;
                }
            });
            this.isLicensed(isLicensed);
		console.log(this.rows().data.items);
        },

        /**
         * Returns top displacement of overlay according to image height
         *
         * @param {Object} record - Data to be preprocessed.
         * @returns {Object}
         */
        getStyles: function (record) {
            var height = record.styles().height.replace('px', '') - 50;

            return {
                top: height + 'px'
            }
        },

        /**
         * If overlay should be visible
         *
         * @param {Object} row
         * @returns {Boolean}
         */
        isVisible: function (row) {
	    var item = this.isLicensed().items[row.id];
            return overlay ? item.visibility : false;
        },

        /**
         * Get overlay label
         *
         * @param {Object} row
         * @returns {String}
         */
        getLabel: function (row) {
	    var item = this.isLicensed().items[row.id];
            return overlay ? item.overlay : '';
        }
    });
});
