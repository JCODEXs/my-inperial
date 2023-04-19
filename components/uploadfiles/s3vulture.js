import axios from 'axios';

const vultr = axios.create({
  baseURL: 'https://api.vultr.com/v1/',
  headers: { 'API-Key':  process.env.S3SecretKeyVultr },
});

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await vultr.post('/objects/put', formData);
  return data;
}




// //post 
// https://api.vultr.com/v2/object-storage
// //curl
// curl "https://api.vultr.com/v2/object-storage" \
//   -X POST \
//   -H "Authorization: Bearer ${VULTR_API_KEY}" \
//   -H "Content-Type: application/json" \
//   --data '{
//     "label" : "Example Object Storage",
//     "cluster_id" : 2
//   }'
//  //payload
// {
//     "label": "Example Object Storage",
//     "cluster_id": 2
//   }
//   //response
// {
//     "object_storage": {
//       "id": "cb676a46-66fd-4dfb-b839-443f2e6c0b60",
//       "date_created": "2020-10-10T01:56:20+00:00",
//       "cluster_id": 2,
//       "region": "ewr",
//       "location": "New Jersey",
//       "label": "Example Object Storage",
//       "status": "pending",
//       "s3_hostname": "ewr1.vultrobjects.com",
//       "s3_access_key": "00example11223344",
//       "s3_secret_key": "00example1122334455667788990011"
//     }
//   }
// //get

//   https://api.vultr.com/v2/object-storage/{object-storage-id}

//   //delete

//   https://api.vultr.com/v2/object-storage/{object-storage-id}
