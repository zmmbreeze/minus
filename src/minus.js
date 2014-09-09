var uid = 0;
/**
 * Minus class
 * @param {string|Element} element
 */
var Minus = function (element) {
    /**
     * root element
     * @type {Element}
     */
    this.element = typeof element === 'string'
        ? document.getElementById(element) : element;
    /**
     * document
     * @type {Document}
     */
    this.doc = this.element.ownerDocument;
    /**
     * window
     * @type {Window}
     */
    this.win = this.doc.defaultView;

    this.init();
};

Minus.prototype.init = function () {
    this.element.contentEditable = true;
};

Minus.prototype.getRange = function () {
    var s = this.win.getSelection();
    if (!s.rangeCount) {
        return;
    }
    var r = s.getRangeAt(0);
    return this.element.contains(r.commonAncestorContainer)
        ? r : null;
};

Minus.prototype.setCursor = function (node, opt_offset) {
    var r = this.doc.createRange();
    var s = this.win.getSelection();
    var firstText = util.findFirstText(node);
    r.setStart(firstText || node, opt_offset || 0);
    r.collapse(true);
    if (s.rangeCount) {
        s.removeAllRanges();
    }
    s.addRange(r);
};

Minus.prototype.setCursorFromEnd = function (node, opt_offset) {
    var s = this.win.getSelection();
    var r = this.doc.createRange();
    var lastText = util.findLastText(node);
    var offset = (lastText ? lastText.nodeValue.length : node.childNodes.length) - (opt_offset || 0);
    r.setEnd(lastText || node, offset);
    r.collapse();
    if (s.rangeCount) {
        s.removeAllRanges();
    }
    s.addRange(r);
};

Minus.prototype.selectContent = function (node) {
    var s = this.win.getSelection();
    var r = this.doc.createRange();
    r.selectNodeContents(node);
    if (s.rangeCount) {
        s.removeAllRanges();
    }
    s.addRange(r);
};

Minus.prototype.createBookmark = function () {
    var id = uid++;
    var start = doc.createElement('span');
    var end;
    var range = util.getFirstRange();
    start.style.cssText = 'display:none;line-height:0px;';
    start.appendChild(doc.createTextNode('\u200D'));
    start.id = '_minus_bookmark_s_' + id;

    if (!range.collapsed) {
        end = start.cloneNode(true);
        endNode.id = '_minus_bookmark_e_' + id;
    }
};

Minus.prototype.insertNode = function (node, isEnd) {
    var r = this.getRange();
    if (!r) {
        return;
    }

    if (isEnd) {
        r.collapse();
    }
    r.insertNode(node);
};

Minus.prototype.filterPaste = function () {
    this.element.addListener(
        util.msie ? 'beforepaste' : 'paste',
        function (e) {
            
        }
    )
};

/**
 * entry function
 * @param {string|Element} element
 */
window.minus = function (element) {
    return new Minus(element);
};
