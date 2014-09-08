var ua = navigator.userAgent;
var util = {
    msie: (function () {
        var r = ua.match(/msie (\d+\.\d)/i);
        if (r) {
            return doc.documentMode || (+r[1]);
        }
    })(),

    stringToMap: function (src, value, noUppercase) {
        src = src.split(',');
        value = value || true;
        var target = {};
        for (var i = 0, l = src.length; i < l; i++) {
            target[src[i]] = value;
            if (!noUppercase) {
                target[src[i].toUpperCase()] = value;
            }
        }
        return target;
    },

    uppercase: function (src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                src[key.toUpperCase()] = src[key];
            }
        }
        return s;
    },

    findFirstText: function (node) {
        var nodeType = node.nodeType;
        if (nodeType === 3) {
            return node;
        }

        if (nodeType !== 1) {
            return;
        }

        var nodeName = node.nodeName;
        if (dtd.empty[nodeName] && dtd.nochild[nodeName]) {
            return;
        }

        var first = node.firstChild;
        if (!first) {
            return;
        }

        var tmp;
        while (tmp = first.firstChild) {
            first = tmp;
        }
        return first.nodeType !== 3 ? first : null;
    }
};
