﻿#target illustrator/* ref code	How to open PS from Illustrator (doesn't work yet with flash)	For reference you can pass in the name of a file too i.e. Ai's active document (t)	//var t = app.activeDocument.fullName;  	//photoshop.open(new File(t));	/*var numLayers = doc.layers.length;	var numArtboards = doc.artboards.length;	var rect = doc.artboards[0].artboardRect;	alert(rect);	var width = activeDocument.artboards[0].artboardRect[2];	var height = activeDocument.artboards[0].artboardRect[3];	alert(width + " | " + height);*/var doc, dest, file;var manafest = [];init();function init(){	//Get all the files we need to work on	file = new File("/Users/sjpeaster/Projects/SantaCode_2014/sourcefiles/illustrator/test.ai");	app.open(file);	//Get the Build folder destination	dest = new File("/Users/sjpeaster/Projects/SantaCode_2014/build");	//Get the active document, alert if there isn't one	resetDoc();	//Make a sprite sheet for each artboard (TODO - Ensure that sprite sheets are created in a 'free' space);	forEach(doc.artboards, genSpriteSheet);	//Save a png for each artboard	forEach(doc.artboards, function savePNG(ab, index){		doc.artboards.setActiveArtboardIndex(index);		exportPNG(doc, (dest + "/" + ab.name + ".png"), 100);	});}function forEach(iterable, callback){	for (var i = iterable.length; i > 0; i--){		var index = i-1;		callback(iterable[index], index);	}}function lock(layer){	layer.locked = true;}function unlock(layer){	layer.locked = false;}function selectAll(layer){	layer.hasSelectedArtwork = false;	layer.hasSelectedArtwork = true;	return doc.selection;}function deselectAll(layer){	layer.hasSelectedArtwork = false;	}function getByName(layers, name){	var result = null;	forEach(layers, function checkName(lyr, index){		if (result != null) return;		if (lyr.name.match(name) != null) result = lyr;	});	return result;}//Set doc to the active document if one existsfunction resetDoc(){	if (app.documents.length > 0){		doc = app.activeDocument;	} else {		alert('Please open an Illustrator file');	}}function exportPNG(doc, dest, scale){	var fileSpec = new File(dest);	var type = ExportType.PNG24;	var exportOptions = new ExportOptionsPNG24();	exportOptions.antiAliasing = false;	exportOptions.artBoardClipping = true;	exportOptions.transparency = true;	exportOptions.saveAsHTML = true;	exportOptions.horizontalScale = scale;	exportOptions.verticalScale = scale;	doc.exportFile( fileSpec, type, exportOptions );}/*Source	*Verry helpful function barrowed from:	*http://greladesign.com/blog/2014/12/03/add-artboard-with-javascript-in-illustrator-cs5-1/*/function newRect(x, y, width, height) {    var l = 0;      var t = 1;      var r = 2;      var b = 3;      var rect = [];      rect[l] = x;      rect[t] = -y;      rect[r] = width + x;      rect[b] = -(height - rect[t]);      return rect;  };//new Sprite Sheet Artboard from Artboardfunction newSS_Ab_fromAb(ab, index){	var curRect = ab.artboardRect;	var x = Math.ceil(curRect[0]);	var y = Math.floor(curRect[1]);	var width = Math.ceil(doc.width);	var height = Math.ceil(doc.height);	var name = ab.name;	var result;	//Make sure we have good meaningful names	if(name.match('Artboard') != null){		name = doc.name.substr(0, doc.name.length-3) + "_Ab" + index;		ab.name = name;	}	//creates a new artboard with special name	if(doc.artboards.length < 100) result = doc.artboards.add(newRect(x + width + 10, -y, width, height));	else {		alert("Too many artboards in this document."		+ "\nCannot create a sprite sheet until you remove at least one artboard.");	}	result.name = name + "-SS";	return result;}/*	*@param: ab <artboard>	*@param: index <int> the index of the artboard*/function genSpriteSheet(ab, index){	var ssArtboard = newSS_Ab_fromAb(ab, index);	var ssLayer;	if(getByName(doc.layers, ssArtboard.name) == null){		ssLayer = doc.layers.add();		ssLayer.name = ssArtboard.name;			}else{		ssLayer = getByName(doc.layers, ssArtboard.name);	}	var layers = doc.layers;	forEach(layers, lock);	forEach(layers, function addManafestItem(lyr, index){		//skip if sprite sheet layer TODO		if (!lyr.visible) return;		lyr.locked = false;		var lyrContents = selectAll(lyr);		alert(lyrContents);		lyr.locked = true;	});	//calculates the best way to fit everything	//Biggest to Smallest, Left to Right, Top to Bottom	//update the manafest as it goes}/* manafestItem info:	* @param:layer <int> the layer index	* @param:name <string> the layer name	* @param:x <float> the x position of this layer in the document (assuming top-left origin)	* @param:y <float> the y position of this layer in the document (assuming top-left origin)	* @param:ssX <flaot> the x position of this layer in the Sprite Sheet (requires top-left origin)	* @param:ssY <flaot> the y position of this layer in the Sprite Sheet (requires top-left origin)	* @param:width <flaot> the width of the layer in pixels	* @param:height <float> the height of the layer in pixels*/function manafestItem(layer, name, x, y, ssX, ssY, width, height){	this.layer = layer;	this.name = name;	this.x = x;	this.y = y;	this.ssX = ssX;	this.ssY = ssY;	this.width = width;	this.height = height;}