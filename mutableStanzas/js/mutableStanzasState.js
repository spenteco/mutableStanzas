
var interface_state = '';

var current_state = {
    ticks_elapsed: 0,
    widget_counter: 0,
    created: 0,
    expires: 0,
    widget_number: 0,
    components: [{
        size: '', 
        type: '',
        content: '',
        position: [],
    }],
    url: '',
};
    
var previous_states = [];
var previous_states_position = -1;

var frames_mounted = [];
