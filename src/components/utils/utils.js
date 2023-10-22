import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js"

async function handleSaveClick(id, editTitle, editWordCount, editIsSubmitted, editDescription){ 
    const updatedStoryObject = {
                                  id: id,
                                  title: editTitle, 
                                  wordCount: editWordCount,
                                  isSubmitted: editIsSubmitted,
                                  description: editDescription
                              }
  
      if (Object.values(updatedStoryObject).every(Boolean)) {
  
      try {
      const docRef = doc(db, "stories", id)
      await setDoc(docRef, updatedStoryObject, { merge: true })
      console.log('saved')
    } catch (error){
      console.log(error)
    }
    } else {
    console.log('please fill out all fields')
    }
}

const toolBarOptions = [
  ['bold', 'italic', 'underline'],        // toggled buttons
  ['blockquote'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

    export { handleSaveClick, toolBarOptions }