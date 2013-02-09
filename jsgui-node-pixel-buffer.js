// jsgui-node-pixel-buffer

// have pixel-buffer as its own module?
//  quite a simple one - will be used to hold image data as an intermediate format.
//   simpler than PNG.
//   will have a simple interface that will be used for editing images.

// not sure about having this hold indexed color.
//  by its name it seems as though it should be able to.
//  using indexed color mode.
//   rgba, rgb, indexed rgb, indexed rgba
//              irgb, irgba
//  and then there is bit_depth.
//              bits_per_pixel may make sense.

// Will just have this as a pixel value buffer.
//  Can have an image-buffer if its more advanced.

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}




// Will be used to hold, and as the basis for basic processing on PNG images.

define(['jsgui-lang-essentials'], 
    
    // can use bit depth constants.
    
    // bits_per_pixel
    
    // These will only operate as rgb24 or argb 32.
    
    function(jsgui) {
        var Class = jsgui.Class, each = jsgui.each, stringify = jsgui.stringify, fp = jsgui.fp;
        var tof = jsgui.tof;
        
        
        var Pixel_Buffer = Class.extend({
            
            // want to be able to load the values into this rapidly?
            
            
        
            'init': function(spec) {
                // size [width, height]
                //var bytes_per_pixel;
                
                if (spec.size) {
                    this.size = spec.size;
                } else {
                    throw 'Expected: size [x, y] property in the Pixel_Buffer specification';
                }
                
                // bit-depth - could follow PNG.
                //  rgba color mode.
                spec.bits_per_pixel = spec.bits_per_pixel || 32;
                
                if (spec.bits_per_pixel) {
                    if (spec.bits_per_pixel != 24 && spec.bits_per_pixel != 32) {
                        throw 'Invalid bits_per_pixel value of ' + spec.bits_per_pixel + ', must be 24 or 32, default is 32.';
                    }
                }
                
                // then initialize the buffer itself.
                
                var bytes_per_pixel = this.bits_per_pixel / 8;
                
                
                if (this.size) {
                    this.buffer = new Buffer(bytes_per_pixel * this.size[0] * this.size[1]);
                }
                
                
            },
            'get_pixel': function(x, y) {
                var bytes_per_pixel = this.bits_per_pixel / 8;
                // will return [r, g, b] or [r, g, b, a];
                var pixel_buffer_pos = bytes_per_pixel * (x + y * w);
                var buffer = this.buffer;
                var r, g, b, a;
                
                
                if (this.bits_per_pixel == 24) {
                    r = buffer.readUInt8(pixel_buffer_pos);
                    g = buffer.readUInt8(pixel_buffer_pos + 1);
                    b = buffer.readUInt8(pixel_buffer_pos + 2);
                    return [r, g, b];
                } else if (this.bits_per_pixel == 32) {
                    r = buffer.readUInt8(pixel_buffer_pos);
                    g = buffer.readUInt8(pixel_buffer_pos + 1);
                    b = buffer.readUInt8(pixel_buffer_pos + 2);
                    a = buffer.readUInt8(pixel_buffer_pos + 3);
                    return [r, g, b, a];
                } else {
                    throw 'Must have bits_per_pixel set to 24 or 32';
                }
            },
            'set_pixel': fp(function(a, sig) {
                var bytes_per_pixel = this.bits_per_pixel / 8;
                var l = a.l;
                // x, y, r, g, b, a  l = 6
                // x, y, r, g, b     l = 5
                
                // [x, y], r, g, b, a
                // [x, y], r, g, b
                
                var x, y, r, g, b, alpha;
                
                var w = this.size[0];
                
                // x, y, [r, g, b, a] l = 3
                // x, y, [r, g, b]    l = 3
                if (l == 3) {
                    x = a[0];
                    y = a[1];
                    var arr_pixel = a[3];
                    if (this.bits_per_pixel == 24) {
                        if (arr_pixel.length != 3) {
                            throw 'Expected pixel value in format [r, g, b] for 24 bits_per_pixel.';
                        }
                        r = arr_pixel[0];
                        g = arr_pixel[1];
                        b = arr_pixel[2];
                    }
                    if (this.bits_per_pixel == 32) {
                        if (arr_pixel.length != 4) {
                            throw 'Expected pixel value in format [r, g, b, a] for 32 bits_per_pixel.';
                        }
                        r = arr_pixel[0];
                        g = arr_pixel[1];
                        b = arr_pixel[2];
                        alpha = arr_pixel[3];
                    }
                    
                }
                
                if (l == 5) {
                    if (this.bits_per_pixel != 24) {
                        throw 'Must specify the pixel as r, g, b with bits_per_pixel of 24';
                    }
                    x = a[0];
                    y = a[1];
                    r = a[2];
                    g = a[3];
                    b = a[4];
                }
                
                if (l == 6) {
                    if (this.bits_per_pixel != 32) {
                        throw 'Must specify the pixel as r, g, b, a with bits_per_pixel of 32';
                    }
                    x = a[0];
                    y = a[1];
                    r = a[2];
                    g = a[3];
                    b = a[4];
                    alpha = a[5];
                }
                
                var pixel_buffer_pos = bytes_per_pixel * (x + y * w);
                var buffer = this.buffer;
                
                if (this.bits_per_pixel == 24) {
                    buffer.writeUInt8(r, pixel_buffer_pos);
                    buffer.writeUInt8(g, pixel_buffer_pos + 1);
                    buffer.writeUInt8(b, pixel_buffer_pos + 2);
                    
                } else if (this.bits_per_pixel == 32) {
                    buffer.writeUInt8(r, pixel_buffer_pos);
                    buffer.writeUInt8(g, pixel_buffer_pos + 1);
                    buffer.writeUInt8(b, pixel_buffer_pos + 2);
                    buffer.writeUInt8(alpha, pixel_buffer_pos + 3);
                } else {
                    throw 'Must have bits_per_pixel set to 24 or 32';
                }
                
                
                
            })
            
            
        })
        
        return Pixel_Buffer;
        
    }
);