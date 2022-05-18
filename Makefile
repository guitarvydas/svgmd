prep=~/.local/tools/prep

all:
	${prep} '.' '$$' svgmd.ohm identity-svgmd.fmt --stop=1 --input=test.svgmd --errorview
