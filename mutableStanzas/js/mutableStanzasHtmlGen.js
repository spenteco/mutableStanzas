 
function getPoemLinesFromIndexes(indexes) {
    
    var stanzaLines = ['', '', '', '', '', '', '', '', ''];
    
    for (var a = 0; a < indexes.length; a++) {
        
        stanzaLines[a] = lineGroups[indexes[a][0]][indexes[a][1]][indexes[a][2]];
    }
    
    var stanzaHtml =    '<div class="stanza">' +
                            '<span id="line0" class="stanzaLine noIndent">' + stanzaLines[0] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[1] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[2] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[3] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[4] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[5] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[6] + '</span>' +
                            '<span id="line0" class="stanzaLine indent">' + stanzaLines[7] + '</span>' +
                            '<span id="line0" class="stanzaLine noIndent">' + stanzaLines[8] + '</span>' +
                        '</div>';
    
    return stanzaHtml;
}

function getWidgetFromState(widget, widget_number) {
    
    var result = '';
    
    if (widget == 'frame') {
        result = current_state;
    }
    
    if (widget == 'sub-frame') {
        
        for (var a = 0; a < current_state.sub_frames.length; a++) {
            if (current_state.sub_frames[a].widget_number == widget_number) {
                result = current_state.sub_frames[a];
                break;
            }
        }
    }
    
    if (widget == 'component') {
        
        for (var a = 0; a < current_state.sub_frames.length; a++) {
            for (var b = 0; b < current_state.sub_frames[a].components.length; b++) {
                if (current_state.sub_frames[a].components[b].widget_number == widget_number) {
                    result = current_state.sub_frames[a].components[b];
                    break;
                }
            }
        }
    }
    
    return result;
}

function generateComponentHtml(component) {
    
    var result = '';
        
    var style_statement = 'style="position: absolute; left: ' + 
                        component.position[0] + 
                        'px; top: ' +  
                        component.position[1] + 
                        'px;"';
    
    result = result + '<div ' + style_statement + '>';
    
    if (component.type == 'image') {
        result = result + '<img src="' + component.content + '"/>';
    }
    
    if (component.type == 'poem') {
        result = result + getPoemLinesFromIndexes(component.content[0]);
    }
    
    result = result + '</div>';
    
    return result;
}

function generateHtmlForDisplay() {
    
    var result = '';
    
    result = result + '<div id="frame_' + current_state.widget_number + '" style="position: absolute; left: 0px; top: 0px; display:none;">';
        
    for (var a = 0; a < current_state.components.length; a++) {
        result = result + generateComponentHtml(current_state.components[a]);
    }
    
    return result;
}
       
function update_dom_with_current_state() {
    
    if (frames_mounted.length > 3) {
        
        var frame_to_destroy = frames_mounted.shift();
            
        $('#' + frame_to_destroy).remove();
    }
    
    
    if (frames_mounted.length > 0) {
        
        var frame_to_fade = frames_mounted[frames_mounted.length - 1];
        
        $('#' + frame_to_fade).fadeOut(config.fade_duration);
    }
            
    $('#frame_container').append(generateHtmlForDisplay());
    
    $('#frame_' + current_state.widget_number).fadeIn(config.fade_duration);
    
    frames_mounted.push('frame_' + current_state.widget_number);
}
