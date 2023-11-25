import { EditorProps } from "@tiptap/pm/view";
import { Editor } from "novel";

export const customEditorProps: EditorProps = {
  editable: () => false,
}

function ProblemStatement({statement}: {statement: string}) {
  console.log("statement", statement)

  return (
    <Editor editorProps={customEditorProps} defaultValue={JSON.parse(statement)} className="flex p-4 w-full rounded-md bg-transparent text-sm"/>
  )
}

export default ProblemStatement