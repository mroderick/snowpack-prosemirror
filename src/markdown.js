import {EditorView} from "/web_modules/prosemirror-view.js"
import {EditorState} from "/web_modules/prosemirror-state.js"
import {schema, defaultMarkdownParser,
        defaultMarkdownSerializer} from "/web_modules/prosemirror-markdown.js"
import {exampleSetup} from "/web_modules/prosemirror-example-setup.js"

class MarkdownView {
  constructor(target, content) {
    this.textarea = target.appendChild(document.createElement("textarea"))
    this.textarea.value = content
  }

  get content() { return this.textarea.value }
  focus() { this.textarea.focus() }
  destroy() { this.textarea.remove() }
}

class ProseMirrorView {
  constructor(target, content) {
    this.view = new EditorView(target, {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(content),
        plugins: exampleSetup({schema})
      })
    })
  }

  get content() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc)
  }
  focus() { this.view.focus() }
  destroy() { this.view.destroy() }
}

let place = document.querySelector("#markdown-editor")
let view = new MarkdownView(place, document.querySelector("#markdown-content").value)

document.querySelectorAll("input[type=radio]").forEach(button => {
  button.addEventListener("change", () => {
    if (!button.checked) return
    let View = button.value == "markdown" ? MarkdownView : ProseMirrorView
    if (view instanceof View) return
    let content = view.content
    view.destroy()
    view = new View(place, content)
    view.focus()
  })
})
