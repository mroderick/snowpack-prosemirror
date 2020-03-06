import {EditorState} from "/web_modules/prosemirror-state.js"
import {EditorView} from "/web_modules/prosemirror-view.js"
import {Schema, DOMParser} from "/web_modules/prosemirror-model.js"
import {schema} from "/web_modules/prosemirror-schema-basic.js"
import {addListNodes} from "/web_modules/prosemirror-schema-list.js"
import {exampleSetup} from "/web_modules/prosemirror-example-setup.js"

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})

window.view = new EditorView(document.querySelector("#basic-editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#basic-content")),
    plugins: exampleSetup({schema: mySchema})
  })
})
