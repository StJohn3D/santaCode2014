﻿#target illustrator/* How to open PS from Illustrator (doesn't work yet with flash)For reference you can pass in the name of a file too i.e. Ai's active document (t)//var t = app.activeDocument.fullName;  //photoshop.open(new File(t));*/var doc, dest, file;var manafest = [];init();function init(){	//Get all the files we need to work on	file = new File("/Users/sjpeaster/Projects/SantaCode_2014/sourcefiles/illustrator/test.ai");	app.open(file);	//Get the Build folder destination	dest = new File("/Users/sjpeaster/Projects/SantaCode_2014/build/test.png");	resetDoc();	genSpriteSheet(doc, 0);	doc.artboards.setActiveArtboardIndex(0);	exportPNG(doc, dest, 100);	}//Set doc to the active document if one existsfunction resetDoc(){	if (app.documents.length > 0){		doc = app.activeDocument;	} else {		alert('Please open an Illustrator file');	}}function exportPNG(doc, dest, scale){	alert("I was called");	var fileSpec = new File(dest);	var type = ExportType.PNG24;	var exportOptions = new ExportOptionsPNG24();	exportOptions.antiAliasing = false;	exportOptions.artBoardClipping = true;	exportOptions.transparency = true;	exportOptions.saveAsHTML = true;	exportOptions.horizontalScale = scale;	exportOptions.verticalScale = scale;	doc.exportFile( fileSpec, type, exportOptions );	alert("Complete");}function newRect(x, y, width, height) {      var l = 0;      var t = 1;      var r = 2;      var b = 3;      var rect = [];      rect[l] = x;      rect[t] = -y;      rect[r] = width + x;      rect[b] = -(height - rect[t]);      return rect;  };  function genSpriteSheet(doc, artboard){	//creates a new artboard with special name	if(doc.artboards.length < 100) doc.artboards.add(newRect(0,0,512,512*2));	else alert("Too many artboards in this document."		+ "\nCannot create a sprite sheet until you remove at least one artboard.");	//builds a manafest for each layer in @param:artboard	//calculates the best way to fit everything	//Biggest to Smallest, Left to Right, Top to Bottom	//update the manafest as it goes}/* manafestItem info:	* @param:layer <int> the layer index	* @param:name <string> the layer name	* @param:x <float> the x position of this layer in the document (assuming top-left origin)	* @param:y <float> the y position of this layer in the document (assuming top-left origin)	* @param:ssX <flaot> the x position of this layer in the Sprite Sheet (requires top-left origin)	* @param:ssY <flaot> the y position of this layer in the Sprite Sheet (requires top-left origin)	* @param:width <flaot> the width of the layer in pixels	* @param:height <float> the height of the layer in pixels*/function manafestItem(layer, name, x, y, ssX, ssY, width, height){	this.layer = layer;	this.name = name;	this.x = x;	this.y = y;	this.ssX = ssX;	this.ssY = ssY;	this.width = width;	this.height = height;}/*var numLayers = doc.layers.length;var numArtboards = doc.artboards.length;var rect = doc.artboards[0].artboardRect;alert(rect);var width = activeDocument.artboards[0].artboardRect[2];var height = activeDocument.artboards[0].artboardRect[3];alert(width + " | " + height);*/