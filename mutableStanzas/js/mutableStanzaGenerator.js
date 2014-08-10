
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clone (src) {
    return JSON.parse(JSON.stringify(src));
}

function containsDuplicates(list) {

    var result = false;
    
    for (var a = 0; a < list.length - 1; a++) {
        for (var b = a + 1; b < list.length; b++) {
            if (list[a] == list[b]) {
                result = true;
            }
        }
    }
    
    return result;
}

function generateStanza() {
    
    //
    //  Stanza
    //
    //  ababbcbcc
    //  012345678
    //
    //  a has 2 lines, b has 4, and c has 3 (1 of 12 syllables)
    //
    
    var stanzaIndexes = [[], [], [], [], [], [], [], [], []];
    
    possibleRhymeKeys = ['a', 'b', 'c'];
    var abc = [];
    
    for (var a = 0; a < 3; a++) {
        
        var pickFromRhymes = clone(possibleRhymes[possibleRhymeKeys[a]]);
        
        for (var b = 0; b < abc.length; b++) {
            if (pickFromRhymes.indexOf(abc[b]) != -1) {
                pickFromRhymes.splice(pickFromRhymes.indexOf(abc[b]), 1)
            }
        }
      
        abc.push(pickFromRhymes[randomInt(0, pickFromRhymes.length - 1)]);
    }
    
    //
    //  rhyme a
    //
    
    var lineIndexes = [];
    
    for (var a = 0; a < 2; a++) {
        
        var possibleLineIndexes = []
        
        for (var b = 0; b < lineGroups[abc[0]]['10'].length; b++) {
            possibleLineIndexes.push(b);
        }
        
        var reverseLineIndexes = clone(lineIndexes).sort().reverse();
        
        for (var b = 0; b < reverseLineIndexes.length; b++) {
            possibleLineIndexes.splice(reverseLineIndexes[b], 1)
        }
        
        lineIndexes.push(possibleLineIndexes[randomInt(0, possibleLineIndexes.length - 1)])
    }
    
    stanzaIndexes[0] = [abc[0], '10', lineIndexes[0]];
    stanzaIndexes[2] = [abc[0], '10', lineIndexes[1]];
    
    //
    //  rhyme b
    //
    
    var lineIndexes = [];
    
    for (var a = 0; a < 4; a++) {
        
        var possibleLineIndexes = []
        
        for (var b = 0; b < lineGroups[abc[1]]['10'].length; b++) {
            possibleLineIndexes.push(b);
        }
        
        var reverseLineIndexes = clone(lineIndexes).sort().reverse();
        
        for (var b = 0; b < reverseLineIndexes.length; b++) {
            possibleLineIndexes.splice(reverseLineIndexes[b], 1)
        }
        
        lineIndexes.push(possibleLineIndexes[randomInt(0, possibleLineIndexes.length - 1)])
    }
    
    stanzaIndexes[1] = [abc[1], '10', lineIndexes[0]];
    stanzaIndexes[3] = [abc[1], '10', lineIndexes[1]];
    stanzaIndexes[4] = [abc[1], '10', lineIndexes[2]];
    stanzaIndexes[6] = [abc[1], '10', lineIndexes[3]];
    
    //
    //  rhyme c
    //
    
    var lineIndexes = [];
    
    for (var a = 0; a < 2; a++) {
        
        var possibleLineIndexes = []
        
        for (var b = 0; b < lineGroups[abc[2]]['10'].length; b++) {
            possibleLineIndexes.push(b);
        }
        
        var reverseLineIndexes = clone(lineIndexes).sort().reverse();
        
        for (var b = 0; b < reverseLineIndexes.length; b++) {
            possibleLineIndexes.splice(reverseLineIndexes[b], 1)
        }
        
        lineIndexes.push(possibleLineIndexes[randomInt(0, possibleLineIndexes.length - 1)])
    }
    
    if (containsDuplicates(lineIndexes) == true) {
        console.log('ERROR c lineIndexes', lineIndexes);
    }
        
    var lineIndex12 = randomInt(0, lineGroups[abc[2]]['12'].length - 1);
    
    stanzaIndexes[5] = [abc[2], '10', lineIndexes[0]];
    stanzaIndexes[7] = [abc[2], '10', lineIndexes[1]];
    stanzaIndexes[8] = [abc[2], '12', lineIndex12];
    
    return stanzaIndexes;
}
