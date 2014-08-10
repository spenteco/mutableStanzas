#!/usr/bin/python

import re, codecs, StringIO, json, urllib
from lxml import etree

def extract_stanzas_from_url(input_url):
    
    stanzas = []
    
    sourceData = urllib.urlopen(input_url).read()
    
    tree = etree.HTML(sourceData)

    stanzaNodes = tree.xpath('//div[@class="stanza"]')
    
    print 'len(stanzaNodes)', len(stanzaNodes)
    
    for s in stanzaNodes:
        
        lineNodes = s.xpath('descendant::p')
        
        print 'len(lineNodes)', len(lineNodes)
        
        if len(lineNodes) == 9:
        
            lines = []
            
            for line in lineNodes:
                
                lineS = etree.tostring(line).replace('<p>', '').replace('</p>', '').replace('\n', ' ').replace('[', '').replace(']', '').strip()
                
                lineS = re.sub('\s+', ' ', lineS)
                
                lines.append(lineS)
                
            stanzas.append(lines)
                
    return stanzas

def addRhymeWords(lines):
    
    newLines = lines
    
    for line in newLines:
        
        lineParts = re.split(' |\,|\.|\?|\;|\:|\'|\"|\!|\(|\)|\-|\[|\]|\<em\>|\<\/em\>', line[0])
        
        rhymeWord = ''
        i = len(lineParts)
        while i > 0:
            i = i - 1
            if lineParts[i] > '':
                if lineParts[i] == 'd':
                    rhymeWord = lineParts[i]
                else:
                    if rhymeWord > '':
                        rhymeWord = lineParts[i] + rhymeWord
                    else:
                        rhymeWord = lineParts[i]
                    break
        
        line[2] = rhymeWord
        
    return newLines

def extractRhymingLines(originalStanzas):
    
    lineGroupsA = []
    
    for s in originalStanzas:
        
        #   ababbcbcc
        #   012345678
        
        a = [[s[0], 10, ''], [s[2], 10, '']]
        b = [[s[1], 10, ''], [s[3], 10, ''], [s[4], 10, ''], [s[6], 10, '']]
        c = [[s[5], 10, ''], [s[7], 10, ''], [s[8], 12, '']]
        
        a = addRhymeWords(a)
        b = addRhymeWords(b)
        c = addRhymeWords(c)
        
        lineGroupsA.append(a)
        lineGroupsA.append(b)
        lineGroupsA.append(c)
        
    lineGroupsB = []
    
    problemWords = ['Ioue',]
    allLastTwo = {}
    
    for linesA in lineGroupsA:
        
        rhymesA = []
        for a in linesA:
            rhymesA.append(a[2])
        
        lastTwo = []
        for a in rhymesA:
            lastTwo.append(a[-2:])
        lastTwo = sorted(list(set(lastTwo)))
        
        if len(lastTwo) > 1:
            
            print 'BAD RHYME?', lastTwo, rhymesA
            
            try:
                allLastTwo[tuple(lastTwo)] += 1
            except KeyError:
                allLastTwo[tuple(lastTwo)] = 1
         
        if len(lastTwo) == 1: 
                
            indexB = -1
            for i, linesB in enumerate(lineGroupsB):
                for a in rhymesA:
                    if a in linesB['rhymeWords']:
                        indexB = i
                        break
                if indexB != -1:
                    break
                    
            if indexB == -1:
                lineGroupsB.append({'rhymeWords': rhymesA, 'lines': linesA})
            else:
                lineGroupsB[indexB]['rhymeWords'] += rhymesA
                lineGroupsB[indexB]['lines'] += linesA
    
    print
    for i, b in enumerate(lineGroupsB):
        
        b['rhymeWords'] = list(set(b['rhymeWords']))
        
        newLines = []
        for l in b['lines']:
            newLines.append(tuple(l))
            
        print 'RESULTS', i, b['rhymeWords'], len(b['lines'])
        
    print
    print 'len(lineGroupsB)', len(lineGroupsB)
    
    print
    for k, v in allLastTwo.iteritems():
        print 'BAD LAST TWO', k, v
        
    return lineGroupsB

def outputLineGroupsAsJson(lineGroups):
    
    outputObjects = []
    
    for lineGroup in lineGroups:
        
        outputObject = {'10': [], '12': []}

        for line in lineGroup['lines']:
            if line[1] == 10:
                outputObject['10'].append(line[0])
            else:
                outputObject['12'].append(line[0])
                
        outputObjects.append(outputObject)

    possibleA = []
    possibleB = []
    possibleC = []
    
    for i, outputObject in enumerate(outputObjects):
        
        if len(outputObject['10']) > 1:
            possibleA.append(i)
            
        if len(outputObject['10']) > 3:
            possibleB.append(i)
            
        if len(outputObject['10']) > 1 and len(outputObject['12']) > 0:
            possibleC.append(i)
        
    outF = codecs.open('lineGroups.js', 'w', encoding='utf-8')
    outF.write('var lineGroups = ' + json.dumps(outputObjects).replace('},', '},\n').replace('&#160; ', ''))
    outF.close()
        
    outF = codecs.open('possibleRhymes.js', 'w', encoding='utf-8')
    outF.write('var possibleRhymes = ' + json.dumps({'a': possibleA, 'b': possibleB, 'c': possibleC}))
    outF.close()
    
#   --------------------------------------------------------------------
#
#   --------------------------------------------------------------------

input_urls = ['http://ebooks.adelaide.edu.au/s/spenser/edmund/faerie/complete.html']

stanzas = []

for input_url in input_urls:
    
    stanzas += extract_stanzas_from_url(input_url)

lineGroups = extractRhymingLines(stanzas)

outputLineGroupsAsJson(lineGroups)

