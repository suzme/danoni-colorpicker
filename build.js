#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const serve = require('serve-http')
const { build, watch, cliopts } = require("estrella")

const buildDir = 'build'
const publicDir = 'public'
const imageDir = 'danoniplus-images'

build({
  entry: "src/index.jsx",
  outfile: `${buildDir}/index.js`,
  bundle: true,
  define: {
    'process.env.NODE_ENV': 'production'
  }
})

fs.copySync(publicDir, buildDir)
fs.readdirSync(imageDir).forEach(image => {
  if (image !== 'LICENSE') {
    fs.copyFileSync(path.join(imageDir, image), path.join(buildDir, image))
  }
})

if (cliopts.watch) {
  watch([publicDir, imageDir], files => {
    files.forEach(file => {
      if (file !== path.join(imageDir, 'LICENSE')) {
        const dest = path.join(buildDir, path.basename(file))
        fs.copyFileSync(file, dest)
        console.log(`Copied ${file} -> ${dest}`)
      }
    })
  })

  serve.createServer({
    port: 54321,
    pubdir: path.join(__dirname, buildDir)
  })
}
