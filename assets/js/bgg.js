/**
 * bgg.js
 *
 * Loads details about board game collections from Board Game Geek.
 *
 * Copyright 2017 Robert Moss.
 *
 * This work is distributed under the terms of the BSD 3-Clause License
 * (http://opensource.org/licenses/BSD-3-Clause).
 *
 * See the Board Game Geek API documentation for details:
 *
 *     https://boardgamegeek.com/wiki/page/BGG_XML_API2
 *
 * See the following post for an example of using CORS Anywhere to retrieve
 * data from Board Game Geek:
 *
 *     https://boardgamegeek.com/article/18447252#18447252
 *
 * This script makes use of jQuery and ImageMapster, both of which are located
 * in this directory and are distributed under the terms of the MIT License
 * (see LICENSE.txt).
 */

// Create a new namespace to contain all of the variables and functions.
var BGG = BGG || {};

BGG.set_global_tooltip = function(img_map, content) {
    var areas = document.evaluate(
        "//map/area", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < areas.snapshotLength; i++) {
        var area = areas.snapshotItem(i);
        var game_id = area.getAttribute('id');
        $(img_map).mapster('set_options', {
            areas: [{
                key: game_id,
                toolTip: '<div class="close">' +
                    '<a class="close theme-red" href="javascript:;">X</a>' +
                    '</div>' +
                    content,
            }]
        });
    }

}

BGG.initialised = false;

BGG.init = function(args) {
    // Default to showing tooltips when an area is clicked, rather than when
    // the cursor hovers over an area, for better mobile compatibility.
    if (args.show_on_hover === undefined) {
        args.show_on_hover = false;
    }
    // var tool_tip_close = ['tooltip-click'];
    var tool_tip_close = [];
    if (args.show_on_hover) {
        // Close tooltips when an area (including the one to which the tooltip
        // belongs) is clicked. This will prevent tooltips being shown when an
        // area is clicked!
        tool_tip_close.push('area-click');
    }

    // Activate ImageMapster.
    $(args.img_map).mapster({
        fill: true,
        fillOpacity: 0.25,
        fillColor: '000000',
        stroke: true,
        strokeOpacity: 0.5,
        strokeColor: '000000',
        strokeWidth: 1,
        showToolTip: args.show_on_hover,
        toolTipContainer: '<div class="tooltip bgg"></div>',
        toolTipClose: tool_tip_close,
        mapKey: 'id',
        isSelectable: false,
        isDeselectable: false,
        onShowToolTip: function(e) {
            // Track the most recently shown tooltip.
            BGG.tooltip_key = e.key;
            // Make the close link hide the tooltip.
            var to_close = $('.close');
            for (var i = 0; i < to_close.length; i++) {
                to_close[i].onclick = function () {
                    $(args.img_map).mapster('tooltip');
                };
            }
        },
        onClick: function(e) {
            if (! args.show_on_hover) {
                $(args.img_map).mapster('tooltip', e.key);
            }
        },
    });

    // Define the initial tooltip ("Loading ...") for each area.
    BGG.set_global_tooltip(args.img_map, "<div>Loading ...</div>")

    // Use CORS Anywhere to retrieve data from Board Game Geek.
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            if (options.url.indexOf('cors-anywhere.herokuapp.com') != -1) {
                return;
            }
            var http = '';
            if (window.location.protocol === 'http:') {
                http = 'http:'
            } else {
                // Default to HTTPS.
                http = 'https:'
            }
            options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            options.origin = 'X-Requested-With';
            console.log('Using cors-anywhere via ' + http);
        } else if (options.crossDomain) {
            console.log('Cannot use cors-anywhere');
            console.log(options);
        }
    });

    BGG.initialised = true;
}

BGG.error = function(img_map, msg) {
    BGG.set_global_tooltip(img_map,
                           '<div class="error">Error: ' + msg + '</div>');
}

BGG.request = function(url, data, success_fn, img_map, show_err) {
    if (show_err === undefined) {
        show_err = true;
    }
    var query = {
        method: "GET",
        dataType : "xml",
        attempts: 3,
        url: url,
        data: data,
        success: function(xmldoc, textStatus, xhr) {
            if (xhr.status == 200) {
                success_fn(xmldoc);
            } else if (xhr.status == 202) {
                query.attempts--;
                if (query.attempts > 0) {
                    console.log("Will retry in 5 seconds ...");
                    setTimeout(function(){ $.ajax(query); },
                               5000);
                } else if (show_err) {
                    BGG.error(img_map, 'No more retries, data unavailable');
                }
            } else if (show_err) {
                BGG.error(img_map, textStatus);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status == 0) {
                var msg = 'Is JavaScript enabled for ' +
                    'cors-anywhere.herokuapp.com?';
                console.log(msg);
                if (show_err) {
                    BGG.error(img_map, msg);
                }
            } else if (show_err) {
                BGG.error(img_map, textStatus);
            }
        },
    };
    return jQuery.ajax(query);
}

BGG.tooltip = function(user_id, item) {
    var name = item.getElementsByTagName('name').item(0).textContent;
    var game_id = item.getAttribute('objectid');
    var name_href = 'https://boardgamegeek.com/boardgame/' + game_id;
    var name_link = '<a class="theme-green" href="' + name_href + '">' +
        name + '</a>';
    var play_href = 'https://boardgamegeek.com/plays/thing/' + game_id +
        '?userid=' + user_id;
    var plays = item.getElementsByTagName('numplays').item(0).textContent;
    var play_link = '0 plays';
    if (parseInt(plays) >= 1) {
        play_link = '<a class="theme-blue" href="' + play_href + '">' +
            plays + ' plays</a>';
    }
    // There will only be a comment element if a comment exists.
    var comm_elts = item.getElementsByTagName('comment');
    var comm = "";
    if (comm_elts.length == 1) {
        comm = item.getElementsByTagName('comment').item(0).textContent;
    }
    var rating = item.getElementsByTagName('rating').item(0).getAttribute('value');
    if (rating === 'N/A') {
        rating = 'Not rated';
    } else {
        rating = rating + ' / 10';
    }
    var tool_tip = '<div class="game">' +
        '<div class="close">' +
        '<a class="close theme-red" href="javascript:;">X</a>' +
        '</div>' +
        '<div class="name theme-green">' + name_link + '</div>' +
        '<div class="rating theme-yellow">' + rating + '</div>' +
        '<div class="plays theme-blue">' + play_link + '</div>' +
        '<div class="comment">' + comm + '</div>' +
        '</div>';
    return tool_tip;
}

BGG.process = function(img_map, user_id, xml_collection) {
    var items = xml_collection.evaluate(
        "//item", xml_collection, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < items.snapshotLength; i++) {
        var item = items.snapshotItem(i);
        var game_id = item.getAttribute('objectid');
        $(img_map).mapster('set_options', {
            areas: [{
                key: game_id,
                toolTip: BGG.tooltip(user_id, item),
            }]
        });
    }
    // Reload the most recent tooltip if it's still visible.
    var num_tooltips = $('.tooltip').length;
    if (BGG.tooltip_key !== undefined && num_tooltips === 1) {
        // Note: the tooltip must first be deactivated, in order to have its
        // contents updated.
        $(img_map).mapster('tooltip');
        $(img_map).mapster('tooltip', BGG.tooltip_key);
    }
}

BGG.load = function(args) {
    var defaults = {
        collection_url: "https://www.boardgamegeek.com/xmlapi2/collection",
        show_on_hover: false,
        show_err: true,
    };
    args = $.extend({}, defaults, args);
    if (! BGG.initialised) {
        BGG.init(args);
    }
    // Note: if we need to request multiple documents, save each document in
    // the BGG object and call BGG.process() when all documents are defined.
    BGG.request(args.collection_url,
                { username: args.username,
                  own: 1,
                  stats: 1,
                  excludesubtype: 'boardgameexpansion',
                },
                function(xmldoc) {
                    BGG.process(args.img_map, args.userid, xmldoc);
                },
                args.img_map, args.show_err);
}
