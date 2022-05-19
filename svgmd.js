const Ohm = require ('ohm-js');

const grammar = Ohm.grammar (String.raw`
svgmd {
Drawing (Drawing) = Network

Network (Network) = Shape ArrowAndShape*
ArrowAndShape = arrow Shape

Shape (Shape) = Circle | Box
Box (Box) = "❲" Phrase "❳"
Circle (Circle) = "❨" Phrase "❩"

arrow (arrow) = "⟾"
Phrase = char+
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

function stringWidth (s) {
    return s.length * 12; // stub in 12px for now
}

function stringHeight (s) {
    return 12;            // stub in 12px for now
}

function xLeftMargin () { return 5; }
function xRightMargin () { return 5; }
function yTopMargin () { return 5; }
function yBottomMargin () { return 5; }

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
	// <rect x="200" y="0" width="120" height="60" fill="#eeffffff" stroke="#000000" pointer-events="all"/>
    Box : function (_lb, _t, _rb) { 
	var t = _t.rewrite ({});
	var previousBB = env.cursor; // cursor is a bounding box (of the previous object) {l, t, r, b}
	var width = xLeftMargin () + stringWidth (t) + xRightMargin ();
	var height = yTopMargin () + fontHeight (t) + yBottomMargin ();
	var newBB = { previousBB.r + xOffset, previousBB.t + yOffset, previousBB.r + width, previousBB.t + height };
	var svg = `"<rect x="${newBB.l}" y="${newBB.t}" width="${width}" height="${height}" fill="#eeffffff" stroke="#000000" pointer-events="all"/>`;
	return [svg, newBB];
    },
    Circle : function (_lb, _t, _rb) { return ["", {}]; },
    ArrowAndShape : function (_arrow, _shape) { return _shape.rewrite ({}); },
    arrow : function (_k) { return _k.rewrite (); },

    Phrase: function (_cPlus) { return _cPlus.rewrite ().join (''); },
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
