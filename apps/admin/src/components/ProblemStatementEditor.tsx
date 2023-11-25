"use client";

import { Badge, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { Editor } from "novel";
import { useEffect, useState } from "react";
import { colors, difficultyTypes } from "./Problems";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

import { trpc } from "@admin/app/_trpc/client";
import { getLocalStorage } from "@admin/utils/hooks/useLocalStorage";
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useToast } from "./ui/use-toast";

interface ProblemStatementEditorProps {
  slug: string;
  problemTitle: string;
  problemDiff: string;
  isPublic: boolean;
}

interface EditorJSON {
  type: string;
  content: any[];
}

interface EditorCode {
  code: string;
}

const ProblemEditor = ({slug}: {slug: string}) => {
  const [editorLanguage, setEditorLanguage] = useState('javascript')
  const [code, setCode] = useState<EditorCode>({code: ''})

  useEffect(() => {
    // Load the code from localStorage when the component mounts or when editorLanguage changes
    const storedCode = getLocalStorage(slug + '-editorValue-' + editorLanguage) as unknown as EditorCode;
    console.log(editorLanguage, storedCode);
    if (storedCode && 'code' in storedCode && storedCode.code !== "") {
      setCode(storedCode);
    } else {
      // Reset the code if there's nothing in localStorage for the selected language
      setCode({ code: '' });
    }
  }, [editorLanguage]); // Add editorLanguage as a dependency

  function handleEditorChange(value: string | undefined, event: any) {
    let key = slug + '-editorValue-' + editorLanguage;

    // Save to localStorage
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify({ code: value }));
  }
}
    

  return (
      <div className="px-6 overflow-auto w-auto">
        <div className="">
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
        </section>
        <MonacoEditor
          className="mt-5"
          height="90vh"
          language={editorLanguage} // Use language instead of defaultLanguage
          value={code.code} // Use value instead of defaultValue
          onChange={handleEditorChange}
          />
        </div>
  </div>
  )
}

const ProblemStatementEditor = ({slug, problemTitle, problemDiff, isPublic}:ProblemStatementEditorProps) => {

  function handleEditorChange(value:string | undefined, event: any) {
    let key = slug+'editorValue'

    // save to localstorage
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify({code: value}));
    }
  }
  
  function handleExamplesEditorChange(value:string | undefined, event: any) {
    let key = slug+'examples'

    // save to localstorage
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify({code: value}));
    }
  }
  
  function handleTestCasesEditorChange(value:string | undefined, event: any) {
    let key = slug+'testCases'

    // save to localstorage
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify({code: value}));
    }
  }

  const { toast } = useToast();
  const updateProblemMutation = trpc.problem.updateProblem.useMutation({
    onSuccess: () => {
      toast({
        title: "Success ",
        description: "Updated the question successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  })

  const updateProblemMetaMutation = trpc.problem.updateProblemMeta.useMutation({
    onSuccess: () => {
      toast({
        title: "Success ",
        description: "Updated the question successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  })
  /**
   * 1. When clicked on save button, get the content from local storage
   * 2. Send the content to the server
   * 3. If the content is saved successfully, show a toast message
   */

  const [problemDifficulty, setProblemDifficulty] = useState<string>(problemDiff);
  const [prblmTitle, setProblemTitle] = useState<string>(problemTitle);
  const [isProblemPublic, setIsProblemPublic] = useState<boolean>(isPublic);

  function handleMetaDataSave() {
    updateProblemMetaMutation.mutate({
      problemSlug: slug,
      title: prblmTitle,
      difficulty: problemDifficulty as "easy" | "medium" | "hard",
      isProblemPublic: isProblemPublic,
    })
  }

  function handleSave() {
    // Get the value from localstorage
    const editorInJSON = getLocalStorage(slug) as unknown as EditorJSON;
    console.log(editorInJSON.content);

    let starterCode: any = {}

    // Get the code from localstorage for each language
    let editorCode = getLocalStorage(slug+'-editorValue-c') as unknown as EditorCode;
    starterCode['c'] = editorCode.code;

    editorCode = getLocalStorage(slug+'-editorValue-cpp') as unknown as EditorCode;
    starterCode['cpp'] = editorCode.code;

    editorCode = getLocalStorage(slug+'-editorValue-java') as unknown as EditorCode;
    starterCode['java'] = editorCode.code;

    editorCode = getLocalStorage(slug+'-editorValue-python') as unknown as EditorCode;
    starterCode['python'] = editorCode.code;

    editorCode = getLocalStorage(slug+'-editorValue-javascript') as unknown as EditorCode;
    starterCode['javascript'] = editorCode.code;

    console.log(starterCode);

    // Get the examples from localstorage
    let examples = getLocalStorage(slug+'examples') as unknown as EditorCode;
    console.log(examples.code);

    // Get the test cases from localstorage
    let testCases = getLocalStorage(slug+'testCases') as unknown as EditorCode;
    console.log(testCases.code);

    updateProblemMutation.mutate({
      problemSlug: slug,
      problemStatement: JSON.stringify(editorInJSON),
      starterCode: JSON.stringify(starterCode),
      examples: examples.code ? JSON.stringify(examples.code) : "",
      testCases: testCases.code ? JSON.stringify(testCases.code) : "",
    })
  }


    
  return (
    <>
    <TabGroup className="mt-6">
        
        <TabList>
          <Tab className="">Question Data</Tab>
          <Tab className="">Meta Data</Tab>
          <Tab className="">Preview</Tab>
        </TabList>
        
        <TabPanels>
          
          <TabPanel>
          <section className="">
      <CardHeader className="flex-row flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Question Data
        </h2>
        <Button onClick={handleSave} disabled={updateProblemMutation.isLoading} size={"lg"}>Save</Button>
      </CardHeader>
      <section className="grid grid-cols-4 gap-8">
    <Card className="col-span-2">
      <CardHeader><h2 className="text-lg font-semibold">Problem Statement</h2></CardHeader>
      <CardContent>
      <Editor storageKey={slug} className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/>
      </CardContent>
    </Card>
    <Card className="col-span-2">
      <CardHeader><h2 className="text-lg font-semibold">Starter Code</h2></CardHeader>
      <CardContent>
      <ProblemEditor slug={slug} />
      </CardContent>
    </Card>
    <section className="col-span-5 space-y-10">
    <Card className="">
      <CardHeader><h2 className="text-lg font-semibold">Example Test Case</h2></CardHeader>
      <CardContent className="space-y-4">
        <MonacoEditor
          height="30vh"
          defaultLanguage="javascript"
          defaultValue={((getLocalStorage(slug+'examples') as unknown as EditorCode).code)}
          onChange={handleExamplesEditorChange}
        />
      </CardContent>
    </Card>
    <Card className="">
    <CardHeader><h2 className="text-lg font-semibold">Test Cases</h2></CardHeader>
      <CardContent className="space-y-4">
      <MonacoEditor
          height="30vh"
          defaultLanguage="javascript"
          defaultValue={((getLocalStorage(slug+'testCases') as unknown as EditorCode).code)}
          onChange={handleTestCasesEditorChange}
        />
      </CardContent>
    </Card>
    </section>
    </section>
    </section>
          </TabPanel>
          
          <TabPanel>
            <section className="">
              <CardHeader className="flex-row flex justify-between items-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Meta Data
                </h2>
                <Button size={"lg"} onClick={handleMetaDataSave} disabled={updateProblemMetaMutation.isLoading}>Save</Button>
              </CardHeader>
            <section className="grid grid-cols-5 gap-8">
            <section className="col-span-3 space-y-10">
              <Card>
                <CardHeader>
                  <CardTitle>Meta Settings</CardTitle>
                  <CardDescription>Manage problem settings here.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="title" className="flex flex-col space-y-1">
                      <span>Title</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Update the title of the problem.
                      </span>
                    </Label>
                    <Input id="title" placeholder="Title"  className="w-1/3" defaultValue={problemTitle} onChange={(value) => setProblemTitle(value.target.value)}/>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="difficulty" className="flex flex-col space-y-1">
                      <span>Difficulty</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Update the difficulty of the problem.
                      </span>
                    </Label>
                    <Select defaultValue={problemDiff} onValueChange={
                          (value) => setProblemDifficulty(value)
                        }>
                          <SelectTrigger id="difficulty" className="w-1/3" defaultValue={problemDifficulty}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {difficultyTypes.map((item) => (
                              <SelectItem key={item} value={item}>
                                <Badge color={colors[item]}>
                                  {item}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                  </div>
                </CardContent>
              </Card>
            </section>
            <section className="col-span-2 space-y-10">
              <Card>
                <CardHeader>
                  <CardTitle>Public Settings</CardTitle>
                  <CardDescription>Manage problem view settings here.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="public" className="flex flex-col space-y-1">
                      <span>Public</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        This toggle will make the problem public.
                      </span>
                    </Label>
                    <Switch id="public" onCheckedChange={(value) => setIsProblemPublic(value)} defaultChecked={isPublic}/>
                  </div>
                </CardContent>
              </Card>
            </section>
    </section>
    </section>
          </TabPanel>
          
          <TabPanel>
            <section className="w-full text-center my-10">
              Coming Soon...
            </section>
          </TabPanel>

        </TabPanels>
        </TabGroup>
        </>
    
  )
}

export default ProblemStatementEditor;
