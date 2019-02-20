import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

function TextEditor({onChange, value}) {
  return (
    <div>
      <ReactQuill 
        theme='snow'
        onChange={onChange}
        value={value}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        bounds={'.app'}
      />
    </div>
  )
}

TextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

TextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};


export default TextEditor;
