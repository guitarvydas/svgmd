> (ellipse)
> ((ellipse2))
> (((ellipse3)))
> ((((ellipse4))))
> (((((ellipse5)))))
> ((((((ellipse6))))))
> 
> [box]
> [[box2]]
> [[[box3]]]
> [[[[box4]]]]
> [[[[[box5]]]]]
> [[[[[[box6]]]]]]
> 
> -->            *arrow*
> --larrow-->    *labelled arrow*
> ---            *line*
> ---lline---    *labelled line*
> 
> <hexbox>
> <<hexbox2>>
> <<<hexbox3>>>
> <<<<hexbox4>>>>
> <<<<<hexbox5>>>>>
> <<<<<<hexbox6>>>>>>
> 
> (thing)        -- green?
> (/endthing)    -- yellow?
> 
> `quoted text`
> 
> ```
> multi-line quoted 
> text
> ```
> 
> *italicized text*
> 
> _underlined text_
> 
> !bold text!
> 
> TBD:
> [a failing of text is that character bitmaps cannot overlap, but, in 2020 we can allow windows to overlap, so ...]
> 
> [degenerate case: "overlapping window" has 1 character in it]
> [degenerate case: "overlapping window" has 0 characters in it]
> 
> 
> - overlapping (back up and place center of element over left/right edge of preceding element (like unicode accent overlay, but for graphics))
> 
> - relative positioning
> 
> - absolute positioning (maybe never?)
> 
> - overlapping in Y
> 
> - line-join (+)
> 
> - layers, groups
> 
> - layered notation: levels:
> -- bottom-most level of .svgmd allows drawing of basic graphic elements
> -- upper-layers describe relationships between elements at next-lower-level
> 
> - name
> -- what is this thing called? svgmd, gmd, g
> 
> - how to draw Components?
> -- 2 kinds of Components: (1) Leaf, (2) Container, (0) Signature
> -- Leaf contains code snippet
> -- Container contains (a) list of children Components (b) list of connections
> -- Signature - {name, inputs, outputs}
> 
> - fan-out, drawing of
> - fan-in, drawing of
> 

> (()) is smaller than (), ((())) is smaller than (()), etc.

>
> hierarchical levels? 
> { compose-using-elements-from-next-level-down { ... } }
> {
>   $1 --> $2
>   {
>     ...
>   }
> }
> 

> named level? so that levels can be placed anywhere in the file and don't need to be smooshed together, maybe #level-name

> { $1 --> $2 { #myname } }
>
> {id:myname { ... } }


> hmm, this is beginning to sound more general than just-graphics...

> maybe we allow raw .md in a level?
> { $1 --> $2 { #mynamedmd } }
>
> {id:mynamedmd { # Introduction ## sub-heading ... } }


>
> how to tell .md content from .sgv content?
> allow raw .html content?
> allow raw .css content?
> allow raw .txt content?
> allow raw .csv content?
> allow ... ?

> maybe a content level has a header that declares what kind of content follows?

> sooo, this becomes a spec for hierarchical layout of anything, with references "down" into children from immediately-enclosing wrapper?

> sooo, maybe an hlev (hierarchical level) can contain anything - text, drawing, code
> { $1 ()
>   { #kind JavaScript
>     function hello () {
>         console.log ('hello');
>     }
>   }
> }
> 
> $1 transpiles to "hello", so the first line becomes "{ hello (); ... }"
> maybe the syntax for "call" is "@":
> 
> { @$1
>   { ~kind JavaScript
>     function hello () {
>         console.log ('hello');
>     }
>   }
> }
> 
> @   means "invoke"
> --> means "join"
> ~   means "header"
>
> { $1 $2
>   { ~g
>     [box1]
>     [box2]
>   }
> }
>
> means "place box2 after box1 on page"
> 
> whereas
> { $1 --> $2
>   { ~g
>     [box1]
>     [box2]
>   }
> }
>
> means "connect box1 output to box2 input"
> and is rendered as:
> "place box2 after box1 on page and draw an arrow from rear of box1 to front of box2"

> TBD:
> how to specify specific ports, e.g. box1.xyz --> box2.abc

further clarity (?):

I am talking about 2 different things:
1. SVG markdown
2. HLL (Hierarchical Level Language) - a way to plumb hierarchical components together and to connect them

2 -> a Child (Leaf) can be /anything/, C code, JS code, stub, markdown, HTML, CSS, literate programming, Haskell, Rust, but, HLL must allow them to be composed and must write composition information out in some format (which can then be checked and transpiled) (not everything can be transpiled into runnable code, the checker checks for this)

The Editor implements gestures for constructing /anything/ (say, by invoking emacs or draw.io, or ...) and creates .HLL files.

TBD: how do we draw Harel Statecharts?  Drakon diagrams?  C code?  JS code?  Anything that plantuml can draw, but un-backwards.

Kinda like org-mode-babel but un-backwards.  Edit->text instead of text->???

Text is but a subset of SVG.  You /draw/ text in an editor, which produces .svg (.html?) files.

The text->diagram mind-virus causes us to create programs that are based on strictly non-overlapping grids of small bitmaps.

In 2020's, we have hardware that can create bitmaps that overlap (we call them "windows").  Text is but a subset of that.  Emacs is an editor that is grid-based and does not allow overlapping of cells.  We had to invent Unicode, to allow restricted forms of overlapping which still does not use our 2020's hardware to its full potential.

Text editing and text programming languages are based on the restrictions of 1950's hardware... 70 years later, and, we are still designing languages like we did in 1950.

