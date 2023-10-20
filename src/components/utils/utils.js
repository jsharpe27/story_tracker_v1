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

    export { handleSaveClick }