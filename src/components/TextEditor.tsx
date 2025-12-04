'use client';

import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Dropcursor, Gapcursor, Placeholder } from '@tiptap/extensions';
import { useEditor, EditorContent } from '@tiptap/react';
import { useCallback, useState } from 'react';

interface Props {
  content?: string;
}

const styleActive = 'font-bold text-brand';

export default function TextEditor({ content }: Props) {
  const [_, forceUpdate] = useState(false);
  const editor = useEditor({
    content,
    extensions: [
      Document,
      Text,
      Paragraph,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      HorizontalRule,
      Image,
      Dropcursor,
      Gapcursor,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    /** NOTE
     * Don't render immediately on the server
     * to avoid SSR issues
     */
    immediatelyRender: false,
    //
    onTransaction: () => {
      forceUpdate((prev) => !prev);
    },
    // onSelectionUpdate: () => {
    //   forceUpdate((prev) => !prev);
    // },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <div className="control-group">
        <div className="button-group flex gap-4">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? styleActive : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? styleActive : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? styleActive : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? styleActive : ''}
          >
            Toggle blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? styleActive : ''}
          >
            Toggle bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? styleActive : ''}
          >
            Toggle ordered list
          </button>
          <div className="button-group">
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Set horizontal rule
            </button>
          </div>
          <div className="button-group">
            <button onClick={addImage}>Set image</button>
          </div>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-gray lg:prose-xl dark:prose-invert min-h-[300px] max-w-none p-6 focus:outline-none"
      />
    </>
  );
}
