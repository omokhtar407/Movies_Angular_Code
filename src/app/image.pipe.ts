import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(movieImg: string,placeholder: string): string {

    let image = movieImg ? movieImg :placeholder;

    return image;
  }

}
