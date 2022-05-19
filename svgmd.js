const Ohm = require ('ohm-js');

const grammar = Ohm.grammar (String.raw`
svgmd {
Drawing = Seq
Seq (Seq) = Element (arrow Element)*
Element (Element) = Circle | Box | words
Box (Box) = "❲" Seq* "❳"
Circle (Circle) = "❨" Seq* "❩"
arrow (arrow) = "⟾"

words = word+
word (word) = ~separator letter alnum*
separator (separator) = "❲" | "❳" | "❨" | "❩" | arrow
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

const rewriteRules = {
    Drawing : function (_e, _as, _es) {
	var e = _e.rewrite ();
	var as = _as.rewrite ().join ('');
	var es = _es.rewrite ().join ('');
	return `${e}${as}${es}`;
    },
    Element : function (e) { return e.rewrite (); },
    Box : function (lb, d, rb) { return `${lb.rewrite ()}${d.rewrite ()}${rb.rewrite ()}`; },
    Circle : function (lb, d, rb) { return `${lb.rewrite ()}${d.rewrite ()}${rb.rewrite ()}`; },
    arrow : function (k) { return k.rewrite (); },

    words : function (ws) { return ws.rewrite ().join (''); },
    word  : function (_letter, _alnums)  {
	var letter = _letter.rewrite ();
	var alnums = _alnums.rewrite ().join ('');
	return `${letter}${alnums}`;
    },
    separator : function (k) { return k.rewrite (); },
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
// ❲Shield ❲Core❳ -> ❨Fishstick❩❳ -> ❨Warp Drive❩
// `;
// const inphrase = String.raw`
// ❲Shield❳
// `;

const inphrase = String.raw`
Shield
`;

var [result, rewriteHooks] = patternMatch (inphrase);
console.log (result.succeeded ());

// console.log (rewriteHooks);

var cst = result;
console.log (rewrite (cst, rewriteHooks));
