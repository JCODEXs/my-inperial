import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "prosemirror-gapcursor/style/gapcursor.css";
import "prosemirror-example-setup/style/style.css";
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import {
  ySyncPlugin,
  yCursorPlugin,
  // yUndoPlugin,
  // undo,
  // redo,
} from "y-prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { exampleSetup } from "prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import { useEffect, useLayoutEffect } from "react";
let state, editor;
const realTime = () => {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "ws://localhost:1234",
    "prosemirror-demo",
    ydoc
  );
  const yXmlFragment = ydoc.getXmlFragment("prosemirror");
  console.log("yXmlFragment ", yXmlFragment.toString());

  return [ySyncPlugin(yXmlFragment), yCursorPlugin(provider.awareness)];
};
const loadEditor = (doc, onDocChange) => {
  state = EditorState.create({
    // doc: defaultMarkdownParser.parse(doc),
    schema,
    plugins: [
      ...exampleSetup({ schema }),
      // ...realTime(),
      // yUndoPlugin(),
      // keymap({
      //   'Mod-z': undo,
      //   'Mod-y': redo,
      //   'Mod-Shift-z': redo,
      // }),
    ],
    // .concat(
    // ),
  });
  editor = new EditorView(document.querySelector("#PMeditor"), {
    state,
    dispatchTransaction: (transaction) => {
      dispatch(transaction, doc, onDocChange);
    },
  });
};
const dispatch = (tr, doc, onDocChange) => {
  // console.log(tr);
  // alert('disp');
  state = state.apply(tr);
  editor.updateState(state);
  const serializedDoc = defaultMarkdownSerializer.serialize(tr.doc);
  if (serializedDoc != doc) {
    // setDisabled(state);
    // renderCommits(state, dispatch);
    onDocChange(defaultMarkdownSerializer.serialize(tr.doc), tr);
  }
};
const ProseMirror = ({ doc, onDocChange }) => {
  useEffect(() => {
    loadEditor(doc, onDocChange);
    return () => {
      editor.destroy();
    };
  }, []);
  useEffect(() => {
    // const serializedDoc = defaultMarkdownSerializer.serialize(state.doc);
    // if (serializedDoc != doc) {
    //   state.doc = defaultMarkdownParser.parse(doc);
    //   try {
    //     editor.updateState(state);
    //   } catch (e) {}
    // }
  }, [doc]);
  return <div id="PMeditor"></div>;
};
export default ProseMirror;
// EditorState.create({
//   doc: defaultMarkdownParser.parse(doc),
//   schema: state.schema,
//   selection: state.selection,
//   storedMarks: state.storedMarks,
//   plugins: state.plugins
// }),
// dispatch(state.tr);
