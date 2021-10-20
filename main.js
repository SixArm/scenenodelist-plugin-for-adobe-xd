const { Artboard, Ellipse, Group, Line, Path, Polygon, Rectangle, Text } = require("scenegraph")
const clipboard = require("clipboard")

// Create the scene node list as HTML, starting from the document root.
// Copy the output to the clipboard.
function sceneNodeListAsHTMLHandler(selection, documentRoot) {
    clipboard.copyText(nodeAsHTML(documentRoot, 0))
}

// Create the scene node list as text, starting from the document root.
// Copy the output to the clipboard.
function sceneNodeListAsTextHandler(selection, documentRoot) {
    clipboard.copyText(nodeAsText(documentRoot, 0))
}

// Create one scene node as HTML.
// Return the HTML.
function nodeAsHTML(node, depth) {
    if (node instanceof Artboard)  return nodeArtboardAsHTML(node, depth)
    if (node instanceof Ellipse)   return ""
    if (node instanceof Group)     return nodeGroupAsHTML(node, depth)
    if (node instanceof Line)      return ""
    if (node instanceof Path)      return ""
    if (node instanceof Polygon)   return ""
    if (node instanceof Rectangle) return ""
    if (node instanceof Text)      return nodeTextAsHTML(node, depth)
    return nodeDefaultAsHTML(node, depth)
}

// Create one scene node as text.
// Return the text.
function nodeAsText(node, depth) {
    if (node instanceof Artboard)  return nodeArtboardAsText(node, depth)
    if (node instanceof Ellipse)   return ""
    if (node instanceof Group)     return nodeGroupAsText(node, depth)
    if (node instanceof Line)      return ""
    if (node instanceof Path)      return ""
    if (node instanceof Polygon)   return ""
    if (node instanceof Rectangle) return ""
    if (node instanceof Text)      return nodeTextAsText(node, depth)
    return nodeDefaultAsText(node, depth)
}

function nodeArtboardAsHTML(node, depth) {
    return nodeDefaultAsHTML(node, depth)   
}

function nodeArtboardAsText(node, depth) {
    return nodeDefaultAsText(node, depth)   
}

function nodeGroupAsHTML(node, depth) {
    return nodeDefaultAsHTML(node, depth)
}

function nodeGroupAsText(node, depth) {
    return nodeDefaultAsText(node, depth)
}

function nodeTextAsHTML(node, depth) {
    return nodeDefaultAsHTML(node, depth)
}

function nodeTextAsText(node, depth) {
    return nodeDefaultAsText(node, depth)
}

function nodeDefaultAsHTML(node, depth) {
    let contentHTML = oneline(node.name)
    if (contentHTML != "") {
        contentHTML = "" +
            indent(1) + "<section class=\"content\">\n" +
            indenter(2, contentHTML.trim()) + "\n" +
            indent(1) + "</section>\n"
    }
    var childrenHTML = ""
    node.children.forEach(node => {
        childrenHTML += nodeAsHTML(node, depth + 2)
    });
    if (childrenHTML != "") {
        childrenHTML = "" +
            indent(1) + "<section class=\"children\">\n" +
            indenter(2, childrenHTML.trim()) + "\n" +
            indent(1) + "</section>\n"
    }
    if (contentHTML == "" && childrenHTML == "") {
        return ""
    }
    return "" +
        "<div class=\"" + nodeDefaultAsCSSClassName(node) + "\">\n" +
        contentHTML +
        childrenHTML +
        "</div>\n"
}

function nodeDefaultAsText(node, depth) {
    let contentText = node.constructor.name + ": " + oneline(node.name) + "\n"
    if (contentText != "") {
        contentText = contentText.trim() + "\n"
    }
    var childrenText = ""
    node.children.forEach(node => {
        childrenText += nodeAsText(node, depth + 1)
    });
    if (childrenText != "") {
        childrenText = indenter(1, childrenText.trim()) + "\n"
    }
    return "" +
        contentText +
        childrenText
}

/// Node output suitable for a div, or CSS class name, or inner HTML

function nodeDefaultAsCSSClassName(node){
    return "Adobe-XD-" + node.constructor.name
}

/// Generic markup

function indent(step){
    return " ".repeat(step * 2)
}

function indenter(step, str){
    return str.replace(/^/gm, indent(step))
}

function oneline(str){
    return str.replace(/(?:]\r\n|\r|\n)/g, " ").replace(/  +/g, " ")
}

/// Exports

module.exports = {
    commands: {
        sceneNodeListAsHTMLCommand: sceneNodeListAsHTMLHandler,
        sceneNodeListAsTextCommand: sceneNodeListAsTextHandler,
    },
};
