import { generateUploadURL } from "components/uploadfiles/vultrObj"

export default  async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
  }