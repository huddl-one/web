import { runCode } from "@web/lib/validations/run-code";
import { privateProcedure, router } from "../trpc";

const languages: {
    [key: string]: {
        python: string;
        javascript: string;
    }
} = {
    "contains-duplicate": {
        "python": `
        
import json

inputs = [
    [1, 2, 3, 4, 5],
    [3, 1, 4, 2, 7],
    [1, 2, 3, 1],
    [-1, 0, 2, 5, -1],
    [5, 6, 7, 8, 9, 10],
    [2, 2, 2, 2, 2],
    [4, 5, 6, 4, 8, 9],
    [0, 0, 0, 0],
    [-3, -5, -3, 7, 10],
    [100, 200, 300, 200, 400, 500]
]

expected_outputs = [False, False, True, True, False, True, True, True, True, True]

def run_tests(inputs, expected_outputs, user_function):
    results = []

    for nums, expected in zip(inputs, expected_outputs):
        output = user_function(nums)
        passed = output == expected

        results.append({
            'input': {'nums': nums},
            'expected': expected,
            'output': output,
            'passed': passed
        })

    return results

try:
    results = run_tests(inputs, expected_outputs, containsDuplicate)
    print(json.dumps(results, indent=2))

except Exception as e:
    print(json.dumps({'Error': 'Runtime Error', 'Type': str(e)}))`,
        "javascript": `\`);
        } catch (error) {
            console.error(JSON.stringify({ Error: "Syntax Error", Type: error.toString() }));
            process.exit(1);
        }
        
        const inputs = 
        [
            [1, 2, 3, 4, 5],
            [3, 1, 4, 2, 7],
            [1, 2, 3, 1],
            [-1, 0, 2, 5, -1],
            [5, 6, 7, 8, 9, 10],
            [2, 2, 2, 2, 2],
            [4, 5, 6, 4, 8, 9],
            [0, 0, 0, 0],
            [-3, -5, -3, 7, 10],
            [100, 200, 300, 200, 400, 500]
        ]
        ;
        
        const expectedOutputs = [false, false, true, true, false, true, true, true, true, true];
        
        try {
            function runTests(inputs, expectedOutputs, userFunction) {
                return inputs.map((nums, index) => {
                    const output = userFunction(nums);
                    const expected = expectedOutputs[index];
                    const passed = output === expected;
        
                    return {
                        input: { nums },
                        expected,
                        output,
                        passed
                    };
                });
            }
            const results = runTests(inputs, expectedOutputs, containsDuplicate);
            console.log(JSON.stringify(results, null, 2));
        } catch (error) {
            console.error(JSON.stringify({ Error: "Runtime Error", Type: error.toString() }));
        }`,
    }
}



export const problemRouter = router({
    
    runCode: privateProcedure
    .input(runCode)
    .mutation(async ({
        input: { language, code, slug },
    }) => {
        if (language === "javascript") {
            // let start = languages["contains-duplicate"]["javascripta"];
            let end = languages[slug]?.javascript || "";
            let final = code + `try {
                eval(\`` + code + end;
            console.log("final", final);
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                code: final,
                language: "javascript",
            });


            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow' as RequestRedirect // Set the redirect value to 'follow' as RequestRedirect type
            };

            // fetch("http://98.70.36.128/run", requestOptions)
            //     .then(response => response.text())
            //     .then(result => console.log(result))
            //     .catch(error => console.log('error', error));

            // Instead of returning the result, you can store in a variable
            // and then return the variable
            let result = await fetch("http://98.70.36.128/run", requestOptions)
                .then(response => response.text())
                .then(result => result)
                .catch(error => console.log('error', error));
            
                console.log("result", result);

            return result;

        }
        else if (language === "python") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
            code: code + languages[slug]?.python || "",
            language: "python",
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow' as RequestRedirect // Set the redirect value to 'follow' as RequestRedirect type
            };

            // fetch("http://98.70.36.128/run", requestOptions)
            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));

            // Instead of returning the result, you can store in a variable
            // and then return the variable
            let result = await fetch("http://98.70.36.128/run", requestOptions)
            .then(response => response.text())
            .then(result => result)
            .catch(error => console.log('error', error));

            return result;
        }
    }),
});