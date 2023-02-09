import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vote'
})
export class VotePipe implements PipeTransform {

  transform(vote:number): number {
    return Number(vote.toString().slice(0,3));
  }

}
