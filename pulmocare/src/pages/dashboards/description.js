import React, { Component } from 'react'
import SimpleEditor from 'simple-text-editor-react'

function Description() {
  return (
    <div>
      <h2>Description</h2>
      <SimpleEditor
        onChange={(value) => {
          // value contains the html value and all keystroke events 
        }}
        onImageUpload={(image, callback) => {
          // upload image then return the url in callback
          // callback(url)
        }}
        containerStyle={{
          width: '100%',
          height: '400px',
          border: '1px solid #ccc',
          position: 'relative' // position relative is required if showWordCharCount !== false
        }}
        value="<p>Enter your description here...</p>" // pass initial value
        showWordCharCount // if true word and character count will be shown. Default value is true
      />
    </div>
  )
}

export default Description
