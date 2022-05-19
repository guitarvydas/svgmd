const Ohm = require ('ohm-js');

const grammar = Ohm.grammar (String.raw`
svgmd {
Drawing (Drawing) = Network

Network (Network) = Shape ArrowShape*
ArrowShape = arrow Shape

Shape (Shape) = Circle | Box
Box (Box) = "❲" WordsOrNetwork "❳"
Circle (Circle) = "❨" WordsOrNetwork "❩"

arrow (arrow) = "⟾"
WordsOrNetwork = 
  | Network
  | phrase

phrase = char+
separator (separator) = "❲" | "❳" | "❨" | "❩" | arrow
char = ~separator any
}
`);


function patternMatch (phrase) {
    let matchResult = grammar.match (phrase);
    if (matchResult.succeeded ()) {
        let s = grammar.createSemantics ();
        return [matchResult, s];
    } else {
        let dontcare = null;
        return [ matchResult, dontcare ];
    }
}

const rewriteRules = {
    Drawing : function (_network) {
	var network = _network.rewrite ();
	return network;
    },
    Network: function (_firstShape, _arrowShapeStar) {
	var s1 = _firstShape.rewrite ();
	var srest = _arrowShapeStar.rewrite ().join ('');
	return `${s1}${srest}`;
    },
    Shape : function (_Shape) { return _Shape.rewrite (); },
    Box : function (_lb, _wn, _rb) { 
	var 
	var slen = 
	return `${_lb.rewrite ()}${_wn.rewrite ()}${_rb.rewrite ()}`; 
    },
    Circle : function (_lb, _wn, _rb) { return `${_lb.rewrite ()}${_wn.rewrite ()}${_rb.rewrite ()}`; },
    ArrowShape : function (_firstShape,_rest) { return `${_firstShape.rewrite ()}${_rest.rewrite ()}`; },
    arrow : function (_k) { return _k.rewrite (); },

    WordsOrNetwork : function (_wn) { return _wn.rewrite (); },


    phrase: function (_cPlus) { return _cPlus.rewrite ().join (''); },
    separator : function (_k) { return _k.rewrite (); },
    char : function (_k) { return _k.rewrite (); },
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rewrite ()); }
};
    
function rewrite (cst, hooks) {
    if (cst.succeeded ()) {
	hooks.addOperation ('rewrite', rewriteRules);
        let treeWalker = hooks (cst);
        let result = treeWalker.rewrite ();
	return result;
    } else {
	return "Parse FAILED";
    }
}


// const inphrase = String.raw`
// ❲Shield ❲Core❳ -> ❨Fishstick❩❳ -> ❨Warp Drive❩ // not handled
// `;
const inphrase = String.raw`
❲Shield❳ ⟾ ❲Core❳ ⟾ ❨Fishstick❩ ⟾ ❨Warp Drive❩
`;
// const inphrase = String.raw`
// ❲Shield❳
// `;

var [result, rewriteHooks] = patternMatch (inphrase);
//console.log (result.succeeded ());

// console.log (rewriteHooks);

var cst = result;
console.log (rewrite (cst, rewriteHooks));
