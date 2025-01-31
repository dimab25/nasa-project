
import { useParams } from 'react-router'


function DetailsDayPictures() {
    
    const {fileDate}= useParams ()
    console.log("is shows", fileDate);


  return (
    <>

    <div>DetailsDayPictures</div>  
    </>
  )
}

export default DetailsDayPictures