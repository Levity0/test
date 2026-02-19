<h1>BeavGredients Developer Documentation</h1>
<h2>Get Source Code</h2>
<p>To obtain the source code for BeavGredients go to the Github page https://github.com/robekenn/Beavgredients. Click the “Code” Button and download the Zip or use Git Clone however you prefer.</p>

<h2>Directory Structure</h2>
<p>“Web” Folder is where you can reach the main code for BeavGredients<br>
“Reports” Folder is where you can find our progress and processes we followed to reach a Minimal Viable Product<br>
“Beavgredients_living_doc.pdf” is the document that shows how we structured everything from coming up with the idea to why we used certain systems.</p>

<h2>Build Software</h2>
<p>With the “Web/Server” root is open in the terminal enter “npm install” then “npm start”. Then in a separate terminal in the “Web/Client” root enter “npm run build. </p>

<h2>How to Test</h2>
<p>Testing is simple, once the project is pushed to Github the test suit will automatically load in the actions tab. You can also use different systems such as Docker. If you want to edit the test suits you may find the tests in “workflows/npm-publish-github-packages.yml”.</p> 

<h2>How to Add New Tests</h2>
<p>To add a new test you may go to “.github/workflows/npm-publish-github-packages.yml” where then you can add a test in the jobs section. You can follow this convention</p>
<pre><code class="language-yaml">test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Set up npm
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        registry-url: https://npm.pkg.github.com/
    - name: Test with npm
      run: |
        set -e
        npm test
</code></pre>
<h2>Building a Release of the Software</h2>
<p>To build a release of the software on the Github page you may click on the side of the main page, there you are about to upload the build binaries, and the version you would like.</p>
