#!/usr/bin/python

import re, codecs, StringIO, json, urllib, unicodedata, string

def applyKnownPatches(line):
    
    result = line
    
    result = result.replace('&#8212;', '--')
    result = result.replace('-- -', '-- ')
    result = result.replace('&#195;&#402;&#194;&#180;', 'O')
    result = result.replace('&#195;&#402;&#194;&#166;', 'e')
    result = result.replace('&#195;&#402;&#194;&#169;', 'e')
    result = result.replace('&#195;&#402;&#226;&#8364;', 'ea')
    result = result.replace('&#195;&#180;', 'O')
    result = result.replace('&#195;&#182;', 'a')
    result = result.replace('&#195;&#188;', 'a')
    result = result.replace('&#8482;', 'O')
    result = result.replace('&#172;', '')
    result = result.replace('&#160;', ' ')
    result = result.replace('&#174;', 'Ae')
    result = result.replace('&#8225;', 'ie')
    result = result.replace('&#190;', 'e')
    
    return result

inData = codecs.open('lineGroups.js', 'r', encoding='utf-8').read()

outData = applyKnownPatches(inData)

outF = codecs.open('lineGroupsFixed.js', 'w', encoding='utf-8')
outF.write(outData)
outF.close()

