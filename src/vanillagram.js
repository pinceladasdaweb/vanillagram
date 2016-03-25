(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.VanillaGram = factory();
    }
}(this, function () {
    "use strict";

    /**
      * @desc Colors Array
    */
    var colors = {
        greyscale: [
            0.33, 0.34, 0.33, 0, 0,
            0.33, 0.34, 0.33, 0, 0,
            0.33, 0.34, 0.33, 0, 0,
            0, 0, 0, 1, 0
        ],
        subtle: [
            1, 0, 0, 0, 40,
            0, 1, 0, 0, 40,
            0, 0, 1, 0, 40,
            0, 0, 0, 1, 0
        ],
        luxen: [
            0.9, 0.2, 0, 0, 60,
            0, 0.8, 0.1, 0, 60,
            0, 0, 0.8, 0, 70,
            0, 0, 0, 1, 0
        ],
        drama: [
            1.1, 0.2, 0, 0, -20,
            0, 1, 0.2, 0, -10,
            0.1, 0, 1, 0, -10,
            0, 0, 0, 1, 0
        ],
        vintage: [
            0.55, 0.4, 0, 0, 20,
            0.1, 0.5, 0.5, 0, 20,
            0, 0.5, 0.4, 0.1, 20,
            0, 0, 0, 1, 0
        ],
        beach: [
            1.1, 0, 0, 0, 20,
            0, 0.8, 0.5, 0, 20,
            0.1, 0, 0.8, 0.2, 20,
            0, 0, 0, 1, 0
        ],
        fade: [
            1, 0, 0, 0, 20,
            0, 1, 0, 0, 20,
            0, 0, 1, 0, 20,
            0, 0, 0, 0.8, 0
        ]
    };

    var VanillaGram = function(element, options) {
        var supportCanvas = !!document.createElement("canvas").getContext;

        if (!this || !(this instanceof VanillaGram)) {
            return new VanillaGram(element, options);
        }

        if (!supportCanvas || !element || !options) {
            return;
        }

        this.element = element.constructor.name === "NodeList" ? element : document.querySelectorAll(element);
        this.options = options;

        this.ready();
    };

    VanillaGram.prototype = {
        /**
        * @desc Gradients and Shadows
        */
        radialGradient: function (ctx) {
            var grd = ctx.createRadialGradient(200, 150, 100, 200, 150,400);
            grd.addColorStop(0, "transparent");
            grd.addColorStop(1, "rgba(0,0,0,1)");

            return grd;
        },
        shadowGradient: function (ctx, imgWidth) {
            var grd = ctx.createLinearGradient(imgWidth, 0, 0, 0);
            grd.addColorStop(0, "rgba(0, 0, 0, 0.6)");
            grd.addColorStop(0.5, "transparent");
            grd.addColorStop(1, "rgba(0, 0, 0, 0.6)");

            return grd;
        },
        /**
        * @desc Light Leaks
        */
        lightGradient1: function (ctx, imgWidth, imgHeight) {
            var grd = ctx.createLinearGradient(imgHeight, imgWidth, 0, 0);
            grd.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            grd.addColorStop(0.5, "transparent");
            grd.addColorStop(1, "rgba(138, 243, 255, 0.5)");

            return grd;
        },
        lightGradient2: function (ctx, imgWidth, imgHeight) {
            var grd = ctx.createLinearGradient(5, imgHeight, imgWidth, 50);
            grd.addColorStop(0, "rgba(250, 37, 193, 0.1)");
            grd.addColorStop(0.5, "transparent");
            grd.addColorStop(1, "rgba(37, 250, 211, 0.2)");

            return grd;
        },
        lightGradient3: function (ctx, imgWidth, imgHeight) {
            var grd = ctx.createLinearGradient(imgWidth + 10, imgHeight, 0, imgHeight);
            grd.addColorStop(0, "rgba(255,255,71,0.2)");
            grd.addColorStop(0.5, "transparent");
            grd.addColorStop(0.85, "rgba(255,255,255,0.2)");
            grd.addColorStop(1, "transparent");

            return grd;
        },
        /**
        * @desc Colors Functions
        */
        matrixFilter: function (data, pixels, m) {
            var i, len, r, g, b, a;

            for (i = 0, len = data.length; i < len; i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                a = data[i + 3];

                data[i]     = r * m[0]  + g * m[1]  + b * m[2] + a * m[3]  + m[4];
                data[i + 1] = r * m[5]  + g * m[6]  + b * m[7] + a * m[8]  + m[9];
                data[i + 2] = r * m[10] + g * m[11] + b * m[12]+ a * m[13] + m[14];
                data[i + 3] = r * m[15] + g * m[16] + b * m[17]+ a * m[18] + m[19];
            }
        },
        oldFilter: function (data) {
            var i, len;

            for (i = 0, len = data.length; i < len; i += 4) {

                data[i]     = data[i]     + 40;
                data[i + 1] = data[i + 1] + 20;
                data[i + 2] = data[i + 2] * 2;
            }
        },
        /**
        * @desc Utils
        */
        each: function (collection, iterator) {
            var i, len;

            for (i = 0, len = collection.length; i < len; i += 1) {
                iterator(collection[i], i, collection);
            }
        },
        createCanvas: function (el) {
            var canvas = document.createElement('canvas');

            canvas.width  = el.clientWidth;
            canvas.height = el.clientHeight;

            return canvas;
        },
        /**
        * @desc Init function
        */
        ready: function () {
            var imgWidth, imgHeight, canvas, ctx, pixels, data, src;

            this.each(this.element, function(el, i) {
                if (el.complete) {
                    imgWidth  = el.clientWidth;
                    imgHeight = el.clientHeight;
                    canvas    = this.createCanvas(el);

                    ctx = canvas.getContext('2d');
                    ctx.drawImage(el, 0, 0, imgWidth, imgHeight);

                    pixels = ctx.getImageData(0, 0, imgWidth, imgHeight);
                    data   = pixels.data;

                    if (this.options.filter === 'greyscale') {
                        this.matrixFilter(data, pixels, colors.greyscale);
                    } else if (this.options.filter === 'oldtimey') {
                        this.oldFilter(data);
                    } else if (this.options.filter === 'beach') {
                        this.matrixFilter(data, pixels, colors.beach);
                    } else if (this.options.filter === 'luxen') {
                        this.matrixFilter(data, pixels, colors.luxen);
                    } else if (this.options.filter === 'subtle') {
                        this.matrixFilter(data, pixels, colors.subtle);
                    } else if (this.options.filter === 'olive') {
                        this.matrixFilter(data, pixels, colors.drama);
                    } else if (this.options.filter === 'vintage') {
                        this.matrixFilter(data, pixels, colors.vintage);
                    } else if (this.options.filter === 'fade') {
                        this.matrixFilter(data, pixels, colors.fade);
                    }

                    ctx.putImageData(pixels, 0, 0);

                    if (this.options.shadow === 'vignette') {
                        ctx.fillStyle = this.radialGradient(ctx);
                        ctx.fillRect(0, 0, imgWidth, imgHeight);
                    } else if (this.options.shadow === 'drama') {
                        ctx.fillStyle = this.shadowGradient(ctx, imgWidth);
                        ctx.fillRect(0, 0, imgWidth, imgHeight);
                    } else if (this.options.lightleak === 'lightleak1') {
                        ctx.fillStyle = this.lightGradient1(ctx, imgWidth, imgHeight);
                        ctx.fillRect(0, 0, imgWidth, imgHeight);
                    } else if (this.options.lightleak === 'lightleak2') {
                        ctx.fillStyle = this.lightGradient2(ctx, imgWidth, imgHeight);
                        ctx.fillRect(0, 0, imgWidth, imgHeight);
                    } else if (this.options.lightleak === 'lightleak3') {
                        ctx.fillStyle = this.lightGradient3(ctx, imgWidth, imgHeight);
                        ctx.fillRect(0, 0, imgWidth, imgHeight);
                    }

                    src = canvas.toDataURL();

                    el.setAttribute('src', src);
                }
            }.bind(this));
        }
    };

    return VanillaGram;
}));