"use client";

import { Badge, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { Editor } from "novel";
import { useState } from "react";
import { colors, difficultyTypes } from "./Problems";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

import { Editor as MonacoEditor } from '@monaco-editor/react';

interface ProblemStatementEditorProps {
  slug: string;
  problemTitle: string;
  problemDiff: string;
  isPublic: boolean;
}

const ProblemStatementEditor = ({slug, problemTitle, problemDiff, isPublic}:ProblemStatementEditorProps) => {

  function handleEditorChange(value:string | undefined, event: any) {
    let key = slug+'editorValue'

    // save to localstorage
    if (value !== undefined) {
      localStorage.setItem(key, value);
    }
  }
  /**
   * 1. When clicked on save button, get the content from local storage
   * 2. Send the content to the server
   * 3. If the content is saved successfully, show a toast message
   */

  const [problemDifficulty, setProblemDifficulty] = useState<string>(problemDiff);
    
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
        <Button size={"lg"}>Save</Button>
      </CardHeader>
      <section className="grid grid-cols-5 gap-8">
    <Card className="col-span-2">
      <CardHeader><h2 className="text-lg font-semibold">Problem Statement</h2></CardHeader>
      <CardContent>
      <Editor storageKey={slug} className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/>
      </CardContent>
    </Card>
    <Card className="col-span-2">
      <CardHeader><h2 className="text-lg font-semibold">Starter Code</h2></CardHeader>
      <CardContent>
      <MonacoEditor
      height="90vh"
      defaultLanguage="javascript"
      // defaultValue={JSON.stringify(getLocalStorage(slug+'editorValue'))}
      onChange={handleEditorChange}
    />
      </CardContent>
    </Card>
    <section className="col-span-1 space-y-10">
    <Card className="">
      <CardHeader><h2 className="text-lg font-semibold">Examples</h2></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 w-full">
          <h3 className="font-medium">Inputs</h3>
          <Textarea/>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="font-medium">Outputs</h3>
          <Textarea/>
        </div>
      </CardContent>
    </Card>
    <Card className="">
    <CardHeader><h2 className="text-lg font-semibold">Test Cases</h2></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 w-full">
          <h3 className="font-medium">Inputs</h3>
          <Textarea/>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="font-medium">Outputs</h3>
          <Textarea/>
        </div>
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
                <Button size={"lg"}>Save</Button>
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
                    <Input id="title" placeholder="Title"  className="w-1/3" defaultValue={problemTitle}/>
                  </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="title" className="flex flex-col space-y-1">
                      <span>Title</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Update the title of the problem.
                      </span>
                    </Label>
                    <Input id="title" placeholder="Title"  className="w-1/3" defaultValue={problemTitle}/>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="difficulty" className="flex flex-col space-y-1">
                      <span>Difficulty</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Update the difficulty of the problem.
                      </span>
                    </Label>
                    <Select onValueChange={
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
                    <Switch id="public" defaultChecked={isPublic}/>
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
