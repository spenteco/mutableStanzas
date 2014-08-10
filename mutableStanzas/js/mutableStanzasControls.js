
function enable_widget(id) {
    
    $('#' + id).html(
        '<a href="javascript:handleControl(\'' + id + '\');" class="control_a">' + 
        $('#enabled_' + id).html() +
        '</a>'
    );
} 

function disable_widget(id) {
    
    $('#' + id).html($('#disabled_' + id).html());
}

function closeUrlPopup() {
    $('#url_popup_box').css('display', 'none');
}

function handleControl(widget) {
    
    if (widget == 'rewind_widget') {
        
        previous_states_position = previous_states_position - 1;
        
        current_state = $.extend({}, previous_states[previous_states_position]);
        
        if (previous_states_position == 0) {
            disable_widget('rewind_widget');
        }
        else {
            enable_widget('rewind_widget');
        }
        
        if (previous_states_position == previous_states.length - 1) {
            disable_widget('forward_widget');
        }
        else {
            enable_widget('forward_widget');
        }
        
        update_dom_with_current_state();
    }

    if (widget == 'forward_widget') {
        
        previous_states_position = previous_states_position + 1;
        
        current_state = $.extend({}, previous_states[previous_states_position]);
        
        if (previous_states_position == 0) {
            disable_widget('rewind_widget');
        }
        else {
            enable_widget('rewind_widget');
        }
        
        if (previous_states_position == previous_states.length - 1) {
            disable_widget('forward_widget');
        }
        else {
            enable_widget('forward_widget');
        }
        
        update_dom_with_current_state();
    }

    if (widget == 'pause_widget') {
        
        interface_state = 'paused';
        previous_states_position = previous_states.length - 1;
        
        enable_widget('rewind_widget');
        disable_widget('forward_widget');
        
        disable_widget('pause_widget');
        enable_widget('play_widget');
        
    }

    if (widget == 'play_widget') {
        
        interface_state = 'running';
        current_state.ticks_elapsed = current_state.ticks_elapsed + 10;
        
        disable_widget('rewind_widget');
        disable_widget('forward_widget');
        enable_widget('pause_widget');
        disable_widget('play_widget');
        
        change_display_state();
    }

    if (widget == 'link_widget') {
        
        var long_url = current_state.url;
        
        var header_top = $('#page_header').position().top;
        var header_left = $('#page_header').position().left;
        
        $.get('/apps/url/?longUrl=' + encodeURI(long_url), 
            function(short_url) {
                $('#url_popup_message').html('<a class="text_link" href="' + short_url + '">' + short_url + '</a>');
                $('#url_popup_box').css('top', (header_top + 40) + 'px');
                $('#url_popup_box').css('left', (header_left + 140) + 'px');
                $('#url_popup_box').css('display', 'block');
                $('#url_popup_box').css('display', 'block');
            }
        );
    }

    if (widget == 'github_widget') {
        window.open('https://github.com/spenteco/mutableStanzas');
    }

    if (widget == 'about_widget') {
        window.open('/posts/mutablestanzas.html');
    }
    
    if (widget == 'twitter_widget') {
        
        var long_url = current_state.url
        
        $.get('/apps/url/?longUrl=' + encodeURI(long_url), 
            function(short_url) {
        
                window.open('https://twitter.com/share?url=' + short_url,'','width=550, height=500, scrollbars=no');
            }
        );
    }

    if (widget == 'text_widget') {
        window.open('http://ebooks.adelaide.edu.au/s/spenser/edmund/faerie/complete.html');
    }
}


function initialize_controls() {
    
    if (interface_state == 'running') {
        
        disable_widget('rewind_widget');
        disable_widget('forward_widget');
        enable_widget('pause_widget');
        disable_widget('play_widget');
        enable_widget('link_widget');
        enable_widget('github_widget');
        enable_widget('about_widget');
        enable_widget('twitter_widget');
        enable_widget('text_widget');
    }
    
    if (interface_state == 'from_url') {
        
        disable_widget('rewind_widget');
        disable_widget('forward_widget');
        disable_widget('pause_widget');
        enable_widget('play_widget');
        enable_widget('link_widget');
        enable_widget('github_widget');
        enable_widget('about_widget');
        enable_widget('twitter_widget');
        enable_widget('text_widget');
    }
}
