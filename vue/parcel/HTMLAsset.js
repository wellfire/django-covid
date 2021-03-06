'use strict';

function _asyncToGenerator (fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step (key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Asset = require('parcel-bundler/src/Asset')
const api = require('posthtml/lib/api')
const urlJoin = require('parcel-bundler/src/utils/urlJoin')
const render = require('posthtml-render');
const posthtmlTransform = require('parcel-bundler/src/transforms/posthtml');
const htmlnanoTransform = require('parcel-bundler/src/transforms/htmlnano');
const isURL = require('parcel-bundler/src/utils/is-url');


// We don't want to process dependencies in the html files

// A list of all attributes that may produce a dependency
// Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
const ATTRS = {
    // src: ['script', 'img', 'audio', 'video', 'source', 'track', 'iframe', 'embed'],
    // href: ['link', 'a', 'use'],
    // srcset: ['img', 'source'],
    // poster: ['video'],
    // 'xlink:href': ['use'],
    // content: ['meta'],
    // data: ['object']
};

// A list of metadata that should produce a dependency
// Based on:
// - http://schema.org/
// - http://ogp.me
// - https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
// - https://msdn.microsoft.com/en-us/library/dn255024.aspx
const META = {
    // property: ['og:image', 'og:image:url', 'og:image:secure_url', 'og:audio', 'og:audio:secure_url', 'og:video', 'og:video:secure_url'],
    // name: ['twitter:image', 'msapplication-square150x150logo', 'msapplication-square310x310logo', 'msapplication-square70x70logo', 'msapplication-wide310x150logo', 'msapplication-TileImage'],
    // itemprop: ['image', 'logo', 'screenshot', 'thumbnailUrl', 'contentUrl', 'downloadUrl']
};

// Options to be passed to `addURLDependency` for certain tags + attributes
const OPTIONS = {
    a: {
        href: { entry: true }
    },
    iframe: {
        src: { entry: true }
    }
};

class HTMLAsset extends Asset {
    constructor (name, options) {
        super(name, options);
        this.type = 'html';
        this.isAstDirty = false;
    }

    parse (code) {
        var _this = this;

        return _asyncToGenerator(function* () {
            let res = yield posthtmlTransform.parse(code, _this);
            res.walk = api.walk;
            res.match = api.match;
            return res;
        })();
    }

    processSingleDependency (path, opts) {
        let assetPath = this.addURLDependency(path, opts);
        if (!isURL(assetPath)) {
            assetPath = urlJoin(this.options.publicURL, assetPath);
        }
        return assetPath;
    }

    collectSrcSetDependencies (srcset, opts) {
        const newSources = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = srcset.split(',')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                const source = _step.value;

                const pair = source.trim().split(' ');
                if (pair.length === 0) continue;
                pair[0] = this.processSingleDependency(pair[0], opts);
                newSources.push(pair.join(' '));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return newSources.join(',');
    }

    getAttrDepHandler (attr) {
        if (attr === 'srcset') {
            return this.collectSrcSetDependencies;
        }
        return this.processSingleDependency;
    }

    collectDependencies () {
        this.ast.walk(node => {
            if (node.attrs) {
                if (node.tag === 'meta') {
                    if (!Object.keys(node.attrs).some(attr => {
                        let values = META[attr];
                        return values && values.includes(node.attrs[attr]);
                    })) {
                        return node;
                    }
                }

                for (let attr in node.attrs) {
                    let elements = ATTRS[attr];
                    // Check for virtual paths
                    if (node.tag === 'a' && node.attrs[attr].lastIndexOf('.') < 1) {
                        continue;
                    }

                    if (elements && elements.includes(node.tag)) {
                        let depHandler = this.getAttrDepHandler(attr);
                        let options = OPTIONS[node.tag];
                        node.attrs[attr] = depHandler.call(this, node.attrs[attr], options && options[attr]);
                        this.isAstDirty = true;
                    }
                }
            }

            return node;
        });
    }

    pretransform () {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            yield posthtmlTransform.transform(_this2);
        })();
    }

    transform () {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3.options.minify) {
                yield htmlnanoTransform(_this3);
            }
        })();
    }

    generate () {
        return this.isAstDirty ? render(this.ast) : this.contents;
    }
}

module.exports = HTMLAsset;
