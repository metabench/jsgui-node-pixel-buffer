jsgui-node-pixel-buffer
=======================

jsgui - A simple node.js class that has a Buffer and can get_pixel and set_pixel. Supports 24 bit rgb and 32 bit rgba.

##Installation
	npm install jsgui-node-pixel-buffer

###Pixel_Buffer Class
####Constructor: init(spec)
#####spec object
Value Name         | Data type    |  Description 
-------------------|--------------|----------------------
size               | [int, int]   | The size of the image
bits_per_pixel     | int          | The number of bits per pixel. Supports value 24 for RGB images and 32 for RGBA images.

	var Pixel_Buffer = jsgui_node_pixel_buffer;
    var png = new Pixel_Buffer({
        'size': [640, 480],
        'bits_per_pixel': 32
    });

###get_pixel(x, y)
Gets the value of a pixel.

bits_per_pixel     | Return Value
-------------------|----------------
24                 | [r, g, b]
32                 | [r, g, b, a]

###set_pixel(...)
####set_pixel(x, y, r, g, b)
####set_pixel(x, y, r, g, b, a)
####set_pixel(x, y, [r, g, b])
####set_pixel(x, y, [r, g, b, a])

###place_image_from_pixel_buffer(source_pixel_buffer, dest_position)
Value Name           | Data type    |
---------------------|--------------|
source_pixel_buffer  | Pixel_Buffer | 
dest_position        | [x, y]       | 

