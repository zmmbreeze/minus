(function (win, doc) {

var ua = navigator.userAgent;
var uid = 0;
var util = {
    msie: (function () {
        var r = ua.match(/msie (\d+\.\d)/i);
        if (r) {
            return doc.documentMode || (+r[1]);
        }
    })(),

    getFirstRange: function () {
        return win.getSelection().getRangeAt(0);
    },

    selectContent: function (node) {
        var s = win.getSelection();
        var r = doc.createRange();
        r.selectNodeContents(node);
        if (s.rangeCount) {
            s.removeAllRanges();
        }
        s.addRange(r);
    },

    createBookmark: function () {
        var start = doc.createElement('span');
        var end;
        var range = util.getFirstRange();
        start.style.cssText = 'display:none;line-height:0px;';
        start.appendChild(doc.createTextNode('\u200D'));
        start.id = '_minus_bookmark_s_' + (uid+);

        if (!range.collapsed) {
            end = start.cloneNode(true);
            endNode.id = '_minus_bookmark_e_' + (uid+);
        }

    }
};

/**
 *
 * @param {string|Element} element
 */
var Minus = function (element) {
    this.element = typeof element === 'string'
        ? document.getElementById(element) : element;

    this.init();
};

Minus.prototype.init = function () {

};

Minus.prototype.filterPaste = function () {
    this.element.addListener(
        util.msie ? 'beforepaste' : 'paste',
        function (e) {
            
        }
    )
};

})(window, document);
