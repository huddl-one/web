"use client";

import { Problem } from "@huddl/db";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from "@tremor/react";
import { Code, FileText, FlaskConical, ListTodo, Play, StickyNote, TextQuote } from "lucide-react";
import Split from "react-split";
import ProblemStatement from "./ProblemStatement";

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { getLocalStorage } from "@web/lib/hooks/useLocalStorage";
import { Editor } from "novel";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface EditorCode {
    code: string;
  }

interface StarterCode {
  c: string;
  cpp: string;
  java: string;
  javascript: string;
  python: string;
}

const ProblemData = ({problem}: {problem: Problem}) => {
    return (
    <div className="px-6 overflow-auto">
      <TabGroup>
        <TabList variant="solid" className="mt-4">
          <Tab icon={FileText}>Description</Tab>
          <Tab icon={FlaskConical}>Solutions</Tab>
          <Tab icon={TextQuote}>Submissions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
          <ProblemStatement slug={problem.slug} statement={problem.problemStatement!} />
          </TabPanel>
          <TabPanel>
            <div className="mt-6 flex justify-center items-center h-[50vh]">
              Coming Soon...
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6 flex justify-center items-center h-[50vh]">
              Coming Soon...
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    )
}

const ProblemEditor = ({slug}: {slug: string}) => {
    const [editorLanguage, setEditorLanguage] = useState('javascript')
    const [code, setCode] = useState<EditorCode>({code: ''})

    useEffect(() => {
      // Load the code from localStorage when the component mounts or when editorLanguage changes
      const storedCode = getLocalStorage(slug + '-editorValue-' + editorLanguage) as unknown as EditorCode;
      // console.log(editorLanguage, storedCode);
      if (storedCode && 'code' in storedCode && storedCode.code !== "") {
        setCode(storedCode);
      } else {
        // Reset the code if there's nothing in localStorage for the selected language
        setCode({ code: '' });
      }
    }, [editorLanguage, slug]); // Add editorLanguage as a dependency

    function handleEditorChange(value: string | undefined, event: any) {
      let key = slug + '-editorValue-' + editorLanguage;

      // Save to localStorage
      if (value !== undefined) {
        localStorage.setItem(key, JSON.stringify({ code: value }));
    }
  }
      

    return (
        <div className="px-6 overflow-auto w-auto">
      <TabGroup>
        <TabList variant="solid" className="mt-4">
          <Tab icon={Code}>Code</Tab>
          <Tab icon={StickyNote}>Note</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
          <section className="flex justify-between">
          <Select defaultValue={editorLanguage} onValueChange={(value) => setEditorLanguage(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python3</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button variant={"outline"}><Play className="h-3 w-3 mr-2" />Run</Button>
            <Button>Submit</Button>
          </div>
          </section>
          <MonacoEditor
            className="mt-5"
            height="45vh"
            language={editorLanguage} // Use language instead of defaultLanguage
            value={code.code} // Use value instead of defaultValue
            onChange={handleEditorChange}
            />
          </TabPanel>
          <TabPanel>
            <div className="my-6">
            <Editor defaultValue={"You can write notes here. Press `/` for commands."} storageKey={`${slug}-notes`} className="p-8 flex min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    )
}

// {
//   javascript: {
//       code: "// javascript"
//   }
//   cpp: {
//       code: "// cpp"
//   }
//   c: {
//       code: "// c"
//   }
//   python: {
//       code: "# python"
//   }
//   java: {
//       code: "// java"
//   }
// }

interface TestCase {
  inputs: {
    [key: string]: any;
  };
  expected: any;
};


const TestCases = ({problem}: {problem: Problem}) => {
  const [tests, setTestCases] = useState<{examples: TestCase[]}>(JSON.parse(JSON.parse(problem.exampleTestCases!)));
  // console.log(typeof tests, tests.examples)
    return (
        <div className="px-6 overflow-auto">
      <TabGroup>
        <TabList variant="solid" className="mt-4">
          <Tab icon={ListTodo}>Test Cases</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">

              <TabGroup>
              <TabList variant="solid" className="mt-4">
              {tests.examples.map((test, index) => {
                return(
                  <Tab key={index}>Test Case {index + 1}</Tab>
                )
              })}
              </TabList>
              <TabPanels>
              {tests.examples.map((test, index) => {
                return(
                  <TabPanel key={index} className="pl-2 pt-2">{Object.keys(test.inputs).map((key) => (
                    <div key={index} className="flex flex-col gap-2 mb-4">
                      <div className="text-sm">{key} =</div>
                      <div className="bg-gray-200 rounded-md px-4 py-2">{test.inputs[key].length > 1 ? (test.inputs[key]) : test.inputs[key]}</div>
                    </div>
                  )
                )}
                </TabPanel>
                )
              })}
              </TabPanels>
              </TabGroup>

          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    )
}

const Workspace = ({problem}: {problem: Problem}) => {
    let horizontalSizes: any = localStorage.getItem('horizontal-split-sizes')

    if (horizontalSizes) {
        horizontalSizes = JSON.parse(horizontalSizes)
    } else {
        horizontalSizes = [40, 60] // default sizes
    }

    let verticalSizes: any = localStorage.getItem('vertical-split-sizes')

    if (verticalSizes) {
      verticalSizes = JSON.parse(verticalSizes)
    } else {
      verticalSizes = [60, 40] // default sizes
    }

    let starterCode = JSON.parse(problem.starterCode!) as StarterCode

    const javascriptEditorValue = getLocalStorage(problem.slug + '-editorValue-javascript');
    if (javascriptEditorValue === undefined || Object.keys(javascriptEditorValue).length === 0) {
      localStorage.setItem(problem.slug + '-editorValue-javascript', JSON.stringify({code: starterCode.javascript}));
    }

    const pythonEditorValue = getLocalStorage(problem.slug + '-editorValue-python');
    if (pythonEditorValue === undefined || Object.keys(pythonEditorValue).length === 0) {
      localStorage.setItem(problem.slug + '-editorValue-python', JSON.stringify({code: starterCode.python}));
    }

    const javaEditorValue = getLocalStorage(problem.slug + '-editorValue-java');
    if (javaEditorValue === undefined || Object.keys(javaEditorValue).length === 0) {
      localStorage.setItem(problem.slug + '-editorValue-java', JSON.stringify({code: starterCode.java}));
    }

    const cppEditorValue = getLocalStorage(problem.slug + '-editorValue-cpp');
    if (cppEditorValue === undefined || Object.keys(cppEditorValue).length === 0) {
      localStorage.setItem(problem.slug + '-editorValue-cpp', JSON.stringify({code: starterCode.cpp}));
    }

    const cEditorValue = getLocalStorage(problem.slug + '-editorValue-c');
    if (cEditorValue === undefined || Object.keys(cEditorValue).length === 0) {
      localStorage.setItem(problem.slug + '-editorValue-c', JSON.stringify({code: starterCode.c}));
    }

    return (
        <Split className="flex pt-14  h-screen" minSize={400} sizes={horizontalSizes} onDragEnd={(sizes) => {
            localStorage.setItem('horizontal-split-sizes', JSON.stringify(sizes))
        }} >
            <ProblemData problem={problem} />
            <Split
                className="flex flex-col"
                direction="vertical"
                minSize={200}
                sizes={verticalSizes}
            >
                <ProblemEditor slug={problem.slug}/>
                <TestCases problem={problem} />
            </Split>
        </Split>
    );
};
export default Workspace;
