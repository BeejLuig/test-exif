import dotenv from 'dotenv';
import { ExifImage } from 'exif';
import fetch from 'fetch';

dotenv.config();

const convertExifGpsToDegrees = (ref, [decimal,mins,secs]) => {
  const hemisphereMultiplier = /[EN]/.test(ref) ? 1 : -1;
  return hemisphereMultiplier * (decimal + mins/60 + (secs * 2)/3600);
};

const exif = new ExifImage({ image : 'assets/images/img_1.JPG' }, function (error, exifData) {
  if (error) return console.log('Error: ' + error.message);
  
  const {
    GPSLatitudeRef,
    GPSLatitude,
    GPSLongitudeRef,
    GPSLongitude,
  } = exifData.gps;
  const lat = convertExifGpsToDegrees(GPSLatitudeRef, GPSLatitude);
  const lon = convertExifGpsToDegrees(GPSLongitudeRef, GPSLongitude);

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${1000}&key=${process.env.PLACES_API_KEY}`;
  
  fetch.fetchUrl(url, (error, meta, body) => {
    const data = JSON.parse(body.toString());
    console.log(data.results.map(x => x.name));
  });
});