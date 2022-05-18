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
