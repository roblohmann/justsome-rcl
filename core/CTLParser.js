import React from 'react';

export class CTLParser {
    constructor(owner) {
        this.owner = owner;
    }

    parse(ctlText) {
        this.text = ctlText;

        const script = this.buildScript(ctlText);
        const code = this.compile(script);

        const jsx = [];

        code.forEach((element) => {
            if (element.source.length > 0) {
                jsx.push(element.target);
            }
        });

        console.log(script);
        console.log(code);

        return jsx;
    }

    buildScript(ctlText) {
        const parsers = [
            { name: 'lineFeed', single: true, regex: /#LF#/g },
            { name: 'bold', single: false, regex: /#B#(.*?)#\\B#/g },
            { name: 'link', single: false, regex: /#LNK.+?#(.*?)#\\LNK#/g }
        ];
        const script = [];

        for (let index = 0; index < parsers.length; index++) {
            const parser = parsers[index];

            const matches = ctlText.matchAll(parser.regex);
            for (const match of matches) {
                if (parser.single) {
                    const info = {
                        startIndex: match.index,
                        endIndex: match.index + match[0].length,
                        openingsTag: match[0],
                        closingTag: match[0],
                        contents: '',
                        attributes: null
                    };

                    script.push(info);
                } else {
                    const info = this.extractTag(match[0], match.index);
                    if (info !== null) {
                        script.push(info);
                    }
                }
            }
        }

        return script.sort((a, b) => {
            if (a.startIndex < b.startIndex) {
                return -1;
            }

            if (a.startIndex > b.startIndex) {
                return 1;
            }

            return 0;
        });
    }

    extractTag(text, index) {
        const firstMarker = text.indexOf('#', 1);
        if (firstMarker == -1) {
            console.log('Syntax error: Unable to parse openings tag (first marker)');
            return null;
        }

        const lastMarker = text.indexOf('#\\', firstMarker + 1);
        if (lastMarker == -1) {
            console.log('Syntax error: Unable to parse closing tag');
            return null;
        }

        const endMarker = text.indexOf('#', lastMarker + 1);
        if (endMarker == -1) {
            console.log('Syntax error: Unable to parse closing tag');
            return null;
        }

        const openingsTag = text.substring(0, firstMarker + 1);
        const closingTag = text.substring(lastMarker, endMarker + 1);
        const contents = text.substring(firstMarker + 1, lastMarker);

        const info = {
            startIndex: index,
            endIndex: index + text.length,
            openingsTag: openingsTag,
            closingTag: closingTag,
            contents: contents,
            attributes: this.extractAttributes(openingsTag)
        };

        return info;
    }

    extractAttributes(tag) {
        let nextMarker = 0;
        let firstMarker = 0;
        let middleMarker = 0;
        let lastMarker = 0;
        const attributes = [];

        do {
            firstMarker = tag.indexOf(' ', nextMarker);
            if (firstMarker == -1) {
                return null;
            }

            middleMarker = tag.indexOf(':', firstMarker);
            if (middleMarker == -1) {
                return null;
            }

            nextMarker = tag.indexOf(' ', middleMarker);
            if (nextMarker != -1) {
                const attributeKey = tag.substring(firstMarker, middleMarker);
                const attributeValue = tag.substring(middleMarker + 1, nextMarker);

                attributes.push({ key: attributeKey.trim(), value: attributeValue.trim() });
            }
        } while (nextMarker != -1);

        lastMarker = tag.indexOf('#', middleMarker);
        if (lastMarker != -1) {
            const attributeKey = tag.substring(firstMarker, middleMarker);
            const attributeValue = tag.substring(middleMarker + 1, lastMarker);

            attributes.push({ key: attributeKey.trim(), value: attributeValue.trim() });
        }

        return attributes;
    }

    compile(script) {
        const code = [];
        let lastIndex = 0;
        let keyIndex = 1;

        script.forEach((element) => {
            const text = this.text.substring(lastIndex, element.startIndex);
            code.push({
                source: 'text',
                target: <span key={keyIndex++}>{text}</span>
            });

            if (element.openingsTag.startsWith('#LF')) {
                code.push({
                    source: element.openingsTag,
                    target: <br key={keyIndex++} />
                });
            } else if (element.openingsTag.startsWith('#B')) {
                code.push({
                    source: element.openingsTag + element.contents + element.closingTag,
                    target: <b key={keyIndex++}>{element.contents}</b>
                });
            } else if (element.openingsTag.startsWith('#LNK')) {
                code.push({
                    source: element.openingsTag + element.contents + element.closingTag,
                    target: (
                        <div
                            key={keyIndex++}
                            className='ctl-link'
                            onClick={() =>
                                this.owner.onLinkClicked(
                                    element.attributes[0].value,
                                    element.attributes[1].value
                                )
                            }
                        >
                            {element.contents}
                        </div>
                    )
                });
            }

            lastIndex = element.endIndex;
        });

        const lastText = this.text.substring(lastIndex, this.text.length);
        code.push({
            source: 'text',
            target: <span key={keyIndex}>{lastText}</span>
        });

        return code;
    }
}
