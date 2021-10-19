const { Artboard, Ellipse, Line, Path, Polygon, Rectangle, Text } = require("scenegraph");
const clipboard = require("clipboard");

function sceneNodeListCommand(selection, documentRoot) {
    console.log("SceneNodeList");
    var text = sceneNodeListRecursive(documentRoot, 0);
    clipboard.copyText(text);
}

function sceneNodeListRecursive(node, depth) {
    var text = "";
    let indent = " ".repeat(depth * 2);
    if (
        node instanceof Ellipse ||
        node instanceof Line ||
        node instanceof Path || 
        node instanceof Polygon || 
        node instanceof Rectangle
    ) {
        //noop
    } else {
        var text = indent + node.name.replace(/(?:]\r\n|\r|\n)/g, " ").replace(/  +/g, " ") + "\n";
    }
    node.children.forEach(node => {
        text = text.concat(sceneNodeListRecursive(node, depth + 1));
    });
    return text;
}

module.exports = {
    commands: {
        sceneNodeListCommandId: sceneNodeListCommand,
    },
};
