const Ohm = require ('ohm-js');

const grammar = Ohm.grammar (String.raw`
svgmd {

Drawing (Drawing) = Element (arrow Element)*
Element (Element) = Circle | Box | words
Box (Box) = "[" Drawing* "]"
Circle (Circle) = "(" Drawing* ")"
arrow (arrow) = "->"

words = word+
word (word) = ~separator letter alnum*
separator (separator) = "[" | "]" | "(" | ")" | arrow
}
`);


function patternMatch (phrase) {
    let matchResult = grammar.match (phrase);
    if (matchResult.succeeded ()) {
        let s = grammar.createSemantics ();
        return [matchResult, s];
    } else {
        this.send ("parse error", true);
        let dontcare = null;
        return [ matchResult, dontcare ];
    }
}

function accumulate (arr) {
    var result = {text: '', width: 0, height: 0 };
    arr.forEach (item => {
	result.text += item.text + ' ';
	result.height = Math.max (item.height, result.height);
    });
    result.width = result.text.width;
    return result;
}

const rewriteRules = {
    Drawing : function (_e, _as, _es) {
	var e = _e.rewrite ();
	var as = _as.rewrite ().join ('');
	var es = _es.rewrite ().join ('');
	var eAndEs = accumulate ([e, es]);
	return eAndEs;
    },
    Element : function (e) { return e.rewrite (); },
    Box : function (lb, d, rb) { 
	var accumulated = accumulate (d.rewrite ());
	var result = { shape: "rect", text: accumulated.text, width: accumulated.width, height: accumulated.height };
	return result;
    },
    Circle : function (lb, d, rb) {
	var accumulated = accumulate (d.rewrite ());
	var result = { shape: "rect", text: accumulated.text, width: accumulated.width, height: accumulated.height };
	return result
    },
    arrow : function (k) { return {}; },

    words : function (_words) {
	var words = accumulate (_words.rewrite ());
	return words; 
    },
    word  : function (_letter, _alnums)  { 
	return {text: this.sourceString, width: this.sourceString.length, height: 12}; },
    separator : function (k) { return {text: this.sourceString, width: 1, height: 12}; },
    _terminal: function () { return {text: this.sourceString, width: this.sourceString.length, height: 12}; },
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


const inphrase = String.raw`
[Shield [Core] -> (Fishstick)] -> (Warp Drive)
`;

var [result, rewriteHooks] = patternMatch (inphrase);
console.log (result.succeeded ());

// console.log (rewriteHooks);

var cst = result;
console.log (rewrite (cst, rewriteHooks));
