const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS with your accessKeyId and secretAccessKey
const s3 = new AWS.S3({
  accessKeyId: "access_key_id",
  secretAccessKey: "acesskey"
});

// Function to upload a file to AWS S3 bucket
const uploadFileToS3 = (filePath, keyName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      
      const params = {
        Bucket: 'bucket_name',
        Key: keyName,
        Body: data
      };
      
      // Upload file to S3
      s3.upload(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.Location); // Return the URL of the uploaded file
      });
    });
  });
};

// Usage example
const filePath ='./s3_file.txt'; // Provide the path to the file you want to upload
const keyName = 'file.txt'; // Provide a key name under which the file will be saved in S3

uploadFileToS3(filePath, keyName)
  .then((url) => {
    console.log('File uploaded successfully. URL:', url);
  })
  .catch((err) => {
    console.error('Error uploading file:', err);
  });

