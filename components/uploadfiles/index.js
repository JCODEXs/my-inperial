
import { InputHTMLAttributes, useState } from 'react'
import styles from '../styles/Home.module.css'
import AWSS3UploadAsh from 'aws-s3-upload-ash'
import { UploadResponse } from 'aws-s3-upload-ash/dist/types'

const Home = () => {

  const [fileSelected, setFileSelected] = useState({ type: "", name: "" })
  const config = {
    bucketName: 'aws-s3-upload-ash',
    dirName: 'demo', /* optional - when use: e.g BUCKET_ROOT/dirName/fileName.extesion */
    region: 'us-east-1',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    s3Url: 'https://aws-s3-upload-ash.s3.amazonaws.com/'
  }
  // @ts-ignore
  const S3CustomClient = new AWSS3UploadAsh(config);

  function onChangeFile(event) {
    // @ts-ignore
    setFileSelected(event.target.files[0])
  }

  async function handleSendFile() {
    alert("Open console for see the result")
    console.log("handleSendFile")

    // @ts-ignore
    await S3CustomClient.uploadFile(fileSelected, fileSelected.type, undefined, fileSelected.name, "public-read")
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  return (
    <div className={styles.container}>
      <input type="file" onChange={onChangeFile} ></input>
      <br />
      <br />
      <button onClick={handleSendFile} >send file</button>
    </div>
  )
}

export default Home