"use client";

import { EditorProps } from "@tiptap/pm/view";
import { Editor } from "novel";

export const customEditorProps: EditorProps = {
  editable: () => false,
}

function ProblemStatement({statement, slug}: {statement: string, slug: string}) {
  console.log("statement", statement)

  return (
    <Editor editorProps={customEditorProps} defaultValue={JSON.parse(statement)} storageKey={`${slug}-statement`} disableLocalStorage={false} className="flex p-4 w-full rounded-md bg-transparent text-sm"/>
  )
}

export default ProblemStatement