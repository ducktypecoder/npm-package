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


**NOT YET IMPLEMENTED:**

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
ducktypecoder init
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
ducktypecoder edit author
```

Creator runs this to add their own information, like email and twitter handle, to the project's meta data.


```
ducktypecoder publish
```

Commits current work, gathers all the project steps and posts the project to the ducktypecoder web app. User must be logged in.

**NOT YET IMPLEMENTED:**

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

User must login to publish their project sync onto the web platform.

```
ducktypecoder logout
```

Erases user auth from local machine.

# contribute

Clone the project and run it alongside the ducktyper app.

Be aware of whether you are hitting the development or production web urls.

NOT YET IMPLEMENTED: allow an option, '--development', to set the commands to use the local development app url (http://localhost:3000).
