# Making changes to the project

1. Check out a development branch. If you are the only developer, you can use `dev`, otherwise use (or create) a new branch. Ensure any new branch names are short and illustrative.
2. Edit files in the project. This project was developed using [VS Code](https://code.visualstudio.com/), and is already configured for that editor, but any code editor can be used.
    * Ensure you follow the style guide at `documentation/style-guide.md`.
    * If you're adding an entire new page to the project, see `documentation/adding-new-pages.md`.
3. Run `npm test` when the changes are complete.
    * Any failures will occur on the continuous integration server (see `documentation/continuous-integration.md`) as well, and will be reflected on the badge on the project page should anyone, for any (bad) reason, pull failing changes into the master branch.
    * You should do everything in your power to ensure that you **do not** pull commits with failing tests into the master branch and you **especially** should not pull these changes on the webserver.
4. Run a local server of the whole site and navigate to the new page on the local server.
5. If everything looks correct, push the changes to the development branch using `git push origin %YOUR_DEV_BRANCH%`, where `%YOUR_DEV_BRANCH%` should be replaced by the actual name of your development branch.
    * Pushing changes is a multi-step process. First, add the files to staging with `git add %YOUR_FILE_NAME%`, where `%YOUR_FILE_NAME%` should be replaced by the name of a file you have changed since the last commit.
    * Use `git status` to see which files have been changed, and which are staged for committing. Be **absolutely, 100% sure** you are not pushing live credentials to the server. If you do this, external integrations (e.g. Google Drive, Amazon E-mail) will stop working, or they will potentially be hijacked by spammers.
    * Use `git commit -m %YOUR_COMMIT_MESSAGE%` to commit your changes, where `%YOUR_COMMIT_MESSAGE%` should be replaced by a short, illustrative message describing all the changes you have made in this commit.
    * Use `git push origin %YOUR_DEV_BRANCH%` to commit the changes, where `%YOUR_DEV_BRANCH%` should be replaced by the actual name of your development branch. You may need to enter your remote repository credentials; don't leave the shell window before you see the push complete.
6. Go to the [project page](https://github.com/ice-nine-as/hellox-client) and create a pull request, pulling your development branch into `master`.
7. Wait for the continuous integration to provision its environment, build the project, and run all the tests. This may take 5-10 minutes, or significantly more if a lot more code and/or tests have been added.
    * You can either wait for the small indicator (yellow circle, green check, or red X) to turn green, or you can click on the indicator to go to the logfile for that specific continuous integration run.
    * Do **not** pull the changes before the testing completes. This could result in failing changes being pushed to the webserver and/or the badge on the project page not reflecting the true project state.
8. Follow the steps in `documentation/updating-the-webserver.md` to pull changes on the webserver and rebuild the server application to reflect the current state.
