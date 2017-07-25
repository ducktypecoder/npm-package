# ducktypecoder npm package

## student / learner / consumer

```
ducktypecoder start hello-world
```

consumer runs this command. it creates a new directory, clones setup files into that directory.  user can change into that new directory and follow the project’s first step.

```
ducktypecoder next
```

consumer runs this command when they have finished the current step. the command will run tests to see if they pass, if they do, the command will unlock the next step of the project.

on going to a new step, app will branch accordingly (git checkout -b ducktypecoder-step-3)

```
ducktypecoder next —force
```

consumer runs this to skip to the next step without passing tests

```
ducktypecoder goto step 9
```

consumer runs this to skip to a specific step.

```
ducktypecoder revert step 9
```

consumer runs this to wipe out their current git branch and pull down the projects actual starting point for that step (git pull origin ducktypecoder-step-9)


## creator / author

```
ducktypecoder new project-title
```

creator runs this command to setup a new project that is ready to begin adding content and tests. This will be the ‘master’ branch and it will provide the introduction and description of the project. The creator will run ‘ducktypecoder add step’ to create the first step.

```
ducktypecoder add step
```

creator runs this to add another step to the project. The creator will add content and tests.  The content will guide the learner to create some code that will pass the test suite.

the command will create and checkout a new branch with a name ‘ducktypecoder-step-<number>’. The step number is one more than the last step.

creator adds a step with content and tests, then adds the answer for that step. Proceeds until all steps and answers provided.

```
ducktypecoder add answer
```

creator runs this after they have added content for the current step. It will add a new branch 'ducktypecoder-step-<number>-answer', which contains code that makes the step tests pass.

```
ducktypecoder add conclusion
```

creator runs this when all steps & answers are provided. This conclusion will be displayed when the learner finishes the project. It might say ‘congratulations!’ and point to additional learning and resources.

```
ducktypecoder edit step <number>
```

Similar to ‘goto’, this command changes to the corresponding branch so the creator can edit and push updates.

```
ducktypecoder edit answer <number>
```

Similar to ‘goto’, this command changes to the corresponding branch so the creator can edit and push updates to an answer.

## authentication

```
ducktypecoder login
```

user will login to make their project sync onto the web platform.  Consider using github oauth, similar to firebase command line (opens up a browser and logs in with google oauth)

```
ducktypecoder logout
```

erases user auth from local machine.

# contribute

To develop this package and the main app locally, set 'development: true' in your project config.

That will set the api url to hit your localhost rather than the production app.

For example, using the hello-world project,

```

module.exports = {
  token: <testusertoken>,
  project: 'hello-world',
  development: true
}

// /hello-world/ducktypecoder.js
```
