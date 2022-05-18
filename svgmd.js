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
        let dontcare = null;
        return [ matchResult, dontcare ];
    }
}

function accumulate (arr, who) {
    var result = {text: '', width: 0, height: 0 };
    arr.forEach (item => {
	console.error (item);
	result.text += item.text;
	result.height = Math.max (item.height, result.height);
    });
    result.width = result.text.length;
    return result;
}

const rewriteRules = {
    Drawing: function (sequence) {
	return `
	<html>
          <body>
            <svg width="1000" height="400">
              ${sequence.rewrite ()}
            </svg>
	   </body>
	</html>
	    `;
    },
    Seq : function (_e, _as, _es) {
	var e = _e.rewrite ();
	// var as = _as.rewrite ().join ('');
	var es = accumulate (_es.rewrite (), "drawing 0");
	var eAndEs = accumulate ([e, es], "drawing 1");
	var result = [e, eAndEs].flat ();;
	return result;
    },
    Element : function (e) { return e.rewrite (); },
    Box : function (lb, d, rb) { 
	var accumulated = accumulate (d.rewrite (), "box");
	var result = { shape: "rect", text: accumulated.text, width: accumulated.width, height: accumulated.height };
	return result;
    },
    Circle : function (lb, d, rb) {
	var accumulated = accumulate (d.rewrite (), "circle");
	var result = { shape: "ellipse", text: accumulated.text, width: accumulated.width, height: accumulated.height };
	return result
    },
    arrow : function (k) { return {}; },

    words : function (_words) {
	var words = accumulate (_words.rewrite (), "words");
	return words; 
    },
    word  : function (_letter, _alnums)  { 
	var letter = _letter.rewrite ();
	var alnums = accumulate (_alnums.rewrite (), "word 1");
	var result = accumulate ([letter, alnums], "word 2");
	return result;
    },
    separator : function (k) { return {text: this.sourceString, width: 1 * 12, height: 12}; },
    _terminal: function () { return {text: this.sourceString, width: this.sourceString.length * 12, height: 12}; },
    _iter: function (...children) { return children.map(c => c.rewrite ()); }
};
    
function rewrite (cst, envelope, rewriteRules) {
    if (cst.succeeded ()) {
	envelope.addOperation ('rewrite', rewriteRules);
        let treeWalker = envelope (cst);
        let result = treeWalker.rewrite ();
	return result;
    } else {
	return "Parse FAILED";
    }
}


// const inphrase = String.raw`
// ❲Shield ❲Core❳ -> ❨Fishstick❩❳ -> ❨Warp Drive❩
// `;
const inphrase = String.raw`
❲Shield❳
`;

var [result, rewriteEnvelope] = patternMatch (inphrase);
console.log (result.succeeded ());

console.log (rewriteEnvelope);

var cst = result;
console.log (rewrite (cst, rewriteEnvelope, rewriteRules));
