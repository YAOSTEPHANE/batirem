/**
 * Bootstrap (v5.0.0-beta2): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

const uriAttrs = new Set([
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
]);

const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

const allowedAttribute = (attr, allowedAttributeList) => {
    const attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attrName)) {
        if (uriAttrs.has(attrName)) {
            return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
        }

        return true;
    }

    const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp);

    for (let i = 0, len = regExp.length; i < len; i++) {
        if (regExp[i].test(attrName)) {
            return true;
        }
    }

    return false;
};

const DefaultAllowlist = {
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
};

const sanitizeHtml = (unsafeHtml, allowList = DefaultAllowlist) => {
    if (!unsafeHtml.length) {
        return unsafeHtml;
    }

    const domParser = new DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const allowlistKeys = Object.keys(allowList);
    const elements = Array.from(createdDocument.body.querySelectorAll('*'));

    for (const el of elements) {
        const elName = el.nodeName.toLowerCase();

        if (!allowlistKeys.includes(elName)) {
            el.parentNode.removeChild(el);

            continue;
        }

        const attributeList = Array.from(el.attributes);
        const allowedAttributes = [...allowList['*'] || [], ...allowList[elName] || []];

        for (const attr of attributeList) {
            if (!allowedAttribute(attr, allowedAttributes)) {
                el.removeAttribute(attr.nodeName);
            }
        }
    }

    return createdDocument.body.innerHTML;
};

export default sanitizeHtml;
