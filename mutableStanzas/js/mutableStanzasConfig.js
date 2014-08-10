
var config = {
        
    tick_duration: 1000,
    fade_duration: 750,
    stanza_duration: 4,
    image_duration: 2,
    previous_state_size: 50,
    
    frames: [
        
        {components: [
            ['800x525', 'image', [0,0]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 0},

        {components: [
            ['800x250', 'image', [0,0]],
            ['800x250', 'image', [0,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 0},

        {components: [
            ['800x250', 'image', [0,0]],
            ['525x250', 'poem', [0,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 1},

        {components: [
            ['800x250', 'image', [0,0]],
            ['250x250', 'image', [0,275]],
            ['525x250', 'poem', [275,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 1},

        {components: [
            ['800x250', 'image', [0,0]],
            ['250x250', 'image', [0,275]],
            ['250x250', 'image', [275,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 0},

        {components: [
            ['525x250', 'poem', [0,0]],
            ['250x250', 'image', [550,0]],
            ['800x250', 'image', [0,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['525x250', 'poem', [275,0]],
            ['800x250', 'image', [0,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x250', 'image', [550,0]],
            ['800x250', 'image', [0,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 0},

        {components: [
            ['525x250', 'poem', [0,0]],
            ['250x250', 'image', [550,0]],
            ['250x250', 'image', [0,275]],
            ['525x250', 'poem', [275,275]],
        ],
        weight_in_selection: 6,
        number_of_stanzas: 2},

        {components: [
            ['250x250', 'image', [0,0]],
            ['525x250', 'poem', [275,0]],
            ['525x250', 'poem', [0,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 6,
        number_of_stanzas: 2},

        {components: [
            ['525x250', 'poem', [0,0]],
            ['250x250', 'image', [550,0]],
            ['525x250', 'poem', [0,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 6,
        number_of_stanzas: 2},

        {components: [
            ['250x250', 'image', [0,0]],
            ['525x250', 'poem', [275,0]],
            ['250x250', 'image', [0,275]],
            ['525x250', 'poem', [275,275]],
        ],
        weight_in_selection: 6,
        number_of_stanzas: 2},

        {components: [
            ['250x250', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x250', 'image', [550,0]],
            ['250x250', 'image', [0,275]],
            ['250x250', 'image', [275,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 0},

        {components: [
            ['525x250', 'poem', [0,0]],
            ['250x250', 'image', [550,0]],
            ['250x250', 'image', [0,275]],
            ['250x250', 'image', [275,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x250', 'image', [550,0]],
            ['525x250', 'poem', [0,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['525x250', 'poem', [275,0]],
            ['250x250', 'image', [0,275]],
            ['250x250', 'image', [275,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x250', 'image', [550,0]],
            ['250x250', 'image', [0,275]],
            ['525x250', 'poem', [275,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 1},

        {components: [
            ['250x525', 'image', [0,0]],
            ['525x250', 'poem', [275,0]],
            ['525x250', 'poem', [275,275]],
        ],
        weight_in_selection: 6,
        number_of_stanzas: 2},

        {components: [
            ['250x525', 'image', [0,0]],
            ['525x250', 'poem', [275,0]],
            ['250x250', 'image', [275,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 1},

        {components: [
            ['250x525', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x250', 'image', [550,0]],
            ['525x250', 'poem', [275,275]],
        ],
        weight_in_selection: 4,
        number_of_stanzas: 1},

        {components: [
            ['250x525', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x250', 'image', [550,0]],
            ['250x250', 'image', [275,275]],
            ['250x250', 'image', [550,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 0},

        {components: [
            ['525x250', 'poem', [0,0]],
            ['525x250', 'poem', [0,275]],
            ['250x525', 'image', [525,0]],
        ],
        weight_in_selection: 6,
        number_of_stanzas: 2},

        {components: [
            ['525x250', 'poem', [0,0]],
            ['250x525', 'image', [550,0]],
            ['250x250', 'image', [0,275]],
            ['250x250', 'image', [275,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x525', 'image', [550,0]],
            ['525x250', 'poem', [0,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 1},

        {components: [
            ['250x250', 'image', [0,0]],
            ['250x250', 'image', [275,0]],
            ['250x525', 'image', [550,0]],
            ['250x250', 'image', [0,275]],
            ['250x250', 'image', [275,275]],
        ],
        weight_in_selection: 2,
        number_of_stanzas: 0},
    ],
};
