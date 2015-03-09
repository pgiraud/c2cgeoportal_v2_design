```
npm install
```

Serve application

```
node serve.js
```

Compile css

```
watchmedo shell-command --patterns="*.less" --recursive --command="node_modules/less/bin/lessc less/main.less css/main.css"
```
