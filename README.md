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
