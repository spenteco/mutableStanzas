
function get_random_frame() {

    var possible_indexes = [];

    for (var a in config.frames) {
        for (var b = 0; b < config.frames[a].weight_in_selection; b++) {
            possible_indexes.push(a);
        }   
    }

    var i = Math.floor(Math.random() * possible_indexes.length);
    var random_a = possible_indexes[i];

    if (random_a < 0) {
        random_a = 0;
    }
    if (random_a > config.frames.length - 1) {
        random_a = config.frames.length - 1;
    }

    return config.frames[random_a];
}
 
function determineComponentContent(size, type) {
    
    var results = [];
    
    if (type == 'image') {
        
        var i = Math.floor(Math.random() * images[size].length);
        
        results.push(images[size][i]);
    }
    
    if (type == 'poem') {
        
        var stanza = generateStanza()
        
        results.push(stanza);
    }
    
    return results;
}

function change_display_state() {
    
    if (interface_state != 'running') {
        return;
    }
    
    current_state.ticks_elapsed = current_state.ticks_elapsed + 1;
    
    if (current_state.expires <= current_state.ticks_elapsed) {
        
        current_state.widget_counter = current_state.widget_counter + 1;
        
        var next_frame = get_random_frame();
        
        current_state.frame = next_frame;
        current_state.created = current_state.ticks_elapsed;
        current_state.expires = current_state.ticks_elapsed + 
                                (next_frame.number_of_stanzas * config.stanza_duration) + 
                                config.image_duration;
        current_state.widget_number = current_state.widget_counter;
    
        current_state.components = [];
    
        for (var a in next_frame.components) {
        
            current_state.components.push({
                size: next_frame.components[a][0], 
                type: next_frame.components[a][1],
                content: determineComponentContent(
                            next_frame.components[a][0], 
                            next_frame.components[a][1]),
                position: next_frame.components[a][2],
            });
            
        }
    
        current_state.url = '';
        
        current_state.url = document.location.toString().split('?')[0] + 
                            '?current_state=' + 
                            JSON.stringify(current_state);
        
        update_dom_with_current_state();
        
        previous_states.push($.extend({}, current_state));
        
        if (previous_states.length > config.previous_state_size) {
            previous_states.shift();
        }
    }
        
    setTimeout(
        change_display_state, 
        config.tick_duration
    );
}

/*  --------------------------------------------------------------------
 * 
 *  -------------------------------------------------------------------- */

$(document).ready(
    function() {
        
        var query_string = window.location.search;
        
        if (query_string > '') {
        
            interface_state = 'from_url';
            
            initialize_controls();
            
            var state_string = decodeURI(query_string.substring(query_string.indexOf('=') + 1));
            
            current_state = JSON.parse(state_string);
        
            current_state.url = document.location.toString().split('?')[0] + 
                                    '?current_state=' + 
                                    JSON.stringify(current_state);
            
            previous_states.push($.extend({}, current_state));
            
            update_dom_with_current_state();
        }
        else {
        
            interface_state = 'running';
            
            initialize_controls();
            
            current_state = {
                ticks_elapsed: 0,
                widget_counter: 0,
                created: 0,
                expires: 0,
                widget_number: 0,
                components: [{
                    size: '800x525', 
                    type: 'image',
                    content: determineComponentContent('800x525', 'image'),
                    position: [0,0],
                }],
                url: '',
            };
            
            current_state.widget_counter = 1;
            
            previous_states.push($.extend({}, current_state));
            
            update_dom_with_current_state();
            
            setTimeout(
                change_display_state, 
                config.tick_duration
            );
        }
    }
);
