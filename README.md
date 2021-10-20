# SceneNodeList Adobe XD plugin

Export the scene node list as an outline, using HTML or text, and copying the result to the clipboard.

This is a quick easy way to show what your file contains.

There are two commands:

* Scene Node List - As HTML - To Clipboard

* Scene Node List - As Text - To Clipboard


## Scene Node List - As HTML - To Clipboard

The HTML output uses div tags and section tags.

  * Each node is a div.
  
  * The class is "Adobe-XD-" and the node type, such as "Adobe-XD-Artboard". 
  
  * This makes it easy to style results.

Each node div has:

  * A section with class "Adobe-XD-Content" that contains the node name.
  
  * A section with class "Adobe-XD-Children" that contains the node's children. 
  
  * If a section is blank then it's elided.

Example output:

```html
<div class="Adobe-XD-RootNode">
  <section class="Adobe-XD-Node-Children">
    <div class="Adobe-XD-Artboard">
      <section class="Adobe-XD-Node-Content">
        Example Artboard
      </section>
      <section class="Adobe-XD-Node-Children">
        <div class="Adobe-XD-Group">
          <section class="Adobe-XD-Node-Content">
            Group 1
          </section>
          <section class="Adobe-XD-Node-Children">
            <div class="Adobe-XD-Text">
              <section class="Adobe-XD-Node-Content">
                Example Text
              </section>
            </div>
          </section>
        </div>
    </div>
</div>
```


## Scene Node List - As Text - To Clipboard

The text output uses a one line per node, with indentation, then the node instance name, then the node name.

Example output:

```text
RootNode
    Artboard: Example Artboard
        Group 1
            Text: Example Text
```
