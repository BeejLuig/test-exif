import { ExifImage } from 'exif';
 
try {
    new ExifImage({ image : 'assets/images/img_1.JPG' }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data! 
    });
} catch (error) {
    console.log('Error: ' + error.message);
}