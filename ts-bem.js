function __extends(block, superBlock) {
    var blockBody = block.prototype,
        descr = blockBody.description(),
        superDescr = superBlock.prototype.description &&  superBlock.prototype.description(),
        description;
    
    blockBody.onSetMod = descr.onSetMod;
    
    if ( typeof descr.name != 'string' ) {
	description = descr;
	if ( superDescr.name ) {
	    description.baseBlock = superDescr.name;
	}
    }
    else {
	description = descr.name;
	if ( superDescr.name ) {
	    description = {
		name: descr.name,
		baseBlock: superDescr.name
	    }
	}
    }

    var staticProps = {};
    for ( var p in block ) {
	if ( block.hasOwnProperty(p) && p != 'prototype' ) {
	    staticProps[p] = block[p];
	}
    }

    if ( superDescr.name == 'i-bem' ) {
	BEM.decl(description, blockBody, staticProps);
    } 
    else {
	BEM.DOM.decl(description, blockBody, staticProps);
    }
}

function BemBlock() { }

BemBlock.prototype = {
    description: function() {
	return {
	    name: 'i-bem'
	}
    }
}

function DomBlock() { }

DomBlock.prototype = {
    description: function() {
	return {
	    name: 'i-bem__dom'
	}
    }
}
