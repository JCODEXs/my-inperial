import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { WebrtcProvider } from 'y-webrtc';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { keymap } from '@codemirror/view';
import { useEffect } from 'react';
import { WebsocketProvider } from 'y-websocket';
import { userColor, myTheme } from './theming';
// import { yUndoManagerKeymap } from 'y-codemirror.next2';
let state, editor, provider;
const realTime = () => {
  const ydoc = new Y.Doc();
  provider = new WebsocketProvider(
    'ws://localhost:1234',
    'codemirror-demo',
    ydoc
  );
  // provider = new WebrtcProvider('codemirror-demo', ydoc);
  const ytext = ydoc.getText('codemirror');
  provider.awareness.setLocalStateField('user', {
    name: 'Anonymous ' + Math.floor(Math.random() * 100),
    color: userColor.color,
    colorLight: userColor.light,
  });
  return [yCollab(ytext, provider.awareness)];
};
function loadEditor(doc, onDocChange) {
  state = EditorState.create({
    // doc: ytext.toString(),
    extensions: [
      // keymap.of([...yUndoManagerKeymap]),
      basicSetup,
      javascript(),
      // ...realTime(),
      // defaultHighlightStyle,
      myTheme,
      // EditorView.updateListener.of((v) => {
      //   dispatch(v);
      // })
    ],
  });
  editor = new EditorView({
    state,
    parent: document.querySelector('#CMeditor'),
  });
}
const dispatch = (tr, doc, onDocChange) => {
  if (tr.docChanged) {
    console.log(tr);
    if (tr.state.doc.toString() != doc) {
      // onDocChange(tr.state.doc.toString());
    }
  }
};
const CodeMirror = ({ doc, onDocChange }) => {
  useEffect(() => {
    loadEditor(doc, onDocChange);
    return () => {
      // provider.disconnect();
      editor.destroy();
    };
  }, []);
  useEffect(() => {
    // const serializedDoc = state.doc;
    // if (serializedDoc != doc) {
    //   editor?.dispatch(
    //     editor.state.update({
    //       changes: {
    //         from: 0,
    //         to: editor.state.doc.length,
    //         insert: doc
    //       }
    //     })
    //   );
    // }
  }, [doc]);
  return (
    <div>
      <div id="CMeditor">
        <div className="CodeMirror-menubar">MARKDOWN</div>
      </div>
    </div>
  );
};
export default CodeMirror;
