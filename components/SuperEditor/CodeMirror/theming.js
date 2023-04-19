import { EditorView } from '@codemirror/basic-setup';
import * as random from 'lib0/random';

export const usercolors = [
    { color: '#30bced', light: '#30bced33' },
    { color: '#6eeb83', light: '#6eeb8333' },
    { color: '#ffbc42', light: '#ffbc4233' },
    { color: '#ecd444', light: '#ecd44433' },
    { color: '#ee6352', light: '#ee635233' },
    { color: '#9ac2c9', light: '#9ac2c933' },
    { color: '#8acb88', light: '#8acb8833' },
    { color: '#1be7ff', light: '#1be7ff33' }
];
export const myTheme = EditorView.theme(
    {
        '&': {
            color: 'silver',
            // backgroundColor: 'rgb(10,10,10)',
            flex: 1,
            overflow: 'hidden'
        },
        '.cm-scroller': {},
        '.cm-content': {
            caretColor: '#0e9'
        },
        '&.cm-focused .cm-cursor': {
            borderLeftColor: '#0e9'
        },
        '&.cm-focused .cm-selectionBackground, ::selection': {
            backgroundColor: 'indigo',
            borderRadius: '2px'
            // filter: 'invert(1)',
            // mixBlendMode: 'difference',
        },
        '.cm-gutters': {
            backgroundColor: '#045',
            color: '#ddd',
            border: 'none'
        },
        '.cm-content, .cm-gutter': { minHeight: '100%' },
        '.cm-activeLine': {
            background: 'rgba(0,0,0)',
            border: 'solid 1px #577777'
        },
        '.ͼd': {
            color: 'pink'
        }
    },
    { dark: true }
);

export const userColor = usercolors[random.uint32() % usercolors.length];
